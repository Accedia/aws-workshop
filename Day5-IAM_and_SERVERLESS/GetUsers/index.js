const axios = require('axios');

exports.handler = async (event) => {
    const data = await axios.get('http://dummy.restapiexample.com/api/v1/employees').catch(err => {
        console.error("error", err);
        throw err;
    });
    
    console.log("result", data.data);
    
    const res = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(data.data)
    };
    
    return res;
};
