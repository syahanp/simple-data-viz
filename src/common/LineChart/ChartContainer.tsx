import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Chart from './Chart';

interface Props {
  data: any
}

const ChartContainer: React.FC<Props> = ({ data }) => {
  return (
    <ParentSize debounceTime={100}>
      {({ width }) => (
        <Chart
          width={width}
          height={320}
          data={data}
        />
      )}
    </ParentSize>
  )
}

export default ChartContainer
