
(function(exports){

	var SideBar = function(user, channels, messages){
		this.user = user;
		this.channels = channels;
		this.messages = messages;
	}

	var switchChannel = function(channelName) {
		user = this.user;
		messages = this.messages
		if (channelName !== user.channel) {
			user.leaveChannel(user.channel, function(response){
				messages.clear();
				user.joinChannel(channelName, null)
			})
		}
	}

	SideBar.prototype.renderChannelList = function(channelList){
		var sideBarChans = document.getElementById('sidebar-channels')
	    sideBarChans.innerHTML = ''
	    for(i=0; i<channelList.length; i++) {
		    sideBarChans.innerHTML += '<li>' +
		    '<a href=javascript:switchChannel("' + channelList[i] + '") >' +
		    channelList[i] + '</a>' +
		    '</li>'
	    }
	}

	SideBar.prototype.setTriggers = function() {

		var sideBar = this;
		$("#menu-toggle").click(function(event) {
			sideBar.channels.update(function(response){
				sideBar.renderChannelList(response);
				$("#wrapper").toggleClass("toggled");
			})
			event.preventDefault();
		});

		$("#addPublicChannel").click(function(event) {
			var channelName = document.getElementById("channelForm").value;
			sideBar.channels.add(channelName, '*', function(response){
				if(user !== null) {
					user.joinChannel(channelName, function(response){
						renderChannelView(user.channel);
					})
					sideBar.channels.update(function(response){
						sideBar.renderChannelList(response);
					})
				}
			})
			document.getElementById("channelForm").value = "";
			event.preventDefault();
		});

		$("#addPrivateChannel").click(function(event) {
			var channelName = document.getElementById("channelForm").value;
			sideBar.channels.add(channelName, user.name, function(response){
				if(user !== null) {
					user.joinChannel(channelName, function(response){
						renderChannelView(user.channel);
					})
					sideBar.channels.update(function(response){
						sideBar.renderChannelList(response);
					})			
				}
			})
			document.getElementById("channelForm").value = "";
			event.preventDefault();
		});

		$("#deleteChannel").click(function(event) {
			if(user !== null) {
				var channelName = user.channel;
				sideBar.channels.remove(channelName, function(response){
					user.join(DEFAULT_CHANNEL_NAME, function(response){
						renderChannelView(user.channel);	
					})
				})
			}	
			event.preventDefault();
		});
	};

	SideBar.prototype.render = function() {
		this.setTriggers();
	};

	exports.SideBar = SideBar;
	exports.switchChannel = switchChannel;
})(this);