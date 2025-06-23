# Banking App - User Flows & Wireframes

## Complete User Flow Diagram

```
START
  │
  ▼
┌─────────────────┐
│   Login Screen  │ ────────────┐
│                 │             │
│ [Account Number]│             │
│ [Login] [Create]│             │
└─────────────────┘             │
  │                             │
  ▼                             ▼
┌─────────────────┐    ┌─────────────────┐
│Account Dashboard│    │ Create Account  │
│                 │    │                 │
│ Balance: €500   │    │ [Owner Name]    │
│ [Deposit]       │    │ [Create]        │
│ [Withdraw]      │    │                 │
│ [Transfer]      │    └─────────────────┘
│ [AI Insights]   │             │
│ Transactions    │             │
└─────────────────┘             │
  │       │       │             │
  ▼       ▼       ▼             │
┌─────────────────┐             │
│ Transaction     │◄────────────┘
│ Forms           │
│                 │
│ Amount: €___    │
│ Description     │
│ [Confirm]       │
└─────────────────┘
  │
  ▼
┌─────────────────┐
│ Success/Error   │
│ Message         │
│                 │
│ [Back to        │
│  Dashboard]     │
└─────────────────┘
  │
  ▼
┌─────────────────┐
│ AI Insights     │
│ Screen          │
│                 │
│ [Generate       │
│  Insights]      │
│ Analysis        │
│ Recommendations │
│ [Back]          │
└─────────────────┘
```

## Detailed User Flows

### Flow 1: New User Registration
```
1. User arrives at login screen
2. User clicks "Create New Account"
3. User enters owner name
4. System generates account number
5. User redirected to dashboard
6. Success message displayed
```

### Flow 2: Existing User Login
```
1. User enters account number
2. System validates account exists
3. User redirected to dashboard
4. Account details displayed
```

### Flow 3: Make a Deposit
```
1. From dashboard, click "Deposit"
2. Enter amount and description
3. Confirm transaction
4. AI categorization starts (async)
5. Balance updated immediately
6. Success message shown
7. Return to dashboard with updated balance
```

### Flow 4: Make a Withdrawal
```
1. From dashboard, click "Withdraw"
2. Enter amount and description
3. System checks sufficient funds
4. If insufficient: Error message + return to form
5. If sufficient: Confirm transaction
6. AI categorization starts (async)
7. Balance updated
8. Success message + return to dashboard
```

### Flow 5: Transfer Money
```
1. From dashboard, click "Transfer"
2. Enter destination account number
3. System validates destination exists
4. If not found: Error message + return to form
5. If found: Show destination account details
6. Enter amount and description
7. Confirm transfer
8. Both accounts updated
9. Success message + return to dashboard
```

### Flow 6: View AI Insights
```
1. From dashboard, click "AI Insights"
2. Navigate to insights screen
3. Click "Generate Insights"
4. Loading state displayed
5. AI analyzes spending patterns
6. Comprehensive insights displayed:
   - Financial health score
   - Spending trends analysis
   - Personalized recommendations
   - Budget suggestions
   - Savings opportunities
   - Monthly projections
   - Alerts (if any)
7. User can refresh insights or return to dashboard
```

## Error Flows

### Error Flow 1: Account Not Found
```
Login → Enter invalid account → Error message → Stay on login form
```

### Error Flow 2: Insufficient Funds
```
Withdraw → Enter amount > balance → Error message → Return to withdraw form
```

### Error Flow 3: Invalid Transfer Destination
```
Transfer → Enter invalid account → Error message → Return to transfer form
```

### Error Flow 4: AI Service Failure
```
Transaction created → AI categorization fails → Transaction still saved → Category shows as "Processing..." → User notified
Insights generation → AI fails → Error message → Option to retry
```

---

# Screen Wireframes

