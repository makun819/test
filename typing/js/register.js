"use strict";
let score=0;
function score_register(correct,second,miss){
    score=Math.floor((correct*(Math.floor(second*100)/100))-miss);
    fetch(`add/log.php?correct=${correct}&second=${second}&miss=${miss}`,{method:"POST"});
}
const ranking_btn=document.querySelector("#ranking_btn");
ranking_btn.addEventListener("click" , get_ranking);
async function get_ranking(){
    const datas=await (await fetch("add/log.php",{method:"GET"})).json();
    const show_data_section=document.createElement("section");
    show_data_section.id="ranking_section";
    const table=document.createElement("table");
    table.innerHTML=`
        <tr><th>名前</th><th>得点</th></tr>
    `
    datas.forEach(data => {
        const tr=document.createElement("tr");
        tr.innerHTML=`
            <td>${data.name}</td><td class=${data.score === score ? "that" : ""}>${data.score}</td>
        `;
        table.appendChild(tr);
    })
    show_data_section.appendChild(table);
    document.querySelector("main").appendChild(show_data_section);
}