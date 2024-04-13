import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app: Express = express();
const port = process.env.PORT || 3000;

/**
 * Use this to allow clients from different origins to access all routes.
 *     app.user(cors()); is equivalent to:
 *     app.use(cors({
 *         origin: '*',
 *         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
 *         preflightContinue: false,
 *         optionsSuccessStatus: 204,
 *     }));
 */
// app.use(cors());
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: 'GET,HEAD,PATCH,PUT,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log({ method: req.method, path: req.path, body: req.body });
    next();
});

const history: Record<string,string>[] = [];
app.get('/get', (req: Request, res: Response) => {
    res.json({ status: 200, message: "response from '/get'", history });
});
app.post('/post', (req: Request, res: Response) => {
    if (req.body) history.push(req.body)
        res.json({ status: 200, message: "response from '/post'", history });
});
app.put('/put', (req: Request, res: Response) => {
    if (req.body) history.push(req.body)
        res.json({ status: 200, message: "response from '/put'", history });
});
app.delete('/delete', (req: Request, res: Response) => {
    history.pop();
    res.json({ status: 200, message: "response from '/delete'", history });
});

/**
 * Send the file from /public/main.html
 * [NOTE]
 *      When client receives html page from this server,
 *      the client has no CORS issues as client/server share
 *      same origin. Hence the name Cross Origin Resource Sharing.
 */
app.get('/', function (req: Request, res: Response) {
    res.sendFile('main.html');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
