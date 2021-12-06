import React from "react"
import Section from "common/Section"
import Text from "common/Text"
import PieChart from "common/PieChart"
import { scaleOrdinal } from "@visx/scale"
import { formatDuration } from "utils/formatDuration"
import activeUsersData from "mock/PieChartData"

const getColors = scaleOrdinal({
  domain: activeUsersData.map(x => x.name),
  range: [
    "#3b82f6",
    "#9d76ef",
    "#da67d8",
    "#ff5ab7",
    "#ff5a8f",
    "#ff6c65",
    "#ff883b",
    "#ffa600",
  ],
})

const MostActiveUsers = () => {
  return (
    <Section>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-1 p-4 border-b border-gray-200">
          <PieChart data={activeUsersData} getColors={getColors} />
        </div>

        <div className="col-span-1 py-2">
          <div className="p-4">
            <Text variant="h5">Most Active Users</Text>
          </div>

          <div className="divide-y divide-gray-100 px-4 h-[350px] overflow-y-scroll overscroll-none">
            {activeUsersData.map(item => (
              <div
                key={item.name}
                className="flex justify-between items-center py-2 px-3"
              >
                <div className="flex gap-x-4 items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: getColors(item.name),
                      boxShadow: `1px 3px 25px ${getColors(item.name)}`,
                    }}
                  />
                  <div>
                    <Text>{item.name}</Text>
                    <Text role="secondary">{item.email}</Text>
                  </div>
                </div>

                <div>
                  <Text>{formatDuration(item.value)}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default MostActiveUsers
