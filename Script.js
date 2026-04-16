if (res.medias && res.medias.length > 0) {
                resultDiv.classList.remove('hidden');
                downloadButtons.innerHTML = '<p class="text-cyan-400 text-[10px] font-bold mb-4 uppercase tracking-[2px]">Select Quality:</p>';

                res.medias.forEach(item => {
                    // Agar quality 1080p ya 4K (2160p) ho toh uska color alag dikhayen
                    const isHighRes = item.quality.includes('720p') || item.quality.includes('1080') || item.quality.includes('2160') || item.quality.includes('4K');
                    const btnClass = isHighRes 
                        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10";

                    downloadButtons.innerHTML += `
                        <a href="${item.url}" target="_blank" class="w-full py-4 ${btnClass} rounded-xl font-black text-xs uppercase tracking-widest transition-all mb-2 flex justify-between px-6 items-center">
                            <span>${item.extension.toUpperCase()} ${item.quality}</span>
                            <i class="fa-solid fa-circle-down"></i>
                        </a>
                    `;
                });
                resultDiv.scrollIntoView({ behavior: 'smooth' });
