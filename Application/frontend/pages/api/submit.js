export default function handler(req, res) {
    if (req.method === 'POST') {
        /*receives  certid
                    otp*/
    } else {
        //show error page
        res.status(405).end();
    }
}