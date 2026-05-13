
// 🔒 Disable Right-Click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// 🔒 Disable DevTools Shortcut Keys
document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||                              // F12
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "i") ||   // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "j") ||   // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.shiftKey && e.key === "c") ||   // Ctrl+Shift+C
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "U") ||
        (e.metaKey && e.altKey && e.key.toUpperCase() === "I") ||
        (e.metaKey && e.altKey && e.key.toUpperCase() === "i") ||// macOS DevTools
        (e.metaKey && e.key.toUpperCase() === "U") ||
        (e.metaKey && e.key.toUpperCase() === "u")             // Ctrl+U
    ) {
        e.preventDefault();
    }
});

// 🔍 Detect DevTools by dimensions
function detectDevTools() {
    const threshold = 160;
    if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
    ) {
        document.body.innerHTML = "<h1 style='text-align:center;margin-top:20%;color:red;'>⚠️ DevTools is blocked!</h1>";
    }
}

setInterval(detectDevTools, 1000);

// 🔇 Disable console functions
(function () {
    const noop = function () { };
    const blocked = ["log", "warn", "error", "info", "debug", "trace", "table", "clear"];
    for (let fn of blocked) {
        console[fn] = noop;
    }
    Object.freeze(console); // Optional: prevent tampering
})();

