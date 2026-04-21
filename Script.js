// Backend ko jaagte rehne ke liye (Wake up call)
window.addEventListener('load', () => {
    fetch("https://fast-download-api.onrender.com").catch(err => console.log("Pinged!"));
});
async function fetchVideo() {
    const input = document.getElementById('videoUrl');
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const downloadButtons = document.getElementById('downloadButtons');
    const thumb = document.getElementById('thumb');
    const videoTitle = document.getElementById('videoTitle');

    if (!input.value.trim()) return alert("Jani, link to dalo!");

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const videoUrl = input.value.trim();
        // Hum direct public API use kar rahe hain jo Render ke bagair link deti hai
        const response = await fetch(`https://api.vkrtool.com/api/v1/get?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (data.status === "success" && data.data.medias) {
            thumb.src = data.data.thumbnail;
            videoTitle.innerText = data.data.title;
            
            downloadButtons.innerHTML = '';
            
            data.data.medias.forEach(item => {
                // AB RENDER NAHI HAI - Seedha direct link use hoga
                // Hum download attribute aur target blank use karenge
                downloadButtons.innerHTML += `
                    <a href="${item.url}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       download="FastVideo_${item.quality}.mp4"
                       class="w-full py-4 bg-[#a3ff1a] text-black rounded-xl font-black text-[12px] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(163,255,26,0.3)]">
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
        alert("Platform not supported or link private. (No Render error anymore!)");
    }
}
