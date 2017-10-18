describe("Channel view", function() {
	beforeEach(function() {
		jQueryStub();
	});

	describe("Sending a message", function() {
		it("The text box clears after sending", function() {
			document.getElementById("messageForm").innerHTML = "text";
			send.click();
			expect(document.getElementById("messageForm").innerHTML).toEqual("");
		});

		it("Target language updates when you set language", function() {
			document.getElementById("language-af").click()
			expect(document.getElementById("targetLanguageLabel").innerHTML).toEqual(
				"Target Language: <strong>Afrikaans</strong>"
			);
		});
	});

	describe("is able to log out", function() {
		it("Takes you bakc to login page when logging out", function() {
			document.getElementById("logout").click()
			expect(document.getElementById("login").innerHTML).toBe("Log In");
		});
	});
});
