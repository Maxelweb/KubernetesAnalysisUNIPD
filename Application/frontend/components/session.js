import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


export default function Session() {

    
    const router = useRouter();

    const [sessionCurrentMessage, setSessionCurrentMessage] = useState(null);

    let onLogout = () => { 
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('certid');
        router.push('/');
    }

    const loggedInMessage = (
        <strong>&#10004; You are logged in - 
            <small> <a href='#' className="text-warning" onClick={() => onLogout()}>logout</a></small>
        </strong>
    ); 

    const loggedOutMessage = (
        <strong>&#9744; You are not logged in</strong>
    ); 

    useEffect(() => {
        if(window.localStorage.getItem('token') == null) {
            setSessionCurrentMessage(loggedOutMessage);
        } else {
            setSessionCurrentMessage(loggedInMessage);
        }   
    });



    return (
        <strong> { sessionCurrentMessage }</strong>
    )
}