async function addUser(user){
    console.log(`adding user to api: ${JSON.stringify(user)}`);
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:8080/api/user`,
          {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(user)
          }
        ); //returns a Promise
    
        //check for a successful response
        if (!raw_response.ok) {
          throw new Error(raw_response.status);
        }
    
        const json_data = await raw_response.json();
    
        console.log(json_data);

        return json_data;
      } catch (error) {
        //this catch block is for network errors
        console.log(error);
        return null;
      }
}


function addUserHelper(){
    /**
     * This function acts as an intermediary between 
     *      the html user input and the addUser function.
     *      It takes the input and combines it into a 
     *      single object that can be passed to the addUser function.
     */

    // Selecting the input elements and their values from html page
    var Firstname = document.getElementById("f_name").value;
    var Lastname = document.getElementById("l_name").value;
    var Username = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    var FavoriteArtist = document.getElementById("favorite_artist").value;

    // combine inputs into single object
    const user = {
        f_name: Firstname, 
        l_name: Lastname,
        username: Username, 
        password: Password,
        favorite_artist: FavoriteArtist
    };

    // test print to console
    console.log("Should show all user inputs -->", user);

    // pass input object into addUser
    addUser(user)

}


//get all users
async function getPosts(){
  try{
    const raw_response = await fetch(
      `http://localhost:8080/api/posts`
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();
    console.log(json_data[0].user_id);
    console.log(json_data);


  }catch(error){
    console.log(error);
    return null;
  }



}

getPosts()

