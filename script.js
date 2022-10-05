const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

const songs=[
    {
        name: 'jacinto-1',
        displayName: "1:Electric",
        artist: 'Arunachalam',

    },
    {
        name: 'jacinto-2',
        displayName: "2:Electri",
        artist: 'Arunachalam',
    },

    {
        name: 'jacinto-3',
        displayName: "3:Elecri",
        artist: 'Arunachalam',
    },
    {
        name: 'jacinto-4',
        displayName: "4:Eletri",
        artist: 'Arunachalam',
    }
]

//Check if playing or not
let isPlaying=false;

//play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
//pause

function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();

}

//play or pause event listener

playBtn.addEventListener('click',()=>(isPlaying ? pauseSong():playSong()));


//update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;

}
//current Song
let songIndex=0;

//Next song
function nextSong(){
    songIndex++;
    if(songIndex >=songs.length){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//prev song

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//on load-Select first song

loadSong(songs[songIndex]);

//Event listeners for prev and next
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

//update progress bar and time
function updateProgressBar(e){
    if(isPlaying){
       const { duration, currentTime }=e.srcElement; //e=event
       
     //update progress bar width
     const progressPercent= (currentTime /duration)*100;
     progress.style.width=`${progressPercent}%`;
     //calculate display for duration
     const durationMinutes=Math.floor(duration/60);
     
     let durationSeconds=Math.floor(duration % 60);
     if(durationSeconds<10){
        durationSeconds=`0${durationSeconds}`;
     }
    
     
     //delay switching duration to avoid NaN
    if(durationSeconds)
    {
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }
      //calculate display for current
      const currentMinutes=Math.floor(currentTime/60);
     
      let currentSeconds=Math.floor(currentTime % 60);
      if(currentSeconds<10){
         currentSeconds=`0${currentSeconds}`;
      }
      currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}


//progress bar event listener
music.addEventListener('timeupdate',updateProgressBar);

//setProgressBar to jump at particular position
function setProgressBar(e){ //e here is event
const width=this.clientWidth; //width of music not equal to duration
const clickX=e.offsetX; //where you clicked on X axis
const { duration }=music; // {} destructured constant
music.currentTime=(clickX/width)*duration;
}

//Event listener to jump at particular position
progressContainer.addEventListener('click',setProgressBar);

//event listener if song ends to change it
music.addEventListener('ended',nextSong);