async function analyzeVideo() {
    const urlInput = document.getElementById('urlInput').value;
    const btnText = document.getElementById('btnText');
    const resultDiv = document.getElementById('result');
    const downloadButtons = document.getElementById('downloadButtons');
    const videoTitle = document.getElementById('videoTitle');

    if (!urlInput) {
        alert("Pehle video ka link paste karein!");
        return;
    }

    // Button loading state
    btnText.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Analyzing...';
    btnText.disabled = true;
    resultDiv.classList.add('hidden');
    downloadButtons.innerHTML = '';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
            'x-rapidapi-key': '0733c17d56mshbb4fd563fb1aad0p15cca4jsnb616ddd8461e'
        },
        body: JSON.stringify({ url: urlInput })
    };

    try {
        const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', options);
        const data = await response.json();

        if (data && data.medias) {
            videoTitle.innerText = data.title || "Video Found!";
            resultDiv.classList.remove('hidden');

            // Download buttons generate karna
            data.medias.forEach(media => {
                const btn = document.createElement('a');
                btn.href = media.url;
                btn.target = "_blank";
                btn.className = "w-full py-3 bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 mb-2";
                
                // Quality aur Format dikhana
                btn.innerHTML = `<i class="fa-solid fa-download"></i> Download ${media.quality} (${media.extension})`;
                downloadButtons.appendChild(btn);
            });
        } else {
            alert("Video link nahi mil saka. Link sahi se check karein.");
        }
    } catch (error) {
        console.error(error);
        alert("Server se connect nahi ho paya. Dobara koshish karein.");
    } finally {
        btnText.innerHTML = '<i class="fa-solid fa-bolt"></i> Analyze Link';
        btnText.disabled = false;
    }
}
