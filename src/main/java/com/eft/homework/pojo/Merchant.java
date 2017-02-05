package com.eft.homework.pojo;

public class Merchant {
	
	
	
	private int id;
	private int parentId;
	private String name;
	private String treedStatus;
	private int mcc;
	private String ipnUrl;
	private int apiKey;
	private String cpgKey;
	private String type;
	private String descriptor;
	private String secretKey;
	private String comType;
	
	
	public Merchant() {
		super();
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getParentId() {
		return parentId;
	}


	public void setParentId(int parentId) {
		this.parentId = parentId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String get3dStatus() {
		return treedStatus;
	}


	public void set3dStatus(String treedStatus) {
		this.treedStatus = treedStatus;
	}


	public int getMcc() {
		return mcc;
	}


	public void setMcc(int mcc) {
		this.mcc = mcc;
	}


	public String getIpnUrl() {
		return ipnUrl;
	}


	public void setIpnUrl(String ipnUrl) {
		this.ipnUrl = ipnUrl;
	}


	public int getApiKey() {
		return apiKey;
	}


	public void setApiKey(int apiKey) {
		this.apiKey = apiKey;
	}


	public String getCpgKey() {
		return cpgKey;
	}


	public void setCpgKey(String cpgKey) {
		this.cpgKey = cpgKey;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getDescriptor() {
		return descriptor;
	}


	public void setDescriptor(String descriptor) {
		this.descriptor = descriptor;
	}


	public String getSecretKey() {
		return secretKey;
	}


	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}


	public String getComType() {
		return comType;
	}


	public void setComType(String comType) {
		this.comType = comType;
	}
	
	

}
