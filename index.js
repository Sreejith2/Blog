import express from "express"
import bodyParser from "body-parser"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"


const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)


let posts = [{id:0,blogHeading:"SampleHead1",blogContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id:1,blogHeading:"SampleHead2",blogContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id:2,blogHeading:"SampleHead3",blogContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id:3,blogHeading:"SampleHead4",blogContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
]


const app=express()
const port=3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')

// HOME-PAGE
app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/view-all-posts",(req,res)=>{
    res.render('view-all-posts',{posts:posts})
})


// VIEW-SELECTED-POST
app.get("/view-post/:id",(req,res)=>{
    const postId = parseInt(req.params.id, 10);
    const viewPost=posts.find((post,index)=>index===postId)
    if(!viewPost){
        return res.status(404).send("Blog not found")
    }
    res.redirect(`/view-post?id=${postId}`)
})

app.get("/view-post", async (req,res)=>{
    try{
        const postId=parseInt(req.query.id,10)
        const viewPost=posts.find((post,index)=>index===postId)
        res.render('post',{post:viewPost})
    }catch(err){
        console.log("Error occured",err);
    }
})


// POSTING A BLOG
app.post("/post-blog",(req,res)=>{
    let l=posts.length
    let newPost={id:l,...req.body}
    // addBlog(newPost);
    posts=[...posts,newPost]
    res.render('view-all-posts',{posts:posts})
})

// DELETING A BLOG
app.get("/delete/:id",(req,res)=>{
    const id=req.params.id
    posts=posts.filter((post,index)=>index.toString()!==id)
    res.redirect("/view-all-posts")
})

//EDITING A BLOG
app.get("/edit/:id",(req,res)=>{
    const id=req.params.id
    res.redirect(`/edit-form?id=${id}`)
})

app.get("/edit-form",(req,res)=>{
    const id=parseInt(req.query.id)
    const editPost=posts.find((post,index)=>index===id)
    res.render('editForm',{post:editPost})
})

app.post("/update-blog/:id",(req,res)=>{
    const id=req.params.id
    const newContent=req.body
    posts=posts.filter((post,index)=>index.toString()!==id)
    posts=[...posts,newContent]
    res.redirect("/view-all-posts")
})


app.listen(port,()=>{
    console.log(`server running at port http://localhost:${port}`)
})