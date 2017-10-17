var jQueryStub = function() {
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
};
