import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const Vehicles = ({ handleCancel, isModalVisible, data }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setVehicles(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Vehicles"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer
        centered
        width="70%"
      >
        <div style={{ height: "50vh", overflowY: "auto" }}>
          <div className="container">
            <div className="row">
              {vehicles.map((item, index) => {
                return (
                  <div key={index} className="col-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-subtitle mb-2 text-muted">
                          {item.model}
                        </p>
                        <p className="card-text">
                          <span className="font-weight-bold mr-1">
                            Manufacturer
                          </span>
                          {item.manufacturer}
                        </p>
                        <p className="card-text">
                          <span className="font-weight-bold mr-1">Class</span>
                          {item.vehicle_class}
                        </p>
                        <p className="card-text">
                          <span className="font-weight-bold mr-2">
                            Cargo Capacity
                          </span>
                          {item.cargo_capacity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Vehicles;
