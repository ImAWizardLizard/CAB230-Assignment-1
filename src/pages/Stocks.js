import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { getStocks, getStock } from "../api";
import axios from "axios";
import { Paper, Grid } from "@material-ui/core";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getStocks().then((stocks) => {
      axios
        .all(
          stocks.data.map((stock) => {
            return getStock(stock.symbol).then((stock) => stock.data);
          })
        )
        .then(
          axios.spread((...responses) => {
            setStocks(responses);
            setLoading(false);
          })
        );
    });
  }, []);

  return (
    <Paper>
      {loading ? (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Loading Stocks</Typography>
          </Grid>
        </Grid>
      ) : (
        <div
          className="ag-theme-balham"
          style={{
            height: "620px",
            width: "1500px",
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={stocks}
            pagination={true}
            paginationAutoPageSize={true}
          />
        </div>
      )}
    </Paper>
  );
}
