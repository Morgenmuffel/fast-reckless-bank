package com.fastbank.bankingapi.service;

import com.fastbank.bankingapi.model.Account;
import com.fastbank.bankingapi.model.Transaction;
import com.fastbank.bankingapi.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(String ownerName) {
        Account account = new Account(ownerName);
        Account savedAccount = accountRepository.save(account);

        // Log the new account creation
        logger.info("New account created: {} for owner: {}", savedAccount.getAccountNumber(), ownerName);
        System.out.println("New account created: " + savedAccount.getAccountNumber() + " for owner: " + ownerName);

        return savedAccount;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> findByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    public synchronized Account deposit(String accountNumber, BigDecimal amount, String description) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance().add(amount));
        Transaction transaction = new Transaction(accountNumber, "DEPOSIT", amount, description);
        account.getTransactions().add(transaction);

        return accountRepository.save(account);
    }

    public synchronized Account withdraw(String accountNumber, BigDecimal amount, String description) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        account.setBalance(account.getBalance().subtract(amount));
        Transaction transaction = new Transaction(accountNumber, "WITHDRAW", amount, description);
        account.getTransactions().add(transaction);

        return accountRepository.save(account);
    }

    public synchronized void transfer(String fromAccountNumber, String toAccountNumber, BigDecimal amount, String description) {
        // Verify both accounts exist first
        accountRepository.findByAccountNumber(fromAccountNumber)
            .orElseThrow(() -> new RuntimeException("Source account not found"));
        accountRepository.findByAccountNumber(toAccountNumber)
            .orElseThrow(() -> new RuntimeException("Destination account not found"));

        withdraw(fromAccountNumber, amount, "Transfer to " + toAccountNumber + ": " + description);
        deposit(toAccountNumber, amount, "Transfer from " + fromAccountNumber + ": " + description);
    }
}
