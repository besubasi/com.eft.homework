package com.eft.homework;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.eft.homework.pojo.Login;
import com.eft.homework.service.HomeworkService;
import com.eft.homework.service.impl.HomeworkServiceImpl;
import com.eft.homework.util.HomeworkUtil;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HomeworkApplicationTests {

	private final static String email = "demo@bumin.com.tr";
	private final static String password = "cjaiU8CV";
	private final static HomeworkService homeworkService = new HomeworkServiceImpl();
	
	@Test
	public void test(){
		
		testLogin();
		//testTransactionList();
		//testReport();
		//testTransaction();
		//testClient();
		testMerchant();		
	}


	
	public void testLogin() {

		Login login = homeworkService.login(email, password);
		if(login != null){
			System.out.println("TOKEN : "+login.getToken());
		}else{
			System.out.println("We don't have Token");
		}
	}
	
	
	
	public void testTransactionList() {

		HomeworkUtil.TOKEN = "asdfsjdlfjsldfj";
		String fromDate = "2017-01-01";
		String toDate = "2017-02-05";

		String result = homeworkService.getTransactionList(fromDate, toDate);
		System.out.println("TransactionList : "+result);

	}	
	

	
	public void testReport() {
		
		HomeworkUtil.TOKEN = "asdfsjdlfjsldfj";
		String fromDate = "2017-01-01";
		String toDate = "2017-02-05";
		Integer merchant = null;
		Integer acquirer = null;

		String result = homeworkService.getReport(fromDate, toDate, merchant, acquirer);
		System.out.println("Report : "+result);

	}
	
	
	
	public void testTransaction() {

		String transactionId = "852697-1486050205-3";

		String result = homeworkService.getTransaction(transactionId);
		System.out.println("Transaction : "+result);
	}
	
	
	
	public void testClient() {

		String transactionId = "852697-1486050205-3";

		String result = homeworkService.getClient(transactionId);
		System.out.println("Client : "+result);
	}
	
	
	public void testMerchant() {

		String transactionId = "852697-1486050205-3";

		String result = homeworkService.getMerchant(transactionId);
		System.out.println("Merchant : "+result);
	}	
     
	/*
	@Test
    public static void testLogin() {
		try {
			TestRestTemplate restTemplate = new TestRestTemplate()
			ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8080/login?email="+email+"&password="+password,
					String.class);
			HttpHeaders headers = response.getHeaders();
			
			System.out.println("headers="+headers.getVary());
			System.out.println("Body="+response.getBody());
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    */

}
