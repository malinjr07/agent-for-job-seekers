# The Ultimate Job Seeker's Assistant: A Complete User Journey

This document outlines the complete user flow for the Job Seeker's Assistant micro-SaaS, from initial discovery to core application usage. It serves as a written blueprint for the application's design, features, and user experience.

---

## Part 1: The Public-Facing Website

The goal of the public site is to educate visitors about the problem of generic job applications, present our solution, and convert them into registered users.

### 1.1. Landing Page

The landing page is the primary entry point for new visitors.

*   **Hero Section:**
    *   **Headline:** `Stop Sending Resumes into the Void. Start Landing Interviews.`
    *   **Sub-headline:** `Our AI-powered assistant helps you automatically personalize every job application. Connect your job list, customize your resume in seconds, and send perfectly tailored cold emails in batches.`
    *   **Visual:** A sleek, animated graphic showing a generic resume transforming into a personalized one, followed by an email being sent.
    *   **Primary CTA:** A prominent button: `Start Your Free 14-Day Trial`.

*   **Problem/Solution Section:**
    *   **Title:** `Why 98% of Job Applications Get Ignored`
    *   **Content:** This section will feature three columns, each highlighting a common pain point:
        1.  **Generic Resumes:** "Recruiters spend 6 seconds on a resume. A generic one never stands out."
        2.  **Manual Personalization:** "Tailoring your resume and email for every single job is tedious and time-consuming."
        3.  **Falling Through the Cracks:** "Without personalization, your application gets lost in a sea of hundreds of others."
    *   **Solution Statement:** `Our platform is the solution. We make hyper-personalization effortless.`

*   **Features Section:**
    *   **Title:** `Your Personal Job Application Assistant`
    *   **Content:** A grid of feature cards with icons:
        1.  **Google Sheets Integration:** "Manage your job prospects in a simple Google Sheet. Our app reads the data instantly."
        2.  **Dynamic Resume Builder:** "Build a master resume and let our AI reorder skills, experiences, and titles to perfectly match each job description."
        3.  **Batch Personalized Emails:** "Create email templates with variables. Send hundreds of personalized cold emails with a single click."
        4.  **Custom PDF Filenames:** "Never send 'resume.pdf' again. Automatically generate filenames like 'JohnDoe_Resume_SoftwareEngineer_AcmeCorp.pdf'."

*   **How It Works Section:**
    *   **Title:** `Land Your Dream Job in 3 Simple Steps`
    *   **Content:** A simple, numbered visual guide:
        1.  **Connect:** Paste the link to your Google Sheet with your list of job openings.
        2.  **Customize:** Build your master resume and email templates using our intuitive editors.
        3.  **Send:** Select the jobs you want to apply for, review the personalized outputs, and schedule your batch send.

*   **Testimonials/Social Proof Section:**
    *   **Title:** `From Job Seeker to Hired`
    *   **Content:** Featuring quotes from fictional satisfied users. "I was ableto apply to 50 targeted jobs in one evening. I had 5 interview requests by the end of the week!" - Jane D., Software Engineer.

*   **Final CTA Section:**
    *   **Title:** `Ready to Take Control of Your Job Search?`
    *   **Content:** A final, compelling call to action.
    *   **CTA Button:** `Sign Up Now - It's Free!`

*   **Footer:**
    *   Links to Blog, About, Contact, Terms of Service, Privacy Policy, and social media profiles.

### 1.2. Authority Pages

*   **Blog:** Contains articles on resume writing, cold emailing strategies, and interview tips to build authority and attract organic traffic.
*   **About Us:** Explains the mission to empower job seekers through technology.

---

## Part 2: Authentication

*   **Sign Up Page:** A clean, simple form asking for Email and Password. Includes options for one-click sign-up/login with Google.
*   **Login Page:** A form for returning users to enter their Email and Password, with the same Google OAuth option.

---

## Part 3: The User Onboarding Experience

