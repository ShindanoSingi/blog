// import React, { useEffect, useState } from 'react';
// import {addDoc, collection} from "firebase/firestore";
// import {auth, db} from "../firebase-config";
// import { useNavigate } from 'react-router-dom';


// const CreatePost = () => {

//   const [title, setTitle] = useState('');
//   const [postTitle, setPostTitle] = useState('');

//   const navigate = useNavigate();

//   const postsCollectionRef = collection(db, 'posts');

//   const createPost = async () => {
//     if(title === '' || postTitle === ''){
//       alert('Please fill all fields');
//       return false;
//     } else{
//       try{
//         await addDoc(postsCollectionRef, {
//           title,
//           postTitle,
//           author:{
//             name: auth.currentUser.displayName,
//             id: auth.currentUser.uid,
//           }
//       });
//       console.log(auth)
//       navigate('/');
//     } catch(error){
//       console.log(error);
//     }
//   };
// }

//   return (
//     <div className='container' >
//       <div className='bg-light p-5 rounded mt-3'>
//         <h1>Create Post</h1>
//         <div className="mb-3">
//           <label htmlFor="title" className='form-label'>Title</label>
//           <input type="text" placeholder='Title' className='form-control' onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="posts" className='form-label'>Title</label>
//           <textarea className='form-control' placeholder='Write your post here' rows='10' onChange={(e) => setPostTitle(e.target.value)}></textarea>
//         </div>
//         <button className='btn btn-dark' onClick={createPost}>Submit Post</button>
//       </div>
//     </div>
//   )
// }

// export default CreatePost
