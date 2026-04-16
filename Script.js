async function analyzeVideo() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const btnText = document.getElementById('btnText');
    const resultDiv = document.getElementById('result');
    const downloadButtons = document.getElementById('downloadButtons');

    if (!urlInput) {
        alert("Please paste a link first!");
        return;
    }

    // Button status change
    btnText.innerHTML = '<span>Searching...</span>';
    btnText.style.opacity = "0.5";
    btnText.style.pointerEvents = "none";

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0733c17d56mshbb4fd563fb1aad0p15cca4jsnb616ddd8461e',
            'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com'
        }
    };

    try {
        // Humne URL ko encode kiya hai taake error na aaye
        const apiUrl = `https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink?url=${encodeURIComponent(urlInput)}`;
        
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (data && data.medias) {
            resultDiv.classList.remove('hidden');
            downloadButtons.innerHTML = ''; // Clear old buttons

            data.medias.forEach(media => {
                const a = document.createElement('a');
                a.href = media.url;
                a.target = "_blank";
                a.className = "w-full py-3 mb-2 bg-cyan-600 text-white rounded-lg font-bold text-center block hover:bg-cyan-500 transition-all";
                a.innerText = `Download ${media.quality} (${media.extension})`;
                downloadButtons.appendChild(a);
            });
        } else {
            alert("Video not found. Try a different link.");
        }
    } catch (error) {
        console.error(error);
        alert("API Error! Please check your RapidAPI dashboard.");
    } finally {
        btnText.innerHTML = '<i class="fa-solid fa-bolt"></i> Analyze Link';
        btnText.style.opacity = "1";
        btnText.style.pointerEvents = "auto";
    }
}            videoTitle.innerText = data.title || "Video Found!";
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
