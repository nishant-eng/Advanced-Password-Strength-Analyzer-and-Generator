document.addEventListener("DOMContentLoaded", () => {
    let password = document.getElementById("password");
    let power = document.getElementById("power-point");
    let strengthText = document.getElementById("strength-text");
    let suggestions = document.getElementById("suggestions");
    let togglePassword = document.getElementById("toggle-password");
    let copyPassword = document.getElementById("copy-password");
    let generatePassword = document.getElementById("generate-password");

    // Strength Levels
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
    let strengthMessages = ["Too Weak", "Weak", "Moderate", "Strong", "Very Strong"];

    // Password Strength Check
    password.addEventListener("input", () => {
        let point = 0;
        let value = password.value;
        
        if (value.length === 0) {
            power.style.width = "1%";
            power.style.backgroundColor = "#D73F40";
            strengthText.textContent = "Strength: Too Weak";
            suggestions.textContent = "";
            return;
        }

        if (value.length >= 6) {
            let hasNumber = /[0-9]/.test(value);
            let hasLower = /[a-z]/.test(value);
            let hasUpper = /[A-Z]/.test(value);
            let hasSpecial = /[^0-9a-zA-Z]/.test(value);

            // Increase strength for each category met
            point += hasNumber ? 1 : 0;
            point += hasLower ? 1 : 0;
            point += hasUpper ? 1 : 0;
            point += hasSpecial ? 1 : 0;
        }

        // Apply strength level
        power.style.width = widthPower[point];
        power.style.backgroundColor = colorPower[point];
        strengthText.textContent = `Strength: ${strengthMessages[point]}`;

        // Provide Suggestions
        let tips = [];
        if (!/[0-9]/.test(value)) tips.push("Add numbers");
        if (!/[a-z]/.test(value)) tips.push("Add lowercase letters");
        if (!/[A-Z]/.test(value)) tips.push("Add uppercase letters");
        if (!/[^0-9a-zA-Z]/.test(value)) tips.push("Add special characters");
        if (value.length < 8) tips.push("Make it at least 8 characters long");

        suggestions.textContent = tips.length ? "Try: " + tips.join(", ") : "";
    });

    // Toggle Password Visibility
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password" ? "text" : "password";
    });

    // Copy Password to Clipboard
    copyPassword.addEventListener("click", () => {
        navigator.clipboard.writeText(password.value).then(() => {
            alert("Password copied to clipboard!");
        });
    });

    // Generate Strong Password
    generatePassword.addEventListener("click", () => {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let generated = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        password.value = generated;
        password.dispatchEvent(new Event("input")); // Trigger strength check
    });
});
