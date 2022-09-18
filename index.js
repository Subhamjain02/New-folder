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


const HOST_API_URL = `https://newsapp24er.herokuapp.com`;
const POST_API_URL = `${HOST_API_URL}/newsdekho/api/post`;
const UPLOAD_API_URL = `${HOST_API_URL}/upload`;
const STATIC_API_URL = `${HOST_API_URL}/public`;
const AUTHOR_API_URL = `${HOST_API_URL}/newsdekho/api/author`;
const ADMIN_API_URL = `${HOST_API_URL}/newsdekho/api/admin`;

async function  fetch_posts () {
  let res = await fetch(POST_API_URL, { method: 'GET' })
  let posts = await res.json() ;
  let html_content = posts?.content.map ( post => `
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
       <div class="left d-flex align-items-center ">
         <i class="fa-regular fa-heart me-3"></i>
        
         <a
         class="dropdown-toggle d-flex align-items-center hidden-arrow"
         href="#"
         id="navbarDropdownMenuAvatar"
         role="button"
         data-mdb-toggle="dropdown"
         aria-expanded="false"
         >
             <i class="fa-regular fa-paper-plane text-light"></i>
         </a>
           <ul class="dropdown-menu bg-dark share-btn rounded-8"
           aria-labelledby="navbarDropdownMenuAvatar">
           <div class="d-flex justify-content-evenly align-items-center">
             <li class="list-item ">
               <a class="list-item-link" href="#">
                 <span class="fas fa-link  "></span>
               </a>
             </li>
             <li class="list-item">
               <a class="list-item-link" href="#">
                 <span class="fab fa-whatsapp "></span>
               </a>
             </li>
             <li class="list-item">
               <a class="list-item-link" href="#">
                 <span class="fab fa-instagram "></span>
               </a>
             </li>
             <li class="list-item">
               <a class="list-item-link" href="#">
                 <span class="fab fa-facebook-f"></span>
               </a>
             </li>
             <li class="list-item">
               <a class="list-item-link" href="#">
                 <span class="fab fa-twitter"></span>
               </a>
             </li>
           </div>
           </ul>
         </div>
       <div class="right">
         <i class="fa-regular fa-bookmark"></i>
     </div>
   </div>
</div>
</div>
</div>  
<div class="hr mt-4 mb-4"></div>

    `
    ).join('') ;

    document.getElementById('articles').innerHTML = html_content;
  
}


fetch_posts()


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

async function fetch_trending_post() {
  let res = await fetch(POST_API_URL+'/type/Trending', { method: 'GET' })
  let posts = await res.json() ;
  let html_content = posts?.content.map ( post => `
  <div class="card rounded-9 bg-transparent text-white border border-3">
  <img src="`+ post?.photo +`" class="card-img ci rounded-8" alt="`+ post?.caption +`"/>
  <h5 class="card-title cti">#1</h5>
  <div class="card-img-overlay cio d-flex align-items-end justify-content-center">
    <p class="card-text lh-sm para text-uppercase "> 
        `+ post?.title +`
   </p>
  </div>
</div>
    `
    ).join('') ;

    document.getElementById('trending').innerHTML = html_content;
}
fetch_trending_post()

async function fetch_nearby_post() {
  let res = await fetch(POST_API_URL+'/type/Trending', { method: 'GET' })
  let posts = await res.json() ;
  let html_content_text = `
  <div class="cont text-wrap">
        <h2>Nearby</h2>
        <h3>(Bringing you the lastest news of your own city)</h3>
    </div>
  `
  let html_content = posts?.content.map ( post => `
  <div class="card child bg-transparent ">
  <img src="`+ post?.photo +`" class="card-img-top cit rounded-9 border-3 " alt="`+ post?.caption +`"/>
  <p class="card-text lh-sm para1 ">`+ post?.title +`</p>
</div>
    `
    ).join('') ;
    html_content_text = html_content_text + html_content;
    document.getElementById('nearby').innerHTML = html_content_text;
}
fetch_nearby_post()


const search = document.getElementById('Search-news');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch(POST_API_URL, { method: 'GET' })
  const states = await res.json() ;

  
  // get matches to your input
  let matches = states.content.filter(state => {
    const regex = new RegExp(`${searchText}`,'gi');
    return state.title.match(regex);
  });
  if ( searchText.length === 0 ) {
    matches = [] ;
    matchList.innerHTML='';
  }

  outputHtml(matches);
} ;

// Show results in HTML
const outputHtml = matches => {
  if ( matches.length > 0 ) {
    const html = matches.map ( match => `
    <div class=" d-flex mt-3  align-items-center">
              <div class="image-search">
            <img src="`+ match.photo +`" alt="`+ match.caption +`" width="120px" height="80px">
            </div>
            <div class="ms-2 lh-sm">
              <span class="txt">`+ match.title +`</span>
            </div>
          </div>
    `
    ).join('') ;
    
    matchList.innerHTML = html;

}
};
    
search.addEventListener('input',()=>searchStates(search.value))


search.addEventListener('input',()=>searchStates(search.value))

async function signup () {
  let name = document.getElementById("nameX").value;
  let email = document.getElementById("typeEmailX").value;
  let password = document.getElementById("typePasswordX").value;
  let repassword = document.getElementById("typePasswordY").value;
  console.log(email);
  console.log(password);
  console.log(repassword);
  if (email == '' || password == '' || repassword == '') {
    alert("Please enter all the fields");
    return;
  }
  if(password != repassword ) {
    alert("Password is not matching");
    return;
  }

  let author_payload = {
    name: name,
    email : email,
    password: password
    }

    let res = await fetch(AUTHOR_API_URL+'/signup', { method: 'POST' ,headers : getHeaders(), body: JSON.stringify(author_payload)})
    let author = await res.json() ;
    console.log(author);
    alert(author.message);
    if(author.status == 'success') {
      // add code to close modal
    }
}

async function signin() {
  let email = document.getElementById("typeEmailY").value;
  let password = document.getElementById("typePasswordZ").value;
  console.log(email);
  console.log(password);
  if (email == '' || password == '') {
    alert("Please enter all the fields");
    return;
  }

  let author_payload = {
    email : email,
    password: password
    }

    let res = await fetch(AUTHOR_API_URL+'/signin', { method: 'POST' ,headers : getHeaders(), body: JSON.stringify(author_payload)})
    let author = await res.json() ;
    console.log(author);
    alert(author.message);
    if(author.status == 'success') {
      // add code to close modal
      localStorage.setItem('author', author.content.author);
      localStorage.setItem('jwt', author.content.token);
    }
}

// document.getElementById("btn1").addEventListener("click", function () {
//   document.getElementById("box").classList.toggle("act");
// });
var elms = document.querySelectorAll("[id='btn1']");
var box = document.querySelectorAll("[id='box']");
for(var i = 0; i < elms.length; i++) 
  elms[i].addEventListener("click", function () {
    for(var i = 0; i < box.length; i++) 
    {
      box[i].classList.toggle("act");
    }
  })// <-- whatever you need to do here.

// const btn1 = document.getElementsByClassName("btn1");
// const box = document.getElementsByClassName("box");
// btn1.addEventListener("click", function(){
//   box.classList.toggle("act");
// } );

// function share()
// {
//   const elements = document.querySelectorAll('.box');
// elements.forEach(x => x.classList.toggle('.act'));

// }
// function toggle(selector) {
//   let x = document.querySelectorAll(selector)[0];
//   if (x.style.display === "none") {
//     x.style.display = "flex";
//     x.style.transition = "all 2s";
//   } else {
//     x.style.display = "none";
//   }

// }