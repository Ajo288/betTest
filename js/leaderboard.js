import { getAllUsersOverall } from "./api.js";
import {logout} from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.getElementById("leaderboard-body");

    tbody.innerHTML = "<tr><td colspan='2'>Loading...</td></tr>";

    getAllUsersOverall()
        .then(data => {

            tbody.innerHTML = "";

            // ✅ správny prístup na array
            const recipients = data.recipientsBetDetails;

            if (!Array.isArray(recipients)) {
                throw new Error("Invalid response: recipientsBetDetails is not array");
            }

            // ❗ sort podľa summaryPoint (s fallbackom)
            const sorted = recipients.sort(
                (a, b) => (b.summaryPoint ?? 0) - (a.summaryPoint ?? 0)
            );

            sorted.forEach(r => {

                const name = r.lastName
                    ? `${r.firstName} ${r.lastName}`
                    : r.firstName;

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${name}</td>
                    <td>${r.summaryPoint ?? 0}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            tbody.innerHTML = "<tr><td colspan='2'>Error loading data</td></tr>";
            logout()
        });
});