"use strict";
//loadしたタイミングでsession情報があるかをチェックし、あった場合は名前を表示
window.onload=async function(){
    const name=await (await fetch("add/data.php?action=log_check",{method:"POST"})).json();
    console.log(name);
    const name_fild=document.querySelector("#name");
    const login_info=document.querySelector("#login");
    if(name){
        name_fild.textContent="ようこそ"+name+"さん";
        login_info.textContent="logout";
        login_info.setAttribute("class","logout");
    }else{
        name_fild.textContent="ようこそゲストさん";
        login_info.textContent="login";
        login_info.setAttribute("class","login");
    }
    login_info.addEventListener("click" , skip_login_page);
}
function skip_login_page(){
    document.location.href="login/login.html";
}
const select_menu=document.querySelector("#fild ul");
select_menu.addEventListener("click" , e => {
    if(e.target.tagName === "LI"){
        if(!confirm(e.target.textContent+"にしますか？"))return;
        get_question(e.target.id);
    }
})
async function get_question(title){
    const questions=await (await fetch("add/data.php?action=get_question&type="+title,{method:"POST"})).json();
}