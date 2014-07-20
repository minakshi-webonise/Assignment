// function for resetting values in javascript
function resetfunction() {
    		location.reload();
	}
$(document).ready(function(){
	
	$("td").click(function() {   // checking which table cell is clicked
		var value = $('input[name="color"]:checked').val();
		if(value == "green"  ) {   // if radio buttvar canvas = c.getContext("2d");on clicked is green then make that cell color green
			// condition to check whether box is alredy or not
			if(($(this).hasClass("green")) || ($(this).hasClass("red")) || ($(this).hasClass("blue")) )  {   
				alert ("Box is already coloured " );
			}
			else			
				$(this).addClass("green");
		}
		else if (value == "red") {
			if(($(this).hasClass("green")) || ($(this).hasClass("red")) || ($(this).hasClass("blue")) )  {
				alert ("Box is already coloured ");
			}
			else
				$(this).addClass("red");
		
		}
		else if (value == "blue"){
			if(($(this).hasClass("green")) || ($(this).hasClass("red")) || ($(this).hasClass("blue")) )  {
				alert ("Box is already coloured " );
			}
			else {
				$(this).addClass("blue");
			}
		
		}
		else {
			alert ("Please select a color before clicking on boxes !!");    // no radio button selected
		}
	});
	// function to shuffle
	$("#shuffle").click(function() {
		var theRow = $('.table tr:first');
		theRow.remove();
		$('.table').append(theRow);
	});
	// handle hover property
	$( "td" ).hover(
	  function() {
	    $( this ).addClass( "hover" );
	  }, function() {
	    $( this ).removeClass( "hover" );
	  }
	);
	
	
});
		
		


