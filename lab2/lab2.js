$( document ).ready(function() {
	var currentweather = 0; // 2 variables that need to be able to be accessed from anywhere
	var windowtimeout = 10000;
	var appid = "a5056bd629bba3900301369ba991246a"; // my applications APPID from openweathermap.com
	if(navigator.geolocation){ // checking for geolocation and then if allow go into the returnCoords function
		navigator.geolocation.getCurrentPosition(returnCoords);
	}else{
		$("#today").append = "GEOLOCATION NOT SUPPORTED!";
	}

	function returnCoords(position){ // main function to do all of the data processing
		var weathermap = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID="+appid; // the URL in which we will gather all of the data from.
		$.ajax({
			type: 'GET',
			url: weathermap,
			dataType: 'json',
			success: function(data){ // on success start processing the data
				$(".city").append("<h1> Today in "+data['city']['name']+": </h1>"); // Do the main display
				//Information regarding the weather right now
				var datetime = new Date(1970,0,1);
				datetime.setSeconds(data['list'][0]['dt']);
				$('.today').append("<p> "+datetime.toLocaleString()+"</p>"); // print out the date and time, in an easy to read format
				for(var i =0;i<data['list'][0]['weather'].length;i++){ // for each weather, there can be multiple "weather", 
					$('.today').append("<p>"+data['list'][0]['weather'][i]['description'].charAt(0).toUpperCase()+ data['list'][0]['weather'][i]['description'].slice(1)+"</p>"); // print out the descript with the first letter capitalized
					$(".today").append("<p><img src='http://openweathermap.org/img/w/"+data['list'][0]['weather'][i]['icon']+".png'/></p>") // add an image right below the text
				}
				$('.today').append("<p>Current: " + data['list'][0]['main']['temp']+" &deg;F</p>"); // The current temp/average temp
				$('.today').append("<p>Max: " + data['list'][0]['main']['temp_max']+"&deg;F | Wind Speed: "+ data['list'][0]['wind']['speed'] +"m/s</p>"); //printing out some data about the current situation
				$('.today').append("<p>Min: " + data['list'][0]['main']['temp_min']+"&deg;F | Wind Direction:"+ data['list'][0]['wind']['deg'] +"&deg;</p>");

				for(var j=1;j<data['list'].length;j++){ // go over every item in the list of all available (should be 5 days worth, interval of 3 hours.)
					var datetime = new Date(1970,0,1); 
					datetime.setSeconds(data['list'][j]['dt']);//basic date time getting and then printing, below we need to append everything at one time because of the code that will be showing the next time interval
					$('.next').append("<section class='next_weather col-xs-4'> \
						<p> "+datetime.toLocaleString()+"</p>\
						<p> Upcomming: " + data['list'][j]['main']['temp']+"&deg;F</p> \
						<p>Upcomming Max: " + data['list'][j]['main']['temp_max']+"&deg;F</p> \
						<p>Upcomming Min: " + data['list'][j]['main']['temp_min']+"&deg;F</p> \
						<p>"+data['list'][j]['weather'][0]['description'].charAt(0).toUpperCase() + data['list'][j]['weather'][0]['description'].slice(1)+"</p> \
						<p><img src='http://openweathermap.org/img/w/"+data['list'][j]['weather'][0]['icon']+".png'/></p>");				
				}
				$(".next_weather").hide(); // start by hiding all elements
				shownextweather(); // then start showing a few. 
			
			}
		})
	}
	$("#faster").click(function(){ // if the faster button is clicked, drop the speed by 1 second
		windowtimeout -= 1000;
	});
	$("#slower").click(function(){// if the faster button is clicked, increase the speed by 1 second
		windowtimeout += 1000;
	});


	function shownextweather(){ // the show and hide of the upcoming weather conditions
		var $list = $(".next_weather"); // list of all available
		var from = (currentweather); // starting with the current one (the one on the left side)
		var to = currentweather+3; // only show 3 at a time
		$list.slice(from-1,to).hide("slide",{direction:"left"},300);	// hide needs to be faster than the show to prevent issues with the new one showing below the old items
		$list.slice(from,to).show("slide",{direction:"right"},1000); // take 1 second to show the new items, adds a nice effect
	  window.setTimeout(nextplease,windowtimeout);	 // wait a certain amount of time before calling nextplease()
	}
	function nextplease(){ // this increments the currentcounter and then calls the shownextweather again to make it hide and show the elements.
		currentweather++;	
		shownextweather();
	} 
});