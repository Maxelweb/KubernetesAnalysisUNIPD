import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Homepage({ Component }) {
	/*function upperCase(a) {
		setTimeout(function(){
			a.value = a.value.toUpperCase();
		}, 1);
	}*/
    return (
        <Layout>
            <Head>
                <title>Fake-INPS - Welcome</title>
            </Head>
            <Container className="p-1">
                <Card className="bg-primary">
                    <Row className="p-2">
                        <Col md={6} className="bg-transparent">
                            <Card>
                                <Card.Body>
                                    <h3 className="card-title">Sign In</h3>
                                    <p className="card-text">Sign in if you already have an account</p>
                                    <form id="signin-form" action="" method="POST">
                                        <div className="input-group mb-3">
                                            <input type="email" id="signin-email" name="signin-email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signin-password" name="signin-password" className="form-control" placeholder="Password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="bg-transparent">
                            <Card>
                                <Card.Body>
                                    <h3 className="card-title">Sign Up</h3>
                                    <p className="card-text">Sign up if you do not already have an account</p>
                                    <form id="signup-form" action="" method="POST">
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-name" name="signup-name" className="form-control" placeholder="Name" required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-surname" name="signup-surname" className="form-control" placeholder="Surname" required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" id="signup-certid" name="signup-certid" className="form-control" placeholder="Fiscal Code" required maxLength="16" />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="email" id="signup-email" name="signup-email" className="form-control" placeholder="Email" required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signup-password" name="signup-password" className="form-control" placeholder="Password" required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" id="signup-password-confirm" name="signup-password-confirm" className="form-control" placeholder="Confirm Password" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Signup</button>
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
