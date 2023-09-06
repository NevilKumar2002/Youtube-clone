// const apiKey="AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts";
// const apiKey="AIzaSyDvo2p4xMEI3GC-PWH02_0OAIN1h88k4rE";
// let apiKey="AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts";
const apiKey="AIzaSyDVpEd_CcKpRybZzAkgYQn8CU65_UTmSdM";
const baseUrl="https://www.googleapis.com/youtube/v3";

const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");
const container=document.getElementById("videos-container");
//     <div class="image">
    //     <img src="https://picsum.photos/200/300" width="290px" height="140px"alt="thumbnail">

    //   </div>
    //   <div class="card-description">
    //     <div class="logo-container">
    //       <img src="https://picsum.photos/200" class="channel-logo" alt="channel-logo">
    //      </div>
     
     
    //   <div class="title-container">
    //     <p class="p-0 m-0"><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong></p>
    //     <p class="channel-name grey-text">James Person</p>
    //     <p class="grey-text"> 15K Views .1 week ago</p>
    //   </div>
    // </div>

function calculatePublishTime(publishTime){
    let publishDate = new Date(publishTime);
    let currentDate = new Date();
  
    let secondsGap = (currentDate.getTime() - publishDate.getTime()) / 1000;
  
    const secondsPerDay = 24 * 60 * 60;
    const secondsPerWeek = 7 * secondsPerDay;
    const secondsPerMonth = 30 * secondsPerDay;
    const secondsPerYear = 365 * secondsPerDay;
  
    if (secondsGap < secondsPerDay) {
      return `${Math.ceil(secondsGap / (60 * 60))}hrs ago`;
    }
    if (secondsGap < secondsPerWeek) {
      return `${Math.ceil(secondsGap / secondsPerWeek)} weeks ago`;
    }
    if (secondsGap < secondsPerMonth) {
      return `${Math.ceil(secondsGap / secondsPerMonth)} months ago`;
    }
  
    return `${Math.ceil(secondsGap / secondsPerYear)} years ago`;
}
async function calculateViewCount(viewCount)
{
  let viewcount=viewCount;
  console.log(viewcount);
}
// calculateViewCount()
async function fetchChannelLogo(channelId)
{
  const endpoint = `${baseUrl}/channels?key=${apiKey}&id=${channelId}&part=snippet`;

  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    return result.items[0].snippet.thumbnails.high.url;
  } catch (error) {
    alert("Failed to load channel logo for ", channelId);
  }

}
function navigateVideoDetails(videoId)
{
  document.cookie = `id=${videoId}; path=/play-video.html`;
  // window.location.href="http://127.0.0.1:5500/play-video.html";
  window.location.href="http://127.0.0.1:5501/play-video.html";
}


function displayVideosonUI(videoList){
     container.innerHTML = "";
    videoList.forEach((video)=>{
        const videoContainer=document.createElement("div");
        videoContainer.className="image";
        videoContainer.innerHTML=`
        <div class="video-container"> 
        <img src="${video.snippet.thumbnails.high.url}" class="video" width="290px" height="140px"alt="thumbnail">
        </div>
       <div class="card-description">
        <div class="logo-container">
          <img src="${video.channelLogo}" class="channel-logo" alt="channel-logo">
         </div>
     
     
      <div class="title-container">
        <p class="p-0 m-0"><strong class="text-white">${video.snippet.title}.</strong></p>
        <p class="channel-name grey-text">${video.snippet.channelTitle}</p>
        <p class="grey-text"> ${video.statistics.viewCount} views  ${calculatePublishTime(video.snippet.publishTime)}</p>
      </div>
    </div>`
    videoContainer.addEventListener('click',()=>{
      navigateVideoDetails(video.id.videoId)
    })
    container.appendChild(videoContainer);
    })
}


async function getVideoStatistics(videoId){
    const endpoint = `${baseUrl}/videos?key=${apiKey}&part=statistics&id=${videoId}`;
  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    return result.items[0].statistics;
    
  } catch (error) {
    alert("Failed to fetch Statistics for ", videoId);
  }
}



async function fetchsearchResults(searchString)
{
    // const SearchString="Rahul Gandhi";

    const endpoint = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=50`;
   try{
    const response= await fetch(endpoint);
    const result=await response.json();
    for(let i=0 ;i<result.items.length ;i++)
    {
        const currentVideoId=result.items[i].id.videoId;
        let channelId = result.items[i].snippet.channelId;
        const currentVideoStatistics= await getVideoStatistics(currentVideoId);
        let channelLogo = await fetchChannelLogo(channelId);
        result.items[i].statistics=currentVideoStatistics;
        result.items[i].channelLogo=channelLogo;

    }
    displayVideosonUI(result.items);
    // calculateViewCount(result.items.statistics.viewCount)
    // console.log(result);
   }
   catch (err){
    alert("Error occured")
   }
       
}
fetchsearchResults();
searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value;
    fetchsearchResults(searchValue);
  
});
//  {
//     "kind": "youtube#searchResult",
//     "etag": "Dn_HjQZj7iXCRkRlNQXL3xxXTxE",
//     "id": {
//         "kind": "youtube#video",
//         "videoId": "_O_9HUZvJK4"
//     },
//     "snippet": {
//         "publishedAt": "2023-07-31T13:18:46Z",
//         "channelId": "UCJsApDpIBPpRRg0n9ZVmKAQ",
//         "title": "Weather obsession of Bangalore people📈🤣 #shorts #ahmedmasood #bangalore #ytshorts",
//         "description": "",
//         "thumbnails": {
//             "default": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "medium": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "high": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             }
//         },
//         "channelTitle": "Ahmed Masood",
//         "liveBroadcastContent": "none",
//         "publishTime": "2023-07-31T13:18:46Z"
//     },
//     "statistics" :
// }







const items=document.getElementById("items");//div 
function repeatitem()
{
  for(let i=0 ;i<30 ;i++)
    {
        const button=document.createElement("button");
        button.innerText="Item";
        button.className="maincontainer-button";

        // const item=document.getElementById("item");//button
       items.appendChild(button);

    }
}
repeatitem();
