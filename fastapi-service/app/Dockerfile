version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: aicheck_postgres
    environment:
      POSTGRES_DB: aicheck_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: aicheck_rabbitmq
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    ports:
      - "5672:5672"    # Cổng gửi nhận message
      - "15672:15672"  # Giao diện trực quan Dashboard
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  ollama:
    image: ollama/ollama:latest
    container_name: aicheck_ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

volumes:
  pgdata:
  rabbitmq_data:
  ollama_data: