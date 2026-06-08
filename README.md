# Pokedex Application

A React-based Pokédex application that fetches Pokémon data from the PokeAPI and displays detailed information for selected Pokémon.

## Features

* Fetches the first 20 Pokémon from the PokeAPI
* Displays Pokémon name and ID
* Displays Pokémon sprite image
* Displays Pokémon types
* Displays Pokémon abilities
* Displays Pokémon base stats
* Loading and error handling
* Custom CSS styling
* HTTPS enabled using Nginx and a self-signed TLS certificate
* Multi-stage Docker build

## Technologies Used

* React
* Vite
* Docker
* Docker Compose
* Nginx
* OpenSSL
* PokeAPI

## Project Structure

```text
.
├── src/
├── public/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── certs/
└── README.md
```

## Build and Run

Clone the repository:

```bash
git clone https://github.com/divyanshtiwari-web/pokedex-nginx-docker.git
cd pokedex-nginx-docker
```

Start the application:

```bash
docker compose up -d --build
```

Access the application:

```text
https://localhost
```

A browser warning may appear because the certificate is self-signed. Proceed to the site to continue.

## Docker Services

### Application Container

Serves the React build on port 80 inside the container.

### Nginx Reverse Proxy

* Listens on port 443
* Terminates TLS/SSL
* Redirects HTTP traffic on port 80 to HTTPS
* Proxies requests to the React application container

## API Used

PokeAPI

Base URL:

```text
https://pokeapi.co/api/v2/
```

Endpoints:

```text
GET /pokemon?limit=20
GET /pokemon/{name}
```
