import React from "react";
import { useState } from "react";
import { getStock } from "../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Quote() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stock, setStock] = useState({});

  const columns = [
    { headerName: "Timestamp", field: "timestamp" },
    { headerName: "Sybmol", field: "symbol" },
    { headerName: "Industry", field: "industry" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volumes", field: "volumes" },
  ];

  return (
    <div>
      <h3>Quote</h3>
      <input
        id="stock-symbol"
        name="stock-symbol"
        value={stockSymbol}
        onChange={(event) => setStockSymbol(event.target.value)}
      />
      <button
        id="search-button"
        type="button"
        onClick={() => getStock(stockSymbol).then((stock) => setStock(stock))}
      >
        Submit
      </button>
      <div
        className="ag-theme-balham"
        style={{ height: "80px", width: "1500px" }}
      >
        <AgGridReact columnDefs={columns} rowData={[stock]} />
      </div>
    </div>
  );
}
