package com.fastbank.bankingapi.controller;

import com.fastbank.bankingapi.model.Account;
import com.fastbank.bankingapi.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AccountController.class)
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService accountService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testLogin_Success() throws Exception {
        Account account = new Account("John Doe");
        when(accountService.findByAccountNumber(account.getAccountNumber()))
            .thenReturn(Optional.of(account));

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("accountNumber", account.getAccountNumber());

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ownerName").value("John Doe"));
    }

    @Test
    void testLogin_AccountNotFound() throws Exception {
        when(accountService.findByAccountNumber("INVALID"))
            .thenReturn(Optional.empty());

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("accountNumber", "INVALID");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateAccount() throws Exception {
        Account account = new Account("Jane Smith");
        when(accountService.createAccount("Jane Smith")).thenReturn(account);

        Map<String, String> createRequest = new HashMap<>();
        createRequest.put("ownerName", "Jane Smith");

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ownerName").value("Jane Smith"))
                .andExpect(jsonPath("$.balance").value(0));
    }

    @Test
    void testGetAllAccounts() throws Exception {
        Account account1 = new Account("John Doe");
        Account account2 = new Account("Jane Smith");
        when(accountService.getAllAccounts()).thenReturn(Arrays.asList(account1, account2));

        mockMvc.perform(get("/api/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].ownerName").value("John Doe"))
                .andExpect(jsonPath("$[1].ownerName").value("Jane Smith"));
    }

    @Test
    void testDeposit() throws Exception {
        Account account = new Account("John Doe");
        account.setBalance(new BigDecimal("500.00"));
        
        when(accountService.deposit(eq(account.getAccountNumber()), any(BigDecimal.class), anyString()))
            .thenReturn(account);

        Map<String, Object> depositRequest = new HashMap<>();
        depositRequest.put("amount", "250.00");
        depositRequest.put("description", "Test deposit");

        mockMvc.perform(post("/api/accounts/" + account.getAccountNumber() + "/deposit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(depositRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.balance").value(500.00));
    }

    @Test
    void testWithdraw() throws Exception {
        Account account = new Account("John Doe");
        account.setBalance(new BigDecimal("300.00"));
        
        when(accountService.withdraw(eq(account.getAccountNumber()), any(BigDecimal.class), anyString()))
            .thenReturn(account);

        Map<String, Object> withdrawRequest = new HashMap<>();
        withdrawRequest.put("amount", "200.00");
        withdrawRequest.put("description", "Test withdrawal");

        mockMvc.perform(post("/api/accounts/" + account.getAccountNumber() + "/withdraw")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(withdrawRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.balance").value(300.00));
    }

    @Test
    void testTransfer() throws Exception {
        Map<String, Object> transferRequest = new HashMap<>();
        transferRequest.put("fromAccountNumber", "ACC123");
        transferRequest.put("toAccountNumber", "ACC456");
        transferRequest.put("amount", "100.00");
        transferRequest.put("description", "Test transfer");

        mockMvc.perform(post("/api/accounts/transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(transferRequest)))
                .andExpect(status().isOk());
    }
} 