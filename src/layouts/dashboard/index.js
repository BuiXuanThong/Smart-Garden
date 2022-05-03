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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
// import axios from "axios";
import React, { useEffect, useState } from "react";


const Dashboard = () => {
  const [clockState, setClockState] = useState();
  const [humid, setHumid] = useState();
  const [light, setLight] = useState();
  const [humiGr, setHumiGr] = useState();

  const [tempChartData, setTempChartData] = useState(reportsLineChartData);
  const [lightChartData, setLightChartData] = useState(reportsLineChartData);
  const [humidChartData, setHumidChartData] = useState(reportsLineChartData);
  const [humidGrChartData, setHumidGrChartData] = useState(reportsLineChartData);
  

  const baseUrl = "https://express-json.herokuapp.com";

  useEffect(() => {
    setInterval(() => {
      // fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-temp/data`).then((response) => response.json())
      //   .then((actualData) => setClockState(actualData[0].value));

      // fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-humi/data`).then((response) => response.json())
      //   .then((actualData) => setHumid(actualData[0].value));

      // fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-light/data`).then((response) => response.json())
      //   .then((actualData) => setLight(actualData[0].value));

      // fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-humi-ground/data`).then((response) => response.json())
      //   .then((actualData) => setHumiGr(actualData[0].value));
      fetch(baseUrl+"/dashboard/data/cards").then((response) => response.json())
      .then((actualData) => {
        setClockState(actualData.tempValue);
        setHumid(actualData.humidValue);
        setLight(actualData.lightValue);
        setHumiGr(actualData.grHumidValue);
      })
    }, 1000);

    fetch(baseUrl+"/dashboard/data/temp-chart/3000").then((response) => response.json())
      .then((actualData) => {
        setTempChartData(actualData);
      })

      fetch(baseUrl+"/dashboard/data/humid-chart/3000").then((response) => response.json())
      .then((actualData) => {
        setHumidChartData(actualData);
      })

      fetch(baseUrl+"/dashboard/data/light-chart/3000").then((response) => response.json())
      .then((actualData) =>{
        setLightChartData(actualData);
      })

      fetch(baseUrl+"/dashboard/data/humid-ground-chart/3000").then((response) => response.json())
      .then((actualData) => {
        setHumidGrChartData(actualData);
      })
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="device_thermostat"
                title="Temperature"
                count={clockState || '...'} 
                percentage={{
                  // color: "success",
                  // amount: "+55%",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="Humidity"
                count={humid || '...'}
                percentage={{
                  // color: "success",
                  // amount: "+3%",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="light_mode"
                title="Light"
                count={light || '...'}
                percentage={{
                  // color: "success",
                  // amount: "+1%",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="landscape"
                title="Ground Humidity"
                count={humiGr || '...'}
                percentage={{
                  // color: "success",
                  // amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              {/* <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Temperature"
                  description=""
                  date="just updated"
                  chart={tasks}
                />
              </MDBox> */}

              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Temperature"
                  description=""
                  date="just updated"
                  chart={tempChartData}
                />
              </MDBox>
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Humid"
                  description=""
                  date="just updated"
                  chart={humidChartData}
                />
              </MDBox>
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Light"
                  description=""
                  date="just updated"
                  chart={lightChartData}
                />
              </MDBox>
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Ground Humid"
                  description=""
                  date="just updated"
                  chart={humidGrChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
