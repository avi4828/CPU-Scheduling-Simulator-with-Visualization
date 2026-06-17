export default function Controls({
  isRunning, isPaused, isComplete, stepMode, speed, currentTime, totalDuration,
  onStart, onPause, onResume, onReset, onStep, onSpeedChange, onStepModeChange,
  processCount,
}) {
  const canStart = processCount > 0 && !isRunning;
  const progress = totalDuration > 0 ? Math.min(((currentTime + 1) / totalDuration) * 100, 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Progress bar */}
      {totalDuration > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-low)', marginBottom: 4, fontFamily: 'monospace' }}>
            <span>t = {Math.max(0, currentTime)}</span>
            <span>{totalDuration} units</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Start / Pause / Resume + Reset */}
      <div style={{ display: 'flex', gap: 6 }}>
        {!isRunning && !isPaused ? (
          <button id="start-btn" className="btn btn-primary btn-full" onClick={onStart} disabled={!canStart}>
            &#9654; Start
          </button>
        ) : isRunning ? (
          <button id="pause-btn" className="btn btn-secondary btn-full" onClick={onPause}>
            &#9646;&#9646; Pause
          </button>
        ) : (
          <button id="resume-btn" className="btn btn-primary btn-full" onClick={onResume} disabled={isComplete}>
            &#9654; Resume
          </button>
        )}
        <button id="reset-btn" className="btn btn-secondary" onClick={onReset}>
          &#8635; Reset
        </button>
      </div>

      {/* Step mode */}
      <div className="toggle-row">
        <span>Step Mode</span>
        <div className="toggle-wrap">
          <input
            id="step-mode-toggle"
            type="checkbox"
            className="toggle"
            checked={stepMode}
            onChange={(e) => onStepModeChange(e.target.checked)}
          />
          {stepMode && (
            <button
              id="step-btn"
              className="btn btn-secondary btn-sm"
              onClick={onStep}
              disabled={isComplete}
            >
              Step &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Speed */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
          <span style={{ color: 'var(--text-mid)' }}>Speed</span>
          <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 700 }}>{speed}x</span>
        </div>
        <input
          id="speed-slider"
          type="range"
          min="0.5" max="5" step="0.5"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-low)', marginTop: 2 }}>
          <span>0.5x</span><span>5x</span>
        </div>
      </div>
    </div>
  );
}
