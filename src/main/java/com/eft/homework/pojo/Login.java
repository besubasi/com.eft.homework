package com.eft.homework.pojo;

public class Login {

	private String token;
	private String status;

	public Login() {
		super();
	}

	public Login(String token, String status) {
		super();
		this.token = token;
		this.status = status;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}