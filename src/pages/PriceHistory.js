import React, { useState } from "react";
import { getDateStock } from "../api";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Grid, Input, Paper, makeStyles } from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "react-datepicker/dist/react-datepicker.css";
import StockGraph from "../components/StockGraph";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
}));

export default function PriceHistory() {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

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
      fromDate ? fromDate.toISOString() : new Date(2019, 11, 6).toISOString(),
      toDate ? toDate.toISOString() : new Date(2020, 3, 23).toISOString()
    ).then((response) => {
      if (response.status === 404) {
        setError(response.data.message);
        setRows([]);
        setData([]);
      } else {
        if (Array.isArray(response.data)) {
          setRows(response.data);
          setData(response.data);
        }
      }
    });
  };

  return (
    <div>
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="flex-end" spacing={8}>
              <Grid item>
                <ShowChartIcon />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <Controller
                  as={<Input required />}
                  name="symbol"
                  control={control}
                  defaultValue=""
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" spacing={8}>
              <Grid item>
                <CalendarTodayIcon />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
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
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" spacing={8}>
              <Grid item>
                <CalendarTodayIcon />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
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
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Paper>
      <Box>
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
                  rowData={rows}
                  pagination={true}
                  paginationPageSize={8}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <StockGraph title="Stock History Data" data={data} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
