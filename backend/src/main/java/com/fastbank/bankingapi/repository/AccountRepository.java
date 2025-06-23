package com.fastbank.bankingapi.repository;

import com.fastbank.bankingapi.model.Account;
import org.springframework.stereotype.Repository;
import java.util.concurrent.ConcurrentHashMap;
import java.util.List;
import java.util.Optional;

@Repository
public class AccountRepository {
    private final ConcurrentHashMap<String, Account> accounts = new ConcurrentHashMap<>();

    public Account save(Account account) {
        accounts.put(account.getAccountNumber(), account);
        return account;
    }

    public Optional<Account> findByAccountNumber(String accountNumber) {
        return Optional.ofNullable(accounts.get(accountNumber));
    }

    public List<Account> findAll() {
        return accounts.values().stream().toList();
    }

    public boolean existsByAccountNumber(String accountNumber) {
        return accounts.containsKey(accountNumber);
    }
}
