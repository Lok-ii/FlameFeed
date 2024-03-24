import InstaLogo from "../../assets/icons/InstaLogo";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
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
// import component 👇
import Drawer from "react-modern-drawer";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import SearchDrawer from "./SearchDrawer";
import { Link } from "react-router-dom";
import MessageDrawer from "./MessageDrawer";
import Setting from "./Setting";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMessageDrawer,
  toggleSearchDrawer,
  collapseAll,
  setToggleSetting,
} from "../../Redux/SidebarSlice";
import { setCreateBox } from "../../Redux/postSlice";

const DashboardSidebar = () => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const { collapsed, isSearchOpen, isMessageOpen } = useSelector(
    (state) => state.sidebar
  );
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  return (
    <div className="h-[100vh] w-[15%] relative overflow-hidden bg-transparent">
      <Sidebar
        className="sidebar"
        rootStyles={{
          backgroundColor: "transparent",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          zIndex: "200",
          width: "15%",
          position: "fixed"
        }}
        collapsed={collapsed}
        toggled={toggled}
        // onBackdropClick={() => setToggled(false)}
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
              component={<Link to={"/dashboard"} />}
              onClick={() => {
                dispatch(collapseAll());
              }}
            >
              <InstaLogo />
            </MenuItem>
          ) : (
            <MenuItem
              style={{ margin: "2rem 0" }}
              component={<Link to={"/dashboard"} />}
              onClick={() => {
                dispatch(collapseAll());
              }}
            >
              <InstaLogo />
            </MenuItem>
          )}
          <MenuItem
            component={<Link to={"/dashboard"} />}
            onClick={() => {
              dispatch(collapseAll());
            }}
            icon={<Home />}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            icon={<Search />}
            onClick={() => {
              dispatch(toggleSearchDrawer());
            }}
          >
            {" "}
            Search{" "}
          </MenuItem>
          <MenuItem icon={<Explore />}> Explore </MenuItem>
          <MenuItem icon={<Reels />}> Reels </MenuItem>
          <MenuItem
            component={<Link to={"/dashboard/messages"} />}
            icon={<Messages />}
            onClick={() => {
              dispatch(collapseAll());
              dispatch(toggleMessageDrawer());
            }}
          >
            {" "}
            Messages{" "}
          </MenuItem>
          <MenuItem
            icon={<Notifications />}
            onClick={() => {
              dispatch(collapseAll());
            }}
          >
            {" "}
            Notifications{" "}
          </MenuItem>
          <MenuItem
            icon={<Create />}
            onClick={() => {
              dispatch(collapseAll());
              dispatch(setCreateBox(true));
            }}
          >
            {" "}
            Create{" "}
          </MenuItem>
          <MenuItem
            component={<Link to={`/dashboard/profile/${user.username}`} />}
            icon={<CgProfile size={25} />}
            onClick={() => {
              dispatch(collapseAll());
            }}
          >
            {" "}
            Profile{" "}
          </MenuItem>
        </Menu>

        <Menu
          style={{
            backgroundColor: "transparent",
            overflow: "hidden",
          }}
        >
          <MenuItem
            icon={<Threads />}
            onClick={() => {
              dispatch(collapseAll());
            }}
          >
            {" "}
            Threads{" "}
          </MenuItem>
          <MenuItem
          className="moreSettings"
            icon={<More />}
            onClick={() => {
              dispatch(collapseAll());
              dispatch(setToggleSetting(""));
              dispatch(setCreateBox(false));
            }}
          >
            {" "}
            More{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
      <Setting />
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
      <Drawer
        open={isMessageOpen}
        onClose={toggleMessageDrawer}
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
        <MessageDrawer />
      </Drawer>
    </div>
  );
};

export default DashboardSidebar;
