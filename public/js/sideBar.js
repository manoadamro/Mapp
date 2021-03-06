(function(exports) {
	var SideBar = function(user, channels, messages) {
		this.user = user;
		this.channels = channels;
		this.messages = messages;
	};

	var addUserToWhiteList = function(name) {
		var params = {
			username: name,
			channel: this.user.channel
		};
		var request = postRequest("/chat/add_to_whitelist");
		request.execute(params, null);
	};

	var getOnlineUsers = function() {
		string = "";
		var request = getRequest("/session/user_list");
		request.execute({}, function(response) {
			for (i = 0; i < response.length; i++) {
				user = response[i];
				string +=
					"<a href=javascript:addUserToWhiteList(\"" +
					user +
					"\")>" +
					user +
					"</a>";
			}
			document.getElementById("onlineUsers").innerHTML = string;
		});
	};

	var renderWhiteList = function(channels, user) {
		channels.getWhiteList(user.channel, function(response) {
			userlist = document.getElementById("userList");
			userList.innerHTML = "";
			if (response[0] != "*") {
				for (i = 0; i < response.length; i++) {
					userList.innerHTML += "<li>" + response[i] + "</li>";
				}
				document.getElementById("addUser").style.display = "initial";
				getOnlineUsers();
			} else {
				userList.innerHTML += "Public Channel";
				document.getElementById("addUser").style.display = "none";
			}
		});
	};

	var switchChannel = function(channelName) {
		var user = this.user;
		var messages = this.messages;
		if (channelName !== user.channel) {
			user.leaveChannel(user.channel, function() {
				messages.loadMessagesStr();
				user.joinChannel(channelName, function() {
					renderWhiteList(messages.channels, user);
				});
			});
		}
	};

	SideBar.prototype.renderChannelList = function(channelList) {
		var sideBarChans = document.getElementById("sidebar-channels");
		sideBarChans.innerHTML = "";
		for (i = 0; i < channelList.length; i++) {
			sideBarChans.innerHTML +=
				"<li>" +
				"<a href=javascript:switchChannel(\"" +
				channelList[i] +
				"\") >" +
				channelList[i] +
				"</a>" +
				"</li>";
		}
	};

	SideBar.prototype.setTriggers = function() {
		var sideBar = this;
		$("#menu-toggle").click(function(event) {
			sideBar.channels.update(function(response) {
				sideBar.renderChannelList(response);
				$("#wrapper").toggleClass("toggled");
			});
			event.preventDefault();
		});

		$("#addPublicChannel").click(function(event) {
			var channelName = document
				.getElementById("channelForm")
				.value.replace(new RegExp(" ", "g"), "_");
			if (channelName.length !== 0) {
				sideBar.channels.add(channelName, "*", function(response) {
					if (user !== null) {
						sideBar.channels.update(function(response) {
							sideBar.renderChannelList(response);
						});
					}
				});
				document.getElementById("channelForm").value = "";
			}
			event.preventDefault();
		});

		$("#addPrivateChannel").click(function(event) {
			var channelName = document
				.getElementById("channelForm")
				.value.replace(new RegExp(" ", "g"), "_");
			if (channelName.length !== 0) {
				sideBar.channels.add(channelName, user.name, function(response) {
					if (user !== null) {
						sideBar.channels.update(function(response) {
							sideBar.renderChannelList(response);
						});
					}
				});
				document.getElementById("channelForm").value = "";
			}
			event.preventDefault();
		});

		$("#deleteChannel").click(function(event) {
			if (user !== null) {
				var channelName = user.channel;
				sideBar.channels.remove(channelName, function() {
					user.join(DEFAULT_CHANNEL_NAME, function() {
						renderChannelView(user.channel);
					});
				});
			}
			event.preventDefault();
		});
	};

	SideBar.prototype.render = function() {
		this.setTriggers();
	};

	exports.SideBar = SideBar;
	exports.switchChannel = switchChannel;
	exports.addUserToWhiteList = addUserToWhiteList;
})(this);
