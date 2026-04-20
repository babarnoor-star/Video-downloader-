// Function to fetch video details
async function fetchVideo() {
    const input = document.getElementById('videoUrl');
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const downloadButtons = document.getElementById('downloadButtons');
    const thumb = document.getElementById('thumb');
    const videoTitle = document.getElementById('videoTitle');

    // Remove old error alert if any
    const oldAlert = document.getElementById('error-alert');
    if(oldAlert) oldAlert.remove();

    if (!input.value.trim()) return alert("Link missing, Pro!");

    // Hide old results, show loading
    resultArea.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const videoUrl = input.value.trim();
        const response = await fetch(`https://api.vkrtool.com/api/v1/get?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (data.status === "success" && data.data && data.data.medias) {
            
            // Set Thumbnail and Title
            thumb.src = data.data.thumbnail || 'https://via.placeholder.com/640x360';
            videoTitle.innerText = data.data.title || "Your Pro Video is Ready";
            
            // Generate Buttons
            downloadButtons.innerHTML = '';
            
            data.data.medias.forEach(item => {
                // Ensure the proxy link is formatted correctly for Render to force download
                const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(item.url)}`;
                
                downloadButtons.innerHTML += `
                    <a href="${proxyUrl}" target="_blank" class="flex items-center justify-between bg-neon-solid text-slate-950 px-8 py-4 rounded-xl font-black transition-all transform hover:-translate-y-1 text-sm uppercase neon-glow">
                        <span>${item.quality} (${item.extension.toUpperCase()})</span>
                        <div class="bg-slate-950/10 p-2 rounded-full"><i class="fa-solid fa-download"></i></div>
                    </a>
                `;
            });

            // Loading finished, show result
            loading.classList.add('hidden');
            resultArea.classList.remove('hidden');
            
            // Scroll to the results card automatically
            resultArea.scrollIntoView({ behavior: 'smooth' });

        } else {
            throw new Error("Link not extractable");
        }
    } catch (e) {
        loading.classList.add('hidden');
        
        // Show a custom error alert at the top
        const main = document.querySelector('main');
        main.insertAdjacentHTML('afterbegin', `
            <div id="error-alert" class="max-w-xl mx-auto mb-6 bg-red-900/50 border border-red-800 text-red-200 p-4 rounded-xl font-semibold flex gap-2 items-center">
                <i class="fa-solid fa-circle-xmark"></i>
                Platform not supported or link is private. (Note: YouTube is unavailable).
            </div>
        `);
    }
}
