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






const HOST_API_URL = `https://newsapp24er.herokuapp.com`;
const POST_API_URL = `${HOST_API_URL}/newsdekho/api/post`;
const UPLOAD_API_URL = `${HOST_API_URL}/upload`;
const STATIC_API_URL = `${HOST_API_URL}/public`;
const AUTHOR_API_URL = `${HOST_API_URL}/newsdekho/api/author`;
const ADMIN_API_URL = `${HOST_API_URL}/newsdekho/api/admin`;

function fetch_posts() {
    fetch(POST_API_URL, { method: 'GET' })
        .then(Result => Result.json())
        .then(res => {
            var temp = "";
            data = res?.content;
            console.log(data);
            for(var i=0;i<data.length;i++){
                post = data[i];
                temp = temp + ` <div class="col">
                <div class="card posts bg-black">
                
                  <span class="d-flex justify-content-start"> <h6>`+ post?.category +`</h6></span>
                  <img src="`+ post?.photo +`" class="card-img-top" alt="`+ post?.caption +`"/>
                  <div class="card-body cb bg-black">
                    <h5 class="card-title lh-sm ctitle">`+ post?.title +`</h5>
                    <p class="card-text  lh-sm ctext">`+ post?.body +`</p>
                   <span class="d-flex  ">
                    <p class="text-light www">`+ post?.likes?.length +` likes</p>
                    <p class="www">`+ post?.views +` views</p></span>
                  <div class="btns bg-black ">
                  <div class="left d-flex align-items-center ">
                  <i class="fa-regular fa-heart mr"></i>
                  <div class="box">
        
                    <button class="btn">
                      <i class="fa-regular fa-paper-plane"></i>
                    </button>
                  
                    <ul class="list">
                      <li class="list-item">
                        <a class="list-item-link" href="#">
                          <span class="fas fa-link fs-3"></span>
                        </a>
                      </li>
                      <li class="list-item">
                        <a class="list-item-link" href="#">
                          <span class="fab fa-whatsapp fs-3"></span>
                        </a>
                      </li>
                      <li class="list-item">
                        <a class="list-item-link" href="#">
                          <span class="fab fa-instagram fs-3"></span>
                        </a>
                      </li>
                      <li class="list-item">
                        <a class="list-item-link" href="#">
                          <span class="fab fa-facebook-f fs-3"></span>
                        </a>
                      </li>
                      <li class="list-item">
                        <a class="list-item-link" href="#">
                          <span class="fab fa-twitter fs-3"></span>
                        </a>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                    <div class="right">
                      <i class="fa-regular fa-bookmark"></i>
                  </div>
                </div>
              
             </div>
            </div>
            </div> 
            <div class="hr mb-2"></div>`
            }
            document.getElementById('articles').innerHTML = temp;
        })
        .catch(errorMsg => { console.log(errorMsg); });
}

fetch_posts()

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


var elements=document.getElementsByClassName("btn1");

Array.from(elements).forEach(function(element) {
element.addEventListener("click", function () {
  document.querySelectorAll("box").forEach(x => x.classList.toggle('act')
)})});
