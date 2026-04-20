res.medias.forEach(item => {
    // Agar link lamba wala hai (TikTok/Google), toh item.url use karo
    // Agar link user ka dala hua hai (YouTube), toh wo use karo
    let finalLink = item.url; 
    
    // Render API ka rasta
    const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(finalLink)}`;

    downloadButtons.innerHTML += `
        <a href="${proxyUrl}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
            <span>DOWNLOAD ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
