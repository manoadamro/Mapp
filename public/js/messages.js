
(function(exports){

	var Messages = function(user){
		this.user = user;
	}

	Messages.prototype.clear = function() {
		document.getElementById("messageList").innerHTML = '';
	};

	Messages.prototype.renderMessages = function(data){
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

	Messages.prototype.loop = function(){
		messages = this;
		if(user.channel !== null){
			channels.messages(user.channel, language.languageCode, user.messageIndex, function(response){
				user.messageIndex += response.length;
				messages.renderMessages(response);
				setTimeout(function() {
					messages.loop();
				}, 1000);
			})
		} else {
			setTimeout(function() {
				messages.loop();
			}, 1000);	
		}
	}

	Messages.prototype.render = function() {
		$("#send").click(function(event) {
			var message = document.getElementById("messageForm").value;
			if(user !== null){
				channels.newMessage(message, user.channel, function(response){
					document.getElementById("messageForm").value = "";
				})
			}
			event.preventDefault();
		});
	};

	exports.Messages = Messages;

})(this);