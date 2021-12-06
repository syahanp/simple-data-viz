import React from "react"
import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/outline"
import Text from "common/Text"

interface Props {
  trend: "up" | "down" | "none"
  percentage: number
}

const Trend: React.FC<Props> = ({ trend, percentage }) => {
  if (trend === "none") {
    return (
      <div className="flex items-center">
        <Text role="secondary">{percentage}%</Text>
      </div>
    )
  }

  if (trend === "up") {
    return (
      <div className="flex items-center -ml-1">
        <ArrowSmUpIcon className="h-5 w-5 text-green-500" />
        <Text className="!text-green-500">{percentage}%</Text>
      </div>
    )
  }

  return (
    <div className="flex items-center -ml-1">
      <ArrowSmDownIcon className="h-5 w-5 text-red-500" />
      <Text className="!text-red-500">{percentage}%</Text>
    </div>
  )
}

export default Trend
