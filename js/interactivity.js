// Navigation Side Bar 
function openFunction(){
    document.getElementById("menu").style.width="300px";
    document.getElementById("mainbox").style.marginLeft="300px";
    document.getElementById("mainbox").innerHTML="";
    document.getElementById("mainbox").style.cssText= 'border:none; background-color:none;';
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
function createTrackItem(index,name,duration){
  var trackItem = document.createElement('div');
  trackItem.setAttribute("class", "playlist-track-ctn");
  trackItem.setAttribute("id", "ptc-"+index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist-ctn").appendChild(trackItem);

  var playBtnItem = document.createElement('div');
  playBtnItem.setAttribute("class", "playlist-btn-play");
  playBtnItem.setAttribute("id", "pbp-"+index);
  document.querySelector("#ptc-"+index).appendChild(playBtnItem);

  var btnImg = document.createElement('i');
  btnImg.setAttribute("class", "fas fa-play");
  btnImg.setAttribute("height", "40");
  btnImg.setAttribute("width", "40");
  btnImg.setAttribute("id", "p-img-"+index);
  document.querySelector("#pbp-"+index).appendChild(btnImg);

  var trackInfoItem = document.createElement('div');
  trackInfoItem.setAttribute("class", "playlist-info-track");
  trackInfoItem.innerHTML = name
  document.querySelector("#ptc-"+index).appendChild(trackInfoItem);

  var trackDurationItem = document.createElement('div');
  trackDurationItem.setAttribute("class", "playlist-duration");
  trackDurationItem.innerHTML = duration
  document.querySelector("#ptc-"+index).appendChild(trackDurationItem);
}

var listAudio = [
  {
    name:"Zico - Any Song",
    file:"./songs/ZICO - ANY SONG.mp3",
    duration:"04:26"
  },
  {
    name:"Heize ft. Dean & DJ Friz - And July",
    file:"./songs/Heize-And-July-Feat.-DEAN,DJFriz.mp4",
    duration:"03:48"
  },
  {
    name:"Kim Jongkook & Lee Suhyun - Addiction",
    file:"./songs/Addiction-Kim-Jongkook- &-Lee-Suhyun.mp3",
    duration:"03:09"
  },

  {
    name:"Twice - I Can't Stop Me",
    file:"./songs/TWICE-I-CAN'T-STOP-ME.mp4",
    duration:"03:26"
  },

  {
    name:"Winner - Everyday",
    file:"./songs/Everyday-Winner.mp3",
    duration:"03:34"
  },

  {
    name:"Strong Woman Do Bong Soon Ost - Heartbeat",
    file:"./songs/Heartbeat.mp3",
    duration:"03:52"
  },
  {
    name:"Hong Jinyoung - Good Bye",
    file:"./songs/HONG-JINYOUNG-GOOD-BYE.mp4",
    duration:"03:24"
  },
  {
    name:"Exo - Call Me Baby",
    file:"./songs/EXO - Call Me Baby.mp3",
    duration:"03:31"
  },
]

for (var i = 0; i < listAudio.length; i++) {
    createTrackItem(i,listAudio[i].name,listAudio[i].duration);
}
var indexAudio = 0;

function loadNewTrack(index){
  var player = document.querySelector('#source-audio')
  player.src = listAudio[index].file
  document.querySelector('.title').innerHTML = listAudio[index].name
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load()
  this.toggleAudio()
  this.updateStylePlaylist(this.indexAudio,index)
  this.indexAudio = index;
}

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++){
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++){
    if(playListItems[i] == event.target){
      var clickedIndex = event.target.getAttribute("data-index")
      if (clickedIndex == this.indexAudio ) { // alert('Same audio');
          this.toggleAudio()
      }else{
          loadNewTrack(clickedIndex);
      }
    }
  }
}

document.querySelector('#source-audio').src = listAudio[indexAudio].file
document.querySelector('.title').innerHTML = listAudio[indexAudio].name


var currentAudio = document.getElementById("myAudio");

currentAudio.load()

currentAudio.onloadedmetadata = function() {
      document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration)
}.bind(this);

var interval1;

