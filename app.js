import express from 'express';
import { loadEnvFile } from 'process';
import { join, dirname } from 'path';
import url from 'url';
import router from './path.js';
loadEnvFile();
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
const PORT = process.env.PORT || 8000;

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Serving static files with GET Method using middleware
app.use(express.static(join(__dirname, 'FrontEnd')));

//GET particular html file using middleware
app.use(express.static(join(__dirname, 'FrontEnd', 'pages'),{extensions:['html']}));

//router path for REST API
app.use('/api/users', router);

//404 Page not find by all methods;
app.all('/*splat', (req, res)=>{
  res.status(404).send(`<h1>404 page not found</h1>`)
})

//Server listening
app.listen(PORT, ()=>{
  console.log('server is running on ',PORT);
})

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen