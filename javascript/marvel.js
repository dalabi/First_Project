// var audio = new Audio('javascript/xmen.mp3');
//  audio.play();
//  audio.loop= true;

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
  validateInput()
  getMarvelResponse();
  getYouTube();
  _cb_findItemsByKeywords()
  
  $('#superHero').val('');

  dbRef.push(superHero);
  
  console.log(superHero);
  
  return false;
});

var PRIV_KEY = "df4fb8031dbc7cf2f465816737e0ea13379128b0"
var PUBLIC_KEY = "a9a21fdf8a29de1099f5d2548b48a5d7";


function getMarvelResponse() {
  var characterName  = $('#superHero').val();
                                                                                
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var limit ="10"
    var url = "http://gateway.marvel.com:80/v1/public/characters?name="+ characterName +"&limit="+ limit +"&apikey="+PUBLIC_KEY+"&ts="+ts+"&hash="+hash;

    console.log(url);

    $.ajax({
      url: url,
      dataType: "jsonp"
      method: 'GET'
    })
    .done(function(data) {
      var description = data.data.results[0].description

      $('<p>').html('Description: ' + description);
    
     
       console.log(description);
       console.log(data.data.results[0].description);
       console.log(data);

       var p = $('<p>');
       p.addClass('description');
       p.html(description);
       $('.content').html(p);

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


function getYouTube() {
  
  var characterName  = $('#superHero').val();
  var youtubeApi = "AIzaSyBMbfmuvlnHD76RoFoCgRrzoTR8yLU_QS8";
  var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ characterName + "originstory&key=" + youtubeApi;
  console.log(youtubeUrl);
  
  $.ajax({
      url: youtubeUrl,
      method: 'GET'
    })
    .done(function(data) {
      console.log(data);

      $('.videoTitle').html('<h2 class="mainTitles">Origin Story</h2>')
   
      var videoId1 = data.items[0].id.videoId
      var videoTitle1 = data.items[0].snippet.title
      console.log(videoId1)
      console.log(videoTitle1)
      var videoFrame = "<iframe width='320' height='193' src='https://www.youtube.com/embed/"+videoId1+"' frameborder='0' type='text/html'></iframe>"
      var final="<div id='title'>"+videoTitle1+"</div><div class='frame'>"+videoFrame+"</div>";
      // videoTitle.append(videoFrame);
      $('.contentVideos').html(final);

      var videoId2 = data.items[1].id.videoId
      var videoTitle2 = data.items[1].snippet.title
      console.log(videoId2)
      console.log(videoTitle2)
      var videoFrame = "<iframe width='320' height='193' src='https://www.youtube.com/embed/"+videoId2+"' frameborder='0' type='text/html'></iframe>"
      var final="<div id='title'>"+videoTitle2+"</div><div class='frame'>"+videoFrame+"</div>";
      $('.contentVideos2').html(final);

      var videoId3 = data.items[2].id.videoId
      var videoTitle3 = data.items[2].snippet.title
      console.log(videoId3)
      console.log(videoTitle3)
      var videoFrame = "<iframe width='320' height='193' src='https://www.youtube.com/embed/"+videoId3+"' frameborder='0' type='text/html'></iframe>"
      var final="<div id='title'>"+videoTitle3+"</div><div class='frame'>"+videoFrame+"</div>";
      $('.contentVideos3').html(final);

      var videoId4 = data.items[3].id.videoId
      var videoTitle4 = data.items[3].snippet.title
      console.log(videoId4)
      console.log(videoTitle4)
      var videoFrame = "<iframe width='320' height='193' src='https://www.youtube.com/embed/"+videoId4+"' frameborder='0' type='text/html'></iframe>"
      var final="<div id='title'>"+videoTitle4+"</div><div class='frame'>"+videoFrame+"</div>";
      $('.contentVideos4').html(final);
    })
    // .fail(function(err){
    //   // the error codes are listed on the dev site
    //  console.log(err);
    // });
};

function _cb_findItemsByKeywords(){
  var characterName  = $('#superHero').val();
  var search = characterName + " marvel collectibles"
  var ebayApi = "ElsaJose-Marvelme-PRD-599eca255-9a8b3c16"
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME="+ebayApi+"&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+search+"&paginationInput.entriesPerPage=8";
    $.ajax({
        url: url,
        dataType: "jsonp",
      })
      .done(function(ebayData){
            var items = ebayData.findItemsByKeywordsResponse[0].searchResult[0].item || [];
            var html = [];
            $('.memorabiliaTitle').html('<h2 class="mainTitles">Memorabilia</h2>')
            $(html).push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');

            for (var i = 0; i < items.length; ++i)   {
                var item     = items[i];
                var title    = item.title;
                var pic      = item.galleryURL;
                var viewitem = item.viewItemURL;

                if (null != title && null != viewitem) {
                    html.push('<tr><td>' + '<img class="ebayImg" src="' + pic + '" border="0">' + '</td>' +
                    '<td><a class="ebayTitle" href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
                }
            }
            $(".ebayContent1").html(html);
        })
  }


function validateInput (){
    var characterName  = $('#superHero').val();
    if (characterName === ""){
      var errorCode = $('.error').html("<h4 class='errorText'>*Please Add a Valid Name</h4>")
      $(".fullContent").hide(); 
      
    }
    else{
      $(".fullContent").show();
      $('.error').empty();

    }
}

