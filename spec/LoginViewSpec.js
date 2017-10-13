describe("Login view", function() {
	beforeEach(function() {
		updateLoop = function() {};
		jqueryDone = function(func) {
			func({
				code: 0,
				message: "hello",
				data: { text: "text", author: "" }
			});
		};
		$.post = function() {
			return { done: jqueryDone };
		};
		$.get = function() {
			return { done: jqueryDone };
		};
		setLogInView();
		loginButton = document.getElementById("login");
	});

	describe("Logging in", function() {
		it("Takes you to channel view page", function() {
			document.getElementById("usernameForm").value = "person";
			login.click();
			expect(document.getElementById("messageForm").innerHTML).toBe("");
		});
	});
});
