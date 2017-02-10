package com.eft.homework.service.impl;

import org.springframework.stereotype.Service;

import com.eft.homework.service.HomeworkService;
import com.eft.homework.util.HomeworkEnums;

/**
 * 
 * @author bekir.subasi
 *
 */
@Service
public class HomeworkServiceImpl implements HomeworkService {

	@Override
	public String getClearSettleUrl() {
		StringBuilder builder = new StringBuilder();
		for (HomeworkEnums.ClearSettle urlEnum : HomeworkEnums.ClearSettle.values()) {
			builder.append(urlEnum.name()).append(" = ").append(urlEnum.toString()).append("<br>");
		}

		return builder.toString();
	}

}
