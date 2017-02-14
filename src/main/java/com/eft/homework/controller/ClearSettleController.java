package com.eft.homework.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eft.homework.model.Login;
import com.eft.homework.service.ClearSettleService;
import com.eft.homework.util.HomeworkUtil;

@RestController
public class ClearSettleController {
	
	@Autowired
	private ClearSettleService clearSettleService;
	
	public void setClearSettleService(ClearSettleService clearSettleService) {
		this.clearSettleService = clearSettleService;
	}

	

	/**
	 * Login Api
	 * 
	 * @param email
	 * @param password
	 * @return
	 */
	@RequestMapping("/authenticate")
	public Login authenticate(@RequestParam(value = "email", required = true ) String email,
			@RequestParam(value = "password", required = true) String password) {
		
		//We save email and password automatically authenticate when token is expired.
		HomeworkUtil.EMAIL = email;
		HomeworkUtil.PASSWORD = password;

		return clearSettleService.login(email, password);
	}
	
	
	/**
	 * Report Api
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/report")
	public String getReport(HttpServletRequest request) throws ServletException {
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		
		//YYYY-MM-DD
		
		
		String merchant = request.getParameter("merchant");
		String acquirer = request.getParameter("acquirer");
		Integer merchantId = merchant != null && !merchant.isEmpty() ? Integer.valueOf(merchant) : 0;
		Integer acquirerId = acquirer != null && !acquirer.isEmpty() ? Integer.valueOf(acquirer) : 0;
		
		return clearSettleService.getReport(fromDate, toDate, merchantId, acquirerId);
	}	
	
	
	
	/**
	 * Transaction List Api
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/transactionList")
	public String getTransactionList(HttpServletRequest request) throws ServletException {
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		String status = request.getParameter("status");
		String paymentMethod = request.getParameter("paymentMethod");
		String errorCode = request.getParameter("errorCode");
		String operation = request.getParameter("operation");
		String page = request.getParameter("page");
		String merchant = request.getParameter("merchantId");
		String acquirer = request.getParameter("acquirerId");
		
		return clearSettleService.getTransactionList(fromDate, toDate, status, paymentMethod, errorCode, operation, page, merchant, acquirer);
	}	
	
	
	/**
	 * Transaction Detail Api.
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/transaction")
	public String getTransaction(HttpServletRequest request) throws ServletException {
		String transactionId = request.getParameter("transactionId");
		return clearSettleService.getTransaction(transactionId);
	}	
		

	
	/**
	 * Client Detail Api
	 * 
	 * @param transactionId
	 * @return
	 */
	@RequestMapping("/client")
	public String getClient(HttpServletRequest request) throws ServletException {
		String transactionId = request.getParameter("transactionId");
		return clearSettleService.getClient(transactionId);
	}	
	

	/**
	 * Merchant Detail Api
	 * 
	 * @param transactionId
	 * @return
	 */
	@RequestMapping("/merchant")
	public String getMerchant(HttpServletRequest request) throws ServletException {
		String transactionId = request.getParameter("transactionId");
		return clearSettleService.getMerchant(transactionId);
	}
	
	

}
