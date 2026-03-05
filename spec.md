# Healthcare AI Imaging Bootcamp Landing Page

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page landing page for a Healthcare AI Imaging Bootcamp
- 12 distinct sections: Navbar, Hero, Earn While You Learn, Who Should Apply, Why Different, Career Pathways, Curriculum Timeline, Bootcamp Experience, ROI, Admissions, Final CTA, Footer
- Conversion features: sticky apply button, lead capture form modal, WhatsApp chat button, brochure download popup
- Backend: lead capture form submissions (name, email, phone, background)
- Backend: brochure download request tracking

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend
- `submitLead(name: Text, email: Text, phone: Text, background: Text) : async Result`
- `getLeads() : async [Lead]` (admin only)
- `trackBrochureDownload(email: Text) : async Result`

### Frontend Sections
1. **Navbar** - Sticky, logo left, nav links center, "Apply Now" CTA button right (#da1b36), mobile hamburger
2. **Hero** - 2-column, headline + feature bullets + dual CTAs left, AI imaging hero visual right
3. **Earn While You Learn** - Dark grey bg, 4 stat cards + 1 highlight card
4. **Who Should Apply** - White bg, 5 icon cards for target audiences
5. **Why Different** - Dark grey bg, ecosystem bullet list with visual
6. **Career Pathways** - Red (#da1b36) bg, 7 career role cards
7. **Curriculum Timeline** - White bg, 6-step vertical/horizontal timeline
8. **Bootcamp Experience** - Dark grey bg, 5 experience bullets with R&D framing
9. **ROI Section** - Red bg, 3 financial cards + highlight text
10. **Admissions** - White bg, limited seats info + selection process steps + CTA
11. **Final CTA** - Dark grey bg, headline + subtext + apply button
12. **Footer** - Black bg, 4 columns + contact details + social links

### Conversion Features
- Lead capture modal (triggered by "Apply Now" buttons)
- Brochure download popup (email gate before PDF download)
- Sticky floating "Apply Now" button (bottom right on mobile, visible on scroll)
- WhatsApp chat floating button
- Smooth scroll navigation
- Mobile-responsive hamburger menu

### Visual Assets (Generated)
- Hero image: AI brain visualization with MRI/CT scan interfaces
- AI neural network background visual
- Medical imaging dashboard illustration
