import { updateBet } from "./api.js";

export function initUserEvents(tbody, recipientId, isOwnProfile) {

    tbody.addEventListener("click", (e) => {

        // 🔹 NAHRAŤ / OPRAVIŤ
        if (e.target.classList.contains("updateBtn") || e.target.classList.contains("reUpdateBtn")) {

            const matchId = e.target.dataset.match;
            const closed = e.target.dataset.closed === "true";

            e.target.outerHTML = `
                <input type="number" class="homeInput" style="width:50px;">
                :
                <input type="number" class="awayInput" style="width:50px;">
                <button class="okBtn simpleBtn" data-match="${matchId}" data-closed="${closed}">OK</button>
            `;
        }

        // 🔹 OK
        if (e.target.classList.contains("okBtn")) {

            const matchId = e.target.dataset.match;
            const closed = e.target.dataset.closed === "true";
            const row = e.target.closest("tr");

            const home = row.querySelector(".homeInput").value;
            const away = row.querySelector(".awayInput").value;

            updateBet(recipientId, matchId, home, away)
                .then(res => {
                    if (!res.ok) throw new Error();

                    const reUpdateBtn = (!closed && isOwnProfile)
                        ? ` <button class="updateBtn simpleBtn" data-match="${matchId}" data-closed="${closed}">Opraviť</button>`
                        : "";

                    row.children[2].innerHTML = `${home}:${away}${reUpdateBtn}`;
                })
                .catch(() => alert("Chyba pri ukladaní"));
        }
    });
}