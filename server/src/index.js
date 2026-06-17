import express from 'express';
import cors from 'cors';
import {
  fcfs,
  sjf,
  srtf,
  priorityScheduling,
  roundRobin,
  multilevelQueue
} from './algorithms/schedulers.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.post('/api/schedule', (req, res) => {
  const { processes, algorithm, timeQuantum } = req.body;

  if (!processes || !Array.isArray(processes)) {
    return res.status(400).json({ error: 'processes must be an array' });
  }
  if (!algorithm) {
    return res.status(400).json({ error: 'algorithm is required' });
  }

  let result;
  try {
    switch (algorithm) {
      case 'fcfs':
        result = fcfs(processes);
        break;
      case 'sjf':
        result = sjf(processes);
        break;
      case 'srtf':
        result = srtf(processes);
        break;
      case 'priority':
        result = priorityScheduling(processes);
        break;
      case 'rr':
        result = roundRobin(processes, Number(timeQuantum) || 2);
        break;
      case 'mlq':
        result = multilevelQueue(processes, Number(timeQuantum) || 2);
        break;
      default:
        return res.status(400).json({ error: `Unsupported algorithm: ${algorithm}` });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred during calculation: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
