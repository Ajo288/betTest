import { getUserOverall } from "./api.js";
import { initUserEvents } from "./userActions.js";

const params = new URLSearchParams(window.location.search);
const recipientId = params.get("recipientId");

const tbody = document.getElementById("user-table-body");
const profileDiv = document.getElementById("profile");

getUserOverall(recipientId).then(data => {

    // profil
    const fullName = data.lastName
        ? `${data.firstName} ${data.lastName}`
        : data.firstName;

    profileDiv.innerHTML = `<p><strong>${fullName}</strong></p>`;

    // tabuľka
    data.matches.forEach(match => {

        const row = document.createElement("tr");

        const tip = (match.recipientHomeBet !== null && match.recipientAwayBet !== null)
            ? `${match.recipientHomeBet}:${match.recipientAwayBet}`
            : `<button class="updateBtn simpleBtn" data-match="${match.matchDetailId}">Nahrať</button>`;

        const points = match.summaryPoint ?? 0;
        const result = (match.homeResult !== null && match.awayResult !== null)
            ? `${match.homeResult}:${match.awayResult}`
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
    initUserEvents(tbody, recipientId);
});