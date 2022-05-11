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

import {useState, useEffect} from "react";
import firebase, {auth} from "util/firebase";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const [temp, setTemp] = useState({
    min: -1,
    max: -1
  });

  const [humid, setHumid] = useState({
    min: -1,
    max: -1
  });

  const [light, setLight] = useState({
    min: -1,
    max: -1
  });

  const [grHumid, setGrHumid] = useState({
    min: -1,
    max: -1
  });

  const [userName, setUserName] = useState("");

  useEffect(() => {
    firebase.database().ref('Min_max').on("value", (snapshot) => {
        snapshot.forEach((child) => {
            // if temperature
            if (child.key === "temperature") {
                setTemp({
                  min: child.child("min").val(),
                  max: child.child("max").val()
                });
            }
            else if (child.key === "humid") {
                setHumid({
                  min: child.child("min").val(),
                  max: child.child("max").val()
                });
            }
            else if (child.key === "light") {
                setLight({
                  min: child.child("min").val(),
                  max: child.child("max").val()
                });
            }
            else if (child.key === "ground_humid") {
                setGrHumid({
                  min: child.child("min").val(),
                  max: child.child("max").val()
                });
            }
        });
    });

    auth.onAuthStateChanged((user) => {
      setUserName(user.email);
    });

  }, []);

  const handleMinChange = type => (e) => {
    if(type === "temperature") {
      setTemp({...temp, min: e.target.value});
    }
    else if(type === "humid") {
      setHumid({...humid, min: e.target.value});
    }
    else if(type === "light") {
      setLight({...light, min: e.target.value});
    }
    else if(type === "ground_humid") {
      setGrHumid({...grHumid, min: e.target.value});
    }
  }

  const handleMaxChange = type => (e) => {
    if(type === "temperature") {
      setTemp({...temp, max: e.target.value});
    }
    else if(type === "humid") {
      setHumid({...humid, max: e.target.value});
    }
    else if(type === "light") {
      setLight({...light, max: e.target.value});
    }
    else if(type === "ground_humid") {
      setGrHumid({...grHumid, max: e.target.value});
    }
  }
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

  const handleSave = type => {
    if(type === "temperature") {
      firebase.database().ref('Min_max').child(type).update({
        min: temp.min,
        max: temp.max,
      });
      const content = "User " + userName + " changed the Temperature min and max values to [" + temp.min + ", " + temp.max + "]";
      pushToDB(content);
    }
    else if(type === "humid") {
      firebase.database().ref('Min_max').child(type).update({
        min: humid.min,
        max: humid.max,
      });
      const content = "User " + userName + " changed the Humidity min and max values to [" + humid.min + ", " + humid.max + "]";
      pushToDB(content);
    }
    else if(type === "light") {
      firebase.database().ref('Min_max').child(type).update({
        min: light.min,
        max: light.max,
      });
      const content = "User " + userName + " changed the Light min and max values to [" + light.min + ", " + light.max + "]";
      pushToDB(content);
    }
    else if(type === "ground_humid") {
      firebase.database().ref('Min_max').child(type).update({
        min: grHumid.min,
        max: grHumid.max,
      });
      const content = "User " + userName + " changed the Ground Humid min and max values to [" + grHumid.min + ", " + grHumid.max + "]";
      pushToDB(content);
    }
    alert("Saved!");
  }


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
          <input className="my-input" type="number" id="min-temp" value={temp.min} onChange={handleMinChange("temperature")}/>
        ),
        status: (
          <input className="my-input" type="number" id="max-temp" value={temp.max} onChange={handleMaxChange("temperature")}/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium" onClick={() => handleSave("temperature")}>
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={humidIcon} name="Humidity" />,
        budget: (
          <input className="my-input" type="number" id="min-humid" value={humid.min} onChange={handleMinChange("humid")}/>
        ),
        status: (
          <input className="my-input" type="number" id="max-humid" value={humid.max} onChange={handleMaxChange("humid")}/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium" onClick={() => handleSave("humid")}>
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={lightIcon} name="Light" />,
        budget: (
          <input className="my-input" type="number" id="min-light" value={light.min} onChange={handleMinChange("light")}/>
        ),
        status: (
          <input className="my-input" type="number" id="max-light" value={light.max} onChange={handleMaxChange("light")}/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium" onClick={() => handleSave("light")}>
            SAVE
          </MDTypography>
        ),
      },
      {
        project: <Project image={grHumidIcon} name="Ground Humidity" />,
        budget: (
          <input className="my-input" type="number" id="min-grhm" value={grHumid.min} onChange={handleMinChange("ground_humid")}/>
        ),
        status: (
          <input className="my-input" type="number" id="max-grhm" value={grHumid.max} onChange={handleMaxChange("ground_humid")}/>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium" onClick={() => handleSave("ground_humid")}>
            SAVE
          </MDTypography>
        ),
      },
    ],
  };
}
