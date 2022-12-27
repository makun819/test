"use strict";
const form=document.querySelector("form");
form.addEventListener("submit",result_login,this);
async function result_login(e){
    e.preventDefault();
    const user_name=form.querySelector("[name='user_name']");
    const password=form.querySelector("[name='user_password']");
    const data=new FormData();
    data.append("name",user_name.value);
    data.append("password",password.value);
    const result=await (await fetch("../add/data.php?action=login",{method:"POST",body:data})).json();
    console.log(result);
}