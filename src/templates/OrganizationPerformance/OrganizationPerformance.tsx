import React from "react"
import Text from "common/Text"
import TabOverview from "common/TabOverview"
import Section from "common/Section"
import LineChart from "common/LineChart"
import useOrgPerformData from "./useOrgPerformData"

const OrganizationPerformance = () => {
  const { orgData, activeOrgTab, setActiveOrgTab, getCurrentOrgData } =
    useOrgPerformData()

  const currentData = getCurrentOrgData()

  return (
    <Section>
      <div className="p-4 border-b border-gray-200">
        <Text variant="h5">Organization Performance</Text>
      </div>

      <div className="flex flex-1 items-start w-full">
        {orgData.map((item: any) => {
          return (
            <TabOverview
              key={item.type}
              type={item.type}
              label={item.label}
              value={item.total_value}
              value_type={item.yScale_type}
              hint={item.hint}
              trend={item.trend}
              percentage={item.percentage}
              isActive={activeOrgTab === item.type}
              onTabClick={setActiveOrgTab}
            />
          )
        })}
      </div>

      <div className="p-4">
        <LineChart data={currentData} />
      </div>
    </Section>
  )
}

export default OrganizationPerformance
