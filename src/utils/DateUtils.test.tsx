import { describe, expect, it } from "@jest/globals"
import { sortMapByDayOfWeek } from "./DateUtils"

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
