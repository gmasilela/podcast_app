import React from 'react'
import './LogginForm.css'
import supabase from '../../config/supabaseClient';

export default function LoginForm ({ toggleForm, handleLoggin }) {

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    async function handleSubmit (event) {
        event.preventDefault()
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            }) 
            if(error) throw error
            alert('Signed In')

        }
        catch (error) {
            alert(error)
            console.log('Incorrect Username or Password')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div id="first">
                        <div className="myform form">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Login</h1>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} name="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" style={{ color: 'white' }}>Email address</label>
                                    <input 
                                    type="email" 
                                        name="email" 
                                        className="form-control" 
                                        id="email" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email" 
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" style={{ color: 'white' }}>Password</label>
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
                                    <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button onClick={handleLoggin} type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="login-or">
                                        <hr className="hr-or" />
                                        <span className="span-or">or</span>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p className="text-center">
                                        <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus"></i> Signup using Google</a>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">'Don't have an account? <a href="#" onClick={toggleForm}>Sign up here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}