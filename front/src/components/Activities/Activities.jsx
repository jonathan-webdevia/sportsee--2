import styled from "styled-components";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import APIClass from "../../services/APIClass";
import { useEffect, useState } from "react";

import { styleVar } from "../../utils/style/styleVariables";
import { ACTIVITIES_ORDER } from "../../utils/const";

export function Activities({ userId }) {
  const [activities, setActivities] = useState({});

  useEffect(() => {
    const getData = new APIClass(userId, "activities");
    getData
      .getActivities()
      .then((response) => {
        return response;
      })
      .then((data) => {
        const ordered = [];
        for (let activity of ACTIVITIES_ORDER) {
          for (let elmt of data) {
            if (elmt.activity === activity) {
              ordered.push({
                activity: activity,
                value: elmt.value,
              });
            }
          }
        }
        setActivities(ordered);
      });
  }, [userId]);

  return (
    <ActivitiesChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={activities}
          outerRadius={window.innerWidth > 1340 ? "70%" : "60%"}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="activity"
            stroke="white"
            dy={4}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <Radar
            dataKey="value"
            fill={`${styleVar.redColor}`}
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </ActivitiesChartContainer>
  );
}

const ActivitiesChartContainer = styled.div`
  background: ${styleVar.neutral800};
  font-size: 0.8rem;
`;
