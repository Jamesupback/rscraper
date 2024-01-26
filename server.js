const express=require('express')
const cors=require('cors')
const axios=require('axios')
const app=express()
const bodyparser=require('body-parser')
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
            'Authorization':'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA2MjU5ODc5LjgwNDYxNSwiaWF0IjoxNzA2MTczNDc5LjgwNDYxNCwianRpIjoicS1Ga3hzMGpBbG9jSUZMYU9IX0RpdF9vb1ZCOHZnIiwiY2lkIjoiOFV4Z0lHMXNnQnlIS0NkRGJqV3ZldyIsImxpZCI6InQyX3ZkdXh5cXI3IiwiYWlkIjoidDJfdmR1eHlxcjciLCJsY2EiOjE2NzI3NTQ5ODMwODcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.Fa_y5dLn-aBZynjAQVWZ3V2TYkq_cnt7VUVw9REXKzmThD9eNkdn1X-1B4qzbRra4UQZ7Z-_l6VvBLhk-qSpKpgLGlAf-gzrwAD7XtdSDfcVv8Ovq6I2n6LDdEXouF4QHWI9JCrWvxuqYupKPWSaO2Yn7IhskKiIDtW9T3u0M6C22M173Lq0KyDjolSbqY8WEb3zuEIN1hjMUUUGW1yxtvIyaHULw4t4a7sncINJLqS41edTvwO0G492m8GxkFByG9Ws4bODY3yV-Lh_KOPfNMfVhITAQNkPZJ-w5__uzCCp_lsijwcXrdTdzEqVYGqZvSHkIy5ookfPjOknh2WVeQ',
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
                  'Authorization':'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA2MjU5ODc5LjgwNDYxNSwiaWF0IjoxNzA2MTczNDc5LjgwNDYxNCwianRpIjoicS1Ga3hzMGpBbG9jSUZMYU9IX0RpdF9vb1ZCOHZnIiwiY2lkIjoiOFV4Z0lHMXNnQnlIS0NkRGJqV3ZldyIsImxpZCI6InQyX3ZkdXh5cXI3IiwiYWlkIjoidDJfdmR1eHlxcjciLCJsY2EiOjE2NzI3NTQ5ODMwODcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.Fa_y5dLn-aBZynjAQVWZ3V2TYkq_cnt7VUVw9REXKzmThD9eNkdn1X-1B4qzbRra4UQZ7Z-_l6VvBLhk-qSpKpgLGlAf-gzrwAD7XtdSDfcVv8Ovq6I2n6LDdEXouF4QHWI9JCrWvxuqYupKPWSaO2Yn7IhskKiIDtW9T3u0M6C22M173Lq0KyDjolSbqY8WEb3zuEIN1hjMUUUGW1yxtvIyaHULw4t4a7sncINJLqS41edTvwO0G492m8GxkFByG9Ws4bODY3yV-Lh_KOPfNMfVhITAQNkPZJ-w5__uzCCp_lsijwcXrdTdzEqVYGqZvSHkIy5ookfPjOknh2WVeQ',
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