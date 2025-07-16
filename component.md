# Job Seeker Assistant - React Components

## Onboarding Flow Components
1. **GoogleSheetInput**
   - Purpose: Collect and validate Google Sheet URL
   - Props: `onUrlSubmit` (callback when valid URL is entered)

2. **SheetHeaderSelector**
   - Purpose: Display and allow selection of Google Sheet headers
   - Props: `headers` (array of headers), `onSelect` (callback when headers are selected)

3. **EmailTemplateEditor**
   - Purpose: Rich text editor for creating email templates
   - Props: `availableVariables` (sheet headers), `onTemplateSave`

## Resume Editor Components
4. **ResumeEditorLayout**
   - Purpose: Main layout with left panel (editor) and right panel (preview)
   - Props: `resumeData`, `onSave`

5. **SectionManager**
   - Purpose: Manage collapsible content sections
   - Props: `sections` (array), `onAddSection`, `onReorder`, `onToggleVisibility`

6. **SectionForm** (14 variations for each content type)
   - Purpose: Create/edit section-specific content
   - Props: `initialData`, `onSubmit`, `onCancel`
   - Common fields: Title, description (with rich text editor)

7. **RichTextEditor**
   - Purpose: Minimal rich text editing
   - Props: `value`, `onChange`
   - Features: Bold, italic, underline, alignment, lists, links

8. **TemplateSelector**
   - Purpose: Choose resume templates
   - Props: `templates`, `onSelect`

9. **StyleCustomizer**
   - Purpose: Customize resume appearance
   - Props: `currentStyles`, `onChange`
   - Sections: Column styles, color schemes, spacing, fonts

10. **FontSelector**
    - Purpose: Select font families
    - Props: `currentFont`, `onChange`
    - Groups: Serif, Sans, Mono

## Dashboard Components
11. **StatsDashboard**
    - Purpose: Display application metrics
    - Props: `stats` (email sent/delivered/failed, data ignored)

12. **ChartCard**
    - Purpose: Visualize data metrics
    - Props: `title`, `data`, `chartType`

13. **NavigationSidebar**
    - Purpose: App navigation
    - Props: `activeItem`, `onItemSelect`
    - Items: Email templates, resume builder, mail logs, settings

## Utility Components
14. **PDFGenerator**
    - Purpose: Convert HTML resume to PDF
    - Props: `resumeData`, `fileNameFormat`

15. **BatchMailSender**
    - Purpose: Schedule and send personalized emails
    - Props: `template`, `recipientData`, `resumeData`

16. **FileNameCustomizer**
    - Purpose: Personalize resume filenames
    - Props: `options` (timestamp, name, sheet tags), `onFormatChange`

## Shared Components
17. **DraggableItem**
    - Purpose: Make sections/items draggable for reordering
    - Props: `id`, `children`

18. **VisibilityToggle**
    - Purpose: Show/hide content items
    - Props: `isVisible`, `onToggle`

19. **DateInput**
    - Purpose: Standardized date input
    - Props: `value`, `onChange`, `showOptions` (day/month/year toggles)

20. **LinkAdder**
    - Purpose: Add links to various fields
    - Props: `onAddLink`
