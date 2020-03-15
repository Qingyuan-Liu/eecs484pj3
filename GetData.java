import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;



//json.simple 1.1
// import org.json.simple.JSONObject;
// import org.json.simple.JSONArray;

// Alternate implementation of JSON modules.
import org.json.JSONObject;
import org.json.JSONArray;

public class GetData{
	
    static String prefix = "project2.";
	
    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;
	
    // You must refer to the following variables for the corresponding 
    // tables in your database

    String cityTableName = null;
    String userTableName = null;
    String friendsTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;
    String programTableName = null;
    String educationTableName = null;
    String eventTableName = null;
    String participantTableName = null;
    String albumTableName = null;
    String photoTableName = null;
    String coverPhotoTableName = null;
    String tagTableName = null;

    // This is the data structure to store all users' information
    // DO NOT change the name
    JSONArray users_info = new JSONArray();		// declare a new JSONArray

	
    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
	super();
	String dataType = u;
	oracleConnection = c;
	// You will use the following tables in your Java code
	cityTableName = prefix+dataType+"_CITIES";
	userTableName = prefix+dataType+"_USERS";
	friendsTableName = prefix+dataType+"_FRIENDS";
	currentCityTableName = prefix+dataType+"_USER_CURRENT_CITIES";
	hometownCityTableName = prefix+dataType+"_USER_HOMETOWN_CITIES";
	programTableName = prefix+dataType+"_PROGRAMS";
	educationTableName = prefix+dataType+"_EDUCATION";
	eventTableName = prefix+dataType+"_USER_EVENTS";
	albumTableName = prefix+dataType+"_ALBUMS";
	photoTableName = prefix+dataType+"_PHOTOS";
	tagTableName = prefix+dataType+"_TAGS";
    }
	
	
	
	
    //implement this function

    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException{ 
    	Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
    	JSONArray users_info = new JSONArray();
		
	// Your implementation goes here....		
    	ResultSet rst=stmt.executeQuery("SELECT USER_ID, FIRST_NAME, LAST_NAME, GENDER, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH "+
"FROM "+ userTableName);

while(rst.next()){
	JSONObject INNER_USER=new JSONObject();
	int uid=rst.getInt(1);
	INNER_USER.put("user_id",rst.getInt(1));
	INNER_USER.put("first_name",rst.getString(2));
	INNER_USER.put("last_name",rst.getString(3));
	INNER_USER.put("gender",rst.getString(4));
	INNER_USER.put("YOB",rst.getString(5));
	INNER_USER.put("MOB",rst.getString(6));
	INNER_USER.put("DOB",rst.getString(7));
	
	Statement stmt2 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst2= stmt2.executeQuery("SELECT C.CITY_ID, C.STATE_NAME, C.COUNTRY_NAME "+
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

	Statement stmt3 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst3= stmt3.executeQuery("SELECT C.CITY_ID, C.STATE_NAME, C.COUNTRY_NAME "+
		"FROM "+cityTableName+ " C, "+hometownCityTableName+" UH, "+ userTableName+" U "+
		"WHERE UH.USER_ID=U.USER_ID AND UH.HOMETOWN_CITY_ID=C.CITY_ID AND U.USER_ID="+uid);
	while(rst3.next()){
		JSONObject hometown=new JSONObject();
		hometown.put("city",rst3.getString(1));
		hometown.put("state",rst3.getString(2));
		hometown.put("country",rst3.getString(3));
		INNER_USER.put("hometown",hometown);
	}
	rst3.close();
    stmt3.close();

	Statement stmt4 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet rst4= stmt4.executeQuery("SELECT F.USER2_ID "+" FROM "+userTableName+ " U,"+friendsTableName+" F "+
									"WHERE U.USER_ID=F.USER1_ID AND U.USER_ID="+uid);
	JSONArray friend=new JSONArray();
	while(rst4.next()){
		friend.put(rst4.getString(1));
	}
	INNER_USER.put("friends",friend);
	rst4.close();
    stmt4.close();
    users_info.put(INNER_USER);
}
	rst.close();
    stmt.close();
		
		return users_info;
    }

    // This outputs to a file "output.json"
    public void writeJSON(JSONArray users_info) {
	// DO NOT MODIFY this function
	try {
	    FileWriter file = new FileWriter(System.getProperty("user.dir")+"/output.json");
	    file.write(users_info.toString());
	    file.flush();
	    file.close();

	} catch (IOException e) {
	    e.printStackTrace();
	}
		
    }
}
