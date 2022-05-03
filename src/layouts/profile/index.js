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

// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import homeDecor4 from "assets/images/home-decor-4.jpeg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import firebase, {auth} from 'util/firebase';


const Overview = () => {
  const [_name, setName] = useState('');
  const [_email, setEmail] = useState('');
  const [_phone, setPhone] = useState('');
  const [_location, setLocation] = useState('');
  const [myKey, setMyKey] = useState('');

  const updateInfo = () => {
    // update data of this key
    firebase.database().ref('User').child(myKey).update({
      name: _name,
      phone: _phone,
      location: _location
    });

    alert('Update Successfully');
  }

  const handleChange = type => event => {
    switch(type) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'location':
        setLocation(event.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      firebase.database().ref('User').orderByChild('email').equalTo(user.email).on("value",  (snapshot) => {
          snapshot.forEach((child) => {
            setMyKey(child.key);
            setName(child.child("name").val());
            setEmail(child.child("email").val());
            setPhone(child.child("phone").val());
            setLocation(child.child("location").val());
          });
      });
    });
  }, []);

return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Name</span>
              </div>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={_name} onChange={handleChange("name")}/>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Email</span>
              </div>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" readOnly value={_email} onChange={handleChange("email")}/>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Phone</span>
              </div>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={_phone} onChange={handleChange("phone")}/>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Location</span>
              </div>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={_location} onChange={handleChange("location")}/>
            </div>

            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Password</span>
              </div>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> */}

            <button type="button" className="btn btn-success" onClick={() => updateInfo()}>Save</button>

            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
