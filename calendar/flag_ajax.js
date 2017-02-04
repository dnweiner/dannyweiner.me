// flag_ajax.js

var flagged = 0; //current state
var wasFlagged = 0; //past state (to toggle properly)

function flagAjax(event){
	var eventid = this.parentNode.parentNode.id; // Get the id of the event from the modification form's div
	var token = document.getElementById("token").value; //maintain token
	
	if (this.checked && wasFlagged == 0) { //if clicked and not currently flagged, then flag and set state booleans appropriately
		flagged = 1;
		wasFlagged = 1;
	} else if(this.checked && wasFlagged == 1) { //if clicked and currently flagged, then unflag and set state booleans appropriately
		flagged = 0;
		wasFlagged = 0;
	}
	//alert(eventid);
	
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventid=" + encodeURIComponent(eventid) + "&flagged=" + encodeURIComponent(flagged) + "&token=" + encodeURIComponent(token);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "flag_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			//alert("Flag toggled.");
			refresh();
		}else{
			alert("Flag was not toggled.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}