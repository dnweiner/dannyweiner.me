// deleteEvents_ajax.js
 
function deleteAjax(event){
	var eventid = this.parentNode.id; // Get the id of the event from the modification form's div
	var token = document.getElementById("token").value; //maintain token
	//alert(eventid);
	
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventid=" + encodeURIComponent(eventid) + "&token=" + encodeURIComponent(token);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "deleteEvents_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Event deleted.");
			refresh();
		}else{
			alert("Event was not deleted.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
 
