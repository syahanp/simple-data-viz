export interface ITab {
  label: string
  value: string | number
  trend: "up" | "down" | "none"
  percentage: number
}

interface IDataPoint {
  value: number
  date: Date
}
interface ILineChartData {
  type: string
  label: string
  hint?: string
  min_value: number
  max_value: number
  min_date: Date
  max_date: Date
  total_value: number
  trend: "up" | "down" | "none"
  yScale_type: "number" | "duration"
  data: IDataPoint[]
}
