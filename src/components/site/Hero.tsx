import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines" />
      <div className="container-arkyo relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Estúdio digital sob medida — Bélgica
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem]">
            Sites que simplificam
            <br className="hidden sm:block" /> negócios reais.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            Identificamos o que trava a comunicação, o atendimento e a presença digital do seu
            negócio — e resolvemos com design, tecnologia e clareza.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contato"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-px"
            >
              Solicitar orçamento
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Ver serviços
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-card shadow-elevated">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <div className="mx-auto flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                arkyo.com
              </div>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
              <MockCard title="Agendamentos hoje" value="24" trend="+8%" />
              <MockCard title="Leads no site" value="152" trend="+18%" />
              <MockCard title="Tempo médio página" value="1m 42s" trend="+12%" />
              <div className="md:col-span-3">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Últimos 30 dias
                    </span>
                    <span className="text-xs text-muted-foreground">Sessões</span>
                  </div>
                  <ChartMock />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MockCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
        <span className="text-xs font-medium text-foreground">{trend}</span>
      </div>
    </div>
  );
}

function ChartMock() {
  const points = [8, 14, 10, 18, 15, 22, 19, 26, 24, 30, 27, 34, 32, 40];
  const max = Math.max(...points);
  const w = 100;
  const h = 40;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(2)} ${(h - (p / max) * h).toFixed(2)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#g)" className="text-foreground" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
    </svg>
  );
}
