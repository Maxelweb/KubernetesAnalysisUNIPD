export default function handler(req, res) {
    if (req.method === 'POST') {
        /*receives  signup-name
                    signup-surname
                    signup-certid
                    signup-email
                    signup-password
                    signup-password-confirm*/
    } else {
        //show error page
        res.status(405).end();
    }
}