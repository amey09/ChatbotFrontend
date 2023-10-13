import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const AgeSelector = (props) => {
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleAgeSelect = () => {
    props.actions.modeSelection(age);
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <Flex gap={"1rem"} maxW={"50%"}>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            variant="filled"
            placeholder="Enter Age"
            border={"2px solid teal"}
          />
          <Button colorScheme="teal" onClick={handleAgeSelect}>
            Submit
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default AgeSelector;
