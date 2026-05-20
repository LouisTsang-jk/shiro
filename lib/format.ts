// Date stored as "YYYY.MM.DD" or ISO. Display variants:
//   • "2026 · 04 · 18"     — header kicker
//   • "Apr · 18 · 2026"   — archive row (omitted by default)
//   • ISO datetime          — <time dateTime="...">

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function parseDate(raw: string): Date {
  // Accept "YYYY.MM.DD", "YYYY-MM-DD", or ISO 8601.
  const dotted = raw.replace(/\./g, "-");
  const d = new Date(dotted);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date: ${raw}`);
  }
  return d;
}

export function formatDateDotted(raw: string): string {
  const d = parseDate(raw);
  const yyyy = d.getFullYear().toString();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy} · ${mm} · ${dd}`;
}

export function formatYear(raw: string): string {
  return String(parseDate(raw).getFullYear());
}

export function formatMonthYear(raw: string): string {
  const d = parseDate(raw);
  return `${MONTHS_LONG[d.getMonth()]} · ${d.getFullYear()}`;
}

export function formatDay(raw: string): string {
  const d = parseDate(raw);
  return String(d.getDate()).padStart(2, "0");
}

export function isoDate(raw: string): string {
  return parseDate(raw).toISOString().slice(0, 10);
}

export function compareDateDesc(a: string, b: string): number {
  return parseDate(b).getTime() - parseDate(a).getTime();
}

export function padNumber(n: number | string, length = 3): string {
  return String(n).padStart(length, "0");
}
