// 1. Pehle user ka dala hua asli link pakro
const originalInputUrl = document.querySelector('input').value; // Check karna agar aapki input ID kuch aur hai

downloadButtons.innerHTML = ''; // Pehle purane buttons saaf karo

res.medias.forEach(item => {
    // 2. Logic: Agar YouTube hai toh original link bhejo, warna item.url (processed link)
    let finalLink;
    if (originalInputUrl.includes('youtube.com') || originalInputUrl.includes('youtu.be')) {
        finalLink = originalInputUrl; // Asli YouTube link
    } else {
        finalLink = item.url; // TikTok/FB ka processed link
    }

    // 3. Render API Proxy URL
    const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(finalLink)}`;

    const isHighRes = item.quality.includes('720p') || item.quality.includes('1080p');
    const btnClass = isHighRes 
        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
        : "bg-white/5 text-white border border-white/10";

    downloadButtons.innerHTML += `
        <a href="${proxyUrl}" target="_blank" class="w-full py-4 ${btnClass} rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
            <span>DOWNLOAD ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
