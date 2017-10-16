
var DEFAULT_CHANNEL_NAME = 'global'
var user = null;
var view = "";


var renderLogInView = function(){

	var loginForm =
		"<form>" +
		"<div class='name-input'>Input your name:<div>" +
		'<input class="usernameForm" type="text" id="usernameForm"></input>' +
		"<br />" +
		'<button class="login btn btn-success" id="login">Log In</button>' +
		"</form>";

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

	var createChannel =
		'<form id="createChannel">' +
		'<input class="" type="text" id="channelForm"></input>' +
		"<button>Create Channel</button>" +
		"</form>";

	document.getElementById("page").innerHTML = language.languageListHtml() + channels.messageListHTML();
	view = "channel";
	messageLoop();

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

	$("#menu-toggle").click(function(event) {
		channels.update(function(response){
			renderChannelList(response);
			$("#wrapper").toggleClass("toggled");
		})
		event.preventDefault();
	});

	$("#addPublicChannel").click(function(event) {
		channelName = document.getElementById("channelForm").value;
		channels.add(channelName, '*', function(response){
			if(user !== null) {
				user.joinChannel(channelName, function(response){
					renderChannelView(user.channel);
				})
				channels.update(function(response){
					renderChannelList(response);
				})
			}
		})
		document.getElementById("channelForm").value = "";
		event.preventDefault();
	});

	$("#addPrivateChannel").click(function(event) {
		channelName = document.getElementById("channelForm").value;
		channels.add(channelName, user.name, function(response){
			if(user !== null) {
				user.joinChannel(channelName, function(response){
					renderChannelView(user.channel);
				})
				channels.update(function(response){
					renderChannelList(response);
				})			}
		})
		document.getElementById("channelForm").value = "";
		event.preventDefault();
	});

	$("#deleteChannel").click(function(event) {
		if(user !== null) {
			var channelName = user.channel;
			channels.remove(channelName, function(response){
				user.join(DEFAULT_CHANNEL_NAME, function(response){
					renderChannelView(user.channel);	
				})
			})
		}	
		event.preventDefault();
	});
}

var messageLoop = function(){
	if(user.channel !== null){
		channels.messages(user.channel, language.languageCode, user.messageIndex, function(response){
			user.messageIndex += response.length;
			renderMessages(response);
			setTimeout(function() {
				messageLoop();
			}, 1000);
		})
	} else {
		setTimeout(function() {
			messageLoop();
		}, 1000);	
	}
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

var clearMessages = function(){
	document.getElementById("messageList").innerHTML = '';
}

var switchChannel = function(channelName) {
	user.leaveChannel(user.channel, function(response){
		clearMessages();
		user.joinChannel(channelName, null)
	})
}

var renderChannelList = function(channelList){

	var sideBarChans = document.getElementById('sidebar-channels')
    sideBarChans.innerHTML = ''
    for(i=0; i<channelList.length; i++) {
	    sideBarChans.innerHTML += '<li>' +
	    '<a href=javascript:switchChannel("' + channelList[i] + '") >' +
	    channelList[i] + '</a>' +
	    '</li>'
    }
}