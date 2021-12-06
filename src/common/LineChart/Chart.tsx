import React, { useCallback, useEffect, useMemo, useState } from "react"

import { bisector } from "d3-array"
import { scaleLinear, scaleTime } from "@visx/scale"
import { Group } from "@visx/group"
import { Axis } from "@visx/axis"
import { GridRows, GridColumns } from "@visx/grid"
import { AreaClosed, LinePath, Bar, Line } from "@visx/shape"
import { curveCatmullRom } from "@visx/curve"
import { LinearGradient } from "@visx/gradient"
import { localPoint } from "@visx/event"
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip"
import { formatDate } from "utils/date"
import { formatDuration } from "utils/formatDuration"
import { formatNumber } from "utils/formatNumber"
import { animate, AnimateSharedLayout } from "framer-motion"
import Text from "common/Text"

interface DataType {
  date: Date
  value: number
}

interface Props {
  width: number
  height: number
  data: any
  yScaleType?: "number" | "duration"
}

const colors = {
  coordinate: "#E5E7EB",
  grid: "#F3F4F6",
  ticksLabel: "#98A7C0",
  linePath: "#60A5FA",
  line: "#93C5FD",
}

const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 30,
}

const Chart = ({ width, height, data }: Props) => {
  const [animateHeight, setAnimateHeight] = useState(0)

  // initialize svg component to motion
  useEffect(() => {
    setAnimateHeight(0)

    const control = animate(0, 1, {
      duration: 0.3,
      onUpdate: val => setAnimateHeight(val),
    })

    return () => {
      setAnimateHeight(0)
      control.stop()
    }
  }, [data])

  // set boundaries of the chart
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<DataType>()

  // date scale
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: [data?.min_date, data?.max_date],
        range: [0, xMax],
        nice: true,
      }),
    [data?.max_date, data?.min_date, xMax]
  )

  // value scale
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [data?.min_value, data?.max_value],
        range: [yMax, 0],
        nice: true,
      }),
    [data?.max_value, data?.min_value, yMax]
  )

  // accessors
  const getDate = (d: DataType) => new Date(d.date)
  const getValue = (d: DataType) => d.value

  const yScale_type = useMemo(() => data?.yScale_type, [data])
  const isScaleYDuration = yScale_type === "duration"

  const bisectDate = useMemo(
    () => bisector<DataType, Date>(d => new Date(d.date)).left,
    []
  )

  // formatting date and duration
  const formats = date => formatDate(date, "dd MMM")
  const formatTooltipDate = date => formatDate(date, "d MMMM yyy")

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      const { x } = localPoint(event) || { x: 0, y: 0 }
      const x0 = xScale.invert(x - margin.left) // min margin left because of group placing
      const index = bisectDate(data.data_points, x0, 1)
      const d0 = data.data_points[index - 1]
      const d1 = data.data_points[index]
      let d = d0
      if (d1 && getDate(d1)) {
        d =
          x0.valueOf() - getDate(d0).valueOf() >
          getDate(d1).valueOf() - x0.valueOf()
            ? d1
            : d0
      }

      if (tooltipLeft !== xScale(getDate(d))) {
        showTooltip({
          tooltipData: d,
          tooltipLeft: xScale(getDate(d)),
          tooltipTop: yScale(getValue(d)),
        })
      }
    },
    [xScale, bisectDate, data, tooltipLeft, showTooltip, yScale]
  )

  if (!data) return null

  return (
    <AnimateSharedLayout>
      <div className="relative">
        <svg height={height} width={width}>
          <Group left={margin.left} top={margin.top}>
            <Axis
              orientation="bottom"
              scale={xScale}
              top={yMax}
              stroke={colors.coordinate}
              numTicks={5}
              strokeWidth={1}
              tickStroke={colors.coordinate}
              tickLabelProps={() => ({
                fill: colors.ticksLabel,
                textAnchor: "middle",
                verticalAnchor: "middle",
                fontSize: 14,
              })}
              tickFormat={value => formats(value)}
            />

            <Axis
              scale={yScale}
              orientation="left"
              left={0}
              numTicks={5}
              stroke={colors.coordinate}
              strokeWidth={1}
              tickStroke={colors.coordinate}
              tickLabelProps={() => ({
                fill: colors.ticksLabel,
                textAnchor: "end",
                verticalAnchor: "middle",
                fontSize: 14,
              })}
              tickFormat={(value: number) => {
                if (isScaleYDuration) {
                  return formatDuration(value, { noHour: true, ceil: true })
                }

                return formatNumber(value).toString()
              }}
            />

            <GridRows
              scale={yScale}
              width={xMax}
              height={yMax}
              stroke={colors.grid}
              numTicks={5}
            />

            <GridColumns
              scale={xScale}
              width={xMax}
              height={yMax}
              numTicks={5}
              stroke={colors.grid}
            />

            <LinearGradient
              id="area-gradient"
              from={"#EFF6FF"}
              fromOpacity={0.6}
              to={"#EFF6FF"}
              toOpacity={0.2}
            />

            <AreaClosed
              data={data.data_points}
              x={(d: DataType) => xScale(new Date(d.date))}
              y={(d: DataType) => {
                const floor_gap = yMax - yScale(d.value)
                const yCord = yMax - floor_gap * animateHeight
                return yCord
              }}
              yScale={yScale}
              fill="url(#area-gradient)"
              stroke="url(#area-gradient)"
              curve={curveCatmullRom}
            />

            <LinePath
              data={data.data_points}
              x={(d: DataType) => xScale(new Date(d.date))}
              y={(d: DataType) => {
                const floor_gap = yMax - yScale(d.value)
                const yCord = yMax - floor_gap * animateHeight

                return yCord
              }}
              stroke={colors.linePath}
              strokeWidth={2}
              curve={curveCatmullRom}
            />

            {/* Tooltips area */}
            <Bar
              width={xMax}
              height={yMax}
              fill="transparent"
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={hideTooltip}
            />

            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 }}
                  to={{ x: tooltipLeft, y: yMax }}
                  stroke={colors.line}
                  strokeWidth={1}
                  pointerEvents="none"
                  strokeDasharray="7,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={10}
                  fill="#fff"
                  stroke={"#93C5FD"}
                  strokeWidth={6}
                  strokeOpacity={0.15}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={5}
                  fill="#3B82F6"
                  stroke={"#fff"}
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
          </Group>
        </svg>

        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop}
              left={tooltipLeft + margin.left + 4}
              className="p-2 shadow-md"
              style={defaultStyles}
            >
              <Text className="mb-2">
                {formatTooltipDate(getDate(tooltipData))}
              </Text>
              <Text className="!font-bold">
                {isScaleYDuration
                  ? formatDuration(getValue(tooltipData))
                  : formatNumber(getValue(tooltipData)).toString()}
              </Text>
            </TooltipWithBounds>
          </div>
        )}
      </div>
    </AnimateSharedLayout>
  )
}

export default Chart
