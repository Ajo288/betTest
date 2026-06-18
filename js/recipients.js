// js/recipients.js
import { getRecipients } from "./api.js";
import {logout} from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.getElementById("user-nav");

    nav.innerHTML = "<span>Loading...</span>";

    getRecipients()
        .then(recipients => {

            nav.innerHTML = "";

            recipients.forEach(r => {
                const link = document.createElement("a");

                const name = r.lastName
                    ? `${r.firstName} ${r.lastName}`
                    : r.firstName;

                link.textContent = name;

                // 👇 toto je OK (presmerovanie na detail)
                link.href = `./user.html?recipientId=${r.id}`;

                nav.appendChild(link);
            });
        })
        .catch(err => {
            console.error("Error loading recipients:", err);
            nav.innerHTML = "<span>Chyba pri načítaní používateľov</span>";
            logout();
        });
});