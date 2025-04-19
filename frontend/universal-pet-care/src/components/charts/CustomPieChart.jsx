import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useColorMapping from "../hooks/ColorMapping";
export const CustomPieChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  width = "80%",
  height = 400,
}) => {
  const colors = useColorMapping();
  return (
    <section>
      <h4 className="text-center mt-2">Appointment Overview</h4>
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            dataKey={dataKey}
            data={data}
            label={({ [nameKey]: name }) => name}
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
              ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};
