import React from "react";
import FormRow from "../components/FormRow";
import axios from 'axios'
import Alert from "../components/Alert";
import {useNavigate} from 'react-router-dom';

const initialState = {
  name: "",
  gender : "",
  age : "",
  email: "",
  password: "",
  isMember: true,
};

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState(initialState);
  const [alertText, setAlertText] = React.useState("");
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!values.isMember){
      try {
        const data = await axios.post('http://localhost:4500/api/v1/auth/register', {values});
        console.log(data.data);
        localStorage.setItem('token', data.data.token);
        navigate('/home')
      } catch (error) {
        setAlertText(error.response.data.msg);
        console.log(error.response.data.msg); 
      }
      
    }else{
      try {
        const data = await axios.post('http://localhost:4500/api/v1/auth/login', {values});
        console.log(data);
        localStorage.setItem('token', data.data.token);
        navigate('/home')
      } catch (error) {
        setAlertText(error.response.data.msg);
        console.log(error.response.data.msg); 
      }
    }
  }

  return (
    <div className="login-container">
      <form className="form" onSubmit={onSubmit}>
      <h3 className="title">{values.isMember ? 'Login' : 'Register'}</h3>
        {/* name input */}
        {!values.isMember && (
          <>
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            />
          <FormRow
            type='radio'
            name='gender'
            value={values.gender}
            options={['Male', 'Female', 'Other']}
            handleChange={handleChange}
            />

          <FormRow
            type='text'
            name='age'
            value={values.age}
            handleChange={handleChange}
            />
          </>
        )}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        {alertText &&  <Alert alertText={alertText} />}
        <button type="submit" className="btn btn-block" onSubmit={onSubmit}>
          submit
        </button>
        <p className="title">
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
