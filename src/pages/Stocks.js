import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { getStocks, getStock } from "../api";
import axios from "axios";

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
    <div
      className="ag-theme-balham"
      style={{
        height: "300px",
        width: "1500px",
      }}
    >
      <h3>Stocks</h3>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <AgGridReact
          columnDefs={columns}
          rowData={stocks}
          pagination={true}
          paginationPageSize={8}
        />
      )}
    </div>
  );
}
