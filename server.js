const express=require('express')
const cors=require('cors')
const axios=require('axios')
const app=express()
const bodyparser=require('body-parser')
const accesstoken='eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA2MzQ2MzcyLjEwNjQ3MywiaWF0IjoxNzA2MjU5OTcyLjEwNjQ3MiwianRpIjoiRXFOcHB1bDc5a3puZG5HckhnUjhNNWRvQV82ZEV3IiwiY2lkIjoiOFV4Z0lHMXNnQnlIS0NkRGJqV3ZldyIsImxpZCI6InQyX3ZkdXh5cXI3IiwiYWlkIjoidDJfdmR1eHlxcjciLCJsY2EiOjE2NzI3NTQ5ODMwODcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.kYlINEVqjRNZF_vYPxf4OUzvmgUCnCnDMotZkxDe3DcpP2gqWjHT72u993rpj5SzRvVL5NUppRopUF1EeMbQbGMBiWFtVns7sE09mrxEanLhjZtRWtj7rILqZkWSxLP2x31kgmDQk2Caamx7iX4Y_iaabU5P0OLy5xQsIqj_bAPw9kd7JtmHBagaNgTIkUxswMu9qGThkED-SiGhEKqB9CZ20fRRossB0EEqGUZnb7nXVpsVEBeBd1Iz4bw8S0IRK4R35t_knMxrlUgy74GfLMSEtQAX_9-j8N4x2NXUzJiA4Cf21w2WDbQvXurRZE5sF221Y58Xtn4iqGFO9Hu8zw'
app.set('view engine','ejs');

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('views'));
app.get('/',async(req,res)=>{
    try{
        let response
        do{
          response=await axios.get(`https://oauth.reddit.com/r/dankmemes/random`,{
            method:'GET',
            headers:{
            'Authorization':`bearer ${accesstoken}`,
            'User-Agent':'test/0.1'
            }})
        }while(response.data[0].data.children[0].data.post_hint != 'image')
        const data=response.data
        res.render('index',{imageurl:data[0].data.children[0].data.url_overridden_by_dest})
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
        const sub=req.params.sub
        let response
        do{
            response=await axios.get(`https://oauth.reddit.com/r/${sub}/random`,{
              method:'GET',
              headers:{
                  'Authorization':`bearer ${accesstoken}`,
                  'User-Agent':'test/0.1'
              }})
             
        }while(response.data[0].data.children[0].data.post_hint != 'image')
            const data=response.data
              res.render('index',{imageurl:data[0].data.children[0].data.url_overridden_by_dest})   
    }catch(error){
        console.log("axios fetch failed")
        res.status(500).send('<h3>Internal Server Error.<br/><strong>Note:</strong> Only search for known subreddits.</h3>');
    }
})
app.listen('3000',()=>{
    console.log("listening to port 3000")
})