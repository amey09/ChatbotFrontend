import React from "react";
import {
    Box,
    IconButton,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";

import {MdLogout} from "react-icons/md";
import {BsCalendar3} from "react-icons/bs";
import {CgMenuMotion} from "react-icons/cg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../slices/authSlice";
import ActionModal from "./ActionModal";
import {toast, ToastContainer} from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {userInfo} = useSelector((state) => state.auth);

    const handleLogout = () => {
        try {
            dispatch(logout());
            toast.success("Logout Successful", {
                position: "bottom-left",
                autoClose: 3000,
            });
            navigate("/login");
            onClose();
        } catch (error) {
            throw new Error(error)
        }
    };

    return (
        <>
            <ToastContainer/>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                backgroundColor={"whitesmoke"}
                alignItems={"center"}
                minHeight={"10svh"}
                padding={"1rem 1.5rem"}
                position={"sticky"}
                top={0}
                width={"100%"}
                as="header"
                zIndex={700}
                textColor={"black"}
            >
                <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    onClick={() => navigate("/")}
                    cursor={"pointer"}
                    letterSpacing={"0.6rem"}
                    fontWeight={"bold"}
                >
                    AMEY
                </Text>
                {userInfo && (
                    <>
                        <Menu>
                            <ActionModal
                                alertTitle={"Logout"}
                                alertDialogue={
                                    "Are you sure? You can't undo this action afterwards."
                                }
                                modalActionBtnTitle={"Logout"}
                                handleModalAction={handleLogout}
                                onClose={onClose}
                                isOpen={isOpen}
                            />
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<CgMenuMotion/>}
                                fontSize={"3rem"}
                            />
                            <MenuList
                                backgroundColor={"whitesmoke"}
                                justifyContent={"space-evenly"}
                                display={"flex"}
                                flexDir={"column"}
                            >
                                <MenuItem
                                    icon={<BsCalendar3/>}
                                    backgroundColor={"whitesmoke"}
                                    onClick={() => navigate("/dashboard")}
                                >
                                    Your Bookings
                                </MenuItem>
                                <MenuItem
                                    icon={<MdLogout/>}
                                    backgroundColor={"whitesmoke"}
                                    onClick={onOpen}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                )}
            </Box>
        </>
    );
};
export default Navbar;
