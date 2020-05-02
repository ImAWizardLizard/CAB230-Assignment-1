import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { getDateStock } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineGraph from "../components/LineGraph";
import { format } from "date-fns";
import { Input, Button, Box, Grid } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Paper from "@material-ui/core/Paper";

// TODO: Potentially visualizations
// bar graph / pie chart of Low, High, Close, Open by industry
// list of Top ten industrys by High, Low, Close, Open

export default function PriceHistory() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm();

  const columns = [
    {
      headerName: "Timestamp",
      field: "timestamp",
      sortable: true,
    },
    {
      headerName: "Sybmol",
      field: "symbol",
      filter: true,
    },
    {
      headerName: "Industry",
      field: "industry",
      filter: true,
    },
    {
      headerName: "Open",
      field: "open",
      sortable: true,
    },
    {
      headerName: "High",
      field: "high",
      sortable: true,
    },
    {
      headerName: "Low",
      field: "low",
      sortable: true,
    },
    {
      headerName: "Close",
      field: "close",
      sortable: true,
    },
    {
      headerName: "Volumes",
      field: "volumes",
      sortable: true,
    },
  ];

  const onSubmit = ({ symbol, fromDate, toDate }) => {
    getDateStock(
      symbol,
      fromDate ? fromDate.toISOString() : null,
      toDate ? toDate.toISOString() : null
    ).then((response) => {
      if (response.status === 404) {
        setError(response.data.message);
      } else {
        setStocks(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      }
    });
  };
  // TODO: Make the symbol field required
  return (
    <div>
      <Box>
        <h3>Price History</h3>
        <h3>{error}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={Input}
            name="symbol"
            control={control}
            defaultValue=""
          />
          <Controller
            as={
              <DatePicker
                placeholderText="Click to select a start date"
                dateFormat="yyyy-MM-dd"
                autoComplete="off"
              />
            }
            name="fromDate"
            control={control}
            defaultValue=""
            valueName="selected" // DateSelect value's name is selected
            onChange={([selected]) => {
              return selected;
            }}
          />
          <Controller
            as={
              <DatePicker
                placeholderText="Click to select an end date"
                dateFormat="yyyy-MM-dd"
                autoComplete="off"
              />
            }
            name="toDate"
            control={control}
            defaultValue=""
            valueName="selected" // DateSelect value's name is selected
            onChange={([selected]) => {
              return selected;
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
        {/* TODO: Insert highest high, lowest low...information cards */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <div
                className="ag-theme-balham"
                style={{
                  height: "300px",
                }}
              >
                <AgGridReact
                  columnDefs={columns}
                  rowData={stocks}
                  pagination={true}
                  paginationPageSize={8}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <LineGraph
                title="Open Price"
                data={{
                  labels: stocks
                    .map((stock) =>
                      format(Date.parse(stock.timestamp), "yyyy-L-d")
                    )
                    .reverse(),
                  datasets: [
                    {
                      label: "price",
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: "rgba(75,192,192,1)",
                      borderColor: "rgba(0,0,0,1)",
                      borderWidth: 2,
                      data: stocks.map((stock) => stock.open),
                    },
                  ],
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>
              <LineGraph
                title="Closing Price"
                data={{
                  labels: stocks
                    .map((stock) =>
                      format(Date.parse(stock.timestamp), "yyyy-L-d")
                    )
                    .reverse(),
                  datasets: [
                    {
                      label: "price",
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: "rgba(75,192,192,1)",
                      borderColor: "rgba(0,0,0,1)",
                      borderWidth: 2,
                      data: stocks.map((stock) => stock.close),
                    },
                  ],
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>
              <LineGraph
                title="High Price"
                data={{
                  labels: stocks
                    .map((stock) =>
                      format(Date.parse(stock.timestamp), "yyyy-L-d")
                    )
                    .reverse(),
                  datasets: [
                    {
                      label: "price",
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: "rgba(75,192,192,1)",
                      borderColor: "rgba(0,0,0,1)",
                      borderWidth: 2,
                      data: stocks.map((stock) => stock.high),
                    },
                  ],
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <LineGraph
                title="Low Price"
                data={{
                  labels: stocks
                    .map((stock) =>
                      format(Date.parse(stock.timestamp), "yyyy-L-d")
                    )
                    .reverse(),
                  datasets: [
                    {
                      label: "price",
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: "rgba(75,192,192,1)",
                      borderColor: "rgba(0,0,0,1)",
                      borderWidth: 2,
                      data: stocks.map((stock) => stock.low),
                    },
                  ],
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
