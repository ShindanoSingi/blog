import React, { useEffect, useState } from 'react';
import {
	getDocs,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [title, setTitle] = useState('');
	const [postTitle, setPostTitle] = useState('');

	const [postLists, setPostLists] = useState([]);
	const [loading, setLoading] = useState(false);

	const [showEditForm, setShowEditForm] = useState(false);
	const [postId, setPostId] = useState('');

	const postsCollectionRef = collection(db, 'posts');

	const navigate = useNavigate();

	// Get all posts
	const getPosts = async () => {
		setLoading(true);
		const postsList = await getDocs(postsCollectionRef);
		setPostLists(postsList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	// Edit post
	const editPost = async (id) => {
		await updateDoc(doc(db, 'posts', id), {
			title,
			postTitle,
		});
		getPosts();
	};

	// Delete post
	const deletePost = async (id) => {
		await deleteDoc(doc(db, 'posts', id));
		getPosts();
	};

	useEffect(() => {
		console.log(showEditForm);
		getPosts();
		if (!localStorage.getItem('auth')) {
			navigate('/login');
		}
	}, []);

	return (
		<div className="homepage">
			{showEditForm === true ? (
				<div className="container position-absolute z-index-10">
					<div className="bg-light p-5 rounded">
						<h1>Edit Post</h1>
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								Title
							</label>
							<input
								type="text"
								placeholder="Title"
								className="form-control"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="posts" className="form-label">
								Title
							</label>
							<textarea
								className="form-control"
								placeholder="Write your post here"
								rows="10"
								onChange={(e) => setPostTitle(e.target.value)}
							></textarea>
						</div>
						<button
							className="btn btn-dark"
							onClick={() => {
								editPost(postId);
								setShowEditForm(false);
								// setPostId(post.id);
								console.log(showEditForm);
							}}
						>
							Submit Post
						</button>
					</div>
				</div>
			) : (
				''
			)}

			{showEditForm === false
				? postLists.map((post) => {
						return (
							<div key={post.id} className="card mb-4 shadow shadow-sm">
								<div className="d-flex justify-content-end m-3 gap-2">
									<button
										className=" btn btn-secondary"
										onClick={() => {
											// editPost(post.id);
											setShowEditForm(true);
											setPostId(post.id);
											console.log(showEditForm);
										}}
									>
										Edit Post
									</button>
									<button
										className="btn btn-danger"
										onClick={() => deletePost(post.id)}
									>
										Delete Post
									</button>
								</div>
								<div className="card-body">
									<h5 className="card-title mb-3 fw-bold">{post.title}</h5>
									<p className="card-title mb-3">{post.postTitle}</p>
									<p className="badge bg-dark">{post.author.name}</p>
								</div>
							</div>
						);
				  })
				: ''}
		</div>
	);
}

export default Home;
