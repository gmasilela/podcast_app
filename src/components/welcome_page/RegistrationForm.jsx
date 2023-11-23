import React from 'react';
import './RegistrationForm.css'
import supabase from '../../config/supabaseClient';

function RegistrationForm({ toggleForm }) {

    const [formData, setFormData] = React.useState({
        userName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        acceptTerms: false
    })

    function handleChange(event) {
        const {type, checked, name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    async function handleSubmit (event) {
        event.preventDefault()
        if(formData.password === formData.passwordConfirm) {
            console.log("Successfully signed up")
        } else {
            console.log("Passwords do not match")
            return
        }
        
        try {
            const { user, error } = await supabase.auth.signUp({
                userName: formData.userName,
                email: formData.email,
                password: formData.password,

            }) 
            alert('Check youe emails for varification.')
        }
        catch (error) {
            alert(error)
        }
    }
    return (
        <div className="form-bg">
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-3 col-md-6 center-container">
                        <div className="form-container">
                            <h3 className="title">Register</h3>
                            <form onSubmit={handleSubmit}  className="form-horizontal">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input 
                                        type="text" 
                                        name="userName" 
                                        className="form-control" 
                                        id="text" 
                                        placeholder="User Name" 
                                        onChange={handleChange}
                                        value={formData.userName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email ID</label>
                                    <input 
                                    type="email" 
                                        name="email" 
                                        className="form-control" 
                                        id="email" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Email address" 
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        name="password"  
                                        className="form-control" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter Password" 
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="Confirm password"
                                        className= "form-control"
                                        name="passwordConfirm"
                                        onChange={handleChange}
                                        value={formData.passwordConfirm}
                                    />
                                </div>
                                <div className="check-terms">
                                    <input
                                        id="termAndCons"
                                        className="checkbox"
                                        type="checkbox"
                                        name="acceptTerms"
                                        onChange={handleChange}
                                        checked={formData.acceptTerms}
                                    />
                                    <span className="check-label">I agree to the terms</span>
                                </div>
                                <span className="signin-link">Already have an account? Click here to <a href="#" onClick={toggleForm}>Login</a></span>
                                <button className="btn signup">Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;