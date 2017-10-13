$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

var createChannel = function() {
    document.getElementById("sidebar").innerHTML = '';
}
