
# Marvel API

[![Node.js CI](https://github.com/jmeza44/marvel-api/actions/workflows/node.js.yml/badge.svg?branch=main&event=push)](https://github.com/jmeza44/marvel-api/actions/workflows/node.js.yml)

## Overview

This project is a NEST JS WEB API that serves as a backend for managing user accounts and favorite Marvel characters. It provides endpoints for creating accounts, signing in, managing favorite characters, retrieving character details, and integrating with SMTP for account validation and password recovery. Characters, Comics, and Series [Data provided by Marvel. © 2024 MARVEL](http://marvel.com)

## Features

- **Authentication**:
  - Endpoints to create accounts and sign in.
  - Passwords are securely hashed and stored.
- **Character Management**:
  - Endpoint to list characters using search options.
  - Endpoint to add characters to favorites.
  - Endpoint to retrieve user's favorite characters.
  - Endpoint to remove characters from favorites (pending).
- **Content Details**:
  - Endpoints to list character's comics and series (pending).
  - Endpoints to retrieve comic and series details (pending).
- **Rating System**:
  - Endpoint to set ratings for characters, comics, or series (pending).
  - Endpoint to retrieve resource ratings (pending).
- **SMTP Integration**:
  - Account creation validation (pending).
  - Password recovery (pending).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jmeza44/marvel-api.git
   ```

2. Install dependencies:

   ```bash
   cd marvel-api
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example` and fill in the necessary configuration.

4. Run the application:

   ```bash
   npm run start
   ```

5. Access the API endpoints as described below.

## API Endpoints

- **Authentication**:
  - `POST /auth/signup`: Create a new user account.
  - `POST /auth/signin`: Sign in with existing credentials.
- **Character Management**:
  - `GET /characters`: List characters using search options.
  - `POST /characters/favorites`: Add characters to favorites.
  - `GET /characters/favorites`: Get user's favorite characters.
  - `DELETE /characters/favorites/:id`: Remove character from favorites (pending).
- **Content Details**:
  - `GET /characters/:id/comics`: List character's comics (pending).
  - `GET /characters/:id/series`: List character's series (pending).
  - `GET /comics/:id`: Get comic details (pending).
  - `GET /series/:id`: Get series details (pending).
- **Rating System**:
  - `POST /ratings`: Set a rating for a resource (pending).
  - `GET /ratings/:id`: Get rating for a resource (pending).

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
