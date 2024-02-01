import InstaLogo from "../InstaLogo";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import React, { useState, ChangeEvent } from "react";
import Explore from "../../assets/icons/Explore";
import Reels from "../../assets/icons/Reels";
import Messages from "../../assets/icons/Messages";
import Notifications from "../../assets/icons//Notifications";
import Create from "../../assets/icons/Create";
import Home from "../../assets/icons/Home";
import Search from "../../assets/icons/Search";
import More from "../../assets/icons/More";
import Threads from "../../assets/icons/Threads";
import { CgProfile } from "react-icons/cg";
import { AiFillInstagram } from "react-icons/ai";
import { Badge } from "@material-tailwind/react";
// import component 👇
import Drawer from "react-modern-drawer";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import SearchDrawer from "./SearchDrawer";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const toggleSearchDrawer = () => {
    setisSearchOpen((prevState) => !prevState);
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className="h-[100vh] w-[15%] overflow-hidden bg-transparent">
      <Sidebar
        className="sidebar"
        rootStyles={{
          backgroundColor: "transparent",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          zIndex:"200",
          width: "100%"
        }}
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
      >
        <Menu
          style={{
            backgroundColor: "transparent",
            overflow: "hidden",
          }}
        >
          {collapsed ? (
            <MenuItem
              style={{ margin: "2rem 0" }}
              icon={<AiFillInstagram size={25} />}
            >
              <InstaLogo />
            </MenuItem>
          ) : (
            <MenuItem style={{ margin: "2rem 0" }}>
              <InstaLogo />
            </MenuItem>
          )}
          <MenuItem icon={<Home />}> Home </MenuItem>
          <MenuItem
            icon={<Search />}
            onClick={() => {
              toggleSearchDrawer();
            }}
          >
            {" "}
            Search{" "}
          </MenuItem>
          <MenuItem icon={<Explore />}> Explore </MenuItem>
          <MenuItem icon={<Reels />}> Reels </MenuItem>
          <MenuItem icon={<Messages />}> Messages </MenuItem>
          <MenuItem icon={<Notifications />}> Notifications </MenuItem>
          <MenuItem icon={<Create />}> Create </MenuItem>
          <MenuItem icon={<CgProfile size={25} />}> Profile </MenuItem>
        </Menu>

        <Menu
          style={{
            backgroundColor: "transparent",
            overflow: "hidden",
          }}>
          <MenuItem icon={<Threads />}> Threads </MenuItem>
          <MenuItem icon={<More />}> More </MenuItem>
        </Menu>
      </Sidebar>
      <Drawer
        open={isSearchOpen}
        onClose={toggleSearchDrawer}
        direction="left"
        style={{
          position: "fixed",
          left: "5rem",
          width: "25rem",
          borderRadius: " 0 0.7rem 0.7rem 0",
          backgroundColor: "transparent",
          // border: "1px solid white",
          boxShadow: "0 0 5px 0px  rgba(83, 90, 124, 0.6)",
        }}
        overlayOpacity="0"
        className="bla bla bla "
      >
        <SearchDrawer />
      </Drawer>
    </div>
  );
};

export default DashboardSidebar;
