const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 :uuid} = require("uuid");
const methodOverRide = require("method-override");
const { title } = require("process");



app.use(methodOverRide('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

let blogs = [
    {
        id : uuid(),
        username : "rohit",
        title : "food",
        content : "Exploring the world through cuisine offers endless discovery. From the rich spices of Indian curries to the delicate balance of Japanese sushi, each culture expresses its history and values through food. My journey with Mediterranean dishes revealed how simple ingredients like olive oil, fresh herbs, and seasonal vegetables can create vibrant, healthful meals that nourish both body and soul.",

    },
    {
        id : uuid(),
        username : "ronak",
        title : "travel",
        content : "Traveling unveils the world's tapestry of cultures, landscapes, and human connections. My recent journey through Southeast Asia taught me how ancient temples whisper history in Cambodia's heat, while Vietnam's misty mountains humble even the most seasoned hiker. Backpacking through Europe revealed how a shared meal in a Barcelona hostel can forge friendships across continents. True travel isn't about ticking landmarks - it's surrendering to unexpected detours that become your most cherished stories, like getting lost in Marrakech's medina only to discover a hidden tea sanctuary.",
    }
];


app.get("/blogs" ,(req,res) => {
    res.render("index.ejs" , {blogs});
});
app.get("/blogs/new" , (req,res) =>{
    res.render("new.ejs",{blogs});
})
app.post("/blogs",(req,res) => {
    let { username , title , content} = req.body; 
    let id = uuid();
    blogs.push({ id ,username,title,content });
    res.redirect("/blogs");
});
app.get("/blogs/:id", (req,res) => {
    let { id } = req.params;
    let blog = blogs.find( (b) => b.id === id );
    if(blog) {
        res.render("show.ejs" , {blog});
        }
});

app.get("/blogs/:id/edit" , (req,res) => {
    let { id } = req.params;
    let blog = blogs.find( (b) => id === b.id );
    if(blog) {
        res.render("edit.ejs" , {blog});
    }
});

app.patch("/blogs/:id" , (req,res) => {
    let { id } = req.params;
    let blog = blogs.find( (b) => id === b.id );
    let Newblog = { title : req.body.title , content : req.body.content };
    blog.title = Newblog.title;
    blog.content = Newblog.content;
    res.redirect("/blogs");
})
app.get("/blogs/:id/delete",(req,res) => {
    let { id } = req.params;
    let blog = blogs.find( (b) => id ===b.id)
    res.render("delete.ejs",{blog});
})
app.delete("/blogs/:id" , (req,res) => {
    let { id } = req.params;
    blogs = blogs.filter( (b) => id !== b.id);
    res.redirect("/blogs");
})
app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
})