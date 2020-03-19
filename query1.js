// query1 : find users whose hometown citys the specified city. 

function find_user(city, dbname){
    db = db.getSiblingDB(dbname);
	var results = [];
	
    db.users.find().forEach(
	function(myDoc){
	if(myDoc.hometown.city==city){
	results.push(myDoc.user_id);
	}
	}
	);                                                     
    return results;
}
