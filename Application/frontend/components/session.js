import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


export default function Session() {

    const router = useRouter();

    const [sessionCurrentMessage, setSessionCurrentMessage] = useState(null);

    let onLogout = () => { 

        // TODO: we can implement a backend async call to notify the backend that the token is no more used.

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('certid');
        window.localStorage.removeItem('username');
        router.push('/');
    }

    const loggedInMessage = (name) => (
        <strong>&#10004; Hi {name}, you are logged in&nbsp; 
            <small> (<a href='#' className="text-warning" onClick={() => onLogout()}>logout</a>)</small>
        </strong>
    ); 

    const loggedOutMessage = (
        <strong>&#9744; You are not logged in</strong>
    ); 

    useEffect(() => {
        if(window.localStorage.getItem('token') == null) {
            setSessionCurrentMessage(loggedOutMessage);
        } else {
            setSessionCurrentMessage(loggedInMessage(window.localStorage.getItem('username')));
        } 
        return null;  
    }, []);



    return (
        <strong> { sessionCurrentMessage }</strong>
    )
}