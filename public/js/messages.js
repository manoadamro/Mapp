var index = -1;

var getUpdates = function() {
	params = { index: index, channel: channel };
//	$.get("/chat/update", params).done(function(response) {
//		if (response.code === 0) {
//			var parsedMessages = response.data;
//			if (parsedMessages.length > 0) {
//				renderMessages(parsedMessages);
//				index = parsedMessages[parsedMessages.length - 1].index;
//			}
//			displayError("");
//		} else {
//			displayError(response.message);
//		}
//	});
	getRequest("/chat/update", params, function(response){
		var parsedMessages = response.data;
		if (parsedMessages.length > 0) {
			renderMessages(parsedMessages);
			index = parsedMessages[parsedMessages.length - 1].index;
	    }
	})
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
			"<br/>" +
			"</span>";
	}
	document.getElementById("messageList").innerHTML += htmlString;
};
