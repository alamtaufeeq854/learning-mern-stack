# React + Vite with Docker

A React application containerized using Docker with Node.js 22 Alpine.

## Prerequisites

- Docker installed on your system.

## Getting Started

**Build the Docker image**

```bash
docker build -t my-app .
```

**Run the container**

```bash
docker run -p 5173:5173 my-app
```

**Access the application**

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- React 19
- Vite 8
- Node.js 22 Alpine
- Docker
