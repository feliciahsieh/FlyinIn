# Flyin' In

<p align="center"><img src="images/LogoFlyinIn.png" width="150px" /></p>

## Welcome
<p align="center"><img src="images/FlyinIn.png" height="300px" /></p>

Flyin' In is written in Javascript, JQuery/AJAX, Bootstrap and uses API's from Twilio, Aviation Edge, and Google Maps.

## Table of Contents
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Requirements
* Ubuntu (v14.04 LTS)
* NodeJS (v6.12.3)
* Twilio API (with valid Twilio account and token) (v3.11.3)
* Aviation Edge API (with valid API account and key for Premium level)
* Google Maps API (with valid Google API account and token)
* expressJS (v4.16.2)
* cors (v2.8.4)
* body-parser (v1.18.2)
* request

* NPM
* JQuery (v3.2.1)
* Ajax (v1.12.9)
* HTML5 / CSS
* Bootstrap (v4.0.0)
* Web browser using HTML5

## Installation
Set your computer ENVIRONMENT variables,
TWILIO_SID, TWILIO_TOKEN, FLIGHTAWARE_USER, FLIGHTAWARE_API3, GMAPSDIST to your values and export them.

In your terminal, git clone the directory with the following command:

```
git clone https://github.com/feliciahsieh/flyinin.git
npm init (and fill out to create your package.json)
npm install twilio
npm install express
npm install body-parser
npm install cors
npm install request
```

## Usage
Use a browser and open index.html. Enter the Airline, Flight Number, and your Phone Number to receive a text message. You will receive information on when you should leave for the airport, depending on your starting location.

Note, text messages will only be sent to phone numbers in your chosen country. To upgrade to international phone numbers, you may need to upgrade your Twilio account.

## Credits
Flyin' In is owned and maintained by Felicia Hsieh ([@feliciahsiehsw](https://twitter.com/feliciahsiehsw)) and Sergii Garkusha ([@Cu7ious](https://twitter.com/Cu7ious)).

## License
Flyin' In is released under the MIT license. See [LICENSE](https://github.com/feliciahsieh/flyinin/blob/master/LICENSE) for details.
