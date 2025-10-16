# Action Plan for Part 3: Page-Based Onboarding Flow

## Overview
Part 3 has been refactored to use a full-page navigation approach for the onboarding experience. This creates a more immersive and focused user journey through three main steps: connecting a Google Sheet, creating an email template, and building a master resume. Each step is now a dedicated page with smooth transitions between them.

## Implementation Details

### File Structure
```
src/app/onboarding/
├── welcome/page.tsx         # Step 1: Google Sheet connection
├── email-template/page.tsx  # Step 2: Email template creation
└── resume/page.tsx          # Step 3: Resume builder
```

### Shared Components
- **Layout**: Consistent page layout with header, progress indicator, and navigation
- **Animations**: GSAP for smooth page transitions and micro-interactions
- **State Management**: URL parameters and localStorage for persisting progress

## Onboarding Pages

### 1. Welcome & Connect Google Sheet
**Route**: `/onboarding/welcome`

**Components**:
- `Card` - Main content container
- `Input` - For Google Sheet URL entry
- `Button` - For form submission
- `Tooltip` - For guidance and help text

**Features**:
- Clean, focused interface for entering Google Sheet URL
- Real-time validation and header detection
- Visual feedback during connection
- Responsive layout for all screen sizes

**Animations**:
- Page enter: Fade and slide up (0.5s)
- Form elements: Staggered fade-in
- Success state: Smooth transition to next step

### 2. Email Template Editor
**Route**: `/onboarding/email-template`

**Components**:
- `Tabs` - For switching between template and preview
- `Textarea` - Rich text editor (simplified for MVP)
- `Button` - For inserting variables
- `Tooltip` - For variable descriptions

**Features**:
- Live preview of email template
- Click-to-insert variables
- Template validation
- Responsive editor layout

**Animations**:
- Page transition: Slide from right
- Variable insertion: Bounce effect
- Template selection: Fade and scale

### 3. Resume Builder
**Route**: `/onboarding/resume`

**Components**:
- `Tabs` - For switching between content and design
- `Input`/`Textarea` - For resume sections
- `Card` - For template selection
- `Button` - For navigation and actions

**Features**:
- Tabbed interface for content and design
- Live resume preview
- Template selection
- Form validation

**Animations**:
- Tab transitions: Fade and slide
- Form interactions: Subtle feedback
- Completion: Celebration animation

## Navigation Flow
1. User completes welcome step → Redirect to `/onboarding/email-template`
2. User completes email template → Redirect to `/onboarding/resume`
3. User completes resume → Redirect to `/dashboard` with onboarding complete flag

## State Management
- **Local Storage**: Track completion status
- **URL Parameters**: Maintain step state
- **Form State**: Client-side validation and persistence

## Error Handling
- Form validation messages
- Connection error states
- Loading states for async operations

## Accessibility
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

## Performance
- Lazy loading of components
- Optimized animations
- Efficient state updates
- **Shadcn Components**:
  - `Card` for layout containers of editor and variables panel.
  - `Button` for saving the template and continuing.
  - `Tooltip` for guidance messages.
- **GSAP Animations**:
  - **Screen Entry**: Slide in from right for the entire screen over 0.7 seconds.
  - **Editor & Panel Split**: Fade in with a slight delay (0.2s) between left and right panels for a smooth reveal.
  - **Variable Click**: On click, a small scale bounce (from 1 to 1.1 and back) over 0.3 seconds.
  - **Tooltip Appear**: Fade in with a slide up from below the trigger over 0.4 seconds.
  - **Transition to Next Step**: Fade out with a zoom out effect over 0.5 seconds.

### Step 3: Build Your Master Resume
- **Function**: Introduces the user to the resume editor with a guided tour to build their master resume.
- **Screen Details**:
  - Two-panel layout: Left panel with `Content` and `Customize` tabs, right panel with live preview.
  - Guided tour using pop-up tooltips to explain interface elements.
  - Prompts to fill out basic sections to see live updates.
  - Finish onboarding button.
- **Shadcn Components**:
  - `Tabs` for Content and Customize sections on the left panel.
  - `Card` for wrapping each panel for visual separation.
  - `Tooltip` for guided tour pop-ups.
  - `Button` for adding content and finishing onboarding.
- **GSAP Animations**:
  - **Screen Entry**: Fade in with a slide up effect over 0.7 seconds.
  - **Tab Switch**: Smooth fade and slide transition between tabs over 0.3 seconds.
  - **Tooltip Tour**: Each tooltip fades in with a bounce effect and slides from the direction of the element it describes (0.5s duration).
  - **Live Preview Update**: On content input, preview updates with a subtle highlight flash (background color change and back) over 0.5 seconds.
  - **Transition to Dashboard**: celebratory confetti burst animation (using GSAP particles) with a fade to the dashboard over 1 second.

## Implementation Approach
- **Folder Structure**: Follow the project structure in `README.md`. Components will be created in `src/components/shadCn/` for custom UI elements using shadcn CLI, and layouts in `src/components/layouts/` for onboarding screens.
- **State Management**: Use Zustand in `src/utils/store/` for managing onboarding state and user inputs.
- **Animations**: Implement GSAP via CDN or npm in `src/utils/lib/` for all transitions and effects, ensuring smooth and engaging user interactions.
- **User Flow**: Ensure each step is mandatory and linear, guiding the user from one screen to the next until onboarding completion.

## Summary
This action plan covers the three critical onboarding steps for new users. Each screen is designed with specific shadcn components to maintain UI consistency and uses tailored GSAP animations to enhance the user experience with smooth transitions and interactive feedback. The next steps will be to implement these screens as per the outlined specifications, ensuring a seamless onboarding flow that sets users up for success in using the Job Seeker's Assistant application.
