
(function(exports){
	
	var ADD_CHANNEL_ROUTE = '/chat/add'
	var REMOVE_CHANNEL_ROUTE = '/chat/delete'
	var UPDATE_CHANNEL_DATA_ROUTE = '/chat/update'
	var CHANNEL_MESSAGES_ROUTE = '/chat/messages'

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
		var channels = this;
		var params = {
			name: name, 
			white_list: whiteList
		}
		var request = getRequest(ADD_CHANNEL_ROUTE);
		request.execute(params, callback);
	};

	Channels.prototype.remove = function(name, callback) {
		var channels = this;
		var params = {
			name: name, 
		}
		var request = getRequest(REMOVE_CHANNEL_ROUTE);
		request.execute(params, callback);
	};

	Channels.prototype.update = function(callback){
		var channels = this;
		var params = {}
		var request = getRequest(UPDATE_CHANNEL_DATA_ROUTE);
		request.execute(params, callback);
	}

	Channels.prototype.messages = function(channelName, callback) {
		var params = {
			channel: channelName
		}
		var request = getRequest(UPDATE_CHANNEL_DATA_ROUTE);
		request.execute(params, callback);
	};

	var channelsObj = new Channels();
	channelsObj.update();

	exports.channels = channelsObj

})(this);