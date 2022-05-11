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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// firebase
import firebase from "util/firebase";

const Logs = () => {
  // const [successSB, setSuccessSB] = useState(false);
  // const [infoSB, setInfoSB] = useState(false);
  // const [warningSB, setWarningSB] = useState(false);
  // const [errorSB, setErrorSB] = useState(false);

  // const openSuccessSB = () => setSuccessSB(true);
  // const closeSuccessSB = () => setSuccessSB(false);
  // const openInfoSB = () => setInfoSB(true);
  // const closeInfoSB = () => setInfoSB(false);
  // const openWarningSB = () => setWarningSB(true);
  // const closeWarningSB = () => setWarningSB(false);
  // const openErrorSB = () => setErrorSB(true);
  // const closeErrorSB = () => setErrorSB(false);


  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  
  const incPage = ()=>{
    const maxPage = Math.ceil(logs.length/10);
    if (page < maxPage)  setPage(page+1);
    console.log(maxPage);
    console.log(page);
  }
  const desPage = ()=>{
    if (page > 1) setPage(page-1);
    
    console.log(page);
  }
  useEffect(() => {
    const logList = [];
    firebase.database().ref('Logs').on("value", (snapshot) => {
        snapshot.forEach((child) => {
          logList.push({
            time: child.child("time").val(),
            content: child.child("content").val()
          });
        });
        setLogs(logList);
    });
  }, []);


  const alertContent = (content, time) => (
    <MDTypography variant="body2" color="white">
      {time} - {content}
    </MDTypography>
  );

  // const renderSuccessSB = (
  //   <MDSnackbar
  //     color="success"
  //     icon="check"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={successSB}
  //     onClose={closeSuccessSB}
  //     close={closeSuccessSB}
  //     bgWhite
  //   />
  // );

  // const renderInfoSB = (
  //   <MDSnackbar
  //     icon="notifications"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={infoSB}
  //     onClose={closeInfoSB}
  //     close={closeInfoSB}
  //   />
  // );

  // const renderWarningSB = (
  //   <MDSnackbar
  //     color="warning"
  //     icon="star"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={warningSB}
  //     onClose={closeWarningSB}
  //     close={closeWarningSB}
  //     bgWhite
  //   />
  // );

  // const renderErrorSB = (
  //   <MDSnackbar
  //     color="error"
  //     icon="warning"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={errorSB}
  //     onClose={closeErrorSB}
  //     close={closeErrorSB}
  //     bgWhite
  //   />
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Logs</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>

                {logs.reverse().slice((page-1) * 10, page * 10 ).map((log) => (
                <MDAlert color="secondary" dismissible>
                  {alertContent(log.content, log.time)}
                </MDAlert>
                ))}
              </MDBox>
              
            </Card>
              
          </Grid>
          
          
          
          {/* <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </MDButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </MDButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </MDButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </MDButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
        <Grid container spacing={3} justifyContent="center" mt={3} mb={3}>
        <MDButton mr={2}  onClick={desPage}>Previous</MDButton>
        <MDBox p={2}>
                <MDTypography variant="h6">Page {page}</MDTypography>
        </MDBox>
        <MDButton ml={2} onClick={incPage}>Next</MDButton>
        </Grid>
        
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Logs;
