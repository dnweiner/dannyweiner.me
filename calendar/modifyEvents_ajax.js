// modifyEvents_ajax.js
 
function modifyAjax(event){
	var eventid = this.parentNode.parentNode.id; // Get the id of the event from the modification form's div
	
	var new_name = this.parentNode.childNodes[0].value; //get the entered name, if any
	var new_date = this.parentNode.childNodes[4].value; //get the entered date, if any
	var new_time = this.parentNode.childNodes[6].value; //get the entered time, if any
	var new_descript = this.parentNode.childNodes[2].value; //get the entered description, if any
	
	var old_name = this.parentNode.childNodes[10].value; //get the original name, in case we aren't renaming here
	var old_date = this.parentNode.childNodes[11].value; //get the original date, in case we aren't redating here
	var old_time = this.parentNode.childNodes[12].value; //get the original time, in case we aren't retiming here
	var old_descript = this.parentNode.childNodes[13].value; //get the original description, in case we aren't redescribing here
	
	var token = document.getElementById("token").value; //maintain token

	
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventid=" + encodeURIComponent(eventid)
	+ "&new_name=" + encodeURIComponent(new_name)
	+ "&new_date=" + encodeURIComponent(new_date)
	+ "&new_time=" + encodeURIComponent(new_time)
	+ "&new_descript=" + encodeURIComponent(new_descript)
	+ "&old_name=" + encodeURIComponent(old_name)
	+ "&old_date=" + encodeURIComponent(old_date)
	+ "&old_time=" + encodeURIComponent(old_time)
	+ "&old_descript=" + encodeURIComponent(old_descript)
	+ "&token=" + encodeURIComponent(token);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "modifyEvents_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Event modified.");
			refresh();
		}else{
			alert("Event was not modified.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}