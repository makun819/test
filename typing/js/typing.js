"use strict";
const play_section=document.querySelector("#play");
const result_display=document.querySelector("#result_display");
let b=true;
const dialog=document.createElement("dialog");

window.addEventListener("load" , start_func);
const restart_btn=document.querySelector("#restart_btn");
restart_btn.addEventListener("click" , start_func);
//開始案内のダイアログを生成
function start_func(){
    const ranking_section_check=document.querySelector("#ranking_section")
    if(ranking_section_check !== null){
        ranking_section_check.remove();
    }
    b=true;
    result_display.style.display="none";
    play_section.style.display="flex";
    dialog.textContent="Enterキーを押すとスタートします。";
    document.querySelector("body").appendChild(dialog);
    dialog.show();
}
//enterキーを押すと一秒後にタイピングの関数を呼び出す処理
document.addEventListener("click" , function(){textarea.focus()});
document.addEventListener("keydown", e => {
    if(b){
        if(e.key === "Enter"){
            dialog.remove();
            setTimeout(function(){
                //タイピングの文字列を追加する。
                get_str();
                //タイマーを動かす処理
                set_total_timer();
            },1000)
            b=false;
        }
    }
    textarea.focus();
    return;
})
//初期値に戻す
function all_reset(){
    reset_timer();
    input_display_child_remove();
    total_timer_count=total_timer;
    timer_el.style.width="0px";
    total_timer_el.textContent="";
    index=0;
    right_count=0;
    miss_count=0;
}
//文字列の削除
function input_display_child_remove(){
    if(input_display.hasChildNodes()){
        while(input_display.hasChildNodes()){
            input_display.firstChild.remove();
        }
    }
}
const random_str_url_api="https://api.quotable.io/random";
const input_display=document.querySelector("#input_display");
let spans;
//文字列を取得してsplitで分割しspanタグに格納。input_displayに追加して、spansにspanを格納
async function get_str(){
    const str=await (await fetch(random_str_url_api)).json();

    const arry_str=str.content.split("");
    input_display_child_remove();
    arry_str.forEach(str => {
        if(input_display.childElementCount >= 100)return;
        const span=document.createElement("span");
        span.classList.add("input_wait");
        span.textContent=str;
        input_display.appendChild(span);
    })
    spans=[...input_display.querySelectorAll("span")];
    set_one_frame_timer();
}
//全体のtimer処理
let total_timer=60;
let total_timer_count=total_timer;
const total_timer_el=document.querySelector("#total_timer");
function set_total_timer(){
    total_timer_el.textContent="残り"+total_timer_count+"秒";
    const timer=setInterval(function(){
        total_timer_count--;
        total_timer_el.textContent="残り"+total_timer_count+"秒";
        if(total_timer_count <= 0){
            result_page_create();
            clearInterval(timer);
            return;
        }
    },1000);
}
//結果画面の出力
const result_count={
    "right_type":document.querySelector("#right_type"),
    "second_type":document.querySelector("#second_type"),
    "miss_type":document.querySelector("#miss_type")
}
function result_page_create(){  
    play_section.style.display="none";
    
    result_count.right_type.textContent=right_count+"回";
    result_count.second_type.textContent=
    (Math.floor((miss_count+right_count)/total_timer*100)/100)+"回/秒";
    result_count.miss_type.textContent=miss_count+"回";
    
    result_display.style.display="flex";

    score_register(right_count,result_count.second_type.textContent.replace("回/秒",""),miss_count);
    all_reset();
}
//次の文字列に移動するまでのタイマー
let timer;
const timer_el=document.querySelector("#parameter");
function set_one_frame_timer(){
    const max_width=document.querySelector("#frame_timer").clientWidth;
    timer_el.style.width="0px";
    timer=setInterval(function(){
        timer_el.style.width=(timer_el.clientWidth+2)+"px";
        if(max_width <= timer_el.clientWidth){
            one_separator_reset_func();
        }
    },75)
}
//set_one_frame_timerの中のtimerをリセットする(timeoutか文字列を打ち終わったときに呼び出される)
function reset_timer(){
    clearInterval(timer);
}

let right_count=0;
let miss_count=0;
//index=現在の文字列を位置を規定
let index=0;
const textarea=document.querySelector("textarea");
textarea.addEventListener("input" , e => {
    textarea.value="";
    if(b || spans === undefined)return;
    //正解だったら
    if(spans[index].textContent === e.data){
        sound("sound/keybord.mp3");
        spans[index].classList.replace("input_wait","input");
        right_count++;
        index++;
        //最後の文字に到達したらもう一度文字列を呼び出して再開
        if(index === spans.length){
            one_separator_reset_func();
        }
    //不正解なら
    }else{
        sound("sound/miss.mp3");
        miss_count++;
        //入力を間違えていた場合pop()で最後の配列を削除
    }
})

function one_separator_reset_func(){
    index=0;
    reset_timer();
    get_str();
}
function sound(type){
    const sound=new Audio(type);
    sound.play();
    sound.currentTime=0;
}