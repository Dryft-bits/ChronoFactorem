//^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$ - regexp for email
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
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
        isOpen: true,
        username: "",
        password: "",
        name: "",
        email: "",
        confPass: "",
        existingUsername: false,
        weakPassword: false,
        matchPass: true,
        emptyUserField: true,
        emptyPassField: true,
        emptyNameField: true, 
        emptyDeptField: true,
        emptyEmailField: true,
    });

    const handleClose = () => {
        setOpen({
            ...open,
            isOpen: false,
        });
    }
    if (open.isOpen === false) {
        return <Redirect to='/'></Redirect>
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
        const eq = (e.target.value === open.password);
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
        //window.alert("here");
        e.preventDefault();
        if (open.confPass === open.password
            && !open.invalidEmail
            && !open.weakPassword
            &&  open.matchPass
            && !open.emptyDeptField 
            && !open.emptyEmailField 
            && !open.emptyNameField 
            && !open.emptyUserField 
            && !open.emptyPassField
            /*lol too tired to think better */) {
            console.log("shit");
            axios.get("/api/profAuth/createAcc", {params: {
                username: open.username,
                password: open.password,
                name: open.name,
                email: open.email,
                department: open.department
            }}).then(
                (res, err) => {
                    if (err) {
                        console.log(err);
                        window.alert("oof")
                    }
                    if (res.status === 400) {
                        iu = true;
                        window.alert("oof")
                    }
                    if (res === null || res === undefined) {
                        iu = false;
                        window.alert("oof")
                    }
                    else {
                        iu = false;
                        io = false;
                        window.alert("Submitted!");
                    }

                }
            );
            setOpen({
                ...open,
                existingUsername: iu,
                isOpen: io
            });
        }
    }
    console.log("oof",props['true']);
    return (
    <Dialog open={props['true']} aria-labelledby="form-dialog-title">
        <form onSubmit={submit}>
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your username and password
          </DialogContentText>
                <TextField
                    autoFocus
                    error={open.existingUsername || open.emptyUserField}
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    onChange={editUsername}
                    helperText={open.existingUsername ? "Username already exists" : (open.emptyUserField ? "Empty" : "")}
                />
                <TextField
                    error={open.weakPassword || open.emptyPassField}
                    autoFocus
                    margin="dense"
                    id="pass"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={editPassword}
                    helperText={open.weakPassword ? "pass should be 8 chars long" :(open.emptyPassField?"Empty":"")}
              />
              <TextField
                    error={!open.matchPass || open.emptyPassField}
                    autoFocus
                    margin="dense"
                    id="confpass"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    onChange={editConf}
                    helperText={!open.matchPass ? "passwords do not match" : (open.emptyPassField ? "Empty" : "")}
                />
                <TextField
                    error={open.emptyNameField}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    onChange={editName}
                    helperText={(open.emptyNameField ? "Empty" : "")}
                />
                <TextField
                    error={open.invalidEmail || open.emptyEmailField}
                    autoFocus
                    margin="dense"
                    id="email"
                    label="email"
                    type="email"
                    fullWidth
                    onChange={editEmail}
                    helperText={open.invalidEmail ? "Invalid Email" : (open.emptyEmailField ? "Empty" : "")}
                />
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={editDept}
                        error={open.emptyDeptField}
                        helperText="Empty Field"
                    >
                        {depts.map(dept => {
                            return <MenuItem value={dept}>{dept}</MenuItem>
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