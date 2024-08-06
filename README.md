# Ride-Hailing Service
This project provides an API that aggregates ride offers from multiple providers (like Uber and Bolt), and offers the best ride options based on price and car type.

## Features
- Fetch Best Offers: Retrieve the best ride offers by provider and car type.
- Support for Multiple Providers: Currently supports Uber and Bolt, with potential to extend to other providers.
- Normalized Data: All price data is normalized for consistency.

## Technologies Used
- Backend: NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- Frontend: Next.js, a React framework for server-rendered and statically-exported React apps.
- TypeScript: For type safety and improved developer experience.
- Material UI: For UI components and theming.

## Project Structure
The project is structured into two main parts:

### Backend (/backend):

- Adapters: Fetch offers from Uber and Bolt.
- Services: Aggregates data and returns the best offers based on criteria.
- Models: Shared TypeScript interfaces between frontend and backend.
- Controllers: Define API endpoints.
- Utils: Utility functions for normalizing data, etc.

### Frontend (/frontend):

- Pages: Next.js pages for rendering UI.
- Components: Reusable UI components like RideCard.
- Models: Shared TypeScript interfaces between frontend and backend.

## Getting Started
### Prerequisites
- Node.js: Ensure that you have Node.js installed on your system.
Yarn: Install Yarn package manager.
### Installation
Clone the repository:
```
git clone https://github.com/franklovefrank/bliq-ride-hailing-app.git
cd ride-hailing
```
Install dependencies for both frontend and backend:
```
cd backend
yarn install
cd ../frontend
yarn install
```

## Running the Project
### Backend
Navigate to the backend directory:
```
cd backend
```
Start the NestJS server:
```
yarn start:dev
```
This will start the backend API on http://localhost:3001.

### Frontend
Navigate to the frontend directory:

```
cd frontend
```
Start the Next.js development server:

```
yarn dev
```
This will start the frontend on http://localhost:3000.

## API Endpoints
`GET /api/best-rides`: Fetches the best ride offers by provider and car type.
