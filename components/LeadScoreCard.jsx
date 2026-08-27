const TIER_STYLES = {
  Hot: {
    badge: "bg-main text-bg",
    bar: "bg-main",
    ring: "border-main/30",
  },
  Warm: {
    badge: "bg-accent text-text",
    bar: "bg-accent",
    ring: "border-accent/40",
  },
  Cold: {
    badge: "bg-text/10 text-text",
    bar: "bg-text/40",
    ring: "border-black/10",
  },
};

// One component, four render paths -- one per AI SDK tool-part state. Each
// answers a different question for the reader (preparing? running? what
// came back? what broke?), not just a relabeled version of the others.
export function LeadScoreTool({ part }) {
  switch (part.state) {
    case "input-streaming":
      return <ScorePreparing input={part.input} />;
    case "input-available":
      return <ScoreRunning input={part.input} />;
    case "output-available":
      return <ScoreResult output={part.output} />;
    case "output-error":
      return <ScoreError errorText={part.errorText} />;
    default:
      return null;
  }
}

function ScorePreparing({ input }) {
  return (
    <div className="w-72 max-w-full animate-pulse rounded-lg border border-black/10 bg-bg p-3">
      <div className="mb-2 h-3 w-24 rounded bg-text/15" />
      <div className="mb-1 h-2 w-full rounded bg-text/10" />
      <div className="h-2 w-3/4 rounded bg-text/10" />
      {input?.propertyType ? (
        <p className="mt-2 truncate text-xs text-text/40">{input.propertyType}</p>
      ) : null}
    </div>
  );
}

function ScoreRunning({ input }) {
  const tags = [input?.intent, input?.timeline, input?.contactMethod].filter(
    (t) => t && t !== "none",
  );

  return (
    <div className="w-72 max-w-full rounded-lg border border-black/10 bg-bg p-3">
      <div className="flex items-center gap-2 text-xs font-medium text-text/70">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-text/20 border-t-main" />
        Scoring this lead&hellip;
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-text/5 px-2 py-0.5 text-[11px] text-text/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreResult({ output }) {
  const style = TIER_STYLES[output.tier] ?? TIER_STYLES.Cold;

  return (
    <div
      className={`w-72 max-w-full rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 ${style.ring}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
        >
          {output.tier} lead
        </span>
        <span className="font-heading text-2xl font-semibold text-text">
          {output.score}
          <span className="text-sm font-normal text-text/40">/100</span>
        </span>
      </div>

      <p className="mt-2 text-xs text-text/60">{output.summary}</p>

      <div className="mt-3 space-y-2">
        {output.breakdown.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-[11px] text-text/60">
              <span>{item.label}</span>
              <span>
                {item.points}/{item.max} &middot; {item.detail}
              </span>
            </div>
            <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-text/10">
              <div
                className={`h-full rounded-full ${style.bar}`}
                style={{ width: `${(item.points / item.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreError({ errorText }) {
  return (
    <div className="w-72 max-w-full rounded-lg border border-main/30 bg-main/5 p-3">
      <div className="flex items-center gap-2 text-sm font-medium text-main">
        <span aria-hidden="true">&#9888;</span>
        Couldn&apos;t score this lead yet
      </div>
      <p className="mt-1 text-xs text-text/60">
        {errorText || "Something went wrong scoring this lead."}
      </p>
    </div>
  );
}
