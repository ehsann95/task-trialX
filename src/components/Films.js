import React from "react";
import { Modal } from "antd";

const Films = ({ handleCancel, isModalVisible, data }) => {
  return (
    <>
      <Modal
        title="Films"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer
        centered
        width="70%"
      >
        <div style={{ height: "50vh", overflowY: "auto" }}>
          <div className="container">
            <div className="row">
              {data.map((item, index) => {
                return (
                  <div key={index} className="col-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5>{item.title}</h5>
                        <p className="card-subtitle mb-2 text-muted">
                          {item.director}
                        </p>
                        <p className="card-text">{item.opening_crawl}</p>
                        <p>
                          <span className="font-weight-bold mr-1">
                            Producer
                          </span>
                          {item.producer}
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

export default Films;
