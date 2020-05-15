# IAM and SERVERLESS Lab

You need to create a simple REST API using serverless in AWS. The API must have API Gateway and two Lambda functions. The REST API must have two end points (/users and /upload-file). The /users endpoint must retrieve dummy data from a dummy API and the /upload-file endpoint must allow you to upload files in an already created bucket (accedia-aws-training-files-bucket) via a simple frontend page.

*NOTE: The code for the Lambda functions is already provided in a git repository

*NOTE2: All resources must be with names with the following pattern: lab-<your-name>-<name-of-resource>, example: “lab-vladimir-vladimirov-rest-api”

*NOTE3: Delete all the resources you created for the lab (described below)

1. Create public REST API in the AWS API Gateway - "lab-<your-name>-rest-api"
```
  - Go to Services -> API Gateway -> Create API
  - Choose REST API -> Build
  - Pick API name -> Create API
```
2. Create Lambda Function to retrieve users - "lab-<your-name>-get-users"
```
  - Go to Services -> Lambda -> Create function
  - Choose Author from scratch -> pick a Function name -> pick a Runtime "Node.js 12.x" -> Create function
  - Choose Code entry type "Upload a .zip file"
  - Upload "GetUsers.zip" -> Save
```
3. Create AMI Policy with permission to put objects in "accedia-aws-training-files-bucket" - "lab-<your-name>-s3-putObject"
```
  - Go to Services -> IAM
  - Choose Policies -> Create policy
  - Choose service S3
  - Choose action Write -> PutObject
  - Choose Resources -> Specific -> Add ARN -> Pick Bucket Name "accedia-aws-training-files-bucket" and Object name "Any" or "*"
  - Review policy -> Create policy
```
4. Create Lambda Function to upload files in S3 bucket with permissions to put objects in "accedia-aws-training-files-bucket" - "<your-name>-lab-upload-file"
```
  - Go to Services -> Lambda -> Create function
  - Choose Author from scratch -> pick a Function name -> pick a Runtime "Node.js 12.x" -> Create function
  - Choose Code entry type "Upload a .zip file" or "Edit code inline"
  - Upload "UploadFile.zip" or copy-paste the code -> Save
  - Basic settings -> Edit -> View the <your-name>-upload-file-role"
  - Attach policies -> find your policy from the previous step -> Attach policies
```
5. Create /users resource with GET method in your REST API in API Gateway
```
  - Go to Services -> API Gateway -> select your API
  - Actions -> Create Resource
  - Pick resource name -> pick resource path -> Create Resource
  - Actions -> Create Method -> GET
  - Choose Integration type "Lambda Function"
  - Tick "User Lambda Proxy integration -> choose Lambda Function "<your-name>-lab-get-users" -> Save
  - Actions -> Deploy API -> Create new stage "dev"
  - Test your endpoint in the browser - <your-api-url>/dev/users
```
6. Create /upload-file resource with POST method in your REST API in API Gateway
```
  - Actions -> Create Resource
  - Pick resource name -> pick resource path -> tick Enable API Gateway CORS -> Create Resource
  - Actions -> Create Method -> POST
  - Choose Integration type "Lambda Function"
  - Tick "User Lambda Proxy integration -> choose Lambda Function "<your-name>-lab-upload-file" -> Save
  - Actions -> Deploy API -> Pick "dev" stage
  - Test your endpoint - open the index.html file and upload a file successfully in the S3 "accedia-aws-training-files-bucket"
```

Delete the following resources:

1. REST API in the API Gateway
2. Two lambda functions
3. The lambda functions roles
4. The policy lab-<your-name>-s3-putObject in IAM Policies
5. The roles lab-<your-name>-get-users-role and lab-<your-name>-upload-file-role in IAM Roles