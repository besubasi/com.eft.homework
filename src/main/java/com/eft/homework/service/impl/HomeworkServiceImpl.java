package com.eft.homework.service.impl;


import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.eft.homework.pojo.HttpsResult;
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

		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.LOGIN, params);

		Login login = null;
		if(result.getResponseCode() == 200 ){
			login = HomeworkUtil.convertJsonToObject(result.getJsonResult(), Login.class);	
			HomeworkUtil.TOKEN = login.getToken();
		}
		
		return login;
	}
	
	


	@Override
	public String getReport(String fromDate, String toDate, Integer merchant, Integer acquirer) {
		if(!this.hasToken())
			return "We don't have Token";
		
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("fromDate", fromDate);
		params.put("toDate", toDate);
		if(merchant != null && merchant > 0)
			params.put("merchant", merchant);
		if(acquirer != null && acquirer > 0)
			params.put("acquirer", merchant);
			
		
		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTIONS_REPORT, params);		
		return result.getResponseCode() == 200 ? result.getJsonResult() : result.getResposenMessage();
	}

	
	

	@Override
	public String getTransactionList(String fromDate, String toDate) {
		if(!this.hasToken())
			return "We don't have Token";

		Map<String, Object> params = new LinkedHashMap<>();
		if(fromDate != null)
			params.put("fromDate", fromDate);
		if(toDate != null)
			params.put("toDate", toDate);
		
		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTION_LIST, params);		
		return result.getResponseCode() == 200 ? result.getJsonResult() : result.getResposenMessage();
	}
	

	@Override
	public String getTransaction(String transactionId) {
		if(!this.hasToken())
			return "We don't have Token";

		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.TRANSACTION, params);
		return result.getResponseCode() == 200 ? result.getJsonResult() : result.getResposenMessage();
	}


	@Override
	public String getClient(String transactionId) {
		if(!this.hasToken())
			return "We don't have Token";

		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.CLIENT, params);
		return result.getResponseCode() == 200 ? result.getJsonResult() : result.getResposenMessage();
	}
	
	

	@Override
	public String getMerchant(String transactionId) {
		if(!this.hasToken())
			return "We don't have Token";
		
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("transactionId", transactionId);
		
		HttpsResult result = HomeworkUtil.sendHttpRequest(HomeworkEnums.ClearSettle.MERCHANT, params);		
		return result.getResponseCode() == 200 ? result.getJsonResult() : result.getResposenMessage();
	}
	
	
	/**
	 * If token is expired then automatically authenticate
	 * 
	 * @return
	 */
	private boolean hasToken(){
		if(HomeworkUtil.TOKEN != null)
			return true;
		
		Login login = this.login(HomeworkUtil.EMAIL, HomeworkUtil.PASSWORD);		
		return login != null;		
	}

}
