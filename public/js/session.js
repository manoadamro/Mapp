
(function(exports){

	var LOG_IN_ROUTE = '/session/login';
	var LOG_OUT_ROUTE = '/session/logout';
	
	var Session = function(){
		this.username = null;
	}

	Session.prototype.logIn = function(username, callback) {

		if(this.username === null){
			this.username = username;
			var params = {
				username: username
			}
			var request = postRequest(LOG_IN_ROUTE);
			request.execute(params, callback);
		} else {
			session = this;
			this.logOut(function(response){
				session.login(username, callback)
			});
		}
	};

	Session.prototype.logOut = function(callback) {
		var request = postRequest(LOG_OUT_ROUTE);
		request.execute({}, callback);
	};

	exports.session = new Session();

})(this);