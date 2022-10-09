//header js
async function fetch_navbar() {
    let html_content = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
    <div class="container">
      <a class="navbar-brand ms-1 " href="index.html">
        <img src="img/logo1.png" height="30px" alt="MDB Logo" loading="lazy"/></a>
      <div class="d-flex align-items-center">
        <a href="#!" class="text-white-50 fw-bold" data-mdb-target="#exampleModalToggle23" data-mdb-toggle="modal" data-mdb-dismiss="modal" >  <i class="fa-light fa-magnifying-glass me-3 icons1 " style="font-family: 'FontAwesome';"></i> </a>
        <div class="dropdown d-flex" >
          <a
          class=" me-2 dropdown-toggle hidden-arrow"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
        <i class="fa-solid fa-circle-chevron-down mt-1 icon "></i>
        </a>
        <ul
        class="dropdown-menu dropdown-menu-end dm"
        aria-labelledby="navbarDropdownMenuRight"
      >
        <div id="navoption">

        </div>
        </ul>
        </div>
        
    </div>
    </div>
  </nav>

  <div class="modal fade" id="exampleModalToggle23" aria-hidden="true" aria-labelledby="exampleModalToggleLabel23" tabindex="-1">
    <div class="modal-dialog modal-dialog-top ">
      <div class="modal-content bg-transparent scard ">
        <div class="container mt-2 position-relative position-relative-example ">
          <!-- <div class="input">
            <div class="form-outline form-white  w-100">
              <input id="search-input" type="search"  id="form1" class="form-control " />
              <label class="form-label " for="form1"><i class="fa-thin fa-magnifying-glass " style="font-family: Montserrat, FontAwesome"></i>   Search</label>
            </div>
          </div> -->
          <button type="button" class="btn-close fs-6 btn-close-white " aria-label="Close" data-mdb-dismiss="modal"></button>
          <div class="mb-3">
          <input type="text" placeholder="&#xF002; Search" class="search-nav w-100  text-light me-1" style="font-family: Montserrat, FontAwesome" id="Search-news">
          <div id="match-list"></div>
          </div>
        <div class="bor pb-3">
         <div class="row row-cols-1 row-cols-xxxl-2" id ="hashtags">

        </div>
          </div>

      <div class="d-flex justify-content-start ms-1">
        <span class="fs-6 mt-3 rec">Recommended</span>
      </div>
      <div id ="recommended">

      </div>
        <div class="hs mt-4"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModalToggle22" aria-hidden="true" aria-labelledby="exampleModalToggleLabel22" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-transparent">
        <div class="card  text-white mcard" style="border-radius: 1rem;">
          <button type="button" class="btn-close fs-6 btn-close-white mt-2 position-absolute end-0 mt-3 me-3" aria-label="Close" data-mdb-dismiss="modal"></button>
          <div class="card-body p-5 text-center">
            
            <div class="mb-md-5 mt-md-4 pb-4">
              
              <span class="fw-bold mb-2 text-uppercase login pe-1">Sign-up</span>
              <p class="text-white-50 pe-1">Please enter your Email and password!</p>
              
              <div class="form-outline form-white mb-3 ">
                <input type="text" id="nameX" class="form-control form-control-lg" />
                <label class="form-label" for="nameX">Name</label>
              </div>

              <div class="form-outline form-white mb-3 ">
                <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX">Email</label>
              </div>

              <div class="form-outline form-white mb-3">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX">Password</label>
              </div>
              <div class="form-outline form-white mb-3">
                <input type="password" id="typePasswordY" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordY">Confirm Password</label>
              </div>


              <button class="btn btn-outline-light btn-lg px-5 mb-3" type="submit" onclick="signup()">Sign Up</button>

            </div>

            <div>
              <p class="mb-2">Already have an account? <a href="#!" class="text-white-50 fw-bold" data-mdb-target="#exampleModal" data-mdb-toggle="modal" data-mdb-dismiss="modal">Login</a>
              </p>
            </div>

          </div>
        </div>
    
  </div>
</div>
</div>
        
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content  bg-transparent ">  
              
      <div class="card  text-white mcard" style="border-radius: 1rem;">
        <button type="button" class="btn-close fs-6 btn-close-white mt-2 position-absolute end-0 mt-3 me-3" aria-label="Close" data-mdb-dismiss="modal"></button>
          <div class="card-body p-5 text-center ">
 
            <div class="mb-md-5 mt-md-4 ">

              <span class="fw-bold mb-2 text-uppercase login pe-1">Login</span>
              <p class="text-white-50 mb-34 pe-1">Please enter your Email and password!</p>

              <div class="form-outline form-white mb-3 " >
                <input type="email" id="typeEmailY" class="form-control form-control-lg " />
                <label class="form-label" for="typeEmailY">Email</label>
              </div>

              <div class="form-outline form-white mb-4 ">
                <input type="password" id="typePasswordZ" class="form-control form-control-lg " />
                <label class="form-label" for="typePasswordZ">Password</label>
              </div>

              

              <button class="btn btn-outline-light btn-lg px-5" type="submit" onclick="signin()">Login</button>
              

            </div>

            <div>
              <p class="mt-4 mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold" data-mdb-target="#exampleModalToggle22" data-mdb-toggle="modal" data-mdb-dismiss="modal">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
    `
    document.getElementById('myheader').innerHTML = html_content;
}
fetch_navbar()
async function fetch_tag() {
    let res = await fetch(POST_API_URL+'/hashtags', { method: 'GET' })
    let tag_res = await res.json() ;
    let tags = tag_res.content;
    console.log(tag_res);
    let html_content = ``;
    if(tags.length  > 0 ) {
         html_content = `
        <div class="col">
        <div class="d-flex justify-content-evenly" >
        <div class="chip mt-3 ">
          <a href="tag.html?tag=`+tags[0].slice(1)+`" class="text-light">`+tags[0]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
        <div class="chip mt-3 ">
          <!-- <img src="https://iexperimen.github.io/assets/icon/icon.png" alt="iExperimen" width="96" height="96"> -->
          <a href="tag.html?tag=`+tags[1].slice(1)+`"  class="text-light">`+tags[1]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
        <div class="chip mt-3">
          <!-- <img src="https://iexperimen.github.io/assets/icon/icon.png" alt="iExperimen" width="96" height="96"> -->
          <a href="tag.html?tag=`+tags[2].slice(1)+`"  class="text-light">`+tags[2]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
          
        </div>
        </div>
        <div class="col">
        <div class="d-flex justify-content-evenly">
        <div class="chip mt-3">
          <!-- <img src="https://iexperimen.github.io/assets/icon/icon.png" alt="iExperimen" width="96" height="96"> -->
          <a href="tag.html?tag=`+tags[3].slice(1)+`"  class="text-light">`+tags[3]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
        <div class="chip mt-3 ">
          <!-- <img src="https://iexperimen.github.io/assets/icon/icon.png" alt="iExperimen" width="96" height="96"> -->
          <a href="tag.html?tag=`+tags[4].slice(1)+`"  class="text-light">`+tags[4]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
        <div class="chip mt-3 ">
          <!-- <img src="https://iexperimen.github.io/assets/icon/icon.png" alt="iExperimen" width="96" height="96"> -->
          <a href="tag.html?tag=`+tags[5].slice(1)+`"  class="text-light">`+tags[5]+`</a>
          <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
          </div>
        
        </div>
        </div> 
        `
        
    }

    document.getElementById('hashtags').innerHTML = html_content;
  }
  
  fetch_tag()
  
  async function fetch_recomendent() {
    let res = await fetch(POST_API_URL+'/type/Trending', { method: 'GET' })
    let posts = await res.json() ;
    let html_content = posts?.content.map ( post =>  `
    <div class="hs mt-3"></div>
    <a href="Articles.html?id=`+post?._id+`" class="text-light">
    <div class="search-card d-flex mt-3  align-items-center">
      <img src=" `+post?.photo+`" alt="`+post?.caption+`" width="120px" height="80px">
      <div class="search-body ms-2 lh-sm">
        <span class="txt">`+post?.title+`</span>
      </div>
    </div>
    </a>
      `
      ).join('') ;
    document.getElementById('recommended').innerHTML = html_content;
  }
  
  fetch_recomendent()
  
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
      <a href="Articles.html?id=`+match?._id+`" class="text-light">
      <div class=" d-flex mt-3  align-items-center">
                <div class="image-search">
              <img src="`+ match.photo +`" alt="`+ match.caption +`" width="120px" height="80px">
              </div>
              <div class="ms-2 lh-sm">
                <span class="txt">`+ match.title +`</span>
              </div>
            </div>
            </a>
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

      if(author.status == 'success') {
        location.reload();
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
      if(author.status == 'success') {
        // add code to close modal
        localStorage.setItem('name', author.content.author.name);
        localStorage.setItem('_id', author.content.author._id);
        localStorage.setItem('email', author.content.author.email);
        localStorage.setItem('isAdmin', author.content.author.isAdmin);
        localStorage.setItem('jwt', author.content.token);
        localStorage.setItem('bookmarks', author.content.author.bookmarks);
        location.reload();
      }

  }
  function logout() {
    localStorage.clear();
    location.reload();
  }
  async function fetch_option() {

    let logedin = localStorage.getItem("email");
    console.log(logedin);
    let opt =``;
    if(logedin != null) {
        let isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin == 'true') {
            opt = `
            
            
       <li> <a class="dropdown-item text-light" href="Cards_editor.html">Write Post</a></li>
       <li> <a class="dropdown-item text-light" href="gossips.html"> Write Gossip</a></li>
       <li> <a class="dropdown-item text-light" href="billboard.html"> Add Billboard</a></li>
       <li> <a class="dropdown-item text-light" href="poll.html"> create a new Poll</a></li>
       <li> <a class="dropdown-item text-light" href="Brand_ed.html"> Add Brand</a></li>
       <li> <a class="dropdown-item text-light" href="./admin-pannel/PostAdmin.html">Post AdminPannel</a></li>
       <li> <a class="dropdown-item text-light" href="./admin-pannel/BrandAdmin.html">Brand AdminPannel</a></li>
       <li> <a class="dropdown-item text-light" href="./admin-pannel/GossipAdmin.html">Gossip AdminPannel</a></li>
       <li> <a class="dropdown-item text-light" href="./admin-pannel/BillboardAdmin.html">Billboards AdminPannel</a></li>
      <li> <a class="dropdown-item text-light" href="./admin-pannel/EditPoll.html">Edit Poll</a></li>
            `
        }
        opt = opt +`
        <li> <a class="dropdown-item text-light" href="bookmark.html"><i class="fa-regular fa-bookmark fw-bold" style="margin-right: 5px; "></i> Bookmarks</a></li>
       <li> <a class="dropdown-item text-light" onclick="logout()"> Logout</a></li>
        `
    }else {
        opt =`
        <li><a class="dropdown-item text-light mb-2" href="#" class="text-white-50 fw-bold" data-mdb-target="#exampleModal" data-mdb-toggle="modal" data-mdb-dismiss="modal" > <span class="hp">  Login</span></a></li>
        `
    }
    let html_content = `
   
  <li>
    <a class="dropdown-item text-light" href="type.html?type=Government"><i class="fa fa-thin fa-landmark  me-1 "></i> Government</a>
  </li>
  <li>
    <a class="dropdown-item text-light" href="type.html?type=Buisnesses"><i class="fa fa-duotone fa-user-tie  me-2"></i> Buisnesses</a>
  </li>
  <li>
    <a class="dropdown-item text-light ps-2" href="type.html?type=Public"><i class=" fa fa-solid fa-users me-1" style="margin-left: 7px ;"></i> Public</a>
  </li>
  <li>
    <a class="dropdown-item text-light" href="type.html?type=Humanitarian"><i class="fa fa-thin fa-hand-holding-heart " style="margin-right: 5px; "></i> Humanitarian</a>
  </li>
  <li>
    <a class="dropdown-item text-light" href="type.html?type=Sports"><i class="fa fa-thin fa-volleyball  " style="margin-right: 10px ; padding-left: 1px"></i>Sports</a>
  </li>
  <div class="ha mb-2 mt-2"></div>
  <li>
     <a class="dropdown-item text-light" href="type.html?type=Newsroom"><i class="fa-solid fa-earth me-1"></i> Newsroom</a>
  </li>
  <li>
   <a class="dropdown-item text-light" href="type.html?type=Talkshow"><i class="fa fa-thin fa-microphone me-2 " style="padding-left: 1px;"></i> Talkshow</a>
 </li>
  <div class="ha mb-2 mt-2"></div>
  
    <a class="dropdown-item text-light" href="index.html#poll"><i class="fas fa-regular fa-square-poll-vertical me-1 " style="margin-left: 2px;"></i>  Polls</a>
  </li>
  <li>
    <a class="dropdown-item text-light" href="index.html#gossip"><i class="fa-solid fa-comment me-1 " style="margin-left: 2px;"></i> Gossips</a>
  </li>
  <div class="ha mb-2 mt-2"></div>
  <li>
  <a class="dropdown-item text-light" href="">V24 SPECIALS</a>
</li>
<li>
  <div class="ha mb-2 mt-2"></div>
<li>
  <a class="dropdown-item text-light" href="type.html?type=Explains"><i class="fa fa-solid fa-circle-info me-1"></i>  Explains</a>
</li>
<li>
  <a class="dropdown-item text-light" href="type.html?type=Films"><i class="fa fa-thin fa-film me-2"></i> Films</a>
</li>
<li> 
  <a class="dropdown-item text-light" href="type.html?type=Explore"><i class="fa-solid fa-wand-magic-sparkles me-1"></i>  Explore</a>
</li>
<li>
  <a class="dropdown-item text-light" href="type.html?type=Persuit"><i class="fa-solid fa-person-running me-2"></i>  Persuit</a>
</li>
<div class="ha mb-2 mt-2"></div>
    <a class="dropdown-item text-light" href="Categories.html">  DATABASE</a>
  </li>
  <div class="ha mb-2 mt-2"></div>
  <li>
    <a class="dropdown-item text-light" href="Aboutus.html">  CONTACT US</a>
  </li>
  <div class="ha mb-2 mt-2"></div>

  `+opt+`

  
  
  
    `
    document.getElementById('navoption').innerHTML = html_content;
  }
  fetch_option()