// find the oldest friend for each user who has a friend. 
// For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
// return a javascript object : key is the user_id and the value is the oldest_friend id
// You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

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
          }
        }  
    )
  }
)
  return oldest
}
