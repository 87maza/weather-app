

//create an object with random pictures that relate to time and weather of forecast

var longitude;
var latitude;
(function geoloc() {
	//firefox/safari will allow for local html/css/js file to receive geolocation, chrome does not!!!
	//iife function to grab the location of the user
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition);
		console.log(navigator.geolocation.getCurrentPosition(getPosition));
	
	}
	else{
		//message received if geolocation service is unavailable
		console.log("no geolocation available!")
	};
})();
var tempNowF;
var tempNowC;
//clear, cloudy, sunny, rain, windy, snow, https://icons.wxug.com/i/c/v4/nt_clear.svg, 
//https://icons.wxug.com/i/c/v4/nt_cloudy.svg, https://icons.wxug.com/i/c/v4/nt_partlycloudy.svg,
//https://icons.wxug.com/i/c/v4/nt_rain.svg, https://icons.wxug.com/i/c/v4/sunny.svg
function getPosition(position) {
	//stores long/lats of client-side user
	//still unsure of what parameter "position" is referring to getCurrentPosition takes in a callback
		longitude = position.coords.longitude;
		latitude = position.coords.latitude;
		$.ajax({
			//need to create a fallback/default url for when the user doesn want to share geolocation...

			//http://api.wunderground.com/api/API_KEY/37.252194,-121.360474.json
		  url: "http://api.wunderground.com/api/6ebce84ea19d610e/conditions/forecast/alert/q/" + latitude + "," + longitude + ".json",
		  dataType: "json",
		  success: function(response) {
		    var cityStateZip = response.current_observation.display_location.full + " " + response.current_observation.display_location.zip;
		    console.log(response);
		    var weather_text = response.forecast.txt_forecast.forecastday[0].fcttext;
		    tempNowF = response.current_observation.temp_f;
		    tempNowC = response.current_observation.temp_c;
		    var highlowF = response.forecast.simpleforecast.forecastday[0].low.fahrenheit + '&deg; F' + " &mdash; " + response.forecast.simpleforecast.forecastday[0].high.fahrenheit + '&deg; F';
		    var highlowC = response.forecast.simpleforecast.forecastday[0].low.celsius + '&deg; C' + " &mdash; " + response.forecast.simpleforecast.forecastday[0].high.celsius + '&deg; C';
		    var weatherNow = document.getElementById('weatherNow');
		    var weather_sentence = document.getElementById('weather_text');
		    weatherNow.innerHTML = "<h4> Current Status: " + tempNowF + '&deg; F' + "  " + "("+ tempNowC + '&deg; C' + ")" + "</h4>";
		    weather_sentence.innerHTML = "<p>" + weather_text + "</p>";
		    var city = document.getElementById('city');
		    city.innerHTML = "<h3>" + response.current_observation.display_location.full + " Weather Report:" + "</h3>";
		    var highlows = document.getElementById('highsLows') 
		    highlows.innerHTML = "<p> Lows &amp; Highs: " + highlowF + "(" + highlowC + ")" + '</p>'
		  }
		});
};


