
var view = "";

var renderLogInView = function(){
    document.getElementById("page").innerHTML = loginForm;
	view = "login";

	$("#login").click(function(event) {
		var username = document.getElementById("usernameForm").value;
		if (username.length === 0)
		event.preventDefault();
	});
}

var renderChannelView = function(channelName){
    document.getElementById("page").innerHTML =
		languageList + messageList + messageForm;
	view = "channel";

	$("#setLanguage").click(function(event) {
		changeLanguage();
		event.preventDefault();
	});

	$("#send").click(function(event) {
		message = document.getElementById("messageForm").value;
		console.log(message);
		if (message != "") {
			params = { message: message, channel: channel };
			$.post("/chat/message", params).done(function(response) {
				if (response.code === 0) {
					document.getElementById("messageForm").value = "";
					displayError("");
				}
			});
		}
		event.preventDefault();
	});

	$("#logout").click(function(event) {
		clearSession();
		setLogInView();
		updateChannelName("");
	});

	$("#addChannel").click(function(event) {
		name = document.getElementById("channelForm").value;
		console.log("adding channel: " + name);
		createChannel(name);
		getChannelList();
		document.getElementById("channelForm").value = "";
		event.preventDefault();
	});

	$("#deleteChannel").click(function(event) {
		deleteChannel(channel);
		event.preventDefault();
	});

	refreshTargetLanguage(targetLanguage);
	updateLoop();
}

var renderMessages = function(messageList){
	var htmlString = "";
	for (i = 0; i < data.length; i++) {
		htmlString +=
			'<span class="message">' +
			'<span class="author">' +
			data[i].author +
			"</span>" +
			": " +
			data[i].text +
			"<br/>" +
			"</span>";
	}
	document.getElementById("messageList").innerHTML += htmlString;
}

var renderChannelList = function(channelList){
    document.getElementById('sidebar-channels').innerHTML = ''
   for(i=0; i<channels.length; i++) {
    document.getElementById('sidebar-channels').innerHTML += '<li><a href=' +
        'javascript:switchChannel("' +
        channels[i] + '")>' +
        channels[i] +
        '</a></li>'
    }
}

renderLogInView();