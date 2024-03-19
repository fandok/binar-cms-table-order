import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

// Buat add new car di cms, itu harus pakai form, dan harus nyimpan tiap input form-nya di state

const Upload = () => {
  // buat simpan file
  const [file, setFile] = useState([]);

  const handleSubmit = async (e) => {
    // ini untuk handle biar gak redirect link
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", "xpander");
      formData.append("category", "large");
      formData.append("price", "10000000");
      formData.append("status", "true");
      formData.append("image", file[0]);
      const response = await axios.post(
        "https://api-car-rental.binaracademy.org/admin/car",
        formData,
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc",
          },
        },
      );

      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        {/* contoh input file, untuk nyimpan juga */}
        <Form.Control
          onChange={(e) => {
            setFile(e.target.files);
          }}
          type="file"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Upload;
