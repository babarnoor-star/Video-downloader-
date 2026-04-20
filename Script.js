// Pehle line: User ne jo link input box mein dala tha wo uthao
const originalYoutubeUrl = document.querySelector('input').value; // Check karein agar aapka input id alag hai

res.medias.forEach(item => {
    const isHighRes = item.quality.includes('720p') || item.quality.includes('1080p') || item.quality.includes('2160p');
    const btnClass = isHighRes
        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        : "bg-white/5 text-white border border-white/10 hover:bg-white/10";

    // ASLI TABDEELI YAHAN HAI:
    // Hum Render ka link use kar rahe hain aur us mein original URL pass kar rahe hain
    const downloadLink = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(originalYoutubeUrl)}`;

    downloadButtons.innerHTML += `
        <a href="${downloadLink}" target="_blank" class="w-full py-4 ${btnClass} rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2">
            <span>${item.extension.toUpperCase()} ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
