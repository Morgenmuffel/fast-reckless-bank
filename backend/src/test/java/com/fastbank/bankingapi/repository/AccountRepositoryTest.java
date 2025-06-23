package com.fastbank.bankingapi.repository;

import com.fastbank.bankingapi.model.Account;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import java.util.Optional;

class AccountRepositoryTest {

    private AccountRepository accountRepository;
    private Account testAccount;

    @BeforeEach
    void setUp() {
        accountRepository = new AccountRepository();
        testAccount = new Account("John Doe");
    }

    @Test
    void testSaveAccount() {
        Account savedAccount = accountRepository.save(testAccount);
        
        assertEquals(testAccount, savedAccount);
        assertEquals(testAccount.getAccountNumber(), savedAccount.getAccountNumber());
        assertEquals("John Doe", savedAccount.getOwnerName());
    }

    @Test
    void testFindByAccountNumber() {
        accountRepository.save(testAccount);
        
        Optional<Account> found = accountRepository.findByAccountNumber(testAccount.getAccountNumber());
        
        assertTrue(found.isPresent());
        assertEquals(testAccount.getAccountNumber(), found.get().getAccountNumber());
        assertEquals("John Doe", found.get().getOwnerName());
    }

    @Test
    void testFindByAccountNumberNotFound() {
        Optional<Account> found = accountRepository.findByAccountNumber("NON_EXISTENT");
        
        assertFalse(found.isPresent());
    }

    @Test
    void testFindAll() {
        Account account1 = new Account("Alice");
        Account account2 = new Account("Bob");
        
        accountRepository.save(account1);
        accountRepository.save(account2);
        
        List<Account> allAccounts = accountRepository.findAll();
        
        assertEquals(2, allAccounts.size());
        assertTrue(allAccounts.contains(account1));
        assertTrue(allAccounts.contains(account2));
    }

    @Test
    void testFindAllEmpty() {
        List<Account> allAccounts = accountRepository.findAll();
        
        assertTrue(allAccounts.isEmpty());
    }

    @Test
    void testExistsByAccountNumber() {
        accountRepository.save(testAccount);
        
        assertTrue(accountRepository.existsByAccountNumber(testAccount.getAccountNumber()));
        assertFalse(accountRepository.existsByAccountNumber("NON_EXISTENT"));
    }

    @Test
    void testUpdateAccount() {
        accountRepository.save(testAccount);
        testAccount.setOwnerName("John Smith");
        
        Account updatedAccount = accountRepository.save(testAccount);
        
        assertEquals("John Smith", updatedAccount.getOwnerName());
        assertEquals(testAccount.getAccountNumber(), updatedAccount.getAccountNumber());
    }

    @Test
    void testConcurrentAccess() {
        // Test thread safety with multiple saves
        Account account1 = new Account("User1");
        Account account2 = new Account("User2");
        Account account3 = new Account("User3");
        
        // Simulate concurrent saves
        accountRepository.save(account1);
        accountRepository.save(account2);
        accountRepository.save(account3);
        
        assertEquals(3, accountRepository.findAll().size());
        assertTrue(accountRepository.existsByAccountNumber(account1.getAccountNumber()));
        assertTrue(accountRepository.existsByAccountNumber(account2.getAccountNumber()));
        assertTrue(accountRepository.existsByAccountNumber(account3.getAccountNumber()));
    }
} 