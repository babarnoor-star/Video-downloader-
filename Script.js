const resultArea = document.getElementById('resultArea');
const loading = document.getElementById('loading');
const downloadButtons = document.getElementById('downloadButtons');
const thumb = document.getElementById('thumb');
const videoTitle = document.getElementById('videoTitle');

async function fetchVideo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    
    if (!videoUrl) {
        alert("Pehle link to paste karo jani!");
        return;
    }

    // Pehle purana result chupa do aur loading dikhao
    resultArea.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        // Hum aik free public API use karenge link extract karne ke liye (YouTube ke ilawa)
        const response = await fetch(`https://api.vkrtool.com/api/v1/get?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (data.status === "success" && data.data) {
            const videoData = data.data;

            // Thumbnail aur Title set karo
            thumb.src = videoData.thumbnail || 'https://via.placeholder.com/300x200?text=No+Preview';
            videoTitle.innerText = videoData.title || "Video Download Ready";

            // Download Buttons banao
            downloadButtons.innerHTML = '';
            
            videoData.medias.forEach(item => {
                // Render wala proxy link
                const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(item.url)}`;
                
                downloadButtons.innerHTML += `
                    <a href="${proxyUrl}" target="_blank" class="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all">
                        <span>DOWNLOAD ${item.quality} (${item.extension})</span>
                        <i class="fa-solid fa-circle-down"></i>
                    </a>
                `;
            });

            // Loading khatam aur Result dikhao
            loading.classList.add('hidden');
            resultArea.classList.remove('hidden');

        } else {
            throw new Error("Invalid Link or Platform");
        }

    } catch (error) {
        loading.classList.add('hidden');
        alert("Error: Ya to link galat hai ya ye platform abhi support nahi hai (YouTube filhal band hai).");
        console.error(error);
    }
}
