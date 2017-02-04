//displayEvents_ajax.js

function displayEvents() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "displayEvents_ajax.php", true);
    xmlHttp.addEventListener("load",ajaxCallback,false);
    xmlHttp.send(null);

    function ajaxCallback(event) {
        var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
        if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            $("#refresh_btn").show();
			$("#currentUser").show();
			$("#logout_btn").show();
            var eventids = jsonData.eventids;
			//console.log(eventids);
			var pattern = /[\d]+/g;
			event_id_array = eventids.match(pattern);
			//console.log(event_id_array);
			for(var i = 0; i < event_id_array.length; ++i) {
				//console.log(parseInt(event_id_array[i]));
                
                var event_name = jsonData[event_id_array[i]].eventname;
                var event_date = jsonData[event_id_array[i]].eventdate;
                var event_time = jsonData[event_id_array[i]].eventtime;
                var event_descript = jsonData[event_id_array[i]].eventdescript;
				var weekly = jsonData[event_id_array[i]].weekly;
				var flagged = jsonData[event_id_array[i]].flagged;
                
                var event_date_day = parseInt(event_date.substring(8));
                var event_date_month = parseInt(event_date.substr(6,2));
                var event_date_year = parseInt(event_date.substr(0, 4));
                
                    if (event_date_month == (parseInt(currentMonth.month)+1) && event_date_year == parseInt(currentMonth.year)){
                        if (weekly == 1 && flagged == 0) {
							$("#day" + event_date_day).append("<div id=" + event_id_array[i] + " class=weeklyEvent </div>");
						} else if(weekly == 0 && flagged == 1) {
							$("#day" + event_date_day).append("<div id=" + event_id_array[i] + " class=flaggedEvent </div>");
						} else if(weekly == 1 && flagged == 1) {
							$("#day" + event_date_day).append("<div id=" + event_id_array[i] + " class=flaggedWeeklyEvent </div>");
						} else {
							$("#day" + event_date_day).append("<div id=" + event_id_array[i] + " class=activeEvent </div>");
						}
                        $("#" + event_id_array[i]).append(
							event_time
                            /*"<p>" + event_time + "</p>"*/
							+"<label for='flag_btn' id='flag_btn_label'>Flag<input type='checkbox' id='flag_btn'></label><br>"
                            +"<strong>" + event_name + "</strong>"
                            +"<input type='button' id='delete_btn' value='Delete'>"
                            +"<br><span title ='"+ event_descript + "'>Event Description</span>"
                            +"<form class='modifyEvent'>"
                            +"<input type='text' id='new_name' placeholder='New Event Name'>"
                            +"<br>"
                            +"<input type='text' id='new_descript' placeholder='New Event Description'>"
                            +"<br>"
                            +"<input type='date' step=1 id='new_date'>"
                            +"<br>"
                            +"<input type='time' step=1 min=0 id='new_time'>"
                            +"<br>"
                            +"<input type='button' id='modify_btn' value='Modify'>"
                            +"<input type='reset' value='Clear'>"
                            +"<input type='hidden' id='old_name' value=" + event_name + ">"
                            +"<input type='hidden' id='old_date' value=" + event_date + ">"
                            +"<input type='hidden' id='old_time' value=" + event_time + ">"
                            +"<input type='hidden' id='old_descript' value=" + event_descript + ">"
                            +"</form>"
                            
                        );
                        
                    }
            }
            
        }else{
            alert("Events not found.  "+jsonData.message);
        }
    }
}
