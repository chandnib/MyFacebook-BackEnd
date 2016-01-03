
var mongo = require("../mongo/mongo");
var mongoURL = "mongodb://localhost:27017/facebook";

function handle_request_display_home(msg,callback)
{
	var res = {};
	
	console.log("In handlehome request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_feeds = mongo.collection('newsfeeds');
    var coll_friends = mongo.collection('friends');
    //var coll_groups = mongo.collection('groups');
    var coll_friend_req = mongo.collection('friend_requests');
	
	coll_feeds.find({userid: msg.email}).toArray(function(err, user_feeds){
		console.log("feeds successful : " + user_feeds);
								res.code = "200";
								res.feeds = user_feeds;
								console.log(res);
								callback(null, res);
							
						});
		});

}
	
	
exports.handle_request_display_home = handle_request_display_home;


function handle_request_display_groups(msg,callback)
{
	var res = {};
	
	console.log("In handlegroups request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_groups = mongo.collection('groups');
    console.log(msg);
    coll_groups.find({groupmmber: msg.email}, function(err, user_groups){
		console.log("groups successful :" + (user_groups));
	coll_groups.find({admin: msg.email}, function(err, user_groups_c){
			console.log("groups c successful");
								res.code = "200";
								res.groups = user_groups;
								res.groups_c = user_groups_c;
								console.log(res);
								callback(null, res);
							
						});
		});
						
	});
	
}
	
	
exports.handle_request_display_groups = handle_request_display_groups;

function handle_request_add_post(msg,callback)
{
var res = {};
	
	console.log("In add post request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_feeds = mongo.collection('newsfeeds');
    console.log(msg);
    
    
    coll_feeds.insert({"userid": msg.email, "feed":msg.feed, "timestamp":Date()},
        function(err, user_feeds){
									res.code = "200";
									res.feeds = user_feeds;
									console.log(res);
									callback(null, res);
    });	
	});
}
exports.handle_request_add_post = handle_request_add_post;

function handle_request_get_requests(msg,callback)
{
var res = {};
	
	console.log("In getrequests request");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_friends = mongo.collection('friends');
    console.log(msg);
    coll_friends.find({$or:[{userid: msg.email,status:"Friend Request Sent"},{friendid: msg.email,status:"Friend Request Sent"}]}).toArray(function(err, user_friends){
    	if(err)
    		{
    		console.log("err: "+err);
    		}
    	else
    		{
		console.log("requests successful :" + (user_friends));
								res.code = "200";
								res.requests = user_friends;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});
					

}
exports.handle_request_get_requests = handle_request_get_requests;

function handle_request_accept_requests(msg,callback)
{
	var res = {};
	console.log("In acceptrequests ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_friends = mongo.collection('friends');
    console.log(msg);
    coll_friends.update({$or:[{userid:msg.email,friendid:msg.friendid},{userid:msg.friendid, friendid:msg.email}]},{$set:{status:"Friend"}},{multi: true},function(err, user_friends){
    	if(err)
    		{
    		  console.log("update error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user_friends));
								res.code = "200";
								res.requests = user_friends;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});
	
	
}
exports.handle_request_accept_requests = handle_request_accept_requests;

function handle_request_load_profile(msg, callback)
{
	var res = {};
	console.log("In loadProfile ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
    console.log(msg);
    coll_users.find({fname:msg.user}).toArray(function(err, user_profile){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user_profile));
								res.code = "200";
								res.profile = user_profile;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});
}
exports.handle_request_load_profile = handle_request_load_profile;

function handle_request_get_status(msg,callback)
{
	var res = {};
	console.log("In get req ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('friends');
    console.log(msg);
    coll_users.find({userid:msg.email,friendid:msg.friendid}).toArray(function(err, user_status){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user_status));
								res.code = "200";
								res.status = user_status;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});

}
exports.handle_request_get_status = handle_request_get_status;

function handle_request_change_status(msg,callback)
{
	var res = {};
	console.log("In change status");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('friends');
    console.log(msg);
    if(msg.status === "Friend Request Sent")
    	{ 
    	console.log("insert");
    	coll_users.insert({userid:msg.email, friendid : msg.friendid, status:msg.status},function(err, user_add_friend){
        	if(err)
        		{
        		  console.log("fetch error : " + err);
        		}
        	else
        		{
    		console.log("change status successful :" + (user_add_friend));
    								res.code = "200";
    								res.status = user_add_friend;
    								console.log(res);
    								callback(null, res);
        		}
    							
    						});
    	}
    else
    {
    	console.log("update");
    coll_users.update({userid:msg.email, friendid : msg.friendid},{$set:{status:msg.status}},{multi: true},function(err, user_change_status){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("change status successful :" + (user_change_status));
								res.code = "200";
								res.status = user_change_status;
								console.log(res);
								callback(null, res);
    		}
							
						});
    }
	});
		


}
exports.handle_request_change_status = handle_request_change_status;


function handle_request_add_mobno(msg, callback)
{
	var res = {};
	console.log("In add mobno ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
    console.log(msg);
    coll_users.update({fname:msg.fname},{$push:{mobno:msg.mobno}},{multi: true},function(err, user_status){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user_status));
								res.code = "200";
								res.status = user_status;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});


}
exports.handle_request_add_mobno = handle_request_add_mobno;

function handle_request_add_work(msg, callback)
{
	var res = {};
	console.log("In add work ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
    console.log(msg);
    coll_users.update({fname:msg.fname},{$push:{work_edu:{title:msg.job, where:msg.location, from:msg.from, to:msg.to}}},function(err, user){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user));
								res.code = "200";
								res.status = user;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});


}
exports.handle_request_add_work = handle_request_add_work;


function handle_request_add_interests(msg, callback)
{
	var res = {};
	console.log("In add interests ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
    console.log(msg);
    coll_users.update({fname:msg.fname},{$push:{interests:{books:msg.interest}}},function(err, user){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user));
								res.code = "200";
								res.status = user;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});


}
exports.handle_request_add_interests = handle_request_add_interests;

function handle_request_add_interests(msg, callback)
{
	var res = {};
	console.log("In add interests ");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	var coll_users = mongo.collection('users');
    console.log(msg);
    coll_users.update({fname:msg.fname},{$push:{interests:{books:msg.interest}}},function(err, user){
    	if(err)
    		{
    		  console.log("fetch error : " + err);
    		}
    	else
    		{
		console.log("requests successful :" + (user));
								res.code = "200";
								res.status = user;
								console.log(res);
								callback(null, res);
    		}
							
						});
		});
}
exports.handle_request_add_interests = handle_request_add_interests;

function handle_request_add_lifeevents(msg,callback)
{
	var res={};
var coll_users = mongo.collection('users');
console.log(msg);
coll_users.update({fname:msg.fname},{$push:{life_events:{title:msg.title, when:msg.when}}},function(err, user){
	if(err)
		{
		  console.log("fetch error : " + err);
		}
	else
		{
	console.log("requests successful :" + (user));
							res.code = "200";
							res.status = user;
							console.log(res);
							callback(null, res);
		}
						
					});
	
}
exports.handle_request_add_lifeevents = handle_request_add_lifeevents;