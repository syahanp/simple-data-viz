import React from "react"
import Text from "common/Text"
import Trend from "./Trend"
import { formatNumber } from "../utils/formatNumber"
import { formatDuration } from "../utils/formatDuration"

interface Props {
  label: string
  type: string
  value: number | string
  trend: "up" | "down" | "none"
  percentage: number
  isActive?: boolean
  value_type?: "number" | "duration"
  hint?: string
  onTabClick?: (val: any) => void
}

const TabOverview: React.FC<Props> = ({
  label,
  type,
  value,
  value_type,
  trend,
  percentage,
  isActive,
  onTabClick,
}) => {
  const fontRole = isActive ? "primary" : "secondary"
  const renderValue =
    value_type === "duration"
      ? formatDuration(Number(value))
      : formatNumber(value)

  /**
   * set active tab state based on type
   */
  const handleOnTabClick = () => {
    onTabClick(type)
  }

  return (
    <div
      className="relative w-full px-4 pt-3 pb-1 cursor-pointer hover:bg-gray-50"
      onClick={handleOnTabClick}
    >
      {isActive && <div className="absolute inset-0 h-1 w-full bg-blue-400" />}

      <div className="flex justify-between items-center">
        <Text className="mb-2" role={fontRole}>
          {label}
        </Text>
      </div>

      <Text variant="h4" role={fontRole} className="mb-2">
        {renderValue}
      </Text>

      <Trend trend={trend} percentage={percentage} />
    </div>
  )
}

export default TabOverview
