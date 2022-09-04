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
                      <a href="#!" class="text-light " data-mdb-target="#exampleModal1" data-mdb-toggle="modal" data-mdb-dismiss="modal"><i class="fa-regular fa-paper-plane"></i></a>
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

