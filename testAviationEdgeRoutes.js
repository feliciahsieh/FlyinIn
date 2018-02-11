//SCRATCH. IT WAS RUN IN FLYININ.JS, NOT HERE

        //Query Aviation Edge Routes - NOT RELIABLE                                                                                                           
        $.get(urlFlights, function(dataRoutes) {
            let urlRoutes = 'http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&departureIata=' + departureIata + '&depar\
tureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flight;
            alert(urlRoutes);
            $.get(urlRoutes, function (dataRoutes) {
                console.log(dataRoutes);
                arrivalTime = dataRoutes[0].arrivalTime;
                alert('arrivalTime: ' + arrivalTime);
            }, 'json');

        }, 'json');
