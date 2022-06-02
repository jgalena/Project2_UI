async function getUser(id){
    try{
      const raw_response = await fetch(
        `http://localhost:8080/api/user?user_id=${id}`,
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
      let userTemplate = {
          user_id: json_data.user_id,
          f_name: json_data.f_name,
          l_name: json_data.l_name,
          favorite_artist: json_data.favorite_artist,
          password: json_data.password,
          username: json_data.username,
      }
      return userTemplate;
    }catch(error){
      console.log(error);
      return null;
    }
  }
  
  async function searchSongSpotify(songname){
    try {
      const raw_response = await fetch(
        `https://v1.nocodeapi.com/jgalena/spotify/mMIVCyyptpyfkswF/search?q=${songname}&type=track`,
      );
    
      if (!raw_response.ok){
        throw new Error(raw_response.status);
      }
      const json_data = await raw_response.json();
      let song = {
        "id": 0,
        "name": json_data.tracks.items[0].name,
        "artist": json_data.tracks.items[0].artists[0].name,
        "album": json_data.tracks.items[0].album.name,
        "art" : json_data.tracks.items[0].album.images[0].url,
        "length": json_data.tracks.items[0].duration_ms,
        "url": json_data.tracks.items[0].id
      }
      
      console.log(song);
  
      return song;
      }catch (error) {
      //this catch block is for network errors
      console.log(error);
  
      return null;
      }
  }

    
  async function getSongSpotify(id){
    try {
      const raw_response = await fetch(
        `https://v1.nocodeapi.com/jgalena/spotify/mMIVCyyptpyfkswF/tracks?ids=${id}`,
      );
    
      if (!raw_response.ok){
        throw new Error(raw_response.status);
      }
      const json_data = await raw_response.json();

      
      
      
      let song = {
        "id": 0,
        "name": json_data.tracks[0].name,
        "artist": json_data.tracks[0].artists[0].name,
        "album": json_data.tracks[0].album.name,
        "art" : json_data.tracks[0].album.images[0].url,
        "length": json_data.tracks[0].duration_ms,
        "url": json_data.tracks[0].id
      }
      
      console.log(song);
     
  
      return song;
      }catch (error) {
      //this catch block is for network errors
      console.log(error);
  
      return null;
      }
  }

  async function searchArtistSpotify(artistname){
    try {
      const raw_response = await fetch(
        `https://v1.nocodeapi.com/jgalena/spotify/mMIVCyyptpyfkswF/search?q=${artistname}&type=artist`,
  
        
    
      );
    
      if (!raw_response.ok){
        throw new Error(raw_response.status);
      }
      const json_data = await raw_response.json();

      let artist_URL = json_data.artists.items[0].id;
      //console.log(json_data);
      //console.log(artist_URL);
  
      return artist_URL;
      }catch (error) {
      
      console.log(error);
  
      return null;
      }
  }
  


async function getFavoriteSongs(user_id){
    try{
        const raw_response = await fetch(
          `http://localhost:8080/api/favoritesongsuser?user_id=${user_id}`,
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
        /*let userTemplate = {
            user_id: json_data.user_id,
            f_name: json_data.f_name,
            l_name: json_data.l_name,
            favorite_artist: json_data.favorite_artist,
            password: json_data.password,
            username: json_data.username,
        }*/
        return json_data;
    }catch(error){
        console.log(error);
        return null;
    }
}

async function addFavSong(favoriteSong){
    try{
        const raw_response = await fetch(
            `http://localhost:8080/api/favoritesong`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(favoriteSong)
            }
        )
        if (!raw_response.ok) {
            throw new Error(raw_response.status);
          }
      
          const json_data = await raw_response.json();
      
          console.log(json_data);
  
          return json_data;
    } catch(error){
        console.log(error);
        return null;
      }
}

async function displayFavs(favs) {
    //console.log(favs)
    var parentSection = document.getElementById("favs");
    //console.log(`(displayPosts) POST ID: ${posts[0].post_id}`);
  
    for (let i = 0; i < favs.length; i++) {
      var postDiv = document.createElement("div");
      var postBody = document.createElement("p");
      //const song = await getSongSpotify(favs[i].spotifyId);
      //postBody.innerHTML = song.name + " by " + song.artist + " From the album " + song.album;
      postBody.innerHTML = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/track/" 
      + favs[i].spotifyId 
      + "?utm_source=generator\" width=\"60%\" height=\"80\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>"
      + "<button type = \"button\" onclick=\"deleteSongHelper('" + favs[i].id + "');\">X</button>";
      console.log(favs[i]);
      postDiv.append(postBody);
      parentSection.append(postDiv);
    }
  }


async function main(){

    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log("current user");
    console.log(user);
    const favorites = await getFavoriteSongs(user.user_id);
    const artist_URL = await searchArtistSpotify(user.favorite_artist);
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("name").innerHTML =  user.f_name + " " + user.l_name ;
    document.getElementById("fav_art").innerHTML = "My favorite artist is  " + user.favorite_artist;
    document.getElementById("fav_artist_playlist").innerHTML = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/artist/" + artist_URL + "?utm_source=generator\" width=\"60%\" height=\"80\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>"
    displayFavs(favorites);
    
}

async function addSongHelper(){
    let songName = document.getElementById("song_name").value;
    const song = await searchSongSpotify(songName);
    let favoriteSong = {
        spotifyId: song.url,
        user: {
            user_id: 1
        }
    }
    console.log(favoriteSong);
    addFavSong(favoriteSong);
    window.location.reload();


}

async function deleteSongHelper(input){
  let song = {
    id: input
  }
  deleteSong(song);
  window.location.reload();
}

async function deleteSong(id){
  console.log(id);
  try{
    const raw_response = await fetch(
      `http://localhost:8080/api/favoritesong`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(id)
      }
    )
    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }
    const json_data = await raw_response.json();
    console.log(json_data);
    return json_data;
  }catch(error){
    console.log(error);
    return null;
  }
}

main();


