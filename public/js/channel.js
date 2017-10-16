
(function(exports){

	var ADD_CHANNEL_ROUTE = '/chat/add'
	var REMOVE_CHANNEL_ROUTE = '/chat/delete'
	var CHANNEL_DATA_ROUTE = '/chat/update'
	var ADD_MESSAGE_ROUTE = '/chat/message'
	var CHANNEL_MESSAGES_ROUTE = '/chat/update'

	var Channels = function(){
		this.channelList = {};
	}

	Channels.prototype.get = function(name) {
		if(name in this.channelList) {
			return this.channelList[key];
		} else {
			return null;
		}
	};

	Channels.prototype.add = function(name, whiteList, callback) {
		var params = {
			channel: name, 
			white_list: whiteList
		}
		var request = getRequest(ADD_CHANNEL_ROUTE);
		request.execute(params, callback);
	};

	Channels.prototype.remove = function(name, callback) {
		var params = {
			channel: name, 
		}
		var request = getRequest(REMOVE_CHANNEL_ROUTE);
		request.execute(params, callback);
	};

	Channels.prototype.update = function(callback){
		var params = {}
		var request = getRequest(CHANNEL_DATA_ROUTE);
		request.execute(params, callback);
	}

	Channels.prototype.newMessage = function(message, channel, callback) {
		var params = {
			message: message,
			channel: channel
		}
		var request = getRequest(ADD_MESSAGE_ROUTE);
		request.execute(params, callback);
	}

	Channels.prototype.messages = function(channelName, targetLanguage, index, callback) {
		var params = {
			channel: channelName,
			language: targetLanguage,
			index: index
		}
		var request = getRequest(CHANNEL_MESSAGES_ROUTE);
		request.execute(params, callback);
	};

	exports.channels = new Channels();

})(this);


