

function displayPosts() {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post,index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML= `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Posted on :${post.timestamp}</small>
        <button onclick="LikePOST(${index})">❤️Like(${post.Likes})</button>
        <br>
        <button onclick="deletePost(${index})">delete</button>
        <button onclick="editPost(${index})">edit</button>
        <hr>
        `;

        blogContainer.appendChild(postElement);

    });
}

function deletePost(index){
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
     posts.splice(index, 1);

    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();

};

let currenteditIndex = null;

function editPost(index){

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;

    currenteditIndex = index;


}

function LikePOST(index){
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].Likes += 1;
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

const themeToggle = document.getElementById('themeToggle');


if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});



const title_input = document.getElementById('title');
const content_input = document.getElementById('content');

document.getElementById('blogForm').addEventListener('submit', function(event){
    event.preventDefault();

    const title = title_input.value.trim();
    const content = content_input.value.trim();
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (title && content) {
        if (currenteditIndex !== null) {
            posts[currenteditIndex] = {
                title,
                content,
                timestamp: posts[currenteditIndex].timestamp, 
                Likes: posts[currenteditIndex].Likes 
            };
            currenteditIndex = null;
        } else {
            posts.push({ title, content, timestamp: new Date().toLocaleString(), Likes: 0 });
        }
    
        localStorage.setItem('posts', JSON.stringify(posts));
        blogForm.reset();
        displayPosts();
    }
});

function searchPosts() {
    const searchquery = document.getElementById('search').value.toLowerCase();
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchquery) ||
        post.content.toLowerCase().includes(searchquery)
    );

    filteredPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted on: ${post.timestamp}</small>
            <br>
            <button onclick="LikePOST(${index})">❤️ Like (${post.Likes})</button> 
            <button onclick="deletePost(${index})">Delete</button>
            
            <hr>
        `;

        blogContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', displayPosts);
