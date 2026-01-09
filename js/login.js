const API_URL = "https://api.tvoja-app.sk"; // zmeň na svoj backend

// skip if already auth
if (localStorage.getItem("token")) {
    window.location.href = "index.html";
}

document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";

    // try {
    //     const res =
    //
    //         await fetch(API_URL + "/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ username, password })
    //     });
    //
    //     if (!res.ok) {
    //         throw new Error("Nesprávne meno alebo heslo");
    //     }
    //
    //     const { token } = await res.json();
    //
    //     // 💾 uloženie tokenu
    //     localStorage.setItem("token", token);
    //
    //     // ➡️ presmerovanie
    //     window.location.href = "index.html";
    //
    // } catch (err) {
    //     // console.log(err.message)
    //     errorEl.textContent = err.message;
    // }

    //TODO: NATVRDO NASTAVENIE TOKENU - v index.html nastane presmerovanie - NEFUNGUJE await fetch(API_URL + "/login",
    localStorage.setItem("token", "FAKE_TOKEN")
        // ➡️ presmerovanie
        window.location.href = "index.html";
});
