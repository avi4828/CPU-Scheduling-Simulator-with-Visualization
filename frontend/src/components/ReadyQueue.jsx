import { getProcessColor } from '../utils/colors';

export default function ReadyQueue({ readyQueueState, processes }) {
  const { running, waiting } = readyQueueState;

  const processIndexMap = {};
  processes.forEach((p, i) => { processIndexMap[p.id] = i; });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Running */}
      <div>
        <div className="rq-label">Running</div>
        {running && running !== 'idle' ? (
          <div className="rq-running">
            <div
              className="rq-pid-badge"
              style={{
                backgroundColor: getProcessColor(processIndexMap[running] ?? 0).bg,
                color: getProcessColor(processIndexMap[running] ?? 0).text,
              }}
            >
              {running}
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-mid)' }}>Executing on CPU</span>
          </div>
        ) : (
          <div className="rq-idle">CPU Idle</div>
        )}
      </div>

      {/* Waiting */}
      <div>
        <div className="rq-label">Waiting ({waiting.length})</div>
        {waiting.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {waiting.map((pid) => {
              const color = getProcessColor(processIndexMap[pid] ?? 0);
              return (
                <div key={pid} className="rq-wait-item">
                  <div
                    className="rq-small-badge"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {pid}
                  </div>
                  <span style={{ color: 'var(--text-low)' }}>Waiting</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-low)', padding: '6px 0' }}>Queue empty</div>
        )}
      </div>
    </div>
  );
}
