var channel = "";

var createChannel = function(name) {
	params = { channel: name };
	postRequest("/chat/create", params, function(response) {
		switchChannel(name);
		getChannelList();
	});
};

var deleteChannel = function() {
	params = { channel: channel };
	postRequest("/chat/delete", params, function(response) {
		switchChannel("global");
	});
};

var joinChannel = function(name) {
	params = { channel: name };
	postRequest("/chat/join", params, function(response) {
		channel = name;
		clearMessages();
		index = -1;
		updateChannelName();
	});
};

var updateChannelName = function() {
	currentChannel = "You are currently in: " + channel;
	document.getElementById("currentChannel").innerHTML = currentChannel;
};

var switchChannel = function(name) {
	if (channel !== "") {
		params = { channel: channel };
		postRequest("/chat/leave", params, function(response) {
			joinChannel(name);
		});
	} else if (channel === name) {
		displayError("you are already in this channel");
	} else {
		joinChannel(name);
	}
};

var getChannelList = function() {
	getRequest("/chat/list", {}, function(response) {
		renderChannels(response.data);
	});
};

getChannelList();
