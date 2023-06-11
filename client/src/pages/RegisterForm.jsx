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
    Select
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router";

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

  const onSubmit = async () => {
    console.log("onsubmit", body);
    if (body.role === "trainer") {
    axios
      .post("http://localhost:4000/trainer/register", body)
      .then(({ data }) => {
        localStorage.setItem("auth", '"yes"');
        localStorage.setItem("role", "trainer");
        navigate("/");
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
    } 
    if(body.role == "dietitian"){
        console.log("onsubmit dietitian");
        axios
        .post("http://localhost:4000/dietitian/register", body)
        .then(({ data }) => {
            localStorage.setItem("auth", '"yes"');
            localStorage.setItem("role", "trainer");
            navigate("/");
        })
        .catch(({ response }) => {
            console.log(response.data);
        });
    }
    console.log("submited");
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
              label="Full Name"
              value={body.name}
              onChange={inputChange}
              name="name"
            />

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
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Phone number"
              value={body.phone_num}
              onChange={inputChange}
              name="phone_num"
            />
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Birth date"
              value={body.birth_date}
              onChange={inputChange}
              name="birth_date"
            />
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Gender"
              value={body.gender}
              onChange={inputChange}
              name="gender"
            />
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
