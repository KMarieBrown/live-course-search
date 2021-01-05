// Add header to website from text file.
var request;
if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', 'data.txt');
request.onreadystatechange = function() {
	if ((request.readyState===4) && (request.status===200)) {
		var modify = document.getElementById('head');
		modify.innerHTML = request.responseText;
	}
}
request.send();

// Add one-time alert to search bar.
$('#search').on("click", function( event ) {
    alert('Please note: Live Course Search ONLY applies to courses with an "IMED" prefix.');
    $( this ).off( event );
});

// Add search function to website.
$('#search').keyup(function () {
    var searchField = $('#search').val();
    var myExp = new RegExp(searchField, "i");
    $.getJSON('data.json', function(data) {
        var output = '<ul class="searchresults">';
        $.each(data, function(key, val) {
            if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1) || (val.shortname.search(myExp) != -1)) {
                output += '<li>';
                output += '<h2>' + val.name + '</h2>';
                output += '<img src="images/'+ val.shortname +'_tn.png" alt="'+val.name +'" />';
                output += '<p>' + val.bio + '</p>';
                output += '</li>';
            };
        });
        output += '</ul>';
        $('#update').html(output);
});
})
