import React, {useEffect, useState} from "react";
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
    FormErrorMessage,
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {EmailIcon, UnlockIcon} from "@chakra-ui/icons";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useLoginMutation} from "../slices/usersApiSlice";
import {setCredentials} from "../slices/authSlice";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

function LoginScreen() {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (values) => {
        const {email, password} = values;
        setLoadingLogin(true);
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate("/");
            toast.success("Login successful", {
                position: "bottom-left",
                autoClose: 3000,
            });
        } catch (err) {
            toast.error("Invalid username or password", {
                position: "bottom-left",
                autoClose: 3000,
            });
        } finally {
            setLoadingLogin(false);
        }
    };

    if (isLoading || loadingLogin) {
        return <Loader/>;
    }

    return (
        <Formik
            initialValues={{email: "", password: ""}}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email").required("Email Required"),
                password: Yup.string().required("Password Required"),
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <ToastContainer/>
                    <Center
                        minHeight={"90svh"}
                        backgroundColor={"black"}
                        textColor={"white"}
                    >
                        <Flex
                            flexDir={"column"}
                            justifyContent={"flex-start"}
                            gap={"2rem"}
                            width={{md: "60svw", lg: "50svw", xl: "20svw"}}
                        >
                            <Heading fontWeight={"500"}>Sign In</Heading>
                            <VStack gap={"1.3rem"} alignItems={"left"}>
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
                                                    <UnlockIcon/>
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
                                <Button
                                    variant={"link"}
                                    textAlign={"left"}
                                    width={"fit-content"}
                                    textDecoration={"underline"}
                                    fontSize={"xs"}
                                >
                                    FORGOT PASSWORD?
                                </Button>
                            </VStack>
                            <Button rounded={"0.5rem"} colorScheme={"blue"} type="submit">
                                Sign In
                            </Button>
                            <Link to={"/register"}>
                                <Button
                                    variant={"link"}
                                    textAlign={"left"}
                                    width={"fit-content"}
                                    fontSize={"sm"}
                                    textColor={"White"}
                                >
                                    Don't have an account? Sign up
                                </Button>
                            </Link>
                        </Flex>
                    </Center>
                </Form>
            )}
        </Formik>
    );
}

export default LoginScreen;
