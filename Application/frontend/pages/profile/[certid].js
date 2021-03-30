import { getUserData } from '../../libs/user'
import Head from 'next/head'
import Layout from '../../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export async function getStaticProps({ params }) {
    const userData = await getUserData(params.certid)
    return {
        props: {
            //userData
            userData: {
                name: 'Paolo',
                surname: 'Pozzan',
                certid: params.certid,
            }
        }
    }
}
  
export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    certid: 'pzz'
                }
            },
            {
                params: {
                    certid: 'abc'
                }
            }
        ],
        fallback: false,
    }
}

export default function Profile( {userData} ) {
    return (
        <Layout>
            <Head>
                <title>Fake-INPS - {userData.name} {userData.surname}'s profile page</title>
            </Head>
            <Container className="p-1">
                <Card className="bg-primary">
                    <Row className="p-2">
                        <Col md={3}></Col>
                        <Card className="col-6 align-self-center">
                            <Card.Body>
                                <h3 className="card-title pb-2">Your data</h3>
                                <p className="card-text"><b>Name:</b> {userData.name}</p>
                                <p className="card-text"><b>Surname:</b> {userData.surname}</p>
                                <p className="card-text"><b>CertID:</b> {userData.certid}</p>
                                <p className="card-text"><b>Time and date of submission:</b> {userData.submission}</p>
                            </Card.Body>
                        </Card>
                        <Col md={3}></Col>
                    </Row>
                </Card>
            </Container>
        </Layout>
    );
}