let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=94546&destinations=KOAK&key=AIzaSyBoRvW47xXGNrYz-LYR3TLHC-p18sPFIes';

$.get(url)
    .done(function (data) {
        $('#from').replaceWith(data['origin_addresses']);
        $('#to').replaceWith(data['destination_addresses']);
        $('#distance').replaceWith(data.rows[0].elements[0].distance.text);
        $('#duration').replaceWith(data.rows[0].elements[0].duration.text);
        $('#status').replaceWith(data.rows[0].elements[0].status);
    });
