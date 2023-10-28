import React from 'react'
import {Box, Image} from "@chakra-ui/react";

const BotAvatar = () => {
    return (
        <Box height={"fit-content"} postion={"relative"}
             alignItems={"center"}>
            <Image src={"./botProfilePicture.png"} height={"40px"} marginRight={"12.5px"}/>
        </Box>
    )
}
export default BotAvatar
