const apigClientFactory = require('aws-api-gateway-client').default;

class APIHandler {
    apigClient;
    constructor() {

        this.apigClient = apigClientFactory.newClient({
            invokeUrl: process.env.REACT_APP_API_URL,
            apiKey: process.env.REACT_APP_API_KEY,
            region: 'us-east-1'
        });
    }

    getOrders() {

        var pathParams = {};
        var pathTemplate = `/orders`
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
    getOrderById(id: any) {

        var pathParams = {};
        var pathTemplate = `/orders/${id}`
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

    createOrder(order: any) {
        var pathParams = {};
        var pathTemplate = `/orders/create`
        var method = 'POST';
        var additionalParams = {};
        var body = JSON.stringify(order);

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

export default APIHandler;
