async function getPosts(PostBody){
    console.log(`adding PostBody to api: ${JSON.stringify(PostBody)}`);
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:8080/api/posts`,
          {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(PostBody)
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


function getPostsHelper(){
    /**
     * This function acts as an intermediary between 
     *      the html PostBody input and the addUser function.
     *      It takes the input and combines it into a 
     *      single object that can be passed to the addUser function.
     */

    // Selecting the input elements and their values from html page
    var postBody = document.getElementById("post_body").value;


    // combine inputs into single object
    const PostBody = {
        post_body: postBody, 

    };

    // test print to console
    console.log("Should show all posts -->", post_body);

    // pass input object into addUser
    getPosts(post_body)

}
