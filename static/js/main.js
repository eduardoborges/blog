console.log("hello world")

const token = "BQAWNE0rk-MgLrW6QvzZKM9pt9sxE057mP7FbhJcu3Ky4KV5T6ZEb7dVZ5I_63fXPImg6MwIU5D2gBZhoQ_sY3tH8qTjMwXE6FBpKqNAtkZ9N4cTrsRmZSENt-89KJMMOQBUqrCWvNo5C_iWSufHs-wIV0dAV6vXnb37UQhbjbZXb89qYO0";

const el = document.getElementById("last-played");

(async () => {
  try {
    const data = await fetch("https://tools.borges.workers.dev/recent-tracks").then(r => r.json());

    const name = String(data.recenttracks.track[0].name);
    const artist = String(data.recenttracks.track[0].artist["#text"]);
    const url = String(data.recenttracks.track[0].url);

    el.innerText = name.toLowerCase() + " - " + artist.toLowerCase();
    el.href = url;
  } catch (error) {
    el.innerText = "ops... something went wrong";
  }
})()