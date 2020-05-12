Part 1 - Host Website in S3

	Step 1. Create S3 Bucket
      - Choose an appropriate name for the Bucket
        *bucket name pattern - staticweb-lab-YOUR_NAME
      - Choose Region - Asia Pacific (Sydney) ap-southeast-2
      - Uncheck "Block all public access" checkbox
        *this will allow public access to your bucket
	Step 2. Add Bucket policy** - so everyone can get objects from the bucket
      - Go to "Permissions" tab and click on "Bucket Policy"
      - Click on "Policy generator" and new page will open
      - Step 1: Select Policy Type
          a. For "Select Type of Policy" from the dropdown choose "S3 Bucket Policy"
      - Step 2: Add Statement(s)
          a. Effect: Allow
          b. Principal: *
          c. AWS Service: Amazon S3 
          d. Action: GetObject
          e. Amazon Resource Name (ARN): Find the ARN for your bucket and copy/paste it in the box 
            *you can find in your bucket -> Permissions -> Bucket Policy betwеen the buttons and the policy editor
          f. Click on "Add Statement"
      - Step 3: Generate Policy
          a. Click on "Generate Policy" 
          b. Copy generated policy and paste it in policy editor in your bucket
          c. Add "/*" to your "Resource". It shoud look like "Resource": "arn:aws:s3:::s3-workshop-static-web/*"
          d. Click on "Save" in policy editor to apply the new policy   
	Step 3. Clone/Download repo from https://github.com/Accedia/aws-workshop and open folder Day1-S3_and_CloundFront  
	Step 4. Build the app (optionally, the project is already build for you and output files are in folder /dist/s3-demo-app):
      - npm install
      - ng build --prod
	Step 5. Upload files from dist/s3-demo-app folder to your bucket
        *use drag and drop
    Step 6. Configure your bucket as "Static website hosting"
      - Open your bucket and go to "Properties" tab
      - Click on "Static web hosting" and select "Use this bucket to host a website"
      - In "Index document" add your index file - index.html
      - Click "Save"
    Step 7. Try to reach the app 
      - url pattern: http://YOUR-BUCKET-NAME.s3-website.REGION.amazonaws.com 
      - or you can find it in your bucket -> Properties -> Static website hosting -> Endpoint
	
Part 2 - Create CDN for your new website

    Step 8. Create Distribution in CloudFront for your website
      a. Origin Settings
        - Origin Domain Name: choose your s3 bucket where your website is hosted
      b. Default Cache Behavior Settings
        - Choose those that best fits your needs
      c. Distribution Settings
        - Price Class: Use Only U.S., Canada and Europe
        - Default Root Object: index.html
        - Comment: Add meaningful comment so later you can recognize your CDN
        - For other settings choose those that best fits your needs
      d. Click "Create Distribution"
          *It will take around 5 min until your distribution is deployed
    Step 9. Open your website through CloudFront
      a. In distributions list find your distribution and verify that Status is "Deployed" and State is "Enabled" 
      b. Click on your distribution ID
      c. Find the generated for you Domain Name and open it in your favorite browser 
        *to be able to check if content is served from cloudFront cache first open network tab on your browser
      d. Verify that content is missed from cloudFront cache
      e. Refresh the page and check again from where the content is served
		
Part 3 - Delete all resources you have created

    Step 10. Disable CloudFront distribution
      - go to CloudFront and find your distribution
      - select it and click on "Disable"
    Step 11. Delete your S3 Bucket
      - Go to your s3 Bucket and select all files
      - From Actions dropdown choose "Delete"
      - Go back to all buckets
      - Find your bucket, select it and click on "Delete"
    Step 12. Delete your distribution
      - Go again to CloudFront
      - Find your distribution, select it and click "Delete"  

**Bucket policy

    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
      ]
    }
