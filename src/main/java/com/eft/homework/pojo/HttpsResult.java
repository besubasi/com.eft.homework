package com.eft.homework.pojo;

public class HttpsResult {

	private int responseCode;
	private String resposenMessage;
	private String jsonResult;

	public HttpsResult() {
		super();
	}

	public HttpsResult(int responseCode, String resposenMessage) {
		super();
		this.responseCode = responseCode;
		this.resposenMessage = resposenMessage;
	}

	public int getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(int responseCode) {
		this.responseCode = responseCode;
	}

	public String getResposenMessage() {
		return resposenMessage;
	}

	public void setResposenMessage(String resposenMessage) {
		this.resposenMessage = resposenMessage;
	}

	public String getJsonResult() {
		return jsonResult;
	}

	public void setJsonResult(String jsonResult) {
		this.jsonResult = jsonResult;
	}

}
