import React, { useState } from "react";
import images from "./api-mock.json";
import "./App.css";

const App = () => {
  const [imageList, setImageList] = useState(images.photos.photo);

  return (
    <div className="image-grid">
      {imageList.map((image) => (
        <img
          src={
            "https://live.staticflickr.com/" +
            image.server +
            "/" +
            image.id +
            "_" +
            image.secret +
            "_w.jpg"
          }
          alt={image.title}
        ></img>
      ))}
    </div>
  );
};

export default App;
