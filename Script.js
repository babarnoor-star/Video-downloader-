// 1. Pehle ye function upar add karein
async function getDirectLink(url) {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                vQuality: "720"
            })
        });
        const data = await response.json();
        return data.url; // Ye direct download link dega
    } catch (e) {
        console.error("Link error", e);
        return null;
    }
}

// 2. Jahan aap buttons banate hain (forEach loop mein)
res.medias.forEach(async (item) => {
    // Render wala link use NAHI karna, Direct Cobalt se mangna hai
    const originalUrl = document.querySelector('.url-input-field').value;
    const finalDownloadUrl = await getDirectLink(originalUrl);

    if (finalDownloadUrl) {
        downloadButtons.innerHTML += `
            <a href="${finalDownloadUrl}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
                <span>DOWNLOAD ${item.quality}</span>
                <i class="fa-solid fa-circle-down"></i>
            </a>
        `;
    }
});
