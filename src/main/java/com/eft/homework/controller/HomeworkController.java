package com.eft.homework.controller;

import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.eft.homework.HomeworkApplication;
import com.eft.homework.service.HomeworkService;

@RestController
public class HomeworkController {

	@Autowired
	private final HomeworkService homeworkService;

	public HomeworkController(HomeworkService homeworkService) {
		this.homeworkService = homeworkService;
	}

	
	@RequestMapping("/")
	public ModelAndView welcomePage() {
		return new ModelAndView("redirect:" + "/login.htm");
	}	


	@RequestMapping("/ping")
    @ResponseBody
    public String ping() {
    	return MessageFormat.format("Server started at {0}", HomeworkApplication.startTime);
    }    
	

	@RequestMapping("/clearSettleUrl")
	public String urlList() {
		return homeworkService.getClearSettleUrl();
	}

    
}
