import { AUTH_CONFIG } from "./auth-config.js";

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("registerBtn");

    btn.addEventListener("click", () => {

        const redirectUri = encodeURIComponent(window.location.origin + "/index.html");

        const url =
            `${AUTH_CONFIG.keycloakBaseUrl}` +
            `/realms/${AUTH_CONFIG.realm}` +
            `/protocol/openid-connect/registrations` +
            `?client_id=${AUTH_CONFIG.clientId}` +
            `&response_type=code` +
            `&scope=openid` +
            `&redirect_uri=${redirectUri}`;

        window.location.href = url;
    });

});