import { useState } from 'react';
import { ALGORITHMS } from '../algorithms/schedulers';
import { getProcessColor } from '../utils/colors';

export default function InputPanel({
  processes, algorithm, timeQuantum, onAddProcess, onRemoveProcess,
  onAlgorithmChange, onTimeQuantumChange, onGenerateRandom, onClearAll,
  isRunning,
}) {
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);

  const nextId = `P${processes.length + 1}`;

  const handleAdd = () => {
    if (burstTime < 1) return;
    onAddProcess({
      id: nextId,
      arrivalTime: parseInt(arrivalTime) || 0,
      burstTime: parseInt(burstTime) || 1,
      priority: parseInt(priority) || 1,
    });
    setArrivalTime(0);
    setBurstTime(1);
    setPriority(1);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleAdd(); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Algorithm selector */}
      <div>
        <label className="field-label" htmlFor="algorithm-select">Algorithm</label>
        <select
          id="algorithm-select"
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          disabled={isRunning}
        >
          {Object.entries(ALGORITHMS).map(([key, algo]) => (
            <option key={key} value={key}>{algo.name} — {algo.fullName}</option>
          ))}
        </select>
      </div>

      {/* Time Quantum */}
      {(algorithm === 'rr' || algorithm === 'mlq') && (
        <div>
          <label className="field-label" htmlFor="time-quantum-input">Time Quantum</label>
          <input
            id="time-quantum-input"
            type="number" min="1" max="10"
            value={timeQuantum}
            onChange={(e) => onTimeQuantumChange(parseInt(e.target.value) || 1)}
            disabled={isRunning}
          />
        </div>
      )}

      {/* Add process */}
      <div>
        <label className="field-label">Add Process</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-low)', marginBottom: 3 }}>PID</div>
            <div style={{
              padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 3,
              background: 'var(--surface-2)', fontWeight: 700, fontSize: 13,
              textAlign: 'center', color: 'var(--accent)',
            }}>
              {nextId}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-low)', marginBottom: 3 }}>Arrival</div>
            <input
              id="arrival-time-input"
              type="number" min="0"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isRunning}
              style={{ textAlign: 'center' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-low)', marginBottom: 3 }}>Burst</div>
            <input
              id="burst-time-input"
              type="number" min="1"
              value={burstTime}
              onChange={(e) => setBurstTime(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isRunning}
              style={{ textAlign: 'center' }}
            />
          </div>
        </div>

        <div style={{ marginTop: 6 }}>
          <div style={{ fontSize: 10, color: 'var(--text-low)', marginBottom: 3 }}>Priority (1 = highest)</div>
          <input
            id="priority-input"
            type="number" min="1" max="10"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
            style={{ textAlign: 'center' }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          id="add-process-btn"
          className="btn btn-primary btn-full"
          onClick={handleAdd}
          disabled={isRunning}
        >
          + Add Process
        </button>
        <button
          id="random-btn"
          className="btn btn-secondary btn-full"
          onClick={() => onGenerateRandom(5)}
          disabled={isRunning}
        >
          Random
        </button>
      </div>

      {/* Process list */}
      {processes.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Processes ({processes.length})
            </span>
            <button
              id="clear-all-btn"
              className="btn btn-danger btn-sm"
              onClick={onClearAll}
              disabled={isRunning}
            >
              Clear All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 200, overflowY: 'auto' }}>
            {processes.map((proc, idx) => {
              const color = getProcessColor(idx);
              return (
                <div key={proc.id} className="process-row">
                  <span className="process-dot" style={{ backgroundColor: color.bg }} />
                  <span style={{ fontWeight: 700, minWidth: 28 }}>{proc.id}</span>
                  <span style={{ color: 'var(--text-mid)' }}>AT:{proc.arrivalTime}</span>
                  <span style={{ color: 'var(--text-mid)' }}>BT:{proc.burstTime}</span>
                  <span style={{ color: 'var(--text-mid)' }}>Pri:{proc.priority}</span>
                  <button
                    className="process-remove"
                    onClick={() => onRemoveProcess(proc.id)}
                    disabled={isRunning}
                    title="Remove"
                  >✕</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
