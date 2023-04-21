import { useState } from "react";
import Popup from "reactjs-popup";

function EditProfile({ user, handleLogout }) {
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

    function handleDelete() {

        fetch(`/users/delete/${user.id}`, {
            method:'DELETE',
        })
        .then(handleLogout)
        alert("Profile Deleted Sucessfully")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="text-center">
                    <h1>{user.username}</h1>
                </div>
                <div className="col-12 justify-content-center" style={{display: "flex", marginTop:"30px"}}>
                    <p><strong>Password:&nbsp;</strong></p><p style={{marginRight:"10px"}}>XXXXXXXXXX</p>
                    <Popup trigger={<button className="maroonButtonColor-btn" style={{width:"65px", height:"30px", marginTop:"-3px" }}>edit</button>} position="right center">
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
                                className="maroonButtonColor-btn"
                                style={{marginTop:"5px", marginLeft:"px"}} 
                                type="submit"
                                name="submit"
                                value="Change Password"
                            />
                        </form>
                    </Popup>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="col-12 justify-content-center" style={{display: "flex"}}>
                    <p style={{marginRight:"10px"}}><strong>Address:</strong> {user.address}</p>
                    <Popup trigger={<button className="maroonButtonColor-btn" style={{width:"65px", height:"30px", marginTop:"-3px" }}>edit</button>} position="right center">
                        <form onSubmit={handleSubmitAddress}>
                            <label>New Address:</label>
                            <br></br>
                            <input 
                                type="text"
                                name="address"
                                value={address}
                                onChange={handleChangeAddress}
                            />
                            <input
                                style={{marginTop:"5px"}}
                                className="maroonButtonColor-btn" 
                                type="submit"
                                name="submit"
                                value="Change Address"
                            />
                        </form>
                    </Popup>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="col-12 justify-content-center">
                    <p className="text-center"><strong>Profile Image</strong></p>
                    <div className="justify-content-center" style={{margin: "8px"}}>
                        <img className="mx-auto col-3 d-flex profile-image text-center" src={user.img_url}></img>
                    </div>
                    <div className="mx-auto text-center">
                        <Popup trigger={<button className="maroonButtonColor-btn" style={{width:"200px", height:"30px" }} >Change Profile Picture</button>} position="right center">
                            <form onSubmit={handleSubmitImage}>
                                <label>New Profile Image Url:</label>
                                <input 
                                    type="text"
                                    name="image"
                                    value={img_url}
                                    onChange={handleChangeImage}
                                />
                                <input
                                    style={{marginTop:"5px"}}
                                    className="maroonButtonColor-btn"
                                    type="submit"
                                    name="submit"
                                    value="change profile"
                                />
                            </form>
                        </Popup>
                    </div>
                </div>
                <div className="col-12 justify-content-center" style={{marginTop:"100px"}}>
                    <div className="mx-auto text-center">
                        <Popup trigger={<button className="maroonButtonColor-btn">Delete Profile</button>} position="center">
                            <form onSubmit={handleDelete}>
                                <img className="gif-image" src="https://media.tenor.com/-4Iy6FWh1gEAAAAC/ru-sure-about-that.gif" />
                                <input
                                style={{marginTop:"5px", width:"290px", height:"50px"}}
                                    className="maroonButtonColor-btn"
                                    type="submit"
                                    name="submit"
                                    value="Delete Profile"
                                />
                            </form>
                        </Popup>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"1000px"}}></div>
        </div>
    )
}

export default EditProfile;