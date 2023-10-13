import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const ModeSelector = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleModeSelect = (mode) => {
    props.actions.scheduleWidgetAction(mode);
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <Flex gap={"0.5rem"}>
          <Button
            colorScheme={"teal"}
            onClick={() => handleModeSelect("Online")}
          >
            Online
          </Button>
          <Button
            colorScheme={"teal"}
            onClick={() => handleModeSelect("Offline")}
          >
            Offline
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default ModeSelector;
