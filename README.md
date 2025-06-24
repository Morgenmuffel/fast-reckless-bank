# Fast & Reckless Bank 🏦

A full-stack banking application built with **Spring Boot** (Java) and **React** (TypeScript). Features account management, deposits, withdrawals, and transfers with in-memory storage.

## 🚀 **Live Demo**

[![Fast & Reckless Bank Demo](https://img.youtube.com/vi/SE9bBlgrIYo/0.jpg)](https://youtu.be/SE9bBlgrIYo?si=Sxqx_Z2uXXjnllaF)

*Click the image above to watch the demo video*

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api

## 📁 **Project Structure**
```
fast-reckless-bank/
├── backend/          # Spring Boot API (Java 21)
│   ├── src/main/java/com/fastbank/bankingapi/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── model/          # Data models
│   │   └── repository/     # Data access layer
│   └── src/test/          # Comprehensive test suite
└── frontend/         # React TypeScript app
    ├── src/components/     # React components
    ├── src/services/       # API integration
    ├── src/types/          # TypeScript types
    └── src/hooks/          # Custom React hooks
```

## 🎯 **Features**
- ✅ **Account Management**: Create accounts with auto-generated account numbers
- ✅ **Deposits**: Add money to accounts with transaction tracking
- ✅ **Withdrawals**: Remove money with insufficient funds validation
- ✅ **Transfers**: Send money between accounts with verification
- ✅ **Transaction History**: View detailed transaction records
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Real-time Updates**: Live balance and transaction updates

## 🛠️ **Setup & Installation**

### Prerequisites
- **Java 21** (OpenJDK)
- **Node.js 16+** and **npm**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fast-reckless-bank.git
cd fast-reckless-bank
```

### 2. Backend Setup (Spring Boot)
```bash
cd backend

# Install Java 21 (macOS with Homebrew)
brew install openjdk@21

# Configure Java environment
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Run tests
./mvnw test

# Start the backend server
./mvnw spring-boot:run
```
Backend will be available at: http://localhost:8080

### 3. Frontend Setup (React)
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
Frontend will be available at: http://localhost:3000

## 🧪 **Demo Accounts**
The application comes with demo accounts you can use for testing:

| Account Number | Owner Name |
|---|---|
| ACC1750689494427700 | John Doe |
| ACC1750689512262966 | Jane Smith |
| ACC1750689512289838 | Bob Wilson |

## 🎮 **How to Use**

### 1. **Login**
- Go to http://localhost:3000
- Enter any existing account number or use demo accounts
- Click "Login" to access the dashboard

### 2. **Create New Account**
- Click "Create Account" on the login screen
- Enter your full name
- Your account number will be generated automatically

### 3. **Make Transactions**
- **Deposit**: Add money to your account
- **Withdraw**: Remove money (validates sufficient funds)
- **Transfer**: Send money to another account (with verification)

### 4. **View Dashboard**
- See your current balance
- Review recent transactions
- Access quick action buttons

## 🔧 **API Endpoints**

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create new account
  ```json
  { "ownerName": "John Doe" }
  ```

### Transactions
- `POST /api/accounts/{accountNumber}/deposit` - Deposit money
- `POST /api/accounts/{accountNumber}/withdraw` - Withdraw money
- `POST /api/accounts/transfer` - Transfer between accounts

## 🧪 **Testing**

### Backend Tests
```bash
cd backend
./mvnw test
```
- **36 tests** covering all functionality
- Unit tests for models, services, repositories
- Integration tests for controllers
- **100% test success rate**

### Manual Testing
```bash
# Test account creation
curl -X POST http://localhost:8080/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"ownerName":"Test User"}'

# Test deposit
curl -X POST http://localhost:8080/api/accounts/ACC123/deposit \
  -H "Content-Type: application/json" \
  -d '{"amount":100.00,"description":"Test deposit"}'
```

## 🏗️ **Technical Stack**

### Backend
- **Java 21** with **Spring Boot 3.5.3**
- **Spring Web** for REST APIs
- **Spring Boot DevTools** for development
- **JUnit 5** + **Mockito** for testing
- **Maven** for dependency management
- **In-memory storage** with ConcurrentHashMap

### Frontend
- **React 18** with **TypeScript**
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Custom hooks** for state management

## 🎨 **Design Features**
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean, professional banking interface
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Comprehensive error messages and validation
- **Success Feedback**: Clear confirmation messages
- **Accessibility**: Screen reader friendly with proper labels

## 🔄 **Development Workflow**
1. **Backend**: Start with `./mvnw spring-boot:run`
2. **Frontend**: Start with `npm start`
3. **Testing**: Run `./mvnw test` for backend tests
4. **API Testing**: Use the provided curl commands or Postman

## 🚀 **Future Enhancements**
- [ ] AI-powered transaction categorization
- [ ] Financial insights and recommendations
- [ ] Account statements and reports
- [ ] Advanced security features
- [ ] Database persistence
- [ ] Docker containerization

## 📝 **Architecture Decisions**
- **In-memory storage**: Meets requirements, thread-safe with ConcurrentHashMap
- **Monolithic structure**: Simple deployment and development
- **RESTful API**: Standard HTTP methods and status codes
- **Component-based UI**: Reusable React components
- **Type safety**: TypeScript prevents runtime errors

## 🤝 **Contributing**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 **License**
This project is built for technical assessment purposes.

---

**Happy Banking!** 🏦💰
