/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                xs: "576px",
                sm: "768px",
                md: "992px",
                lg: "1200px",
                xl: "1366px",
            },
        },
    },
    plugins: [],
}