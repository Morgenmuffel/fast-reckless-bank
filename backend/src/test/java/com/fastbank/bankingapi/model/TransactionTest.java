package com.fastbank.bankingapi.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;

class TransactionTest {

    private Transaction transaction;

    @BeforeEach
    void setUp() {
        transaction = new Transaction("ACC123456789", "DEPOSIT", new BigDecimal("100.00"), "Test deposit");
    }

    @Test
    void testTransactionCreation() {
        assertNotNull(transaction.getId());
        assertEquals("ACC123456789", transaction.getAccountId());
        assertEquals("DEPOSIT", transaction.getType());
        assertEquals(new BigDecimal("100.00"), transaction.getAmount());
        assertEquals("Test deposit", transaction.getDescription());
        assertNotNull(transaction.getTimestamp());
        assertEquals("Other", transaction.getCategory()); // Default category
    }

    @Test
    void testIdGeneration() {
        Transaction t1 = new Transaction("ACC123", "DEPOSIT", new BigDecimal("50"), "Test 1");
        Transaction t2 = new Transaction("ACC456", "WITHDRAW", new BigDecimal("25"), "Test 2");
        
        assertNotEquals(t1.getId(), t2.getId());
        assertNotNull(t1.getId());
        assertNotNull(t2.getId());
    }

    @Test
    void testCategorization() {
        Transaction grocery = new Transaction("ACC123", "WITHDRAW", new BigDecimal("45.50"), "Grocery shopping at supermarket");
        assertEquals("Food", grocery.getCategory());

        Transaction gas = new Transaction("ACC123", "WITHDRAW", new BigDecimal("60.00"), "Gas station fuel");
        assertEquals("Transportation", gas.getCategory());

        Transaction salary = new Transaction("ACC123", "DEPOSIT", new BigDecimal("2000.00"), "Monthly salary payroll");
        assertEquals("Income", salary.getCategory());

        Transaction other = new Transaction("ACC123", "WITHDRAW", new BigDecimal("25.00"), "Random expense");
        assertEquals("Other", other.getCategory());
    }

    @Test
    void testDefaultConstructor() {
        Transaction emptyTransaction = new Transaction();
        assertNull(emptyTransaction.getId());
        assertNull(emptyTransaction.getAccountId());
        assertNull(emptyTransaction.getType());
        assertNull(emptyTransaction.getAmount());
        assertNull(emptyTransaction.getDescription());
        assertNull(emptyTransaction.getTimestamp());
        assertNull(emptyTransaction.getCategory());
    }

    @Test
    void testSettersAndGetters() {
        Transaction t = new Transaction();
        t.setId("test-id");
        t.setAccountId("ACC999");
        t.setType("TRANSFER");
        t.setAmount(new BigDecimal("150.75"));
        t.setDescription("Transfer test");
        t.setCategory("Custom");

        assertEquals("test-id", t.getId());
        assertEquals("ACC999", t.getAccountId());
        assertEquals("TRANSFER", t.getType());
        assertEquals(new BigDecimal("150.75"), t.getAmount());
        assertEquals("Transfer test", t.getDescription());
        assertEquals("Custom", t.getCategory());
    }
} 