import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // Paramètres dynamiques
    const title = searchParams.get('title') || 'Consultante SEO & Experte Référencement';
    const subtitle = searchParams.get('subtitle') || 'Dominez Google avec IndHack';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#2A3830',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Background gradient effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(99,133,118,0.3) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-5%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(99,133,118,0.2) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '60px',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    {/* Logo text */}
                    <div
                        style={{
                            fontSize: '32px',
                            fontWeight: 900,
                            color: '#638576',
                            letterSpacing: '0.2em',
                            marginBottom: '40px',
                        }}
                    >
                        INDHACK
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: '56px',
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1.1,
                            maxWidth: '900px',
                            marginBottom: '24px',
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: '24px',
                            color: 'rgba(255,255,255,0.7)',
                            maxWidth: '700px',
                        }}
                    >
                        {subtitle}
                    </div>

                    {/* Bottom bar */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '60px',
                            gap: '20px',
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: '#638576',
                                borderRadius: '50%',
                            }}
                        />
                        <div
                            style={{
                                fontSize: '18px',
                                color: '#638576',
                                fontWeight: 600,
                            }}
                        >
                            indhack.com
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
