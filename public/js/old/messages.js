var index = -1;

var getUpdates = function() {
	params = { index: index, channel: channel };
	getRequest("/chat/update", params, function(response) {
		var parsedMessages = response.data;
		if (parsedMessages.length > 0) {
			renderMessages(parsedMessages);
			index = parsedMessages[parsedMessages.length - 1].index;
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
			data[i].author +
			"</span>" +
			": " +
			data[i].text +
			'<span class="time">' +
			data[i].timestamp +
			"</span>" +
			"<br/>" +
			"</span>";
	}
	document.getElementById("messageList").innerHTML += htmlString;
};
