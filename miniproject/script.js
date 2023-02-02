const SERVER_URL = "http://127.0.0.1:8000";

async function getPosts(){
    let response = await fetch(`${SERVER_URL}/blog/article`)
    let data = response.json();
    return data;
}

async function insertPosts(){
    let data = await getPosts();
    console.log(data);
    data.forEach((post) => {
        let div = document.getElementById('container');
        div.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
            <h1>제목 : ${post.title}</h1><br>
            <p>작성자 : ${post.author}</p><br>
            <p>내용 : ${post.content}</p><br>
            <p>카테고리 : ${post.category.id}</p><br>
            <button onclick=deletePost(${post.id})>삭제</button>
            <hr>
            <div>
        `)
    })
}
insertPosts()
const showModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein';
}
const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.animation = 'fadeout';
    setTimeout(() => modal.style.display = 'none');
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function writePost(post){
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article`,{
        method: 'POST',
        body: post,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    let data = await response.json();
    return data;
}

async function submitPost(){
    let form = document.getElementById('form');
    let formData = new FormData(form);
    let result = await writePost(formData);
    console.log(result);
}

async function deletePost(id) {
    let token = getCookie('access_token');
    let con = confirm("삭제하시겠습니까?")
    if(con == true){

        let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
            method: 'DELETE',
            headers: {      // 내가 누구인지 포함시키는것이 headers
                'Authorization': `Bearer ${token}`,
            }
        })
        if (response.status === 204){
            let post = document.getElementById(id);
            post.remove();
        }else{
            alert("본인 글만 삭제할 수 있습니다.")
        }
    }
}
