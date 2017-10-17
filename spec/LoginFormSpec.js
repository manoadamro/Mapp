describe("Login form", function() {
	beforeEach(function() {
		user = new User('person')
    loginform = new LoginForm(user)
    renderLogInView();
	});

	afterEach(function() {

	});

	describe("login", function() {
		it("Adds a new user", function() {
      loginform.login();
      expect(user).not.toBe(null);
		});
  });
});
