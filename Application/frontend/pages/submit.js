import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Submit({ Component }) {
    const [certid, setCertid] = useState ('');
    const [OTP, setOTP] = useState ('');



    return (
        <Layout>
        <Head>
            <title>Fake-INPS - Insert data for that thing</title>
        </Head>
            <Container className="p-1">
                <Card className="bg-primary">
                    <Row className="p-2">
                        <Col md={3}></Col>
                        <Card className="col-6 align-self-center">
                            <Card.Body>
                                <h3 class="card-title">Insert something</h3>
                                <p class="card-text">Insert your data to do something/get something</p>
                                <form id="data-submit-form" action="" method="POST">
                                    <div class="input-group mb-3">
                                        <input type="text" id="certid" name="certid" class="form-control" placeholder="Fiscal Code" required
                                            onChange={() => setCertid(event.target.value)} maxlength="16" onkeydown="upperCaseF(this)" />
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="password" id="otp" name="otp" class="form-control" placeholder="One Time Password (OTP)"
                                            onChange={() => setOTP(event.target.value)} />
                                    </div>
                                    <button type="submit" class="btn btn-primary" onClick={() => onSubmit()}>Submit</button>
                                </form>
                            </Card.Body>
                        </Card>
                        <Col md={3}></Col>
                    </Row>
                </Card>
            </Container>
        </Layout>
    )
}
