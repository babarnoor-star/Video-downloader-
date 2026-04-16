async function analyzeVideo() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const btnText = document.getElementById('btnText');
    const resultDiv = document.getElementById('result');
    const downloadButtons = document.getElementById('downloadButtons');
    const videoTitle = document.getElementById('videoTitle');

    if (!urlInput) {
        alert("Pehle video ka link paste karein!");
        return;
    }

    // Button loading state
    btnText.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Fetching...';
    btnText.disabled = true;
    btnText.style.opacity = "0.7";

    // API Request setup
    const details = {
        'url': urlInput
    };

    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
            'x-rapidapi-key': '0733c17d56mshbb4fd563fb1aad0p15cca4jsnb616ddd8461e'
        },
        body: formBody
    };

    try {
        const response = await fetch('https://snap-video3.p.rapidapi.com/download', options);
        const data = await response.json();

        if (data && data.data) {
            resultDiv.classList.remove('hidden');
            downloadButtons.innerHTML = ''; 
            videoTitle.innerText = "Video Found!";

            // Is API mein aksar 'data' array ya object mein links hote hain
            // Hum directly HD aur Watermark wale links check karte hain
            const links = data.data;

            if (links.video || links.hd_video) {
                const videoUrl = links.hd_video || links.video;
                const btn = document.createElement('a');
                btn.href = videoUrl;
                btn.target = "_blank";
                btn.className = "w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-black text-center block shadow-lg hover:scale-105 transition-all uppercase tracking-widest text-xs mb-3";
                btn.innerHTML = '<i class="fa-solid fa-download mr-2"></i> Download HD Video';
                downloadButtons.appendChild(btn);
            }

            if (links.music || links.audio) {
                const audioUrl = links.music || links.audio;
                const btn = document.createElement('a');
                btn.href = audioUrl;
                btn.target = "_blank";
                btn.className = "w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black text-center block hover:bg-white/10 transition-all uppercase tracking-widest text-xs";
                btn.innerHTML = '<i class="fa-solid fa-music mr-2"></i> Download Audio MP3';
                downloadButtons.appendChild(btn);
            }

            resultDiv.scrollIntoView({ behavior: 'smooth' });

        } else {
            alert("Error: Video links not found for this URL.");
        }
    } catch (error) {
        console.error(error);
        alert("API Connection Error. Please try again.");
    } finally {
        btnText.innerHTML = '<i class="fa-solid fa-bolt"></i> Analyze Link';
        btnText.disabled = false;
        btnText.style.opacity = "1";
    }
}
