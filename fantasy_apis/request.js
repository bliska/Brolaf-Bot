const fetch = require('node-fetch')

fetch('https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/194518').then(response => {
    console.log(response);
    return response.json();
})
.then(response => {
    console.log(response)
})