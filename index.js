// document.addEventListener('DOMContentLoaded',function(e){
//   let field = document.querySelector('.field');
//   let input = document.querySelector('input');
//   let copyBtn = document.querySelector('.field button');

//   copyBtn.onclick = () =>{
//       input.select();
//       if(document.execCommand("copy")){
//           field.classList.add('active');
//           copyBtn.innerText = 'Copied';
//           setTimeout(()=>{
//               field.classList.remove('active');
//               copyBtn.innerText = 'Copy';
//           },3500)
//       }
//   }
// })


const getHeaders = () => {
  return {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem('jwt')
  }
}


const HOST_API_URL = `https://newsapiodisha24.herokuapp.com`;
const POST_API_URL = `${HOST_API_URL}/newsdekho/api/post`;
const GOSSIP_API_URL = `${HOST_API_URL}/newsdekho/api/gossip`;
const POLL_API_URL = `${HOST_API_URL}/newsdekho/api/poll`;
const LATEST_POLL_API_URL = `${POLL_API_URL}/latest`;
const SM_BD_API_URL =`${HOST_API_URL}/newsdekho/api/billboard/size/small`;
const BG_BD_API_URL = `${HOST_API_URL}/newsdekho/api/billboard/size/big`;
const UPLOAD_API_URL = `${HOST_API_URL}/upload`;
const STATIC_API_URL = `${HOST_API_URL}/public`;
const AUTHOR_API_URL = `${HOST_API_URL}/newsdekho/api/author`;
const ADMIN_API_URL = `${HOST_API_URL}/newsdekho/api/admin`;

async function  fetch_posts () {
  let res = await fetch(POST_API_URL, { method: 'GET' })
  let posts = await res.json() ;
  let bookmarks_arr = localStorage.getItem('bookmarks');
  let bookmarks = (bookmarks_arr) ? bookmarks_arr : [];
  let html_content = posts?.content.map ( post =>{
    let author_id = localStorage.getItem('_id');
    let like_content = (post?.likes.includes(author_id)) ? `<i class="fa-regular fa-heart me-3 fw-bold" onclick="unlike('`+post?._id+`')"></i> `: `<i class="fa-regular fa-heart me-3" onclick="like('`+post?._id+`')"></i>`
    let bookmark_content = (bookmarks.includes(post?._id)) ? `<i class="fa-regular fa-bookmark fw-bold" onclick="unbookmark('`+post?._id+`')"></i> `: `<i class="fa-regular fa-bookmark text-light" onclick="bookmark('`+post?._id+`')"></i>`
    return (
      `
      <div class="col">
      <a href="Articles.html?id=`+post?._id+`" class="text-light">
      <div class="card bg-black posts">
        <span class="d-flex justify-content-start text-uppercase"> <h6>`+ post?.category +`</h6></span>
        <img src="`+ post?.photo +`" class="card-img-top cito" alt="`+ post?.caption +`"/>
        <div class="card-body cb bg-black">
          <h5 class="card-title lh-sm ctitle">`+ post?.title +`</h5></a>
          <a href="Articles.html?id=`+post?._id+`" class="text-light"><p class="card-text  lh-sm ctext">`+ post?.body.slice(0,150) +`</p>
        </a>
         <span class="d-flex  ">
          <p class="text-light www ">`+ post?.likes?.length +` likes</p>
           <p class="www">`+ post?.views +` views</p></span>
           <div class="btns bg-black ">
           <div class="left d-flex align-items-center ">`
             +like_content+
            
             ` <div id="box`+post?._id+`" onclick="share_toogle('`+post?._id+`')">

             <button id="btn1`+post?._id+`" >
               <i class="fa-regular fa-paper-plane"></i>
             </button>
           
             <ul id="list">
                 <li class="list-item ">
                   <a class="list-item-link" onclick="copy_link('`+post?._id+`')">
                     <span class="fas fa-link fsi "></span>
                   </a>
                 </li>
                 <li class="list-item">
                   <a class="list-item-link" onclick="share_post('`+post?._id+`', '`+ post?.title +`', '`+ post?.hashtags +`', 'whatsApp')">
                     <span class="fab fa-whatsapp fsi"></span>
                   </a>
                 </li>
                 <li class="list-item">
                   <a class="list-item-link" onclick="share_post('`+post?._id+`', '`+ post?.title +`', '`+ post?.hashtags +`', 'facebook')">
                     <span class="fab fa-facebook-f fsi"></span>
                   </a>
                 </li>
                 <li class="list-item">
                   <a class="list-item-link" onclick="share_post('`+post?._id+`', '`+ post?.title +`', '`+ post?.hashtags +`', 'twitter')">
                     <span class="fab fa-twitter fsi"></span>
                   </a>
                 </li>
               </ul>
               </div>
             </div>
           <div class="right">`+
           bookmark_content
         +`</div>
       </div>
    </div>
    </div>
    </div>  
    <div class="hr mt-4 mb-4"></div>
    
    
        `
    )
  } 

    ).join('');


      let res2 = await fetch(SM_BD_API_URL, { method: 'GET' })
      let billboards = await res2.json() ;
      let html_content2 = billboards?.content.map ( billboard =>  `
      <div class="hr mb-2"></div>
      <div class="col">
        <div class="card  billy-1 mb-3  ">
          <img src="`+ billboard?.photo +`" class="card-img-top billyimg-1" alt="Fissure in Sandstone"/>
          <div class="card-body bb ">
            <h5 class="card-title lh-sm bill-title mb-0">BILLBOARD</h5>
            <p class="bn fw-light lh-sm m-0"><a href="">`+ billboard?.title +`</a></p>
      </div>
      </div>
      </div>
        `
        ).join('') ;

        let res3 = await fetch(BG_BD_API_URL, { method: 'GET' })
  let billboards1 = await res3.json() ;
  let html_content3 = billboards1?.content.map ( billboard =>  `
  <div class="hr mb-2"></div>
  <div class="col">
    <div class="card  billy mb-3  ">
      <img src="`+ billboard?.photo +`" class="card-img-top billyimg" alt="Fissure in Sandstone"/>
      <div class="card-body bb ">
        <h5 class="card-title lh-sm bill-title mb-0">BILLBOARD</h5>
        <p class="bn fw-light lh-sm m-0"><a href="">`+ billboard?.title +`</a></p>
  </div>
  </div>
  </div>
    `
    ).join('') ;
      html_content = html_content + html_content3  + html_content2 ;

    document.getElementById('articles').innerHTML = html_content;
    
    // document.getElementById("btn1").addEventListener("click", function () {
    //   document.getElementById("box").classList.toggle("act");
    // });
    // var elms = document.querySelectorAll("[id='btn1']");
    // var box = document.querySelectorAll("[id='box']");
    //   for(var i = 0; i < elms.length; i++) 
    //     elms[i].addEventListener("click", function () {
    //       for(var i = 0; i < box.length; i++) 
    //       {
    //         box[i].classList.toggle("act");
    //       }
    //     })
  
}
fetch_posts()

