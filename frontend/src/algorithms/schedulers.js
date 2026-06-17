/**
 * CPU Scheduling Algorithm Metadata and Ready Queue helper
 */

// ─── Ready Queue at time t ──────────────────────────────────
export function getReadyQueueAtTime(processes, timeline, time, algorithm) {
  // Find which process is running at this time
  const runningEntry = timeline.find(t => t.startTime <= time && t.endTime > time);
  const runningId = runningEntry ? runningEntry.processId : null;

  // Processes that have arrived but haven't fully completed by this time
  const readyProcesses = processes.filter(proc => {
    if (proc.arrivalTime > time) return false;
    const entries = timeline.filter(t => t.processId === proc.id);
    const ct = Math.max(...entries.map(e => e.endTime));
    return ct > time; // still has work to do at this time
  });

  return {
    running: runningId,
    waiting: readyProcesses.filter(p => p.id !== runningId).map(p => p.id),
  };
}

// ─── Algorithm map ──────────────────────────────────────────
export const ALGORITHMS = {
  fcfs: { name: 'FCFS', fullName: 'First Come First Served', description: 'Processes are executed in the order they arrive. Simple but can cause convoy effect.' },
  sjf: { name: 'SJF', fullName: 'Shortest Job First', description: 'Selects the process with the shortest burst time. Optimal average waiting time but non-preemptive.' },
  srtf: { name: 'SRTF', fullName: 'Shortest Remaining Time First', description: 'Preemptive version of SJF. Preempts current process if a shorter one arrives.' },
  priority: { name: 'Priority', fullName: 'Priority Scheduling', description: 'Executes the highest priority process first (lower number = higher priority).' },
  rr: { name: 'RR', fullName: 'Round Robin', description: 'Each process gets a fixed time quantum. Fair allocation with context switching overhead.' },
  mlq: { name: 'MLQ', fullName: 'Multilevel Queue', description: 'Processes are classified into queues by priority. Q1(1-2):RR, Q2(3-4):SJF, Q3(5+):FCFS.' },
};
