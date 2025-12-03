# Deployment Guide

## Environment Variables

### Docker Compose (Local Development)

The default configuration in `docker-compose.yml` uses `/api` which works with the Nginx proxy.

### Custom Deployment

To deploy with a different API URL, pass it as a build argument:

#### Option 1: Update docker-compose.yml
```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      VITE_API_URL: https://api.yourdomain.com/api  # Your production API URL
```

#### Option 2: Build with Docker CLI
```bash
# Build with custom API URL
docker build \
  --build-arg VITE_API_URL=https://api.yourdomain.com/api \
  -t your-frontend:latest \
  ./frontend

# Run the container
docker run -p 3010:80 your-frontend:latest
```

#### Option 3: Using .env file
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

Then in `docker-compose.yml`:
```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      VITE_API_URL: ${VITE_API_URL:-/api}
```

## Port Configuration

The application uses the following ports (as configured in `docker-compose.yml`):

- **Frontend**: 3010 → 80 (container)
- **Backend**: 8090 → 8000 (container)
- **PostgreSQL**: 5442 → 5432 (container)

### Customizing Ports

Edit `docker-compose.yml` to change the host ports (left side of the mapping):

```yaml
ports:
  - "YOUR_PORT:CONTAINER_PORT"
```

## Production Deployment Checklist

1. **Set Production API URL**
   ```bash
   export VITE_API_URL=https://api.yourdomain.com/api
   ```

2. **Update Database Credentials**
   ```bash
   export POSTGRES_USER=prod_user
   export POSTGRES_PASSWORD=secure_password
   export POSTGRES_DB=magizh_diaries_prod
   ```

3. **Build Images**
   ```bash
   docker compose build
   ```

4. **Start Services**
   ```bash
   docker compose up -d
   ```

5. **Verify Health**
   ```bash
   docker compose ps
   curl http://localhost:8090/health
   ```

## Nginx Proxy Configuration

The frontend uses Nginx to proxy API requests. The proxy configuration in `frontend/nginx.conf` automatically routes `/api` requests to the backend service.

**When to use VITE_API_URL:**
- For deployments where frontend and backend are on different domains
- For direct API access from the browser (not through Nginx proxy)
- For development environments without Docker

**When Nginx proxy is used:**
- Local Docker development (default `/api`)
- Production deployments where frontend and backend share the same domain
