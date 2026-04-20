// 1. Cobalt API se direct link nikalne ka function
async function getDownloadLink(url) {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                vQuality: "720",
                filenamePattern: "basic"
            })
        });
        const data = await response.json();
        return data.url || data.picker?.[0]?.url;
    } catch (e) {
        console.error("Error fetching link:", e);
        return null;
    }
}

// 2. Button Generate karne ka function
async function handleDownload() {
    const inputUrl = document.querySelector('input').value; // Check karo input ki ID/Class sahi hai
    if(!inputUrl) return alert("Link to daalo jani!");

    downloadButtons.innerHTML = '<p class="text-white">Searching link... Please wait...</p>';

    const finalLink = await getDownloadLink(inputUrl);

    if (finalLink) {
        downloadButtons.innerHTML = `
            <a href="${finalLink}" target="_blank" class="w-full py-4 bg-cyan-500 text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2">
                <span>DOWNLOAD NOW</span>
                <i class="fa-solid fa-circle-down"></i>
            </a>
        `;
    } else {
        downloadButtons.innerHTML = '<p class="text-red-500">YouTube is too strong. Use a PC to get cookies.</p>';
    }
}
