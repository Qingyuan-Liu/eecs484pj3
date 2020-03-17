// query1 : find users whose hometown citys the specified city. 

function find_user(city, dbname){
    db = db.getSiblingDB(dbname);
	var results = [];
	
    db.users.find().forEach(
	function(myDoc,city){
	if(myDoc.hometown.city==city){
	results.push(myDoc.user_id);
	}
	}
	);
    // TODO: return a Javascript array of user_ids. 
    // db.users.find(...);

    // See test.js for a partial correctness check.  
    // The result will be an array of integers. The order does not matter.                                                               
    return results;
}
