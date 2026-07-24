# Dockerized Service Deployment

A small learning project: an Express service in a Docker container with a simple HTML page and a protected route.

The goal is to demonstrate working with Docker and basic HTTP request handling (static files, HTML responses, Basic Auth).

## What's inside

- **`/`** — public welcome page
- **`/secret`** — page with a secret message and an image; access only after Basic Auth
- **`public/`** — static files (e.g. an image)
- **`Dockerfile`** — image based on `node:18-alpine`

## Live demo

The service is also running on a remote server:

- [http://93.77.190.67:8080](http://93.77.190.67:8080) — public page
- [http://93.77.190.67:8080/secret](http://93.77.190.67:8080/secret) — secret page (login and password from `.env`)

## Quick start with Docker

1. Copy the environment variable template:

```bash
cp .env.template .env
```

2. Fill in `.env`:

```env
SECRET_MESSAGE=your_secret_message
PASSWORD=your_password
ADMIN_NAME=your_login
PORT=8080
```

3. Build and run the container:

```bash
docker build -t cat-service .
docker run --env-file .env -p 8080:8080 cat-service
```

4. Open in your browser:

- [http://localhost:8080](http://localhost:8080) — public page
- [http://localhost:8080/secret](http://localhost:8080/secret) — secret page (login and password from `.env`)

## Local run without Docker

```bash
npm install
cp .env.template .env
# fill in .env
node service.js
```

## Stack

- Node.js + Express
- dotenv
- Docker (Alpine)
