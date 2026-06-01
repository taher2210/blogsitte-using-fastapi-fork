# Community Platform Design System

## Design Philosophy: Swiss Functionalism

This platform follows strict Swiss design principles inspired by old Reddit, Hacker News, Stack Overflow, and Lobsters. Every element prioritizes information density, readability, and discussion functionality over decoration.

## Core Principles

- **Information Dense**: Maximize visible content per screen
- **Text-First**: Content and discussion are primary, not imagery
- **Functional**: Every design choice serves reading, writing, or navigation
- **Timeless**: Avoid trends, focus on clarity and speed
- **Built for Power Users**: Keyboard shortcuts, dense layouts, minimal clicks

## Color System

### Core Palette
- **Background**: `#FFFFFF` (pure white)
- **Foreground**: `#000000` (black text)
- **Accent**: `#2563EB` (blue for links and primary actions)
- **Border**: `#E5E7EB` (light gray)
- **Muted Background**: `#F9FAFB` (subtle hover states)
- **Muted Text**: `#6B7280` (metadata, secondary info)

### Semantic Colors
- **Upvote/Positive**: `#059669` (green)
- **Downvote/Negative**: `#DC2626` (red)

## Typography

### System Fonts (Fast Loading)
- **UI/Headings**: System font stack (-apple-system, BlinkMacSystemFont, “Segoe UI”, sans-serif)
- **Reading**: Georgia for article content
- **Mono**: SF Mono, Monaco, Consolas for timestamps and code

### Hierarchy
- Post titles: 18px, medium weight
- Body text: 16px for UI, 18px for article content
- Metadata: 14px, muted color
- Line height: 1.5 for UI, 1.7 for reading content

## Layout

### Grid System
- **Desktop (>1024px)**: 3-column (left sidebar 240px, center fluid, right sidebar 280px)
- **Tablet (768-1024px)**: 2-column (center fluid, right sidebar 280px)
- **Mobile (<768px)**: Single column, bottom navigation

### Spacing
- Use 4px base unit
- Compact padding on cards (12px)
- Consistent gaps (16px between cards, 24px between sections)

## Components

### Post Cards
- Title is most prominent element (18px, semibold)
- Metadata in single line: author • time • comments • votes
- No featured images in feed
- Subtle border, no shadows
- Hover: background changes to #F9FAFB

### Comment System
- Threaded with 2px left border for hierarchy
- 24px indent per nesting level
- Collapse/expand at each level
- Vote arrows inline
- Max width for readability

### Navigation
- Sticky header, 64px height
- White background, 1px bottom border
- Logo left, search center, actions right
- No mega-menus or dropdowns

### Buttons
- Border-based styling (not filled)
- 1px border, 2px border-radius
- Primary: blue border and text
- Hover: subtle background
- Icon + text where appropriate

### Forms
- Labels above inputs
- 1px border inputs
- Focus: 2px blue ring
- Validation inline
- No floating labels

## Visual Details

### Borders
- 1px solid throughout
- Color: #E5E7EB
- Border radius: 2px maximum (sharp corners)

### Shadows
- None by default
- Subtle shadow only for dropdowns/modals if needed

### Hover States
- Background: #F9FAFB
- No animations or transitions
- Instant feedback

### Focus States
- 2px blue ring (--accent)
- High contrast
- Visible on all interactive elements

## Loading States

- **Skeleton Loaders**: Gray rectangles matching content shape
- **No Spinners**: Use skeleton screens
- **Background**: #F3F4F6 for skeleton blocks

## Empty States

- Centered message
- Suggested action (if applicable)
- Minimal icon or no icon
- Example: “No posts yet. Be the first to post!”

## Mobile Adaptations

### Bottom Navigation (Mobile Only)
- 5 tabs: Home, Search, Create, Notifications, Profile
- Icons + labels
- 56px height
- Active state: blue accent

### Touch Targets
- Minimum 44px for all interactive elements
- Increased padding on mobile
- Collapsible comment threads

### Responsive Behavior
- Sidebars collapse to hamburger menu
- Search bar expands on tap
- Tables become stacked cards
- Maintain readability at all sizes

## Accessibility

- **Contrast**: Minimum 4.5:1 for body text, 3:1 for large text
- **Focus Indicators**: Visible on all interactive elements
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Alt Text**: Descriptive for all images
- **Keyboard Navigation**: Full support

## Content Guidelines

### Placeholder Content
- Realistic usernames (not “user123”)
- Authentic post titles
- Varied comment lengths
- Real timestamps (“2 hours ago”, “3 days ago”)
- No lorem ipsum

## Don't Use

- Drop shadows
- Gradients
- Glassmorphism
- Neumorphism
- Purple colors
- Excessive whitespace
- Rounded pill buttons
- Floating action buttons
- Trendy micro-interactions
- Auto-playing content
