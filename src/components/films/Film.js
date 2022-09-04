import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar, AiOutlinePlusCircle,AiOutlineHeart} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import {BiTrash} from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
import { useSnackbar } from 'material-ui-snackbar-provider'

function Film({userId}){
    const snackbar = useSnackbar();
    const {id} = useParams();

    const [film, setFilm] = useState([]);
    const [filmComments, setFilmComments] = useState([]);
    const [filmRatings, setFilmRatings] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [userFilmLike, setUserFilmLike] = useState([]);

    //add comment fields
    const [user_id, setUser_id] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const getFilm = () =>{
        axios.get(`http://localhost:8080/films/getAllFilmInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilm(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    
    const getFilmComments = () =>{
        axios.get(`http://localhost:8080/filmComments/getAllCommentsByFilmId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilmComments(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getFilmRatings = () =>{
        axios.get(`http://localhost:8080/filmComments/getFilmRatingInfoByFilmId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilmRatings(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getFilmLikeByUserId = () =>{
        console.log(userId)
        if(userId !=null && userId != undefined){
        axios.get(`http://localhost:8080/filmLikes/getFilmLikeByUserId/${id}/${userId}`)
        .then(function(response){
            console.log(response.data);
            if(response.data.length == 0){
                setUserFilmLike(response.data);
            }else{
                setUserFilmLike(response.data);
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    }
    useEffect(()=> getFilm(), []);
    useEffect(()=> getFilmComments(), []);
    useEffect(()=> getFilmRatings(), []);
    useEffect(()=> {
        if(userId !=null && userId != undefined){
        axios.get(`http://localhost:8080/filmLikes/getFilmLikeByUserId/${id}/${userId}`)
        .then(function(response){
            if(response.data.length == 0){
                setUserFilmLike(response.data);
            }else{
                setUserFilmLike(response.data);
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    });

    function getLikeButton(){
        if(userId !=null && userId != undefined){
            if(userFilmLike.length== 0){
                return <a onClick={()=>{
                    axios.post("http://localhost:8080/filmlikes/addFilmLike", {
                        user_id: userId, 
                        film_id: id, 
                        film_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setUserFilmLike([]);
                        getFilmLikeByUserId();
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><AiOutlineHeart/></a>
            }else if(userFilmLike.length > 0){
                if(userFilmLike[0].film_like == 1){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/filmlikes/updateFilmLike/${userFilmLike[0].id}/${userFilmLike[0].film_id}`)

                    axios.put(`http://localhost:8080/filmlikes/updateFilmLike/${userFilmLike[0].id}/${userFilmLike[0].film_id}`, {
                        film_like: 0
                    })
                    .then(function(response){
                        setUserFilmLike([]);
                        getFilmLikeByUserId();
                        console.log(response);
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><BsHeartFill className="text-danger"/></a>
            }else if(userFilmLike[0].film_like == 0){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/filmlikes/updateFilmLike/${userFilmLike[0].id}/${userFilmLike[0].film_id}`)
                    axios.put(`http://localhost:8080/filmlikes/updateFilmLike/${userFilmLike[0].id}/${userFilmLike[0].film_id}`, {
                        film_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setUserFilmLike([]);
                        getFilmLikeByUserId();
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><AiOutlineHeart /></a>
            }
            }
        }
    }

   

    function getAvgRatingForProgressBar(total_ratings, starRatings){
        let percentage = (100 * starRatings) / total_ratings;
        if(isNaN(percentage)){
            return {width: `0%`}
        }else{
        return {width: `${percentage}%`}
        }
    }

    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }

    function convertTime(time){
        var newTime = new Date(time);
        const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return realTime;
    }
    
    //handle submits
    const addFilmCommentSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
        setErrorMsg("");
        console.log({
            user_id: userId,
            film_id: id,
            rating: rating,
            comment: comment
        });
        axios.post("http://localhost:8080/filmComments/addFilmComment", {
            user_id: userId,
            film_id: id,
            rating: rating,
            comment: comment
        }).then(function(response){
            console.log(response);
            setFilmRatings([]);
            getFilmRatings();
            setFilmComments([]);
            getFilmComments();

            document.getElementById('closeFilmCommentModal').click();
            snackbar.showMessage("Comment successfully posted");
        }).catch(function(error){
            console.log(error);
        });
    }else if(userId == undefined){
        setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a comment</small>)
    }
    };

   let deleteButton;
   function deleteComment(id, filmId){
   if(userId != undefined && userId != null){
       if(userId == id){
       deleteButton = <a type="button"
       onClick={()=>{
           axios.delete(`http://localhost:8080/filmComments/deleteFilmComment/${filmId}`)
           .then(function(response){
               console.log(response);
               setFilmComments([]);
               getFilmComments();
               setFilmRatings([]);
               getFilmRatings();
               snackbar.showMessage("Comment successfully deleted");

           })
           .catch(function(error){
               console.log(error);
           })
       }}
       ><BiTrash/></a>

       return deleteButton;
        }
   }
}


function commentsIsEmpty(){
    if(filmComments.length == 0){
        return (
        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
            <div className="row justify-content-center mt-4">
            <small>There are no comments for this film</small>
            </div>
        </div>
        )
    }
}
    const textareaStyle = {height: "100px"};

    return(
        <div>
        <div className="row justify-content-center mb-5">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5">
                <h4 className="fs-2">Films and Shows</h4>
                <small>{film.title}</small>
                {getLikeButton()}
                <nav aria-label="breadcrumb mt-4">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/films" className="text-decoration-none link-dark">Films and shows</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{film.title}</li>
                    </ol>
                </nav>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mt-4 order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
                        <small className="lead d-block">{film.title}</small>
                        <small className="d-block fw-bold">{film.first_name} {film.last_name}</small>
                        <small className="d-block">{film.first_name} {film.description}</small>
                        <small className="d-blockmt-4"><GrLanguage/> {film.language}</small>
                    </div>
                    <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4 mt-4 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2">
                        <img src={film.poster} className="w-100 mw-100"/>
                    </div>
                </div>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addCommentModal"><FaRegComment className="mb-1"/> Comment</button>
                    </div>
                </div> 
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4 mb-4">
                <div className="row justify-content-center mt-4">
                    <div className="col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4 mt-4">
                        <small className="lead">Reviews</small>
                        <div className="row justify-content-center">
                            <div className="col-4 col-sm-4 col-md-6 col-lg-6 col-xl-6 ">
                                <StarRatings
                                rating={filmRatings.avg_rating}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                name='rating'
                                starDimension="16px"
                                starSpacing="0"
                                />
                            </div>
                            <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 mt-1">
                                <small>{filmRatings.avg_rating} out of 5</small>
                            </div>
                        </div>
                        <small className="d-block mt-2">{filmRatings.total_ratings} rating{isPlural(filmRatings.total_ratings)}</small>
                        <div className="row justify-content-center mt-2">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>5 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.five_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>4 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.four_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>3 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.three_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>2 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.two_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>1 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.one_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4">
                        <small className="lead">Comments</small>
                        {commentsIsEmpty()}
                        {filmComments.map((filmComment, i)=>(
                        <div class="row justify-content-center mt-4">
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                                <img src={filmComment.avatar} height="30" width="30" className="rounded-circle"/>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <p className="fw-bold d-inline"><Link to={`/profile/${filmComment.userId}`} className="text-decoration-none text-dark">{filmComment.username}</Link> </p>
                                <small className="px-2">{convertTime(filmComment.created_at)}</small>
                                <div className="d-block">
                                <StarRatings
                                    rating={filmComment.rating}
                                    starRatedColor="#ffd700"
                                    numberOfStars={5}
                                    starDimension="16px"
                                    starSpacing="0"
                                />
                                </div>
                                <small class="d-block">{filmComment.comment}</small>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                               {deleteComment(filmComment.userId, filmComment.id)}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
            <div className="my modals">
                {/* Add author modal */}
                <div className="modal fade" tabindex="-1" role="dialog" id="addCommentModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-5 shadow">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <h2 className="fw-bold mb-0 d-block">Add Comment</h2>
                                <button type="button" className="btn-close" id="closeFilmCommentModal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="px-5 pb-4">
                            <small className="d-block">Watched this film? Comment and share your thoughts</small>
                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={addFilmCommentSubmit} >
                                <div className="mb-3">
                                    <label for="floatingInput">Rating</label>
                                    <ReactStars
                                        count={5}
                                        onChange={(newRating)=> setRating(newRating)}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Commnet" id="floatingTextarea2" style={textareaStyle} value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Comment</label>
                                </div>
                                {errorMsg}
                                <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-3" type="submit">Save</button>                   
                                </form>
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Film;