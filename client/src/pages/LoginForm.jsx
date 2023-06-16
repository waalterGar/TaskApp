import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline, InputLabel, Select, MenuItem } from '@mui/material'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { loginTrainerRequest } from '../api/trainer.api'
import { loginDietitianRequest } from '../api/dietitian.api'
import { useAuth } from '../context/AuthProvider'

const LoginForm = () => {
  const [body, setBody] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [errors, setErrors] = useState({});
  const [helperTexts, setHelperText] = useState("");

  const validate = () => {
    let isValid = true;
    let helpers = {};
    let errors = {};

    if(!body.role){
      helpers.role = "This field is required.";
      errors.role = true;
      isValid = false;
    }

   if(!body.email){
      helpers.email = "This field is required.";
      errors.email = true;
      isValid = false;
    }

    if(!body.password){
      helpers.password = "This field is required.";
      errors.password = true;
      isValid = false;
    }

    setErrors({
      ...errors
    });
    
    setHelperText({ 
      ...helpers
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
    if (validate()){
      let response = null;
    if (body.role === "trainer") {
      response = await loginTrainerRequest(body);
    }
    if (body.role === "dietitian") {
      response = await loginDietitianRequest(body);
    }
    if (response.status === 202) {
      console.log("response", response);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigate("/");
    }
    }
  }
  return (
    <Grid container component="main" >
      <CssBaseline />
      <Container
        component={Paper}
        elevation={5}
        maxWidth="xs"
      >
        <div >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form >
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              error={errors.role}
              helperText={helperTexts.role}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              value={body.role}
              label="Role"
              onChange={inputChange}
            >
              <MenuItem value={"dietitian"}>Dietitian</MenuItem>
              <MenuItem value={"trainer"}>Trainer</MenuItem>
            </Select>
            <TextField
              helperText={helperTexts.email}
              fullWidth
              autoFocus
              required
              color="secondary"
              margin="normal"
              variant="outlined"
              label="Email"
              value={body.email}
              onChange={inputChange}
              name="email"
              error={errors.email}
            />
            <TextField  
              helperText={helperTexts.password}
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
              error={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              Sign In
            </Button>

            <div className='justify-center cursor-pointer' onClick={() => navigate(`/register`)}>Register </div>
    
          </form>
        </div>
      </Container>
    </Grid>
  );
};
export default LoginForm;
