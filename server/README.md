# Framer AI Image Generator Plugin Server

This is the server component for the Framer AI Image Generator Plugin. It analyzes website text content and generates contextually relevant AI images based on the website's theme and purpose.

## Features

- Analyzes website text to determine theme, purpose, and image needs using Claude 3 Haiku
- Generates high-quality AI images based on website context using SDXL Lightning
- Implements robust error handling with detailed error messages
- Uses Zod for data validation and type safety
- Optimized for speed with SDXL Lightning for fast image generation

## Getting Started

### Prerequisites

- Node.js 18+
- A Replicate API key (sign up at https://replicate.com)

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies

```bash
cd server
npm install
```

4. Update the `.env` file with your Replicate API key
5. Build the TypeScript code

```bash
npm run build
```

6. Start the server

```bash
npm start
```

For development:

```bash
npm run dev
```

### Test the Implementation

You can run a test script to verify that the server is working properly:

```bash
npx ts-node src/test-server.ts
```

This will test both the text analysis and image generation functionality with sample data.

## API Endpoints

### 1. Analyze Website Content

**Endpoint:** `POST /api/analyze`

**Request Body:**

```json
{
  "texts": ["array", "of", "text", "elements", "from", "website"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "theme": "Creative portfolio",
    "type": "Portfolio website",
    "purpose": "Showcase design services and projects",
    "targetAudience": "Potential clients seeking design services",
    "imageNeeds": [
      "Professional portfolio examples",
      "Creative workspace",
      "Team collaboration",
      "Design process illustrations",
      "Project outcome showcases"
    ],
    "colorPalette": ["#3A3A3A", "#F5F5F5", "#4A90E2", "#50E3C2", "#B8E986"],
    "styleRecommendations": "Clean, minimalist, professional with vibrant accent colors"
  }
}
```

### 2. Generate Images

**Endpoint:** `POST /api/generate`

**Request Body:**

```json
{
  "websiteAnalysis": {
    // Analysis data from the /api/analyze endpoint
  },
  "userRequests": "Optional specific requests from the user",
  "imageCount": 4,
  "imageStyle": "Optional style override",
  "imageSize": "1024x1024"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "images": [
      {
        "url": "https://replicate.delivery/generated-image-url-1.jpg",
        "prompt": "The prompt used to generate this image"
      },
      {
        "url": "https://replicate.delivery/generated-image-url-2.jpg",
        "prompt": "The prompt used to generate this image"
      }
    ],
    "message": "Successfully generated 4 images"
  }
}
```

## AI Models Used

### Text Analysis

The server uses **Claude 3 Haiku** by Anthropic for analyzing website content. This model was chosen for:

- Excellent understanding of context
- Superior JSON formatting capabilities
- Fast response times
- Strong reasoning about design and aesthetics

### Image Generation

The server uses **SDXL Lightning** by Stability AI for generating images. This model was chosen for:

- Exceptional quality-to-speed ratio
- High aesthetic quality images
- Significantly faster generation times than standard SDXL
- Better understanding of design prompts and art direction

## Error Handling

All endpoints return appropriate error responses with detailed messages:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Validation errors when applicable
}
```

## Implementation Details

The server is built with TypeScript and Express, providing strong typing and a solid foundation. Key features include:

- Robust error handling with detailed error messages
- Comprehensive input validation with Zod
- Optimized AI prompts for better analysis and image generation
- Type-safe implementation throughout the codebase
