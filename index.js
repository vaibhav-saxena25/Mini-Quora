const express = require('express');
const app     = express();
const port    = 8080;
const path    = require('path');
const {v4:uuidv4} = require('uuid');
const methodOverride = require("method-override");
uuidv4();

app.use(express.urlencoded({expecrted:true}));

app.use(methodOverride("_method"));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"coding"
    },
    {
        id:uuidv4(),
        username:"shraddha khapra",
        content:"hardworking is important to achieve the success"
    },
    {
        id:uuidv4(),
        username:"RahulKumar",
        content:"i got selected for my first internship"
    }
]
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    res.send("request working");
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id === id); 
    post.content = newContent;
    
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id === id);
    res.render("edit.ejs",{post:post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id !== id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("server is listening on the port 8080");
})