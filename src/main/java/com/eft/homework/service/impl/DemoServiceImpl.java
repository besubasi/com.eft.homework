package com.eft.homework.service.impl;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.eft.homework.pojo.Login;
import com.eft.homework.service.DemoService;
import com.eft.homework.util.HomeworkEnums;
import com.eft.homework.util.HomeworkUtil;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Deneme icin basit apiler
 * 
 * @author bekir.subasi
 *
 */
@Service
public class DemoServiceImpl implements DemoService {

	@Override
	public String sayHello(String name) {
		return "Hello " + name;
	}

	@Override
	public String getClearSettleUrl() {
		StringBuilder builder = new StringBuilder();
		for (HomeworkEnums.ClearSettle urlEnum : HomeworkEnums.ClearSettle.values()) {
			builder.append(urlEnum.name()).append(" = ").append(urlEnum.toString()).append("<br>");
		}

		return builder.toString();
	}

	@Override
	public Login loginPojo() {
		String json = "{\"token\":\"eyJ0eXAiOiJKV1QizfQ.tq5ogivQnuEe8UF9M62TcYuGHKG1rsb-NAxeqn1p0b4\",\"status\":\"APPROVED\"}";
		
		return HomeworkUtil.convertJsonToObject(json, Login.class);
	}

}
