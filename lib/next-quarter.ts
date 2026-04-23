const LEAD_DAYS = 45;

export function nextQuarter(now: Date = new Date()): {
  quarter: 1 | 2 | 3 | 4;
  year: number;
} {
  const threshold = new Date(now);
  threshold.setDate(threshold.getDate() + LEAD_DAYS);

  const tMonth = threshold.getMonth();
  const tYear = threshold.getFullYear();
  const tQuarterIdx = Math.floor(tMonth / 3);
  const tQuarterStart = new Date(tYear, tQuarterIdx * 3, 1);

  let qIdx = tQuarterIdx;
  let year = tYear;
  if (threshold.getTime() > tQuarterStart.getTime()) {
    qIdx += 1;
    if (qIdx > 3) {
      qIdx = 0;
      year += 1;
    }
  }

  return { quarter: (qIdx + 1) as 1 | 2 | 3 | 4, year };
}
