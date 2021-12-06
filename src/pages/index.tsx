import React from "react"
import OrganizationPerformance from "templates/OrganizationPerformance"
import MostActiveUsers from "templates/MostActiveUsers"

const Analytics = () => {
  return (
    <div className="bg-gray-50">
      <div className="py-12 px-8 max-w-[1250px] mx-auto">
        <OrganizationPerformance />

        <br />

        <MostActiveUsers />
      </div>
    </div>
  )
}

export default Analytics
