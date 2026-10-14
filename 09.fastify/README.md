# Fastify Backend API

A RESTful backend API built with **Fastify, MongoDB, and Mongoose**, featuring JWT authentication and thumbnail management.

## Features

- User registration and login
- JWT-based authentication
- Forgot and reset password
- Thumbnail creation, retrieval, updating, and deletion
- Image uploads using multipart form data
- User-specific resource management
- Swagger API documentation

## Tech Stack

**Runtime:** Node.js  
**Framework:** Fastify  
**Database:** MongoDB  
**ODM:** Mongoose  
**Authentication:** JWT  
**Documentation:** Swagger UI, Postman

## Getting Started

```bash
git clone https://github.com/alamtaufeeq854/learning-mern-stack.git
cd learning-mern-stack/09.fastify
npm install
npm run dev
```

Create a `.env` file with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
```

## Links

- **Swagger Documentation:** https://fastify-6xnb.onrender.com/docs#

- **Postman Documentation:** https://documenter.getpostman.com/view/55362925/2sBYHRV2GC

- **GitHub Repository:** https://github.com/alamtaufeeq854/learning-mern-stack/tree/main/09.fastify