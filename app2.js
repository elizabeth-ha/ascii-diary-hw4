const express = require('express');
const path = require('path');
const app = express();

var defaultArt = {
    posts: [{
      title: 'fishy',
      date: '2018-09-29',
      art: `
               O  o
          _\\_   o
>('>   \\\\/  o\\ .
       //\\___=
          ''
`,
      tag: ['animal', 'water']
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
      `,
      tag: ['animal', 'cute']
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
      `,
      tag: ['animal', 'big']
    }]

};
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

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  const revArt = defaultArt;
  revArt['posts'].reverse();

  const params = req.query;

  if (params['title'] != null &&
      params['date'] != null &&
      params['art'] != null &&
      params['tag'] != null) {
    var newEntry = {
      title: params['title'],
      date: params['date'],
      art: params['art'],
      tag: params['tag'].split(" ")
    };
    defaultArt['posts'].push(newEntry);
    revArt['posts'].reverse();
    res.render('index', revArt);
  }
  else if (params['tag'] != null && Object.keys(params).length == 1) {
    revArt['posts'].reverse();
    const filterArt = {posts: []};
    filterArt['posts'] = [];

    for (var i = 0; i < revArt['posts'].length; i++) {
      if (revArt['posts'][i]['tag'].includes(params['tag'])) {
        filterArt['posts'].push(revArt['posts'][i]);
      }
    }
    res.render('index', filterArt);
  } else {
    res.render('index', revArt);
  }
});

app.get('/add', (req, res) => {
  const params = req.query;

  res.render('add', defaultArt);
});



app.listen(3000);
