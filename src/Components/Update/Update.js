import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${id}`)
        .then(res => res.json())
        .then(data => setUser(data));
    },[id]);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const handleUpdateUser = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const updatedUser = { name, email };
        // updating the user on server side 
        fetch(`http://localhost:5000/user/${id}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('User Updated');
                e.target.reset();
            });

    }
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Update User {user.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input ref={nameRef} type="text" name="name" id="name" placeholder='Name' required />
                <br />
                <input ref={emailRef} type="email" name="email" id="email" placeholder='Email' required />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default Update;