var channel = "global";

var createChannel = function(name) {
	params = { channel: name };
	$.post("/chat/create", params).done(function(response) {
		if (response.code === 0) {
			channel = name;
			clearMessages();
			displayError("");
		} else {
			displayError(response.message);
		}
	});
};

var deleteChannel = function() {
	params = { channel: channel };
	$.post("/chat/delete", params).done(function(response) {
		if (response.code === 0) {
			channel = "global";
			clearMessages();
			displayError("");
		} else {
			displayError(response.message);
		}
	});
};

var joinChannel = function(name) {
	leaveChannel();
	params = { channel: name };
	$.post("/chat/join", params).done(function(response) {
		if (response.code === 0) {
			channel = name;
			displayError("");
		} else {
			displayError(response.message);
		}
	});
};

var leaveChannel = function() {
	params = { channel: channel };
	$.post("/chat/leave", params).done(function(response) {
		if (response.code === 0) {
			channel = "global";
			displayError("");
		} else {
			displayError(response.message);
		}
	});
};
