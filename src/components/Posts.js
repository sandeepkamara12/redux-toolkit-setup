import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    useDispatch, useSelector
} from 'react-redux';
import { getPost, deletePost, setEdit, updatePost } from '../redux/features/PostSlice';
import Spinner from './Spinner';

const Posts = () => {
    const [id, setId] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [textBody, setTextBody] = useState("")
    const { post, loading, body, edit } = useSelector(state => ({ ...state.app }));

    useEffect(() => {
        if (body) {
            setTextBody(body)
        }
    }, [body])

    const handleFetchPost = (e) => {
        e.preventDefault();
        // console.log(id, 'id')
        id &&
            dispatch(getPost({ id }))
        setId("")
    }
    const handleDelete = (id) => {
        dispatch(deletePost({ id: post[0].id }));
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-12">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="post_id" className="form-label">Search By ID:</label>
                                <input onChange={e => setId(e.target.value)} type="number" className="form-control" id="post_id" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <button onClick={handleFetchPost} type='submit' className="btn btn-primary">Fetch Post</button>
                            <button onClick={() => navigate('/create-post')} type='button' className="btn btn-secondary ms-2">Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                {
                    loading ? <Spinner /> : (
                        <>
                            {
                                post.length > 0 && (

                                    <div className="card mt-2">
                                        {console.log(post, 'post')}
                                        <div className="card-body">
                                            <h5 className="card-title">{post[0].title}</h5>
                                            {
                                                edit ? (<>
                                                    <div className="mb-3">
                                                        <textarea value={textBody} onChange={e => setTextBody(e.target.value)} className="form-control" id="post_description" rows="3">{textBody}</textarea>
                                                        <Link className="btn btn-primary" onClick={() => {
                                                            dispatch(updatePost({
                                                                id: post[0].id,
                                                                title: post[0].title,
                                                                body: textBody
                                                            }))
                                                            dispatch(setEdit({ edit: false, body: '' }))
                                                        }
                                                        }>Save</Link>
                                                        <Link className="btn btn-danger ms-2" onClick={() => dispatch(setEdit({ edit: false, body: '' }))}>Cancel</Link>
                                                    </div>
                                                </>) : (
                                                    <>
                                                        <p className="card-text">{post[0].body}</p>
                                                        <Link onClick={() => dispatch(setEdit({ edit: true, body: post[0].body }))} className="btn btn-primary">Edit</Link>
                                                        <Link className="btn btn-danger ms-2" onClick={handleDelete}>Delete</Link>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Posts