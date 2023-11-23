//app.jsx
import { useState } from 'react';
import './App.css'
import NavbarComponent from './components/header/Navbar'
import MainContent from './components/MainContent'
import Loggin from './components/welcome_page/Loggin';

function Home() {
    return (
        <div className='Home'>
            <NavbarComponent />
            <MainContent />  
         </div>
    )
}

export default function App() {

    const [loggInHome, setLogInHome] = useState(null)

    function handleLoggin(){
        setLogInHome(true)
    }

    return (
        <div>
            {
                !loggInHome && 
                <Loggin
                    handleLoggin = {handleLoggin}

                 /> 
            }
            {
                loggInHome && <Home />
            }
        </div>
    )
}