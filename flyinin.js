function inputFocus (field) {
  if (field.value == field.defaultValue) {
    field.value = '';
    field.style.color = '#000';
  }
}

function inputBlur (field) {
  if (field.value == '') {
    field.value = field.defaultValue;
    field.style.color = '#888';
  }
}

function checkAirline (inputTxt) {
    //stub function for check
}

function checkPhoneNum (inputTxt) {
  var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputTxt.value.match(phoneNum)) {
    return true;
  } else {
    alert('Phone Numbers should match the format, nnn-nnn-nnnn');
    document.getElementById('Phone').value = '';
    return false;
  }
}

function checkFlightNum (inputTxt) {
  var flightNum = /^[0-9]{1,4}$/;
  if (inputTxt.value.match(flightNum)) {
    return true;
  } else {
    alert('Flight Numbers should match the format, nnnn');
    document.getElementById('Flight').value = '';
    return false;
  }
}

function checkZipCode (inputTxt) {
  var zipCode = /^[0-9]{5}$/;
  if (inputTxt.value.match(zipCode)) {
    return true;
  } else {
    alert('Zip Code should match the value nnnnn');
    document.getElementById('ZipCode').value = '';
    return false;
  }
}
