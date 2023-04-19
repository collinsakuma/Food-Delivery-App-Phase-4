import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Popup from "reactjs-popup";

function EditProfile({ user }) {
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [address, setAddress] = useState("")
    const [img_url, setImg_url] = useState("")

    function handleChangePassword(e) {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value);
        } 
        if (name === "passwordConfirmation") {
            setPasswordConfirmation(value)
        }
    }

    function handleSubmitPassword(e) {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert("Passwords must match!")
        }
        else {
            const updateProfile = {
                password_hash: password
            };
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateProfile),
            })
        }
    }

    function handleChangeAddress(e) {
        const {name, value} = e.target;
        if (name === "address") {
            setAddress(value)
        }
    }

    function handleSubmitAddress(e) {
        // e.preventDefault();
        const updateProfile = {
            address: address
        };
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProfile),
        })
        .then((r) => r.json())
        .then((r) => console.log(r))
    }

    function handleChangeImage(e) {
        const {name, value} = e.target;
        if (name === "image") {
            setImg_url(value)
        }
    }

    function handleSubmitImage(e) {
        // e.preventDefault();
        const updateProfile = {
            img_url: img_url
        };
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProfile),
        })
        .then((r) => r.json())
        .then((r) => console.log(r))
    }

    return (
        <div>
            <div>
                <h1>{user.username}</h1>
            </div>
            <div>
                <p>Password: XXXXXXXXX</p>
                <Popup trigger={<button>edit</button>} position="right center">
                    <form onSubmit={handleSubmitPassword}>
                        <label>New Password:</label>
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={handleChangePassword}
                        />
                        <input 
                            type="submit"
                            name="submit"
                            value="confirm change"
                        />
                    </form>
                </Popup>
            </div>
            <div>
                <p>address: {user.address}</p>
                <Popup trigger={<button>edit</button>} position="right center">
                    <form onSubmit={handleSubmitAddress}>
                        <label>new address:</label>
                        <input 
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChangeAddress}
                        />
                        <input 
                            type="submit"
                            name="submit"
                            value="confirm change"
                        />
                    </form>
                </Popup>
            </div>
            <div>
                <p>profile image:</p>
                <img src={user.img_url}></img>
                <Popup trigger={<button>edit</button>} position="right center">
                    <form onSubmit={handleSubmitImage}>
                        <label>New Profile Image</label>
                        <input 
                            type="text"
                            name="image"
                            value={img_url}
                            onChange={handleChangeImage}
                        />
                        <input 
                            type="submit"
                            name="submit"
                            value="confirm change"
                        />
                    </form>
                </Popup>
            </div>
        </div>
    )
}

export default EditProfile;