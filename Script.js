res.medias.forEach(item => {
    const inputUrl = document.querySelector('input').value;

    // Agar YouTube ka link hai toh download button mat dikhao ya alert do
    if (inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be')) {
        downloadButtons.innerHTML = '<p class="text-yellow-400 font-bold p-4 text-center">YouTube is currently under maintenance. Try TikTok, FB or Insta!</p>';
        return;
    }

    // Baqi platforms ke liye Render ka rasta
    const proxyUrl = `https://fast-download-api.onrender.com/download?url=${encodeURIComponent(item.url)}`;

    downloadButtons.innerHTML += `
        <a href="${proxyUrl}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
            <span>DOWNLOAD ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
