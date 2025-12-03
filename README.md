# Magizh Diaries

Student Diary System for managing student diaries and marks with parent share links.

## Architecture

- **Backend**: FastAPI + PostgreSQL
- **Frontend**: React + Vite
- **Deployment**: Docker + Docker Compose

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd magizh-diaries
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` if you want to customize database credentials (optional).

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Start PostgreSQL database
   - Run database migrations automatically
   - Start the backend API on http://localhost:8000
   - Build and serve the frontend on http://localhost:3000

4. **Access the application**
   - Frontend: http://localhost:3010
   - Backend API: http://localhost:8090 (for direct API testing)
   - API Documentation: http://localhost:8090/docs
   
   > **Note**: When using the frontend at port 3010, API calls are automatically proxied to the backend. You only need port 8090 for direct API access (e.g., with Postman or curl).
   
   > **Note**: When using the frontend at port 3010, API calls are automatically proxied to the backend. You only need port 8090 for direct API access (e.g., with Postman or curl).

### Using Makefile (Recommended)

The project includes a Makefile for easy container management:

```bash
# View all available commands
make help

# Start containers
make up

# Stop containers
make down

# Restart containers (down + up)
make restart

# Build images
make build

# Rebuild and restart
make rebuild

# View logs
make logs        # View logs
make logs-f      # Follow logs

# Check service health
make health

# Clean up (remove volumes)
make clean
```

### Docker Commands (Alternative)

```bash
# Start services in detached mode
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes (deletes database data)
docker compose down -v

# Rebuild containers
docker compose up --build

# View running containers
docker compose ps
```

## Local Development (without Docker)

### Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your database URL.

5. **Run migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the server**
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env .env.local
   ```
   Edit `.env.local` if needed (default API URL is http://localhost:8000/api).

4. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables

### Root `.env` (Docker Compose)
- `POSTGRES_USER`: Database username (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: postgres)
- `POSTGRES_DB`: Database name (default: magizh_diaries)

### Backend `.env`
- `POSTGRES_URL`: Database connection string

### Frontend `.env`
- `VITE_API_URL`: Backend API URL (for local dev: http://localhost:8000/api)

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation (Swagger UI).

## Project Structure

```
magizh-diaries/
├── backend/
│   ├── app/
│   │   ├── routers/      # API routes
│   │   ├── models/       # Database models
│   │   └── ...
│   ├── alembic/          # Database migrations
│   ├── main.py           # FastAPI application
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── ...
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## License

[Add your license here]