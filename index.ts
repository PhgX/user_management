import express from 'express';
import {routes} from './src/routes/route' 
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
const PORT = 3300;

const app = express();
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.use(fileUpload({
    createParentPath: true
}));
app.use('', routes);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

