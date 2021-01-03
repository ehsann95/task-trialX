import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const Starships = ({ handleCancel, isModalVisible, data }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    setShips(data);
  }, [data]);

  return (
    <>
      <Modal
        title="Starships"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer
        centered
        width="70%"
      >
        <div style={{ height: "50vh", overflowY: "auto" }}>
          <div className="container">
            <div className="row">
              {ships.map((item, index) => {
                return (
                  <div key={index} className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title display-4">{item.name}</h5>
                        <p className="card-subtitle mb-2 text-muted">
                          {item.model}
                        </p>
                        <p>
                          <span className="mr-2 lead">Manufacturer</span>
                          {item.manufacturer}
                        </p>
                        <p>
                          <span className="mr-2 lead">Cost</span>
                          {item.cost_in_credits}
                        </p>
                        <p>
                          <span className="mr-2 lead">Class</span>
                          {item.starship_class}
                        </p>
                        <p>
                          <span className="mr-2 lead">Consumables</span>
                          {item.consumables}
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

export default Starships;
