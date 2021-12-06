import React from "react"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import Chart from "./Chart"

interface Props {
  data: any[]
  getColors: (val: any) => any
}

const ChartContainer: React.FC<Props> = ({ data, getColors }) => {
  return (
    <ParentSize debounceTime={100} className="flex items-center justify-center">
      {({ width }) => (
        <Chart width={width} height={330} data={data} getColors={getColors} />
      )}
    </ParentSize>
  )
}

export default ChartContainer
