import React, { useState, useEffect, } from 'react';
import './ExistingPage.css';
import { importSavedImageFromDb, getUserByEmail } from '../../ApiService/ApiService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ExistingPage() {
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const navigation = useNavigate();

  const handleGetImage = async () => {
    const jwtToken = Cookies.get('token');
    try {
      const userResponse = await getUserByEmail(jwtToken);
      const userId = userResponse.userId;
      importSavedImageFromDb(userId).then((data) => {
        setImageData(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetImage();
  }, []);

  const handleImageSelect = (imageName) => {
    setSelectedImage(imageName.imageName);
    localStorage.setItem("selected-image", imageName.imageJson);
    navigation('/dashboard');
  };

  return (
    <>

      <div className="dialogue-box">
        <div className="dialogue-content">
          <div role="img" className="image-card-container" >
            {imageData.length === 0 ? (
              <p>No saved images</p>
            ) : (
              imageData.map((image, index) => (
                <div
                  key={index}
                  className={`image-card ${selectedImage === image.imageName ? 'selected' : ''}`}
                  onClick={() => handleImageSelect(image)}
                >
                  {image.imageByte ? (
                    <img data-testid="Image1" src={`data:image/png;base64,${image.imageByte}`} style={{ width: "250px", height: "250px" }} alt={image.imageName} />

                  ) : (
                    <p>Error: No image data found</p>
                  )}
                  <p>{image.imageName}</p>
                </div>

              ))
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default ExistingPage;
