package com.eft.homework;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class HomeworkApplication {

    public static final Date startTime = new Date();

	public static void main(String[] args) {
		SpringApplication.run(HomeworkApplication.class, args);
	}
}
