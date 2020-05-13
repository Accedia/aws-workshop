# Lab VPC

- [Lab VPC](#lab-vpc)
  - [Overview](#overview)
  - [Instructions](#instructions)
  - [VPC Excercise](#vpc-excercise)
    - [Part I: Create your VPC](#part-i-create-your-vpc)
    - [Part II: Create your Subnets](#part-ii-create-your-subnets)
    - [Part III: Create your Route tables](#part-iii-create-your-route-tables)
    - [Part IV: Create your Security Groups](#part-iv-create-your-security-groups)
    - [Part V: Create EC2 instances](#part-v-create-ec2-instances)
  - [Cleanup](#cleanup)
  - [Links](#links)
    - [AWS Documentation](#aws-documentation)
    - [Networks](#networks)

## Overview

We are going to create a VPC with public and priavte subnets.  
We will allow internet traffic (both inbound and outbound) to the public subnet.  
We will restrict only to only HTTP access (port 80) to the public subnet.  
We will allow outbound internet traffic from the private subnet.  
We will restrict inbound traffic to the private subnet to only from the public subnet.  
We will create a Web server EC2 instance in the public subnet.  
We will create a Back end EC2 instance in the private subnet.  
We will show the Web server can access the Back end and the Web server is accessible from the Internet.  

## Instructions

Use Regions:

1. N.Virginia - Users 1 to 5
2. Ohio - Users 6 to 10
3. Oregon - Users 11 to 15
4. Mumbai - Users 16 to 20
5. Stockholm - Users 21 to 25
6. Canada - Users 26 to 30
7. Seul - etc.
8. Ireland - etc.

Name** your VPC and all your resources with with your username as suffix, ex. "vpc denislav.savkov ", "public subnet denislav.savkov".
> You can do this by editing the Name column in any resources table by clicking the pecil on the right side of the table cell.
Another way to do it is by adding a tag called Name to the resurce.

## VPC Excercise

### Part I: Create your VPC

Open VPC from the Services main menu

1. Create VPC
Go to VPC and click Cretate VPC.
Use `10.0.0.0/24` for CIDR block

### Part II: Create your Subnets

Go to Subnets submenu

1. Create Public subnet
   1.1. Use `10.0.0.0/26` for CIDR Block
   1.2. After creating it Select the Public subnet from the list of sunets
   1.3. From the Actions button click Modify auto-assign IP settings
   > Check Auto-assign IPv4

2. Create Private subnet
   2.1. Use `10.0.0.64/26` for Private Subnet

> (Optional) To create second public and private subnets in another availability zone, you can repeat steps 2 and 3 and use `10.0.0.128/26` and `10.0.0.192/26`

### Part III: Create your Route tables

Go to Route Tables submenu

1. Configure the Public Subnet
1.1. Select the Main route table for you VPC
1.2. Edit the Name cell to give it name "Public Your.Name"
1.3. Go to Subnet Associations tab
1.4. Click Edit subnet associations
1.5. Check your Public Subnet

2. Create Route table named "Private route table Your.Name"
2.1. Repeat steps in 1.* of this part but check **Private subnet** instead on step 1.5.

3. Create Internet Gateway
4. Attach the Internet Gateway to you VPC
5. Add Internet Gateway to Public route table
Add a row with `0.0.0.0/0` as Destination and select the `IGW` as Target
1. Create NAT Gateway in your Public Subnet, click `Allocate Elastic IP` and Save
2. Add NAT Gateway to Private route table
Add a row with `0.0.0.0/0` as Destination and select the `NAT Gateway` as Target
8. Create Security Group for web server

### Part IV: Create your Security Groups

Go to Security Groups submenu

1. Create **Web Server** Security Group

Click Create Security Group
> Name: Web server
> Description: Allows HTTP port 80
> VPC: select yours from the list

2. Select it from the list
3. Click Inbound Rules
4. Add a inbound rule
> Type: HTTP (port 80)
> Source: 0.0.0.0/0
> Description: Public HTTP access

5. Create **Back end** Security Group
> Name: Back end
> Description: Allows port 3443
> VPC: select yours from the list

6. Select it from the list
7. Click Inbound Rules
8. Add a inbound rule
> Type: Custom
> Port: 3443
> Source: select "Web server" security group
> Desciption: access from Web server

### Part V: Create EC2 instances

Go to EC2 from the Services menu

1. Create EC2 instance (Web Server) in Public subnet
*Step 1.* Select `Linux AMI 2`
*Step 2.* Leave default `t2.micro` and click Next
*Step 3.* Choose:

> Network: your VPC
> Subnet: your **public** subnet
> Auto-assign Public IP: **Enable**
> IAM role: **SSMRoleForEC2** (this will allow you to use Session Manager to connect to this instance later)

*Step 4.* Click `Next: Add Tags`

*Step 5.* Click `Add tags` and add tag 
> Name = Web Server Your.Name
> Application = AWS Training

*Step 6.* Select `Web server` security group

2. Create EC2 instance (Back end) in private subnet

Repeat the same steps in 1. except on *Step 3.* use:
> Network: your VPC
> Subnet: your **private** subnet
> Auto-assign Public IP: **Disable**
> IAM role: **No**

and on *Step 6.* Select `Back end` security group

3. Select the `Web server` EC2 instance
4. Click Configure, Connect using Session Manager
5. Install `telnet`, `apache` web server and start the web server by executing this in the terminal:

```bash
sudo yum -y install telnet
sudo yum -y install httpd
sudo service httpd restart
```

6. Verify connection with Back end instance

```bash
telnet <private IP of EC2 in Private Subnet> 3443
```

> To get the Private IP of the `Back end` select it from the list of EC2 instances and see the details

## Cleanup

Delete all your resources:

1. Terminate all the EC2 instance in your VPC
2. Delete your NAT Gateway (wait a few minutes to complete)
3. Delete you VPC - it will delete all VPC resources
4. Release Elastic IPs

## Links

### AWS Documentation

https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html
https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html

### Networks

https://en.wikipedia.org/wiki/Internet_protocol_suite  
https://en.wikipedia.org/wiki/OSI_model
https://en.wikipedia.org/wiki/Border_Gateway_Protocol
https://en.wikipedia.org/wiki/MAC_address