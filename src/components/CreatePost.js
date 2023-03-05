import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../redux/features/PostSlice';
import Spinner from './Spinner';

const CreatePost = () => {
    const [values, setValues] = useState({ title: '', body: '' })
    const [showPost, setShowPost] = useState(false);

    const dispatch = useDispatch();
    const { loading, post } = useSelector(state => ({ ...state.app }))

    const { title, body } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ values }))
        setValues({ title: '', body: '' });
        setShowPost(true);
    }

    const showCreatedPost = () => {
        return (
            <>
                {
                    loading ? <Spinner /> : (
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">{post[0].title}</h5>
                                <p className="card-text">{post[0].body}</p>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="post_title" className="form-label">Enter Post Title</label>
                    <input value={title} onChange={(e) => setValues({ ...values, title: e.target.value })} type="text" className="form-control" id="post_title" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="post_description" className="form-label"></label>
                    <textarea value={body} onChange={e => setValues({ ...values, body: e.target.value })} className="form-control" id="post_description" rows="3"></textarea>
                </div>
                <Link to="/" className="btn btn-secondary">Go Home</Link>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary ms-2">Submit</button>
            </form>
            <div className="mt-2">
                {showPost && <div>{showCreatedPost()}</div>}
            </div>
        </>
    )
}

export default CreatePost