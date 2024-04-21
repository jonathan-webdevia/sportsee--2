import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import APIClass from "../../services/APIClass";
import { useEffect, useState } from "react";

import {
  AverageSessionsChartContainer,
  AverageSessionsChartTitle,
  TooltipContainer,
} from "../../utils/style/Average";

export function AverageSessionsChart({ userId }) {
  const [average, setAverage] = useState({});

  useEffect(() => {
    const getData = new APIClass(userId, "average-sessions");
    getData
      .getAverageSessions()
      .then((response) => {
        return response;
      })
      .then((data) => {
        setAverage(data);
      });
  }, [userId]);

  return (
    <AverageSessionsChartContainer>
      <AverageSessionsChartTitle>
        Durée moyenne des sessions
      </AverageSessionsChartTitle>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={average}
          outerRadius="75%"
          margin={{ top: 0, right: 12, bottom: 24, left: 12 }}
        >
          <XAxis
            dataKey="day"
            stroke="rgba(255, 255, 255, 0.6)"
            axisLine={false}
            dy={10}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <YAxis
            dataKey="sessionLength"
            domain={[0, "dataMax + 60"]}
            hide={true}
          />
          <Line
            dataKey="sessionLength"
            type={"monotone"}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255,255,255, 0.6)",
              strokeWidth: 10,
              r: 5,
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(0, 0, 0, 0.1)",
              strokeWidth: 32,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AverageSessionsChartContainer>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload) {
    return <TooltipContainer>{`${payload[0].value} min`}</TooltipContainer>;
  }

  return null;
}
