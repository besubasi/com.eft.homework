package com.eft.homework;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HomeworkApplicationTests {

	private TestRestTemplate restTemplate = new TestRestTemplate();

	/*
	 * @Test public void exampleTest() { String body =
	 * this.restTemplate.getForObject("/", String.class);
	 * assertThat(body).isEqualTo("Hello World"); }
	 */

	@Test
	public void testRequest() {
		//http://localhost:8080/login?email=merchant@test.com&password=123*-+
		//http://localhost:8080/login?email=demo@bumin.com.tr&password=cjaiU8CV
		//Email: demo@bumin.com.tr
		//Password: cjaiU8CV
		
		String email = "merchant@test.com";
		String password = "123*-+";

		try {
			ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8080/login?email="+email+"&password="+password,
					String.class);
			HttpHeaders headers = response.getHeaders();
			
			System.out.println("headers="+headers.getVary());
			System.out.println("Body="+response.getBody());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
    /* POST 
	@Test
    private static void testLogin() {
        System.out.println("Testing create User API----------");
        RestTemplate restTemplate = new RestTemplate();
        User user = new User(0,"Sarah",51,134);
        URI uri = restTemplate.postForLocation(REST_SERVICE_URI+"/user/", user, User.class);
        System.out.println("Location : "+uri.toASCIIString());
    }*/

}
