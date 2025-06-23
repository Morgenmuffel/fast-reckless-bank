package com.fastbank.bankingapi.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;

class AccountTest {

    private Account account;

    @BeforeEach
    void setUp() {
        account = new Account("John Doe");
    }

    @Test
    void testAccountCreation() {
        assertNotNull(account.getAccountNumber());
        assertTrue(account.getAccountNumber().startsWith("ACC"));
        assertEquals("John Doe", account.getOwnerName());
        assertEquals(BigDecimal.ZERO, account.getBalance());
        assertNotNull(account.getCreatedAt());
        assertNotNull(account.getTransactions());
        assertTrue(account.getTransactions().isEmpty());
    }

    @Test
    void testAccountNumberGeneration() {
        Account account1 = new Account("Alice");
        Account account2 = new Account("Bob");
        
        assertNotEquals(account1.getAccountNumber(), account2.getAccountNumber());
        assertTrue(account1.getAccountNumber().startsWith("ACC"));
        assertTrue(account2.getAccountNumber().startsWith("ACC"));
    }

    @Test
    void testBalanceManipulation() {
        account.setBalance(new BigDecimal("100.50"));
        assertEquals(new BigDecimal("100.50"), account.getBalance());
    }

    @Test
    void testDefaultConstructor() {
        Account emptyAccount = new Account();
        assertNotNull(emptyAccount.getTransactions());
        assertTrue(emptyAccount.getTransactions().isEmpty());
    }

    @Test
    void testTransactionsList() {
        Transaction transaction = new Transaction(account.getAccountNumber(), "DEPOSIT", new BigDecimal("50.00"), "Test deposit");
        account.getTransactions().add(transaction);
        
        assertEquals(1, account.getTransactions().size());
        assertEquals(transaction, account.getTransactions().get(0));
    }
} 