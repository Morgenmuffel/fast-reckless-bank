package com.fastbank.bankingapi.config;

import com.fastbank.bankingapi.model.Account;
import com.fastbank.bankingapi.model.Transaction;
import com.fastbank.bankingapi.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if demo accounts already exist
        if (!accountRepository.existsByAccountNumber("ACC1234567890")) {
            // Create John Doe's account
            Account johnAccount = new Account("John Doe");
            johnAccount.setAccountNumber("ACC1234567890");
            johnAccount.setBalance(new BigDecimal("1500.00"));
            johnAccount.setCreatedAt(LocalDateTime.now().minusDays(30));

            // Add some sample transactions for John
            Transaction johnDeposit1 = new Transaction("ACC1234567890", "DEPOSIT", new BigDecimal("2000.00"), "Initial deposit");
            johnDeposit1.setTimestamp(LocalDateTime.now().minusDays(30));
            johnAccount.getTransactions().add(johnDeposit1);

            Transaction johnWithdraw1 = new Transaction("ACC1234567890", "WITHDRAW", new BigDecimal("300.00"), "ATM withdrawal");
            johnWithdraw1.setTimestamp(LocalDateTime.now().minusDays(15));
            johnAccount.getTransactions().add(johnWithdraw1);

            Transaction johnDeposit2 = new Transaction("ACC1234567890", "DEPOSIT", new BigDecimal("800.00"), "Salary deposit");
            johnDeposit2.setTimestamp(LocalDateTime.now().minusDays(7));
            johnAccount.getTransactions().add(johnDeposit2);

            Transaction johnWithdraw2 = new Transaction("ACC1234567890", "WITHDRAW", new BigDecimal("1000.00"), "Rent payment");
            johnWithdraw2.setTimestamp(LocalDateTime.now().minusDays(3));
            johnAccount.getTransactions().add(johnWithdraw2);

            accountRepository.save(johnAccount);
            System.out.println("Demo account created: ACC1234567890 for John Doe with balance: €" + johnAccount.getBalance());
        }

        if (!accountRepository.existsByAccountNumber("ACC0987654321")) {
            // Create Jane Smith's account
            Account janeAccount = new Account("Jane Smith");
            janeAccount.setAccountNumber("ACC0987654321");
            janeAccount.setBalance(new BigDecimal("2750.50"));
            janeAccount.setCreatedAt(LocalDateTime.now().minusDays(45));

            // Add some sample transactions for Jane
            Transaction janeDeposit1 = new Transaction("ACC0987654321", "DEPOSIT", new BigDecimal("3000.00"), "Initial deposit");
            janeDeposit1.setTimestamp(LocalDateTime.now().minusDays(45));
            janeAccount.getTransactions().add(janeDeposit1);

            Transaction janeTransfer1 = new Transaction("ACC0987654321", "TRANSFER", new BigDecimal("500.00"), "Transfer to savings");
            janeTransfer1.setTimestamp(LocalDateTime.now().minusDays(20));
            janeAccount.getTransactions().add(janeTransfer1);

            Transaction janeDeposit2 = new Transaction("ACC0987654321", "DEPOSIT", new BigDecimal("1200.00"), "Freelance payment");
            janeDeposit2.setTimestamp(LocalDateTime.now().minusDays(10));
            janeAccount.getTransactions().add(janeDeposit2);

            Transaction janeWithdraw1 = new Transaction("ACC0987654321", "WITHDRAW", new BigDecimal("200.00"), "Shopping");
            janeWithdraw1.setTimestamp(LocalDateTime.now().minusDays(5));
            janeAccount.getTransactions().add(janeWithdraw1);

            Transaction janeDeposit3 = new Transaction("ACC0987654321", "DEPOSIT", new BigDecimal("250.50"), "Cashback bonus");
            janeDeposit3.setTimestamp(LocalDateTime.now().minusDays(1));
            janeAccount.getTransactions().add(janeDeposit3);

            accountRepository.save(janeAccount);
            System.out.println("Demo account created: ACC0987654321 for Jane Smith with balance: €" + janeAccount.getBalance());
        }

        System.out.println("Demo data initialization completed!");
    }
}
