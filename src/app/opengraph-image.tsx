import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Infygru — Enterprise IT Solutions & Business Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle grid background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Amber glow */}
                <div
                    style={{
                        position: "absolute",
                        top: -100,
                        right: -100,
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "rgba(245, 158, 11, 0.12)",
                        filter: "blur(80px)",
                    }}
                />
                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "0 80px",
                        gap: 24,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Badge */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 20px",
                            borderRadius: 999,
                            border: "1px solid rgba(245, 158, 11, 0.3)",
                            background: "rgba(245, 158, 11, 0.1)",
                            color: "#f59e0b",
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Chennai, India · Enterprise IT
                    </div>
                    {/* Logo text */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "-2px",
                            lineHeight: 1,
                        }}
                    >
                        Infygru
                    </div>
                    {/* Tagline */}
                    <div
                        style={{
                            fontSize: 26,
                            fontWeight: 300,
                            color: "#94a3b8",
                            maxWidth: 800,
                            lineHeight: 1.4,
                        }}
                    >
                        Web Development · Automation · Cloud · AI · Business Registration
                    </div>
                    {/* URL */}
                    <div
                        style={{
                            marginTop: 8,
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#f59e0b",
                        }}
                    >
                        infygru.com
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
