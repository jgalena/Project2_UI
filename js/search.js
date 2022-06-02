console.log("TEST");

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

async function addSong(song){
  //console.log(song)
  try{
    const raw_response = await fetch(
      `http://localhost:8080/api/song`, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(song)
      }
    );

    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();

    console.log(json_data);
      
    
  } catch(error){
    console.log(error);
    return null;
  }
}

async function getSongs(){
  try{
    const raw_response = await fetch(
      `http://localhost:8080/api/songs`,
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
  }catch(error){
    console.log(error);
    return null;
  }
}
  




