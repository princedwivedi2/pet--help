# Pet Help UI Component Library

This document provides an overview of the UI components available in the Pet Help application. These components are designed to be reusable, accessible, and consistent with the application's design language.

## Installation

All components are available through the UI component index:

```jsx
import { Button, Card, Modal, ... } from '../components/ui';
```

## Components

### Avatar

A component for displaying user or entity images.

```jsx
<Avatar 
  src="/path/to/image.jpg" 
  alt="User name" 
  size="md" 
  status="online" 
/>

// With initials
<Avatar 
  initials="JD" 
  alt="John Doe" 
  size="lg" 
/>
```

#### Props

- `src` (string): Image source URL
- `alt` (string): Alternative text for the image
- `size` (string): Size of avatar ('xs', 'sm', 'md', 'lg', 'xl')
- `status` (string): Optional status indicator ('online', 'away', 'busy', 'offline')
- `variant` (string): Avatar shape ('circle', 'rounded')
- `initials` (string): Initials to display when no image is available
- `className` (string): Additional CSS classes

### Badge

A component for displaying counts or status indicators.

```jsx
<Badge variant="primary">New</Badge>
<Badge variant="danger" size="sm">3</Badge>
```

#### Props

- `variant` (string): Badge color variant ('primary', 'secondary', 'accent', 'success', 'warning', 'danger')
- `size` (string): Size of badge ('sm', 'md', 'lg')
- `className` (string): Additional CSS classes

### Button

A versatile button component with multiple variants and sizes.

```jsx
<Button>Default Button</Button>
<Button variant="secondary" size="lg">Large Button</Button>
<Button variant="outline" disabled>Disabled Button</Button>
<Button variant="danger" isLoading>Loading Button</Button>
```

#### Props

- `variant` (string): Button style variant ('primary', 'secondary', 'outline', 'danger')
- `size` (string): Button size ('sm', 'md', 'lg')
- `isLoading` (boolean): Whether to show a loading indicator
- `disabled` (boolean): Whether the button is disabled
- `className` (string): Additional CSS classes
- `as` (element type): Render as a different element (e.g., Link)
- `leftIcon` / `rightIcon` (node): Icons to display on either side of label

### Card

A glassmorphic card component for content display.

```jsx
<Card 
  title="Feature Title" 
  icon={<Icon />}
>
  Card content goes here
</Card>
```

#### Props

- `title` (string): Card title
- `icon` (node): Optional icon to display
- `className` (string): Additional CSS classes
- `as` (element type): Render as a different element (e.g., Link)
- `children` (node): Card content

### Chip

A component for labels and tags.

```jsx
<Chip>Default</Chip>
<Chip color="accent" onDismiss={() => console.log('dismissed')}>Dismissible</Chip>
<Chip color="secondary" icon={<Icon />}>With Icon</Chip>
```

#### Props

- `color` (string): Chip color ('primary', 'secondary', 'accent', 'danger')
- `onDismiss` (function): Optional callback for dismissible chips
- `icon` (node): Optional icon to display
- `className` (string): Additional CSS classes

### EmptyState

A placeholder component for empty states.

```jsx
<EmptyState
  title="No results found"
  description="Try adjusting your search or filter to find what you're looking for."
  action={<Button>Try Again</Button>}
  illustration={<Illustration />}
/>
```

#### Props

- `title` (string): Title text
- `description` (string): Description text
- `action` (node): Optional action button or link
- `illustration` (node): Optional illustration
- `className` (string): Additional CSS classes

### Modal

An accessible modal dialog with keyboard navigation.

```jsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here.</p>
  <div className="mt-4 flex justify-end gap-2">
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => { /* handle action */ setIsOpen(false); }}>Confirm</Button>
  </div>
</Modal>
```

#### Props

- `isOpen` (boolean): Whether the modal is visible
- `onClose` (function): Handler for closing the modal
- `title` (string): Modal title
- `description` (string): Optional description text
- `className` (string): Additional CSS classes
- `children` (node): Modal content

### ScrollIndicator

An animated scroll indicator for navigation.

```jsx
<ScrollIndicator targetId="features" />
```

#### Props

- `targetId` (string): ID of the element to scroll to
- `className` (string): Additional CSS classes

### Section

A layout component for page sections.

```jsx
<Section>
  <h2>Section Title</h2>
  <p>Regular section content</p>
</Section>

<Section fullWidth backgroundVariant="gradient">
  <div className="container mx-auto">
    <h2>Full Width Section</h2>
  </div>
</Section>
```

#### Props

- `fullWidth` (boolean): Whether section should be full-width
- `backgroundVariant` (string): Background style ('white', 'light', 'dark', 'gradient')
- `className` (string): Additional CSS classes
- `style` (object): Additional inline styles
- `children` (node): Section content

### Tooltip

A component for displaying additional information on hover.

```jsx
<Tooltip content="Additional information here" position="top">
  <Button>Hover Me</Button>
</Tooltip>
```

#### Props

- `content` (string): Tooltip content
- `position` (string): Tooltip position ('top', 'right', 'bottom', 'left')
- `variant` (string): Tooltip style ('light', 'dark')
- `className` (string): Additional CSS classes
- `children` (node): Element that triggers the tooltip

## Illustrations

### Feature Icons

Icons used for feature highlights.

```jsx
import { 
  ChatIcon,
  HealthIcon,
  MapIcon,
  DocumentIcon,
  AlertIcon
} from '../components/illustrations';

<ChatIcon animate={false} className="text-primary" />
```

### PetHeroIllustration

Main illustration for the hero section.

```jsx
import { PetHeroIllustration } from '../components/illustrations';

<PetHeroIllustration className="w-64 h-64" />
```

## Accessibility

All components are built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management in modals and other interactive elements
- Reduced motion support for animations

## Customization

Components can be customized through:
- Props for common variations
- className prop for additional styling
- Tailwind CSS utility classes
