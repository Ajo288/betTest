const BASE_URL = window.APP_CONFIG?.BASE_URL ?? "http://localhost:8080";

const applicationId = window.APP_CONFIG?.APPLICATION_ID ?? "fda404bf-efbc-4e23-a625-873cc53d7f73";

function getAuthHeader() {
    const token = localStorage.getItem("token");
    const authType = localStorage.getItem("authType");
    // "basic" | "bearer"

    if (!token) return {};

    if (authType === "bearer") {
        return {
            "Authorization": "Bearer " + token
        };
    }

    // default fallback = BASIC
    return { "Authorization": "Basic " + token };
}

export function getUserOverall(recipientId) {
    return fetch(`${BASE_URL}/v1/applications/${applicationId}/recipients/${recipientId}/overall`, {
        headers: getAuthHeader()
    }).then(res => res.json());
}

export function getAllUsersOverall() {
    return fetch(
        `${BASE_URL}/v1/applications/${applicationId}/recipients/overall`,
        {
            headers: {
                ...getAuthHeader()
            }
        }
    ).then(res => {
        if (!res.ok) throw new Error("Failed to load leaderboard");
        return res.json();
    });
}

export function updateBet(recipientId, matchId, home, away, authToken) {
    return fetch(`${BASE_URL}/v1/applications/${applicationId}/recipients/${recipientId}/matches/result/${matchId}/personal/bet`, {
        method: "PUT",
        headers: {
            ...getAuthHeader(authToken),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            home: Number(home),
            away: Number(away)
        })
    });
}
// -------------------------
// RECIPIENTS
// -------------------------
    export function getRecipients() {
        return fetch(
            `${BASE_URL}/v1/applications/${applicationId}/recipients`,
            {
                headers: {
                    ...getAuthHeader()
                }
            }
        ).then(res => {
            if (!res.ok) throw new Error("Failed to load recipients");
            return res.json();
        });

}