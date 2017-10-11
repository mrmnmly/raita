const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const wmd = require('wmd');
const path = require('path');

const {getFile} = require('./importHelpers');
const {decodeBase64Image} = require('./helpers');
const {getListItems, getPagesEntries, getSiteContents} = require('./contentHelpers');
const {getThemeData} = require('./themeHelpers');
const {compileLists, compilePages, compileEverything} = require('./compileHelpers');

const app = express();

// support json encoded bodies
app.use(bodyParser.json()); 

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'pug');

//set path to views folder
app.set('views',path.join(__dirname, '../admin/'));
// set fonts folder path
app.use('/fonts', express.static(__dirname + '/static/fonts'));
// set stylesheets folder path
app.use('/css', express.static(__dirname + '/static/css'));
// set scripts folder path
app.use('/js', express.static(__dirname + '/static/js'));
// set css image path
app.use('/img', express.static(__dirname + '/static/img'));
// set image assets path
app.use('/public', express.static(__dirname + '/../output/public'));
// set preview url to see generated content
app.use('/preview', express.static(__dirname + '/../output'));

// home route
app.get('/', function(req, res){
	getFileList().then(fileList => {
  	res.render('index', { fileList: fileList, dirname: __dirname });
  });
});

// get list of all files
app.get('/site-contents/', function(req, res){
	getSiteContents().then(fileList => {
    res.send(fileList);
  });
});

// get list of all page files
app.get('/page-contents/', function(req, res){
	getPagesEntries().then(fileList => {
    res.send(fileList);
  });
});

// get list of all list files
app.get('/list-contents/', function(req, res){
	getListItems().then(fileList => {
    res.send(fileList);
  });
});

// get contents for single list entry
app.get('/list-item/:listName/:fileName', function(req, res){
  const url = path.join(__dirname, '/../source/' + req.params.listName, req.params.fileName);
	getFile(url).then(fileData => {
	  const md = wmd(fileData);
  	res.send(md);
  });
});

// get contents for single page
app.get('/page/:fileName', function(req, res){
  const url = path.join(__dirname, '/../source/', req.params.fileName)
	getFile(url).then(fileData => {
    const md = wmd(fileData);
    res.send(md);
  });
});

// parse markdown to html
app.get('/parse2html/', function(req, res){
	const txt = req.query.markdown;
	txt = wmd(txt);
	res.send(txt.html);
});

// save image to public folder, append timestamp to name, return url to file
app.post('/save-img/', function(req, res){
	const img = req.query.file;
	const file = decodeBase64Image(img);
	const name = req.query.name;
	const filename = Number(new Date()) + '-' + name;

  fs.writeFile(path.join(__dirname, '/../output/public/', filename), file.data, 'base64', err => {
    if (err) {
      res.send(' File error :( ');
    }
    const safePath = encodeURIComponent(filename.trim());
    const mdAnchor = ` ![${name}](${path.join('/public/', safePath)})`;
    res.send(mdAnchor);
  })
});

// save currently edited file
app.post('/save-file/', function(req, res){
	const content = req.body.content;
	const fileUrl = req.body.url;
  const customFields = req.body.customFields;
	let txt;
	for(let key in customFields){
		txt += key + ': ' + customFields[key] + '\n';
	}
	txt += '\n' + content;
	fs.writeFile(fileUrl, txt, function(err){
		if(err){
      console.warn(err);
      res.sendStatus(500);
		}
		console.log('file saved!');
		res.sendStatus(200);
	});
});

// compile all lists
app.post('/compile-lists/', function(req, res){
	compileLists().then(() => {
		res.sendStatus(200);
  });
});

// compile all pages
app.post('/compile-pages/', function(req, res){
	compilePages().then(() => {
		res.sendStatus(200);
  });
});

// compile everything
app.post('/compile-all/', function(req, res){
	compileEverything().then(() => {
		res.sendStatus(200);
  });
});

// =======================================
// =					EXTRA API ENDPOINTS			 	 =
// =======================================


// get all theme file urls from current theme folder
app.get('/get-all-theme-contents/', function(req, res){
	getThemeData().then(themeData => {
		res.send(themeData);
	});
});

// app.post('/save-template/', function(req, res){
// 	var content = req.body.content;
// 	var title = req.body.title;
// 	fs.writeFile(title, content, function(err){
// 		if(err){
// 			console.warn(err);
// 		}
// 		console.log('template saved!');
// 		res.send('template saved');
// 	});
// })

// app.post('/compile-list/', function(req, res){
// 	var list = req.body.list;
// 	var listName = req.body.name;
// 	var viewName = listName.replace('.pug', '');
// 	var postsList = [];
// 	for(var x = 0, l = list.length; x < l; x++){
// 		var path = '/' + viewName + '/' + slugify(list[x]) + '/';
// 		postsList.push(obj);
// 		res.send('List compiled!');
// 	}
// });

// // server-side variable that prevents user to send multiple ftp uploads
// var ftpInProgress = false;
// // deploy static files via ftp to remote server
// app.get('/deploy/', function(req, res){
// 	if(!ftpInProgress){
// 		ftpInProgress = true;
// 		deployViaFtp(function(){
// 			ftpInProgress = false;
// 			res.send('Updated');
// 		});
// 	}else{
// 		res.status(500).send('There is a ftp upload action in progress');
// 	}
// });

// server start
app.listen(3000);