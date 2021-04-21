import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Profile( { Component } ) {

    const router = useRouter();

    const [certid, setCertid] = useState ('');
    const [userData, setUserData] = useState ('');
    const [users, setUsers] = useState ([]);
    const [printedRanking, setPrintedRanking] = useState ('');
    const [loggedIn, setLoggedIn] = useState (null);

    useEffect(async () => {
        
        setLoggedIn(window.localStorage.getItem('token') != null);
        setCertid(window.localStorage.getItem('certid'))
        /*if (window.localStorage.getItem('token') != null){
            getProfile();            
        }*/
        if (window.localStorage.getItem('token') != null)
            setUsers(await getUsers());
        else
            setUsers([]);
        
    }, []);

    const getUsers = async () => {
        const token = window.localStorage.getItem('token');
        const response = await fetch(process.env.API_URL+'rank', {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            }
        })
        //console.log(response);
        const myCertid = window.localStorage.getItem('certid');
        const jsonRank = await response.json();

        if (jsonRank.length === 0)  //this should stop errors from happening if no submissions have been made
            return;
        
        return (
            (json2array(jsonRank)).map((user, i) => {
                if (user.certid === myCertid) {
                    return (
                        <tr key={ i + 1} id="myRow" className="table-success">
                            <td>{ i + 1 }</td>
                            <td>{ user.name }</td>
                            <td>{ user.surname }</td>
                            <td>{ user.certid }</td>
                            <td>{ user.submission }</td>
                        </tr>
                    )
                }
                else {
                    return (
                        <tr key={ i + 1 }>
                            <td>{ i + 1 }</td>
                            <td>{ censorInfo(user.name) }</td>
                            <td>{ censorInfo(user.surname) }</td>
                            <td>{ censorInfo(user.certid) }</td>
                            <td>{ user.submission }</td>
                        </tr>
                    )
                }
            })
        )
    }

    function json2array(json){
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        return result;
    }

    function censorInfo(str) {
        let censored = "";
        censored = censored + str.slice(0, 1);
        censored = censored + '*'.repeat(str.length  + 1);
        
        return censored;
    }

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
                <title>Fake-INPS - Submission ranking</title>
            </Head>
            <Container className="p-1">
                <Card className="colorPrimaryFake">
                    <Row className="p-2 align-self-center">
                        <Col className="col-12">
                            <Card className="">
                                <Card.Body>
                                    <h3 className="card-title">Ranking</h3>
                                    Total submissions: { users.length }
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Fiscal Code</th>
                                                <th>Submission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </Layout>)
    
}