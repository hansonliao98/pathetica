// REGISTER FOR A NEW ACCOUNT

import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
  //wen validating user inputs, automated form private app "yup"
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  //sets initial values
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  console.log(palette);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px");

  const isLogin = pageType === "login"; //BOOLEAN
  const isRegister = pageType === "register"; //BOOLEAN

  const register = async (values, onSubmitProps) => {
    // The following lets us send form info with image
    const formData = new FormData(); //an object that must be added in unique way:
    for (let value in values) {
      formData.append(value, values[value]); //loop through every key value in this object, and APPEND it to formData
    }
    formData.append("picturePath", values.picture.name); //name of the image (ex: light.jpeg) IS the picturePath we set

    const saveUserResponse = await fetch(
      //sending formData to the api call
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await saveUserResponse.json(); //parsable form and save json into const here
    onSubmitProps.resetForm(); //coming from Formic

    if (savedUser) {
      //if savedUser was successful (has smth in it)
      setPageType("login"); //now we set pageType as register
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      //fetch the user data from the API
      //sending formData to the api call
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), //values were already inputted into the correct format so no restructuring needed
      }
    );
    const loggedIn = await loggedInUserResponse.json(); //save Json in const here
    onSubmitProps.resetForm(); //coming from formic

    if (loggedIn) {
      //if theres smth in here,
      dispatch(
        setLogin({
          //dispatch action --> reducer
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit} //here, the handleSubmit we made directly connects to the handleFormSubmit() function
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} //IF we're on the isLogin page, THEN we initial the page with isLogin data. IF we're on register page, we submit the page with isRegister data
      validationSchema={isLogin ? loginSchema : registerSchema} //using formic to validate user inputs
    >
      {(
        {
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        } //these values allow u to use them inside your components
      ) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" //MEANING: we're gonna split our grid into 4 sections. minsize of 0, otherwise split into equal fractions of 4
            sx={{
              //targeting ANY DIVs RIGHT UNDER THIS ELEMENT as a child class will have the following:
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, //this takes priority over other styles
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName" //MUST be the same as the initialValues
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  } //check if label has been touched AND if theres an error
                  helperText={touched.firstName && errors.firstName} //If touched and has an error, we SHOW THIS INPUT AS WRONG
                  sx={{ gridColumn: "span 2" }} //remember: Large screens have "span 2", smaller screen "span 4"
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName" //MUST be the same as the initialValues
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)} //check if label has been touched AND if theres an error
                  helperText={touched.lastName && errors.lastName} //If touched and has an error, we SHOW THIS INPUT AS WRONG
                  sx={{ gridColumn: "span 2" }} //remember: Large screens have "span 2", smaller screen "span 4"
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location" //MUST be the same as the initialValues
                  error={Boolean(touched.location) && Boolean(errors.location)} //check if label has been touched AND if theres an error
                  helperText={touched.location && errors.location} //If touched and has an error, we SHOW THIS INPUT AS WRONG
                  sx={{ gridColumn: "span 4" }} //remember: Large screens have "span 2", smaller screen "span 4"
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation" //MUST be the same as the initialValues
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  } //check if label has been touched AND if theres an error
                  helperText={touched.occupation && errors.occupation} //If touched and has an error, we SHOW THIS INPUT AS WRONG
                  sx={{ gridColumn: "span 4" }} //remember: Large screens have "span 2", smaller screen "span 4"
                />
                {/* image upload box */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png,"
                    multiple={false}
                    onDrop={
                      (acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0]) //dropzone is a third party app, so we need to set this field's value manually, UNLKE the inputs before this one that are programmed with react.
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()} //MUST do with dropzone app. MUST pass the arguments into the immediate div underneath that the dropzone app with be in
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }} //on hover MUI condition
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          // picture upload widget
                          <p>Add picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email" //MUST be the same as the initialValues
              error={Boolean(touched.email) && Boolean(errors.email)} //check if label has been touched AND if theres an error
              helperText={touched.email && errors.email} //If touched and has an error, we SHOW THIS INPUT AS WRONG
              sx={{ gridColumn: "span 4" }} //remember: Large screens have "span 2", smaller screen "span 4"
            />
            <TextField
              label="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password" //MUST be the same as the initialValues
              error={Boolean(touched.password) && Boolean(errors.password)} //check if label has been touched AND if theres an error
              helperText={touched.password && errors.password} //If touched and has an error, we SHOW THIS INPUT AS WRONG
              sx={{ gridColumn: "span 4" }} //remember: Large screens have "span 2", smaller screen "span 4"
            />
          </Box>

          {/* BUTTONS FOR SWITCHING BETWEEN REGISTER AND LOGIN */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography //text for switching between login and register
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
