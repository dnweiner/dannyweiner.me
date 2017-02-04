// add_ajax.js
 
function addAjax(event){
	var numWeeks = document.getElementById("numWeeks").value; //Get the number of weeks to repeat
	if (!isInt(numWeeks)) { //make sure an integer was entered (html form should do this, but doublechecking is good)
		alert("Invalid number of weeks!");
		return;
	} else if (numWeeks > 4) { //cap the number of weeks at 4
		numWeeks = 4;
	}
	
	if (numWeeks > 1) { //boolean for repeating or not, to be saved in database field
		var weekly = 1;
	}
	
	//console.log(numWeeks);
	var eventName = document.getElementById("event_name").value; // Get the name of the event from the form
	var originalEventDate = document.getElementById("event_date").value; // Get the starting date of the event from the form
	var originalEventMonth = parseInt(originalEventDate.substr(6,2)); //get month from date field
    var originalEventYear = parseInt(originalEventDate.substr(0,4)); //get year from date field
	var originalEventDay = parseInt(originalEventDate.substring(8)); //get day from date field
	var eventTime = document.getElementById("event_time").value; // Get the time of the event from the form
	var eventDescript = document.getElementById("event_description").value;
	var token = document.getElementById("token").value; //carry over the token we've been using
 
	for (var i = 0; i < numWeeks; ++i) { //loop for the given number of weeks to add each event
		if ((originalEventDay + 7*i) <= 31)  { //make sure we're within the same month, otherwise the math doesn't work
			var repeatEventDay = originalEventDay + 7*i; //new date value is a week later, then two weeks, ...
			var eventDate = originalEventYear + "-" + originalEventMonth + "-" + repeatEventDay; //make a new date string: "yyyy-mm-dd"
		
			// Make a URL-encoded string for passing POST data:
			var dataString = "eventName=" + encodeURIComponent(eventName)
			+ "&eventDate=" + encodeURIComponent(eventDate)
			+ "&eventTime=" + encodeURIComponent(eventTime)
			+ "&weekly=" + encodeURIComponent(weekly)
			+ "&token=" + encodeURIComponent(token)
			+ "&eventDescript=" + encodeURIComponent(eventDescript);
			
		 
			var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
			xmlHttp.open("POST", "add_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
			xmlHttp.addEventListener("load", function(event){
				var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
				if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
					document.getElementById("event_name").value = ""; //clear form
					document.getElementById("event_description").value = ""; //clear form
					document.getElementById("event_date").value = ""; //clear form
					document.getElementById("event_time").value = ""; //clear form
				}else{
					alert("Event was not added.  "+jsonData.message);
				}
			}, false); // Bind the callback to the load event
			xmlHttp.send(dataString); // Send the data
		} 
	}
	refresh(); //recreate calendar and display events
}