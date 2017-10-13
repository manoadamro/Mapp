var updateLoop = function() {
	setTimeout(function() {
		if (view === "channel") {
			getUpdates();
		}
	}, 1000);
};

clearSession();
setLogInView();
