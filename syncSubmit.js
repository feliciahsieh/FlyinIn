/*
# Fill the form
# Using form data, make request to airplaine API for ETA
# Make req to Google maps
# Calculate time to leave for the airport (by subtracting drive dist (from G API) from airplaine API )
# Show "Time to leave message" under the form
# Re-render Map with something (Map with directions or whatever)
*/

function showTimeMessage (message) {
    let widget = $('#result');
    widget.show();
    widget.text('You must leave at ' + message);
}


function rerenderMap () {
    
}


formData = {
    // all fields are filled properly
}

$.formData = formData;


form.onSubmit(function(e) {
    // form error check
    // only if it's fine

    fetch(airplaineAPIurl)
    .then(function(airRes) {
	fetch(GmapsAPIurl)
	.then(function (googleRes) {
	    let calcResult = airRes - googleRes + 15*60; // calculate time to leave for the airport (by subtracting drive dist (from G API) from airplane API )
	    return calcResult; // the result of the calculation 
	    })
	})
    .then(function(data) {
	showTimeMessage(data.calcResult);
	rerenderMap();
	})
    .catch(function(error) {
	console.error(error);
	})
})
