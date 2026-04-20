// 1. User ne jo link box mein dala hai pehle wo uthao
const originalYoutubeUrl = document.querySelector('.url-input-field').value; // Check karein aapki input class ya id kya hai

res.medias.forEach(item => {
    // 2. Render backend ka URL banao aur aakhir mein asli youtube link joro
    // Direct 'item.url' use NAHI karna, wo ghalat hai
    const finalDownloadUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(originalYoutubeUrl)}`;

    const isHighRes = item.quality.includes('720p') || item.quality.includes('1080p');
    const btnClass = isHighRes ? "bg-cyan-500 text-black" : "bg-white/5 text-white";

    downloadButtons.innerHTML += `
        <a href="${finalDownloadUrl}" target="_blank" class="w-full py-4 ${btnClass} rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
            <span>DOWNLOAD ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
