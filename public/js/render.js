
var DEFAULT_CHANNEL_NAME = 'global'
var user = null;


var renderLogInView = function(){

	session.logOut(null);

	document.getElementById('menu-toggle').style.display = 'none'

	var loginForm = new LoginForm(user);
	loginForm.render("page");
}

var renderChannelView = function(){

	var channels = new Channels();

	var pageHtml = language.languageListHtml() + channels.channelHtml();
	document.getElementById("page").innerHTML = pageHtml;

	var messages = new Messages(user, channels);
	messages.render();

	var sideBar = new SideBar(user, channels, messages);
	sideBar.render();

	channels.renderWhiteList(user.channel, function(response) {
	console.log(response)
	})

	document.getElementById('menu-toggle').style.display = 'initial'
		
	$("#logout").click(function(event) {
		session.logOut(function(response){
			user = null;
			renderLogInView();
		})
	});

	messages.loop();
}

renderLogInView();