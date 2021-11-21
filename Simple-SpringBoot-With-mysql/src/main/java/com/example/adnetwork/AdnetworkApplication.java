package com.example.adnetwork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
public class AdnetworkApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdnetworkApplication.class, args);
	}

}
