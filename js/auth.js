import { AUTH_CONFIG } from "./auth-config.js";

let authReady = false;

export async function initAuth() {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !localStorage.getItem("token")) {

        const res = await fetch(
            `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: AUTH_CONFIG.clientId,
                    code,
                    redirect_uri: window.location.origin + "/index.html"
                })
            }
        );

        const data = await res.json();

        localStorage.setItem("token", data.access_token);

        window.history.replaceState({}, document.title, window.location.pathname);
    }

    authReady = true;
}

export function requireAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("❌ NO TOKEN → redirect login");
        window.location.href = "login.html";
        return false;
    }

    console.log("✔ AUTH OK");
    return true;
}