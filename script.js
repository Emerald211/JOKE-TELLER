const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
   button.disabled = !button.disabled
}
// passing joke to audio
function tellMe(joke) {
    VoiceRSS.speech({
        key: '0d1c1be395d744428dabc01ce1eadbc2',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get joke from api

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
       // Text to speech function
    tellMe(joke);
    // toggle button function
    toggleButton();

    } catch (error) {
        // Catch Error here
        console.log ("whoops", error)
    }
    
}

// getJokes();
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);