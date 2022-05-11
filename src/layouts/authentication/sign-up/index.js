/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// useState
import { useState } from "react";

// firebase
import firebase, {auth} from "util/firebase";

const Cover = () => {
  const navigate = useNavigate();

  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_rePassword, setRePassword] = useState("");
  const [_name, setName] = useState("");
  const [_phone, setPhone] = useState("");
  const [_location, setLocation] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const pushToDB = (str) => {
    const timeNow = Date.now();
    const day = new Date(timeNow).getDate();
    const month = new Date(timeNow).getMonth() + 1;
    const year = new Date(timeNow).getFullYear();
    const date = day + "/" + month + "/" + year;
    
    const time = new Date(timeNow).toLocaleTimeString();
    const fixedTime = date + " " + time;

    const content = {
      time: fixedTime,
      content: str
    };

    const todoRef = firebase.database().ref('Logs');
    todoRef.push(content);
  }

  const signUpFun = () => {
    if(_password !== _rePassword) {
      alert("Passwords do not match!");
      return;
    }

    auth.createUserWithEmailAndPassword(_email, _password)
    .then(() => {
        const dbRef = firebase.database().ref('User');
        const element = {
            email: _email,
            name: _name,
            phone: _phone,
            location: _location
        }
        dbRef.push(element);

        pushToDB("User " + _email + " signed up");
        alert('Sign up successfully! Click OK to navigate to the login page.');
        navigate("/authentication/sign-in");
    })
    .catch((e) => {
        alert(e.message);
    })
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={handleEmailChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={handlePasswordChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth onChange={handleRePasswordChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Your Name" variant="standard" fullWidth onChange={handleNameChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Phone" variant="standard" fullWidth onChange={handlePhoneChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Location" variant="standard" fullWidth onChange={handleLocationChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => {signUpFun()}}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
