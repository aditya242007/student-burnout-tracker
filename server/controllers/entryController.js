import { calculateBurnoutScore, getBurnoutLevel, getRecommendations } from '../utils/burnout.js';

/**
 * In-memory store (used when MongoDB is not available)
 * Entries are stored as an array and queried by userId
 */
let memoryStore = [];
let idCounter = 1;

/**
 * Get the Entry model if MongoDB is connected, otherwise null
 */
async function getEntryModel() {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.default.connection.readyState === 1) {
      // MongoDB is connected — import the model
      const Entry = (await import('../models/Entry.js')).default;
      return Entry;
    }
  } catch {
    // MongoDB not available
  }
  return null;
}

/**
 * Create a new burnout entry
 * POST /api/entries
 */
export async function createEntry(req, res) {
  try {
    const { sleepHours, studyHours, stressLevel, screenTime = 0, userId = 'anonymous' } = req.body;

    // Validation
    if (sleepHours == null || studyHours == null || stressLevel == null) {
      return res.status(400).json({ error: 'sleepHours, studyHours, and stressLevel are required' });
    }

    // Calculate burnout
    const burnoutScore = calculateBurnoutScore({ sleepHours, studyHours, stressLevel, screenTime });
    const burnoutLevel = getBurnoutLevel(burnoutScore);

    const entryData = {
      userId,
      sleepHours: Number(sleepHours),
      studyHours: Number(studyHours),
      stressLevel: Number(stressLevel),
      screenTime: Number(screenTime),
      burnoutScore,
      burnoutLevel,
    };

    let entry;
    const Entry = await getEntryModel();

    if (Entry) {
      // MongoDB mode
      entry = await Entry.create(entryData);
    } else {
      // In-memory mode
      entry = {
        ...entryData,
        _id: String(idCounter++),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memoryStore.push(entry);
    }

    // Generate recommendations
    const recommendations = getRecommendations({
      sleepHours: Number(sleepHours),
      studyHours: Number(studyHours),
      stressLevel: Number(stressLevel),
      screenTime: Number(screenTime),
      burnoutLevel
    });

    res.status(201).json({ entry, recommendations });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: 'Failed to create entry' });
  }
}

/**
 * Get all entries for a user
 * GET /api/entries/:userId
 */
export async function getEntries(req, res) {
  try {
    const { userId } = req.params;
    const { limit = 30, page = 1 } = req.query;
    const limitNum = Number(limit);
    const pageNum = Number(page);

    let entries, total;
    const Entry = await getEntryModel();

    if (Entry) {
      entries = await Entry.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);
      total = await Entry.countDocuments({ userId });
    } else {
      const userEntries = memoryStore
        .filter(e => e.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      total = userEntries.length;
      entries = userEntries.slice((pageNum - 1) * limitNum, pageNum * limitNum);
    }

    res.json({
      entries,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
}

/**
 * Get aggregated stats for a user
 * GET /api/entries/:userId/stats
 */
export async function getStats(req, res) {
  try {
    const { userId } = req.params;
    const Entry = await getEntryModel();

    let entries;
    if (Entry) {
      entries = await Entry.find({ userId }).sort({ createdAt: 1 });
    } else {
      entries = memoryStore
        .filter(e => e.userId === userId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (entries.length === 0) {
      return res.json({
        distribution: { Low: 0, Moderate: 0, High: 0 },
        averages: { sleepHours: 0, studyHours: 0, stressLevel: 0, screenTime: 0, burnoutScore: 0 },
        timeSeries: [],
        totalEntries: 0
      });
    }

    // Calculate distribution and averages
    const distribution = { Low: 0, Moderate: 0, High: 0 };
    let totalSleep = 0, totalStudy = 0, totalStress = 0, totalScreen = 0, totalScore = 0;

    entries.forEach(e => {
      distribution[e.burnoutLevel]++;
      totalSleep += e.sleepHours;
      totalStudy += e.studyHours;
      totalStress += e.stressLevel;
      totalScreen += e.screenTime;
      totalScore += e.burnoutScore;
    });

    const count = entries.length;

    // Time series (last 14 entries)
    const timeSeries = entries.slice(-14).map(e => ({
      date: e.createdAt,
      burnoutScore: e.burnoutScore,
      sleepHours: e.sleepHours,
      studyHours: e.studyHours,
      stressLevel: e.stressLevel
    }));

    res.json({
      distribution,
      averages: {
        sleepHours: Math.round((totalSleep / count) * 10) / 10,
        studyHours: Math.round((totalStudy / count) * 10) / 10,
        stressLevel: Math.round((totalStress / count) * 10) / 10,
        screenTime: Math.round((totalScreen / count) * 10) / 10,
        burnoutScore: Math.round((totalScore / count) * 10) / 10
      },
      timeSeries,
      totalEntries: count
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

/**
 * Delete a single entry
 * DELETE /api/entries/:id
 */
export async function deleteEntry(req, res) {
  try {
    const { id } = req.params;
    const Entry = await getEntryModel();

    if (Entry) {
      const deleted = await Entry.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Entry not found' });
    } else {
      const index = memoryStore.findIndex(e => e._id === id);
      if (index === -1) return res.status(404).json({ error: 'Entry not found' });
      memoryStore.splice(index, 1);
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
}
