const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const wmd = require('wmd');
const path = require('path');

const { getFile } = require('./importHelpers');
const { decodeBase64Image } = require('./helpers');
const { getListItems, getPagesEntries, getSiteContents } = require('./contentHelpers');
const { getThemeData } = require('./themeHelpers');
const { compileLists, compilePages, compileEverything } = require('./compileHelpers');
const config = require('./../config.json');

const app = express();

// support json encoded bodies
app.use(bodyParser.json({ limit: "50mb" }));

// support encoded bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));

// enable cors for panel app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});


// set view engine
app.set('view engine', 'pug');

// set path to views folder
app.set('/panel', path.join(__dirname, './../../panel/dist'));
// set image assets path
app.use('/public', express.static(path.join(__dirname, './../output/public')));
// set static assets path (when previewing page)
app.use('/static', express.static(path.join(__dirname, './../output/static')));
// set current theme path folder
app.set('theme', path.join(__dirname, './../theme/', config.theme));
// set helper variable for pug template includes
app.locals.basedir = app.get('theme');

// TODO: Fix paths to work with current theme folder
// set fonts folder path
// app.use('/fonts', express.static(path.join(__dirname, '/static/fonts')));
// set stylesheets folder path
// app.use('/css', express.static(path.join(__dirname, '/static/css')));
// set scripts folder path
// app.use('/js', express.static(path.join(__dirname, '/static/js')));
// set css image path
// app.use('/img', express.static(path.join(__dirname, '/static/img')));
// set preview url to see generated static webpage
// app.use('/preview', express.static(path.join(__dirname, '/../output')));

app.use(express.static(path.join(__dirname, './../../panel')));

// serve admin panel
app.get('/panel', (req, res) => {
	res.sendFile('index.html', {
		root: path.join(__dirname, './../../panel'),
	});
});

app.get('/public/:subPath(*)', (req, res) => {
	res.sendFile(path.join(__dirname, './../output/', req.params.subPath, 'index.html'));
});

// get list of all files
app.get('/site-contents/', (req, res) => {
	getSiteContents().then(fileList => {
    res.status(200).json({
			data: fileList,
		});
  });
});

// get list of all page files
app.get('/page-contents/', (req, res) => {
	getPagesEntries().then(fileList => {
    res.status(200).json({
			data: fileList,
		});
  });
});

// get list of all list files
app.get('/list-contents/', (req, res) => {
	getListItems().then(fileList => {
    res.status(200).json({
			data: fileList,
		});
  });
});

// get contents for single list entry
app.get('/list-item/:listName/:fileName', (req, res) => {
  const url = path.join(__dirname, '/../source/' + req.params.listName, req.params.fileName);
	getFile(url).then(fileData => {
	  const md = wmd(fileData, { preprocessors: [wmd.preprocessors.metadata, wmd.preprocessors.fencedCodeBlocks] });
  	res.status(200).json({
			data: md
		});
  });
});

// get contents for single page
app.get('/page/:fileName', (req, res) => {
  const url = path.join(__dirname, '/../source/', req.params.fileName)
	getFile(url).then(fileData => {
    const md = wmd(fileData, { preprocessors: [wmd.preprocessors.metadata, wmd.preprocessors.fencedCodeBlocks] });
    res.status(200).json({
			data: md,
		});
  });
});

// parse markdown to html
app.post('/parse2html/', (req, res) => {
	let txt = req.body.markdown;
	txt = wmd(txt, { preprocessors: [wmd.preprocessors.metadata, wmd.preprocessors.fencedCodeBlocks] });
	res.status(200).json({
		data: txt.html,
	});
});

// save image to public folder, append timestamp to name, return url to file
app.post('/save-img/', (req, res) => {
	const img = req.body.file;
	const file = decodeBase64Image(img);
	const name = req.body.name;
	const filename = Number(new Date()) + '-' + name;
  fs.writeFile(path.join(__dirname, '/../output/public/', filename), file.data, 'base64', err => {
    if (err) {
			console.warn(err)
			res.send(' File error :( ');
			return;
    }
    const safePath = encodeURIComponent(filename.trim());
    const mdAnchor = ` ![${name}](${path.join('/public/', safePath)})`;
    res.json({
			data: mdAnchor,
		});
  });
});

// save currently edited file
app.post('/save-file/', (req, res) => {
	const content = req.body.content;
	const fileUrl = req.body.url;
	const customFields = req.body.customFields;
	let txt = '';
	for(let key in customFields){
		if (customFields.hasOwnProperty(key)) {
			txt += key + ': ' + customFields[key] + '\n';
		}
	}
	txt += '\n' + content;
	fs.writeFile(fileUrl, txt, function(err){
		if(err){
      console.warn(err);
			res.sendStatus(500);
			return;
		}
		console.log('file saved!');
		res.sendStatus(200);
	});
});

// remove file
app.post('/remove-file/', (req, res) => {
	const fileUrl = req.body.url;
	fs.unlink(fileUrl, function(err){
		if(err){
      console.warn(err);
			res.sendStatus(500);
			return;
		}
		console.log('file removed!');
		res.sendStatus(200);
	});
});

// compile all lists
app.post('/compile-lists/', (req, res) => {
	compileLists().then(() => {
		res.sendStatus(200);
  });
});

// compile all pages
app.post('/compile-pages/', (req, res) => {
	compilePages().then(() => {
		res.sendStatus(200);
  });
});

// compile everything
app.post('/compile-all/', (req, res) => {
	compileEverything().then(() => {
		res.sendStatus(200);
  });
});

// =======================================
// =					EXTRA API ENDPOINTS			 	 =
// =======================================


// get all theme file urls from current theme folder
app.get('/get-all-theme-contents/', (req, res) => {
	getThemeData().then(themeData => {
		res.json({
			data: themeData,
		});
	});
});

// get filesystem url to content folder
app.get('/get-content-root-url/', (req, res) => {
	const rootContentUrl = path.join(__dirname, '/../source/');
	res.status(200).json({
		data: rootContentUrl,
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