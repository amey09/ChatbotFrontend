import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const InitialButton = (props) => {
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleGotIt = () => {
    props.actions.initialAction();
    setButtonVisible(false);
  };

  return buttonVisible ? <Button onClick={handleGotIt}>Got It!</Button> : null;
};

export default InitialButton;
