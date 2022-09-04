import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar, AiOutlineHeart, AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import {BiTrash} from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
import { useSnackbar } from 'material-ui-snackbar-provider'

function Book({userId}){
    const snackbar = useSnackbar();
    const {id} = useParams();

    const [book, setBook] = useState([]);
    const [bookComments, setBookComments] = useState([]);
    const [bookRatings, setBookRatings] = useState([]);
    const [userBookLike, setUserBookLike] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");

    //add comment fields
    const [user_id, setUser_id] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const likeButtonStyle = {color: "red"};
    const getBook = () =>{
        axios.get(`http://localhost:8080/books/getAllBookInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBook(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    
    const getBookComments = () =>{
        axios.get(`http://localhost:8080/bookComments/getAllCommentsByBookId/${id}`, {withCredentials: true})
        .then(function(response){
            setBookComments(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getBookRatings = () =>{
        axios.get(`http://localhost:8080/bookComments/getBookRatingInfoByBookId/${id}`, {withCredentials: true})
        .then(function(response){
            setBookRatings(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getBookLikeByUserId = () =>{
        console.log(userId)
        if(userId !=null && userId != undefined){
        axios.get(`http://localhost:8080/bookLikes/getBookLikeByUserId/${id}/${userId}`)
        .then(function(response){
            console.log(response.data);
            if(response.data.length == 0){
                setUserBookLike(response.data);
            }else{
                setUserBookLike(response.data);
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    }
    useEffect(()=> getBook(), []);
    useEffect(()=> getBookComments(), []);
    useEffect(()=> getBookRatings(), []);
    useEffect(()=> {
        if(userId !=null && userId != undefined){
            axios.get(`http://localhost:8080/bookLikes/getBookLikeByUserId/${id}/${userId}`)
            .then(function(response){
                if(response.data.length == 0){
                    setUserBookLike(response.data);
                }else{
                    setUserBookLike(response.data);
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    });

    function getLikeButton(){
        if(userId !=null && userId != undefined){
            if(userBookLike.length== 0){
                return <a onClick={()=>{
                    axios.post("http://localhost:8080/booklikes/addBookLike", {
                        user_id: userId, 
                        book_id: id, 
                        book_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setUserBookLike([]);
                        getBookLikeByUserId();
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><AiOutlineHeart/></a>
            }else if(userBookLike.length > 0){
                if(userBookLike[0].book_like == 1){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/booklikes/updateBookLike/${userBookLike[0].id}/${userBookLike[0].book_id}`)

                    axios.put(`http://localhost:8080/booklikes/updateBookLike/${userBookLike[0].id}/${userBookLike[0].book_id}`, {
                        book_like: 0
                    })
                    .then(function(response){
                        setUserBookLike([]);
                        getBookLikeByUserId();
                        console.log(response);
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><BsHeartFill style={likeButtonStyle}/></a>
            }else if(userBookLike[0].book_like == 0){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/booklikes/updateBookLike/${userBookLike[0].id}/${userBookLike[0].book_id}`)
                    axios.put(`http://localhost:8080/booklikes/updateBookLike/${userBookLike[0].id}/${userBookLike[0].book_id}`, {
                        book_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setUserBookLike([]);
                        getBookLikeByUserId();
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
    const addBookCommentSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
        setErrorMsg("");
        console.log({
            user_id: userId,
            book_id: id,
            rating: rating,
            comment: comment
        });
        axios.post("http://localhost:8080/bookComments/addBookComment", {
            user_id: userId,
            book_id: id,
            rating: rating,
            comment: comment
        }).then(function(response){
            console.log(response);
            setBookRatings([]);
            getBookRatings();
            setBookComments([]);
            getBookComments();

            document.getElementById('closeBookCommentModal').click();
            snackbar.showMessage("Comment successfully posted");
        }).catch(function(error){
            console.log(error);
        });
    }else if(userId == undefined){
        setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a comment</small>)
    }
    };

   let deleteButton;
   function deleteComment(id, bookId){
   if(userId != undefined && userId != null){
       if(userId == id){
       deleteButton = <a type="button"
       onClick={()=>{
           axios.delete(`http://localhost:8080/bookComments/deleteBookComment/${bookId}`)
           .then(function(response){
               console.log(response);
               setBookComments([]);
               getBookComments();
               setBookRatings([]);
               getBookRatings();
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
    if(bookComments.length == 0){
        return (
        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
            <div className="row justify-content-center mt-4">
            <small>There are no comments for this book</small>
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
                <h4 className="fs-2">Books</h4>
                <small>{book.first_name} {book.last_name}'s <span className="fw-bold">{book.title}</span></small>
                <nav aria-label="breadcrumb mt-4">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/books" className="text-decoration-none link-dark">Books</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{book.title}</li>
                    </ol>
                </nav>
            </div>
            <div className="col-10 col-sm-12 col-md-10 col-lg-10 col-xl-10 ">
                <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mt-4 order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
                        <small className="lead">{book.title}</small>
                        {getLikeButton()}
                        <small className="d-block fw-bold">{book.first_name} {book.last_name}</small>
                        <small className="d-block">{book.first_name} {book.description}</small>
                        <small className="d-blockmt-4"><GrLanguage/> {book.language}</small>
                    </div>
                    <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4 mt-4 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2">
                        <img src={book.cover} className="w-100 mw-100"/>
                        <div className="d-flex align-items-end justify-content-end">
                        </div>
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
                                rating={bookRatings.avg_rating}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                name='rating'
                                starDimension="16px"
                                starSpacing="0"
                                />
                            </div>
                            <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 mt-1">
                                <small>{bookRatings.avg_rating} out of 5</small>
                            </div>
                        </div>
                        <small className="d-block mt-2">{bookRatings.total_ratings} rating{isPlural(bookRatings.total_ratings)}</small>
                        <div className="row justify-content-center mt-2">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>5 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.five_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>4 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.four_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>3 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.three_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>2 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.two_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <small>1 star</small>
                            <div class="progress">
                                <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.one_star_ratings)}  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4">
                        <small className="lead">Comments</small>
                        {commentsIsEmpty()}
                        {bookComments.map((bookComment, i)=>(
                        <div class="row justify-content-center mt-4">
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                                <img src={bookComment.avatar} height="30" width="30" className="rounded-circle"/>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <p className="fw-bold d-inline"><Link to={`/profile/${bookComment.userId}`} className="text-decoration-none text-dark">{bookComment.username}</Link> </p>
                                <small className="px-2">{convertTime(bookComment.created_at)}</small>
                                <div className="d-block">
                                <StarRatings
                                    rating={bookComment.rating}
                                    starRatedColor="#ffd700"
                                    numberOfStars={5}
                                    starDimension="16px"
                                    starSpacing="0"
                                />
                                </div>
                                <small class="d-block">{bookComment.comment}</small>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                               {deleteComment(bookComment.userId, bookComment.id)}
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
                                <button type="button" className="btn-close" id="closeBookCommentModal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="px-5 pb-4">
                            <small className="d-block">Read this book? Comment and share your thoughts</small>
                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={addBookCommentSubmit} >
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
export default Book;