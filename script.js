// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Song list data with correct durations (in seconds)
let songs = [
    {songName: "Gulabi Ankhiyan, Jubin Nautiyal, Sakshi Holkar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: 170}, // 2:50
    {songName: "Jeena Haraam, Tanishk Bagchi, Vishal Mishra, Shilpa Rao", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: 210}, // 3:30
    {songName: "Tiranga, B Praak", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: 240}, // 4:00
    {songName: "Akhiyaan Gulaab, Mitraz", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: 200}, // 3:20
    {songName: "Tum Se, Raghav Chaitanya, Sachin Jigar, and Varun Jain", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: 185}, // 3:05
    {songName: "Hanuman Karenge Kalyan, Hansraj Raghuwanshi", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: 230}, // 3:50
    {songName: "Kamsin Kali, Tony Kakkar, Neha Kakkar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: 220}, // 3:40
    {songName: "Ghagra, Romy, Srushti Tawade", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: 210}, // 3:30
    {songName: "Maroon Color Sadiya, Om Jha", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: 200} // 3:20
];

// Update song items with cover images and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    // Format and set the timestamp for each song
    let minutes = Math.floor(songs[i].duration / 60);
    let seconds = songs[i].duration % 60;
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds
    }

    element.getElementsByClassName("timestamp")[0].innerText = `${minutes}:${seconds}`;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update progress bar as audio plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Update audio current time based on progress bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle play button click for each song item
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // Reset play icons
        songIndex = index; // Set the song index based on the clicked item
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; // Set the audio source
        masterSongName.innerText = songs[songIndex].songName; // Update the song name
        audioElement.currentTime = 0; // Reset audio time to start
        audioElement.play(); // Play the song
        gif.style.opacity = 1; // Show gif (indicating the song is playing)
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); // Update the master play button
    });
});

// Handle next button click (play next song)
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Go to the first song
    } else {
        songIndex++; // Go to the next song
    }
    audioElement.src = songs[songIndex].filePath; // Set the audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name
    audioElement.currentTime = 0; // Reset the song time
    audioElement.play(); // Play the song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Handle previous button click (play previous song)
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Go to the last song
    } else {
        songIndex--; // Go to the previous song
    }
    audioElement.src = songs[songIndex].filePath; // Set the audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name
    audioElement.currentTime = 0; // Reset the song time
    audioElement.play(); // Play the song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
