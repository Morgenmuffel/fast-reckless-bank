# Fast & Reckless Bank

Full-stack banking application built for a technical challenge.

## Project Structure

```
fast-reckless-bank/
├── README.md
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/fastbank/bankingapi/
│   │   ├── controller/         # REST controllers
│   │   ├── service/           # Business logic
│   │   ├── model/             # Data models
│   │   ├── repository/        # Data access layer
│   │   └── BankingApiApplication.java
│   ├── pom.xml
│   └── README.md
└── frontend/                   # React TypeScript app
    ├── src/
    │   ├── components/         # React components
    │   ├── services/          # API client
    │   ├── hooks/             # Custom React hooks
    │   ├── types/             # TypeScript type definitions
    │   ├── App.tsx
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── README.md
```

## Features

- **Create Account**: Register new bank accounts
- **Deposit Money**: Add funds to accounts
- **Withdraw Money**: Remove funds from accounts
- **Transfer Money**: Move money between accounts
- **Account Overview**: View all accounts and balances
- **Transaction Insights**: Analytics and transaction history

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.5.3
- In-memory storage (no external database)
- RESTful API

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios for API communication
- Modern responsive UI/UX

## Quick Start

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
The API will be available at `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm start
```
The web app will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/accounts` - Create new account
- `GET /api/accounts` - List all accounts
- `POST /api/accounts/{id}/deposit` - Deposit money
- `POST /api/accounts/{id}/withdraw` - Withdraw money
- `POST /api/accounts/transfer` - Transfer between accounts

## Development Notes

This is a technical challenge implementation focusing on:
- Clean code architecture
- Performance optimization
- Modern UI/UX design
- Type safety with TypeScript
- RESTful API design 