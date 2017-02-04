// login_ajax.js

function loginAjax(event){
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been logged in!");
			displayEvents();
			//$("#currentUser").show();
			$("#currUser").text(username);
			document.getElementById("username").value = ""; //clear the login form 
			document.getElementById("password").value = ""; //clear the login form
			document.getElementById("token").value = jsonData.token; //set the token to be access later by other AJAX usages
			$(".addEvent").show(); //show form to add events, now that we've logged in
			$("#logout_btn").show(); //show button to logout (unnecessary for non-logged-in users to logout)
			$("#refresh_btn").show(); //show button to refresh events, now that we're displaying events
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}