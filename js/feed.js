//get all posts
async function getPosts(){
  try{
    const raw_response = await fetch(
      `http://localhost:8080/api/posts`,
      {
      method:"GET",
      headers:{
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              }
      }
    );


    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();


    console.log(json_data);


    post_id = json_data[0].post_id;
    post_body = json_data[0].post_body;
    post_likes = json_data[0].post_likes; 
    user = json_data[0].user;
    song = json_data[0].song;


    console.log("post_id: ", post_id);
    console.log("post_body: ", post_body);
    console.log("post_likes: ", post_likes);
    console.log("user: ", user);
    console.log("song: ", song);


    newF(json_data);


  }catch(error){
    console.log(error);
    return null;
  }
}



function newF(json_data){

  // console.log(json_data);

}


getPosts()


