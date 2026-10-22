# Express.js with Docker

A lightweight Express.js application containerized using Docker, with a multi-stage Docker build for a streamlined production image.

## Prerequisites

- Node.js and npm
- Docker installed on your system

## Getting Started

**Build the Docker image**

```bash
docker build -t express-app .
```

**Run the container**

```bash
docker run -p 4000:4000 express-app
```

**Access the application**

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Docker Configuration

- Node.js 22 Alpine base image
- Environment variable configuration using `PORT`
- Dependency installation with npm
- Multi-stage Docker build for production
