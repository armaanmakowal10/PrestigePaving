/**
 * PCB-style circuit background (shadcn.io circuit pattern).
 * Canvas graph + trace pulses; honors prefers-reduced-motion.
 */
function CircuitBackground({
  traceColor = 'rgba(0, 128, 224, 0.2)',
  traceHi = 'rgba(0, 128, 224, 0.38)',
  padColor = 'rgba(111, 168, 255, 0.55)',
  pulseColor = 'rgba(159, 206, 255, 0.92)',
  pulseCore = 'rgba(255, 255, 255, 0.95)',
  cols = 17,
  rows = 12,
  pulseCount = 14,
}) {
  const canvasRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const reduceMotionRef = React.useRef(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionRef.current = mq.matches;
    const on = () => { reduceMotionRef.current = mq.matches; };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    let edges = [];
    let pulses = [];
    let raf = 0;
    let w = 1;
    let h = 1;
    let dpr = 1;

    function idx(i, j) {
      return j * cols + i;
    }

    function build() {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pad = Math.min(w, h) * 0.05;
      const gw = w - pad * 2;
      const gh = h - pad * 2;
      const cw = gw / Math.max(1, cols - 1);
      const ch = gh / Math.max(1, rows - 1);
      const nodes = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          nodes.push({
            x: pad + i * cw + (Math.random() - 0.5) * cw * 0.12,
            y: pad + j * ch + (Math.random() - 0.5) * ch * 0.12,
          });
        }
      }
      edges = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = idx(i, j);
          if (i < cols - 1 && Math.random() < 0.6) {
            edges.push({
              x1: nodes[a].x,
              y1: nodes[a].y,
              x2: nodes[a + 1].x,
              y2: nodes[a + 1].y,
            });
          }
          if (j < rows - 1 && Math.random() < 0.6) {
            edges.push({
              x1: nodes[a].x,
              y1: nodes[a].y,
              x2: nodes[a + cols].x,
              y2: nodes[a + cols].y,
            });
          }
        }
      }
      if (edges.length < 28) {
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = idx(i, j);
            const b = a + 1;
            const dup = edges.some(
              (e) => Math.abs(e.x1 - nodes[a].x) < 0.01 && Math.abs(e.y1 - nodes[a].y) < 0.01
                && Math.abs(e.x2 - nodes[b].x) < 0.01 && Math.abs(e.y2 - nodes[b].y) < 0.01,
            );
            if (!dup) {
              edges.push({ x1: nodes[a].x, y1: nodes[a].y, x2: nodes[b].x, y2: nodes[b].y });
            }
          }
        }
      }
      const nE = Math.max(1, edges.length);
      pulses = Array.from({ length: pulseCount }, () => ({
        e: Math.floor(Math.random() * nE),
        t: Math.random(),
        sp: 0.42 + Math.random() * 0.55,
      }));
    }

    function drawEdges() {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      edges.forEach((e) => {
        ctx.strokeStyle = traceColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
        ctx.stroke();
        ctx.strokeStyle = traceHi;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      const seen = new Set();
      edges.forEach((e) => {
        [[e.x1, e.y1], [e.x2, e.y2]].forEach(([x, y]) => {
          const key = `${Math.round(x * 2)}_${Math.round(y * 2)}`;
          if (seen.has(key)) return;
          seen.add(key);
          ctx.fillStyle = padColor;
          ctx.beginPath();
          ctx.arc(x, y, 2.3, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    function drawPulses(dt) {
      pulses.forEach((p) => {
        p.t += p.sp * dt;
        if (p.t >= 1) {
          p.t = 0;
          p.e = Math.floor(Math.random() * edges.length);
          p.sp = 0.42 + Math.random() * 0.62;
        }
        const e = edges[p.e];
        if (!e) return;
        const x = e.x1 + (e.x2 - e.x1) * p.t;
        const y = e.y1 + (e.y2 - e.y1) * p.t;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, 16);
        rg.addColorStop(0, pulseCore);
        rg.addColorStop(0.2, pulseColor);
        rg.addColorStop(1, 'rgba(159, 206, 255, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let last = performance.now();
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      drawEdges();
      if (!reduceMotionRef.current) drawPulses(dt);
      raf = requestAnimationFrame(frame);
    }

    build();
    last = performance.now();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      build();
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [traceColor, traceHi, padColor, pulseColor, pulseCore, cols, rows, pulseCount]);

  return (
    <div ref={wrapRef} className="circuit-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

window.CircuitBackground = CircuitBackground;
