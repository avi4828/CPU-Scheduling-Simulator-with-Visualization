import { ALGORITHMS } from '../algorithms/schedulers';

export default function AlgorithmInfo({ algorithm }) {
  const algo = ALGORITHMS[algorithm];
  if (!algo) return null;

  const traits = {
    fcfs:     ['Non-preemptive', 'Convoy Effect', 'Simple'],
    sjf:      ['Non-preemptive', 'Optimal Avg WT', 'Starvation Risk'],
    srtf:     ['Preemptive', 'Optimal', 'High Overhead'],
    priority: ['Non-preemptive', 'Priority Based', 'Starvation Risk'],
    rr:       ['Preemptive', 'Time Quantum', 'Fair Sharing'],
    mlq:      ['Multi-level', 'Queue Classification', 'Priority Queues'],
  };

  const tags = traits[algorithm] || [];

  return (
    <div className="card">
      <div className="card-header">Algorithm Details</div>
      <div className="card-body">
        <div className="algo-name">{algo.fullName}</div>
        <div className="algo-abbr">{algo.name}</div>
        <p className="algo-desc">{algo.description}</p>
        <div>
          {tags.map(tag => (
            <span key={tag} className="algo-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
