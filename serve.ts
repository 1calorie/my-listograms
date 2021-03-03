import * as express from 'express';

import { getListograms } from './src/db/listograms';

const root = __dirname;

const app = express();
app.use(express.json());
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile('build/index.html', { root })
});

app.get('/listograms', (req, res) => {
    res.json(getListograms());
});

const port = 3000;
app.listen(port, () => console.log('listogram server @ ' + port));
