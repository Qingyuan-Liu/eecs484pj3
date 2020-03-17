// query2 : unwind friends and create a collection called 'flat_users' 
// where each document has the following schema:
/*
{
  user_id:xxx
  friends:xxx
}
*/

function unwind_friends(dbname){
    db = db.getSiblingDB(dbname);
    var user_list=[];
    db.users.find({},{user_id:1,friends:1,_id:0}).forEach(
	function(myDoc){
		user_list.push(myDoc)
	}
)
	db.getCollection('flat_users').insertMany(user_list);
	db.flat_users.aggregate([
		{$unwind : "$friends"}
	])





    
    // returns nothing. It creates a collection instead as specified above.
}
