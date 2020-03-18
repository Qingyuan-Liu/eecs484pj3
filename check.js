db.users.find({hometown.city:'Bucklebury'}).forEach(function(myDoc){print("user_id:"+myDoc.user_id);});


db.users.find().forEach(
count=0
function(myDoc,city){
if(myDoc.hometown.city=='Breredon'){
count=count+1
print(myDoc.user_id);
}
}
);

db.users.find({},{user_id:1,friends:1,_id:0});



db.users.aggregate([
{$unwind : "$friends"}
])

db.users.find().forEach(
	function(myDoc){
		print(myDoc.user_id+" "+myDoc.friends)
	}
)


db.users.find().forEach(
	function(myDoc1){
	var user_list=[]
	var city=myDoc1.current.city
	db.users.find().forEach(
	function(myDoc,city){
		if(myDoc.current.city==city){
			user_list.push(myDoc.user_id)
		}
	}
	)
	}
	print(user_list)
	)


	db.users.find().forEach(
	function(myDoc,city){
		if(myDoc.current.city=='Bucklebury'){
			print(myDoc.user_id)
		}
	}
	)


	var city=[]
	db.users.find().forEach(
		function(myDoc){
				if (!city.includes(myDoc.current.city)){
					city.push(myDoc.current.city)
				}
			}
	)
	print(city)
	for(var i=0;i<city.length;i++){ 
		var user_list=[]
		db.users.find().forEach(
		function(myDoc){
			
			if(myDoc.current.city==city[i]){
				user_list.push(myDoc.user_id)
		  }
		}
	)
		print(city[i]+" "+user_list)
		db.cities.insert({
			"_id":city[i],
			"users":user_list
		})
	}

db.flat_users_parent.aggregate( [
                      { $unwind : "$friends" },
                      { $out : "flat_abc" }
                  ] )


db.users.find({},{user_id:1,friends:1,_id:0}).forEach(
	function(myDoc){
		db.users.aggregate( [
                      { $unwind : "$friends" },
                      { $addFields: { userId : "$_id" }},
                      { $project: { user_id : 1 , friends : 1, _id:0 }},
                      { $out : "flat_users" },
                  ] )
	}
)
	db.flat_users.insert(
		db.flat_users_parent.aggregate([
		{$unwind : "$friends"}
	])
		)

#找出所有的user
var user_list=[]
db.users.find().forEach(
function(myDoc){
	user_list.push(myDoc.user_id)
})
db.users.find().forEach(
	function(myDoc){
		var user_flist=[]
		user_flist.push(myDoc.friends)
		for(var i=0;i<user_list.length;i++){
			var friend_flist=[]
			db.users.find({user_id:user_list[i]},{friends:1,_id:0}).forEach(
					function(myDoc1){
						friend_flist.push(myDoc1.friends)
					}
				)
				if(friend_flist.includes(myDoc.user_id)){
					user_flist.push(myDoc1.user_id)
					print("yes")
			}
		}
		print(myDoc.user_id+" "+user_flist)
	}
)





db.users.find({user_id:581},{friends:1,_id:0})
db.users.find().forEach(
	function(myDoc){
		var user_flist=[]
		user_flist.push(myDoc.friends)
		print(user_flist)
	})

db.users.find().forEach(
	function(myDoc){
		print(myDoc.friends)
	})

	var friend_flist=[]
	db.users.find({user_id:63},{friends:1,_id:0}).forEach(
					function(myDoc1){
						friend_flist.push(myDoc1.friends)
						print(myDoc1.friends)
					}
				)
	print(friend_flist)
	if(friend_flist.includes(784)){
					print("yes")

print("user_id: "+myDoc.user_id+" friends: "+myDoc.friends)


#找出所有的user
var user_list=[]
db.users.find().forEach(
function(myDoc){
	user_list.push(myDoc.user_id)
})

var user_list=[]


db.users.find().forEach(
	function(myDoc){
		var user_friend=myDoc.friends	
		db.flat_users.find().forEach(
		function(myDoc1){
			if(myDoc.user_id==myDoc1.friends){
					user_friend.push(myDoc1.user_id)
			}
		}
		)
	}
)

var pairs=[]
db.users.find({gender:"female"}).forEach(
		function(myDoc){
			db.users.find({gender:"male","hometown.city":myDoc.hometown.city,'YOB':{$lt:myDoc.YOB+3,$gt:myDoc.YOB-3}}).forEach(
					function(myDoc1){
						if(myDoc.user_id<myDoc1.user_id){
							if(db.flat_users.find({"user_id":myDoc.user_id,"friends":myDoc1.user_id}).count()==0){
								pairs.push([myDoc.user_id,myDoc1.user_id])
								print("user_id: "+myDoc.user_id+" friends: "+myDoc1.user_id)
							}
						}else if(myDoc.user_id>myDoc1.user_id){
							if(db.flat_users.find({"user_id":myDoc1.user_id,"friends":myDoc.user_id}).count()==0){
								pairs.push([myDoc1.user_id,myDoc.user_id])
								print("user_id: "+myDoc1.user_id+" friends: "+myDoc.user_id)
							}
						}
					}
				)
		}
	)
print(pairs.length)





db.users.find({gender: "male"}).forEach(function(u1) {
		db.users.find({"gender": "female", "hometown.city": u1.hometown.city, "YOB": {$gt: u1.YOB - year_diff, $lt: u1.YOB + year_diff}}).forEach(function(u2) {
			if (!db.flat_users.find({"user_id": Math.min(u1.user_id, u2.user_id), "friends": Math.max(u1.user_id, u2.user_id)}).hasNext()) ret.push([u1.user_id, u2.user_id]);
		});
	});


if (db.flat_users.find({"user_id": 1, "friends": 798})) print("yes")

db.flat_users.find({"user_id": 1, "friends": 798}).count()


db.users.find({gender:"female"}).forEach(
		function(myDoc){
			db.users.find({gender:"male","hometown.city":myDoc.hometown.city,'YOB':{$lt:myDoc.YOB+5,$gt:myDoc.YOB-5}}).forEach(
					function(myDoc1){
						print("female: "+myDoc.user_id+" male: "+myDoc1.user_id)
						if(myDoc.user_id<myDoc1.user_id){
							if(db.flat_users.find("user_id":myDoc.user_id,"friends":myDoc1.user_id).count()==0){
								pairs.push([myDoc.user_id,myDoc1.user_id])
								print("yes")
							}
						}else if(myDoc.user_id>myDoc1.user_id){
							if(db.flat_users.find("user_id":myDoc1.user_id,"friends":myDoc.user_id).count()==0){
								pairs.push([myDoc1.user_id,myDoc.user_id])
								print("no")
							}
						}
					}
				)
		}
		)

if(db.flat_users.find({"user_id":582,"friends":598}).count()==0){
								pairs.push([myDoc.user_id,myDoc1.user_id])
								print("yes")
							}







