/**
 * The fake content of a thumbnail. Abstract on purpose: it should read as
 * "a window of that kind of app" from across the page, and never as a
 * screenshot of a real one.
 */
const bar = (w, opacity = 0.18) => (
  <span
    className="block h-[3px] rounded-full bg-white"
    style={{ width: `${w}%`, opacity }}
  />
)

export default function WindowSkeleton({ kind, accent }) {
  if (kind === 'browser') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex gap-1 border-b border-white/8 px-2 py-1.5">
          <span className="h-2 flex-1 rounded-sm bg-white/12" />
          <span className="h-2 w-8 rounded-sm bg-white/6" />
        </div>
        <div className="flex-1 space-y-1.5 p-2">
          <span
            className="block h-1/3 w-full rounded"
            style={{ background: accent, opacity: 0.5 }}
          />
          {bar(80)}
          {bar(62)}
          {bar(70)}
        </div>
      </div>
    )
  }

  if (kind === 'code') {
    return (
      <div className="flex h-full">
        <div className="w-1/4 space-y-1.5 border-r border-white/8 p-2">
          {bar(70, 0.12)}
          {bar(55, 0.12)}
          {bar(80, 0.12)}
          {bar(48, 0.12)}
        </div>
        <div className="flex-1 space-y-1.5 p-2 font-mono">
          {bar(45, 0.3)}
          <span className="ml-3 block h-[3px] w-1/2 rounded-full" style={{ background: accent }} />
          {bar(38)}
          <span className="ml-3 block h-[3px] w-2/5 rounded-full" style={{ background: accent, opacity: 0.7 }} />
          {bar(55)}
          {bar(30)}
        </div>
      </div>
    )
  }

  if (kind === 'terminal') {
    return (
      <div className="h-full space-y-1.5 p-2 font-mono">
        <span className="block h-[3px] w-1/3 rounded-full" style={{ background: accent }} />
        {bar(70)}
        {bar(52)}
        <span className="block h-[3px] w-1/4 rounded-full" style={{ background: accent }} />
        {bar(60)}
        <span className="mt-1 block h-[7px] w-[5px] bg-white/50" />
      </div>
    )
  }

  if (kind === 'music') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-2">
        <span
          className="h-8 w-8 rounded-md"
          style={{ background: accent, opacity: 0.65 }}
        />
        <div className="flex w-3/5 flex-col gap-1">
          {bar(100, 0.25)}
          {bar(60, 0.14)}
        </div>
      </div>
    )
  }

  if (kind === 'notes') {
    return (
      <div className="flex h-full">
        <div className="w-1/3 border-r border-white/8 p-2">
          <span
            className="mb-1.5 block h-3 w-full rounded-sm"
            style={{ background: accent, opacity: 0.45 }}
          />
          <div className="space-y-1.5">
            {bar(85, 0.12)}
            {bar(65, 0.12)}
          </div>
        </div>
        <div className="flex-1 space-y-1.5 p-2">
          {bar(50, 0.3)}
          {bar(90)}
          {bar(84)}
          {bar(72)}
          {bar(40)}
        </div>
      </div>
    )
  }

  if (kind === 'files') {
    return (
      <div className="grid h-full grid-cols-4 gap-1.5 p-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="rounded-[3px]"
            style={{
              background: i % 3 === 0 ? accent : 'white',
              opacity: i % 3 === 0 ? 0.5 : 0.1,
            }}
          />
        ))}
      </div>
    )
  }

  // 'dialog' — a small panel with a single primary button. The window kind
  // that only ever has one usable traffic light.
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-2">
      {bar(60, 0.25)}
      {bar(40, 0.14)}
      <span
        className="mt-1 h-3 w-12 rounded-[3px]"
        style={{ background: accent, opacity: 0.7 }}
      />
    </div>
  )
}
