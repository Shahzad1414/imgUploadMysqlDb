import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ImageDisplay = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Fetch the image data from the API endpoint
    axios
      .get('http://localhost:5000/api/user/8') // Replace with your API endpoint URL
      .then(response => {
        console.log(response)
        setImageData(response.data.imageData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {imageData ? (
        <img src={`http://localhost:5000/api/image/${imageData}`} height={300} alt="Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;