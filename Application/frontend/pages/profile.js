import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Profile( { Component } ) {

    const router = useRouter();

    const [certid, setCertid] = useState ('');
    const [userData, setUserData] = useState ('');
    const [loggedIn, setLoggedIn] = useState (null);

    let getProfile = async () => {
        const certidStorage = window.localStorage.getItem('certid');
        const response = await fetch(process.env.API_URL+'profile/' + certidStorage, {
            method: 'GET', // Submission entry updated in submit.js using POST request
            headers: {
                'authorization': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        setUserData(await response.json());
    };


    useEffect(async () => {
        setLoggedIn(window.localStorage.getItem('token') != null);
        
        if (window.localStorage.getItem('token') != null){
            getProfile();            
        }
    
    }, []);

    return loggedIn == null ? // prevents from having bad rendering on-the-fly
    (
        <Layout></Layout> 
    )
    : 
    !loggedIn ?
    (<Layout>
        <Row className="p-2">
            <Col className="container">
                <Card className="bg-danger text-light text-center p-4">
                    This page is private. You must sign in before using it.
                </Card>
            </Col>
        </Row>
    </Layout>
    ) : (
        <Layout>
            <Head>
                <title>Fake-INPS - {userData.name} {userData.surname}'s profile page</title>
            </Head>
            <Container className="p-1">
                <Card className="colorPrimaryFake">
                    <Row className="p-2 align-self-center">
                        <Col className="col-12">
                            <Card className="">
                                <Card.Body>
                                    <h3 className="card-title pb-2">Your data</h3>
                                    <p className="card-text"><b>Name:</b> {userData.name}</p>
                                    <p className="card-text"><b>Surname:</b> {userData.surname}</p>
                                    <p className="card-text"><b>Fiscal Code:</b> {userData.certid}</p>
                                    <p className="card-text"><b>Time and date of submission:</b> &nbsp;{userData.submission != null ? userData.submission : 'No submission yet! Go to Submit request first!'}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </Layout>
    );
}