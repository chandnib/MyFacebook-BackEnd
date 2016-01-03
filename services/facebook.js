
var mongo = require("../mongo/mongo");
var mongoURL = "mongodb://localhost:27017/facebook";

function handle_request_signup(msg, callback){
	var res = {};
	console.log("In handlesignup request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_signup_users = mongo.collection('users');
	
	coll_signup_users.insert({fname:msg.fname, 
								lname:msg.lname,
								dob:msg.dob,
								gender:msg.gender,
								email:msg.email, 
								password:msg.password});
	
	console.log("back to handle req " + coll_signup_users);
	

		res.code = "200";
		res.value = "Record inserted in userdetails";
	console.log(res);
	
//	var coll_signup_usercred = mongo.collection('user_creds');
//	
//	coll_signup_usercred.insert({email:msg.email, 
//								password:msg.password});
//	console.log("back to handle req " + coll_signup_usercred);
//	
////	if(coll_signup_usercred === true)
////	{
//	res.code = "200";
//	res.value = "Record inserted in usercreds";
////	}
////	else
////	{
////	res.code = "401";
////	res.value = "Record insertion failed in usercreds";
////	}
//	console.log(res);

	callback(null, res);
});
}

exports.handle_request_signup = handle_request_signup;



function handle_request_login(msg,callback)
{
	var res = {};
	
	console.log("In handlelogin request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_login = mongo.collection('users');
	console.log(JSON.stringify(msg));
	coll_login.findOne({email: msg.email, password:msg.password}, function(err, user){
		if (user) {
			// This way subsequent requests will know the user is logged in.
//			req.session.username = user.username;
//			console.log(req.session.username +" is the session");
			res.code = "200";
			res.value = "login successful";
			console.log(res);
			callback(null, res);
		} else {
			console.log("returned false");
			res.code = "400";
			res.value = "login unsuccessful";
			console.log(res);
			callback(null, res);
		}
	});
	
	});
	
}
	
	
exports.handle_request_login = handle_request_login;

function handle_request_get_user(msg,callback)
{
var res = {};
	
	console.log("In get user request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
	console.log("msg:" + JSON.stringify(msg));
	coll_users.findOne({email: msg.email}, function(err, user){
		if (user) {
			// This way subsequent requests will know the user is logged in.
//			req.session.username = user.username;
//			console.log(req.session.username +" is the session");
			res.code = "200";
			res.user = user;
			console.log("user" + JSON.stringify(user));
			console.log("result" + JSON.stringify(res));
			callback(null, res);
		} else {
			console.log("returned false");
			res.code = "400";
			res.user = "unsuccessful";
			console.log(res);
			callback(null, res);
		}
	});
	
	});
}
exports.handle_request_get_user = handle_request_get_user;

function handle_request_get_hash(msg,callback)
{
var res = {};
	
	console.log("In get hash");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
	console.log("msg:" + JSON.stringify(msg));
	coll_users.findOne({email: msg.email},function(err, user){
		if (user) {	
			res.code = "200";
			res.user = user;
			console.log("user" + JSON.stringify(user));
			console.log("result" + JSON.stringify(res));
			callback(null, res);
		} else {
			console.log("returned false");
			res.code = "400";
			res.user = "unsuccessful";
			console.log(res);
			callback(null, res);
		}
	});
	
	});
}
exports.handle_request_get_hash = handle_request_get_hash;