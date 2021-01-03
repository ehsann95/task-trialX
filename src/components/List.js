import React, { useState, useEffect } from "react";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-bootstrap4";

import axios from "axios";

import Films from "./Films";
import Vehicles from "./Vehicles";
import Starships from "./Starships";

const getRowId = (row) => {
  return row.name;
};

const availableValues = {
  gender: ["male", "female", "n/a"],
};

const LookupEditCell = ({
  column,
  availableColumnValues,
  value,
  onValueChange,
}) => (
  <td
    style={{
      verticalAlign: "middle",
      padding: 1,
    }}
  >
    <select
      className="form-control"
      style={{ width: "100%", textAlign: column.align }}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {availableColumnValues.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  </td>
);

const EditCell = (props) => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  return <TableEditRow.Cell {...props} />;
};

const List = (props) => {
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    {
      name: "name",
      title: "Name",
    },
    {
      name: "height",
      title: "Height",
    },
    {
      name: "mass",
      title: "Mass",
    },
    {
      name: "bmi",
      title: "BMI",
      getCellValue: (row) => {
        let bmi = (row.mass / row.height / row.height) * 10000;
        return bmi.toFixed(1);
      },
    },
    {
      name: "gender",
      title: "Gender",
    },
    {
      name: "films",
      title: "films",
      getCellValue: (row) => {
        return row.films.length;
      },
    },
    {
      name: "vehicles",
      title: "Vehicles",
      getCellValue: (row) => {
        return row.vehicles.length;
      },
    },
    {
      name: "starships",
      title: "Starships",
      getCellValue: (row) => {
        return row.starships.length;
      },
    },
  ]);

  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [ships, setShips] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const showModal3 = () => {
    setIsModalVisible3(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFilms([]);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
    setVehicles([]);
  };
  const handleCancel3 = () => {
    setIsModalVisible3(false);
    setShips([]);
  };

  const [editingStateColumnExtensions] = useState([
    { columnName: "bmi", editingEnabled: false },
    { columnName: "mass", editingEnabled: false },
    { columnName: "films", editingEnabled: false },
    { columnName: "starships", editingEnabled: false },
    { columnName: "vehicles", editingEnabled: false },
  ]);

  const getData = async () => {
    try {
      const res = await axios.get("https://swapi.dev/api/people/");
      setRows(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const customCell = (props) => {
    const { column, row } = props;
    return (
      <VirtualTable.Cell
        {...props}
        onClick={async () => {
          if (column.name === "films") {
            let arr = [];
            row.films.map(async (film) => {
              let res = await axios.get(film);
              arr.push(res.data);
              setFilms([...arr]);
            });

            showModal();
          } else if (column.name === "vehicles") {
            let arr = [];
            row.vehicles.map(async (vehicle) => {
              let res = await axios.get(vehicle);
              arr.push(res.data);
              setVehicles([...arr]);
            });
            showModal2();
          } else if (column.name === "starships") {
            let arr = [];
            row.starships.map(async (ship) => {
              let res = await axios.get(ship);
              arr.push(res.data);
              setShips([...arr]);
            });
            showModal3();
          }
        }}
      />
    );
  };

  const commitChanges = ({ changed, deleted }) => {
    let changedRows;
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.name] ? { ...row, ...changed[row.name] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.name));
    }
    setRows(changedRows);
  };
  return (
    <>
      <div>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            onCommitChanges={commitChanges}
            columnExtensions={editingStateColumnExtensions}
          />
          <VirtualTable cellComponent={customCell} />
          <TableHeaderRow />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn showEditCommand showDeleteCommand />
        </Grid>
      </div>

      <Films
        showModal={showModal}
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        data={films}
      />
      <Vehicles
        showModal={showModal2}
        handleCancel={handleCancel2}
        isModalVisible={isModalVisible2}
        data={vehicles}
      />
      <Starships
        showModal={showModal3}
        handleCancel={handleCancel3}
        isModalVisible={isModalVisible3}
        data={ships}
      />
    </>
  );
};

export default List;
