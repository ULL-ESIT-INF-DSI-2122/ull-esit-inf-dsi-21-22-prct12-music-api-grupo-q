import express from 'express';
import './db/mongoose';

import {getCancionRouter} from './routers/cancionRouters/getCancion';
import {postCancionRouter} from './routers/cancionRouters/postCancion';
import {deleteCancionRouter} from './routers/cancionRouters/deleteCancion';
import {patchCancionRouter} from './routers/cancionRouters/patchCancion';
import {defaultRouter} from './routers/default';

const app = express();
app.use(express.json());
app.use(postCancionRouter);
app.use(getCancionRouter);
app.use(patchCancionRouter);
app.use(deleteCancionRouter);

app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});