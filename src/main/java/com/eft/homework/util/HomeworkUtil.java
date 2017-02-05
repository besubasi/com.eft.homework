package com.eft.homework.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.eft.homework.pojo.HttpsResult;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class HomeworkUtil {
	

	public static String EMAIL;
	public static String PASSWORD;
	public static String TOKEN;
	
	
	public static HttpsResult sendHttpRequest(HomeworkEnums.ClearSettle clearSettle, Map<String, Object> params){
		HttpsResult result = new HttpsResult();

		try {
			
			// Configure the SSLContext with a TrustManager
			SSLContext ctx = SSLContext.getInstance("TLS");
			ctx.init(new KeyManager[0], new TrustManager[] { new HomeworkUtil.DefaultTrustManager() }, new SecureRandom());
			SSLContext.setDefault(ctx);
			
			URL url = new URL(clearSettle.getUrl());

			StringBuilder postData = new StringBuilder();
			for (Map.Entry<String, Object> param : params.entrySet()) {
				if (postData.length() != 0)
					postData.append('&');
				postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
				postData.append('=');
				postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
			}
			byte[] postDataBytes = postData.toString().getBytes("UTF-8");

			HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
			
			conn.setRequestProperty("Authorization", HomeworkUtil.TOKEN);
			conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("Host", "testreportingapi.clearsettle.com");
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			conn.getOutputStream().write(postDataBytes);
			
			
			if(conn.getResponseCode() == 200){
				BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				StringBuilder builder = new StringBuilder();
				String line=null;
				while ( ( line = reader.readLine()) != null) {
		            System.out.println(line);
		            builder.append(line);
		        }
				
				result.setResponseCode(conn.getResponseCode());
				result.setJsonResult(builder.toString());
				
			}else{
				result.setResponseCode(conn.getResponseCode());
				result.setResposenMessage(conn.getResponseMessage());
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
		
	}

	/**
	 * json formatinda gelen degeri verilen json tipine gore olusturulan pojo ya ceviriyoruz.
	 * 
	 * @param json
	 * @param valueType
	 * @return
	 */
	public static <T> T convertJsonToObject(String json, Class<T> valueType){
		if(json == null || json.equals("{}"))
			return null;
		
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			return mapper.readValue(json, valueType);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//Default 
		/*try {
			return valueType.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
		}
		*/
		return null;
	}
	
	
	private static class DefaultTrustManager implements X509TrustManager {
		@Override
		public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
		}

		@Override
		public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
		}

		@Override
		public X509Certificate[] getAcceptedIssuers() {
			return null;
		}
	}
	
}
