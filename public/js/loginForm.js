(function(exports) {
	var LoginForm = function(user) {
		this.user = user;
	};

	LoginForm.prototype.login = function() {
		var username = document
			.getElementById("usernameForm")
			.value.replace(" ", "_");
		if (username.length === 0) {
			errors.append("Username can not be empty");
			errors.render();
		} else {
			session.logIn(username, function(response) {
				this.user = new User(username);
				this.user.joinChannel(DEFAULT_CHANNEL_NAME, function(response) {
					renderChannelView();
				});
			});
		}
	};

	LoginForm.prototype.render = function(element) {
		document.getElementById(element).innerHTML = this.formHtml();
		this.setTriggers();
	};

	LoginForm.prototype.setTriggers = function() {
		var form = this;
		$("#login").click(function(event) {
			form.login();
			event.preventDefault();
		});
	};

	LoginForm.prototype.formHtml = function(first_argument) {
		return (
			"<form>" +
			"<div class='name-input'>Input your name:<div>" +
			"<input class=\"usernameForm\" type=\"text\" id=\"usernameForm\"></input>" +
			"<br />" +
			"<button class=\"login btn btn-success\" id=\"login\">Log In</button>" +
			"</form>"
		);
	};

	exports.LoginForm = LoginForm;
})(this);
