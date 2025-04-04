# Framer AI Image Generator Plugin - Client

This is the client-side component of the Framer AI Image Generator Plugin. It provides a user interface for analyzing website content and generating contextually relevant AI images.

## Features

- Analyzes website text to determine theme, purpose, and image needs
- Generates AI images based on website context and user preferences
- Provides a clean, intuitive interface for customizing image options
- Enables direct insertion of generated images into Framer projects
- Automatically saves analysis and generated images for future sessions

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)
- A running instance of the server component

### Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

4. Package the plugin for distribution:

```bash
pnpm pack
```

## Project Structure

- `src/components/` - Reusable UI components
- `src/services/` - API services for communicating with the backend
- `src/utils/` - Utility functions for storage, etc.
- `src/App.tsx` - Main application component
- `src/index.css` - Global CSS and utility classes

## How It Works

1. **Text Collection**: The plugin scans the Framer project for all text content
2. **Analysis**: The collected text is sent to the backend API for AI analysis
3. **Configuration**: Users can customize image generation options
4. **Generation**: Images are generated based on the analysis and user preferences
5. **Insertion**: Users can select and insert images directly into their Framer project

## Technologies Used

- React for the UI
- Framer Plugin API for interacting with Framer
- Utility-first CSS approach (TailwindCSS-style)
