package com.main.pbcl_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

@SpringBootApplication
public class PbclBackendApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(PbclBackendApplication.class, args);
	}

}
