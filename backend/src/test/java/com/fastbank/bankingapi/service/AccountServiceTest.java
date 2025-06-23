package com.fastbank.bankingapi.service;

import com.fastbank.bankingapi.model.Account;
import com.fastbank.bankingapi.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;

class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    private Account testAccount;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testAccount = new Account("John Doe");
        testAccount.setBalance(new BigDecimal("1000.00"));
    }

    @Test
    void testCreateAccount() {
        when(accountRepository.save(any(Account.class))).thenReturn(testAccount);

        Account createdAccount = accountService.createAccount("John Doe");

        assertNotNull(createdAccount);
        assertEquals("John Doe", createdAccount.getOwnerName());
        verify(accountRepository).save(any(Account.class));
    }

    @Test
    void testGetAllAccounts() {
        List<Account> accounts = Arrays.asList(testAccount, new Account("Jane Smith"));
        when(accountRepository.findAll()).thenReturn(accounts);

        List<Account> result = accountService.getAllAccounts();

        assertEquals(2, result.size());
        verify(accountRepository).findAll();
    }

    @Test
    void testFindByAccountNumber() {
        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));

        Optional<Account> result = accountService.findByAccountNumber(testAccount.getAccountNumber());

        assertTrue(result.isPresent());
        assertEquals(testAccount.getAccountNumber(), result.get().getAccountNumber());
        verify(accountRepository).findByAccountNumber(testAccount.getAccountNumber());
    }

    @Test
    void testDeposit() {
        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));
        when(accountRepository.save(testAccount)).thenReturn(testAccount);

        Account result = accountService.deposit(testAccount.getAccountNumber(), new BigDecimal("500.00"), "Test deposit");

        assertEquals(new BigDecimal("1500.00"), result.getBalance());
        assertEquals(1, result.getTransactions().size());
        verify(accountRepository).findByAccountNumber(testAccount.getAccountNumber());
        verify(accountRepository).save(testAccount);
    }

    @Test
    void testDepositAccountNotFound() {
        when(accountRepository.findByAccountNumber("INVALID")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            accountService.deposit("INVALID", new BigDecimal("500.00"), "Test deposit");
        });

        assertEquals("Account not found", exception.getMessage());
    }

    @Test
    void testWithdraw() {
        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));
        when(accountRepository.save(testAccount)).thenReturn(testAccount);

        Account result = accountService.withdraw(testAccount.getAccountNumber(), new BigDecimal("300.00"), "Test withdrawal");

        assertEquals(new BigDecimal("700.00"), result.getBalance());
        assertEquals(1, result.getTransactions().size());
        verify(accountRepository).findByAccountNumber(testAccount.getAccountNumber());
        verify(accountRepository).save(testAccount);
    }

    @Test
    void testWithdrawInsufficientFunds() {
        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            accountService.withdraw(testAccount.getAccountNumber(), new BigDecimal("1500.00"), "Test withdrawal");
        });

        assertEquals("Insufficient funds", exception.getMessage());
    }

    @Test
    void testWithdrawAccountNotFound() {
        when(accountRepository.findByAccountNumber("INVALID")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            accountService.withdraw("INVALID", new BigDecimal("100.00"), "Test withdrawal");
        });

        assertEquals("Account not found", exception.getMessage());
    }

    @Test
    void testTransfer() {
        Account toAccount = new Account("Jane Smith");
        toAccount.setBalance(new BigDecimal("500.00"));

        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));
        when(accountRepository.findByAccountNumber(toAccount.getAccountNumber()))
            .thenReturn(Optional.of(toAccount));
        when(accountRepository.save(any(Account.class))).thenReturn(testAccount).thenReturn(toAccount);

        accountService.transfer(testAccount.getAccountNumber(), toAccount.getAccountNumber(), 
                               new BigDecimal("200.00"), "Test transfer");

        verify(accountRepository, times(2)).findByAccountNumber(testAccount.getAccountNumber());
        verify(accountRepository, times(2)).findByAccountNumber(toAccount.getAccountNumber());
        verify(accountRepository, times(2)).save(any(Account.class));
    }

    @Test
    void testTransferSourceAccountNotFound() {
        when(accountRepository.findByAccountNumber("INVALID")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            accountService.transfer("INVALID", "ACC456", new BigDecimal("100.00"), "Test transfer");
        });

        assertEquals("Source account not found", exception.getMessage());
    }

    @Test
    void testTransferDestinationAccountNotFound() {
        when(accountRepository.findByAccountNumber(testAccount.getAccountNumber()))
            .thenReturn(Optional.of(testAccount));
        when(accountRepository.findByAccountNumber("INVALID")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            accountService.transfer(testAccount.getAccountNumber(), "INVALID", new BigDecimal("100.00"), "Test transfer");
        });

        assertEquals("Destination account not found", exception.getMessage());
    }
} 