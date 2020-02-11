# Lift Knock Off

Ahmet Armanc Keser
COMP 20 - Web Programming (Ming Chow)

### Purpose:
  * The purpose of this web application is to utilize with JSON, JavaScript and HTML5 geolocation APIs, and implement an application to mimic widespread personal taxi applications.

  * Note: I have tried using Promises to get rid of the awful code. Turns out I have no idea how they work. As soon as I learn, I will incorporate them to my coding style.
### Goals:

![Progress](http://progressed.io/bar/100)

-  [x] Retrieves your current location (latitude and longitude) and sends it to a server via ride request API that I created.

-  [x] Retrieves and displays the locations of vehicles OR passengers on a map, depending on who you are. Your web page will need to handle both cases (showing locations of vehicles or passengers on map) as it is possible that I can change your status from a passenger to a driver, vice versa.

-  [x] Upon clicking on your marker (i.e., where you are currently located), show how far away you are to (1) the nearest vehicle or passenger --depending on who you are, and (2) the Weinermobile --if it exists!


#### CheckList:
-  [x] At least one (1) CSS file

-  [x] Retrieves your location via JavaScript navigator.geolocation object

-  [x] Sends your location (latitude, longitude, username) to server is ride request API

-  [x] Displays your location on the map with unique marker.  Clicking on marker will display (1) your username and distance away (in miles) to nearest vehicle or passenger, and (2) distance away (in miles) to the Weinermobile --if it exists.

-  [x] Displays locations of passengers if you are a driver / vehicle, or locations of vehicles if you are passenger on the map, including the Weinermobile if it exists. Clicking on a marker (passenger or vehicle) will display username, and mile(s) away from you in an info window. A unique icon for a passenger must be used (the image can be anything); all people / passenger markers on map will use the same icon. The icon for a vehicle must be Car. The icon for the Weinermobile must be Weinermobile.

-  [x] The basics (e.g., README file, proper folder name, work in both master branch in private GitHub repository)

##### Avoid:
-  [x] Errors and console.log() outputs exist in JavaScript console (warnings acceptable).

-  [x] You used jQuery.


##### Acknowledgements:
- I worked alone in this project and mainly used the class examples and the GoogleMaps API documentation.

##### Total Time:
- 13 Hours