## 1. Login Screen

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                   FAST & RECKLESS BANK                     │
│                                                             │
│               ┌─────────────────────────────┐               │
│               │                             │               │
│               │    Enter Account Number     │               │
│               │                             │               │
│               │  [ACC________________]      │               │
│               │                             │               │
│               │  ┌─────────┐ ┌─────────────┐│               │
│               │  │  Login  │ │Create Account││               │
│               │  └─────────┘ └─────────────┘│               │
│               │                             │               │
│               └─────────────────────────────┘               │
│                                                             │
│                                                             │
│  💡 Demo accounts available:                                │
│     ACC1234567890 (John Doe)                               │
│     ACC0987654321 (Jane Smith)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. Account Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Welcome, John Doe                          [Logout]        │
│ Account: ACC1234567890                                      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                CURRENT BALANCE                          │ │
│ │                   €1,247.50                             │ │
│ │           Account created: Jan 15, 2025                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐        │
│ │    +    │ │    -    │ │   ⇄     │ │    📊       │        │
│ │ Deposit │ │Withdraw │ │Transfer │ │AI Insights  │        │
│ └─────────┘ └─────────┘ └─────────┘ └─────────────┘        │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │               RECENT TRANSACTIONS                       │ │
│ │                                                         │ │
│ │ 📍 Grocery shopping at Rewe          🏷️Food    -€45.50│ │
│ │    Jan 18, 2025 • AI: 95%                              │ │
│ │                                                         │ │
│ │ 💰 Salary deposit                   🏷️Income   +€2000 │ │
│ │    Jan 15, 2025 • AI: 98%                              │ │
│ │                                                         │ │
│ │ ☕ Coffee at Starbucks              🏷️Food     -€4.50│ │
│ │    Jan 14, 2025 • AI: 92%                              │ │
│ │                                                         │ │
│ │                    [View All]                           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 3. Transaction Form (Deposit/Withdraw)

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Dashboard]                                       │
│                                                             │
│                       DEPOSIT MONEY                        │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Current Balance: €1,247.50                              │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Amount (€)                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 250.00                                                  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Description                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Freelance payment from client                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ After this transaction:                                 │ │
│ │ New Balance: €1,497.50                                  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│           ┌─────────┐        ┌─────────────┐               │
│           │ Cancel  │        │   Deposit   │               │
│           └─────────┘        │   €250.00   │               │
│                              └─────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## 4. Transfer Form

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Dashboard]                                       │
│                                                             │
│                      TRANSFER MONEY                        │
│                                                             │
│ From Account                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ACC1234567890 (John Doe) - €1,247.50                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ To Account Number                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ACC0987654321                               [Verify]    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ✅ Verified: Jane Smith                                     │
│                                                             │
│ Amount (€)                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 100.00                                                  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Description                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Dinner split payment                                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ⚠️  Transfer fees: €0.00                                   │
│                                                             │
│           ┌─────────┐        ┌─────────────┐               │
│           │ Cancel  │        │  Transfer   │               │
│           └─────────┘        │  €100.00    │               │
│                              └─────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## 5. AI Insights Screen (Initial State)

```
┌─────────────────────────────────────────────────────────────┐
│ AI Financial Insights                   [← Back to Dashboard]│
│ Account: ACC1234567890                                      │
│                                                             │
│                                                             │
│               ┌─────────────────────────────┐               │
│               │                             │               │
│               │            🤖               │               │
│               │                             │               │
│               │   Generate AI-Powered       │               │
│               │        Insights             │               │
│               │                             │               │
│               │ Get personalized financial  │               │
│               │ analysis and recommendations│               │
│               │ based on your spending      │               │
│               │ patterns.                   │               │
│               │                             │               │
│               │  ┌─────────────────────┐    │               │
│               │  │ Analyze My Spending │    │               │
│               │  └─────────────────────┘    │               │
│               │                             │               │
│               └─────────────────────────────┘               │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 6. AI Insights Screen (Loading State)

```
┌─────────────────────────────────────────────────────────────┐
│ AI Financial Insights                   [← Back to Dashboard]│
│ Account: ACC1234567890                                      │
│                                                             │
│                                                             │
│               ┌─────────────────────────────┐               │
│               │                             │               │
│               │            ⭘               │               │
│               │                             │               │
│               │   Analyzing your financial  │               │
│               │         data...             │               │
│               │                             │               │
│               │  This may take a few seconds│               │
│               │                             │               │
│               └─────────────────────────────┘               │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 7. AI Insights Screen (Results)

