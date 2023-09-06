const apiKey = "AIzaSyDvo2p4xMEI3GC-PWH02_0OAIN1h88k4rE";
const url = "https://www.googleapis.com/youtube/v3/commentThreads";
const commentsContainer = document.getElementById("comments-container");
const commentsReply = document.getElementsByClassName("reply-button");
const innerReply = document.getElementsByClassName("inner-reply");
const like_ViewCount = document.getElementById("video-description-2");
const description= document.getElementById("video-description-5");

// commentsReply.addEventListener('click',(event)=>{
//   event.preventDefault();
//   innerReply.textContent="Nevil kumar";
// })

window.addEventListener("load", () => {
  let videoId = document.cookie.split("=")[1];

  if (YT) {
    new YT.Player("video-placeholder", {
      height: "400",
      width: "700",
      videoId,
    });
    kumar1(videoId);
    loadComments(videoId);
    kumar(videoId);
  }
});
async function kumar1(videoId) {
  //          https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts&part=snippet&id=b-NkELeV1GE
  let api2 = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts&part=snippet&id=${videoId}`;
  let response1 = await fetch(api2);
  let result1 = await response1.json();
  console.log(result1);
//   // let channelTitle = result1.items[0].snippet.title;
//   // let videoDescription = result1.items[0].snippet.description;
//   // console.log(channelTitle ,"kumar");
//   // console.log(videoDescription);
//   document.getElementById("video-title").innerHTML=channelTitle;
//   // document.getElementById("video-description-Main").innerHTML=videoDescription;
//   const div2=document.createElement("div");
//   div2.className="video-description-6";
//   div2.innerHTML=`<div class="accordion" id="accordionExample">
//   <div class="accordion-item">
//     <h2 class="accordion-header">
//       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//         Video description
//       </button>
//     </h2>
//     <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
//       <div class="accordion-body">
//        <p id="video-description-Main">${videoDescription}</p>
//       </div>
//     </div>
//   </div>`; 
      
//  description.appendChild(div2);
}
async function kumar(videoId) {
  // let videoId="b-NkELeV1GE";
  let api1 = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=statistics&id=${videoId}`;
  const response = await fetch(api1);
  const result = await response.json();
  // console.log(result);
  // console.log(result.items[0].statistics);
  let viewCount = result.items[0].statistics.viewCount;
  let likeCount = result.items[0].statistics.likeCount;
  let commentCount = result.items[0].statistics.commentCount;
  // console.log(viewCount);
  // console.log(likeCount);
  // console.log(commentCount);
  // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts&part=snippet&id=b-NkELeV1GE

  const div1 = document.createElement("div");
  div1.className = "video-description-4";
  div1.innerHTML = `
<div class="subscribe-div d-flex">
          
<img src="https://picsum.photos/200/300" alt="channel-logo" class="channel-logo-details">
<h5>Great Stack</h5>
<p>${viewCount} views </p>


</div>
<div class="join-subscribe-div d-flex p-2">
<button>Join</button>
<button class="subscribe-button">Subscribe</button>
</div>
<div class="like-dislike-div p-1 align-items-center w-100">
<button class="like-button"><img src="./file/Liked.png" >${likeCount}</button>
<button><img src="./file/DisLiked.svg"  class="dislike-button"></button>
</div>
<div class="share&Download-div p-3 align-items-center w-75">
<button class="like-button"><img src="./file/Share.svg">Share</button>
<button class="like-button d-flex"><img src="./file/Share.svg">Download</button>
</div>
</div><br>
<p class="total-comments d-flex"> Comments  ${commentCount}</p>

`;

  like_ViewCount.appendChild(div1);
  // commentsContainer.appendChild(div1);
}


async function loadComments(videoId) {
  let endpoint = `${url}?key=${apiKey}&videoId=${videoId}&maxResults=5&part=snippet`;

  const response = await fetch(endpoint);
  const result = await response.json();

  result.items.forEach((item) => {
    const repliesCount = item.snippet.totalReplyCount;
    const {
      authorDisplayName,
      textDisplay,
      likeCount: likecount,
      authorProfileImageUrl: profileUrl,

      publishedAt,
    } = item.snippet.topLevelComment.snippet;
    // console.log(result.item.snippet.topLevelComment.snippet.likeCount);//items[0].snippet.topLevelComment.snippet.likeCount
    // console.log(result);

    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
    <img src="${profileUrl}" class="author-profile" alt="author profile" />
    <b>${authorDisplayName}</b>
    <p>${textDisplay}</p> 
    <img src="./file/Liked.png" width="30px" height="30px" class="bg-secondary"/> ${likecount}
    <img src="./file/DisLiked.svg" width="30px" height="30px" class="bg-secondary"/>
    <button class="reply-button"> show Replies</button>
    <p class="inner-reply"></p>`;

    commentsContainer.appendChild(div);
    // addLikeCount(videoId);
  });
}
// const APIKEY="https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDf3hMcYKUDpQLFhwQhPhBKUuxSBhXVlts&videoId=NXrGGGFqlwg&part=snippet,replies";

// {
//   "kind": "youtube#commentThread",
//   "etag": "s2JKzZArgigK6CTgNPFU_Ek1sGU",
//   "id": "UgxVKTpvndIznc-7vaV4AaABAg",
//   "replies": {
//       "comments": [
//           {
//               "kind": "youtube#comment",
//               "etag": "7_HMvLMrs1lDJVX6IRdNZB8hfXo",
//               "id": "UgxVKTpvndIznc-7vaV4AaABAg.9sqIPkKhJe19tRi3M7vVAf",
//               "snippet": {
//                   "channelId": "UC1DtEMePmr4O6F2do6BVl7A",
//                   "videoId": "NXrGGGFqlwg",
//                   "textDisplay": "ALLAH aap ko izzat de... Aameen",
//                   "textOriginal": "ALLAH aap ko izzat de... Aameen",
//                   "parentId": "UgxVKTpvndIznc-7vaV4AaABAg",
//                   "authorDisplayName": "Akeel Firdos Bhat",
//                   "authorProfileImageUrl": "https://yt3.ggpht.com/neTr5OM7op9UxbFuZmUPaeurfcQ9xgl--CoYYlAkdkbAvlIK6vOI-sLxg-Fd77d4TyT2GkQrgQ=s48-c-k-c0x00ffffff-no-rj",
//                   "authorChannelUrl": "http://www.youtube.com/channel/UCCdNIAvniaK6eBPIDBU62Jw",
//                   "authorChannelId": {
//                       "value": "UCCdNIAvniaK6eBPIDBU62Jw"
//                   },
//                   "canRate": true,
//                   "viewerRating": "none",
//                   "likeCount": 0,
//                   "publishedAt": "2023-08-15T16:29:11Z",
//                   "updatedAt": "2023-08-15T16:29:11Z"
//               }
//           }
//       ]
//   }
// },
