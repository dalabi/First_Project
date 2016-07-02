var audio = new Audio('javascript/xmen.mp3');
	audio.play();
	audio.loop= true;

var myIndex = 0;
carousel();

					function carousel() {
					    var i;
					    var x = document.getElementsByClassName("mySlides");
					    for (i = 0; i < x.length; i++) {
					       x[i].style.display = "none";
					    }
					    myIndex++;
					    if (myIndex > x.length) {myIndex = 1}
					    x[myIndex-1].style.display = "block";
					    setTimeout(carousel, 2000); // Change image every 2 seconds
					}
		 // Initialize Firebase
		  var config = {
		    apiKey: "AIzaSyCR4RmxFKnO64EcHoSLhEj0IwpTKBRTBPM",
		    authDomain: "feisty-wall-135723.firebaseapp.com",
		    databaseURL: "https://feisty-wall-135723.firebaseio.com",
		    storageBucket: "feisty-wall-135723.appspot.com",
		  };

		  	firebase.initializeApp(config);
		  	//this has to go after the copied stuff from firebase
		  	var dbRef = firebase.database().ref();

				$('#super').on('submit', function () {
					//try to empty Super NAME 
					// $('.thumbnail').empty();
					var superHero = $('#superHero').val();
					getMarvelResponse();
					$('#superHero').val('');

					dbRef.push(superHero);
					
					console.log(superHero);
					
					return false;
				});


// $('#super').on('submit', function(){
// 	getMarvelResponse();
// 	return false;
// })



var PRIV_KEY = "df4fb8031dbc7cf2f465816737e0ea13379128b0"
var PUBLIC_KEY = "a9a21fdf8a29de1099f5d2548b48a5d7";


function getMarvelResponse() {
	var characterName  = $('#superHero').val();
                                                                                
 	var ts = new Date().getTime();
 	var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
	var limit ="10"
  	var url = 'http://gateway.marvel.com:80/v1/public/characters?name='+ characterName +"&limit="+ limit +"&apikey="+PUBLIC_KEY+"&ts="+ts+"&hash="+hash;

  	console.log(url);

  	$.ajax({
  		url: url,
  		method: 'GET'
    })
    .done(function(data) {
      // sort of a long dump you will need to sort throughurl
      var description = data.data.results[0].description

      $('<p>').html('Description: ' + description);
		
		 
    	 console.log(description);
    	 console.log(data.data.results[0].description);
    	 console.log(data);

    	 var p = $('<p>');
    	 p.addClass('description');
    	 p.html(description);
    	 $('.content').prepend(p);

    	 // $('p').addclass("description");	

    	 //TESTING FOR IMAGE 
    	 var urlImage = data.data.results[0].thumbnail.path;
    	 var extensionImage = data.data.results[0].thumbnail.extension;
    	 var backImage = urlImage + "." + extensionImage;

    	 //converted image to a complete link

    	 console.log(urlImage);
    	 console.log(extensionImage);
    	 console.log(backImage);
    	 // var completeImage = (urlImage + ".jpg");
    	 // $('.content').empty();
    	 $('.thumbnail').empty();
    	 //appends the url to the image
    	 $('.thumbnail').append('<img src="'+ backImage +'">');

    })
    .fail(function(err){
      // the error codes are listed on the dev site
    	console.log(err);
    });
};

