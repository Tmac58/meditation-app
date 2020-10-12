let token = "BQCfsvmP732YM9MsCakDTMxQHsawccuehgk2zM-TEOGRnXfS5hQYM_bAg0TXYBjEXM_tGuuw6_Xp-Sq5LJfOZcRUS8GIUA9waOJitVZ63FQaHFPyifjuLPHg3k77NMSS_p96i3Jzbrdob3ih2Yo7wzG6BLj1FSHOBqNCqKVSlXKc"

// play selected playlist 
function playPlaylist(uri) {
    fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            "context_uri": uri
          })
        })        
    }

//pause track that is currently playing
function pauseTrack() {
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
}