function clock() {

	var greetings = ['good morning!', "good afternoon!", "good evening!", "get some sleep!"];
	var wallpaper = [
		'http://www.hdwallpaperup.com/wp-content/uploads/2015/01/Sunset-on-Malibu-Beach-California.jpg',
		'http://archwall.xyz/wp-content/uploads/2016/03/bridges-wonderful-view-thames-night-river-city-bridge-lights-ship-wallpaper-gallery.jpg',
		'http://2.bp.blogspot.com/_UeKpPmoedmk/TJttTsVSoZI/AAAAAAAAAik/161bEYBfUuc/s1600/Black%2Band%2BWhite%2BLos%2BAngeles%2BHarbor%2BWalp%2BTLG.png',
		'http://static.hdw.eweb4.com/media/wallpapers_2560x1600/photography/1/1/morning-dew-on-the-grass-photography-hd-wallpaper-2560x1600-6979.jpg'
	];
	var timeOfDay = 0;
	
	
	var currentTime = new Date();
	//new date constructor
	var ampm = "AM";
	//am by default
	var hours = currentTime.getHours();
	//getHours set to military time
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	if(hours === 0) {
		//regular time read
		hours = 12;
	}
	else if (hours > 12) {
		//regular hours conversion if  hours = 1300, hours - 1200 and set the ampm variable
		hours = hours - 12;
		ampm = "PM";
	}
	if((hours >= 1 && ampm === "PM") &&(hours < 6 && ampm === "PM")) {
		//if 1pm - 6pm, greet with good afternoon, wallpaper[0] as the bgimage
		timeOfDay = 1;
		document.body.style.backgroundImage = "url(" + wallpaper[0] + ")";
	}if((hours >= 6 && ampm === "PM") && (hours < 12 && ampm === "PM")) {
		//if 6pm - 1159pm, greet with good evening, wallpaper[1] as the bgimage
		timeOfDay = 2;
		document.body.style.backgroundImage = "url(" + wallpaper[1] + ")";
	}if((hours >= 1 && ampm === "AM") && (hours < 5 && ampm === "AM")) {
		//if 11pm - 5am, greet with go to sleep, wallpaper[2] as the bgimage
		timeOfDay = 3;
		document.body.style.backgroundImage = "url(" + wallpaper[2] + ")";
	}if((hours >= 5 && ampm === "AM") && (hours < 12 && ampm === "AM")) {
		//if 5am - 1159am, greet with good morning, wallpaper[3] as the bgimage
		document.body.style.backgroundImage = "url(" + wallpaper[3] + ")";
   	}
	if(minutes < 10) {
		//add 0 for single digits, like a normal digital clock would read
		minutes = "0" + minutes;
	}if(seconds < 10) {
		seconds = "0" + seconds;
	}
	var clock = document.getElementById('clock');
	clock.innerHTML = "<h1>" + hours + ":" + minutes + ":" + seconds + " " + "<span>" + ampm + "</span>" + "</h1>";
	var greet = document.getElementById('greet');
	greet.innerHTML = '<h2> Hey, ' + greetings[timeOfDay] + '</h2>';
	setTimeout('clock()',1000);
	//settimeout will run the clock function every 500 ms
}
clock();

(function today() {
	var currentDate = new Date();
	//get current date with constructor function, ready to parse the string
	Date.prototype.monthNames = [
	//prototype array of all the months since the date string is in digits
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
	];
	Date.prototype.dayNames = ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	//prototype array of all the day since the date string is in digits 
	Date.prototype.getDayName = function() {
	//prototype function that retrieves today's day/month as a digit and turns it into a string using the arrays above
	    return this.dayNames[this.getDay()];
	};
	Date.prototype.getMonthName = function() {
		//"this" points to the currentdate/Date obj/constructor funciton
		//getMonth/getDay etc are all built in function of the date obj/constructor
	    return this.monthNames[this.getMonth()];
	};
	Date.prototype.getShortMonthName = function () {
		//function isn't used yet unless we want abbreviated months
	    return this.getMonthName().substr(0, 3);
	};
	Date.prototype.getDaySuffix = function() {
		//add number suffix to the getdate function
		var suffix = "th"
		var dateNumber = currentDate.getDate().toString();
		if (dateNumber[0] === 0) {
			dateNumber = dateNumber.subtr[1];
		}
		if (dateNumber === "1" || dateNumber === "21" || dateNumber === "31"){
			suffix = "st";
		}
		if (dateNumber === "2" || dateNumber === "22"){
			suffix = "nd";
		}if (dateNumber === "3" || dateNumber === "23"){
			suffix = "rd";
		}
		return currentDate.getDate() + "<sup>" + suffix + "</sup>";
	};
	var date = document.getElementById('date');
	date.innerHTML = "<h2>" + "Today is " + currentDate.getDayName() + ", " + currentDate.getMonthName() + " " + 
	currentDate.getDaySuffix() + " "  + currentDate.getFullYear() + "</h2>";
})();


