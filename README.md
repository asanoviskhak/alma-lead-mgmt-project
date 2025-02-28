# Lead Management Application

## See Demo [Link](https://alma-lead-mgmt-project.vercel.app)

## Table of Contents
1. [Setup Guide](#setup-guide)
2. [Design Document](#design-document)
3. [Additional Documentation](#additional-documentation)

## Setup Guide

### Prerequisites
- Node.js (v20 or later)
- npm (v10 or later)
- (Optional) You can install Volta (https://volta.sh/) for the faster development

### Installation
1. Clone the repository: 
`git clone [https://github.com/asanoviskhak/alma-lead-mgmt-project.git](https://github.com/asanoviskhak/alma-lead-mgmt-project.git)`

2. Install dependencies:
`npm install`

3. Run the development server:
`npm run dev`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Design Document

### Architecture
This lead management application for Alma Frontend Assessment is built using Next.js. The application follows a client-server architecture with the following key components:

1. **Frontend**: React components using Next.js for server-side rendering and routing.
2. **Backend**: Next.js API routes for handling server-side logic and data management.
3. **Database**: (In the current implementation, I used mock data)

### Key Design Choices

1. **Next.js Framework**
2. **Tailwind CSS**
3. **shadcn/ui Components**
4. **React Hook Form**
5. **Zod**: Used for schema validation.
6. **Server-side Rendering**: Utilized to improve initial load times and SEO.
7. **API Routes**

### Component Structure
- `app/`: Contains the main application pages and layouts
- `components/`: Reusable React components
- `lib/`: Utility functions and constants
- `types/`: TypeScript type definitions
- `public/`: Static assets
- `constants/`: Some most used constants

## Additional Documentation

### Authentication
The application uses a simple token-based authentication system.

### Form Validation
Zod schemas are used alongside with React Hook Form to provide handy form validation, ensuring data integrity and useful to provide immediate feedback to users.

### Styling
The application uses a Tailwind CSS and shadcn/ui components. Custom styles can be added in the `globals.css` file or as Tailwind classes directly in the components.

### API Routes
API routes are located in the `app/api` directory. These serverless functions handle data operations and can be easily extended or modified as needed.


### Troubleshooting
If you encounter any issues during setup or runtime, please check the following:
1. Ensure all dependencies are correctly installed
2. Check the console for any error messages
3. Ensure you're using a compatible Node.js and npm versions
