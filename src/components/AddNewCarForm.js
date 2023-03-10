import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewCarForm.css";
import iconUpload from "../assets/img/fi_upload.png";

const AddNewCarForm = () => {
  const navigate = useNavigate();
  const [nameInputStatus, setNameInputStatus] = useState(false);
  const [priceInputStatus, setPriceInputStatus] = useState(false);
  const [categoryInputStatus, setCategoryInputStatus] = useState(false);
  const [imageErrorNotif, setImageErrorNotif] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  var errorFound = false;

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const initialValues = {
    nameInput: "",
    priceInput: 0,
    imageInput: null,
    categoryInput: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    errorFound = false;

    //validasi input text&price&select
    if (values.nameInput === "") {
      setNameInputStatus(true);
      errorFound = true;
    } else {
      setNameInputStatus(false);
    }

    if (values.priceInput === 0) {
      setPriceInputStatus(true);
      errorFound = true;
    } else {
      setPriceInputStatus(false);
    }

    if (values.categoryInput === "" || values.categoryInput === "placeholder") {
      setCategoryInputStatus(true);
      errorFound = true;
    } else {
      setCategoryInputStatus(false);
    }

    //validasi Image kosong,size,filetype
    if (values.imageInput === null) {
      setImageStatus(true);
      setImageErrorNotif("Please Upload Image");
      errorFound = true;
    }
    if (values.imageInput !== null && values.imageInput.size > 2097152) {
      setImageStatus(true);
      setImageErrorNotif("Image File Size is Too Big");
      errorFound = true;
    }
    if (values.imageInput !== null) {
      var fname = values.imageInput.name;
      var re = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
      if (!re.exec(fname)) {
        setImageStatus(true);
        setImageErrorNotif("File type is not supported!");
        errorFound = true;
      }
    }

    if (errorFound === true) {
      return false;
    }

    const urlAPI = "https://bootcamp-rent-cars.herokuapp.com";
    const config = {
      headers: {
        access_token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const data = new FormData();
    data.append("name", values.nameInput);
    data.append("category", values.categoryInput);
    data.append("price", values.priceInput);
    data.append("status", false);
    data.append("image", values.imageInput);

    await axios
      .post(`${urlAPI}/admin/car`, data, config)
      .then(async () => {
        navigate("/listcar", { state: { statusAdd: true } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addNewCarFormContainer">
      <Form noValidate id="addNewCarForm" onSubmit={handleSubmit}>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>
              Nama/Tipe Mobil<sup>*</sup>
            </Form.Label>
          </div>
          <div className="col-lg-3 inputArea">
            <Form.Group>
              <Form.Control isInvalid={nameInputStatus} required type="input" name="nameInput" id="nameInput" className="nameInput" placeholder="Input Nama/Tipe Mobil" onChange={handleInputChange}></Form.Control>
              <Form.Control.Feedback type="invalid">Data Tidak Boleh Kosong!</Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>
              Harga<sup>*</sup>
            </Form.Label>
          </div>
          <div className="col-lg-3 inputArea">
            <Form.Group>
              <Form.Control isInvalid={priceInputStatus} required type="number" min="0" name="priceInput" id="priceInput" className="priceInput" placeholder="Input Harga Sewa Mobil" onChange={handleInputChange}></Form.Control>
              <Form.Control.Feedback type="invalid">Silahkan isi Harga!</Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>
              Foto<sup>*</sup>
            </Form.Label>
          </div>
          <div className="col-lg-3 inputArea">
            <Form.Group>
              <Form.Control isInvalid={imageStatus} required type="file" name="imageInput" id="imageInput" className="imageInput" placeholder="Upload Foto Mobil" accept=".png, .jpg, .jpeg, .webp" onChange={handleImageChange}></Form.Control>
              <button type="button" className="fileInputFake d-flex justify-content-between align-items-center" onClick={handleUploadClick}>
                <p>{values.imageInput ? values.imageInput.name : "Upload Foto Mobil"}</p>
                <img src={iconUpload} className="uploadIcon img-fluid" alt="Icon Upload" />
              </button>
              <Form.Text id="imageUploadHelp" muted>
                File size max. 2MB
              </Form.Text>
              <Form.Control.Feedback type="invalid">{imageErrorNotif}</Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>
              Kategori<sup>*</sup>
            </Form.Label>
          </div>
          <div className="col-lg-3 inputArea">
            <Form.Group>
              <Form.Select isInvalid={categoryInputStatus} required name="categoryInput" id="categoryInput" className="categoryInput" placeholder="Pilih Kategori Mobil" onChange={handleInputChange}>
                <option value="placeholder">Pilih Kategori Mobil</option>
                <option value="small">Small</option>
                <option value="Medium">Medium</option>
                <option value="large">Large</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Silahkan pilih kategori!</Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>Created at</Form.Label>
          </div>
          <div className="col-lg-3 inputArea">-</div>
        </div>
        <div className="row inputContainer justify-content-start align-items-center">
          <div className="col-lg-2 labelArea">
            <Form.Label>Updated at</Form.Label>
          </div>
          <div className="col-lg-3 inputArea">-</div>
        </div>
        <Form.Control type="submit" name="formSubmit" id="formSubmit" className="formSubmit"></Form.Control>
      </Form>
    </div>
  );
};

export default AddNewCarForm;
