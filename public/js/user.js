
(function(exports){

	var DEFAULT_LANGUAGE = 'en';
	var JOIN_CHANNEL_ROUTE = '/chat/join';
	var LEAVE_CHANNEL_ROUTE = '/chat/leave';

	var User = function(name){
		this.name = name;
		this.channel = null
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

	exports.User = User;

})(this);