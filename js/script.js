

//create an object with random pictures that relate to time and weather of forecast
//http://nominature.com/wp-content/uploads/2015/12/sunsets-calm-afternoon-lake-beautiful-sunset-clouds-building-trees-walkway-wallpaper-pictures-free.jpg
//http://www.hdwallpaperup.com/wp-content/uploads/2015/01/Sunset-on-Malibu-Beach-California.jpg
//http://archwall.xyz/wp-content/uploads/2015/12/other-chinese-market-photography-china-nightlife-wonderful-great-skyphoenixx1-amazing-evening-lights-night-awesome-outstanding-adorable-stunning-nice-fantastic-marvellous-trees-architecture-.jpg
//http://2.bp.blogspot.com/_UeKpPmoedmk/TJttTsVSoZI/AAAAAAAAAik/161bEYBfUuc/s1600/Black%2Band%2BWhite%2BLos%2BAngeles%2BHarbor%2BWalp%2BTLG.png
//


$.ajax({
  url: "http://api.wunderground.com/api/6ebce84ea19d610e/conditions/q/CA/Fullerton.json",
  dataType: "json",
  success: function(response) {
    console.log(response);
  }
});

function clock() {

	var greetings = ['Good Morning!', "Good Afternoon", "Good Evening", "get some sleep!"];
	var wallpaper = [
		'http://www.hdwallpaperup.com/wp-content/uploads/2015/01/Sunset-on-Malibu-Beach-California.jpg',
		'http://archwall.xyz/wp-content/uploads/2015/12/other-chinese-market-photography-china-nightlife-wonderful-great-skyphoenixx1-amazing-evening-lights-night-awesome-outstanding-adorable-stunning-nice-fantastic-marvellous-trees-architecture-.jpg',
		'http://2.bp.blogspot.com/_UeKpPmoedmk/TJttTsVSoZI/AAAAAAAAAik/161bEYBfUuc/s1600/Black%2Band%2BWhite%2BLos%2BAngeles%2BHarbor%2BWalp%2BTLG.png',
		'http://static.hdw.eweb4.com/media/wallpapers_2560x1600/photography/1/1/morning-dew-on-the-grass-photography-hd-wallpaper-2560x1600-6979.jpg'
	];
	var timeOfDay = 0;
	
	
	var currentTime = new Date();
	//new date constructor
	var ampm = "AM";
	//am by default
	var hours = currentTime.getHours();
	//logic is set to military time
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
	if(hours >= 1 && ampm === "PM") {
		timeOfDay = 1;
		document.body.style.backgroundImage = "url(" + wallpaper[0] + ");";
	}if(hours >= 6 && ampm === "PM") {
		timeOfDay = 2;
		document.body.style.backgroundImage = "url(" + wallpaper[1] + ");";
	}if(hours >= 11 && ampm === "PM") {
		timeOfDay = 3;
		document.body.style.backgroundImage = "url(" + wallpaper[2] + ");";
	}if(hours >= 5 && ampm === "AM") {
		document.body.style.backgroundImage = "url(" + wallpaper[3] + ");";
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
	Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
	];

	Date.prototype.dayNames = ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   
	Date.prototype.getDayName = function() {
	    return this.dayNames[this.getDay()];
	};

	Date.prototype.getMonthName = function() {
	    return this.monthNames[this.getMonth()];
	};
	Date.prototype.getShortMonthName = function () {
	    return this.getMonthName().substr(0, 3);
	};
	var date = document.getElementById('date');
	date.innerHTML = "<h2>" + "Today is " + currentDate.getDayName() + ", " + currentDate.getMonthName() + " " + 
	currentDate.getDate() + ", " + currentDate.getFullYear() + "</h2>";

})()