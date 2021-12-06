import { min, max } from "d3-array"

export const getMinMaxValue = (value: any[], valueOf: (d: any) => typeof d) => {
  let minValue: number, maxValue: number

  if (valueOf === undefined) {
    minValue = min(value)
    maxValue = max(value)
    return [minValue, maxValue]
  }

  minValue = min(value, valueOf)
  maxValue = max(value, valueOf)
  return [minValue, maxValue]
}
