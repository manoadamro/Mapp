describe("Login view", function() {
	beforeEach(function() {
		jQueryStub();
		renderLogInView();
		loginButton = document.getElementById("login");
	});

	describe("Logging in", function() {

		it("Throws an error if you don't input a username", function() {
			document.getElementById("usernameForm").value = "";
			login.click();
			expect(document.getElementById("error-messages").innerHTML).toBe("<p><span>Username can not be empty</span><br></p>");
		});

		it("Takes you to channel view page", function() {
			document.getElementById("usernameForm").value = "person";
			login.click();
			expect(document.getElementById("messageForm").innerHTML).toBe("");
		});
	});
});
