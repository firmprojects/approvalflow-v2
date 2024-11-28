import { db } from '@/lib/db';
import { contracts } from '@/lib/db/schema';
import { ContractAnalysisResult, User } from '@/lib/types';
import { notifyContractAnalysis } from './notifications';

export async function saveContractAnalysis(
  analysis: ContractAnalysisResult,
  user: User
) {
  const [savedContract] = await db
    .insert(contracts)
    .values({
      ...analysis,
      uploadedById: user.id,
    })
    .returning();

  // Notify user of completed analysis
  await notifyContractAnalysis(analysis, user);

  return savedContract;
}