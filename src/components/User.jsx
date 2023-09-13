import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import { Button } from "../../Buttons/button";
import "./user.css";
import { BASEURL } from "../services/api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [error, setError] = useState('')
  console.log(users);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASEURL}/users`);
      
      if (!response.ok) {
         setError(`Error ${response.status}: ${response.statusText}`) 
      }
  
      const data = await response.json();
      setUsers(data);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: `${e.message} ${error} Please Try Again After Some Time ...`
      });
      console.error(e);
    }
  };
  
  if(!users){
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    setUserIdToDelete(id);

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
            setUserIdToDelete(null);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
      } else {
        setUserIdToDelete(null);
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
      </div>
    </div>
  );
};

export default User;
