import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function Home() {
	const [postLists, setPostLists] = useState([]);
	const [loading, setLoading] = useState(false);

	const postsCollectionRef = collection(db, 'posts');

	// Get all posts
	const getPosts = async () => {
		setLoading(true);
		const postsList = await getDocs(postsCollectionRef);
		setPostLists(postsList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	// Delete post
	const deletePost = async (id) => {
		await deleteDoc(doc(db, 'posts', id));
		getPosts();
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="homepage">
			{postLists.length === 0 ? (
				<h3>No posts added!</h3>
			) : (
				postLists.map((post) => {
					return (
						<div key={post.id} className="card mb-4 shadow shadow-sm">
							<div className="d-flex justify-content-end m-3">
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
			)}

			{/* <div className="card mb-4 shadow shadow-sm">
			<div className="card-body">
				<h1 className="card-title pricing-card-title text-center"></h1>
			</div>
		</div> */}
		</div>
	);
}

export default Home;
