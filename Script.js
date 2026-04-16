async function analyzeVideo() {
    console.log("Button Clicked!"); // Check karne ke liye ke button kaam kar raha hai
    
    const urlInput = document.getElementById('urlInput').value;
    const btnText = document.getElementById('btnText');
    const resultDiv = document.getElementById('result');
    const downloadButtons = document.getElementById('downloadButtons');
    const videoTitle = document.getElementById('videoTitle');

    if (!urlInput) {
        alert("Pehle video ka link paste karein!");
        return;
    }

    // Loading State Start
    btnText.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Analyzing...';
    btnText.style.pointerEvents = "none";
    btnText.style.opacity = "0.7";

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
        console.log("Fetching API...");
        const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', options);
        const data = await response.json();
        console.log("API Data Received:", data);

        if (data && data.medias && data.medias.length > 0) {
            videoTitle.innerText = data.title || "Video Found!";
            downloadButtons.innerHTML = ''; // Purane buttons clear karna
            resultDiv.classList.remove('hidden');

            data.medias.forEach(media => {
                const btn = document.createElement('a');
                btn.href = media.url;
                btn.target = "_blank";
                btn.className = "w-full py-3 bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 mb-2 no-underline text-white";
                btn.innerHTML = `<i class="fa-solid fa-download"></i> Download ${media.quality || ''} (${media.extension || 'Link'})`;
                downloadButtons.appendChild(btn);
            });
            
            // Result section ko scroll karke dikhana
            resultDiv.scrollIntoView({ behavior: 'smooth' });

        } else {
            alert("No download links found. Please try another link.");
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("Server error! Please check your internet or API subscription.");
    } finally {
        // Reset Button
        btnText.innerHTML = '<i class="fa-solid fa-bolt"></i> Start Analyzing';
        btnText.style.pointerEvents = "auto";
        btnText.style.opacity = "1";
    }
}
