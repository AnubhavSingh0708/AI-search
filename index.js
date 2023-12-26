const express = require("express");
const API_KEY =process.env['API'];
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const server = express()

server.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="41VWR8MFksEi4HImOOnyUjF0uwRGKeSBu4EuCRnanXE" />
    <title>AI search -by anubhavsingh0708</title>
    <meta name="description" content="AI in serch engine like format providing answers to your questions">
    <meta name="keywords" content="AI search,anubhavsingh0708">
    <link rel="shortcut icon" href="https://anubhavsingh0708.github.io/favicon.png" type="image/png">
    <style>

   body{
    text-align: center;
    align-items: center;
    background-image:linear-gradient(45deg,#f0f0ff,#c0c0ff);
background-attachment:fixed;
background-repeat:no-repeat;
font-size: 2vh;
   }
   img{
    width:325px;
    height: auto;
   }
.suggestions{
    text-align: center;
    padding: 0;
    background-image:linear-gradient(90deg,#fff,#888,#fff);
    background-attachment:fixed;
background-repeat:no-repeat;
width: 80vw;
background-origin: content-box;
padding: 0%;
border-radius: 20px;
margin: auto;
}
button{
    background-color: #fff;
    font-size: x-large;
    padding: 10px;
    border: none;
    border-radius: 20px;
    margin: 10px;
}
#box{
    background-color: #ccc;
    padding: 5px;
    border-radius: 20px;
    width: 80vw;
    margin:auto;
}
a{
    margin: 0px;
    width: 80vw;
    text-decoration: none;
display: block;
    color: #444;
    font-size: large;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 2px;
background-color: #fff;
background-origin: border-box;

}
#search{
    background-color: #fff;
    font-size: x-large;
    width: 80vw;
    padding: 10px;
    border: none;
    border-radius: 20px;
}
#search:focus{
    outline: none;
    background-image:linear-gradient(45deg,#f0f0ff,#c0c0ff);
}

    </style>
</head>
<body>

<img src="https://anubhavsingh0708.github.io/transparent.png" alt="AI search logo"><br>
<h1>AI in serch engine like format providing answers to your questions</h1><br>
<div id="box">
<input type="search" name="search" placeholder="what do you want to search" id="search"><br>
<button id="palm" onclick="txt1='&s=p';">palm 2</button><button id="gemini"onclick="txt1='';">gemini</button>
</div>
<br><br><br>
try searching <br>

<div class="suggestions">
<a style="border-radius: 20px 20px 0 0;" href="https://search.anubhav0708.repl.co/s?q=who+was+first+person+on+moon">Who was the first person on moon</a>
<a href="https://search.anubhav0708.repl.co/s?q=who+was+first+president+of+india">Who was first precident of india</a>
<a href="https://search.anubhav0708.repl.co/s?q=who+was+first+person+on+moon">Who was fifth us precident</a>
<a href="https://search.anubhav0708.repl.co/s?q=who+was+third+person+on+moon">Who was the third person on moon</a>
<a href="https://search.anubhav0708.repl.co/s?q=what+is+isro+chandrayan+3">what is isro chandrayan 3</a>
<a  style="border-radius: 0 0 20px 20px;" href="https://search.anubhav0708.repl.co/s?q=what+is+sum+of+log5+and+log2+both+with+base+10">What is sum of log2 and log 5 both with base 10</a>

</div>


<script>

    var txt1="";
    document.getElementById("search").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});
