(function(exports) {
	var Messages = function(user, channels) {
		this.user = user;
		this.channels = channels;
	};

	Messages.prototype.clear = function() {
		document.getElementById("messageList").innerHTML = "";
	};

	Messages.prototype.renderMessages = function(data) {
		var htmlString = "";
		for (i = 0; i < data.length; i++) {
			htmlString +=
				'<span class="message">' +
				'<span class="author">' +
				data[i][2] +
				"</span>" +
				": " +
				data[i][1] +
				'<span class="time">' +
				data[i][3] +
				"</span>" +
				"<br/>" +
				"</span>";
		}
		document.getElementById("messageList").innerHTML += htmlString;
	};

	Messages.prototype.loop = function() {
		messages = this;
		user = this.user;
		if (user.channel !== null) {
		    console.log(user.channel)
			messages.channels.messages(
				user.channel,
				language.languageCode,
				user.messageIndex,
				function(response) {
					user.messageIndex += response.length;
					messages.renderMessages(response);
					setTimeout(function() {
						messages.loop();
					}, 1000);
				}
			);
		} else {
			setTimeout(function() {
				messages.loop();
			}, 1000);
		}
	};

	Messages.prototype.render = function() {
		messages = this;
		$("#send").click(function(event) {
			var message = document.getElementById("messageForm").value;
			if (user !== null) {
				messages.channels.newMessage(message, user.channel, function(response) {
					document.getElementById("messageForm").value = "";
				});
			}
			event.preventDefault();
		});
	};

	exports.Messages = Messages;
})(this);
