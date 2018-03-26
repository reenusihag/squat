pd=document.getElementById('p');
$('document').ready(function(){
$("#key").keyup(function()
{
	var k = $('#key').val();
	if( k == "" )
	{
		pd.innerHTML = "";
   		$("p").css("padding", "0px");
	}


		else
		{
		$.ajax({
		
		 		type: "POST",
		 		url: "/create",
		 		data: { key: k},
		 		success:function(data)
		 		{
		 			if(data=="true")
		        		{
							pd.innerHTML = "Not Available";
							$("#form").css("border", "2px solid #dc3545");
							$("p").css("padding", "7px");
							$("p").css("margin-left", "15%");
							$("p").css("background-color", "#dc3545");
				}
					else if(data=="false")
						{
							pd.innerHTML = "Available";
							$("p").css("padding", "7px");
							$("p").css("margin-left", "15%");
							$("p").css("background-color", "#28a800");
						  	$("#form").css("border", "2px solid #28a800");
				}

				else
				console.log('dikkat');
		},
		error: function(data)
		{
			console.log('Custom URL Check Request Failed! ');				
		}
	})
	}
});

	


function makekey(){
	var text = "";
	var combination = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i < 5; i++)
    	text += combination.charAt(Math.floor(Math.random() * combination.length));
	return text;
}
	$('#shortUrlCreatorForm').submit(function(e)
	{
		e.preventDefault();
		var u = $('#url').val();
		var k = $('#key').val();
		if(k == "")
		{
			k = makekey();
		}
		
         var v = "https://yourls1.herokuapp.com/";
	v += k;
	document.getElementById("created").style.display = "block";
  	document.getElementById('createdurl').value= v;
	$.ajax({
		type:"POST",
		url:"/short",
		data: { url  : u, key: k },
		success: function(data)
		{

			document.getElementById("created").style.display = "block";
			document.getElementById('createdurl').value= v;
		},
		error: function(data)
		{
			console.log('Custom URL Generate Request Failed!');				
		}
	})
	
})

})






















