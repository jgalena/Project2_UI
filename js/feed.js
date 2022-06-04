async function getPosts() {
  try {
    const raw_response = await fetch(
      `http://localhost:8080/api/posts`,
      {
        method: "GET",
        headers: {
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
    //console.log(json_data);

    console.log(typeof json_data);
    displayPosts(json_data);

  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getComments() {
  try {
    const raw_response = await fetch(
      `http://localhost:8080/api/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();

    return json_data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPost(postId) {
  try {
    const raw_response = await fetch(
      `http://localhost:8080/api/post?post_id=${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();

    return json_data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addComment(comment) {
  try {
    console.log("AAAAAAAAAAAAAAA", comment);
    const raw_response = await fetch(
      `http://localhost:8080/api/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(comment)
      }
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();

    return json_data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

async function displayPosts(posts) {
  var parentSection = document.getElementById("posts");
  var comments = await getComments();

  for (let i = 0; i < posts.length; i++) {
    var postDiv = document.createElement("div");
    
    postDiv.setAttribute('id', posts[i].post_id);
    postDiv.setAttribute('class', "is-post");

    var postUser = document.createElement("h3");
    postUser.innerHTML = posts[i].user ? posts[i].user.username : `User is unknown`;
    postDiv.append(postUser);

    var postBody = document.createElement("p");
    postBody.innerHTML = posts[i].post_body;
    postDiv.append(postBody);

    var songEmbed = document.createElement("p");
    songEmbed.innerHTML = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/track/" + posts[i].post_song + "?utm_source=generator\" width=\"60%\" height=\"80\" frameBorder=\"0\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>";
    postDiv.append(songEmbed);

    var commentBox = document.createElement("textarea");
    var createCommentDiv = document.createElement("div");
    var submitComment = document.createElement("button");
    createCommentDiv.setAttribute('id', "comment-div");
    

    submitComment.onclick = async function (event) {
      let user = JSON.parse(sessionStorage.getItem('currentUser'));
      let post = await getPost(event.target.parentElement.parentElement.id)
      let body = event.target.parentElement.firstChild.value;
      const comment = {
        comment_body: body,
        post: post,
        user: user
      };
      addComment(comment);


    }

    submitComment.innerHTML = "Comment";
    createCommentDiv.append(commentBox);
    createCommentDiv.append(submitComment);
    postDiv.append(createCommentDiv);

    for (let j = 0; j < comments.length; j++) {
      if (posts[i].post_id == comments[j].post.post_id) {
        var commentDiv = document.createElement("div");
        commentDiv.setAttribute('id', "is-comment");
        commentDiv.innerHTML = comments[j].comment_body;
        postDiv.append(commentDiv);
      }
    }

    // adds spacing between posts 
    var br = document.createElement("br");
    br.setAttribute('id', "post-spacing");

    parentSection.prepend(postDiv);
    parentSection.prepend(br);



  }
}


getPosts()