# PayTM Backend API Documentation

## Overview

This is a backend API service built with Express.js that handles user management and related functionalities. The API implements secure authentication, data validation, and follows RESTful principles.

## Tech Stack

- Node.js
- Express.js
- Express Validator (for input validation)
- MongoDB (database)
- JSON Web Tokens (for authentication)

## Project Structure

```
backend/
├── controllers/        # Request handlers
│   └── user.controller.js
├── services/          # Business logic
│   └── user.service.js
├── models/           # Database models
├── middlewares/      # Custom middleware functions
├── routes/           # API routes
├── config/          # Configuration files
└── utils/           # Utility functions
```

## API Endpoints

### User Management

#### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Validation**:
  - Username: Required, min 3 characters
  - Email: Required, valid email format
  - Password: Required, min 6 characters
- **Success Response**:

  ```json
  {
    "status": "success",
    "message": "User registered successfully",
    "data": {
      "userId": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

#### Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Success Response**:

  ```json
  {
    "status": "success",
    "token": "JWT_TOKEN",
    "user": {
      "userId": "string",
      "username": "string"
    }
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

### HTTP Status Codes

- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

### Common Error Messages

#### Authentication Errors

```json
{
  "status": "error",
  "message": "Invalid token",
  "code": "AUTH_001"
}
```

```json
{
  "status": "error",
  "message": "Token expired",
  "code": "AUTH_002"
}
```

```json
{
  "status": "error",
  "message": "Access denied. No token provided",
  "code": "AUTH_003"
}
```

#### Validation Errors

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ],
  "code": "VAL_001"
}
```

```json
{
  "status": "error",
  "message": "Username already exists",
  "code": "VAL_002"
}
```

```json
{
  "status": "error",
  "message": "Email already registered",
  "code": "VAL_003"
}
```

#### User Operation Errors

```json
{
  "status": "error",
  "message": "User not found",
  "code": "USR_001"
}
```

```json
{
  "status": "error",
  "message": "Invalid credentials",
  "code": "USR_002"
}
```

```json
{
  "status": "error",
  "message": "Account is locked. Please contact support",
  "code": "USR_003"
}
```

#### Database Errors

```json
{
  "status": "error",
  "message": "Database connection error",
  "code": "DB_001"
}
```

```json
{
  "status": "error",
  "message": "Database operation failed",
  "code": "DB_002"
}
```

#### Server Errors

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "SRV_001"
}
```

```json
{
  "status": "error",
  "message": "Service temporarily unavailable",
  "code": "SRV_002"
}
```

### Error Code Format

- `AUTH_XXX`: Authentication related errors
- `VAL_XXX`: Validation related errors
- `USR_XXX`: User operation related errors
- `DB_XXX`: Database related errors
- `SRV_XXX`: Server related errors

## Authentication

- The API uses JWT (JSON Web Tokens) for authentication
- Protected routes require a valid JWT token in the Authorization header
- Format: `Authorization: Bearer <token>`

## Input Validation

- All inputs are validated using express-validator
- Validation rules are implemented as middleware
- Common validations include:
  - Required fields
  - Email format
  - Password strength
  - String length
  - Data types

## Setup and Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   \d\Projects\paytm\backend\README.md

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Development

- Run in development mode:

  ```bash
  npm run dev
  ```

- Run tests:

  ```bash
  npm test
  ```

## Error Logging

The application uses a robust error logging system to track and monitor issues in production.

## Security Measures

- Password hashing
- JWT token authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet for security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
