# Project Readme: Express-TS with Redis, Rate Limiting, Bull MQ, Full CRUD Operations, Prisma ORM, and Docker Compose

This repository contains an Express TypeScript project with Redis integration, Rate Limiting, Bull MQ for handling queues and workers, full CRUD operations for Tasks, Prisma ORM with MySQL, and Docker Compose for easy setup.

## Setup and Commands

### Run Docker Compose (Starts Redis and MySQL)
```bash
docker-compose up -d
```

### Run Prettier
```bash
npm run format
```

### Format Code
```bash
npm run format
```

### Start the Server
```bash
npm rundev
```

### Create JS Code and Run
```bash
npm run build
npm run start
```

## Rate Limiting using Redis

Rate Limiting Middleware is implemented using Redis to track the number of requests based on the IP, user ID, and API endpoint. If the limit (set to 5 requests) is exceeded, a 60-second expiration time is imposed, and the user must wait before making additional API requests.

## Authentication and Logging Middleware

The project includes a comprehensive authentication system and logging middleware to ensure secure access to the APIs and capture relevant logs for debugging and analysis.

## Task CRUD Operations

Users can perform CRUD operations on tasks, including creating, updating, and deleting tasks. The status of a task can also be changed from pending to complete.

## Caching with Redis

Caching using Redis is implemented to prevent fetching data multiple times from the database. Cached data is utilized to enhance performance and reduce the load on the database.

## Prisma ORM with MySQL

The project utilizes Prisma ORM for database interactions, specifically with MySQL. Prisma simplifies database access and provides a type-safe query builder.

## Queue and Worker using Bull MQ

The project utilizes Bull MQ for handling asynchronous tasks through Queues and Workers. The structure includes:

### Queue
- **ID:** `Queue('Notification')`
- **Usage:** Allows pushing tasks into the queue.

### Worker
- **ID:** `Worker('Notification')`
- **Usage:** Processes tasks from the 'Notification' queue.

Both Queue and Worker functionalities are internally managed by Redis, providing a robust and scalable solution for background job processing.

## Dead Letter Queue

In the process, jobs (messages) are added to the 'Notification' queue by the producer. Workers take these jobs (messages) one by one. If an error occurs during processing, the job is moved to a Dead Letter Queue for further analysis.

## Getting Started

1. Clone the repository.
2. Run Docker Compose: `docker-compose up -d`
3. Install dependencies: `npm install`
4. Set up your Redis server.
5. Configure environment variables.
6. Run the server: `npm rundev`

Feel free to explore and modify the code to suit your project requirements. Happy coding!