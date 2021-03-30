import Head from 'next/head'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

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
            <header className="container p-1">
                <Row className="py-2 align-left">
                    <Col md={1}>
                        <Link href="/">
                            <a>
                                <Image src="/images/logo.png" alt="Fake-INPS logo" className="rounded float-start bg-primary img-thumbnail p-2"/>
                            </a>
                        </Link>
                    </Col>
                    <Col>
                        <h1>Welcome to Fake-INPS</h1>
                    </Col>
                </Row>
            </header>
            <main>{children}</main>
        </div>
    )
}