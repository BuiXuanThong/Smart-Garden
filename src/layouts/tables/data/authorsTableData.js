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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

// Images
import ledIcon from "assets/images/led.png";
import pumpIcon from "assets/images/pump.jpg";

// useState
import { useState, useEffect } from "react";


// css
import "./style.css";


const fs = "firstState";


export default function data() {
  const [ledState, setLedState] = useState(fs);
  const [pumpState, setPumpState] = useState(fs);

  function ledChangeToState(state) {
    const value = (state? "1" : "0");

    fetch("https://io.adafruit.com/api/v2/trong249/feeds/bbc-led/data", {

    	// Adding method type
    	method: "POST",

    	// Adding body or contents to send
    	body: JSON.stringify({
    		"X-AIO-Key": "aio_nnDo095XgBmSBw6aM5tr84OVjvoY",
        	"datum":{"value": value}
    	}),

    	// Adding headers to the request
    	headers: {
    		"Content-type": "application/json; charset=UTF-8"
    	}
    })
  }

  function pumpChangeToState(state) {
      const value = (state? "3" : "2");

      fetch("https://io.adafruit.com/api/v2/trong249/feeds/bbc-pump/data", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          "X-AIO-Key": "aio_nnDo095XgBmSBw6aM5tr84OVjvoY",
            "datum":{"value": value}
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
  }

  useEffect(() => {
    setInterval(() => {
      fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-led/data`).then((response) => response.json())
        .then((actualData) => setLedState(actualData[0].value === "1" ? true : false));

      fetch(`https://io.adafruit.com/api/v2/trong249/feeds/bbc-pump/data`).then((response) => response.json())
        .then((actualData) => setPumpState(actualData[0].value === "3" ? true : false));
    }, 500);
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "Current", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author image={ledIcon} name="LED BUTTON" email="" />,
        function: <Job title={ledState !== fs ? "Updated" : "Loading"} description="" />,
        status: (
          <MDBox ml={-1}>
            <label className="switch" htmlFor="led-btn">
                <input id="led-btn"
                  type="checkbox"
                  checked={ledState}
                  onClick={() => {ledChangeToState(!ledState)}} />
                <span className="slider round"/>
            </label>
          </MDBox>
        ),
        // employed: (
        //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //     23/04/18
        //   </MDTypography>
        // ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={pumpIcon} name="PUMP BUTTON" email="" />,
        function: <Job title={pumpState !== fs ? "Updated" : "Loading"} description="" />,
        status: (
          <MDBox ml={-1}>
            <label className="switch" htmlFor="pump-btn">
                <input id="pump-btn"
                type="checkbox"
                checked={pumpState}
                onClick={() => {pumpChangeToState(!pumpState)}}/>
                <span className="slider round"/>
            </label>
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
