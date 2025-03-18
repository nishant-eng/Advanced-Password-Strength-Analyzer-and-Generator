

document.addEventListener("DOMContentLoaded", () => {
    let password = document.getElementById("password");
    let power = document.getElementById("power-point");

    password.addEventListener("input", () => {
        let point = 0;
        let value = password.value;
        let widthPower = ["1%", "25%", "50%", "75%", "100%"];
        let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

        if (value.length === 0) {
            power.style.width = "1%";
            power.style.backgroundColor = "#D73F40";
            return; // Exit function early
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

        // Apply strength to the power bar
        power.style.width = widthPower[point] || "1%";
        power.style.backgroundColor = colorPower[point] || "D73F40";
    });
});
