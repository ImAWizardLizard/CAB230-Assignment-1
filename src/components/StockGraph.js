import React from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns";

export default function StockGraph({ title, data }) {
  const toCandleSticks = (data) => {
    return data.map((stock) => {
      return {
        x: format(Date.parse(stock.timestamp), "yyyy-L-d"),
        y: [stock.open, stock.high, stock.low, stock.close],
      };
    });
  };

  return (
    <Chart
      options={{
        title: {
          text: title,
          align: "Center",
        },
        noData: {
          text: "No Data Available",
          align: "center",
          verticalAlign: "center",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      }}
      series={[{ data: toCandleSticks(data) }]}
      type="candlestick"
      height={350}
    />
  );
}
