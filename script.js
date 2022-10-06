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
        name: 'A thousand years',
        displayName: "A Thousand Years",
        artist: 'Christina Perri',

    },
    {
        name: 'Jaane wo kaise',
        displayName: "Jaane Woh Kaise Log The",
        artist: 'Hemant Kumar',
    },

    {
        name: 'Apocalypse',
        displayName: "Apocalypse-CAS",
        artist: 'Greg Gonzalez',
    },
    {
        name: 'Dreamgirl',
        displayName: "Dreamgirl",
        artist: 'Teenage Blues',
    },
    {
        name: 'My heart',
        displayName: "My Heart Will Go On",
        artist: 'Celine Dion',
    },
    {
        name: 'Everybody',
        displayName: "Everybody Knows",
        artist: 'Sigrid',
    },
    {
        name: 'Beyond love',
        displayName: "Beyond Love",
        artist: 'Beach House',
    },
    {
        name: 'Eleanor',
        displayName: "Eleanor And Park",
        artist: 'Girl In Red , Beabadoobee',
    },
    {
        name: 'Never fall in love',
        displayName: "Until I found You",
        artist: 'Stephen Sanchez , Em Beihold',
    },
    {
        name: 'Walk',
        displayName: "I Walk This Earth All By Myself",
        artist: 'Ekkstacy',
    },
    {
        name: 'Yuguure',
        displayName: "Yuugure No Tori",
        artist: 'Shinsei Kamattechan',
    },
    {
        name: 'Something',
        displayName: "Something In The Way",
        artist: 'Nirvana-Kurt Cobain',
    },
    {
        name: 'Amplifier',
        displayName: "Amplifier",
        artist: 'Imran Khan',
    },
    {
        name: 'Tennu',
        displayName: "Tennu Le",
        artist: 'Ntedit , Omer Inayat',
    },
    {
        name: 'Lost in paradise',
        displayName: "Lost In Paradise",
        artist: 'ALI feat. AKLO',
    },
   
    {
        name: 'Wellerman',
        displayName: "Wellerman",
        artist: 'Nathan Evans',
    },
    {
        name: 'Rock',
        displayName: "We Will Rock You",
        artist: 'Queen',
    },
    {
        name: 'Rasputin',
        displayName: "Rasputin",
        artist: 'Boney M.',
    },
    {
        name: 'My mother',
        displayName: "My Mother Told Me",
        artist: 'Perly I Lotry',
    },
    {
        name: 'My brother',
        displayName: "My Brother Come Join Me",
        artist: 'Kentaro Miura',
    },
    {
        name: 'Rashmirathi',
        displayName: "Rashmirathi",
        artist: 'Ramdhari Singh Dinkar - Ashutosh Rana',
    },
    {
        name: 'Thumak',
        displayName: "Thumak Chalat Ramchandra",
        artist: 'Maithili Thakur',
    },
    {
        name: 'Awadh mein raam',
        displayName: "Awadh Mein Raam Aaye Hain",
        artist: 'Jaya Kishori',
    },
    {
        name: 'Bade badai',
        displayName: "Bade Badai Na Kare",
        artist: 'Rahim- Ankhiyo Ke Jharokon Se',
    },
    {
        name: 'Sanchi kahein',
        displayName: "Sanchi Kahein Tohre Aawan Se Bhauji",
        artist: 'Jaspal Singh',
    },
    {
        name: 'Kaune disha mein',
        displayName: "Kaune Disha Me Le Ke Chala Re",
        artist: 'Hemlata , Jaspal Singh',
    },
    {
        name: 'Jug jug',
        displayName: "Jug Jug Jiya Tu Lalanwa",
        artist: 'Lokgeet',
    },
    {
        name: 'Teri ungli',
        displayName: "Teri Ungli Pakad Ke chala",
        artist: 'Jyotsna Hardikar , Udit Narayan',
    },
    {
        name: 'Hoshwalon',
        displayName: "Hoshwalon Ko Khabar Kya",
        artist: 'Jagjeet Singh',
    },
    {
        name: 'Tauba',
        displayName: "Tauba Tumhare Ye Ishaare",
        artist: 'Abhijeet Bhattacharya',
    },
    {
        name: 'Baalam',
        displayName: "Balam Thanedar(Gypsy)",
        artist: 'GD Kaur',
    },
    {
        name: 'Sajaniya',
        displayName: "Sajaniya",
        artist: 'Ali Zafar',
    },

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