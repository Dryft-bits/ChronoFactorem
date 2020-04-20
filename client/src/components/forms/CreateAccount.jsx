import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from "react";
import "../../styles/Landing.css";
import { useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
const depts = [
    "Biological Sciences",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Computer Science and Information Systems",
    "Economics & Finance",
    "Electrical & Electronics Engineering",
    "Humanities",
    "Mathematics",
    "Mechanical Engineering",
    "Pharmacy",
    "Physics",
];
const CreateAccount = (props) => {
    const [open, setOpen] = useState({
        username: "",
        password: "",
        name: "",
        department: "",
        email: "",
        confPass: "",
        invalidEmail: false,
        existingUsername: false,
        weakPassword: false,
        matchPass: true,
        emptyUserField: true,
        emptyPassField: true,
        emptyNameField: true,
        emptyDeptField: true,
        emptyEmailField: true,
        hitSubmit: false,
    });
    const {
        username,
        password,
        name,
        department,
        email,
        confPass,
        invalidEmail,
        existingUsername,
        weakPassword,
        matchPass,
        emptyUserField,
        emptyPassField,
        emptyNameField,
        emptyDeptField,
        emptyEmailField,
        hitSubmit
    } = open;

    const handleClose = () => {
        props.action();
        setOpen({
            ...open,
            hitSubmit: false
        });
    }
    const editUsername = (e) => {
        e.preventDefault();
        setOpen({
            ...open,
            username: e.target.value,
            existingUsername: false,
            emptyUserField: (e.target.value === null || e.target.value.length === 0) ? true : false
        });
    }
    const editPassword = (e) => {
        e.preventDefault();
        setOpen({
            ...open,
            password: e.target.value,
            weakPassword: (e.target.value.length < 8) ? true : false,
            emptyPassField: (e.target.value === null || e.target.value.length === 0) ? true : false
        });
    }
    const editConf = (e) => {
        const eq = (e.target.value === password);
        e.preventDefault();
        setOpen({
            ...open,
            confPass: e.target.value,
            matchPass: (eq) ? true : false,
            emptyPassField: (e.target.value === null || e.target.value.length === 0) ? true : false
        });
    }
    const editName = (e) => {
        e.preventDefault();
        setOpen({
            ...open,
            name: e.target.value,
            emptyNameField: (e.target.value === null || e.target.value.length === 0) ? true : false
        })
    }
    const editEmail = (e) => {
        e.preventDefault();
        setOpen({
            ...open,
            email: e.target.value,
            emptyEmailField: (e.target.value === null || e.target.value.length === 0) ? true : false,
            invalidEmail: (e.target.value.match("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$") === null) ? true : false,
        })
    }
    const editDept = (e) => {
        e.preventDefault();
        setOpen({
            ...open,
            department: e.target.value,
            emptyDeptField: e.target.value === null ? true : false
        })
    }
    const submit = (e) => {
        let iu = false, io = true;
        e.preventDefault();
        if (confPass === password
            && !invalidEmail
            && !weakPassword
            && matchPass
            && !emptyDeptField
            && !emptyEmailField
            && !emptyNameField
            && !emptyUserField
            && !emptyPassField
            /*lol too tired to think better */) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",

                }
            };
            axios.post("/api/profAuth/createAcc", {
                username: username,
                password: password,
                name: name,
                email: email,
                department: department
            },config).then(
                (res, err) => {
                    if (err) {
                        console.log(err);

                    }
                    else if (res.status === 206) {
                        iu = true;

                    }
                    else if (!res) {
                        iu = false;
                    }
                    else {
                        iu = false;
                        io = false;
                        window.alert("Submitted!"); //change the window.alert to something better, or just remove this
                    }
                    setOpen({
                        ...open,
                        existingUsername: iu,
                        isOpen: io,
                        hitSubmit: true
                    });
                }
            ).catch((err) => {
                console.log("Server error: ", err);
            }
            );

        }
        else{
            setOpen({
                ...open,
                hitSubmit: true,
            })
        }
    }
    return (
        <Dialog open={props['open']} aria-labelledby="form-dialog-title">
            <form onSubmit={submit}>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your username and password
          </DialogContentText>
                    <TextField
                        autoFocus
                        error={hitSubmit &&(existingUsername || emptyUserField)}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={editUsername}
                        helperText={existingUsername ? "Username already exists" : (emptyUserField ? "Empty" : "")}
                    />
                    <TextField
                        error={hitSubmit && (weakPassword || emptyPassField)}
                        autoFocus
                        margin="dense"
                        id="pass"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={editPassword}
                        helperText={weakPassword ? "pass should be 8 chars long" : (emptyPassField ? "Empty" : "")}
                    />
                    <TextField
                        error={hitSubmit && (!matchPass || emptyPassField)}
                        autoFocus
                        margin="dense"
                        id="confpass"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        onChange={editConf}
                        helperText={!matchPass ? "passwords do not match" : (emptyPassField ? "Empty" : "")}
                    />
                    <TextField
                        error={hitSubmit && emptyNameField}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        fullWidth
                        onChange={editName}
                        helperText={(emptyNameField ? "Empty" : "")}
                    />
                    <TextField
                        error={hitSubmit && (invalidEmail || emptyEmailField)}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="email"
                        type="email"
                        fullWidth
                        onChange={editEmail}
                        helperText={invalidEmail ? "Invalid Email" : (emptyEmailField ? "Empty" : "")}
                    />
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={editDept}
                            error={hitSubmit && emptyDeptField}
                            helperText="Empty Field"
                        >
                            {depts.map(dept => {
                                return <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button type='submit' color="primary">
                        Register
          </Button>
                </DialogActions>
            </form>
        </Dialog>);
}
export default CreateAccount;