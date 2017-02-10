package com.eft.homework.model;

public class Login {

	private boolean success;
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

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
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
