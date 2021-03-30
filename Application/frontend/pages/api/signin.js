export default function handler(req, res) {
    if (req.method === 'POST') {
        /*receives  signin-email
                    signin-password*/
    } else {
        //show error page
        res.status(405).end();
    }
}