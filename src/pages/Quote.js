import React from "react";
import { useState } from "react";
import { getStock } from "../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Input, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export default function Quote() {
  const { control, handleSubmit } = useForm();
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

  const onSubmit = ({ symbol }) => {
    getStock(symbol).then((stock) => {
      console.log(stock);
      setStock(stock.data);
    });
  };
  // TODO: Make symbol field required
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={Input}
          name="symbol"
          id="symbol"
          control={control}
          defaultValue=""
        />
        <Button type="submit">Submit</Button>
      </form>

      <div
        className="ag-theme-balham"
        style={{ height: "80px", width: "1500px" }}
      >
        <AgGridReact columnDefs={columns} rowData={[stock]} />
      </div>
    </div>
  );
}
