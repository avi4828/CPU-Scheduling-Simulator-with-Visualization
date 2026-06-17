import { getProcessColor, getProcessBg } from '../utils/colors';

export default function GanttChart({ timeline, processes, currentTime, totalDuration }) {
  if (timeline.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-low)', fontSize: 13 }}>
        Add processes and start the simulation to see the Gantt chart.
      </div>
    );
  }

  const processIndexMap = {};
  processes.forEach((p, i) => { processIndexMap[p.id] = i; });

  const UNIT_WIDTH = 52;
  const chartWidth = totalDuration * UNIT_WIDTH;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Scrollable chart */}
      <div className="gantt-scroll">
        <div style={{ width: `${chartWidth + 40}px`, minWidth: '100%', position: 'relative' }}>
          {/* Bar track */}
          <div className="gantt-track">
            {/* Time cursor */}
            {currentTime >= 0 && (
              <div
                className="gantt-cursor"
                style={{ left: `${(currentTime + 1) * UNIT_WIDTH}px`, transition: 'left 0.25s linear' }}
              />
            )}

            {timeline.map((entry, idx) => {
              const isIdle = entry.processId === 'idle';
              const pIdx = processIndexMap[entry.processId] ?? -1;
              const color = isIdle ? null : getProcessColor(pIdx);
              const width = (entry.endTime - entry.startTime) * UNIT_WIDTH;
              const left = entry.startTime * UNIT_WIDTH;
              const isVisible = currentTime >= entry.startTime;
              const isPast = currentTime >= entry.endTime;

              if (isIdle) {
                return (
                  <div
                    key={`idle-${idx}`}
                    className="gantt-idle"
                    style={{ left, width, opacity: isVisible ? 0.6 : 0 }}
                  >
                    idle
                  </div>
                );
              }

              return (
                <div
                  key={`${entry.processId}-${entry.startTime}`}
                  className="gantt-block"
                  style={{
                    left,
                    width,
                    backgroundColor: isVisible ? color.bg : 'transparent',
                    color: color?.text,
                    opacity: isVisible ? (isPast ? 0.65 : 1) : 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {entry.processId}
                </div>
              );
            })}
          </div>

          {/* Time markers */}
          <div style={{ position: 'relative', height: 24, marginTop: 4 }}>
            {Array.from({ length: totalDuration + 1 }, (_, i) => (
              <div
                key={i}
                className="gantt-tick"
                style={{ left: `${i * UNIT_WIDTH}px` }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        {processes.map((proc, idx) => {
          const color = getProcessColor(idx);
          return (
            <div key={proc.id} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: color.bg }} />
              {proc.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}
