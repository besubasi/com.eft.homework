package com.eft.homework.service.impl;


import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.eft.homework.pojo.Login;
import com.eft.homework.service.HomeworkService;
import com.eft.homework.util.HomeworkEnums;
import com.eft.homework.util.HomeworkUtil;


@Service
public class HomeworkServiceImpl implements HomeworkService{
	

	@Override
	public Login login(String email, String password) {

		Map<String, Object> params = new LinkedHashMap<>();
		params.put("email", email);
		params.put("password", password);

		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.LOGIN, params);

		Login login = HomeworkUtil.convertJsonToObject(result, Login.class);
		
		if(login != null)
			HomeworkUtil.TOKEN = login.getToken();

		return login;
	}
	
	


	@Override
	public String getReport(String fromDate, String toDate, Integer merchant, Integer acquirer) {
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("fromDate", fromDate);
		params.put("toDate", toDate);
		if(merchant != null && merchant > 0)
			params.put("merchant", merchant);
		if(acquirer != null && acquirer > 0)
			params.put("acquirer", merchant);
			
		
		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTIONS_REPORT, params);		
		return result;
	}

	
	

	@Override
	public String getTransactionList(String fromDate, String toDate) {
		Map<String, Object> params = new LinkedHashMap<>();
		if(fromDate != null)
			params.put("fromDate", fromDate);
		if(toDate != null)
			params.put("toDate", toDate);
		
		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTION_LIST, params);		
		return result;
	}
	

	@Override
	public String getTransaction(String transactionId) {
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTION, params);
		return result;
	}


	@Override
	public String getClient(String transactionId) {
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.CLIENT, params);
		return result;
	}
	
	

	@Override
	public String getMerchant(String transactionId) {
		
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		String result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.MERCHANT, params);		
		return result;
	}

	 

}
