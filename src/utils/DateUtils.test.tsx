import { describe, expect, it } from "@jest/globals"
import { sortMapByDayOfWeek, sortMapByWeek } from "./DateUtils"

describe("sortMapByDayOfWeek", () => {
  it("should sort the map by day of week", () => {
    const map = new Map<string, number>([
      ["Monday", 1],
      ["Wednesday", 1],
      ["Friday", 1],
      ["Tuesday", 1],
      ["Thursday", 1],
      ["Sunday", 1],
      ["Saturday", 1],
    ])

    const sortedMap = sortMapByDayOfWeek(map)

    const expectedMap = new Map<string, number>([
      ["Sunday", 1],
      ["Monday", 1],
      ["Tuesday", 1],
      ["Wednesday", 1],
      ["Thursday", 1],
      ["Friday", 1],
      ["Saturday", 1],
    ])

    expect(sortedMap).toEqual(expectedMap)
  })
})

describe("sortMapByWeek", () => {
  it("should sort the map by week", () => {
    const map = new Map<string, number>([
      ["Jan 8 2024", 1],
      ["Jan 1 2024", 1],
      ["Feb 14 2024", 1],
      ["Nov 4 2023", 1],
    ])

    const sortedMap = sortMapByWeek(map)

    const expectedMap = new Map<string, number>([
      ["Nov 4 2023", 1],
      ["Jan 1 2024", 1],
      ["Jan 8 2024", 1],
      ["Feb 14 2024", 1],
    ])

    expect(sortedMap).toEqual(expectedMap)
  })
})
