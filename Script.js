async function fetchVideo() {
    const input = document.getElementById('videoUrl');
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const downloadButtons = document.getElementById('downloadButtons');
    const thumb = document.getElementById('thumb');
    const videoTitle = document.getElementById('videoTitle');

    if (!input.value.trim()) return alert("Link paste karein!");

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const response = await fetch(`https://api.vkrtool.com/api/v1/get?url=${encodeURIComponent(input.value.trim())}`);
        const data = await response.json();

        if (data.status === "success") {
            thumb.src = data.data.thumbnail;
            videoTitle.innerText = data.data.title;
            
            downloadButtons.innerHTML = '';
            data.data.medias.forEach(item => {
                // Render Backend Proxy taake file download ho
                const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(item.url)}`;
                
                downloadButtons.innerHTML += `
                    <a href="${proxyUrl}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2">
                        <span>DOWNLOAD ${item.quality}</span>
                        <i class="fa-solid fa-circle-down"></i>
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
        alert("Platform not supported or link private.");
    }
}
