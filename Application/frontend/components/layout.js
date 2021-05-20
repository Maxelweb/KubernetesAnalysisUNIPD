import Head from 'next/head'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Session from './session'
import {useRouter} from 'next/router'

export default function Layout({ children }) {

    const router = useRouter();

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.png" />
                <title>Fake-INPS</title>
                <meta name="description"
                    content="A Kubernetes experiment for the Runtimes for Concurrency and Distribution course of the University of Padova"
                />
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            
            <Navbar variant="dark" className="navFake p-1">
                <div className="container">
                    &nbsp; { Session() }
                </div>
            </Navbar>
            <header className="mb-3">
                <div className="container">
                    <Row className="py-2 align-left">
                        <Col md={1}>
                            <Image src="/images/logo.png" alt="Fake-INPS logo" className="rounded float-start logoFake img-thumbnail p-2 pointerFake"onClick={() => router.push("/")}/>
                        </Col>
                        <Col>
                            <h1>Fake-INPS</h1>
                            <h2 className="mb-0 h3 text-secondary">Welcome to the fake-INPS portal</h2>
                        </Col>
                    </Row>
                </div>
                <Navbar variant="dark" className="navFake p-1">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="container">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => router.push("/")}>Homepage</Nav.Link>
                        <Nav.Link onClick={() => router.push("/submit")}>Submit request</Nav.Link>
                        <Nav.Link onClick={() => router.push("/ranking")}>Ranking</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main>{children}</main>
            <footer className="py-3 text-center small">
                       Runtimes for Concurrency and Distribution - Project on <a href="https://github.com/Maxelweb/Kubernetes-RCD">Github</a>
            </footer>
        </div>
    )
}