function toggleAudio() {

  if (this.currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-'+this.indexAudio).classList.add("active-track");
    this.playToPause(this.indexAudio)
    this.currentAudio.play();
  }else{
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}

var timer = document.getElementsByClassName('timer')[0]

var barProgress = document.getElementById("myBar");


var width = 0;

function onTimeUpdate() {
  var t = this.currentAudio.currentTime
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  if (this.currentAudio.ended) {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    if (this.indexAudio < listAudio.length-1) {
        var index = parseInt(this.indexAudio)+1
        this.loadNewTrack(index)
    }
  }
}


function setBarProgress(){
  var progress = (this.currentAudio.currentTime/this.currentAudio.duration)*100;
  document.getElementById("myBar").style.width = progress + "%";
}


function getMinutes(t){
  var min = parseInt(parseInt(t)/60);
  var sec = parseInt(t%60);
  if (sec < 10) {
    sec = "0"+sec
  }
  if (min < 10) {
    min = "0"+min
  }
  return min+":"+sec
}

var progressbar = document.querySelector('#myProgress')
progressbar.addEventListener("click", seek.bind(this));


function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent*100 + "%";
}

function forward(){
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5
  this.setBarProgress();
}

function rewind(){
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5
  this.setBarProgress();
}


function next(){
  if (this.indexAudio <listAudio.length-1) {
      var oldIndex = this.indexAudio
      this.indexAudio++;
      updateStylePlaylist(oldIndex,this.indexAudio)
      this.loadNewTrack(this.indexAudio);
  }
}

function previous(){
  if (this.indexAudio>0) {
      var oldIndex = this.indexAudio
      this.indexAudio--;
      updateStylePlaylist(oldIndex,this.indexAudio)
      this.loadNewTrack(this.indexAudio);
  }
}

function updateStylePlaylist(oldIndex,newIndex){
  document.querySelector('#ptc-'+oldIndex).classList.remove("active-track");
  this.pauseToPlay(oldIndex);
  document.querySelector('#ptc-'+newIndex).classList.add("active-track");
  this.playToPause(newIndex)
}

function playToPause(index){
  var ele = document.querySelector('#p-img-'+index)
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

function pauseToPlay(index){
  var ele = document.querySelector('#p-img-'+index)
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}


function toggleMute(){
  var btnMute = document.querySelector('#toggleMute');
  var volUp = document.querySelector('#icon-vol-up');
  var volMute = document.querySelector('#icon-vol-mute');
  if (this.currentAudio.muted == false) {
     this.currentAudio.muted = true
     volUp.style.display = "none"
     volMute.style.display = "block"
  }else{
    this.currentAudio.muted = false
    volMute.style.display = "none"
    volUp.style.display = "block"
  }
}
// function audioPlayer(){
//     var currentSong = 0;
//     $("#audioPlayer")[0].src = $("#playlist li a")[0];
//     $("#audioPlayer")[0].play();
//     $("#playlist li a").click(function(e){
//        e.preventDefault(); 
//        $("#audioPlayer")[0].src = this;
//        $("#audioPlayer")[0].play();
//        $("#playlist li").removeClass("current-song");
//         currentSong = $(this).parent().index();
//         $(this).parent().addClass("current-song");
//     });
    
//     $("#audioPlayer")[0].addEventListener("ended", function(){
//        currentSong++;
//         if(currentSong == $("#playlist li a").length)
//             currentSong = 0;
//         $("#playlist li").removeClass("current-song");
//         $("#playlist li:eq("+currentSong+")").addClass("current-song");
//         $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
//         $("#audioPlayer")[0].play();
//     });
// }
//         // loads the audio player
//         audioPlayer();




        
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

  // PAGE TOP
    // element.addEventListener(event, function, useCapture);
    // element.addEventListener("click", function(){ alert("Hello World!"); });
    
    // create a variable
    const pagetop = document.querySelector("#page-top");
    // Attaches an function to an event on a specific element
    window.addEventListener("scroll", scrollFunction);
    // define the function you will use when activating the event
    function scrollFunction() {
      if (window.scrollY > 250) {
        pagetop.style.display = "inline-block";
      }
      else {
        pagetop.style.display = "none";
      }
    }
// if the page in the window is (pageYoffset is distance from the top and compatible with all browsers, not like scrollY)

