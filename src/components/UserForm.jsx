import React from 'react';
import { Form, Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import "./user.css";
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";


// const url="https://users-acontext-api.onrender.com/users";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('please enter your name'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  city: Yup.string()
    .required('Required!'),
  phoneNumber: Yup.array().of(Yup.string()
     .min(10, 'phnNumber must be at least 10 characters')
    .max(11 , "phoneNumber so longer, please enter 10 char")
    .required('phoneNumber is required')),
});


const KErrorMessage = ({ name }) => {
  return (
    <div style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </div>
  );
};

const UserForm = ({submit , user}) => {
  let initialValues
  if(user){
     initialValues = {
      name: user.name,
      email: user.email,
      city: user.city,
      phoneNumber: user.phoneNumber,
    };
  } else{
   initialValues = {
    name: '',
    email: '',
    city: '',
    phoneNumber: [''],
  };
  }
  const onSubmit = submit

  return (
    <div className='user-container'>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} // Add the validation schema here
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          {user ? (
        <div className="fieldContainer">
          <label>Id : {user.id}</label>
        </div>
      ) : null}
          <h2>User Form</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <br />
          <KErrorMessage name="name" />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <br />
          <KErrorMessage name="email" />
          <br />
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
          <br />
          <KErrorMessage name="city" />
          <br />
          <label>Phone Number:</label>
          <FieldArray name="phoneNumber">
            {fieldArrayProps => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phoneNumber } = values;
              return (
                <div>
                  {phoneNumber.map((number, index) => (
                    <div key={index}>
                      <Field name={`phoneNumber[${index}]`} />
                      <Button variant='danger'
                        type="button"
                        onClick={() => {
                          if (index > 0) {
                            remove(index);
                          }
                        }}
                      >
                        -
                      </Button>
                      &nbsp;
                      <Button variant='success' type="button" onClick={() => {
                        if(phoneNumber.length < 5){push('')}}}>
                        +
                      </Button>
                    </div>
                  ))}

                </div>
              );
            }}
          </FieldArray>
          <br />
          <KErrorMessage name="phoneNumber" />
          <br />
          <Button variant="primary" type="submit" >Submit</Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default UserForm;
