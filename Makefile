.PHONY: help up down restart build rebuild logs clean ps health test

# Default target
help:
	@echo "Magizh Diaries - Docker Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make up         - Start all containers"
	@echo "  make down       - Stop all containers"
	@echo "  make restart    - Restart all containers (down + up)"
	@echo "  make build      - Build Docker images"
	@echo "  make rebuild    - Rebuild and restart containers"
	@echo "  make logs       - View logs from all containers"
	@echo "  make logs-f     - Follow logs from all containers"
	@echo "  make ps         - Show running containers"
	@echo "  make clean      - Stop containers and remove volumes"
	@echo "  make health     - Check health of all services"
	@echo "  make test       - Test backend health endpoint"

# Start containers
up:
	docker compose up

# Stop containers
down:
	docker compose down

# Restart containers (down then up)
restart: down up
	@echo "Containers restarted successfully!"

# Build images
build:
	docker compose build

# Rebuild and restart
rebuild: down build up
	@echo "Containers rebuilt and restarted successfully!"

# View logs
logs:
	docker compose logs

# Follow logs
logs-f:
	docker compose logs -f

# Show running containers
ps:
	docker compose ps

# Clean up (remove volumes)
clean: down
	docker compose down -v
	@echo "Containers and volumes removed!"

# Check health
health:
	@echo "Checking service health..."
	@docker compose ps
	@echo ""
	@echo "Backend health:"
	@curl -f http://localhost:8000/health 2>/dev/null && echo " - OK" || echo " - FAILED"
	@echo ""
	@echo "Frontend:"
	@curl -f http://localhost:3000 2>/dev/null > /dev/null && echo " - OK" || echo " - FAILED"

# Test backend
test:
	@echo "Testing backend API..."
	@curl -s http://localhost:8000/health | python3 -m json.tool
