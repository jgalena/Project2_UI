console.log("TEST");

async function searchSong(){
  let songname = 'playing god';
  try {
    const raw_response = await fetch(
      `https://v1.nocodeapi.com/jgalena/spotify/mMIVCyyptpyfkswF/search?q=${songname}&type=track`,
      
      
  
    );
  
    if (!raw_response.ok){
      throw new Error(raw_response.status);
    }
    const json_data = await raw_response.json();
    console.log(json_data);
    }catch (error) {
    //this catch block is for network errors
    console.log(error);
    return null;
    }
}
  
searchSong();

