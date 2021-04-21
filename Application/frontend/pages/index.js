import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


export default function Homepage({ Component }) {
    const [signinEmail, setSigninEmail] = useState ('');
    const [signinPassword, setSigninPassword] = useState ('');

    const router = useRouter();

    let onSigninSubmit = async () => {
        const responseSignin = await fetch(window.REACT_APP_API_URL+'signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signinEmail,
                password: signinPassword
            })
        });
        const json = await responseSignin.json();

        if (json.certid) {
            window.localStorage.setItem('token', json.token);
            window.localStorage.setItem('certid', json.certid);
            
            const responseProfile = await fetch(window.REACT_APP_API_URL+'profile/' + json.certid, {
                method: 'GET',
                headers: {
                    'authorization': json.token,
                    'Content-Type': 'application/json'
                }
            });
            const jsonProfile = await responseProfile.json();

            console.log(jsonProfile);
            
            window.localStorage.setItem('username', jsonProfile.name);
            router.push('/submit');
            //TODO controlla se funziona così che chi ha già compilato il form non venga reindirizzato alla pagina per compilarlo
            /*if (json.submission)
                router.push('/submit');
            else
                router.push('/profile');*/
        }
        else
            alert("Invalid credentials");
    };

    const [signupName, setSignupName] = useState ('');
    const [signupSurname, setSignupSurname] = useState ('');
    const [signupCertid, setSignupCertid] = useState ('');
    const [signupEmail, setSignupEmail] = useState ('');
    const [signupPassword, setSignupPassword] = useState ('');
    const [signupPasswordConfirm, setSignupPasswordConfirm] = useState ('');

    let onSignupSubmit = async () => {
        const response = await fetch(window.REACT_APP_API_URL+'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: signupName,
                surname: signupSurname,
                certid: signupCertid,
                email: signupEmail,
                password: signupPassword,
                confirmPassword: signupPasswordConfirm
            })
        });
        const json = await response.json();
        console.log(json);

        if(json.certid != null)
        {
            alert("Successfully signed up - proceed to login");
        }
        else {
            alert("Error while signing up, retry...");
        }

    };

    useEffect(async () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const responseSignin = await fetch(window.REACT_APP_API_URL+'signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });
            const json = await responseSignin.json();

            if (json.certid) {    
                const responseProfile = await fetch(window.REACT_APP_API_URL+'profile/' + json.certid, {
                    method: 'GET',
                    headers: {
                        'authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                const jsonProfile = await responseProfile.json();
            }
        }
    })

    return (
        <Layout>
            <Head>
                <title>Fake-INPS - Welcome</title>
            </Head>
            <Container className="p-1">
                <Card className="colorPrimaryFake">
                    <Row className="p-2">
                        <Col md={6} className="bg-transparent">
                            <Card>
                                <Card.Body>
                                    <h3 className="card-title">Sign In</h3>
                                    <p className="card-text">Sign in if you already have an account</p>
                                    <form id="signin-form" method="post" action="#" onSubmit={() => {event.preventDefault(); return false;}}>
                                        <div className="input-group mb-3">
                                            <input type="email" id="signin-email" name="signin-email" className="form-control"
                                                placeholder="Email" onChange={() => setSigninEmail(event.target.value)} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signin-password" name="signin-password" className="form-control" placeholder="Password"
                                                 onChange={() => setSigninPassword(event.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={() => onSigninSubmit()}>Login</button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="bg-transparent">
                            <Card>
                                <Card.Body>
                                    <h3 className="card-title">Sign Up</h3>
                                    <p className="card-text">Sign up if you do not already have an account</p>
                                    <form id="signup-form" method="post" action="#" onSubmit={() => {event.preventDefault(); return false;}}>
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-name" name="signup-name" className="form-control" placeholder="Name" required
                                                 onChange={() => setSignupName(event.target.value)} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-surname" name="signup-surname" className="form-control" placeholder="Surname" required
                                                onChange={() => setSignupSurname(event.target.value)} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-certid" name="signup-certid" className="form-control" placeholder="Fiscal Code" required
                                                onChange={() => setSignupCertid(event.target.value)} maxLength="16" />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="email" id="signup-email" name="signup-email" className="form-control" placeholder="Email" required
                                                onChange={() => setSignupEmail(event.target.value)} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signup-password" name="signup-password" className="form-control" placeholder="Password"
                                                onChange={() => setSignupPassword(event.target.value)} required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signup-password-confirm" name="signup-password-confirm" className="form-control"
                                                onChange={() => setSignupPasswordConfirm(event.target.value)} placeholder="Confirm Password" required />
                                        </div>
                                        <button type="submit" className="btn btn-success" onClick={() => onSignupSubmit()}>Signup</button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </Layout>
    )
}
