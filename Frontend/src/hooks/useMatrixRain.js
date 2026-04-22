import { useEffect } from "react";

export default function useMatrixRain(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const chars = "アイウエオカキクサシスSNORT0110NMAP[]#@!</>SUDO{};?=KALI";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -canvas.height);

    const draw = () => {
      ctx.fillStyle = "rgba(6,13,6,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        const bright = Math.random();
        ctx.fillStyle =
          bright > 0.97 ? "#ffffff" : bright > 0.9 ? "#00ff41" : "rgba(0,180,40,0.5)";
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        ctx.fillText(ch, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
}
