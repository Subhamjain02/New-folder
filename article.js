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
      const getHeaders = () => {
        return {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('jwt')
        }
      }
      async function like(postId) {
        console.log(postId);
        let id_payload = {
          _id : postId
        }
        let res = await fetch(POST_API_URL+'/like', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
        let posts = await res.json() ;
        console.log(posts);
        fetch_post(postId);
        fetch_suggestion(postId);
        
      }

      async function view(postId) {
          console.log(postId);
          let id_payload = {
            _id : postId
          }
          let res = await fetch(POST_API_URL+'/view', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
          let posts = await res.json() ;
          console.log(posts);
          fetch_post(postId);
        }

      async function fetch_post(postId) {
        let res = await fetch(POST_API_URL+'/'+postId, { method: 'GET' })
        let posts = await res.json() ;
        console.log(posts);
        let post = posts.content;
        let bookmarks_arr = localStorage.getItem('bookmarks');
        let bookmarks = (bookmarks_arr) ? bookmarks_arr : [];
        let author_id = localStorage.getItem('_id');
        let like_content = (post?.likes.includes(author_id)) ? `<i class="fa-regular fa-heart fs-1 fw-bold" onclick="unlike('`+post?._id+`')"></i> `: `<i class="fa-regular fa-heart fs-1" onclick="like('`+post?._id+`')"></i>`
        let bookmark_content = (bookmarks.includes(post?._id)) ? `<i class="fa-regular fa-bookmark fs-1 fw-bold" onclick="unbookmark('`+post?._id+`')"></i> `: `<i class="fa-regular fs-1 fa-bookmark text-light" onclick="bookmark('`+post?._id+`')"></i>`
        let temp = `
        <div class="card bg-dark text-white card-article">
      <img
        src="`+ post?.photo +`"
        class="card-img cardimg"
        alt="`+ post?.caption +`"
      />
      <div class="article-date">
        <span class="vws ">`+ post?.updatedAt.slice(0,10) +`</span>
      </div>
      <div class="lss position-absolute d-flex align-items-center flex-column ">
        `+like_content+`
        <p class="text-light www mb-5 ">`+ post?.likes?.length +` likes</p>
        <i class="fa-regular fa-eye  fs-1"></i>
        <p class="www mb-5">`+ post?.views +` views</p>
        `+bookmark_content+`
      </div> 
      <div class="card-img-overlay d-flex align-items-end justify-content-start">
      </div>
    </div>`
    let temp2 = '';
    let temp1 ='';
    let lt =0;
    let bk = 0;
for(let i=0 ;i<post?.body.length;i+=800 ) {
     lt =i+800;
    if((i+800) > (post?.body.length -1)) {
      lt = post?.body.length -1;
      bk =1;
    }
    temp1 = `
    <div class="article-lg">
    <div class="card bg-dark text-white card-article card-article-lg">
      <img
      src="`+ post?.photo +`"
      class="card-img cardimg"
      alt="`+ post?.caption +`"
    />

      <div class="card-img-overlay d-flex align-items-end justify-content-start cover" >
        <div class="card-body cbody">
          <h5 class="card-title lh-sm A-card-title">
            `+ post?.title +`
          </h5>
          <p class="card-text lh-sm">
            `+ post?.body.slice(i,lt) +`
            
          </p>
        </div>
      </div>
    </div>

    <div class="lg-body ">
    <div class="marg">
    <span class="lg-heading fw-bold fs-3 lh-sm">
    `+ post?.title +`
    </span>
    <p class="lg-para mt-2">
            `+ post?.body.slice(i,lt) +`
            
          </p>
    </div>
    </div>
    </div>
        `
        temp2+=temp1;
        if(bk == 1) {
          break;
        }
  }
  temp+=temp2;
        document.getElementById('article').innerHTML = temp;
      }

      async function fetch_suggestion(postId) {
        let res1 = await fetch(POST_API_URL+'/'+postId, { method: 'GET' })
        let posts1 = await res1.json() ;
        console.log(posts1);
        let post1 = posts1.content;
        let category = post1.category;
        let res = await fetch(POST_API_URL+'/category/'+category, { method: 'GET' })
        let posts = await res.json() ;
        let bookmarks_arr = localStorage.getItem('bookmarks');
        let bookmarks = (bookmarks_arr) ? bookmarks_arr : [];
        
        let html_content = posts?.content.map ( post =>{
          let author_id = localStorage.getItem('_id');
          let like_content = (post?.likes.includes(author_id)) ? `<i class="fa-regular fa-heart me-3 fw-bold" onclick="unlike('`+post?._id+`')"></i> `: `<i class="fa-regular fa-heart me-3" onclick="like('`+post?._id+`')"></i>`
          let bookmark_content = (bookmarks.includes(post?._id)) ? `<i class="fa-regular fa-bookmark fw-bold" onclick="unbookmark('`+post?._id+`')"></i> `: `<i class="fa-regular fa-bookmark text-light" onclick="bookmark('`+post?._id+`')"></i>`
          return (
            `
            <div class="col d-flex justify-content-center">
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
            
             ` <div id="box`+post?._id+`" onclick="share_toogle('`+post?._id+`')" class="box">

             <button id="btn1`+post?._id+`" class="btn1">
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
      
          document.getElementById('suggest').innerHTML = html_content;
          
         
      }
      function share_toogle(suffix) {
        let id2 = 'box'+suffix;
            document.getElementById(id2).classList.toggle("act");
      }
      function copy_link(id) {
        var base_url = window.location.origin;
        let postUrl = base_url+"/Articles.html?id="+id;
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
      
      $(function () {
        console.log("testing");
        var postId = location.search.split('id=')[1];
        
        console.log(postId);
        fetch_post(postId);
        view(postId);
        fetch_suggestion(postId);
      });

      async function unlike(postId) {
        console.log(postId, "unlike");
        let id_payload = {
          _id : postId
        }
        let res = await fetch(POST_API_URL+'/unlike', { method: 'PUT' ,headers : getHeaders(), body: JSON.stringify(id_payload)})
        let posts = await res.json() ;
        console.log(posts);
        fetch_post(postId);
        fetch_suggestion(postId);

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
        fetch_suggestion(postId);
        fetch_post(postId);
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
        fetch_suggestion(postId);
        fetch_post(postId);
      }