var express=require('express');
var hbs=require('hbs');
var fs=require('fs')
const port=process.env.PORT || 3000
var app=express();
//setting partials to make constant part of webpage aprt
hbs.registerPartials(__dirname + '/views/partials')
//setting view engine
app.set('view engine','hbs');
//seting to serve static files

app.use((req,res,next)=> {
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to write log to file')
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear',()=>{
      return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
      return text.toUpperCase();
})
app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express<h1> ')
    // res.send({
    //     name:'Ankit',
    //     likes:[
    //         'riding',
    //         'trecking '
    // ]
    // })
    res.render('home.hbs',{
        pageHeading:'Home Page',
        welcomeMessage:'welcome to my website',
        //currentYear:new Date().getFullYear()
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageHeading:'About Page',
        //currentYear:new Date().getFullYear()
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageHeading:'Project Page'
    });
})
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to fulfil your request'
    })
})
app.listen(3000,()=>{
    console.log(`Server is running on port ${port}`);
});