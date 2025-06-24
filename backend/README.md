# Fast & Reckless Bank - Backend

A Spring Boot REST API for a simple banking application.

## Setup **macOS**

### Prerequisites

- **Homebrew**
- **Git**

### 1. Install Java 21

First, install OpenJDK 21 using Homebrew:

```bash
brew install openjdk@21
```

### 2. Configure Java Environment

Add Java 21 to your PATH by adding this line to your shell configuration file:

```bash
# For zsh (default on macOS)
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# For bash
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

Create a system-wide symlink for Java (optional but recommended):

```bash
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

### 3. Verify Java Installation

Check that Java 21 is properly installed:

```bash
java -version
```

You should see output similar to:
```
openjdk version "21.0.7" 2025-04-15
OpenJDK Runtime Environment Homebrew (build 21.0.7)
OpenJDK 64-Bit Server VM Homebrew (build 21.0.7, mixed mode, sharing)
```

### 4. Navigate to Backend Directory

```bash
cd backend
```

### 5. Build and Test the Application

Build the application and run all tests:

```bash
./mvnw clean test
```

This command will:
- Download all Maven dependencies
- Compile the source code
- Run all unit and integration tests
- Display test results

Expected output should show:
```
Tests run: 36, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

### 6. Run the Application

Start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

Once the application is running, you can test the following endpoints:

### Health Check
```bash
curl http://localhost:8080/api/accounts
```

### Create Account
```bash
curl -X POST http://localhost:8080/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"ownerName": "John Doe"}'
```

### Deposit Money
```bash
curl -X POST http://localhost:8080/api/accounts/{accountNumber}/deposit \
  -H "Content-Type: application/json" \
  -d '{"amount": 100.00, "description": "Initial deposit"}'
```

### Withdraw Money
```bash
curl -X POST http://localhost:8080/api/accounts/{accountNumber}/withdraw \
  -H "Content-Type: application/json" \
  -d '{"amount": 50.00, "description": "ATM withdrawal"}'
```

### Transfer Money
```bash
curl -X POST http://localhost:8080/api/accounts/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountNumber": "ACC123456789",
    "toAccountNumber": "ACC987654321",
    "amount": 25.00,
    "description": "Payment to friend"
  }'
```

### Get All Accounts
```bash
curl http://localhost:8080/api/accounts
```

## Troubleshooting

### Java Version Issues

If you get "Unable to locate a Java Runtime" error:
1. Make sure Java 21 is installed: `brew install openjdk@21`
2. Verify PATH is set correctly: `echo $PATH | grep openjdk@21`
3. Restart your terminal or run: `source ~/.zshrc`

### Port Already in Use

If port 8080 is already in use, you can change the port by adding this to `src/main/resources/application.properties`:
```properties
server.port=8081
```

### Memory Issues

If you encounter memory issues, increase JVM heap size:
```bash
export MAVEN_OPTS="-Xmx1024m -Xms512m"
./mvnw spring-boot:run
```

## Development

### Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/fastbank/bankingapi/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── service/        # Business logic
│   │   │   ├── model/          # Data models
│   │   │   ├── repository/     # Data access layer
│   │   │   └── BankingApiApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/               # Unit and integration tests
├── pom.xml                     # Maven configuration
└── README.md
```

### Running Tests Only

```bash
./mvnw test
```

### Building JAR File

```bash
./mvnw clean package
java -jar target/banking-api-0.0.1-SNAPSHOT.jar
```

### Clean Build

```bash
./mvnw clean compile
```
