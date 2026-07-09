// Pure, testable logic extracted from index.html.
// No DOM, no network — safe to import from Node for unit tests.

export const SLOTS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch",     label: "Lunch"     },
  { key: "dinner",    label: "Dinner"    },
];

// Monday of the week containing d (Mon–Sun weeks).
function mondayOf(d) {
  const dayOfWeek = d.getDay(); // 0=Sun
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday;
}

export function getWeekDays(offset, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const monday = mondayOf(today);
  monday.setDate(monday.getDate() + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function dateKey(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function formatDay(d) {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDate(d) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isToday(d, now = new Date()) {
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
}

export function weekRangeLabel(days) {
  const s = days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const e = days[6].toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${s} – ${e}`;
}

// Weeks from the current week that the given plan_date falls in.
export function weekOffsetForDate(planDate, now = new Date()) {
  const mealDate = new Date(planDate + "T12:00:00");
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const thisMonday = mondayOf(today);
  const mealMonday = mondayOf(mealDate);
  return Math.round((mealMonday - thisMonday) / (7 * 86400000));
}

export function memberInitials(members, id) {
  const m = members.find(m => m.id === id);
  if (!m) return "?";
  return m.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export function memberColor(id) {
  const colors = ["#6366f1", "#059669", "#d97706", "#dc2626", "#2563eb", "#7c3aed", "#0891b2"];
  const idx = Math.abs(id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % colors.length;
  return colors[idx];
}

export function formatTime(mins) {
  if (!mins) return "";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
