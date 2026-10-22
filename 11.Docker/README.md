# Docker Learning

A hands-on repository focused on learning Docker, containerization, and application deployment through practical implementations.

## Implementations

- Dockerfile configuration and image building
- Container creation and port mapping
- Environment variable configuration
- Dependency management
- Multi-stage Docker builds

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

## Getting Started

Navigate to the desired project directory and build the Docker image.

```bash
docker build -t my-app .
docker run -p HOST_PORT:CONTAINER_PORT my-app
```

Replace `HOST_PORT` and `CONTAINER_PORT` with the appropriate port numbers.

## Tech Stack

- Docker
- Node.js 22 Alpine