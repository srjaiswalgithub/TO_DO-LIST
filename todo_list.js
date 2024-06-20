const updateLS = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note)=>{
        if(note.value) notes.push(note.value);
    })
    localStorage.setItem('notes',JSON.stringify(notes));
    
}

const addnotes = (text = '')=>{
    let note = document.createElement('div');
    note.classList.add("note");
    let htmldata = `
    <div class = "operation">
       <bottom class = "editbtn"><i  class="fa-solid fa-pen-to-square fa-lg" style="color: #FFD43B;"></i></buttom>
       <buttom class = "delbtn"><i  class="fa-solid fa-trash fa-lg delbtn" style="color: #f50a0a;"></i></buttom>
    </div>
    <div class = "main ${text ?"":"hidden"}"></div>
    <textarea class = "${text ?"hidden":""}"></textarea>
    `
    note.insertAdjacentHTML("afterBegin",htmldata);
    
    //taking references
    const editbtn = note.querySelector('.editbtn');
    const delbtn = note.querySelector('.delbtn');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting
    delbtn.addEventListener("click",()=>{
        note.remove();
        updateLS();
    })
    textArea.value = text;
    main.innerHTML = text;
    // toggle
    editbtn.addEventListener("click",()=>{
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
    })
    textArea.addEventListener("change",(event)=>{
        const message = event.target.value;
        main.innerHTML = message;
        updateLS();
        console.log(message)
    })
    document.body.appendChild(note);
}
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note)=>{
        if(note)addnotes(note);
    })
}
let addbtn= document.getElementById("addbtn");
addbtn.addEventListener("click",()=>addnotes());