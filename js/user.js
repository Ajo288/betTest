import { getUserOverall } from "./api.js";
import { initUserEvents } from "./userActions.js";
import { requireAuth } from "./auth.js";

requireAuth();

const params = new URLSearchParams(window.location.search);
const recipientId = params.get("recipientId");

// 👇 true ak si pozeráš vlastný profil
const isOwnProfile = getLoggedInUserId() === String(recipientId);
const tbody = document.getElementById("user-table-body");
const profileDiv = document.getElementById("profile");


getUserOverall(recipientId).then(data => {

    // profil
    const fullName = data.lastName
        ? `${data.firstName} ${data.lastName}`
        : data.firstName;

    profileDiv.innerHTML = `<p><strong>${fullName}</strong></p>`;

    // tabuľka
    data.matches.sort((a, b) => new Date(a.closeAt) - new Date(b.closeAt));

    data.matches.forEach(match => {

        const row = document.createElement("tr");
        const isClosed = new Date(match.closeAt) < new Date();
        const canSeeBet = isOwnProfile || isClosed;

        // 👇 tlačidlo zobraz len ak je to vlastný profil a tip nebol zadaný
        const tip = (match.recipientHomeBet !== null && match.recipientAwayBet !== null)
            ? canSeeBet
                ? `${match.recipientHomeBet}:${match.recipientAwayBet}` +
                (!isClosed && isOwnProfile ? ` <button class="reUpdateBtn simpleBtn" data-match="${match.matchDetailId}">Opraviť</button>` : "")
                : "—"
            : isOwnProfile && !isClosed
                ? `<span>Tipovanie končí o: <span class="bet-end-countdown" data-close="${match.closeAt}"></span></span> <button class="updateBtn simpleBtn" data-match="${match.matchDetailId}">Nahrať</button>`
                : "—";

        const points = match.summaryPoint ?? 0;
        const matchEndThreshold = match.startAt
            ? new Date(new Date(match.startAt).getTime() + 4 * 60 * 60 * 1000)
            : null;
        const isMatchOver = matchEndThreshold && new Date() > matchEndThreshold;

        const result = (match.homeResult !== null && match.awayResult !== null)
            ? `${match.homeResult}:${match.awayResult}`
            : isMatchOver
                ? "Zápas skončil - výsledok nie je spracovaný"
                : match.startAt
                    ? `Zápas začne o: <span class="match-start-countdown" data-start="${match.startAt}"></span>`
                    : "Zápas sa nezačal";

        row.innerHTML = `
            <td>${match.homeTeam}</td>
            <td>${match.awayTeam}</td>
            <td>${tip}</td>
            <td>${points}</td>
            <td>${result}</td>
        `;

        tbody.appendChild(row);
    });

    // 👇 zapni eventy
    initUserEvents(tbody, recipientId, isOwnProfile);

    function formatCountdown(diffMs) {
        const totalSec = Math.floor(diffMs / 1000);
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        return d > 0 ? `${d}d ${time}` : time;
    }

    function startCountdowns() {
        document.querySelectorAll(".bet-end-countdown").forEach(el => {
            const closeAt = new Date(el.dataset.close);
            const update = () => {
                const diff = closeAt - new Date();
                if (diff <= 0) {
                    el.textContent = "—";
                    clearInterval(interval);
                    return;
                }
                el.textContent = formatCountdown(diff);
            };
            update();
            const interval = setInterval(update, 1000);
        });

        document.querySelectorAll(".match-start-countdown").forEach(el => {
            const startAt = new Date(el.dataset.start);
            const update = () => {
                const diff = startAt - new Date();
                if (diff <= 0) {
                    el.closest("td").textContent = "Zápas prebieha";
                    clearInterval(interval);
                    return;
                }
                el.textContent = formatCountdown(diff);
            };
            update();
            const interval = setInterval(update, 1000);
        });
    }

    startCountdowns();
});




// 👇 Dekóduj JWT a získaj ID prihláseného usera
function getLoggedInUserId() {
    const token = localStorage.getItem("token"); // uprav kľúč podľa tvojho projektu
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return String(payload.sub ?? payload.id ?? payload.userId);
    } catch {
        return null;
    }
}