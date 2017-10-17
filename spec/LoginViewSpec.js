describe("Login view", function() {
	beforeEach(function() {
		jQueryStub();
		renderLogInView();
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