Once a user signs up, they are guided through a mandatory 3-step onboarding process to ensure they are set up for success.

*   **Step 1: Welcome & Connect Google Sheet**
    *   A welcome modal greets the user by name.
    *   The primary element is an input field prompting the user to `Paste your public Google Sheet URL`.
    *   The application validates the URL in real-time. On success, it displays the detected headers (e.g., `company_name`, `job_title`, `hiring_manager`) and asks the user to confirm.

*   **Step 2: Create Your First Email Template**
    *   The user is taken to the **EmailTemplateEditor**.
    *   A rich text editor is on the left. On the right, a panel shows the available variables (e.g., `{company_name}`) from the sheet, which can be clicked to be inserted into the template.
    *   A tooltip guides the user to write a generic but personalizable email.

*   **Step 3: Build Your Master Resume**
    *   The user is directed to the **ResumeEditor**.
    *   A guided tour (using pop-up tooltips) explains the two-panel layout: the **Content** and **Customize** tabs on the left, and the **Live Preview** on the right.
    *   The tour prompts the user to fill out the 'Basic Information' and 'About Me' sections to see the live preview update instantly.
    *   Upon completing the tour, the onboarding is marked as complete.

---

## Part 4: The Core Application

After onboarding, the user has full access to the application.

### 4.1. Dashboard / Home

*   The default view after login.
*   Features a series of **StatsCard** components showing key metrics: `Emails Sent`, `Emails Delivered`, `Emails Failed`, and `Data Rows Ignored`.
*   Below the stats, **ChartCard** components visualize activity over the last 30 days.
*   A prominent button `Send a New Application Batch` serves as the primary action for a returning user.

### 4.2. Navigation Sidebar

A persistent sidebar on the left provides navigation to all key areas:
*   `Dashboard`
*   `Email Templates`
*   `Resume Builder`
*   `Mail Logs`
*   `Settings`

### 4.3. Resume Builder Page

*   This is the heart of the application, featuring the **ResumeEditorLayout**.
*   **Content Tab:** The user can add, edit, reorder, and toggle the visibility of all 14 resume sections (Education, Experience, Skills, etc.). Each section has its own dedicated `SectionForm` for editing.
*   **Customize Tab:** The user can change the overall resume template, adjust colors, modify spacing and fonts, and change heading styles.

### 4.4. Mail Logs Page

*   This page displays a detailed table of all past and scheduled email batches.
*   Columns include `Batch Name`, `Timestamp`, `Status (Sent/Scheduled/Failed)`, and `Success Rate`.
*   Each entry can be expanded to see the specific rows from the Google Sheet that were included in that batch.

### 4.5. Settings Page

*   Contains forms for managing the user's account (email, password), viewing their current subscription plan, and managing billing details. It also allows them to update or change the linked Google Sheet URL.

---

## Part 5: The Core User Flow: Sending an Application Batch

This is the primary workflow the user will engage in regularly.

1.  **Initiate:** The user clicks `Send a New Application Batch` from the dashboard.
2.  **Select Data:** The user is shown their Google Sheet data and selects the rows (jobs) they want to apply for.
3.  **Select Template:** The user chooses from their list of saved email templates.
4.  **Review & Personalize:**
    *   The app loads a review screen. It shows a preview of the personalized email and resume for the *first* selected job.
    *   The user can cycle through previews for all selected jobs to ensure personalization is correct.
    *   The user can make last-minute manual edits to the resume for this *specific batch only* without altering their master resume.
    *   The user sets the **FileNameFormat** for the PDFs.
5.  **Schedule:** The user can choose to `Send Now` or `Schedule for Later`, which opens a date/time picker.
6.  **Execution (Backend Process):**
    *   At the scheduled time, the system iterates through each selected row.
    *   It generates a unique, personalized PDF resume.
    *   It sends the personalized email via the user's connected email account.
    *   It updates the **Mail Logs** and **Dashboard** with the results of the send.
