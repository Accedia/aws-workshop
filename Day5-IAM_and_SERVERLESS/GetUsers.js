const http = require('http');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        http.get('http://dummy.restapiexample.com/api/v1/employees', (resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                console.log(JSON.parse(data));
                resolve(data);
            });
            
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
};
