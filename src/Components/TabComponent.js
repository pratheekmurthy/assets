import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabBody from "./TabBody";
import { useEffect } from "react";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = useState(0);
  const [TotalCount, SetTotalCount] = useState([]);
  const [DDSiteCount, SetDDSiteCount] = useState([]);
  const [VendorAssets, SetVendorAssets] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabArray1 = {
    title: ["Total Assets Dashboard"],
    cardTitle: [
      `Total Asset (${TotalCount.Total})`,
      `Deploy on FLoor (${TotalCount.DeployFLoor})`,
      `In Stock (${TotalCount.InStock})`,
      `Replacement (${TotalCount.Replacement})`,
      `Damage (${TotalCount.Damage})` ,
      `Return Back To Vendor (${TotalCount.ReturnBack})`,
    ],
    counts: [Object.values(TotalCount)],
  };
  const tabArray2 = {
    title: ["DD Site", "OMR Site", "Mysore Site", "Belgaum Site"],
    cardTitle: [
      `Total Asset (${TotalCount.Total})`,
      `Replacement (${TotalCount.Replacement})`,
      `In Stock (${TotalCount.InStock})`,
      `DeployFLoor (${TotalCount.DeployFLoor})`,
      `Damage (${TotalCount.Damage})`,
      `Return Back To Vendor (${TotalCount.ReturnBack})`,
    ],
    counts: [Object.values(DDSiteCount)],
    counts: [
      [1, 2, 3, 4, 5, 6],
      [11, 12, 13, 14, 15, 16],
      [10, 20, 30, 40, 50, 60],
      [7, 8, 9, 10, 11, 12],
    ],
  };
  const tabArray3 = {
    title: [
      "Winger IT Solutions",
      "NXTGEN IT Solutions",
      "Sheeltron Digital Systems Pvt.Ltd.",
    ],
    cardTitle: [
      `Total Asset  (${TotalCount.Total})`,
      `Desktop    (${TotalCount.Desktop})`,
      `Laptop   (${TotalCount.Laptop})`,
      
    ],
   counts: [Object.values(VendorAssets)],
    counts: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],

  };

  const ApiDataCall = () => {
    // calling api here ..
    fetch("/api/TotalAssets")
    
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          SetTotalCount(data.items[0]);
          
        }
        // console.log("api data", data.items);
      })
      .catch((e) => {
        console.log(e);
       });
  };
  

  const ApiDataCall1 = () => {
    // calling api here ..
    fetch("/api/DDSite")
    
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          SetDDSiteCount(data.items[0]);
        }
        // console.log("api data", data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const ApiDataCall2 = () => {
    // calling api here ..
    fetch("/api/VendorAssets")
    
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          SetVendorAssets(data.items[0]);
          
        }
        // console.log("api data", data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    ApiDataCall();
    ApiDataCall1();
    ApiDataCall2();

  }, []);



  return (
    <Box sx={{ width: "100%" }}>
      {console.log(TotalCount , DDSiteCount ,VendorAssets)}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Total Assets dashboard" {...a11yProps(0)} />
          <Tab label="Site Wise Assets Count" {...a11yProps(1)} />
          <Tab label="Vendor Wise Asset Count" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabBody CardTitleArray={tabArray1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabBody CardTitleArray={tabArray2} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabBody CardTitleArray={tabArray3} />
      </TabPanel>
    </Box>
  );
}