function share_toogle(suffix) {
  let id1 = 'btn1'+suffix;
  let id2 = 'box'+suffix;
  document.getElementById(id1).addEventListener("click", function () {
      document.getElementById(id2).classList.toggle("act");
    });

}

function copy_link(id) {
  var base_url = window.location.origin;
  let postUrl = base_url+"Articles.html?id="+id;
  navigator.clipboard.writeText(postUrl).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function share_post (id, title, hashtags, media) {
  console.log(media);
  let hashTag = hashtags;
  var base_url = window.location.origin;
  let postUrl = base_url+"/Articles.html?id="+id;
  if (media == "twitter") {
    url = `https://twitter.com/share?url=${postUrl}&text=${title}&hashtags=${hashTag}`;
  } else if(media == "facebook") {
     url =`https://www.facebook.com/sharer.php?u=${postUrl}`;
  } else if (media == "whatsApp") {
     url = `https://api.whatsapp.com/send?text=${title} ${postUrl}`
  } else if (media == "linkedIn") { 
    url = `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${PostTitle}`
  } else {
     url = `https://pinterest.com/pin/create/bookmarklet/?url=${postUrl}&description=${PostTitle}`
  }
  window.open(url, "_blank");
}

async function like(postId) {
  console.log(postId);
  let id_payload = {
    _id : postId
  }
  let res = await fetch(POST_API_URL+'/like', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let posts = await res.json() ;
  console.log(posts);
  fetch_posts();
}
async function unlike(postId) {
  console.log(postId);
  let id_payload = {
    _id : postId
  }
  let res = await fetch(POST_API_URL+'/unlike', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let posts = await res.json() ;
  console.log(posts);
  fetch_posts();
}

async function bookmark(postId) {
  console.log(postId, "bookmark");
  let id_payload = {
    _id : postId
  }
  let res = await fetch(AUTHOR_API_URL+'/bookmark', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let posts = await res.json() ;
  console.log(posts);
  localStorage.setItem("bookmarks",posts.content.bookmarks);
  fetch_posts();
}
async function unbookmark(postId) {
  console.log(postId, "unbookmark");
  let id_payload = {
    _id : postId
  }
  let res = await fetch(AUTHOR_API_URL+'/unbookmark', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let posts = await res.json() ;
  localStorage.setItem("bookmarks",posts.content.bookmarks);
  console.log(posts);
  fetch_posts();
}

async function fetch_trending_post() {
  let res = await fetch(POST_API_URL+'/type/Trending', { method: 'GET' })
  let posts = await res.json() ;
  console.log(posts);
  let html_content = posts?.content.map ( post =>
 `
  <a href="Articles.html?id=`+post?._id+`" class="text-light">
  <div class="card rounded-9 bg-transparent text-white border border-3">
  <img src="`+ post?.photo +`" class="card-img ci rounded-8" alt="`+ post?.caption +`"/>
  <h5 class="card-title cti">#1</h5>
  <div class="card-img-overlay cio d-flex align-items-end justify-content-center">
    <p class="card-text lh-sm para text-uppercase "> 
        `+ post?.title +`
   </p>
  </div>
</div>
</a>
    `
    ).join('') ;

    document.getElementById('trending').innerHTML = html_content;
}
fetch_trending_post()
function prepareTags(tagString) {
  let tags  = tagString.split(' ');
  return tags;
}

function ArrToStr(tags){
  let tagStr = "";
  tags.forEach(tag => {
      tagStr=tagStr+tag+" ";
  });
  return tagStr;
}
async function fetch_nearby_post() {
  let location_str = localStorage.getItem('location');
  let location_arr = prepareTags(location_str);
  console.log(location_arr);
  let res = await fetch(POST_API_URL, { method: 'GET' })
  let posts_res = await res.json() ;
  let posts = posts_res.content;
  let nearby_post = [];
  for(let i =0; i<posts.length ;i++) {
    let post = posts[i];
    for(let j =0; j<location_arr.length; j ++) {
      let str1 = location_arr[j].toLowerCase();
      let str2 = post?.location.toLowerCase();
      if(str1.includes(str2)) {
        nearby_post.push(post);
        break;
      }
    }
  }
  let html_content_text = `
  <div class="cont text-wrap">
        <h2>Nearby</h2>
        <h3>(Bringing you the lastest news of your own city)</h3>
    </div>
  `
  let html_content = nearby_post.map ( post => `
  <a href="Articles.html?id=`+post?._id+`" class="text-light">
  <div class="card child bg-transparent ">
  <img src="`+ post?.photo +`" class="card-img-top cit rounded-9 border-3 " alt="`+ post?.caption +`"/>
  <p class="card-text lh-sm para1 ">`+ post?.title +`</p>
</div>
</a>
    `
    ).join('') ;
    html_content_text = html_content_text + html_content;
    document.getElementById('nearby').innerHTML = html_content_text;
}

fetch_nearby_post()
function getlocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
}

function successfulLookup(position) {
  const { latitude, longitude } = position.coords;
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dce9404db6624c18a851862c2453d008`)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      let location_obj = res.results?.[0].components;
      let location = [];
      location.push(location_obj.state_district);
      location.push(location_obj.county);
      location.push(location_obj.state);
      location.push(location_obj.suburb);
      location.push(res.results?.[0].formatted);
      localStorage.setItem("location", location);
      
    })

}
getlocation()



async function  fetch_gossips () {
  let res1 = await fetch(GOSSIP_API_URL, { method: 'GET' })
  let gossips = await res1.json() ;
  let author_id = localStorage.getItem('_id');
  let hashtags = '#odishavoice24 #gossip'
  let html_content1 = gossips?.content.map ( gossip => {
    let like_content = (gossip?.likes.includes(author_id)) ? `<i class="fa-regular fa-heart me-3 fw-bold" onclick="unlike_gossip('`+gossip?._id+`')"></i> `: `<i class="fa-regular fa-heart me-3" onclick="like_gossip('`+gossip?._id+`')"></i>`
    return (
      `
      <div class="hr mb-2"></div>
    
      <div class="col">
    
        <div class="card posts bg-black  ">
          <span class="d-flex justify-content-between "> <div class="polls1 gossips" >GOSSIPS</div></span>
          <div class="card-body cb1 bg-black">
           <div class="gossipsbody">
           <div class="gossipsimg">
           <img src="img/logo1.png"" height="20px" >
           <span >@odishavoice24</span>
         </div>
            <p class="card-text  lh-sm mb-4 ctext">`+ gossip?.body +`</p>
            <p class="web">www.odishavoice24.com</p>
           </div>
           <span class="d-flex ">
             <p class="text-light www">`+ gossip?.likes.length +` likes</p>
            </span>
            <div class="btns bg-black ">
            <div class="left d-flex align-items-center ">
              `+like_content+`
             
            
              </div>
        </div>
     </div>
     </div>
    </div>
        `
    )
  }
    

    ).join('');

    document.getElementById('gossip').innerHTML = html_content1;
  
}

fetch_gossips()



async function like_gossip(gossipId) {
  console.log(gossipId);
  let id_payload = {
    _id : gossipId
  }
  let res = await fetch(GOSSIP_API_URL+'/like', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let gossips = await res.json() ;
  console.log(gossips);
  fetch_gossips();
}

async function unlike_gossip(gossipId) {
  console.log(gossipId);
  let id_payload = {
    _id : gossipId
  }
  let res = await fetch(GOSSIP_API_URL+'/unlike', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
  let gossips = await res.json() ;
  console.log(gossips);
  fetch_gossips();
}

async function fetch_poll() {
  let res = await fetch(LATEST_POLL_API_URL, { method: 'GET' })
  let poll_res = await res.json() ;
  let poll = poll_res.content[0];
  console.log(poll);
  let ans1 = poll?.ans1+1;
  let ans2 = poll?.ans2+1;
  let ans3 = poll?.ans3+1;
  let ans4 = poll?.ans4+1;
  let total = ans1+ans2+ans3+ans4;
  let pr1=Math.round(ans1/total*100);
  let pr2=Math.round(ans2/total*100);
  let pr3=Math.round(ans3/total*100);
  let pr4=Math.round(ans4/total*100);
  let html_content =  `
  <div class="col">

  <div class="d-flex justify-content-between align-items-center polls ">
    <div class="polls1">POLLS</div>
    <img src="img/logo1.png" height="25px">

  </div>
  
  <div class="text-wrap mb-4">
    <h4>`+poll.qsn+`</h4>
</div>
<div class="ctnr d-flex justify-content-evenly">
  <div class="per " onclick="vote('1', '`+poll?.ans1+`', '`+poll?._id+`')">
  <div class="loadbar ">
  <div class="bar " style='height:`+pr1+`%;'></div>
  <h5>`+poll.op1+`</h5>
</div>
<p class="text-center percent">`+pr1+`%</p>
</div>
  <div class="per " onclick="vote('2', '`+poll?.ans2+`', '`+poll?._id+`')">
  <div class="loadbar ">
  <div class="bar " style='height:`+pr2+`%;'></div>
  <h5>`+poll.op2+`</h5>
</div>
<p class="text-center percent">`+pr2+`%</p>
</div>
  <div class="per " onclick="vote('3', '`+poll?.ans3+`', '`+poll?._id+`')">
  <div class="loadbar ">
  <div class="bar " style='height:`+pr3+`%;'></div>
  <h5>`+poll.op3+`</h5>
</div>
<p class="text-center percent">`+pr3+`%</p>
</div>
  <div class="per " onclick="vote('4', '`+poll?.ans4+`', '`+poll?._id+`')">
  <div class="loadbar ">
  <div class="bar " style='height:`+pr4+`%;'></div>
  <h5>`+poll.op4+`</h5>
</div>
<p class="text-center percent">`+pr4+`%</p>
</div>
</div>
</div>
    ` ;

    document.getElementById('poll').innerHTML = html_content;
}
fetch_poll()
async function vote(opn, ans, pollId) {
  console.log(opn, ans, pollId);
  let poll_payload = {
    opt : opn,
    ans: ans
  }
  let res = await fetch(POLL_API_URL+'/vote/'+pollId, { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(poll_payload)})
  let poll = await res.json() ;
  console.log(poll);
  fetch_poll();
}



