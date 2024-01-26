require ('dotenv').config();
const express=require('express')
const cors=require('cors')
const axios=require('axios')
const app=express()
const bodyparser=require('body-parser')
const accesstoken=process.env.ACCESS_TOKEN
app.set('view engine','ejs');

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('views'));
app.get('/',async(req,res)=>{
    try{
        let response
        let random
       do{
            random=Math.floor(Math.random()*100)
            response=await axios.get(`https://oauth.reddit.com/r/dankmemes?limit=100`,{
            method:'GET',
            headers:{
            'Authorization':`bearer ${accesstoken}`,
            'User-Agent':'test/0.1'
            }})
        }while(response.data.data.children[random].data.post_hint != 'image')
        const data=response.data
        res.render('index',{imageurl:data.data.children[random].data.url_overridden_by_dest})
    }catch(error){
        console.log("axios fetch failed")
        res.status(500).send('<h3>Internal Server Error.<br/><strong>Note:</strong> Only search for known subreddits.</h3>');
    }
})
app.post('/',async(req,res)=>{
    const sub=req.body.text
    res.redirect(`${sub}`)
})
app.get('/:sub',async(req,res)=>{
    try{
        if (req.params.sub.toLowerCase() === 'favicon.ico') {
            // Skip handling favicon.ico requests
            return;
          }
        let response
        let random
        let url
        if(req.params.sub=='bestgirl'){
            url='https://oauth.reddit.com/u/leahgoeswilde/?limit=100'
        }
        else
        {
            let sub=req.params.sub
            url=`https://oauth.reddit.com/r/${sub}/?limit=100`
        }
        do{
            random=Math.floor(Math.random()*100)
            response=await axios.get(url,{
              method:'GET',
              headers:{
                  'Authorization':`bearer ${accesstoken}`,
                  'User-Agent':'test/0.1'
              }})
             
        }while( response.data.data.children[random].data.post_hint != 'image')
            const data=response.data
              res.render('index',{imageurl:data.data.children[random].data.url_overridden_by_dest})   
    }catch(error){
        console.log("axios fetch failed")
        res.status(500).send('<h3>Internal Server Error.<br/><strong>Note:</strong> Only search for known subreddits.</h3>');
    }
})
app.listen('3000',()=>{
    console.log("listening to port 3000")
})