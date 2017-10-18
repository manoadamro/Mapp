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

	describe("logging out", function() {
		it("takes you back to login page after logging out", function() {
			document.getElementById("logout").click()
			expect(document.getElementById("login").innerHTML).toBe("Log In");
		});
	});

	describe("creating a channel", function() {
		it("channel name box is blank after clicking create public channel button", function() {
			document.getElementById("channelForm").value = "Test channel"
			document.getElementById("addPublicChannel").click()
			expect(document.getElementById("channelForm").innerHTML).toBe("");
		});

	});

});
