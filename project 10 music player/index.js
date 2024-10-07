const songs = [
    {
        songName: 'do-din',
        singer: 'Darshan Raval',
        backgroundImage: 'doDin.jpg',
        songO : 'DO DIN'
    },
    {
        songName: 'no-lie',
        singer: 'Dua Lipa & Sean Paul',
        backgroundImage: 'noLie.jpg',
        songO : 'NO LIE'
    },
    {
        songName: 'run-for-your-life',
        singer: 'The Seige',
        backgroundImage: 'runForYourLife.jpeg',
        songO : 'RUN FOR YOUR LIFE'
    },
    {
        songName: 'see-you-again',
        singer: 'Wiz Khalifa & Charlie puth',
        backgroundImage: 'seeYouAgain.jpg',
        songO : 'SEE YOU AGAIN'
    },
    {
        songName: 'shape-of-you',
        singer: 'ED Sheeran',
        backgroundImage: 'shapeOfYou.jpeg',
        songO : 'SHAPE OF YOU'
    },
    {
        songName: 'smack-that',
        singer: 'Akon',
        backgroundImage: 'smackThat.jpeg',
        songO : 'SMACK THAT'
    }];


const playButton = document.querySelector('.play');
const progressBar = document.querySelector('.progressBarr');
const timeBar = document.querySelector('.timeBar');
const nextBtn = document.querySelector('.forward');
const prevBtn = document.querySelector('.prev')
const body = document.querySelector('body')
const songBackground = document.querySelector('img')
const tittle = document.querySelector('.title')
let isPlaying = false;
let index = 0
let audio = new Audio(`sounds/${songs[index].songName}.mp3`); 




timeBar.addEventListener('click' , (e)=>{
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( clickX / 360 ) * duration;
})
playButton.addEventListener('click' , ()=>{
    if(isPlaying){
        isPlaying = false;
        console.log('pause')
        playButton.innerHTML ="<i class='fa fa-play'></i>";
        pauseSound(audio)
        
    }
    else{
        isPlaying = true ;
        console.log('playing');
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
        playSound(audio)
        
    }
    
    

})

function playSound(audio){
    changeSongImage()
    audio.play()
    audio.onended= () =>{
        
        index;
        nextSong();
    }
}

function pauseSound(audio){
    audio.pause();
}






function nextSong() {
    changeSongImage()
    isPlaying = true;
    pauseSound(audio)
    playButton.innerHTML = '<i class="fa fa-pause"></i>';
    ++index;
    if(index === songs.length  ){
        index = 0;
    }
    audio = newAudio(index);
    playSound(audio)
    audio.addEventListener('timeupdate' , (event) => {
        const {duration , currentTime} = event.srcElement;
        const barProgress =(  currentTime / duration ) * 100;
        progressBar.style.width = `${barProgress}%`;
    })

}

function previousSong(){
    changeSongImage()
    playButton.innerHTML = '<i class="fa fa-pause"></i>';
    pauseSound(audio)
    --index;
    if(index === -1  ){
        index = songs.length - 1;
    }
    audio = newAudio(index);
    playSound(audio)
    audio.addEventListener('timeupdate' , (event) => {
        const {duration , currentTime} = event.srcElement;
        const barProgress =(  currentTime / duration ) * 100;
        progressBar.style.width = `${barProgress}%`;
    })

}


function newAudio(index){
    const song = new Audio(`sounds/${songs[index].songName}.mp3`)
    return song;
}

nextBtn.addEventListener('click' , ()=> {
    nextSong()

})

prevBtn.addEventListener('click' , previousSong)

audio.addEventListener('timeupdate' , (event) => {
    const {duration , currentTime} = event.srcElement;
    const barProgress =(  currentTime / duration ) * 100;
    progressBar.style.width = `${barProgress}%`;
})

function changeSongImage() {
    songBackground.src = `songImage/${songs[index].backgroundImage}`;
    body.style.backgroundImage = `url('songImage/${songs[index].backgroundImage}')`;
    tittle.innerHTML = `${songs[index].songO} by ${songs[index].singer}`;
}