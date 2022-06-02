

async function makePost(post){
    console.log(`adding post to api: ${JSON.stringify(post)}`);
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:8080/api/post`,
          {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(post)
          }
        ); //returns a Promise
    
        //check for a successful response
        if (!raw_response.ok) {
          throw new Error(raw_response.status);
        }
    
        const json_data = await raw_response.json();
    
        console.log(json_data);

        // getPosts()

        return json_data;

      } catch (error) {
        //this catch block is for network errors
        console.log(error);
        return null;
      }


      
}


function makePostHelper(){
    /**
     * This function acts as an intermediary between 
     *      the html post input and the makePost function.
     *      It takes the input and combines it into a 
     *      single object that can be passed to the makePost function.
     */

    // Selecting the input elements and their values from html page
    var PostBody = document.getElementById("postBox").value;

    // combine inputs into single object
    const post = {
        post_body: PostBody, 
    };

    // test print to console
    console.log("Should show post body input -->", post);

    // pass input object into makePost
    makePost(post)

}
