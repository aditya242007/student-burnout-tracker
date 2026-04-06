import { Router } from 'express';
import { createEntry, getEntries, getStats, deleteEntry } from '../controllers/entryController.js';

const router = Router();

// Create a new burnout entry
router.post('/', createEntry);

// Get all entries for a user
router.get('/:userId', getEntries);

// Get aggregated stats for charts
router.get('/:userId/stats', getStats);

// Delete an entry
router.delete('/:id', deleteEntry);

export default router;
