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
const previousButton = document.querySelector('.prev')
const nextButton = document.querySelector('.forward')
const backGround = document.querySelector('body');
const songBackground = document.querySelector('img')
const progressBarr = document.querySelector('.progressBarr')
const circle = document.querySelector('.circle')
const timeBar = document.querySelector('.timeBar')
const songTitle = document.querySelector('.title');
let isPlaying = false;
let index = 0;
let currentSong = songs[index];
let audio = new Audio(`sounds/${currentSong.songName}.mp3`);


playButton.addEventListener('click', () => {

    if (isPlaying) {
        console.log('playing')
        isPlaying = false
        playButton.innerHTML = "<i class='fa fa-play'></i></i>"
        console.log('hi');
        pauseSong(audio)
    }

    else {
        console.log('pause')
        isPlaying = true
        playButton.innerHTML = '<i class="fa fa-pause"></i>'
        playSong(audio);
    }

})


function changeSongImage() {
    songBackground.src = `songImage/${songs[index].backgroundImage}`;
    backGround.style.backgroundImage = `url('songImage/${songs[index].backgroundImage}')`;
}
function showTitle(){
    songTitle.innerHTML = `${songs[index].songO} by ${songs[index].singer}`
}
function playSong(audio) {
    audio.play();
    
    timeBar.addEventListener('click' , setProgress) 
    audio.addEventListener('timeupdate', updateProgress)
    showTitle()
    audio.onended = () => {
        if (index === songs.length-1) {
            index = 0;
            audio = new Audio(`sounds/${songs[index].songName}.mp3`)
            changeSongImage();
            playSong(audio)
        }
        else{
            audio = new Audio(`sounds/${songs[++index].songName}.mp3`)
            playSong(audio)
            changeSongImage()

        }
    }
    // timeBar.addEventListener('click' , setProgress)
    return index;


}

function pauseSong(audio) {
    audio.pause();
}

previousButton.addEventListener('click', () => {
    pauseSong(audio)
    if (index === 0) {

        index = songs.length - 1;
        playButton.innerHTML = '<i class="fa fa-pause"></i>'
        console.log(songs[index].songName)
        audio = new Audio(`sounds/${songs[index].songName}.mp3`);
        changeSongImage()
        playSong(audio)

    }
    else {

        --index;
        console.log(index)
        playButton.innerHTML = '<i class="fa fa-pause"></i>'
        console.log(songs[index].songName)
        audio = new Audio(`sounds/${songs[index].songName}.mp3`);
        changeSongImage()
        playSong(audio)

    }
})

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration
    audio.currentTime = ( clickX / width ) * duration;
}

nextButton.addEventListener('click', () => {
    pauseSong(audio)
    if (index === songs.length - 1) {
        index = 0;
        isPlaying = true
        playButton.innerHTML = '<i class="fa fa-pause"></i>'
        console.log(songs[index].songName)
        audio = new Audio(`sounds/${songs[index].songName}.mp3`);
        changeSongImage()
        playSong(audio)
    }
    else {
        ++index;
        console.log(index)
        isPlaying = true
        playButtonchange();
        console.log(songs[index].songName)
        audio = new Audio(`sounds/${songs[index].songName}.mp3`);
        changeSongImage();
        playSong(audio)
    }
})

function playButtonchange() {
    playButton.innerHTML = '<i class="fa fa-pause"></i>'
}

function updateProgress(event) {
    const { duration, currentTime } = event.srcElement
    
    const progressPresent = (currentTime / duration ) * 100;
    progressBarr.style.width = `${progressPresent}%`;
    circle.style.left = `${progressPresent}%`
}

audio.addEventListener('timeupdate', updateProgress)


