import express from 'express';
import users from './application.json' with {type: 'json'};
const router = express.Router();
 let updatedUsers = users;

const logger = (req, res, next)=>{
  console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
  next();
}

router.use(logger);

//GET all users
router.get('/', (req, res)=>{
  res.status(200).json(updatedUsers);
})

//Example on querys using GET
router.get('/post', (req, res)=>{
    const limit = parseInt(req.query.limit);
    const occupation = req.query.occupation;
    if(!isNaN(limit) && limit > 0){
     let newUsers = users.slice(0,limit);
     newUsers = newUsers.filter((user)=>user.occupation.toLocaleLowerCase() === occupation.toLowerCase());
     res.status(200).json(newUsers);
    }else{
      res.status(404).json(users);
    }
})

//Example on params using GET
router.get('/:id', (req, res)=>{
  const SingleUser = users.find((user)=>user.id === parseInt(req.params.id));
  if(!SingleUser){
    return res.status(404).json({"data": 'no user found'});
  }
  res.status(200).json(SingleUser);
})

//Create new POST method
router.post('/', (req, res)=>{
  const newUser = {
    "id": users.length > 0 ?  users[users.length-1].id + 1 : 1,
    "name" : req.body.name || "guest",
    "age" : req.body.age || 0,
    "occupation": req.body.occupation || "N/A"
  }
  users.push(newUser);
  res.status(200).json(users);  
})

//Upadate using PUT
router.put('/:id',(req, res)=>{
  const userIndex = updatedUsers.findIndex((user)=>user.id === parseInt(req.params.id));
  if(userIndex<0){
    return res.status(404).json({"data": 'no user found'});
  }
  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    "name": req.body.name
  }
  res.status(200).json(users);
});

//Delete an user
router.delete('/:id' ,(req, res)=>{
  const id = parseInt(req.params.id);
  updatedUsers = updatedUsers.filter((user)=> user.id !== id);
  if(!updatedUsers){
    return res.status(404).json({"data": 'no user found'});
  }
  res.status(200).json(updatedUsers);
})

export default router;
