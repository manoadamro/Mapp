
(function(exports){

	var DEFAULT_LANGUAGE = "en";
	var JOIN_CHANNEL_ROUTE = "/chat/join";
	var LEAVE_CHANNEL_ROUTE = "/chat/leave";

	var User = function(name){
		this.name = name;
		this.channel = null;
		this.messageIndex = -1;
	};

	User.prototype.joinChannel = function(channelName, callback) {
		var params = {
			channel: channelName, 
		};
		var user = this;
		var request = getRequest(JOIN_CHANNEL_ROUTE);
		request.execute(params, function(response){
			user.channel = channelName;
			user.messageIndex = -1;
			if(callback !== undefined && callback !== null) {
				callback(response);
			}
			document.getElementById("currentChannel").innerHTML =
		"You are currently in " + user.channel;
		});
	};

	User.prototype.leaveChannel = function(channelName, callback) {
		var params = {
			channel: channelName
		};
		var user = this;
		var request = getRequest(LEAVE_CHANNEL_ROUTE);
		request.execute(params, function(response){
			user.channel = null;
			if(callback !== undefined && callback !== null) {
				callback(response);
			}
		});
	};

	exports.User = User;

})(this);