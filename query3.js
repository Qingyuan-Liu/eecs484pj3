//query3
//create a collection "cities" to store every user that lives in every city
//Each document(city) has following schema:
/*
{
  _id: city
  users:[userids]
}
*/

function cities_table(dbname) {
    db = db.getSiblingDB(dbname);
    // TODO: implemente cities collection here
    var city=[]
	db.users.find().forEach(
		function(myDoc){
				if (!city.includes(myDoc.current.city)){
					city.push(myDoc.current.city)
				}
			}
	)
	for(var i=0;i<city.length;i++){ 
		var user_list=[]
		db.users.find().forEach(
		function(myDoc){			
			if(myDoc.current.city==city[i]){
				user_list.push(myDoc.user_id)
		  }
		}
	)
		db.cities.insert({
			"_id":city[i],
			"users":user_list
		})
	}

    // Returns nothing. Instead, it creates a collection inside the datbase.

}
