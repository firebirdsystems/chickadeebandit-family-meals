import { describe, it, expect } from "vitest";
import {
  SLOTS, getWeekDays, dateKey, formatDay, formatDate, isToday, weekRangeLabel,
  weekOffsetForDate, memberInitials, memberColor, formatTime,
} from "../src/logic.js";

// A Wednesday, noon local time, to avoid TZ boundary flakiness.
const WED = new Date("2026-07-08T12:00:00");

describe("getWeekDays", () => {
  it("returns 7 days starting Monday", () => {
    const days = getWeekDays(0, WED);
    expect(days).toHaveLength(7);
    expect(days[0].getDay()).toBe(1); // Monday
    expect(days[6].getDay()).toBe(0); // Sunday
  });
  it("shifts by whole weeks with offset", () => {
    const base = getWeekDays(0, WED)[0];
    const next = getWeekDays(1, WED)[0];
    expect(Math.round((next - base) / 86400000)).toBe(7);
  });
});

describe("dateKey", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(dateKey(new Date("2026-07-08T12:00:00Z"))).toBe("2026-07-08");
  });
});

describe("formatDay / formatDate / weekRangeLabel", () => {
  it("formats a weekday and date", () => {
    expect(formatDay(WED)).toBe("Wed");
    expect(formatDate(WED)).toBe("Jul 8");
  });
  it("labels a week range", () => {
    expect(weekRangeLabel(getWeekDays(0, WED))).toBe("Jul 6 – Jul 12");
  });
});

describe("isToday", () => {
  it("is true for the same calendar day", () => {
    expect(isToday(new Date("2026-07-08T09:00:00"), WED)).toBe(true);
  });
  it("is false for a different day", () => {
    expect(isToday(new Date("2026-07-09T09:00:00"), WED)).toBe(false);
  });
});

describe("weekOffsetForDate", () => {
  it("is 0 for a date in the current week", () => {
    expect(weekOffsetForDate("2026-07-08", WED)).toBe(0);
  });
  it("is positive for future weeks and negative for past", () => {
    expect(weekOffsetForDate("2026-07-15", WED)).toBe(1);
    expect(weekOffsetForDate("2026-07-01", WED)).toBe(-1);
  });
});

describe("memberInitials", () => {
  const members = [{ id: "a", name: "Alex Rivera" }, { id: "b", name: "Sam" }];
  it("uses up to two initials", () => expect(memberInitials(members, "a")).toBe("AR"));
  it("handles single-word names", () => expect(memberInitials(members, "b")).toBe("S"));
  it("falls back to ? for unknown", () => expect(memberInitials(members, "z")).toBe("?"));
});

describe("memberColor", () => {
  it("is deterministic and in-palette", () => {
    const palette = ["#6366f1", "#059669", "#d97706", "#dc2626", "#2563eb", "#7c3aed", "#0891b2"];
    expect(memberColor("abc")).toBe(memberColor("abc"));
    expect(palette).toContain(memberColor("abc"));
  });
});

describe("formatTime", () => {
  it("returns empty for falsy minutes", () => expect(formatTime(0)).toBe(""));
  it("formats sub-hour", () => expect(formatTime(45)).toBe("45m"));
  it("formats exact hours", () => expect(formatTime(120)).toBe("2h"));
  it("formats hours and minutes", () => expect(formatTime(95)).toBe("1h 35m"));
});

describe("SLOTS", () => {
  it("lists the three meal slots", () => {
    expect(SLOTS.map(s => s.key)).toEqual(["breakfast", "lunch", "dinner"]);
  });
});
