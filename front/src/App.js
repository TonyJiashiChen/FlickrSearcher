import React, { useEffect, useState } from "react";
import { getFlickr, searchByTag } from "./api";
import "./App.css";
import LoginForm from "./component/LoginForm";

const App = () => {
  // storing user details locally
  const adminUser = {
    email: "admin@gmail.com",
    password: "admin",
  };

  // state hook for details
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // state hook for images in a list
  const [imageList, setImageList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // simple login function, checks details returned from form
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

  // effect hook to fetch json data sent from backend
  useEffect(() => {
    const fetch_data = async () => {
      const res = await getFlickr();
      setImageList(res.photos.photo);
    };
    fetch_data();
  }, []);

  // when sumbit send the search value to backend
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const res = await searchByTag(searchValue);
    setImageList(res.photos.photo);
  };

  // when clear button clicked, call default image set
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
              placeholder="Please enter Flickr tag..."
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
