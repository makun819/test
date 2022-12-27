"use strict";
window.onload=function(){
    const dialog=document.createElement("dialog");
    dialog.innerHTML=`
        <p>現在まだスマホ用にしか対応させていないため、pcで閲覧すると見づらくなっております。<br>ご了承ください。</p>
        <button>閉じる</button>
    `;
    const body=document.querySelector("body");
    body.appendChild(dialog);
    dialog.show();    

    const close_btn=document.querySelector("dialog button");
    close_btn.addEventListener("click" , (() => {dialog.remove()}));
}
