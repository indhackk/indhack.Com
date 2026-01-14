/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // User defined colors - Sage Green palette
                'fond-sombre': '#394843',  // Plus doux, moins forêt
                'fond-clair': '#FAFBFA',   // Blanc légèrement teinté
                'texte-clair': '#F5F7F6',
                'texte-moyen': '#C8D0CC',
                'accent-clair': '#9DADA4',
                'sauge': '#8FA89A',         // Sauge principal
                'ink': '#2A3830',           // Texte principal, moins noir
                'soft': '#6B7D74',          // Texte secondaire
                'line': '#E4EBE7',          // Bordures

                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                heading: ['var(--font-space-grotesk)', 'sans-serif'],
                body: ['var(--font-ibm-plex)', 'sans-serif'],
                sans: ['var(--font-ibm-plex)', 'sans-serif'], // Default sans to body font
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "float-final": {
                    "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.3" },
                    "50%": { transform: "scale(1.1) rotate(1.5deg)", opacity: "0.2" }
                },
                "underline-grow": {
                    to: { transform: "scaleX(1)" }
                },
                "fade-up": {
                    to: { opacity: "1", transform: "translateY(0)" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "float-final": "float-final 40s infinite alternate ease-in-out",
                "underline-grow": "underline-grow 1s ease 0.4s forwards",
                "fade-up": "fade-up 0.7s ease 0.35s forwards",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
}
