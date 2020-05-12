**Task 0. Make sure you are in the correct AWS region.**

1. Before starting make sure you are in the correct region assigned to you. If you don't know which region you should use, please, reach out to some of the hosts.

**Task 1. Launch a MySQL RDS instance and make it publicly available**

1. Go to the RDS instances dashboard and hit the **Create Database** button
2. Select the database creation method as **Standard Create**
3. Select **MySQL** as engine type and for the version select **MySQL 8.0.17**
4. Select **Free tier** as template option
5. In the **Settings** tab, type a **DB instance identifier** following the format **\<your-name\>-rds-database**
6. In the **Settings** tab, type a **Master password** of choice following the constraints below the text inputs
7. For **DB instance size** choose **Burstable classes (includes t classes)**. Then select **db.t2.micro** from the dropdown
8. In the **Connectivity** panel, click over **Additional connectivity configuration**. For **VPC security group** select the option **Create new.** Select a name for the new VPC security group following the format **\<your-name\>-rds-security-group**
9. Leave the default settings for the rest of the configurations
10. Scroll to the end of the page and hit **Create database**

    ------------ Steps to make the database visible from the outside world -------------

11. In the list of databases find the one that was just created and click on the link in order to see it's details.
12. In the **Connectivity &amp; security** panel find the **Security** section (it should be the 3rd column). Click over the first link in the **VPC security groups** section. A redirection to a different panel will occur.
13. Go in the bottom part of the screen, an **Inbound Rules** option should be available. Click on it.
14. Click on **Edit inbound rules**
15. Click on **Add rule**. In the first dropdown menu **(type)** select **MySQL/Aurora**. In the source dropdown select **Anywhere.**
16. Hit **Save rules** and go back to the database instance
17. Wait for the database to get to **Available** state
18. Get the database endpoint URL and save it to the clipboard for later usage.

**Task 2. Launch a Linux EC2 Instance and log into it**

1. Launch a Linux EC2 instance with the following specifications:
2. _Step 1:_ For AMI choose **Amazon Linux 2, SSD volume type**
3. _Step 2:_ For Instance Type choose **t2.micro**
4. _Step 3:_ Leave the Instance Details as they are by default
5. _Step 4:_ Add one new volume – **General Purpose SSD** with **20GB** and with delete on terminate checkbox **enabled**.
6. _Step 5:_ Add a tag **Name** with a value following this format **\<your-name\>-ec2-instance**.
7. _Step 6:_ Leave the default settings for the security groups. ( **SSH - port 22** should be allowed to be accessed from anywhere using as source **0.0.0.0/0** )
8. _Step 7:_ Go through the instance summary and hit the **Launch** button
9. A modal asking to select a Key pair will show up. In the first dropdown menu select the **Proceed without a key pair** option, enable the below checkbox and hit Launch Instance.
10. Go to the running instances dashboard and wait until your instance gets to a **running** state
11. Select the instance and click on connect vie the third option **EC2 Instance Connect (browser-based SSH connection)**, **Connect**
12. Install a **MySQL** client using the following command:

    ```
    sudo yum install -y mysql
    ```

**Task 3. Connect to the RDS instance from the EC2 instance**

1. Go to the EC2 instances list.
2. Find the instance that was created in **Task 1** and connect to it. _(Hint: Task 2, point 3)_
3. In the instance console type the following command

    ```
    mysql -u admin -p -h DATABASE_ENDPOINT_URL
    ```

1. After the connection has been established run the following command to list all the available databases:
    ```
    show databases;
    ```
1. A list of 3 database names should be returned

**Task 4. Deletion of resources**

1. EC2 instance named **\<your-name\>-ec2-instance** (Go to Actions -> Instance State -> Terminate)
2. RDS database (when deleting the RDS instance, please make sure to **UNCKECK** the **Create final snapshot?** checkbox)