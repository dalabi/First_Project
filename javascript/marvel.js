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
					
					var superHero = $('#superHero').val();
					getYouTube();
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
	var limit = "5"
  	var url = 'http://gateway.marvel.com:80/v1/public/characters?name='+ characterName +"&limit="+ limit +"&apikey="+PUBLIC_KEY+"&ts="+ts+"&hash="+hash;

  	console.log(url);

  	$.ajax({
  		url: url,
  		method: 'GET'
    })
    .done(function(data) {
      // sort of a long dump you will need to sort throughurl
    	console.log(data);
    })
    .fail(function(err){
      // the error codes are listed on the dev site
    	console.log(err);
    });
};


function getYouTube() {
	
	var characterName  = $('#superHero').val();
	var youtubeApi = "AIzaSyBMbfmuvlnHD76RoFoCgRrzoTR8yLU_QS8";
	var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ characterName +"&key=" + youtubeApi;
	console.log(youtubeUrl);
	
$.ajax({
  		url: youtubeUrl,
  		method: 'GET'
    })
    .done(function(data) {
      // sort of a long dump you will need to sort throughurl
    	console.log(data);


    	var videoId = data.items[0].id.videoId
    	var videoTitle = data.items[0].snippet.title
    	console.log(videoId)
    	console.log(videoTitle)
    	var videoFrame = "<iframe width='640' height='385' src='http://www.youtube.com/embed/"+videoId+"' frameborder='0' type='text/html'></iframe>"
    	var final="<div id='title'>"+videoTitle+"</div><div>"+videoFrame+"</div>";
    	// videoTitle.append(videoFrame);
    	$('.embedVideos').html(final);
    })
    // .fail(function(err){
    //   // the error codes are listed on the dev site
    // 	console.log(err);
    // });

return false
};