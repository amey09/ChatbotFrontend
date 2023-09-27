import React from "react";
import {
    Box,
    IconButton,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";

import {FaUserCircle} from "react-icons/fa";
import {MdLogout} from "react-icons/md";
import {BsCalendar3} from "react-icons/bs";
import {HamburgerIcon} from "@chakra-ui/icons";

const Navbar = () => {
    return (
        <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"15svh"}
            padding={"1rem 1.5rem"}
            backgroundColor={"black"}
            width={"100%"}
            as="header"
            zIndex={9999}
            textColor={"white"}
        >
            <Text fontSize={'1.5rem'}>APPLE</Text>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon/>}
                    variant="transperent"
                    fontSize={"3rem"}
                />
                <MenuList minWidth={"1.5rem"} backgroundColor={"black"} height={'10rem'} justifyContent={'center'}
                          display={"flex"} flexDir={"column"}>
                    <MenuItem icon={<FaUserCircle/>} backgroundColor={"black"}>Profile</MenuItem>
                    <MenuItem icon={<BsCalendar3/>} backgroundColor={"black"}>Your Bookings</MenuItem>
                    <MenuItem icon={<MdLogout/>} backgroundColor={"black"}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};
export default Navbar;
