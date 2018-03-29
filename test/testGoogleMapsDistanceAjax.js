let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=94546&destinations=KOAK&key=AIzaSyBoRvW47xXGNrYz-LYR3TLHC-p18sPFIes';

$.get(url)
    .done(function (data) {
        $('#from').replaceWith(data['origin_addresses']);
        $('#to').replaceWith(data['destination_addresses']);
        $('#distance').replaceWith(data.rows[0].elements[0].distance.text);
        $('#duration').replaceWith(data.rows[0].elements[0].duration.text);
        $('#status').replaceWith(data.rows[0].elements[0].status);
    });

/* GET RESPONSE data structure
{
    destination_addresses: [
	"Oakland International Airport (OAK), 1 Airport Dr, Oakland, CA 94621, USA"
    ],
    origin_addresses: [
	"Castro Valley, CA 94546, USA"
    ],
    rows: [
	{
	    elements: [
		{
		    distance: {
			text: "10.9 mi",
			value: 17585
		    },
		    duration: {
			text: "19 mins",
			value: 1126
		    },
		    status: "OK"
		}
	    ]
	}
    ],
    status: "OK"
}
*/
