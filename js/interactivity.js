// Navigation Side Bar 
function openFunction(){
    document.getElementById("menu").style.width="300px";
    document.getElementById("mainbox").style.marginLeft="300px";
    document.getElementById("mainbox").innerHTML="";
    // document.getElementById("main_content").style.cssText = 'opacity:0.2;';
   }
  function closeFunction(){
   document.getElementById("menu").style.width="0px";
   document.getElementById("mainbox").style.marginLeft="0px";
   document.getElementById("mainbox").innerHTML="&#9776;";
   document.getElementById("main_content").style.cssText = 'opacity:1.0;';
  }

// Caption Box
  function showProperties(msg) {
    document.getElementById('caption_box').innerHTML = msg.alt;     // 'msg.alt' means to display the alt text of the parameter named 'msg'. In the HTML the parameter is defined as 'this', meaning this element.
}

// Audio Player
function audioPlayer(){
    var currentSong = 0;
    $("#audioPlayer")[0].src = $("#playlist li a")[0];
    $("#audioPlayer")[0].play();
    $("#playlist li a").click(function(e){
       e.preventDefault(); 
       $("#audioPlayer")[0].src = this;
       $("#audioPlayer")[0].play();
       $("#playlist li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });
    
    $("#audioPlayer")[0].addEventListener("ended", function(){
       currentSong++;
        if(currentSong == $("#playlist li a").length)
            currentSong = 0;
        $("#playlist li").removeClass("current-song");
        $("#playlist li:eq("+currentSong+")").addClass("current-song");
        $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
        $("#audioPlayer")[0].play();
    });
}
        // loads the audio player
        audioPlayer();




        
// Read More Button

function ldFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("moreTxt");
    var btnText = document.getElementById("read-more-btn");
    dots.style.display = "inline";
    btnText.innerHTML = "Read More"; 
    moreText.style.display = "none";
}

function rdFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("moreTxt");
    var btnText = document.getElementById("read-more-btn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read More"; 
      moreText.style.display = "none";
    } 
    else {
      dots.style.display = "none";
      btnText.innerHTML = "Read Less"; 
      moreText.style.display = "inline";
    }
  }
