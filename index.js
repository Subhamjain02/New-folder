const viewBtn = document.querySelector(".view-modal"),
      popup = document.querySelector(".popup"),
      close = popup.querySelector(".close"),
      field = popup.querySelector(".field"),
      input = field.querySelector("input"),
      copy = field.querySelector("button");

viewBtn.onclick = ()=>{
  popup.classList.toggle("show");
}
close.onclick = ()=>{
  viewBtn.click();
}

copy.onclick = ()=>{
  input.select(); //select input value
  if(document.execCommand("copy")){ //if the selected text copy
    field.classList.add("active");
    copy.innerText = "Copied";
    setTimeout(()=>{
      window.getSelection().removeAllRanges(); //remove selection from document
      field.classList.remove("active");
      copy.innerText = "Copy";
    }, 3000);
  }
}

if (window.history && window.history.pushState) {
  $('#exampleModalToggle23').on('show.bs.modal', function (e) {
      window.history.pushState('forward', null, './#modal');
  });

  $(window).on('popstate', function () {
      $('#exampleModalToggle23').modal('hide');
  });
}




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
                temp = temp + ` <div class="col-sm-4">
                <div class="card posts bg-black">
                  <span class="d-flex justify-content-start"> <h6>`+ post?.category +`</h6></span>
                  <img src="`+ post?.photo +`" class="card-img-top" alt="`+ post?.caption +`"/>
                  <div class="card-body cb bg-black">
                    <h5 class="card-title lh-sm ctitle">`+ post?.title +`</h5>
                    <p class="card-text  lh-sm ctext">`+ post?.body +`</p>
                   <span class="d-flex  ">
                    <p class="text-light www">`+ post?.likes?.length +` likes</p>
                    <p class="views www">`+ post?.views +` views</p></span>
                  <div class="btns bg-black ">
                    <div class="left">
                      <i class="fa-regular fa-heart"></i>
                      <a href="#!" class="button view-modal text-light" ><i class="fa-regular fa-paper-plane"></i></a>
                          <!-- Share modal -->
                          <div class="popup">
                            <header>
                              <span class="text-muted">Share </span>
                              <div class="close"><i class="fa fa-duotone fa-xmark"></i></div>
                            </header>
                            <div class="content">
                              <p class="text-muted">Share this link via</p>
                              <ul class="icons_1">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-whatsapp"></i></a>
                                <a href="#"><i class="fab fa-telegram-plane"></i></a>
                              </ul>
                              <p class="text-muted">Or copy link</p>
                              <div class="field text-muted">
                                  <i class="fa-solid fa-link"></i>
                                <input type="text" readonly value="example.com/share-link">
                                <button>Copy</button>
                              </div>
                            </div>
                          </div>

                          <!-- Share modal end -->
                    </div>
                    <div class="right">
                      <i class="fa-regular fa-bookmark"></i>
                  </div>
                </div>
              </div>
             </div>
            </div> 
            <div class="hr mb-4"></div>`
            }
            document.getElementById('articles').innerHTML = temp;
        })
        .catch(errorMsg => { console.log(errorMsg); });
}

fetch_posts()

