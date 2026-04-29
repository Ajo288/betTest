const BASE_URL = "http://localhost:8080";

const applicationId = "805038b1-1c12-4094-8431-bec5ee55d305";

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
    return {
        "Authorization": "Basic " + "YWRtaW46c2VjcmV0"
    };
}

export function getUserOverall(recipientId) {
    return fetch(`${BASE_URL}/v1/applications/${applicationId}/recipients/${recipientId}/overall`, {
        headers: getAuthHeader()
    }).then(res => res.json());
}

export function getAllUsersOverall() {
    return fetch(
        `http://localhost:8080/v1/applications/${applicationId}/recipients/overall`,
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
            `http://localhost:8080/v1/applications/${applicationId}/recipients`,
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