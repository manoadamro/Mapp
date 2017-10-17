var index = -1;

var getUpdates = function() {
	params = { index: index, channel: channel };
	getRequest("/chat/update", params, function(response) {
		var parsedMessages = response.data;
		if (parsedMessages.length > 0) {
			renderMessages(parsedMessages);
			index = parsedMessages.length + index;
		}
		updateLoop();
	});
};

var renderMessages = function(data) {
	var htmlString = "";
	for (i = 0; i < data.length; i++) {
		htmlString +=
			'<span class="message">' +
			'<span class="author">' +
			data[i][2] +
			"</span>" +
			": " +
			data[i][1] +
			"<br/>" +
			"</span>";
	}
	document.getElementById("messageList").innerHTML += htmlString;
};
