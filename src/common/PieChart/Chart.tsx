import React, { useCallback } from "react"
import { Pie } from "@visx/shape"
import { Group } from "@visx/group"
import { localPoint } from "@visx/event"
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip"
import { formatDuration } from "utils/formatDuration"
import Text from "common/Text"

interface Props {
  width: number
  height: number
  data: any[]
  getColors: (val: any) => any
}

const Chart: React.FC<Props> = ({ width, height, data, getColors }) => {
  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip()

  const handleTooltip = useCallback(
    (event: React.TouchEvent<any> | React.MouseEvent<any>, arcData: any) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 }

      showTooltip({
        tooltipData: arcData,
        tooltipLeft: x,
        tooltipTop: y,
      })
    },
    [showTooltip]
  )

  const getValue = (d: typeof data[0]) => d.value
  const getName = (d: typeof data[0]) => d.name
  const getEmail = (d: typeof data[0]) => d.email

  if (!data) return null

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX + 10}>
          <Pie
            data={data}
            pieValue={getValue}
            outerRadius={radius}
            innerRadius={radius - 55}
            padAngle={0.01}
          >
            {pie => {
              return pie.arcs.map((arc, i) => {
                return (
                  <g key={arc.data.name}>
                    <path
                      d={pie.path(arc)}
                      fill={getColors(arc.data.name)}
                      onTouchStart={e => handleTooltip(e, arc.data)}
                      onTouchMove={e => handleTooltip(e, arc.data)}
                      onMouseMove={e => handleTooltip(e, arc.data)}
                      onMouseLeave={hideTooltip}
                    />
                  </g>
                )
              })
            }}
          </Pie>
        </Group>
      </svg>

      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            className="p-2 shadow-lg"
            style={defaultStyles}
          >
            <div className="mb-2">
              <Text className="!text-size-14 mb-0">{getName(tooltipData)}</Text>
              <Text role="secondary" className="!text-size-14">
                {getEmail(tooltipData)}
              </Text>
            </div>

            <Text className="!font-bold !text-size-14">
              {formatDuration(getValue(tooltipData))}
            </Text>
          </TooltipWithBounds>
        </div>
      )}
    </div>
  )
}

export default Chart
