/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
import tempIcon from "assets/images/temp_icon.png";
import humidIcon from "assets/images/humid_icon.png";
import lightIcon from "assets/images/light_icon.png";
import grHumidIcon from "assets/images/grhumid_icon.png";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "project", width: "30%", align: "left" },
      { Header: "Min", accessor: "budget", align: "center" },
      { Header: "Max", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project image={tempIcon} name="Temperature" />,
        budget: (
          <input className="my-input" type="number" id="min-temp"/>
        ),
        status: (
          <input className="my-input" type="number" id="max-temp"/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={humidIcon} name="Humidity" />,
        budget: (
          <input className="my-input" type="number" id="min-humid"/>
        ),
        status: (
          <input className="my-input" type="number" id="max-humid"/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={lightIcon} name="Light" />,
        budget: (
          <input className="my-input" type="number" id="min-light"/>
        ),
        status: (
          <input className="my-input" type="number" id="max-light"/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={grHumidIcon} name="Ground Humidity" />,
        budget: (
          <input className="my-input" type="number" id="min-grhm"/>
        ),
        status: (
          <input className="my-input" type="number" id="max-grhm"/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
            SAVE
          </MDTypography>
        ),
      },
    ],
  };
}
