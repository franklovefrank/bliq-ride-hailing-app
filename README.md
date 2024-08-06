# Ride-Hailing Service
This project provides an API that aggregates ride offers from multiple providers (like Uber and Bolt), and offers the best ride options based on price and car type.
![alt text](<Screenshot 2024-08-06 at 17.14.24.png>)
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
`GET /api/best-rides`: Fetches the best ride offers by provider and car type with the following structure: 
```
export interface RideOffer {
    provider: string;      
    price: number;       
    duration: number;     
    carType: string;     
}
```
- provider: The name of the ride provider.
- price: The price of the ride. This field is normalized to either be the average or  given price, depending on the provider
- duration: The estimated duration of the ride in minutes.
- carType: The type of car offered.

## Notes on Project Structure and Future Improvements
### Design Decisions
- For this project, I decided to focus on future scalability and expansion of features rather than finding the quickest/dirtiest solution 
- I decided to use the Adapter design pattern to normalize responses from different providers. This pattern allows for consistent data handling and integration with multiple external APIs. 
- In my initial design, I also considered using the Facade pattern to simply the interaction between backend and frontend. I scrapped this idea because it resulted in redundant code and was unnecessary for the given complexity of the project.  It might be worth revisiting in the future if the project complexity increases.
- Filtering by Type/Company: I got too into it and implemented filtering by type and provider because it enhanced the visual presentation. Then I saw that this feature was specifically excluded in the requirements. I do know how to read! Sorry about that.

### Future Improvements
These are just a few suggestions among many, many things that would need to be added in the future with increasing complexity 
1. Error Handling
Enhancing error handling will be crucial as the system scales. I would think about 
- Centralized Error Handling: Using NestJS’s exception filters for consistent error management across the application.
- Custom Error Classes: Defining specific error classes to better categorize and handle different types of errors.
As the system scales, enhancing error handling will be crucial. Future improvements will include:
- Logging and Monitoring: Integrating robust logging and error tracking tools to monitor and analyze errors in real-time.
2. Performance Considerations:
- Caching: Introduce caching strategies to improve performance and reduce the load on external APIs.
- Asynchronous Processing: Explore asynchronous processing and job queues for handling long-running tasks or large volumes of data.
3. Scalability 
- Load Balancing: Implement load balancers to distribute traffic across multiple instances of the application, ensuring high availability and improved performance.
- Database Optimization:  Consider using a scalable database solution and optimize database queries and indexes as data volume grows.
- API Rate Limiting: Implement rate limiting to protect the API from excessive requests and ensure fair usage
- Service Monitoring and Alerts: Set up monitoring tools to track application performance and resource usage
