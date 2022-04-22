import React, { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddUser = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const handleAddUser = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const user = { name, email };
        // posting the user object/document into server side 
        fetch('http://localhost:5000/user', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('User Created');
                e.target.reset();
            });

    }
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Please Add a User</h1>
            <form onSubmit={handleAddUser}>
                <input ref={nameRef} type="text" name="name" id="name" placeholder='Name' required />
                <br />
                <input ref={emailRef} type="email" name="email" id="email" placeholder='Email' required />
                <br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;