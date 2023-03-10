import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SectionFormEditCar.css";
import EditCarForm from "../components/EditCarForm";

const SectionFormEditCar = () => {
  const navigate = useNavigate();

  const handleCancelButton = () => {
    navigate("/listcar");
  };
  return (
    <section id="sectionFormEditCar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="titleArea">
              <h2 className="editCarTitle">Edit Car</h2>
            </div>
            <div className="formBox">
              <EditCarForm />
            </div>
            <div className="actionArea d-flex justify-content-start align-items-center">
              <Button className="cancelButton" onClick={handleCancelButton}>
                Cancel
              </Button>
              <label className="submitButton" htmlFor="formSubmit" tabIndex="0">
                Save
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFormEditCar;
