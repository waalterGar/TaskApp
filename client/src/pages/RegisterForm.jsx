import React, { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const LoginForm = () => {
  const [body, setBody] = useState({ email: "", password: "" });
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [helperTexts, setHelperText] = useState("");

  const validate = () => {
    let isValid = true;
    let helpers = {};
    let errors = {};

    if (!body.role) {
      helpers.role = "This field is required.";
      errors.role = true;
      isValid = false;
    }

    if (!body.name) {
      helpers.name = "This field is required.";
      errors.name = true;
      isValid = false;
    }else if(!body.name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)){
      helpers.name = "Name is not valid";
      errors.name = true;
      isValid = false;
    }

    if (!body.email) {
      helpers.email = "This field is required.";
      errors.email = true;
      isValid = false;
    } else if (!body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ) {
      helpers.email = "Email is not valid.";
      errors.email = true;
      isValid = false;
    }

    if (!body.password) {
      helpers.password = "This field is required.";
      errors.password = true;
      isValid = false;
    } else if (!body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      helpers.password =
        "Password must be at least 8 characters long and contain at least one letter and one number.";
      errors.password = true;
      isValid = false;
    }

    if (!body.phone_num) {
      helpers.phone_num = "This field is required.";
      errors.phone_num = true;
      isValid = false;
    } else if (!body.phone_num.match(/^[6789]\d{8}$/)) {
      helpers.phone_num = "Phone number is not valid. It must start with 6,7,8 or 9 and must be 9 digits long.";
      errors.phone_num = true;
      isValid = false;
    }

    if (!body.birth_date) {
      helpers.birth_date = "This field is required.";
      errors.birth_date = true;
      isValid = false;
    }

    if(!body.gender){
      helpers.gender = "This field is required.";
      errors.gender = true;
      isValid = false;
    }

    setErrors({
      ...errors,
    });

    setHelperText({
      ...helpers,
    });

    return isValid;
  };

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    console.log("BODY", body);
    if(validate()){
      if (body.role === "trainer") {
        axios
          .post("http://localhost:4000/trainer/register", body)
          .then(({ data }) => {
            navigate("/login");
          })
          .catch(({ response }) => {
            console.log(response.data);
          });
      }
      if (body.role == "dietitian") {
        console.log("onsubmit dietitian");
        axios
          .post("http://localhost:4000/dietitian/register", body)
          .then(({ data }) => {
            navigate("/login");
          })
          .catch(({ response }) => {
            console.log(response.data);
          });
      }
      console.log("submited");
    }
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Container component={Paper} elevation={5} maxWidth="xs">
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              fullWidth
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              value={body.role}
              label="Role"
              onChange={inputChange}
              HelperText = {helperTexts.role} 
              error={errors.role}       
            >
              <MenuItem value={"dietitian"}>Dietitian</MenuItem>
              <MenuItem value={"trainer"}>Trainer</MenuItem>
            </Select>
            <TextField
              fullWidth
              autoFocus
              required
              color="primary"
              margin="normal"
              variant="outlined"
              label="Full Name"
              value={body.name}
              onChange={inputChange}
              name="name"
              helperText = {helperTexts.name}
              error={errors.name}
            />

            <TextField
              fullWidth
              autoFocus
              required
              color="primary"
              margin="normal"
              variant="outlined"
              label="Email"
              value={body.email}
              onChange={inputChange}
              name="email"
              helperText = {helperTexts.email}
              error={errors.email}
            />
            <TextField
              fullWidth
              required
              type="password"
              color="primary"
              margin="normal"
              variant="outlined"
              label="Password"
              value={body.password}
              onChange={inputChange}
              name="password"
              helperText = {helperTexts.password}
              error={errors.password}
            />
            <TextField
              fullWidth
              autoFocus
              required
              color="primary"
              margin="normal"
              variant="outlined"
              label="Phone number"
              value={body.phone_num}
              onChange={inputChange}
              name="phone_num" 
              helperText = {helperTexts.phone_num}
              error={errors.phone_num}        
            />
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <TextField
              fullWidth
              autoFocus
              required
              type="date"
              color="primary"
              margin="normal"
              variant="outlined"
              format="YYYY-MM-DD"
              value={body.birth_date}
              onChange={inputChange}
              name="birth_date"
              helperText = {helperTexts.birth_date}
              error={errors.birth_date}
            />
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              fullWidth
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              value={body.gender}
              onChange={inputChange}
              name="gender"
              helperText = {helperTexts.gender}
              error = {errors.gender}      
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Trainer</MenuItem>
              <MenuItem value={"Trans Male"}>Trans Male</MenuItem>
              <MenuItem value={"Trans Female"}>Trans Female</MenuItem>
              <MenuItem value={"Agender"}>Agender</MenuItem>
              <MenuItem value={"Bigender"}>Bigender</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </Grid>
  );
};
export default LoginForm;
