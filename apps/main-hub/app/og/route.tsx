import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
                    backgroundColor: '#000',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)',
                }}
            >
                {/* Grid pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />
                
                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                    }}
                >
                    {/* Version badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '24px',
                        }}
                    >
                        <div
                            style={{
                                padding: '8px 16px',
                                borderRadius: '9999px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#a3a3a3',
                                fontSize: '14px',
                                fontFamily: 'monospace',
                            }}
                        >
                            v2.0.0-beta
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                borderRadius: '9999px',
                                background: 'rgba(16,185,129,0.15)',
                                border: '1px solid rgba(16,185,129,0.3)',
                            }}
                        >
                            <div
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#10b981',
                                }}
                            />
                            <span style={{ color: '#10b981', fontSize: '14px' }}>
                                99.9% SLA
                            </span>
                        </div>
                    </div>

                    {/* Main title */}
                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: '#fff',
                            margin: 0,
                            marginBottom: '8px',
                            letterSpacing: '-2px',
                        }}
                    >
                        Anthony Mora
                    </h1>
                    
                    {/* Subtitle */}
                    <h2
                        style={{
                            fontSize: '48px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(90deg, #e5e5e5, #737373)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            marginBottom: '24px',
                            letterSpacing: '-1px',
                        }}
                    >
                        Senior R&D Engineer
                    </h2>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#737373',
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: 0,
                            lineHeight: 1.4,
                        }}
                    >
                        Full-Stack TypeScript • DevOps • System Architecture
                    </p>

                    {/* Skills row */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '32px',
                        }}
                    >
                        {['Next.js', 'React', 'Node.js', 'Python', 'Docker'].map((skill) => (
                            <div
                                key={skill}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#a3a3a3',
                                    fontSize: '16px',
                                }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom branding */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span style={{ color: '#525252', fontSize: '18px' }}>
                        geekslab.tech
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
