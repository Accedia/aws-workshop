**Task 0. Make sure you are in the correct AWS region.**
1. Before starting make sure you are in the correct region assigned to you. If you don't know which region you should use, please, reach out to some of the hosts.

**Task 1. Create an Application Load Balancer**
1. Go to Services -> EC2
2. In the left side menu select Load Balancers
3. Click on **Create Load Balancer**
4. Select **Application Load Balaner**
5. Name the load balancer using the following format: *\<your-name\>-alb*
6. Leave the load balancer in the default VPC, select **2 availability zones** of choise.
7. Skip **Step 2: Configure Security Settings** (it's only needed when using HTTPS protocol) and go to Step 3: Configure Security Groups
8. Select to create a **new** security group. Give it a name following the format *\<your-name\>-alb-security-group*. Leave the default values for the rest of the settings for this step.
9. Go to **Step 4: Configure Routing**
10. Create a new target group with a name following the format *\<your-name\>-alb-target-group*. Leave the default values for the rest of the settings for this step.
11. Go to **Step 5: Register Targets** and directly go to last Review step. The targets will be added later on when they are created.
12. Create the load balancer

**Task 2. Create EC2 instances that will be used with the ALB**
1. Launch a Linux EC2 instance with the following specifications:
2. _Step 1:_ For AMI choose **Amazon Linux 2, SSD volume type**
3. _Step 2:_ For Instance Type choose **t2.micro**
4. _Step 3:_ For **Number of instances** type 2 and leave the rest of the settings with their default values
5. _Step 4:_ Leave the volume created by default
6. _Step 5:_ Add a tag **Name** with a value following this format **\<your-name\>-ec2-instance**.
7. _Step 6:_ Name the security group following the format *\<your-name\>-ec2-alb-sg*. Leave the SSH rule and add a new one. Select a type of HTTP and for source delete the default value and search for the security group that was created for the Application Load Balancer in Task 1. (*Hint: * should be named *\<your-name\>-alb-security-group*)
8. _Step 7:_ Go through the instance summary and hit the **Launch** button
9. A modal asking to select a Key pair will show up. In the first dropdown menu select the **Proceed without a key pair** option, enable the below checkbox and hit Launch Instance.
10. Go to the running instances dashboard and wait until your 2 instances get to a **running** state

    ------ Run the below steps for each of the 2 created EC2 instances ------

11. Select the instance and click on connect vie the third option **EC2 Instance Connect (browser-based SSH connection)**, **Connect**
12. Install a **Apache server** using the following command:

    ```
    sudo yum install -y httpd
    ```
13. Start the recently installed http server using the following command: 
    ```
    sudo service httpd start
    ```
14. Close the browser window containing the terminal

**Task 3. Add the recently created EC2 instances to the target group used by the load balancer**
1. Make sure that you are in the EC2 service console.
2. In the left side menu select Target Groups
3. Select the target group that was created in Task 1, step 10. (*Hint: * should be named *\<your-name\>-alb-target-group*)
4. In the window opened at the bottom of the page, go to the **Targets** tab and click on **Edit**. Find and select the 2 instances that were created in Task 2 and click **Add to registered**. (*Hint:* should be named **\<your-name\>-ec2-instance**).
5. Click on the **Save** button.
6. In the left side menu go to Load Balancers.
7. Find the load balancer that was created in Task 1 and click on it. (*Hint:* should be named *\<your-name\>-alb*).
8. Get the DNS name and try to access it from the browser.
9. Make sure that the Apache welcome screen is shown.


**Task 4. Remove the created resource**
1. Delete the created load balancer: *\<your-name\>-alb*
2. Delete the created target group: *\<your-name\>-alb-target-group*
3. Terminate the created EC2 instances: **\<your-name\>-ec2-instance**
4. Delete the security groups that were created: *\<your-name\>-alb-security-group*, *\<your-name\>-ec2-alb-sg*