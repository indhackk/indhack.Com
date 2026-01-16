export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>{children}</body>
        </html>
    );
}
