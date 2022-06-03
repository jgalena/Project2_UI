async function makePost(post) {
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

    return json_data;

  } catch (error) {
    //this catch block is for network errors
    console.log(error);
    return null;
  }
}

async function addSongToPost() {

  // gets post body from input on post
  let postBody = document.getElementById("postBox").value;
  // console.log(postBody);

  // gets song name from input on post
  let songName = document.getElementById("postSong").value;
  // console.log(songName);

  // get current user info
  let user = JSON.parse(sessionStorage.getItem('currentUser'));
  // console.log(user);

  // search spotify for song and get url
  let songURL = await searchSongSpotify(songName);
  // console.log(songURL);

  // combine inputs into single object
  const post = {
    post_body: postBody,
    post_song: songURL,
    user: user
  };

  // test print to console
  console.log("Should show post body input -->", post);

  // pass input object into makePost
  makePost(post)

}

async function searchSongSpotify(songName) {
  try {
    const raw_response = await fetch(
      `https://v1.nocodeapi.com/jgalena/spotify/mMIVCyyptpyfkswF/search?q=${songName}&type=track`,
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }
    const json_data = await raw_response.json();
    let song = {
      "id": 0,
      "name": json_data.tracks.items[0].name,
      "artist": json_data.tracks.items[0].artists[0].name,
      "album": json_data.tracks.items[0].album.name,
      "art": json_data.tracks.items[0].album.images[0].url,
      "length": json_data.tracks.items[0].duration_ms,
      "url": json_data.tracks.items[0].id
    }

    console.log(song);

    return song.url;

  } catch (error) {
    //this catch block is for network errors
    console.log(error);

    return null;
  }
}
