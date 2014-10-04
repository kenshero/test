// livereload = require('livereload');
// server = livereload.createServer();
// server.watch(__dirname + "/public");

/* ======================================= */

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;

var studentGrade = null;

var port = 4000;
var express = require('express');
var app = express();
app.use(express.static('./public/'));

MongoClient.connect('mongodb://ken:1234@kahana.mongohq.com:10011/grade_ken', function(err, db) {
  if(err) throw err;
  studentGrade = db.collection('grade_test');

  app.listen(port);
  console.log("\nhttp://127.0.0.1:"+port+"\n");
});

/* ======================================= */

app.get('/api/add/:name/:credit/:grade',function(req,res){

	var insertData={
		subject:req.params.name,
		credit:req.params.credit,
		grade:req.params.grade
	}
	studentGrade.insert(insertData,function(){
		res.send('Succees');
	})
});

app.get('/api/get/:_id?',function(req,res){

	var find = {	
	}

	if (req.params._id) {
	find._id= new ObjectID(req.params._id);

		studentGrade.find(find).toArray(function(err,grades){
			if (err) res.send(err);
			res.send(grades);
		})
	}
	else{
		studentGrade.find().toArray(function(err,grades){
			if (err) res.send(err);
			res.send(grades);
		})
	}

});


app.get('/api/update/:_id',function(req,res){

	var find={
	};

	var newData={};
	
	if (req.params._id)
		find._id=new ObjectID(req.params._id);

	if (req.query.subject)
		newData.subject=req.query.subject;

	if (req.query.credit)
		newData.credit=req.query.credit;
	
	if (req.query.grade)
		newData.grade=req.query.grade;


	studentGrade.update(find, {'$set':newData}, function(err,result) {
      if (err) console.warn(err.message);
      else console.log('successfully updated');
      res.send('successfully');
    });

});

app.get('/api/delete/:_id',function(req,res){

	var find={};

	var newData={};

	if (req.params._id)
		find._id=new ObjectID(req.params._id);

	studentGrade.remove(find,function(err,result){
		if (err)
			res.send(err);
		res.send("successfully");
	});
});






