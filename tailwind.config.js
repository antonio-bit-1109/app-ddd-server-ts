/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                phosphorescentGreen: "#39FF14",
                phosphorescentRed: "#FF073A",
            },
            textShadow: {
                phosphorescent: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px currentColor",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".text-phosphorescent": {
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px currentColor",
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
});
