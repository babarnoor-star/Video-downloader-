// 1. Ye naya function Script.js mein sab se upar ya kahin bhi add karo
async function fetchDirectDownloadLink(userUrl) {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: userUrl,
                vQuality: "720",
                filenamePattern: "basic"
            })
        });
        const data = await response.json();
        return data.url; // Cobalt humein direct link dega
    } catch (e) {
        console.error("Cobalt Error:", e);
        return null;
    }
}

// 2. Apne loop ke andar isey aise use karo
res.medias.forEach(async (item) => {
    const inputUrl = document.querySelector('.url-input-field').value; // Aapki input class
    
    // Render wala link use NAHI karna, direct Cobalt se link mangna hai
    const finalLink = await fetchDirectDownloadLink(inputUrl);

    if (finalLink) {
        downloadButtons.innerHTML += `
            <a href="${finalLink}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
                <span>DOWNLOAD ${item.quality}</span>
                <i class="fa-solid fa-circle-down"></i>
            </a>
        `;
    }
});
