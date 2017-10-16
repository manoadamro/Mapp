
var DEFAULT_CHANNEL_NAME = 'global'
var user = null;


var logOut = function(){

}

var updateChannelList = function() {
	channels.update(function(response){
		renderChannelList(response);
	})
}

var updateChannelMessages = function(){
	if(user !== null) {
		var channelName = user.channel;
		channels.messages(channelName, function(response){
			renderMessages(response)
		});
	}
}

var addPublicChannel = function(channelName){
	channels.add(channelName, ['*'], function(response){
		if(user !== null) {
			user.join(channelName, function(response){
				renderChannelView(user.channel);
			})
			updateChannelList();
		}
	})
}

var addPrivateChannel = function(channelName, whiteList){
	if(!(user.name in whiteList)) {
		whiteList.push(user.name);
	}
	channels.add(channelName, whiteList, function(response){
		if(user !== null) {
			user.join(channelName, function(response){
				renderChannelView(user.channel);
			})
			updateChannelList();
		}
	})
}

var removeChannel = function(){
	if(user !== null) {
		var channelName = user.channel;
		channels.remove(channelName, function(response){
			user.join(DEFAULT_CHANNEL_NAME, function(response){
				renderChannelView(user.channel);	
			})
		})
	}	
}