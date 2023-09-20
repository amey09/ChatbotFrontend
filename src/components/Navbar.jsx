import React from "react";
import {
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { HamburgerIcon } from "@chakra-ui/icons";
const Navbar = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={"15svh"}
      padding={"1rem"}
      backgroundColor={"whiteAlpha.200"}
      boxShadow={"lg"}
      position={"fixed"}
      width={"100%"}
      as="header"
      zIndex={9999}
    >
      <Image src={"/happily-ever-logo.png"} height={"10svh"} width={"10svh"} display={'block'}/>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList minWidth={"20vw"}>
          <MenuItem icon={<FaUserCircle />}>Profile</MenuItem>
          <MenuItem icon={<BsCalendar3 />}>Your Bookings</MenuItem>
          <MenuItem icon={<MdLogout />}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
export default Navbar;
