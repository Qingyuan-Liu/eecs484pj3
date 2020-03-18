// query 8: Find the city average friend count per user using MapReduce
// Using the same terminology in query6, we are asking you to write the mapper,
// reducer and finalizer to find the average friend count for each city.


var city_average_friendcount_mapper = function() {
  // implement the Map function of average friend count
  emit(this.hometown.city, {user_count: 1, friend_count: this.friends.length});
};

var city_average_friendcount_reducer = function(key, values) {
  // implement the reduce function of average friend count
  var result={user_count:0,friend_count:0}
  for(var i=0;i<values.length;i++){
  	result.user_count=result.user_count+values[i].user_count
  	result.friend_count=result.friend_count+values[i].friend_count
  }
  return result
};

var city_average_friendcount_finalizer = function(key, reduceVal) {
  // We've implemented a simple forwarding finalize function. This implementation 
  // is naive: it just forwards the reduceVal to the output collection.
  // Feel free to change it if needed.
  var average=1.0 * reduceVal.friend_count/ reduceVal.user_count
  return average
}
