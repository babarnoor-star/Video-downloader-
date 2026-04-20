// 1. Ye function user ke browser se Cobalt ko direct call karega
async function getFastLink(videoUrl) {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: videoUrl,
                vQuality: "720",
                filenamePattern: "basic"
            })
        });
        const data = await response.json();
        return data.url || data.picker?.[0]?.url;
    } catch (e) {
        return null;
    }
}

// 2. Button banane wala hissa (res.medias loop)
downloadButtons.innerHTML = ''; // Pehle purane buttons saaf karo

// Loop shuru hone se pehle hi Cobalt se direct link mang lo
const inputUrl = document.querySelector('input').value; // Check karo aapki input class/id kya hai
const cobaltDirectLink = await getFastLink(inputUrl);

res.medias.forEach(item => {
    // Agar Cobalt se link mil gaya toh wo use karo, warna purana method
    const finalUrl = cobaltDirectLink || item.url;

    downloadButtons.innerHTML += `
        <a href="${finalUrl}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
            <span>DOWNLOAD ${item.quality}</span>
            <i class="fa-solid fa-circle-down"></i>
        </a>
    `;
});
