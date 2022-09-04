import {FcGlobe} from 'react-icons/fc';
import {FaUser} from 'react-icons/fa';
import {BiUserCircle, BiWorld} from 'react-icons/bi';
import {GiAirplane, GiBlackFlag} from 'react-icons/gi';
import {SiYourtraveldottv} from 'react-icons/si';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
function Nav({userId, username, loggedIn, avatar}){
    const userIconStyle = {color: "black",  width: "25px", height: "25px"};
    const carouselIcon = {background:"linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url('https://images.unsplash.com/photo-1593285942976-70dbd769a590?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjBtb3VudGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80')"}

    let userLink;
    if(loggedIn){
        userLink =   
        <div>
            <div className="dropdown text-end mt-2">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <FaUser className="rounded-circle" size={25} style={userIconStyle}/> */}
                <img src={avatar} style={userIconStyle} className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li><Link className="dropdown-item" to={`/profile/${userId}`}>Profile</Link></li>
                <li></li>
                <li><a className="dropdown-item" onClick={() =>{
                                axios.get(`http://localhost:8080/signout`, {withCredentials:true})
                                .then(function(response){
                                    console.log(response);
                                    // snackbar.showMessage('User successfully logged out')
                                    window.location= "/login";
                                }).catch(function(error){
                                    console.log(error);
                                })
                            }}
                >Sign out</a></li>
                </ul>
            </div>
            <small>{username}</small>
        </div>
    }else{
        userLink =   
        <div className="dropdown text-end">
            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <FaUser className="rounded-circle" size={25} style={userIconStyle}/>
            </a>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li></li>
            <li><Link className="dropdown-item" to={"/login"}>Login</Link></li>
            </ul>
        </div>
    }

    return(
        <div>
            <header className="p-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className=" main-logo-container d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none px-2">
                        <span><GiAirplane className="bi me-2" width="40" height="32" size={28}/></span>
                        World <span className="">&nbsp;Citizen</span>
                    </a>

                    <ul className="nav col-12 col-xl-9 col-lg-8 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {/* <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li> */}
                        <li><a href="/" className="nav-link px-2 link-dark">Home</a></li>
                        <li><a href="/countries" className="nav-link px-2 link-dark">Countries</a></li>
                        <li><a href="/books" className="nav-link px-2 link-dark">Books</a></li>
                        <li><a href="/films" className="nav-link px-2 link-dark">Films and Shows</a></li>
                        <li><a href="/historyTopics" className="nav-link px-2 link-dark">History Topics</a></li>
                    </ul>

                    {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                    </form> */}

                    {userLink}
                    </div>
                </div>
            </header>
            <div id="carouselExampleSlidesOnly" class="carousel slide mb-4 bg-light" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active mt-3 mb-2">
                        <div class="w-100" alt="...">
                            <a href="/countries" className='text-dark'>
                            <small className='d-block text-center fw-bold fs-6'>Browse Countries</small>
                            </a>
                            <small className='d-block text-center mt-1'>Discover different country's cultures through books, films, shows, and historical topics shared by users</small>
                        </div>
                    </div>
                    <div class="carousel-item mt-3 mb-2">
                        <div class="w-100" alt="...">
                            <a href="/register" className='text-dark'>
                            <small className='d-block text-center fw-bold fs-6'>Don't have an account?</small>
                            </a>
                            <small className='d-block text-center mt-1'>Register and share your country's culture with us. We want to hear from you!</small>
                        </div>                    </div>
                    <div class="carousel-item mt-3 mb-2">
                        <div class="w-100" alt="...">
                            <a href="/historyTopics" className='text-dark'>
                            <small className='d-block text-center fw-bold fs-6'>Historical topics</small>
                            </a>
                            <small className='d-block text-center mt-1'>Discover fascinating historical topics shared by our users</small>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;