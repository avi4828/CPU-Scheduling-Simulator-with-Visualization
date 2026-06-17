import { getProcessColor } from '../utils/colors';

export default function MetricsTable({ metrics, processes }) {
  if (metrics.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-low)', fontSize: 13 }}>
        Run a simulation to see metrics.
      </div>
    );
  }

  const processIndexMap = {};
  processes.forEach((p, i) => { processIndexMap[p.id] = i; });

  const avgTAT = metrics.reduce((s, m) => s + m.turnaroundTime, 0) / metrics.length;
  const avgWT  = metrics.reduce((s, m) => s + m.waitingTime,    0) / metrics.length;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="metrics-table">
        <thead>
          <tr>
            <th>PID</th>
            <th>AT</th>
            <th>BT</th>
            <th>CT</th>
            <th>TAT</th>
            <th>WT</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, idx) => {
            const color = getProcessColor(processIndexMap[m.id] ?? idx);
            return (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color.bg, display: 'inline-block', flexShrink: 0 }} />
                    <strong>{m.id}</strong>
                  </div>
                </td>
                <td>{m.arrivalTime}</td>
                <td>{m.burstTime}</td>
                <td>{m.completionTime}</td>
                <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{m.turnaroundTime}</td>
                <td style={{ color: 'var(--success)', fontWeight: 600 }}>{m.waitingTime}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: 'right', color: 'var(--text-low)', fontWeight: 400 }}>Averages</td>
            <td>{avgTAT.toFixed(2)}</td>
            <td style={{ color: 'var(--success)' }}>{avgWT.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
