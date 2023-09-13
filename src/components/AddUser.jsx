import React from "react";
// import {getInitialFormValues} from "./Reducer.js"
import UserForm  from './UserForm';
import { BASEURL } from "../services/api";
// import { Formik } from 'formik';

export const AddUser = () => {


  // const ridirect = () => {
  //   <Route path={`/${TAB_IDS.VIEW_USER}`} element={<User />} />
  // }

    const handleSubmit = (user,{resetForm}) => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
    
          };
          fetch(`${BASEURL}/users`, requestOptions)
          resetForm({ values: "" })
          // ridirect();
      }
      return(
        <UserForm submit={handleSubmit}/>

      )
}