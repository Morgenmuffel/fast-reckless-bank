package com.fastbank.bankingapi.controller;

import com.fastbank.bankingapi.model.Account;
import com.fastbank.bankingapi.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // For React dev server
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<Account> login(@RequestBody Map<String, String> request) {
        String accountNumber = request.get("accountNumber");
        Optional<Account> account = accountService.findByAccountNumber(accountNumber);
        
        if (account.isPresent()) {
            return ResponseEntity.ok(account.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/accounts")
    public Account createAccount(@RequestBody Map<String, String> request) {
        String ownerName = request.get("ownerName");
        return accountService.createAccount(ownerName);
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping("/accounts/{accountNumber}/deposit")
    public Account deposit(@PathVariable String accountNumber, @RequestBody Map<String, Object> request) {
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description").toString();
        return accountService.deposit(accountNumber, amount, description);
    }

    @PostMapping("/accounts/{accountNumber}/withdraw")
    public Account withdraw(@PathVariable String accountNumber, @RequestBody Map<String, Object> request) {
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description").toString();
        return accountService.withdraw(accountNumber, amount, description);
    }

    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody Map<String, Object> request) {
        String fromAccountNumber = request.get("fromAccountNumber").toString();
        String toAccountNumber = request.get("toAccountNumber").toString();
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description").toString();
        accountService.transfer(fromAccountNumber, toAccountNumber, amount, description);
    }
}

