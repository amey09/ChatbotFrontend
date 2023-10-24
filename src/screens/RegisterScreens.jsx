import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {
    Flex,
    Center,
    Heading,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Button,
    InputGroup,
    InputLeftElement,
    FormErrorMessage, FormHelperText,
} from "@chakra-ui/react";
import {EmailIcon, LockIcon} from "@chakra-ui/icons";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useRegisterMutation} from "../slices/usersApiSlice";
import {BiSolidUser} from "react-icons/bi";
import {CgKey} from "react-icons/cg";

function RegisterScreen() {
    const navigate = useNavigate();
    const [register] = useRegisterMutation()


    const handleSubmit = async (values) => {
        const {name, email, password, confirmPassword, secretKey} = values;
        try {
            const res = await register({name, email, password, confirmPassword, secretKey}).unwrap();
            console.log(res)
            navigate("/login");
            toast.success("Register successful", {
                position: "bottom-left",
                autoClose: 3000,
            });
        } catch (err) {
            toast.error("Bad credentials", {
                position: "bottom-left",
                autoClose: 3000,
            });
        }
    };

    return (
        <Formik
            initialValues={{email: "", password: "", confirmPassword: "", name: "", secretKey: ""}}
            validationSchema={Yup.object({
                name: Yup.string().required("Name Required"),
                email: Yup.string().email("Invalid email").required("Email Required"),
                password: Yup.string().required("Password Required"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords Must Match!")
                    .required("Password Confirmation Required"),
                secretKey: Yup.string()
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <Center
                        minHeight={"90vh"}
                        backgroundColor={"black"}
                        textColor={"white"}
                    >
                        <Flex
                            flexDir={"column"}
                            justifyContent={"flex-start"}
                            gap={"1rem"}
                            width={{md: "60vw", lg: "50vw", xl: "20vw"}}

                        >
                            <Heading fontWeight={"500"}>Register</Heading>
                            <VStack gap={"0.5rem"} alignItems={"left"}>
                                <Field type="name" name="name">
                                    {({field}) => (
                                        <FormControl
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        >
                                            <FormLabel>Name</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement aria-label="Email Icon">
                                                    <BiSolidUser/>
                                                </InputLeftElement>
                                                <Input
                                                    {...field}
                                                    type="name"
                                                    placeholder="Enter Name"
                                                />
                                            </InputGroup>
                                            <FormErrorMessage name="name">
                                                {formik.errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field type="email" name="email">
                                    {({field}) => (
                                        <FormControl
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        >
                                            <FormLabel>Email</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement aria-label="Email Icon">
                                                    <EmailIcon/>
                                                </InputLeftElement>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Enter Email"
                                                />
                                            </InputGroup>
                                            <FormErrorMessage name="email">
                                                {formik.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field type="password" name="password">
                                    {({field}) => (
                                        <FormControl
                                            isInvalid={
                                                formik.touched.password && formik.errors.password
                                            }
                                        >
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement aria-label="Password Icon">
                                                    <LockIcon/>
                                                </InputLeftElement>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Enter Password"
                                                />
                                            </InputGroup>
                                            <FormErrorMessage name="password">
                                                {formik.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field type="confirmPassword" name="confirmPassword">
                                    {({field}) => (
                                        <FormControl
                                            isInvalid={
                                                formik.touched.confirmPassword &&
                                                formik.errors.confirmPassword
                                            }
                                        >
                                            <FormLabel>Confirm Password</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement aria-label="Password Icon">
                                                    <LockIcon/>
                                                </InputLeftElement>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Re Enter Password"
                                                />
                                            </InputGroup>
                                            <FormErrorMessage name="password">
                                                {formik.errors.confirmPassword}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field type="secretKey" name="secretKey">
                                    {({field}) => (
                                        <FormControl
                                        >
                                            <FormLabel>Admin-key</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement aria-label="Secret Key Icon">
                                                    <CgKey/>
                                                </InputLeftElement>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Optional"
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    )}
                                </Field>
                            </VStack>
                            <Button type="submit" rounded={"0.5rem"} colorScheme={"blue"}>
                                Sign Up
                            </Button>
                            <Link to={"/login"}>
                                <Button
                                    variant={"link"}
                                    textAlign={"left"}
                                    width={"fit-content"}
                                    textColor={"white"}
                                    fontSize={"sm"}
                                >
                                    Existing User? Login
                                </Button>
                            </Link>
                        </Flex>
                    </Center>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterScreen;
