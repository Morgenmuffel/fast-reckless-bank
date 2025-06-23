package com.fastbank.bankingapi.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class Transaction {
    private String id;
    private String accountId;
    private String type; // DEPOSIT, WITHDRAW, TRANSFER_IN, TRANSFER_OUT
    private BigDecimal amount;
    private String description;
    private LocalDateTime timestamp;
    private String category; // For AI categorization

    // Default constructor for Spring
    public Transaction() {}

    public Transaction(String accountId, String type, BigDecimal amount, String description) {
        this.id = UUID.randomUUID().toString();
        this.accountId = accountId;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.timestamp = LocalDateTime.now();
        this.category = categorizeTransaction(description); // Simple categorization
    }

    private String categorizeTransaction(String description) {
        // Simple rule-based categorization for now
        String desc = description.toLowerCase();
        if (desc.contains("grocery") || desc.contains("supermarket")) return "Food";
        if (desc.contains("gas") || desc.contains("fuel")) return "Transportation";
        if (desc.contains("salary") || desc.contains("payroll")) return "Income";
        return "Other";
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}