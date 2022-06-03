
  async function login(username, password) {
    console.log(`loggin in user to api: ${JSON.stringify(username)}`);
    //do fetch request here
    try {
        const raw_response = await fetch(
            `http://localhost:8080/api/login?user_username=${username}&user_password=${password}`,
            {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              }
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
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
async function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const user = await login(username, password);
    sessionStorage.setItem('currentUser',  JSON.stringify(user));
    console.log(user);
    if (user != null ) {

        alert("Login successfully");

        window.location = "feed.html"; // Redirecting to other page.
        return false;
    }
    else {
        attempt--;// Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
    

}