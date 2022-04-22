import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    // handling deleting user 
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are You Sure To Delete?');
        if (proceed) {
            const url = `http://localhost:5000/user/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = users.filter(user => user._id !== id);
                        setUsers(remaining);
                    }
                })
        }
    }
    return (
        <div>
            <h1>Available Users</h1>
            <div>
                {
                    users.map(user => <div key={user._id}>
                        <p>{user.name} {user.email}
                            <Link to={`/update/${user._id}`}><button>Edit</button></Link>
                            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        </p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;