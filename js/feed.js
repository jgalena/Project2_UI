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

    // post_id = json_data[0].post_id;
    // post_body = json_data[0].post_body;
    // post_likes = json_data[0].post_likes; 
    // user = json_data[0].user;
    // song = json_data[0].song;

    // console.log("post_id: ", post_id);
    // console.log("post_body: ", post_body);
    // console.log("post_likes: ", post_likes);
    // console.log("user: ", user);
    // console.log("song: ", song);

    console.log(`POST ID: ${json_data[0].post_id}`);
    console.log(json_data);

    console.log(typeof json_data);
    displayPosts(json_data);

  }catch(error){
    console.log(error);
    return null;
  }
}

function displayPosts(posts) {
  var parentSection = document.getElementById("posts");
  console.log(`(displayPosts) POST ID: ${posts[0].post_id}`);

  for (let i = 0; i < posts.length; i++) {
    //console.log(posts[i].post_id);
    //console.log(posts[i].post_body);

    var postDiv = document.createElement("div");
    var postBody = document.createElement("p");
    postBody.innerHTML = posts[i].post_body;
    postDiv.append(postBody);
    parentSection.append(postDiv);
  }
}


getPosts()

