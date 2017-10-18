var DEFAULT_CHANNEL_NAME = "global";
var user = null;

var renderLogInView = function() {
	session.logOut(null);

	document.getElementById("menu-toggle").style.display = "none";
	document.getElementById("addUser").style.display = "none";

	var loginForm = new LoginForm(user);
	loginForm.render("page");
};

var renderChannelView = function() {
	var channels = new Channels();

	var pageHtml = language.languageListHtml() + channels.channelHtml();
	document.getElementById("page").innerHTML = pageHtml;

	var messages = new Messages(user, channels);
	messages.render();

	var sideBar = new SideBar(user, channels, messages);
	sideBar.render();

	document.getElementById("menu-toggle").style.display = "initial";

	$("#logout").click(function() {
		session.logOut(function() {
			user = null;
			renderLogInView();
		});
	});
	messages.loop();
};

renderLogInView();
