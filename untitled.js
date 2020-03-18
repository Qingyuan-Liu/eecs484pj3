function oldest_friend(dbname){
  db = db.getSiblingDB(dbname);
  var results = {};
  // TODO: implement oldest friends
  // return an javascript object described above
  var friend_list={};
   db.users.find().forEach(
    function (myDoc) {
      var user_friend = myDoc.friends
      db.flat_users.find({ friends: myDoc.user_id }).forEach(
        function (myDoc1) {
          user_friend.push(myDoc1.user_id)
        }
      )
      friend_list[myDoc.user_id]=user_friend
    }
  )
   print(friend_list.friends)


  var age={}
  db.users.find().forEach(
    function(myDoc){
      age[myDoc.user_id]=myDoc.YOB
    }
    )




  db.age.insert({"_id":myDoc.user_id,"age":myDoc.age})

   db.friends.find().forEach(
    function(myDoc){

    }
    )
  return results
}



function oldest_friend(dbname){
  db = db.getSiblingDB(dbname);
  db.flat_users.find().forEach(function(myDoc) {
    db.friends.insert([{"user1_id":myDoc.user_id, "user2_id":myDoc.friends}, {"user1_id":myDoc.friends, "user2_id":myDoc.user_id}]);
  });

  var age={}
  db.users.find().forEach(
    function(myDoc){
      age[myDoc.user_id]=myDoc.YOB
    }
    )

  var oldest={}
  db.users.find().forEach(
    function(myDoc){
      db.friends.find({user1_id:myDoc.user_id}).forEach(
        function(myDoc1){
          if(oldest[myDoc1.user1_id]===undefined || age[oldest[myDoc1.user1_id]]>age[myDoc1.user2_id] || (age[oldest[myDoc1.user1_id]]==age[myDoc1.user2_id] && oldest[myDoc1.user1_id] > myDoc1.user2_id)){
            oldest[myDoc1.user1_id] = myDoc1.user2_id
            print("user1_id: "+myDoc1.user1_id+" user2_id: "+myDoc1.user2_id)
          }
        }  
    )
  }
)
  return oldest
}





var age={}
  db.users.find().forEach(
    function(myDoc){
      age[myDoc.user_id]=myDoc.YOB
    }
    )
      var oldest={}
      db.friends.find({user1_id:799}).forEach(
        function(myDoc1){
          if(oldest[myDoc1.user1_id]===undefined || age[oldest[myDoc1.user1_id]]>age[myDoc1.user2_id] || (age[oldest[myDoc1.user1_id]]==age[myDoc1.user2_id] && oldest[myDoc1.user1_id] > myDoc1.user2_id)){
            oldest[myDoc1.user1_id] = myDoc1.user2_id
            print("user1_id: "+myDoc1.user1_id+" user2_id: "+myDoc1.user2_id)
            print(myDoc1.user1_id +" "+ oldest[myDoc1.user1_id])
          }
        }  
    )




















