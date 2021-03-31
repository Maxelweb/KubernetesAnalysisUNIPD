import Head from 'next/head'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Session from './session'
import { useState, useEffect } from 'react'


export default function Layout({ children }) {
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
                            <Link href="/">
                                <a>
                                    <Image src="/images/logo.png" alt="Fake-INPS logo" className="rounded float-start logoFake img-thumbnail p-2"/>
                                </a>
                            </Link>
                        </Col>
                        <Col>
                            <h1>Welcome to Fake-INPS</h1>
                        </Col>
                    </Row>
                </div>
                <Navbar variant="dark" className="navFake p-1">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="container">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Homepage</Nav.Link>
                        <Nav.Link href="https://youtu.be/tN1p4R_3J-Q?t=38" target="_blank">Citizenship Income</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main>{children}</main>
            <footer>
                <Row className="py-2 text-center small">
                    <Col>
                       Runtimes for Concurrency and Distribution - Project on <a href="https://github.com/Maxelweb/Kubernetes-RCD">Github</a>
                    </Col>
                </Row>
            </footer>
        </div>
    )
}