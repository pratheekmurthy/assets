import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabBody from "./TabBody";
import { useEffect } from "react";
import { useState } from "react";
import SelectSmall from './DropDown'

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
  const [DDAssetsCount, SetDDAssetsCount] = useState([]);
  const [VendorAssetsCount, SetVendorAssetsCount] = useState([]);
  const [sites, setSites] = useState([])
  const [vendors, setvendors] = useState([])
  const [selectedSite, setSelectedSite] = useState([])
  const [selectedSiteAssets, setSelectedSiteAssets] = useState([])
  const [selectedVendor, setSelectedVendor] = useState([])
  const [selectedVendorAssetsCount, setSelectedVendorAssetsCount] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // change Event function for drop down values
  const handleDropdown = (selectedDropDown, dropDown) => {
    // if selected drop down value is vendor drop down the below if condition works
    if (dropDown === "Vendor" && vendors.length > 0) {

      // only selected sites details getting filtered from all sites 
      const result = VendorAssetsCount.filter((vendor) => {
        return vendor.SiteName === selectedDropDown
      })
      setSelectedVendor([selectedDropDown])
      setSelectedVendorAssetsCount(result)
    } else if (dropDown === "Site" && sites.length > 0) {    // if selected drop down value is Site drop down the  else condition works

      // only the selected vendor details filtered from all the vendors list
      const result = DDAssetsCount.filter((vendor) => {
        return vendor.SiteName === selectedDropDown
      })
      setSelectedSite([selectedDropDown])
      setSelectedSiteAssets(result)
    }
  }



  const tabArray1 = {
    title: ["Total Assets Dashboard"],
    cardTitle: [
      `Total Asset`,
      `Replacement`,
      `In Stock`,
      `Deploy on FLoor`,
      `Damage `,
      `Return Back To Vendor `,
    ],
    counts: [Object.values(TotalCount)],
  };
  const tabArray2 = {
    title: selectedSite,
    cardTitle: [
      `Total Asset`,
      `Replacement`,
      `In Stock`,
      `DeployFLoor`,
      `Damage`,
      `Return Back To Vendor`,
    ],
    counts: selectedSiteAssets.map((item) => {
      let a = Object.values(item);
      a.shift();
      return a;
    }),
  };


  const tabArray3 = {
    title: selectedVendor,
    cardTitle: [
      `Total Asset`,
      `Desktop`,
      `Laptop`,
    ],


    counts: selectedVendorAssetsCount.map((item) => {
      let a = Object.values(item);
      a.shift();
      return a;

    }),
  };


  const TotalAssetsApiCall = () => {
    fetch("/api/TotalAssets")
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          SetTotalCount(data.items[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Total_Assets_Api_call = () => {
    // calling api here ..
    fetch("/api/DDAssets")
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          const response = data.items
          SetDDAssetsCount(response)
          let sites = []
          // only sites names getting pushed to a array from all the sites
          response.map((ele) => {
            return sites.push(ele.SiteName)
          })
          setSites(sites)
          SetDDAssetsCount(data.items);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const All_Vendors_Api_Call = () => {
    fetch("/api/VendorAssets")
      .then((res) => res.json())
      .then((data) => {
        if (data.total > 0) {
          const response = data.items
          SetVendorAssetsCount(response)
          let vendors = []
          // only vendors names getting pushed to a array of all the sites
          response.map((ele) => {
            return vendors.push(ele.SiteName)
          })
          setvendors(vendors)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // To call all the Api's once the Page loaded 
    TotalAssetsApiCall();
    Total_Assets_Api_call();
    All_Vendors_Api_Call();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
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
        <SelectSmall dropDownValues={sites} dropDown="Site" handleDropdown={handleDropdown} />
        {/* <TabBody CardTitleArray={tabArray2} /> */}
        {
          selectedSiteAssets.length > 0 && <TabBody CardTitleArray={tabArray2} />
        }

      </TabPanel>
      <TabPanel value={value} index={2}>
        <SelectSmall dropDownValues={vendors} dropDown="Vendor" handleDropdown={handleDropdown} />
        {
          selectedVendorAssetsCount.length > 0 && <TabBody CardTitleArray={tabArray3} />
        }

      </TabPanel>
    </Box>
  );


}
