import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline, InputLabel, Select, MenuItem } from '@mui/material'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router'


const LoginForm = () => {
  const [body, setBody] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (body.role === "trainer") {
    axios
      .post("http://localhost:4000/trainer/login", body)
      .then(({ data }) => {
        localStorage.setItem("auth", '"yes"');
        localStorage.setItem("role", body.role);
        navigate("/");
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
    }
    if (body.role === "dietitian") {
      axios
        .post("http://localhost:4000/dietitian/login", body)
        .then(({ data }) => {
          localStorage.setItem("auth", '"yes"');
          localStorage.setItem("role", body.role);
          navigate("/");
        })
        .catch(({ response }) => {
          console.log(response.data);
        });
      }
  };

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
            Sign In
          </Typography>
          <form >
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
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
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Email"
              value={body.email}
              onChange={inputChange}
              name="email"
            />
            <TextField
              fullWidth
              type="password"
              color="primary"
              margin="normal"
              variant="outlined"
              label="Password"
              value={body.password}
              onChange={inputChange}
              name="password"
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
