const express= require('express');
const app=express();
const path= require('path');
const {v4: uuid}= require('uuid'); 
const methodOverride = require('method-override');
const process = require('process');
const { on } = require('events');

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

let comments=[
    {   id: uuid(),
        username: 'todd',
        comment: 'lol that is so funny!'
    },
    {  id: uuid(),
        username: 'tommy',
        comment: 'my lovely black dog'
    },
    {     id: uuid(),
        username: 'siru',
        comment: 'a random cat chose to live under our roof'
    },
   {    id: uuid(),
        username: 'rani',
        comment: 'a street dog use to live in out street from the time of birth'
    },
    
]

app.get('/comments',(req , res)=>{
  console.log(`lets chek if this woek ${process.cwd()}`)
  console.log(process.argv);
    res.render('comments/allcomments',{comments})
})

app.get('/comments/new',(req , res)=>{
    res.render('comments/new');
})

app.post('/comments',(req, res)=>{
    const {username, comment}=req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments'); 
})

app.get('/comments/:id',(req, res)=>{
    const {id}=req.params;
  const comment=  comments.find(c=>c.id === id); 
  res.render('comments/show',{comment})

})
app.get('/comments/:id/edit', (req, res)=>{
    const {id}=req.params;
    const comment=  comments.find(c=>c.id === id); 
    res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req, res)=>{
    const {id}=req.params;
    const newCommentText=req.body.comment;
    const foundComment=  comments.find(c=>c.id === id); 
    foundComment.comment=newCommentText;
    res.redirect('/comments'); 
})

app.delete('/comments/:id', (req,res)=>{
    const {id}=req.params;
   comments = comments.filter(c=> c.id !==id);
   res.redirect('/comments');
})


app.get('/tacos',(req, res)=>{
    res.send('GET /tacos response');
})

app.post('/tacos',(req, res) => {
    const {meat ,qty}=req.body;
        res.send(`here is your ${qty} ${meat}`);
    })
app.listen(3000,()=>{
    console.log('on port 3000!')
})
