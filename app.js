
// require the express module
const express = require('express');

// create our express app
const app = express();
const path = require("path");

var fs = require("fs");

function serveStatic(res, path, contentType, resCode) {
	fs.readFile(path, function(err, data) {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		} else {
			res.writeHead(resCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}

app.get('/', function(req, res){

	// sends back a response; that is all
	// res.send('hello');
  if (req.url === '/') {
		serveStatic(res, './views/index.hbs', 'text/html', 200);
	}
});
// listen on port 3000
app.listen(3000);
console.log('Started server on port 3000');

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


$(function() {
function getTemplateAjax(path, callback) {
  var source, template;
  $.ajax({
    url: path,
    dataType: "html",
    success: function (data) {
      source = data;
      template = Handlebars.compile(source);
      if (callback) callback(template);
    }
  });
}

function renderHandlebarsTemplate(withTemplate,inElement,withData, callback){
  getTemplateAjax(withTemplate, function(template) {
    var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement ;
    targetDiv.html(template(withData));
    if (callback) { callback()}
  })
};
// var handlebars = require('handlebars'),
//   fs = require('fs');
//
// fs.readFile('views/layout.hbs', 'utf-8', function(error, source){
//   // handlebars.registerHelper('custom_title', function(title){
//   //   var words = title.split(' ');
//   //   for (var i = 0; i < words.length; i++) {
//   //     if (words[i].length > 4) {
//   //       words[i] = words[i][0].toUpperCase() + words[i].substr(1);
//   //     }
//   //   }
//   //   title = words.join(' ');
//   //   return title;
//   // })
//
//   var template = handlebars.compile();
//   var html = template();
//   console.log(html)
// });
// var template = Handlebars.compile(source);
// var context = {title: "My New Post", body: "This is my first post!"};
// var html    = template(context);
