""" FlightXML 2.0 """
import requests

username = "YOUR_USERNAME"
apiKey = "YOUR_API_KEY"
fxmlUrl = "https://flightxml.flightaware.com/json/FlightXML3/"

payload = {'airport_code':'KSFO', 'type':'enroute', 
    'howMany':'10'}
response = requests.get(fxmlUrl + "AirportBoards", 
    params=payload, auth=(username, apiKey))

if response.status_code == 200:
    print response.json()
else:
    print "Error executing request"