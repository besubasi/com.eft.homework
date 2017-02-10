package com.eft.homework.service;

import com.eft.homework.model.Login;

public interface ClearSettleService {
	
	public Login login(String email, String password);
	
	public String getReport(String fromDate, String toDate, Integer merchant, Integer acquirer);
	
	public String getTransactionList(String fromDate, String toDate);
	
	public String getTransaction(String transactionId);

	public String getClient(String transactionId);
	
	public String getMerchant(String transactionId);
	
}
