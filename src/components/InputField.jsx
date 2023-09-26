import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React, {useState} from "react";

const InputField = (props) => {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = () => {
        console.log(name, age);
        props.actions.finalAction({name, age});
        props.actions.scheduleWidgetAction();
        setSubmitted(true);
    };

    return !submitted ? (
        <div>
            <InputGroup display={"flex"} gap={"1rem"}>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant={"filled"}
                />
                <Input
                    placeholder="Age"
                    value={age}
                    onChange={(e) => {
                        const value = e.target.value;
                        setAge(value === "" ? 0 : parseInt(value, 10));
                    }}
                    variant={"filled"}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleSubmit}>
                        Submit
                    </Button>
                </InputRightElement>
            </InputGroup>
        </div>
    ) : null;
};

export default InputField;
