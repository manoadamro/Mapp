$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});


var renderChannels = function(channels) {
    document.getElementById('sidebar-channels').innerHTML = ''
   for(i=0; i<channels.length; i++) {
    document.getElementById('sidebar-channels').innerHTML += '<li><a href=' +
        'javascript:joinChannel("' +
        channels[i] + '")>' +
        channels[i] +
        '</a></li>'
   }
}