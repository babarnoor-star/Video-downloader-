async function analyzeVideo() {
    const url = document.getElementById('urlInput').value;
    const btn = document.getElementById('btnText');
    const resultDiv = document.getElementById('result');

    if (!url) {
        alert("Pehle link toh paste karein!");
        return;
    }

    btn.innerText = "Searching...";
    btn.disabled = true;

    try {
        // Yeh aik real API call ka sample hai
        // Abhi sirf test ke liye 2 second ka wait karega
        setTimeout(() => {
            btn.innerText = "Analyze Video";
            btn.disabled = false;
            resultDiv.classList.remove('hidden');
            document.getElementById('videoTitle').innerText = "Video Ready to Download!";
            document.getElementById('downloadLink').href = url; // Link yahan aayega
        }, 2000);

    } catch (error) {
        alert("Kuch masla ho gaya, dobara koshish karein.");
        btn.innerText = "Analyze Video";
        btn.disabled = false;
    }
}
