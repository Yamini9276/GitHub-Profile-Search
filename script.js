let api = "https://api.github.com/users/";
let main = document.getElementById("main");
let inputform = document.getElementsByClassName("inputform");
let inputbox = document.getElementById("inputBox");
let Searchbutton = document.getElementById("btn");
Searchbutton.addEventListener("click", () => {
    let user = inputbox.value.trim();
    checkname(user);
});
const checkname=async(user)=>{
   
    try {
        let res = await axios.get(api + user)
        console.log(res.data);
        usercard(res.data);
        reposFunction(user);
    }
    catch(err){
        console.log("No profile with that username");
    }
}
const usercard = (user) => {
    let id = user.name || user.login;
    let info = user.bio ? `<p>${user.bio}</p>` : "";
    console.log(id + " " + info)
    let card = `<div class="card">

     <span class="img">
     <img src="${user.avatar_url}" alt="${user.login}">
     </span>
     <span class="userinfo">
            <h2>${id}</h2>${info}<ul>
                <li>${user.followers}<strong> Followers</strong></li>
                <li>${user.following} <strong> Following</strong></li>
                <li>${user.public_repos} <strong> Repos</strong></li>
            </ul>
            
     </span>
     <div class="repos"></div>
    </div>`
    main.innerHTML=card
} 
const reposFunction=async(user)=>{
    let res = await axios.get(api + user + "/repos?sort=created");
    try {
        resposcard(res.data)
    }
    catch(err){
    
    }

}
function resposcard(repos) {
    let reposElement = document.getElementsByClassName("repos")[0];
    reposElement.innerHTML = ""; // clear old repos
    for (let i = 0; i < 5 && i < repos.length; i++){
        let repo = repos[i];
        let repoel = document.createElement("a");
        repoel.classList.add("repo");
        repoel.innerText = repo.name;
        repoel.href = repo.html_url;
        repoel.target = "_blank";
        reposElement.appendChild(repoel);
    }
    
}