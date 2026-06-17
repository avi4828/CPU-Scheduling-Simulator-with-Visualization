import useSimulation from './hooks/useSimulation';
import InputPanel from './components/InputPanel';
import GanttChart from './components/GanttChart';
import ReadyQueue from './components/ReadyQueue';
import MetricsTable from './components/MetricsTable';
import Controls from './components/Controls';
import AlgorithmInfo from './components/AlgorithmInfo';

export default function App() {
  const sim = useSimulation();
  const readyQueueState = sim.readyQueue();

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div>
            <h1 className="app-title">CPU Scheduling Simulator</h1>
            <p className="app-subtitle">Interactive algorithm visualization &amp; analysis</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {sim.isRunning && <span className="status-badge running">Running…</span>}
            {sim.isComplete && <span className="status-badge done">Complete</span>}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="app-body">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Configuration */}
          <div className="card">
            <div className="card-header">Configuration</div>
            <div className="card-body">
              <InputPanel
                processes={sim.processes}
                algorithm={sim.algorithm}
                timeQuantum={sim.timeQuantum}
                onAddProcess={sim.addProcess}
                onRemoveProcess={sim.removeProcess}
                onAlgorithmChange={(a) => { sim.reset(); sim.setAlgorithm(a); }}
                onTimeQuantumChange={sim.setTimeQuantum}
                onGenerateRandom={sim.generateRandom}
                onClearAll={sim.clearProcesses}
                isRunning={sim.isRunning}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="card">
            <div className="card-header">Controls</div>
            <div className="card-body">
              <Controls
                isRunning={sim.isRunning}
                isPaused={sim.isPaused}
                isComplete={sim.isComplete}
                stepMode={sim.stepMode}
                speed={sim.speed}
                currentTime={sim.currentTime}
                totalDuration={sim.totalDuration}
                onStart={sim.start}
                onPause={sim.pause}
                onResume={sim.resume}
                onReset={sim.reset}
                onStep={sim.step}
                onSpeedChange={sim.setSpeed}
                onStepModeChange={sim.setStepMode}
                processCount={sim.processes.length}
              />
            </div>
          </div>

          {/* Algorithm Info */}
          <AlgorithmInfo algorithm={sim.algorithm} />
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Gantt Chart */}
          <div className="card">
            <div className="card-header">Gantt Chart Timeline</div>
            <div className="card-body">
              <GanttChart
                timeline={sim.timeline}
                processes={sim.processes}
                currentTime={sim.currentTime}
                totalDuration={sim.totalDuration}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
            {/* Ready Queue */}
            <div className="card">
              <div className="card-header">Ready Queue</div>
              <div className="card-body">
                <ReadyQueue
                  readyQueueState={readyQueueState}
                  processes={sim.processes}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="card">
              <div className="card-header">Performance Metrics</div>
              <div className="card-body">
                <MetricsTable
                  metrics={sim.metrics}
                  processes={sim.processes}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
