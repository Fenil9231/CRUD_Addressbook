import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { EditUser } from "./EditUser";
import User from "./User";
import { TABS, TAB_IDS } from "./Reducer";
import { AddUser } from "./AddUser";
import Home from "./Home";
import Footer from "./footer";

export const Community = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Context Api V-2.0.1
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {TABS.map(({ id, text }, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={`/${id}`}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route path={`/${TAB_IDS.ADD_USER}`} element={<AddUser />} />
          <Route path={`/${TAB_IDS.EDIT_USER}`} element={<EditUser />} />
          <Route path={`/${TAB_IDS.VIEW_USER}`} element={<User />} />
          <Route path={`/`} element={<Home />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
