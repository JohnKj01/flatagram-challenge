const flatgramProjectAPI = `http://localhost:3000/images/1`
const commentList = document.getElementById(`comments-list`)
const cardTitle = document.getElementById("card-title")
const likeCount = document.getElementById("like-count")
const cardImage = document.getElementById("card-image")

let likes;
// declaring the server API
function addComment(event){
    event.preventDefault();
    const commentText=event.target.comment.value;
    renderComment({content:commentText});
    event.target.reset();
}

document.getElementById("like-button").addEventListener("click", () => {
    likes += 1;
    renderLikes();
});
function renderLikes() {
    document.getElementById("like-count").textContent=`${likes} likes`;
}
document.getElementById("comment-form").addEventListener("submit",addComment)
fetch(flatgramProjectAPI)
    .then((res) => res.json())
    .then(renderGram);
//obtaining data using fetch and converting json to image
function renderGram(data) {
    gramData = data;
    likes=data.likes;
    cardImage.src = data.image;
    cardTitle.textContent = data.title;
    renderLikes();
    //associating DOM content with database
    renderComments(data.comments);
}
function renderComment(comment) {
    const li = document.createElement("li")
    li.textContent = comment.content
    commentList.append(li);
}
function renderComments(comments) {
    commentList.innerHTML = "";
    comments.forEach(renderComment);
    //function for rendering comments
}

