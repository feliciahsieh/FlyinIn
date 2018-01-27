var Client = require('node-rest-client').Client;
var client = new Client(client_options);
client.registerMethod('findFlights', fxmlUrl + 'FindFlight', 'GET');
var findFlightArgs = {
    parameters: {
        origin: 'KIAH',
        destination: 'KJFK',
        type: 'nonstop'
    }
};
client.methods.findFlights(findFlightArgs, function (data, response) {
    console.log(data);
});
