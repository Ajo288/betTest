import { updateBet } from "./api.js";

export function initUserEvents(tbody, recipientId) {

    tbody.addEventListener("click", (e) => {

        // 🔹 NAHRAŤ
        if (e.target.classList.contains("updateBtn")) {

            const matchId = e.target.dataset.match;

            e.target.outerHTML = `
                <input type="number" class="homeInput" style="width:50px;">
                :
                <input type="number" class="awayInput" style="width:50px;">
                <button class="okBtn simpleBtn" data-match="${matchId}">OK</button>
            `;
        }

        // 🔹 OK
        if (e.target.classList.contains("okBtn")) {

            const matchId = e.target.dataset.match;
            const row = e.target.closest("tr");

            const home = row.querySelector(".homeInput").value;
            const away = row.querySelector(".awayInput").value;

            updateBet(recipientId, matchId, home, away)
                .then(res => {
                    if (!res.ok) throw new Error();

                    row.children[2].innerHTML = `${home}:${away}`;
                })
                .catch(() => alert("Chyba pri ukladaní"));
        }
    });
}