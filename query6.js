// query6 : Find the Average friend count per user for users
//
// Return a decimal variable as the average user friend count of all users
// in the users document.

function find_average_friendcount(dbname){
  db = db.getSiblingDB(dbname)
  // TODO: return a decimal number of average friend count
  		db.users.aggregate( [
                      { $unwind : "$friends" },
                      { $addFields: { userId : "$_id" }},
                      { $project: { user_id : 1 , friends : 1, _id:0 }},
                      { $out : "flat_users" },
                  ] )
  return 1.0 * db.flat_users.find().count() / db.users.find().count();
}
