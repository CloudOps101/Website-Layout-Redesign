import { midComparison } from "@/content/site";

/**
 * "A Tale of Two Futures" bar comparison, rebuilt from the MID infographic as
 * real, accessible HTML. Bars animate in when the block scrolls into view.
 */
export function MidComparison({ light = false }: { light?: boolean }) {
  return (
    <div data-reveal className="mid-bars space-y-8">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" aria-hidden>
        <span className="inline-flex items-center gap-2">
          <span className={`size-3 rounded-sm ${light ? "bg-white/45" : "bg-navy-700"}`} />
          <span className={light ? "text-white/80" : "text-ink-soft"}>Option A: Hyperscale data center</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-gold-500" />
          <span className={light ? "text-white" : "text-navy-900"}>Option B: Medical Innovation District</span>
        </span>
      </div>

      <dl className="space-y-8">
        {midComparison.map((row, i) => {
          const max = Math.max(row.a.value, row.b.value);
          const wa = Math.max((row.a.value / max) * 100, 2.5);
          const wb = Math.max((row.b.value / max) * 100, 2.5);
          return (
            <div key={row.label}>
              <dt className={`eyebrow ${light ? "text-gold-300" : "text-blue-700"}`}>{row.label}</dt>
              <dd className="mt-3 space-y-2">
                <Bar
                  width={wa}
                  delay={i * 150}
                  label={`Option A: ${row.a.display}`}
                  value={row.a.display}
                  className={light ? "bg-white/30 text-white" : "bg-navy-700 text-white"}
                  outsideClass={light ? "text-white" : "text-navy-900"}
                />
                <Bar
                  width={wb}
                  delay={i * 150 + 120}
                  label={`Option B: ${row.b.display}`}
                  value={row.b.display}
                  className="bg-gold-500 text-navy-950"
                  outsideClass={light ? "text-gold-300" : "text-navy-900"}
                />
                <p className={`pt-1 text-sm ${light ? "text-white/75" : "text-ink-soft"}`}>{row.note}</p>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function Bar({
  width,
  delay,
  label,
  value,
  className,
  outsideClass,
}: {
  width: number;
  delay: number;
  label: string;
  value: string;
  className: string;
  outsideClass: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="sr-only">{label}</span>
      <div aria-hidden className="flex h-10 flex-1 items-center gap-3">
        <div
          className={`mid-bar flex h-full shrink-0 items-center rounded-r-lg rounded-l-sm text-sm font-bold ${width >= 18 ? "px-3" : ""} ${className}`}
          style={{ "--w": `${width}%`, "--d": `${delay}ms` } as React.CSSProperties}
        >
          {width >= 18 && <span className="whitespace-nowrap">{value}</span>}
        </div>
        {width < 18 && <span className={`whitespace-nowrap text-sm font-bold ${outsideClass}`}>{value}</span>}
      </div>
    </div>
  );
}
