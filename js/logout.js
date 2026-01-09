// ✅ overenie tokenu
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// ✅ Logout tlačidlo
document.getElementById("logoutBtn").addEventListener("click", () => {
    // odstránenie tokenu
    localStorage.removeItem("token");

    // presmerovanie na login
    window.location.href = "login.html";
});