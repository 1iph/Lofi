const image = document.getElementById('cover'),
      title = document.getElementById('music-title'),
      artist = document.getElementById('music-artist'),
      currentTimeEl = document.getElementById('current-time'),
      durationEl = document.getElementById('duration'),
      progress = document.getElementById('progress'),
      playerProgress = document.getElementById('player-progress'),
      prevBtn = document.getElementById('prev'),
      nextBtn = document.getElementById('next'),
      playBtn = document.getElementById('play'),
      background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    { path: 'assets/1.mp3', displayName: 'Gift', cover: 'Images/gift.jpg', artist: 'Massobeats' },
    { path: 'assets/2.mp3', displayName: 'Taro swirl', cover: 'Images/taro.jpg', artist: 'Massobeats' },
    { path: 'assets/3.mp3', displayName: 'Lavender', cover: 'Images/lavender.jpg', artist: 'Massobeats' },
    { path: 'assets/4.mp3', displayName: 'Warmth', cover: 'Images/warmth.jpg', artist: 'Massobeats' },
    { path: 'assets/5.mp3', displayName: 'Honey Jam', cover: 'Images/honey.jpg', artist: 'Massobeats' },
    { path: 'assets/6.mp3', displayName: 'Jasmine Tea', cover: 'Images/jasmine.jpg', artist: 'Massobeats' },
    { path: 'assets/7.mp3', displayName: 'Floral', cover: 'Images/floral.jpg', artist: 'Massobeats' },
    { path: 'assets/8.mp3', displayName: 'Midnight', cover: 'Images/midnight.jpg', artist: 'Massobeats' },
    { path: 'assets/9.mp3', displayName: 'Lucid', cover: 'Images/lucid.jpg', artist: 'Massobeats' },
    { path: 'assets/10.mp3', displayName: 'Lush', cover: 'Images/lush.jpg', artist: 'Massobeats' },
    { path: 'assets/11.mp3', displayName: 'Noon', cover: 'Images/noon.jpg', artist: 'Massobeats' },
    { path: 'assets/12.mp3', displayName: 'Drizzle', cover: 'Images/drizzle.jpg', artist: 'Massobeats' },
    { path: 'assets/14.mp3', displayName: 'Lotus', cover: 'Images/lotus.jpg', artist: 'Massobeats' },
    { path: 'assets/15.mp3', displayName: 'Hillside', cover: 'Images/hillside.jpg', artist: 'Massobeats' },
    { path: 'assets/16.mp3', displayName: 'Rose water', cover: 'Images/rose.jpg', artist: 'Massobeats' },
    { path: 'assets/17.mp3', displayName: 'Duck in a box', cover: 'Images/duck.jpg', artist: 'Jobii' },
    { path: 'assets/18.mp3', displayName: 'Sakura', cover: 'Images/sakura.avif', artist: 'Young Hype' },
    { path: 'assets/19.mp3', displayName: 'Moon', cover: 'Images/moon.jpg', artist: 'Lee' },

];

let musicIndex = 0;
let isPlaying = false;
function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${Math.floor(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${Math.floor(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);