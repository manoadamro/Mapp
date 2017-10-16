
var DEFAULT_CHANNEL_NAME = 'global'
var user = null;
var view = "";


var renderLogInView = function(){

	session.logOut(null);
    document.getElementById("page").innerHTML = loginForm;
	view = "login";

	$("#login").click(function(event) {
		var username = document.getElementById("usernameForm").value;
		if (username.length === 0){
			errors.append('Username can not be empty')
			errors.render();

		} else {
			session.logIn(username, function(response){
				user = new User(username);
				user.joinChannel(DEFAULT_CHANNEL_NAME, function(response){
					renderChannelView();		
				})
			})
		}
		event.preventDefault();
	});
}

var renderChannelView = function(){

    document.getElementById("page").innerHTML = languageList + messageList + messageForm;
	view = "channel";

	$("#setLanguage").click(function(event) {
		if(user !== null){
			var language = 'en'
			user.setLanguage(language);
		}

		event.preventDefault();
	});

	$("#send").click(function(event) {
		message = document.getElementById("messageForm").value;
		if(user !== null){
			channels.newMessage(message, user.channel, function(response){
				document.getElementById("messageForm").value = "";
			})
		}
		event.preventDefault();
	});

	$("#logout").click(function(event) {
		session.logOut(function(response){
			user = null;
			renderLogInView();
		})
	});

	var messageLoop = function(){
		channels.messages(user.channel, user.language, user.messageIndex, function(response){
			user.messageIndex += response.length;
			renderMessages(response);
			setTimeout(function() {
				messageLoop();
			}, 1000);
		})
	}
	messageLoop();
}

var renderMessages = function(data){
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