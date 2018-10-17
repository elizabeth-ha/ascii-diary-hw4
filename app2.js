const express = require('express');
const path = require('path');
const app = express();
// app.get / post / put / delete : add a route
// app.use ... will use middleware (a function / functions that get called prior to routes - they take
// a request, response and next function... and can manipulate requerst and response, and even send
// back response right away)
// app.set - set a configuration (determine what "view engine" to use / templating system)
// app.listen


// express.static is middleware that does this:
// 1. look at request
// 2. get path from request
// 3. try to find file in file system folder based on path
// 4. if it can't find it.... go to remainder of routes
// 5. if it did find it, serve it

const defaultArt = {
    posts: [{
      title: 'fishy',
      date: '2018-09-29',
      art: `
               O  o
          _\\_   o
>('>   \\\\/  o\\ .
       //\\___=
          ''
`
    },
    {
      title: 'doggy',
      date: '2018-09-30',
      art: `
/^-----^\\
V  o o  V
 |  Y  |
  \\ Q /
  / - \\
  |    \\
  |     \\     )
  || (___\\====
      `
    },
    {
      title: 'bear',
      date: '2018-10-31',
      art: `
      (()__(()
      /        \\
     ( /     \\   \\
      \\  o o    /
      (_()_)__/  \\
     / _,==.____  \\
    (   |--|      )
    / \\_.|__|'-.__/ \\_
   / (        /     \\
   \\   \\       (      /
    )  '._____)    /
 (((____.--(((____/
      `
    }]

};
const p = path.join(__dirname, 'public');
app.use(express.static(p)); // this ends up doing res.end / sendFile / send to end the request/response
app.use('/static', express.static(path.join(__dirname, 'public')))
const logger = (req, res, next) => {
  console.log(req.method, req.path, req.query);
  next();
};

app.use((req, res, next) => {
  if(req.get('Host')) {
     next();
  } else {
    res.status(400).send('invalid request... add a host header plz');
  }
});

app.use(logger);



// switch templating engine here:
app.set('view engine', 'hbs');

app.get('/add', (req, res) => {
  const result = parseInt(req.query.num1) + parseInt(req.query.num2);
  console.log(result);

  res.render('add', {sum: result});
  // res.status(200).send(isNaN(result) ? 'not a number' : '' + result);
});

// GET / HTTP/1.1
// when i get a GET request that has / as its path
// then call the callback function
// the callback function will be invoked with
// a request and response object
app.get('/', (req, res) => {
  // res.send('<h1>adventure time fan site!</h1> my fav character pep but');
  // res.render('layout', {sum: result});
  res.render('index', defaultArt);
});

app.get('/index', (req, res) => {
  const revArt = defaultArt;
  revArt['posts'].reverse();
  res.render('index', revArt);
});

app.get('/pepbut', (req, res) => {

  const obj = {foo: 'bar', baz: 'qux'};
  const listObj = [{show: 'at'}, {show: 'gravity falls'}]

  const context = {
    character1: 'magic man',
    character2: '>>>>>>> pb',
    favs: ['magic man', 'pb', 'pep but'],
    obj: obj,
    shows: listObj, // note that var name doesn't have to match
  };

  // render takes template and generates html
  // 1st arg: template name minus extension
  // 2nd arg: context object contains
  // keys (variable names) and their values
  res.render('pepbut', context);
});


app.listen(3000);
