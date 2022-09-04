import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsBook} from 'react-icons/bs';
import {CgFilm} from 'react-icons/cg';
import {GiSpellBook, GiBlackBook, GiGreekTemple} from 'react-icons/gi';
import Carousel from "react-multi-carousel";
import { height, width } from '@mui/system';
import {AiFillCaretRight} from 'react-icons/ai';
function Home(){

    const [countries, setCountries] = useState([]);
    const [books, setBooks] = useState([]);
    const [films, setFilms] = useState([]);

    const getCountries = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountriesForHome`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountries(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getBooks = () =>{
        axios.get(`http://localhost:8080/books/getAllBookInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBooks(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }


    const getFilms = () =>{
        axios.get(`http://localhost:8080/films/getAllFilmInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilms(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    useEffect(()=> getCountries(), []);
    useEffect(()=> getBooks(), []);
    useEffect(()=> getFilms(), []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    const imageDivStyle = {width: "80%"}
    const imageStyle = {marginLeft: "auto", order: "2", float: "right"}
    function countryImageStyle(img){
        return {
            background:`linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url(${img})`,
            backgroundSize: "cover",
            height: "284px",
            width: "278px",
        }
    };

    function bookImageStyle(img){
        return {
            background:`linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url(${img})`,
            backgroundSize: "cover",
            height: "177px",
            width: "271px",
            // backgroundPosition: "top"
        }
    };

    const width = {width: "98%"}
    const buttonAnimation = {transform: "scale(1.5)"}
    return(
        <div className="row justify-content-center mb-5">
            
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5" >
                <h1 className='fs-2'>World Citizen</h1>
                <small>A space to share across cultures</small>
                <div style={width} class="d-flex justify-content-between">
                    <h1 className='lead mt-4'>Countries</h1>
                    <Link to={"/countries"} className='lead mt-4 text-decoration-none text-dark buttonHover'><small>See all Countries <AiFillCaretRight/> </small></Link>
                </div>                    
                <Carousel className="mt-4 d-flex" responsive={responsive}>
                        {countries.map((country, i)=>(
                            <Link className='text-decoration-none' to={`/country/${country.id}`}>
                                <div className='rounded d-flex align-items-end' style={countryImageStyle(country.banner_img)}>
                                    <h3 className='px-3 text-decoration-none text-white'>{country.name} <img className='px-2' src={country.flag} width="35"/></h3>
                                </div>
                                {/* <img src={country.flag} height="250" style={imageStyle}/> */}
                            </Link>
                        ))}
                </Carousel>
                <div style={width} class="d-flex justify-content-between">
                    <h1 className='lead mt-4'>Books</h1>
                    <Link to={"/books"} className='lead mt-4 text-decoration-none text-dark buttonHover'><small>See all Books <AiFillCaretRight/> </small></Link>
                </div>
                <Carousel className="mt-4 position-relative" responsive={responsive}>
                    {books.map((book, i)=>(
                        <Link className='text-decoration-none d-flex flex-row bd-highlight mb-3' to={`/book/${book.id}`}>
                            <div className='d-flex align-items-start flex-column bd-highlight mb-3' style={bookImageStyle(book.cover)}>
                                <div class="mb-auto px-2 bd-highlight"></div>
                                <div class="px-2 bd-highlight text-decoration-none text-white lead">{book.title} <img className='px-2' src={book.flag} width="35"/></div>
                                <div class="px-2 bd-highlight text-decoration-none text-white fs-6">{book.first_name} {book.last_name}</div>
                                {/* <div className='px-2 py-2 position-absolute' style={imageDivStyle}>
                                    <img style={imageStyle}  src={book.flag} width="30"/>
                                </div> */}
                            </div>
                            {/* <img src={country.flag} height="250" style={imageStyle}/> */}
                        </Link>
                    ))}
                </Carousel>
                <div style={width} class="d-flex justify-content-between">
                    <h1 className='lead mt-4'>Films and Shows</h1>
                    <Link to={"/films"} className='lead mt-4 text-decoration-none text-dark buttonHover'><small>See all Films and Shows <AiFillCaretRight/> </small></Link>
                </div>                
                <Carousel className="mt-4 position-relative" responsive={responsive}>
                    {films.map((film, i)=>(
                        <Link className='text-decoration-none d-flex flex-row bd-highlight mb-3' to={`/film/${film.id}`}>
                            <div className='d-flex align-items-start flex-column bd-highlight mb-3' style={bookImageStyle(film.poster)}>
                                <div class="mb-auto px-2 bd-highlight"></div>
                                <div class="px-2 bd-highlight text-decoration-none text-white lead">{film.title} <img className='px-2' src={film.flag} width="35"/></div>
                                {/* <div class="px-2 bd-highlight text-decoration-none text-white fs-6">{film.first_name} {book.last_name}</div> */}
                                {/* <div className='px-2 py-2 position-absolute' style={imageDivStyle}>
                                    <img style={imageStyle}  src={film.flag} width="30"/>
                                </div> */}
                            </div>
                            {/* <img src={country.flag} height="250" style={imageStyle}/> */}
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
export default Home;