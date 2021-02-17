const apigClientFactory = require('aws-api-gateway-client').default;

class APIMelonn {
    apigClient;
    constructor() {

        this.apigClient = apigClientFactory.newClient({
            invokeUrl: process.env.REACT_APP_MELONN_URL,
            apiKey: process.env.REACT_APP_MELONN_KEY,
            region: 'us-east-1'
        });
    }

    getShippingMethods() {
        var pathParams = {};
        var pathTemplate = `/shipping-methods`
        var method = 'GET';
        var additionalParams = {};
        var body = "";
        return new Promise((resolve, reject) => {
            this.apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
            .then(function(result: any){
                // console.log(result);
                resolve(result);
            }).catch( function(result: any){
                console.log(result);
                reject(result);
            });
        })

    }


}

export default APIMelonn;
