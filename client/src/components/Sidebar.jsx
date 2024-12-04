// import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
// import { BiBook, BiHelpCircle } from "react-icons/bi";
// import { BsPeople } from "react-icons/bs";
// import { CiSettings } from "react-icons/ci";
// import { MdOutlineDashboardCustomize } from "react-icons/md";

import { BiBook, BiHelpCircle, BiHome } from "react-icons/bi";
import { BsBookshelf } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar = () => {
  return (
    <div className="w-1/4 lg:w-1/6 bg-white h-full flex flex-col p-4">
      <div className="flex items-center mb-8">
        {/* Logo */}
        <img src="/clg logo.jpeg" alt="logo" className="w-24 h-24" />
      </div>
      <div className="flex flex-col space-y-4 ">
        <Link to={"/librarian--7239/dashboard"}>
          <NavItem icon={<BiHome />} label="Dashboard" />
        </Link>

        <Link to={"/librarian--7239/dashboard/library-loan"}>
          <NavItem icon={<BiBook />} label="Library loan" />
        </Link>

        <Link to={"/librarian--7239/dashboard/books"}>
          <NavItem icon={<BsBookshelf />} label="Books" />
        </Link>

        <Link to={"/librarian--7239/dashboard/students"}>
          <NavItem icon={<GrGroup />} label="Students" />
        </Link>

        <Link to={"/librarian--7239/dashboard/help"}>
          <NavItem icon={<BiHelpCircle />} label="Help" />
        </Link>

        <Link to={"/librarian--7239/dashboard/setting"}>
          <NavItem icon={<CiSettings />} label="Settings" />
        </Link>
      </div>
      <div className="flex justify-start relative top-44 right-2">
        <LogOut />
      </div>

      {/* <List className="flex flex-col space-y-4">
        <ListItem button>
          <ListItemIcon>
            <MdOutlineDashboardCustomize />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BiBook />
          </ListItemIcon>
          <ListItemText primary="Library loan" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BsPeople />
          </ListItemIcon>
          <ListItemText primary="Members" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CiSettings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <BiHelpCircle />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List> */}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const NavItem = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;
