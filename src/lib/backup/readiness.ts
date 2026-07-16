export function calculateBackupReadiness(
  peakLoad: number,
  essentialCount: number,
) {
  let score = 100;

  /*
   * Large backup loads are
   * harder and more expensive
   * to support.
   */

  if (peakLoad > 2500) {
    score -= 35;
  } else if (peakLoad > 1800) {
    score -= 20;
  } else if (peakLoad > 1000) {
    score -= 10;
  }

  /*
   * Too many essential appliances
   * usually means higher costs.
   */

  if (essentialCount > 8) {
    score -= 15;
  }

  return Math.max(score, 40);
}