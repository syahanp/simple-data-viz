import { useEffect, useState } from "react"
import {
  durationData,
  sessionsData,
  totalUsersData,
  newUsersData,
  activeUsers,
} from "../../mock/lineChartData"

const ALL_DATA = [
  totalUsersData,
  newUsersData,
  sessionsData,
  durationData,
  activeUsers,
]

const useOrgPerformData = () => {
  const [orgData, setOrgData] = useState([])
  const [activeOrgTab, setActiveOrgTab] = useState<string>()

  useEffect(() => {
    setOrgData(ALL_DATA)

    setActiveOrgTab(ALL_DATA[0].type)
  }, [orgData])

  const getCurrentOrgData = () => {
    const current = orgData.find(item => item.type === activeOrgTab)

    return current
  }

  return {
    orgData,
    activeOrgTab,
    setActiveOrgTab,
    getCurrentOrgData,
  }
}

export default useOrgPerformData
