import { AUTH_CONFIG } from "./auth-config.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginType = document.getElementById("loginType").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    errorEl.textContent = "";

    if (loginType === "admin") {

        const basicAuth = btoa(`${username}:${password}`);

        localStorage.setItem("token", basicAuth);
        localStorage.setItem("authType", "basic");
        localStorage.setItem("role", "admin");

        window.location.href = "./index.html";
        return;
    }

    // --- USER: Keycloak Resource Owner Password flow ---
    try {
        const res = await fetch(
            `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    client_id: AUTH_CONFIG.clientId,
                    username,
                    password
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {
            // Keycloak vracia error_description pri zlých credentials
            errorEl.textContent = data.error_description ?? "Nesprávne meno alebo heslo.";
            return;
        }

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("authType", "bearer");

        window.location.href = "./index.html";

    } catch (err) {
        console.error(err);
        errorEl.textContent = "Chyba spojenia so serverom.";
    }
});