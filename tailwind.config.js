/* eslint-disable quotes */
/* eslint-disable no-undef */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                anton: ['"Anton"', "sans-serif"],
                body: [
                    '"Open Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                "8xl": "6rem",
                "9xl": "7rem",
                "10xl": "8rem",
            },
        },
    },
    plugins: [],
};
