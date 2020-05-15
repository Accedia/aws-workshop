const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log(event);

    var params = {
        Bucket: "accedia-aws-training-files-bucket",
        Key: event.queryStringParameters.fileName,
        Body: event.body
    };
    
    const data = await s3.putObject(params).promise().catch(err => {
        console.log(`Error putting ${event.queryStringParameters.fileName} in the ${params.Bucket}`, err);
        throw err;
    });

    console.log('data', data);

    const res = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(data)
    };

    console.log('res', res);

    return res;
};
