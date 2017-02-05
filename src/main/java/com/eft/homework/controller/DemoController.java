package com.eft.homework.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eft.homework.pojo.Login;
import com.eft.homework.service.DemoService;

@RestController
public class DemoController {

	private final DemoService demoService;

	@Autowired
	public DemoController(DemoService demoService) {
		this.demoService = demoService;
	}



	@RequestMapping("/hello")
	public String hello(@RequestParam(value = "name", required = false, defaultValue = "World") String name) {
		return demoService.sayHello(name);
	}

	@RequestMapping("/listUrl")
	public String listUrl() {
		return demoService.getClearSettleUrl();
	}
	
	@RequestMapping("/loginPojo")
	public Login loginPojo() {
		return demoService.loginPojo();
	}
	
	
}
