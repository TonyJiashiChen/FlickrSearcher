import React, { useEffect, useState } from "react";
import { getFlickr, searchByTag } from "./api";
import "./App.css";
import LoginForm from "./component/LoginForm";

const App = () => {
  const adminUser = {
    email: "admin@gmail.com",
    password: "admin",
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [imageList, setImageList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const Login = (details) => {
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        email: details.email,
      });
    } else {
      console.log("Wrong details");
    }
  };

  useEffect(() => {
    const fetch_data = async () => {
      const res = await getFlickr();
      setImageList(res.photos.photo);
    };
    fetch_data();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const res = await searchByTag(searchValue);
    setImageList(res.photos.photo);
  };

  const resetForm = async () => {
    const res = await getFlickr();
    setImageList(res.photos.photo);
    setSearchValue("");
  };

  return (
    <div>
      {user.email !== "" ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              required="required"
              placeholder="Please enter flickr tag..."
            ></input>
            <button type="submit">Search</button>
            <button type="button" onClick={resetForm}>
              Clear
            </button>
          </form>
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
        </>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
};

export default App;
