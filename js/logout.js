document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logoutBtn.addEventListener("click", logout);
        });
    }
});

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    window.location.href = "./login.html";
}
