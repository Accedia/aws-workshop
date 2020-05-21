# Lab VPC

- [Lab VPC](#lab-vpc)
  - [Overview](#overview)
  - [Instructions](#instructions)
  - [VPC Excercise](#vpc-excercise)
    - [Part I: Create your VPC](#part-i-create-your-vpc)
    - [Part II: Create your Subnets](#part-ii-create-your-subnets)
    - [Part III: Configure Public route table](#part-iii-configure-public-route-table)
    - [Part IV: Create and Configure Private route table](#part-iv-create-and-configure-private-route-table)
    - [Part V: Create your Security Groups](#part-v-create-your-security-groups)
    - [Part VI: Create EC2 instances](#part-vi-create-ec2-instances)
  - [Cleanup](#cleanup)
  - [Links](#links)
    - [AWS Documentation](#aws-documentation)
    - [Computer Networks](#computer-networks)

## Overview

We are going to create a VPC with public and private subnets.  
We will allow internet traffic (both inbound and outbound) to the public subnet.  
We will restrict only to only HTTP access (port 80) to the public subnet.  
We will allow outbound internet traffic from the private subnet.  
We will restrict inbound traffic to the private subnet to only from the public subnet.  
We will create a Web server EC2 instance in the public subnet.  
We will create a Back end EC2 instance in the private subnet.  
We will show the Web server can access the Back end and the Web server is accessible from the Internet.  

## Instructions

Use Regions:

- Ohio - breakout room #1
- Oregon - breakout room #2
- Mumbai - breakout room #3
- Stockholm - breakout room #4
- Canada - breakout room #5
- Seul - breakout room #6
- Ireland - breakout room #7

**Note: Use convention for naming *ALL* your resources like**  
> **\<your name> \<resource type>**

 **for example:**
 > **"denislav savkov vpc"**
 > **"denislav.savkov public subnet"**

**You can do this by editing the Name column in any table of resources in the AWS Management Console  by clicking the pecil on the right side of the table cell.
Another way to do it is by adding a tag called Name to the resurce.**

## VPC Excercise

### Part I: Create your VPC

In this part you will create your VPC. Make sure you are in the correct region according to the [Instructions](#instructions).

1. Open `VPC` from the `Services` main menu
2. Go to `Your VPCs`
3. Click `Create VPC`
4. Enter in `Name tag` name according to the described convention  `vpc <your name>`
5. Use `10.0.0.0/24` for CIDR block. ([Visualize 10.0.0.0/24 in calculator](http://jodies.de/ipcalc?host=10.0.0.0&mask1=24&mask2=))
6. Click `Create` then `Close`

### Part II: Create your Subnets

In this part you will create two subnets - one calle **Public** and one called **Private**.

<!-- omit in toc -->
###### Create Public subnet

1. Go to `Subnets` submenu of `VPC` just below `Your VPCs`
2. Click `Create subnet`
3. Enter `<your name> Public subnet` in the `Name tag`
4. Select the VPC you created (with your name) from the list of VPCs
5. Select the first `Availability zone` from the list
6. Enter `10.0.0.0/26` for `IPv4 CIDR block`. ([Visualize 10.0.0.0/26 in calculator](http://jodies.de/ipcalc?host=10.0.0.0&mask1=24&mask2=26))
7. Click `Create` then `Close`
8. Select the Public subnet you just created from the list of subnets
9. Click `Actions` button and then `Modify auto-assign IP settings`. This will option will give new EC2 instance Public IP address by default.
10. Check `Auto-assign IPv4` and `Save`

<!-- omit in toc -->
###### Create Private subnet

11. Click `Create subnet`
12. Enter `<your name> Private subnet` in the `Name tag`
13. Select the VPC you created (with your name) from the list of VPCs
14. Select the first `Availability zone` from the list
15.  `10.0.0.64/26` for Private Subnet for `IPv4 CIDR block`. ([Visualize 10.0.0.64/26 in calculator](http://jodies.de/ipcalc?host=10.0.0.0&mask1=24&mask2=26))
16. Click `Create` then `Close`

> *(Optional)* Create second public and second private subnets in the second availability zone (if present in your Region). You can repeat the steps but use `10.0.0.128/26` and `10.0.0.192/26` and add suffix `2` to the subnet names.

### Part III: Configure Public route table 

In this part you will use the *default* VPC *Route Table* to associate with the *Public Subnets*. You will configure the route table to allow ingress and egress internet traffic by creating an *Internet Gateway* and adding it in a routing rule in the *Public Route Table*.

<!-- omit in toc -->
###### Associate the default VPC route table with Public subnet

1. Go to `Your VPCs` submenu of the `VPC`
2. Select your VPC frpm the table
3. In the VPC `Description` tab click on the copy button to the right side of the VPC ID *value* to copy the VPC ID. The value looks like this: vpc-00c7eee4a04b4c107
4. Go to `Route Tables` submenu of the `VPC`, just below `Subnets` 
5. Paste the copied VPC ID in the `Search` box and press Enter
6. In the `Name` column click on the *pencil* in the right part of the cell.
7. Enter `<your name> Public route table`  
8. Go to `Subnet Associations` ***tab***  
9. Click `Edit subnet associations`
10. Select your ***Public** Subnet*
11. Click `Save`

<!-- omit in toc -->
###### Create Internet Gateway

12. Go to `Internet Gateways` submenu of `VPC` just below `Route Tables`
13. Click `Create internet gateway`
14. Enter `<your name> internet gateway` for `Name tag`
15. Click `Create` then click on the internet gateway id OR `Close` and select your internet gateway from the list
16. Click `Actions` then `Attach to VPC`
17. Select your VPC from the list
18. Click `Attach`

<!-- omit in toc -->
###### Add Internet Gateway to Public route table

19. Go back to your Public route table
20. Click on `Routes` ***tab*** 
21. Click `Edit routes`
22. Click `Add route`
23. Enter `0.0.0.0/0` (meaning all IPs) in `Destination`
24. For `Target` select `Internet gateway` then select the internet gateway with your name

### Part IV: Create and Configure Private route table

In this part you will create and configure a *Private Route Table*. You will allow egress internet connection by creating a *NAT Gateway* and adding it in a routing rule in the *Private Route Table*

<!-- omit in toc -->
###### Create Private route table and associate with the Private subnet

1.  Click `Create route table`
2.  Enter `<your name> Private route table` in for `Name tag`  
3.  Select your `VPC` from the list
4.  Click `Create` then click on the ***route table id*** or `Close` and then select your your newly created private route table from the list
5.  Go to `Subnet Associations` *tab*
6.  Click `Edit subnet associations`
7.  Select your ***Private** Subnet*
8.  Click `Save`

<!-- omit in toc -->
###### Create a NAT Gateway

9. Go to `NAT Gateways` submenu of `VPC`
10. Click `Create NAT Gateway`
11. Select you **Public subnet** for `Subnet`
12. Click `Allocate Elastic IP` 
13. Click `Add tag`
14. Enter `Name` for `Key` and `<your name> NAT Gateway` for `Value`
15. Click `Create a NAT Gateway`
16. Click on the NAT Gateway ID or `Close`
17. Wait until you NAT Gateway becomes from status `pending` to `available`

<!-- omit in toc -->
###### Add NAT Gateway to the Priavte route table

18. Go back to your Private route table
19. Click `Routes`
20. Click `Edit routes`
21. Click `Add route`
22. Enter `0.0.0.0/0` for `Destination` 
23. For `Target` select `NAT Gateway` then click on your NAT Gateway
24. Click `Save routes` and `Close`

### Part V: Create your Security Groups

In this section you will create two Security groups. One called `web server` will allow all inbound traffiac at port 80 and the other called `back end` will allow port 22 inbound traffic from security group `web server`.  

<!-- omit in toc -->
###### Create **Web Server** Security Group

1. In the `SECURITY` sections of the left side menu go to Security Groups submenu
2. Click `Create Security Group`
3. Enter the following:
> Name: <your name> Web server  
> Description: Allows HTTP port 80  
> VPC: select your VPC from the list  

4. Under `Inbound rules` click `Add rule`
5. Enter the following:
> Type: HTTP (port 80)  
> Source: 0.0.0.0/0  
> Description: Public HTTP access

6. Click `Create security group`

<!-- omit in toc -->
###### Create **Back end** Security Group

7. Go back to `Security Groups` submenu in `SECURITY` section of the left side menu
8. Click `Create security group`
9. Enter the following:
> Name: <your name> Back end  
> Description: Allows port 22  
> VPC: select your VPC from the list

10. Under `Inbound rules` click `Add rule` 
11. Enter the following:
> Type: SSH  
> Port: 22  
> Source: click in the Source field and select your security group "\<your name> web server" or type your name to find it
> Desciption: access from Web server
12. Click `Create security group`

### Part VI: Create EC2 instances

In this part we will create two EC2 instances - one called `web server` will be located in the Public subnet with security group `web server` attached to it. The orher instance `back end` will be in Private subnet with security group `back end` attached to it. In the end you will check the connectivity between the internet and the `web server` and the `web server` and the `back end` instances.

<!-- omit in toc -->
###### Launch Web server EC2 instance in the Public subnet

1. Go to EC2 from the Services menu
2. Click `Instances` on the left side menu
3. Click `Launch instance`
4. Enter the following on each step of the launch wizard:  
*Step 1.* Select `Linux AMI 2`  
*Step 2.* Leave default `t2.micro` and click `Next: Configure Instance details`  
*Step 3.* Choose:

> Network: ***change*** selection to your VPC  
> Subnet: your **Public** subnet  
> Auto-assign Public IP: **Enable** (or `Use subnet setting(Enable)`)  
> IAM role: select **SSMRoleForEC2** (this will allow you to use Session Manager to connect to this instance later)

Click `Next: Add storage`

*Step 4.* Click `Next: Add Tags`

*Step 5.* Click `Add tags` and add tag 
> Name = \<your mame> web server  
> Application = AWS Training

*Step 6.* Click `Select an existing security group` and choose `<your name> Web server` security group

Click `Review and launch`
Click `Continue` on the warning pop-up.

*Step 7.* Click `Launch` 
Select *Launch without a key pair* from the pop-up, check I aknowledge box and click `Launch instance`

<!-- omit in toc -->
###### Create Back-end instance in the Private subnet

5. Go back to `Instances` list in left side menu
6. Click `Launch instance`
7. Enter the following on each step of the launch wizard:  
*Step 1.* Select `Linux AMI 2`  
*Step 2.* Leave default `t2.micro` and click `Next: Configure Instance details`  
*Step 3.* Choose:

> Network: ***change*** selection to your VPC  
> Subnet: your **Private** subnet, not public  
> Auto-assign Public IP: **Disable** (or `Use subnet setting(Disable)`)

Click `Next: Add storage`

*Step 4.* Click `Next: Add Tags`

*Step 5.* Click `Add tags` and add tag 
> Name = \<your mame> web server  
> Application = AWS Training

*Step 6.* Click `Select an existing security group` and choose `<your name> Back end` security group

Click `Review and launch`
Click `Continue` on the warning pop-up.

*Step 7.* Click `Launch` 
Select *Launch without a key pair* from the pop-up, check I aknowledge box and click `Launch instance`

8. Go back to `Instances` in EC2
9. Select the `<your name> Web server` EC2 instance
10. Click `Connect` then select `Session Manager` and click `Connect` (if the button is disabled go to `Actions`->`Instance Settings` and `Attach IAM Role`, select `SSMSSMRoleForEC2`)
11. Install `telnet`, `apache` web server and start the web server by executing this in the terminal:

```bash
sudo yum -y install telnet
sudo yum -y install httpd
sudo service httpd restart
```

<!-- omit in toc -->
###### Verify connection with Web server instance

12. Select the `Web server` instance from the list of EC2
13. In the `Description` tab find the Public IP of the instance and copy it
14. Go to your browser and paste it in the address bar
(Optional) You should see the apache test page. You can then stop the server with `sudo service httpd stop` and reload the browser

<!-- omit in toc -->
###### Verify connection between Web server and Back end instance

15. Go back to `Instances`
16. Select the `<your name> Back end` instance
17. Copy the `Private IP` from the `Description` tab
18. Switch to the `Terminal` tab where your `Session Manager` connection to your Web Server is
19. Execute
```bash
telnet <private IP of Back end instance> 22
```
(Optional) You can try to remove port 22 from the Back end security group and telnet again to see that there is no connection. Also try to add another port (say 443/HTTPS) and telnet. Even though the Securit group allows it, the Back end server is not listening at that port.


## Cleanup

Delete all your resources:

1. Terminate all the EC2 instance in your VPC. Select them in `Instances` and click `Actions` -> `Instance state` -> `Terminate`
2. Delete your NAT Gateway by going back to `VPC` and `NAT Gateways` then select yours and click  `Actions`->`Delete` (wait a few minutes to complete). Write down the Ellastic IP of your NAT Gateway
3. Delete you VPC - it will delete all VPC resources. Go to Your VPCs, select it and click `Actions`->`Delete`
4. Go to Elastic IPs. Select the Elastic IP thta you write down of your NAT Gateway and from `Action` -> `Release Elastic IP address`

## Links

### AWS Documentation

https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html
https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html

### Computer Networks

http://jodies.de/ipcalc?host=10.0.0.0&mask1=24&mask2=26 - Subnet calculator
https://en.wikipedia.org/wiki/Internet_protocol_suite  
https://en.wikipedia.org/wiki/OSI_model  
https://en.wikipedia.org/wiki/Border_Gateway_Protocol
https://en.wikipedia.org/wiki/MAC_address
