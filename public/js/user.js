
(function(exports){

	var DEFAULT_LANGUAGE = 'en';
	var JOIN_CHANNEL_ROUTE = '/chat/join';
	var LEAVE_CHANNEL_ROUTE = '/chat/leave';

	var User = function(name){
		this.name = name;
		this.channel = null
		this.language = 'en'
		this.messageIndex = -1
	}

	User.prototype.joinChannel = function(channelName, callback) {
		if (this.channel === null) {
			var params = {
				channel: channelName, 
			}
			var user = this;
			var request = getRequest(JOIN_CHANNEL_ROUTE);
			request.execute(params, function(response){
				user.channel = channelName;
				this.messageIndex = -1;
				callback();
			});
		} else {
			var user = this;
			this.leaveChannel(function(response){
				user.joinChannel(channelName, callback)
			})
		}
	};

	User.prototype.leaveChannel = function(callback) {
		var user = this;
		var params = {}
		var request = getRequest(LEAVE_CHANNEL_ROUTE);
		request.execute(params, callback);
	};

	User.prototype.setLanguage = function(language) {
		this.language = language
	}

	exports.User = User;

})(this);