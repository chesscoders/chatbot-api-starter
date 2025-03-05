import { runSeeds } from 'express-goodies/functions';
import { identities } from './seeds';

const seed = async () => {
  // Add all collection seeds below
  await identities.seed();
};

const seedMongoDb = async () => {
  await runSeeds(seed);
};

// Execute the seeds
seedMongoDb();
