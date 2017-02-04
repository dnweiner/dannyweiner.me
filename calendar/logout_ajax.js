// logout_ajax.js
 
function logoutAjax(event){
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("GET", "logout_ajax.php", true); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been logged out!");
			$("#currentUser").hide();
			$(".addEvent").hide(); //opposite of login, so now hide everything we showed there
			createCalendar(); //give the user a blank calendar grid
			$("#logout_btn").hide();
			$("#refresh_btn").hide();
		}else{
			alert("You were not logged out.  ");//+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(null);
}
