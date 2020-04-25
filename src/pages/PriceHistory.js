import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { getDateStock } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PriceHistory() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

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

  return (
    <div>
      <h3>Price History</h3>
      <input
        id="symbol"
        name="symbol"
        value={symbol}
        onChange={(event) => setSymbol(event.target.value)}
      />

      <DatePicker
        selected={fromDate}
        onChange={(date) => {
          setFromDate(date);
        }}
        placeholderText="Click to select a start date"
        dateFormat="yyyy-MM-dd"
      />
      <DatePicker
        selected={toDate}
        onChange={(date) => {
          setToDate(date);
        }}
        placeholderText="Click to select an end date"
        dateFormat="yyyy-MM-dd"
      />
      <button
        id="submit"
        type="button"
        onClick={() =>
          getDateStock(
            symbol,
            fromDate ? fromDate.toISOString() : null,
            toDate ? toDate.toISOString() : null
          ).then((stocks) => {
            setStocks(Array.isArray(stocks) ? stocks : [stocks]);
          })
        }
      >
        Submit
      </button>
      <div
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "1500px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={stocks}
          pagination={true}
          paginationPageSize={8}
          // NOTE: This results in the page going blannk
          // overlayLoadingTemplate={
          //   <span class="ag-overlay-loading-center">
          //     Please wait while your rows are loading
          //   </span>
          // }
        />
      </div>
    </div>
  );
}
