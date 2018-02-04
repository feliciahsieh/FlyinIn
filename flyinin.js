#!/usr/bin/node

function inputFocus(field) {
    if (field.value == field.defaultValue) {
        field.value = "";
        field.style.color = "#000";
    }
}

function inputBlur(field) {
    if (field.value == "") {
        field.value = field.defaultValue;
        field.style.color = "#888";
    }
}

function checkPhoneNum(inputTxt) {
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputTxt.value.match(phoneNum)) {
        return true;
    }
    else {
        alert("Incorrect Phone Number")
        document.getElementById('Phone').value='';
        return false;
    }
}

function checkFlightNum(inputTxt) {
    var flightNum = /^[0-9]{1,4}$/;
    if(inputTxt.value.match(flightNum)) {
        return true;
    }
    else {
        alert("Incorrect Flight Number")
        document.getElementById('Flight').value = '';
        return false;
    }
}

function checkZipCode(inputTxt) {
    var zipCode = /^[0-9]{5}$/;
    if(inputTxt.value.match(zipCode)) {
        return true;
    }
    else {
        alert("Incorrect Zip Code")
        document.getElementById('ZipCode').value='';
        return false;
    }
}

//function getData() {
//  alert(getElementById("Airline").value + getElementById("Flight").value + getElementById("ZipCode").value + getElementById("Phone").value)
//}
