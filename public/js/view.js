var view = "";

var setChannelView = function() {
	document.getElementById("page").innerHTML =
		languageList + messageList + messageForm + addUser;
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

	$("#addUser").click(function(event) {
		user = document.getElementById("userForm").value;
		if (user!= "") {
			params = { user: user, channel: channel };
			$.post("/chat/add_user", params).done(function(response) {
				if (response.code === 0) {
					document.getElementById("userForm").value = "";
					displayError("");
					getUserList()
				}
			});
		}
//		getUserList();
		event.preventDefault();
	});

	$("#logout").click(function(event) {
		clearSession();
		setLogInView();
		updateChannelName("");
	});

	$("#addPublicChannel").click(function(event) {
		name = document.getElementById("channelForm").value;
		createPublicChannel(name);
		getChannelList();
		document.getElementById("channelForm").value = "";
		event.preventDefault();
	});

	$("#addPrivateChannel").click(function(event) {
		name = document.getElementById("channelForm").value;
		createPrivateChannel(name);
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
};

var setLogInView = function() {
	document.getElementById("page").innerHTML = loginForm;
	view = "login";

	$("#login").click(function(event) {
		var username = document.getElementById("usernameForm").value;
		if (username.length === 0) {
			displayError("Username can not be empty");
		} else {
			$.post("/session/login", {
				username: username,
				language: "en"
			}).done(function(response) {
				if (response.code == 0) {
					setChannelView();
					joinChannel("global");
					displayError("");
				} else {
					displayError(response.message);
				}
			});
		}
		event.preventDefault();
	});
};
