import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export type WaitlistEntry= {
  email: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  deviceFingerprint?: string;
}

export const getPublicIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return 'unknown';
  }
};

export const generateDeviceFingerprint = (): string => {
  if (typeof window === 'undefined') return 'server';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fingerprint', 10, 10);
  const fingerprint = canvas.toDataURL();
  return btoa(fingerprint + navigator.userAgent + screen.width + screen.height);
};

export const checkDuplicateEmail = async (email: string): Promise<boolean> => {
  const q = query(collection(db, 'waitlist'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const checkRecentSubmission = async (ip: string): Promise<boolean> => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const q = query(
    collection(db, 'waitlist'),
    where('ip', '==', ip),
    where('timestamp', '>', oneHourAgo),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Check duplicate email
    const isDuplicate = await checkDuplicateEmail(email);
    if (isDuplicate) {
      return { success: false, message: 'This email is already on the waitlist.' };
    }

    // Get IP and device info
    const ip = await getPublicIP();
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
    const deviceFingerprint = generateDeviceFingerprint();

    // Check recent submission from same IP
    const recentSubmission = await checkRecentSubmission(ip);
    if (recentSubmission) {
      return { success: false, message: 'Please wait before submitting again.' };
    }

    // Add to Firestore
    const entry: WaitlistEntry = {
      email,
      ip,
      userAgent,
      timestamp: new Date(),
      deviceFingerprint,
    };

    await addDoc(collection(db, 'waitlist'), entry);

    return { success: true, message: 'Successfully joined the waitlist!' };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, message: 'Failed to join waitlist. Please try again.' };
  }
};
