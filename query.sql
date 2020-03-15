SELECT USER_ID, FIRST_NAME, LAST_NAME, GENDER, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH
FROM USERS

#拿到userid之后用userid找这个人的city的信息
SELECT C.CITY_ID, C.STATE_NAME, C.COUNTYR_NAME
FROM CITIES C, USER_CURRENT_CITIES UC, USERS U
WHERE UC.USER_ID=U.USER_ID AND UC.CURRENT_CITY_ID=C.CITY_ID and u.user_id=

SELECT C.CITY_ID, C.STATE_NAME, C.COUNTYR_NAME
FROM CITIES C, USER_HOMETOWN_CITIES UH, USERS U
WHERE UH.USER_ID=U.USER_ID AND UH.HOMETOWN_CITY_ID=C.CITY_ID 

SELECT F.USER2_ID
FROM USERS U, FRINEDS F
WHERE U.USER_ID=F.USER1_ID

ResultSet rst=stmt.excuteQuery("SELECT USER_ID, FIRST_NAME, LAST_NAME, GENDER, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH "+
"FROM "+ userTableName);

while(rst.next()){
	JSONObject INNER_USER=new JSONObject();
	int uid=getInt(1);
	INNER_USER.put("user_id",rst.getInt(1));
	INNER_USER.put("first_name",rst.getString(2));
	INNER_USER.put("last_name",rst.getString(3));
	INNER_USER.put("gender",rst.getString(4));
	INNER_USER.put("YOB",rst.getInt(5));
	INNER_USER.put("MOB",rst.getInt(6));
	INNER_USER.put("DOB",rst.getInt(7));
	
	Statement stmt2 = oracle.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst2= stmt.excuteQuery("SELECT C.CITY_ID, C.STATE_NAME, C.COUNTYR_NAME "+
		"FROM "+cityTableName+ " C, "+currentCityTableName+" UC, "+userTableName+" U "+
		"WHERE UC.USER_ID=U.USER_ID AND UC.CURRENT_CITY_ID=C.CITY_ID AND U.USER_ID="+uid);
	while(rst2.next()){
		JSONObject current=new JSONObject();
		current.put("city",rst2.getString(1));
		current.put("state",rst2.getString(2));
		current.put("country",rst2.getString(3));
		INNER_USER.put("current",current);
	}
	rst2.close();
    stmt2.close();

	Statement stmt3 = oracle.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst3= stmt.excuteQuery("SELECT C.CITY_ID, C.STATE_NAME, C.COUNTYR_NAME "+
		"FROM "+cityTableName+ " C, "+hometownCityTableName+" UH, "+ userTableName+" U "+
		"WHERE UH.USER_ID=U.USER_ID AND UH.CURRENT_CITY_ID=C.CITY_ID AND U.USER_ID="+uid);
	while(rst3.next()){
		JSONObject hometown=new JSONObject();
		hometown.put("city",rst3.getString(1));
		hometown.put("state",rst3.getString(2));
		hometown.put("country",rst3.getString(3));
		INNER_USER.put("hometown",hometown);
	}
	rst3.close();
    stmt3.close();

	Statement stmt4 = oracle.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst4= stmt.excuteQuery("SELECT F.USER2_ID "+" FROM "+userTableName+ " U,"+friendsTableName+" F "+
									"WHERE U.USER_ID=F.USER1_ID AND U.USER_ID="+uid);
	JSONArray friend=new JSONArray();
	while(rst4.next()){
		friend.put(rst4.getInt(1));
	}

	rst4.close();
    stmt4.close();
}
