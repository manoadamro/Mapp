describe("Channel view", function() {
	beforeEach(function() {
		jQueryStub();
	});

	afterEach(function() {
		document.getElementById("messageForm").innerHTML = "";
		document.getElementById("messageList").innerHTML = "";
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
});
