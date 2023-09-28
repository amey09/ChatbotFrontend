import {Button, FormControl, Input} from "@chakra-ui/react";
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
            <FormControl display={"flex"} gap={"1rem"}>
                <Input placeholder={"Name"} value={name} onChange={(e) => setName(e.target.value)}/>
                <Input placeholder={"Age"} value={age}
                       onChange={(e) => {
                           const value = e.target.value;
                           setAge(value === "" ? 0 : parseInt(value, 10));
                       }} isRequired/>
                <Button onClick={handleSubmit} backgroundColor={"black"} textColor={"white"}
                        width={"10rem"}>Submit</Button>
            </FormControl>
        </div>
    ) : null;
};

export default InputField;
