var mongo = require("../mongo/mongo");
var mongoURL = "mongodb://localhost:27017/facebook";

function handle_request_create_group(msg,callback)
{
	var res = {};
	
	console.log("In creategroup request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_groups = mongo.collection('groups');
  
	coll_groups.insert({ "group_name" : msg.name,
						"group_desc" : msg.description,
						"admin" : msg.admin
							}, function(err, user_groups){
		console.log("group inserted successful");
								res.code = "200";
								res.groups = user_groups;
								console.log(res);
								callback(null, res);
							
						});
		});
							
}
exports.handle_request_create_group = handle_request_create_group;

function handle_request_delete_group(msg,callback)
{
	var res = {};
	
	console.log("In delete group request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_groups = mongo.collection('groups');
  
	coll_groups.remove({ "group_name" : msg.name,
							}, function(err, user_groups_c){
		console.log("group deletion successful");
								res.code = "200";
								res.groups_c = user_groups_c;
								console.log(res);
								callback(null, res);
							
						});
		});
						
	
}
exports.handle_request_delete_group = handle_request_delete_group;


function handle_request_groups_joined(msg,callback)
{
	
		var res = {};
		
		console.log("In groups joined request");
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		
		var coll_groups = mongo.collection('groups');
	  
		coll_groups.find({member: msg.email}).toArray(function(err, user_groups){
			console.log("groups successful : " + user_groups);
			res.code = "200";
			res.groups = user_groups;
			console.log(res);
									
									callback(null, res);
								
							});
			});
							
		
	

}
exports.handle_request_groups_joined =handle_request_groups_joined;

function handle_request_groups_created(msg,callback)
{
		var res = {};
		
		console.log("In groups created request");
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		
		var coll_groups = mongo.collection('groups');
	  
		coll_groups.find({admin: msg.email}).toArray(function(err, user_groups_c){
			console.log("groups c successful : " + user_groups_c);
			res.code = "200";
			res.groups_c = user_groups_c;
			console.log(res);
									
									callback(null, res);
			});
		});

}
exports.handle_request_groups_created = handle_request_groups_created;

function handle_request_get_members(msg, callback)
{
	var res = {};
	
	console.log("In get members request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_groups = mongo.collection('groups');
  
	coll_groups.find({group_name: msg.group_name}).toArray(function(err, user_members){
		console.log("members successful : " + user_members);
		res.code = "200";
		res.members = user_members;
		console.log(res);
								
		callback(null, res);
		});
	});
}
exports.handle_request_get_members = handle_request_get_members;

function handle_request_add_members(msg,callback)
{
	var res = {};
	console.log("In add member request" + msg.group_name + msg.member_name );
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll_groups = mongo.collection('groups');
	coll_groups.update({group_name:msg.group_name},{$push:{member:msg.member_name}},{multi: true},function(err, user_add){
		console.log("groups c successful : " + user_add);
		res.code = "200";
		res.members = user_add;
		console.log(res);
								
								callback(null, res);
	});
		

	
	});



}
exports.handle_request_add_members = handle_request_add_members;

function handle_request_delete_member(msg,callback)
{
	var res = {};
	console.log("In delete member request" + msg.group_name + msg.member_name );
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll_groups = mongo.collection('groups');
	coll_groups.update({group_name:msg.group_name},{$pull:{member:msg.member_name}},{multi: true},function(err, user_del){
		console.log("groups c successful : " + user_del);
		res.code = "200";
		res.members = user_del;
		console.log(res);
								
								callback(null, res);
	});
		

	
	});
}
exports.handle_request_delete_member = handle_request_delete_member;