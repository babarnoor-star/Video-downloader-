async function fetchVideo() {
    const input = document.getElementById('videoUrl');
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const downloadButtons = document.getElementById('downloadButtons');
    const thumb = document.getElementById('thumb');
    const videoTitle = document.getElementById('videoTitle');

    if (!input.value.trim()) return alert("Link missing!");

    // Hide old results, show loading
    resultArea.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.vkrtool.com/api/v1/get?url=${encodeURIComponent(input.value.trim())}`);
        const data = await response.json();

        if (data.status === "success") {
            thumb.src = data.data.thumbnail || 'https://via.placeholder.com/640x360';
            videoTitle.innerText = data.data.title || "Your Video is Ready";
            
            downloadButtons.innerHTML = '';
            data.data.medias.forEach(item => {
                // Hamesha Render backend use karein taake stream/download start ho jaye
                const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(item.url)}`;
                
                downloadButtons.innerHTML += `
                    <a href="${proxyUrl}" target="_blank" class="flex items-center justify-between bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1">
                        <span>${item.quality} (${item.extension.toUpperCase()})</span>
                        <i class="fa-solid fa-download"></i>
                    </a>
                `;
            });

            loading.classList.add('hidden');
            resultArea.classList.remove('hidden');
        } else {
            throw new Error();
        }
    } catch (e) {
        loading.classList.add('hidden');
        alert("Platform not supported or Invalid link. (Note: YouTube is currently unavailable)");
    }
}
