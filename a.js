db.friends.find({user1_id:585).forEach(
        function(myDoc1){
          if(oldest[myDoc1.user1_id]===undefined || age[oldest[myDoc1.user1_id]]>age[myDoc1.user2_id] || (age[oldest[myDoc1.user1_id]]==age[myDoc1.user2_id] && oldest[myDoc1.user1_id] > myDoc1.user2_id)){
            oldest[myDoc1.user1_id] = myDoc1.user2_id
            print("user1_id: "+myDoc1.user1_id+" user2_id: "+myDoc1.user2_id)
          }
        }  
    )