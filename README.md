# Easy Generator test Application with React and NestJS

This project is a full-stack web application that includes user authentication with JWT. The front-end is built with React and TypeScript, using Tailwind CSS for styling. The back-end is built with NestJS and MongoDB, using Mongoose as the ORM.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [server](#server)
  - [client](#client)
- [Running the Application](#running-the-application)
  - [Running the Server](#running-the-server)
  - [Running the Client](#running-the-client)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (MongoDB Atlas account)

## Installation

### Server

1. Clone the repository:

    ```bash
    git clone https://github.com/Raheel7/easy-generator-test.git
    cd easy-generator-test
    ```


### Client

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Install the client dependencies:

    ```bash
    npm install
    ```


## Running the Application

### Running the Server

1. Navigate to the server directory:

    ```bash
    cd server
    ```

2. Install the server dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm run start
    ```

    The server should now be running on `http://localhost:3001`.

### Running the Client

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Start the client:

    ```bash
    npm start
    ```

    The client should now be running on `http://localhost:3000`.




## API Endpoints

### Auth

- **POST** `/api/auth/signup`
  - Request: `{ "email": "user@example.com", "name": "Raheel", "password": "Password123!" }`
  - Response: `{ "access_token": "jwt_token" }`

- **POST** `/api/auth/signin`
  - Request: `{ "email": "raheel@example.com", "password": "Password123!" }`
  - Response: `{ "access_token": "jwt_token" }`

## Features

- User signup with validation
- User login with JWT authentication
- Protected routes on the front-end
- Secure password hashing
- CORS configuration

