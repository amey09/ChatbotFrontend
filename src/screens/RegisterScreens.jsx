import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
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
    InputLeftElement, FormErrorMessage
} from "@chakra-ui/react";
import {EmailIcon, LockIcon} from "@chakra-ui/icons";
import {Link, useNavigate} from "react-router-dom";

function RegisterScreen() {
    const navigate = useNavigate()

    const handleSubmit = (values, actions) => {
        navigate('/login')
        actions.resetForm();
    }

    return (
        <Formik
            initialValues={{email: '', password: '', confirmPassword: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email")
                    .required('Email Required'),
                password: Yup.string()
                    .required('Password Required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords Must Match!')
                    .required('Password Confirmation Required'),
            })}
            onSubmit={handleSubmit}
        >
            {formik => (
                <Form>
                    <Center minHeight={"85vh"} backgroundColor={'black'} textColor={"white"}>
                        <Flex
                            flexDir={'column'}
                            justifyContent={'flex-start'}
                            gap={"2rem"}
                            width={{md: '60vw', lg: '50vw', xl: '20vw'}}
                            transform={"translateY(-4vh)"}
                        >
                            <Heading fontWeight={"500"}>Register</Heading>
                            <VStack gap={"1.3rem"} alignItems={"left"}>
                                <Field type="email" name="email">
                                    {({field}) => (
                                        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
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
                                        <FormControl isInvalid={formik.touched.password && formik.errors.password}>
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
                                            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}>
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
                            </VStack>
                            <Button type="submit" rounded={'0.5rem'} colorScheme={"blue"}>
                                Sign Up
                            </Button>
                            <Link to={"/login"}>
                                <Button
                                    variant={'link'}
                                    textAlign={'left'}
                                    width={'fit-content'}
                                    textColor={'white'}
                                    fontSize={'sm'}
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
