package com.eft.homework.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eft.homework.pojo.Login;
import com.eft.homework.service.HomeworkService;
import com.eft.homework.util.HomeworkUtil;

@RestController
public class HomeworkController {

	
	private final HomeworkService homeworkService;

	@Autowired
	public HomeworkController(HomeworkService homeworkService) {
		this.homeworkService = homeworkService;
	}



	/**
	 * Login Api
	 * 
	 * @param email
	 * @param password
	 * @return
	 */
	@RequestMapping("/login")
	public Login login(@RequestParam(value = "email", required = true ) String email,
			@RequestParam(value = "password", required = true) String password) {
		
		//We save email and password automatically authenticate when token is expired.
		HomeworkUtil.EMAIL = email;
		HomeworkUtil.PASSWORD = password;

		return homeworkService.login(email, password);
	}
	
	
	/**
	 * Report Api
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/report")
	public String getReport(@RequestParam(value = "fromDate" , required = true) String fromDate, 
			@RequestParam(value = "toDate", required = true) String toDate,
			@RequestParam(value = "merchant", required=false) Integer merchant,
			@RequestParam(value = "acquirer", required=false) Integer acquirer ) {
		
		
		return homeworkService.getReport(fromDate, toDate, merchant, acquirer);
	}	
	
	
	
	/**
	 * Transaction List Api
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/transactionList")
	public String getTransactionList(@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		return homeworkService.getTransactionList(fromDate, toDate);
	}	
	
	
	/**
	 * Transaction Detail Api.
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	@RequestMapping("/transaction")
	public String getTransaction(@RequestParam(value = "transactionId", required = true) String transactionId) {
		return homeworkService.getTransaction(transactionId);
	}	
		

	
	/**
	 * Client Detail Api
	 * 
	 * @param transactionId
	 * @return
	 */
	@RequestMapping("/client")
	public String getClient(@RequestParam(value = "transactionId", required = true) String transactionId) {
		return homeworkService.getClient(transactionId);
	}	
	

	/**
	 * Merchant Detail Api
	 * 
	 * @param transactionId
	 * @return
	 */
	@RequestMapping("/merchant")
	public String getMerchant(@RequestParam(value = "transactionId", required = true) String transactionId) {
		return homeworkService.getMerchant(transactionId);
	}
	
	

}
