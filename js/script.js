const dataRoster = {
    // SENIN
    senin: [],
    selasa: [],
    rabu: [],
    kamis: [],
    jumat: []
};

function showSchedule(hari, element) {
    const list = document.getElementById("roster-body");
    const title = document.getElementById("current-day-title");
    const count = document.getElementById("item-count");

    const displayHari = hari === 'jumat' ? "Jum'at" : hari.charAt(0).toUpperCase() + hari.slice(1);
    title.textContent = `Jadwal Hari ${displayHari}`;

    if (element) {
        document.querySelectorAll(".day-btn").forEach(btn => btn.classList.remove("active"));
        element.classList.add("active");
    }

    list.innerHTML = "";
    const schedule = dataRoster[hari] || [];

    if (count) {
        count.textContent = schedule.length > 0
            ? `${schedule.length} mata pelajaran`
            : "";
    }

    // Jika belum ada data untuk hari ini, tampilkan kondisi kosong
    if (schedule.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty-state";
        empty.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                <path d="M3 10h18M8 3v4M16 3v4"></path>
            </svg>
            <p> ”GELOO” <br>Ujian Mid Telah Berakhir</p>
            <span>Bersenang-senanglah sebelum ujian selanjutnya menyusul.</span>
        `;
        list.appendChild(empty);
        return;
    }

    schedule.forEach((item, index) => {
        const li = document.createElement("li");
        const isBreak = (item.mapel || "").toUpperCase().includes("ISTIRAHAT");

        li.className = "schedule-item" + (isBreak ? " break" : "");
        li.innerHTML = `
            <span class="item-index">${isBreak ? "–" : index + 1}</span>
            <span class="item-subject">${item.mapel}</span>
        `;

        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showSchedule("senin");
});

const bgm = document.getElementById("bgm");

let musicStarted = false;

function startMusic() {
    if (musicStarted) return;

    bgm.volume = 0.4;

    const playPromise = bgm.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                musicStarted = true;
                console.log("BGM berhasil dimulai");
            })
            .catch((error) => {
                console.log("BGM gagal dimulai:", error);
            });
    }
}

// Interaksi pertama pengguna
document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("click", startMusic, { once: true });
