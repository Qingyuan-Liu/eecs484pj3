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
		db.users.aggregate( [
                      { $unwind : "$friends" },
                      { $addFields: { userId : "$_id" }},
                      { $project: { user_id : 1 , friends : 1, _id:0 }},
                      { $out : "flat_users" },
                  ] )
	}

    
    // returns nothing. It creates a collection instead as specified above.