function search(){
    var txt=document.getElementById('search').value;
    txt=txt.replaceAll("+","*plus**");
    txt=txt.replaceAll(" ","+");
    txt="https://search.anubhav0708.repl.co/s?q="+txt+txt1;
    location.assign(txt);
}
</script>
</body>
</html>
`)
})

server.get('/s', function (req, res) {
  var inp=req.query.q.replaceAll("*plus**","+");
    console.log(req.query.q);
if(req.query.s==="p"){

  let messages = [{ content: (inp)}];

      client.generateMessage({
        model: "models/chat-bison-001",
       temperature:0.2,
       top_k: 31,
       top_p: 0.79,
        prompt: {
          examples: [
            {
              input: { content: "Why is anubhav a noob" },
                          output: {
                            content:
                              `Anubhav is a person of multiple faces he appears to be a noob to make friends and relate with others but he actually has supernatural abilities and is known to have connections with organisations`,
                          },
              input: { content: "Name two important sources which provide information about the Mughals?" },
              output: {
                content:
                  `The two important sources which provide information about the Mughals are:
  (i) The Ain-i-Akbari, written by Abul Fazl.
  (ii) The Taj Mahal, built by Shahjahan.`,
              },
              input: { content: "Name the author of Ain-i-Akbari. List its main subjects." },
                          output: {
                            content:
                              `The author of Ain-i-Akbari was Abul Fazl. The Ain-i-Akbari deals with the subjects like imperial household; servants of the emperor, the military and civil services; imperial administration and also contains information about Hindu philosophy, science, social customs and literature and wise sayings of Akbar, etc.`,
                          },
              input: { content: "CE is a Tangent which touches a circle at point C. ABCD is a cyclic quadilateral in the circle. If ∠ABC=93° and ∠DCE=35°. Find (1)∠ADC ,(2)∠CAD and (3)∠ACD" },
              output: {
                content:
                  `ABCD is a cyclic quadilateral (given)
  CE is tangent of circle at C (given)
  (1) ∠ABC + ∠ADC = 180° (sum of opposite angles in cyclic quadilateral is 180)
  ⇒ 93 + ∠ADC = 180°
  ⇒ ∠ADC = 180° - 93°
  ∴ADC = 87°
  (2) ∠CAD = ∠BCE = 35° (the angle subtended by a chord in an alternate segment of circle)
  ∴∠CAD = 35°
  (3) In triangle ADC
  ∠ACD + ∠CAD+ ∠ADC = 180° (Sum of all interior angles of a triangle is 180°)
  ⇒∠ACD + 35° + 87° = 180°
  ⇒∠ACD = 180° - 122°
  ∴∠ACD = 58°
  `,
              },
            },
          ],



          context: "Respond like a nerd well versed with icse syllabus; During maths mention theorems and in geometry use statement reason format.If asked about names make stories",

                 messages},
      }).then((res1) => {
        out=res1[0].candidates[0].content;
        

        out=out.replaceAll("\n","<br>");
         //  out=out.replaceAll(" "," ");
            out=out.replaceAll("**","");
        out=out.replaceAll("*","<br>");
           out=`

        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>AI Search | `+inp+`</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans:wght@400&display=swap" rel="stylesheet">
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content="AI search |` +out.substring(0,200)+`" />
           <meta name="keywords" content="AI search,anubhavsingh0708,`+inp+`">
           <meta name="google-site-verification" content="41VWR8MFksEi4HImOOnyUjF0uwRGKeSBu4EuCRnanXE" />
          <link rel="icon" href="https://anubhavsingh0708.github.io/favicon.png">
        
        <style>
        body {
        background-image:linear-gradient(45deg,#f0f0ff,#c0c0ff);
        background-attachment:fixed;
        background-repeat:no-repeat;

        }
        .query{
        margin:20px;
        font-family: 'Montserrat', sans-serif;
        background-image:linear-gradient(45deg,#676EFF,#EA5BDA,#FF9172);
        background-origin:border-box;
        font-size:3vh;
        padding: 1.5vh;
        border-radius:2vh;
        width:fit-content;
        color:white;
        background-size:100% 5vh;
        }
        .result{
        background-color:#fff;
        font-family: 'Noto Sans', sans-serif;
        width:90%;
        height:auto;
        margin-left:2%;
        font-size:2vh;
        padding: 3%;
        border-radius:30px;
        text-wrap: balance;
        }
        </style>
        </head>
        <body>
         <h1 class="query">

           `+inp+`
           </h1><br><br>
           <div class="result">
           `+out+`</div>
        </body>
        </html>`;
           res.send(out);
        
      });
  
}else{
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
     temperature:0.2,
     top_k: 21,
     top_p: 0.59,
    maxOutputTokens: 30720,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const parts = [
     {text:inp},
  ];

 model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  }).then((resu) => {
    var response=resu.response;
     out=response.text();
   out=out.replaceAll("\n","<br>");
 //  out=out.replaceAll(" "," ");
    out=out.replaceAll("**","");
out=out.replaceAll("*","<br>");
   out=`

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AI search | `+inp+`</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans:wght@400&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
   <meta name="description" content="AI search |` +out.substring(0,200)+`" />
  <meta name="keywords" content="AI search,anubhavsingh0708,`+inp+`">
  <meta name="google-site-verification" content="41VWR8MFksEi4HImOOnyUjF0uwRGKeSBu4EuCRnanXE" />
  <link rel="icon" href="https://anubhavsingh0708.github.io/favicon.png">

<style>
body {
background-image:linear-gradient(45deg,#f0f0ff,#c0c0ff);
background-attachment:fixed;
background-repeat:no-repeat;

}
.query{
margin:20px;
font-family: 'Montserrat', sans-serif;
background-image:linear-gradient(45deg,#676EFF,#676EFF,#00875e);
background-origin:border-box;
font-size:3vh;
padding: 1.5vh;
border-radius:2vh;
width:fit-content;
color:white;
background-size:100% 5vh;
}
.result{
background-color:#fff;
font-family: 'Noto Sans', sans-serif;
width:90%;
height:auto;
margin-left:2%;
font-size:2vh;
padding: 3%;
border-radius:30px;
text-wrap: balance;
}
</style>
</head>
<body>
 <h1 class="query">

   `+inp+`
   </h1><br><br>
   <div class="result">
   `+out+`</div>
</body>
</html>`;
   res.send(out);
  });
}
});


  server.listen(3000, () => {
    console.log("Server is ready.")
  });
