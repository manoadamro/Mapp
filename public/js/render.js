
var DEFAULT_CHANNEL_NAME = 'global'
var channels = new Channels();
var user = null;


var renderLogInView = function(){

	session.logOut(null);

	// hide channels button
	
	var loginForm = new LoginForm(user);
	loginForm.render("page");
}

var renderChannelView = function(){

	var pageHtml = language.languageListHtml() + channels.channelHtml();
	document.getElementById("page").innerHTML = pageHtml;

	var messages = new Messages();
	messages.render();

	var sideBar = new SideBar(user, channels, messages);
	sideBar.render();

	// show channels button
		
	$("#logout").click(function(event) {
		session.logOut(function(response){
			user = null;
			renderLogInView();
		})
	});

	messages.loop();
}

renderLogInView();