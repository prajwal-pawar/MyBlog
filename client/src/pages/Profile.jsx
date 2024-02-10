import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const Profile = () => {
  const [user, setUser] = useState({});

  // get token from localstorage
  const token = localStorage.getItem("token");

  // get user info from user id
  const getUser = async (userId) => {
    try {
      // getting response from server for create article API
      const response = await axios.get(
        `http://localhost:8000/user/profile/${userId}`,
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.user);

      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  // getting article id from URL parameters
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div className="w-4/5 flex flex-col m-auto items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">@{user.username}</h1>

      <p className="text-slate-500 mb-5">
        Created MyBlog account on {dayjs(user.createdAt).format("DD MMM YYYY")}
      </p>

      <div className="w-full flex flex-row justify-evenly mt-4">
        <Link className="border p-5 w-1/3 text-center mr-4  shadow bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold rounded">
          <p>Change Your Password</p>
        </Link>

        <Link className="border p-5 w-1/3 text-center mr-4 shadow bg-stone-500 hover:bg-stone-600 focus:shadow-outline focus:outline-none text-white font-bold rounded">
          <p>Logout</p>
        </Link>

        <Link className="border p-5 w-1/3 text-center shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold rounded">
          <p>Delete Your Account</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;