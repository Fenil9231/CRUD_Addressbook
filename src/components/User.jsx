import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./user.css";
import { BASEURL } from "../services/api";
import {  ScaleLoader } from "react-spinners";

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASEURL}/users`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
      setError("");
    } catch (e) {
      setError(e.message);
      setLoading(false);
      console.error(e);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASEURL}/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            fetchData();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: `Please Try Again After Some Time ...`,
            });
          });
      }
    });
  };

  return (
    <div className="container">
      <div className="user-container">
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <button className="refresh-button" onClick={fetchData}>
                Refresh
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div><ScaleLoader
          color="#007bff"
          height={40}
          margin={3}
          radius={20}
          speedMultiplier={1.1}
          width={6}
        /></div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
        <div className="container mt-4">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, city, phoneNumber }, index) => {
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{city}</td>
                    <td className="number">
                      {phoneNumber.map((num, idx) => (
                        <div key={idx}>{num}</div>
                      ))}
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default User;