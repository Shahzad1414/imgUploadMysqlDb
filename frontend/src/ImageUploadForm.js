import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .post('http://localhost:5000/api/upload', formData)
      .then(response => {
        console.log(response.data);
        // Handle success
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;