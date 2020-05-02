import React from "react";
import { Line } from "react-chartjs-2";

export default function LineGraph({ title, data }) {
  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: title,
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
}
