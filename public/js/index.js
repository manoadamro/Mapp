var updateLoop = function() {
	setTimeout(function() {
		if (view === "channel") {
			getUpdates();
			updateLoop();
		}
	}, 1000);
};

clearSession();
setLogInView();
