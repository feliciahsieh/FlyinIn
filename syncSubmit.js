/*

# fill the form

# using form data, make request to airplaine API for ETA

# make req to Google maps

# calculate time to leave for the airport (by subtracting drive dist (from G API) from airplaine API )

# Show "Time to leave message" under the form

# Re-render Map with something (Map with directions or whatever)

*/

function showTimeMessege (message) {
    let widget = $('#result');
    widget.show();
    widget.text('You must leave at ' + massage);
}


function rerenderMap () {
    
}


formData = {
    // all fields ae filled properly
}

$.formData = formData;


form.onSubmit(function(e) {
    // form error check
    // only if it's fine

    fetch(airplaineAPIurl)
    .then(function(airRes) {
	fetch(GmapsAPIurl)
	.then(function (googleRes) {
	    let calcResult = googgleRes - airRes; // calculate time to leave for the airport (by subtracting drive dist (from G API) from airplaine API )
	    return calcResult; // the result of the calculation 
	    })
	})
    .then(function(data) {
	showTimeMessege(data.calcResult);
	rerenderMap();
	})
    .catch(function(error) {
	console.error(error);
	})
})
