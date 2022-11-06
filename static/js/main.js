console.log("hello world")

const token = "BQAWNE0rk-MgLrW6QvzZKM9pt9sxE057mP7FbhJcu3Ky4KV5T6ZEb7dVZ5I_63fXPImg6MwIU5D2gBZhoQ_sY3tH8qTjMwXE6FBpKqNAtkZ9N4cTrsRmZSENt-89KJMMOQBUqrCWvNo5C_iWSufHs-wIV0dAV6vXnb37UQhbjbZXb89qYO0";

const el = document.getElementById("last-played");

(async ()=>{
  try {
    const data = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(r => r.json());
    console.log(data);
    el.innerText = String(data.items[0].track.artists[0].name).toLowerCase() + " - " + String(data.items[0].track.name).toLowerCase();
    el.href = data.items[0].track.external_urls.spotify;
  } catch (error) {
    el.innerText = "ops... something went wrong";
  }
})()