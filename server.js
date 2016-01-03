//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var facebook = require('./services/facebook');
var home = require('./services/home');
var group = require('./services/group');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on facebook_queue");

	cnn.queue('facebook_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.id === 1)
				{
		facebook.handle_request_signup(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
			if(message.id === 2)
			{
			facebook.handle_request_login(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			if(message.id === 3)
			{
			home.handle_request_display_home(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			
			if(message.id === 4)
			{
			home.handle_request_display_groups(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			if(message.id === 5)
			{
			group.handle_request_create_group(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			if(message.id === 6)
			{
				group.handle_request_delete_group(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			
			if(message.id === 7)
			{
				home.handle_request_add_post(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			
			if(message.id === 8)
			{
				group.handle_request_groups_joined(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
				if(message.id === 9)
				{
					group.handle_request_groups_created(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 10)
				{
					group.handle_request_get_members(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 11)
				{
					group.handle_request_add_members(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 12)
				{
					home.handle_request_get_requests(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 13)
				{
					home.handle_request_accept_requests(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 14)
				{
					home.handle_request_load_profile(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 15)
				{
					group.handle_request_delete_member(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 16)
				{
					home.handle_request_get_status(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 17)
				{
					home.handle_request_change_status(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 18)
				{
					facebook.handle_request_get_user(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
			
				if(message.id === 19)
				{
					home.handle_request_add_mobno(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 20)
				{
					home.handle_request_add_work(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 21)
				{
					home.handle_request_add_interests(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				if(message.id === 22)
				{
					home.handle_request_add_lifeevents(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
				if(message.id === 25)
				{
					facebook.handle_request_get_hash(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				
				}
				
		});
	});
	
});