```
┌─────────────────────────────────────────────────────────────┐
│ AI Financial Insights                   [← Back to Dashboard]│
│ Account: ACC1234567890                                      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Financial Health: GOOD ✅  • Generated: Jan 18, 2025   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📊 SPENDING ANALYSIS                                    │ │
│ │                                                         │ │
│ │ Your spending shows healthy patterns with consistent    │ │
│ │ income and controlled expenses. Food spending (€180/    │ │
│ │ month) is within reasonable limits, though dining out   │ │
│ │ could be optimized for better savings.                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💡 RECOMMENDATIONS                                      │ │
│ │                                                         │ │
│ │ ✓ Set up automatic savings of €200/month               │ │
│ │ ✓ Reduce dining out by 20% to save €40/month          │ │
│ │ ✓ Consider budgeting app for better expense tracking   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📋 SUGGESTED MONTHLY BUDGET                             │ │
│ │                                                         │ │
│ │ Food: €400      Transportation: €200                   │ │
│ │ Entertainment: €150    Shopping: €300                  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💰 SAVINGS OPPORTUNITIES                                │ │
│ │                                                         │ │
│ │ You could save €120/month by cooking at home 3 more    │ │
│ │ times per week and switching to a cheaper phone plan.  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│     ┌─────────────┐        ┌─────────────────┐            │
│     │Refresh      │        │Back to Dashboard│            │
│     │Insights     │        │                 │            │
│     └─────────────┘        └─────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 8. Success/Error States

### Success Message
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│               ┌─────────────────────────────┐               │
│               │             ✅              │               │
│               │                             │               │
│               │    Transaction Successful   │               │
│               │                             │               │
│               │  Deposited €250.00 to your │               │
│               │        account              │               │
│               │                             │               │
│               │ New Balance: €1,497.50      │               │
│               │                             │               │
│               │  ┌─────────────────────┐    │               │
│               │  │ Back to Dashboard   │    │               │
│               │  └─────────────────────┘    │               │
│               └─────────────────────────────┘               │
│                                                             │
│ 🤖 AI is analyzing this transaction for better insights... │
└─────────────────────────────────────────────────────────────┘
```

### Error Message
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│               ┌─────────────────────────────┐               │
│               │             ❌              │               │
│               │                             │               │
│               │    Transaction Failed       │               │
│               │                             │               │
│               │   Insufficient funds        │               │
│               │                             │               │
│               │ Available: €1,247.50        │               │
│               │ Requested: €1,500.00        │               │
│               │                             │               │
│               │  ┌─────────────────────┐    │               │
│               │  │   Try Again         │    │               │
│               │  └─────────────────────┘    │               │
│               └─────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 9. Create Account Screen

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Login]                                           │
│                                                             │
│                    CREATE NEW ACCOUNT                      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │ Account Holder Name                                     │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Enter your full name                                │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ 📝 Your account number will be generated automatically │ │
│ │                                                         │ │
│ │ 💰 Starting balance: €0.00                             │ │
│ │                                                         │ │
│ │ ⚡ AI categorization enabled for all transactions      │ │
│ │                                                         │ │
│ │           ┌─────────┐        ┌─────────────┐           │ │
│ │           │ Cancel  │        │   Create    │           │ │
│ │           └─────────┘        │  Account    │           │ │
│ │                              └─────────────┘           │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## UX Design Principles Applied

### 1. **Clarity & Simplicity**
- Clear navigation paths
- Minimal cognitive load
- Obvious primary actions

### 2. **Feedback & Status**
- Loading states for AI processing
- Success/error confirmations
- Balance previews before transactions

### 3. **Error Prevention**
- Input validation
- Confirmation steps for large amounts
- Clear error messages with solutions

### 4. **Progressive Disclosure**
- Start with essential actions
- AI insights as advanced feature
- Detailed transaction history on demand

### 5. **Accessibility**
- High contrast colors
- Clear button labels
- Logical tab order
- Screen reader friendly


## 1. **Core Models**

- Account class (id, balance, accountNumber)
- Transaction class for tracking operations
- Use ConcurrentHashMap<String, Account> for thread-safe in-memory storage


## 2. **REST Controllers**

### 1. AccountController with endpoints:

POST /accounts (create)
GET /accounts (list all)
GET /accounts/{id} (get one)


### 2. TransactionController:

POST /accounts/{id}/deposit
POST /accounts/{id}/withdraw
POST /transfer




## 3. **Service Layer**

AccountService with business logic
Handle concurrent access with synchronized methods
Proper error handling (insufficient funds, account not found)


## 4. **CORS Configuration**

Enable CORS for React frontend