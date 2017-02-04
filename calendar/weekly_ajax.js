//// weekly_ajax.js

//currently unused


// 
//function weeklyAjax(event){
//	var eventid = this.parentNode.id; // Get the id of the event from the event's div
//	var numWeeks = document.getElementById("numWeeks").value;
//	var token = document.getElementById("token").value;
//	
//	for(var i = 0; i < numWeeks; ++i) {
//		var eventName = document.getElementById("event_name").value + i; // Get the name of the event from the form
//		var eventDate = document.getElementById("event_date").value; // Get the date of the event from the form
//		var eventTime = document.getElementById("event_time").value; // Get the time of the event from the form
//		// Make a URL-encoded string for passing POST data:
//		var dataString = "eventName=" + encodeURIComponent(eventName) + "&eventDate=" + encodeURIComponent(eventDate) + "&eventTime=" + encodeURIComponent(eventTime) + "&token=" + encodeURIComponent(token);
//	 
//		var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
//		xmlHttp.open("POST", "add_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
//		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
//		xmlHttp.addEventListener("load", function(event){
//			var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
//			if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
//				refresh();
//			}else{
//				alert("Event was not added.  "+jsonData.message);
//			}
//		}, false); // Bind the callback to the load event
//		xmlHttp.send(dataString); // Send the data
//		}
//
//}
// 
////document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click