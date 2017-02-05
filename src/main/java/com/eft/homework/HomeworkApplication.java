package com.eft.homework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication //(scanBasePackages = { "com.eft.homework","com.eft.homework.controller","com.eft.homework.service"})
public class HomeworkApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeworkApplication.class, args);
	}
}
