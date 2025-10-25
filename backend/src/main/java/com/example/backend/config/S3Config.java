package com.example.backend.config;

import com.amazonaws.client.builder.AwsClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;


@Configuration
public class S3Config {

    @Bean
    public AWSCredentialsProvider awsCredentialsProvider(
            @Value("${cloud.ncp.credentials.access-key}") String accessKey,
            @Value("${cloud.ncp.credentials.secret-key}") String secretKey) {
        BasicAWSCredentials creds = new BasicAWSCredentials(accessKey, secretKey);
        return new AWSStaticCredentialsProvider(creds);
    }

    @Bean
    public AmazonS3 amazonS3(AWSCredentialsProvider awsCredentialsProvider,
                             @Value("${cloud.ncp.endpoint}") String endPoint,
                             @Value("${cloud.ncp.region}") String regionName) {
        return AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
                .withCredentials(awsCredentialsProvider)
                .build();
    }
}
