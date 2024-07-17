let cek = []
let benar = 0;
let salah = 0;
let setting = [1, 10, "+", 2];

let audio = new Audio("StockTune-Digital Joy Jamboree_1721140562.mp3")
audio.load()
audio.onended = () =>{
  audio.play()
}

function playMusic(){
  if(audio.pause()){
    audio.play()
  }
  else{
    audio.play();
  }
}


function randomMath([x, quest, operator, oper]){
  cek = []
  ///let operator = ["+","-","*","/"];
  let operand = oper*2-1;
  //console.log(operand)
  //let digit = x
  //let question = parseInt(quest)

  for(let n = 0; n < quest; n++){
    
    let tmp = []
    
    if(operator === "-"){
      for(let s = 0; s < operand; s++){
        if(s%2 == 1 && s > 0){
          tmp[s] = `+` //`${operator}`;
        }
        else {
          tmp[s] = createDigit(x);
        }
      }
      tmp = tmp.join("");
      let ubah = eval(tmp);
      tmp = tmp.split("");
      let arr = [ubah, '-', tmp[0]];
      tmp = [];
      tmp = arr;
    }
    else if(operator === "/"){
      tmp = generatePembagian(x, operand)
      tmp = tmp.join("");
      let ubah = eval(tmp);
      tmp = tmp.split("");
      let arr = [ubah, '/', tmp[0]];
      tmp = [];
      tmp = arr;
      
    }
    else{
      for(let s = 0; s < operand; s++){
        if(s%2 == 1 && s > 0){
          tmp[s] = `${operator}`;
        }
        else {
          tmp[s] = createDigit(x);
        }
      }
    }
    
    
    //console.dir(tmp)
    cek[n] = tmp
  }
  
  console.dir(cek)
}


function createDigit(x){
  let number = [0,1,2,3,4,5,6,7,8,9];
  let tmp = ""
  for(let i = 0; i < x; ++i){
      tmp += `${number[Math.floor(Math.random()*number.length)]}`
  }
  
  return tmp;
}

function generatePembagian(x,operand){
  
let tmp = []
  for(let s = 0; s < operand; s++){
        if(s%2 == 1 && s > 0){
          tmp[s] = `*`//`${operator}`;
        }
        else {
          tmp[s] = createDigit(x);
        }
      }
   console.log(tmp.join(''));
   console.log(tmp.join('').includes("0"));
   if(tmp.join('').includes('0')){
    return generatePembagian(x,operand);
   }
   else {
     return tmp;
   }
}
//let dummy = [1,10,"+",2]
///randomMath(dummy)

function setelan(){
  let pengaturan = document.getElementById("pengaturan");
  let tutup = document.getElementById("tutup");
  let jmlSoal = document.getElementById("jmlSoal");
  let simpan = document.getElementById("simpan");
  
  pengaturan.style.display = "flex"
  pengaturan.setAttribute("class","section-active");
  
  tutup.onclick = (e) =>{
    pengaturan.removeAttribute("class");
    pengaturan.style.display = "none"
  }
  
  jmlSoal.onchange = (e)=>{
    if(e.target.value < 10 || e.target.value == ""){
      e.target.value = 10;
    }
    else if(e.target.value > 100){
      e.target.value = 100;
    }
    else {
      //nothing
    }
  }
  
  simpan.onclick = (e)=>{
    let soal = document.getElementById("jmlSoal").value;
    let operator = document.getElementById("jnsOpr").value;
    let digit = document.getElementById("tingkat").value;
    
    setting = [
      parseInt(digit),
      parseInt(soal),
      `${operator}`,
      2
    ]
    
    tutup.click()
    pesan("Pengaturan permainan telah ditetapkan, silakan tekan Mulai! untuk memulai permainan.");
  }
}

function generateGame(){
  let game = document.getElementById("game");
  
  game.style.zIndex = "3";
  
  game.innerHTML = ``;
  let nomor = 0;
  cek.forEach(i => {
  let tmp = ``;
  for(let n = 0; n < i.length; ++n){
  tmp += `
      <span class="item">${i[n]}</span>
  `;
  }
  
  tmp += `
  <span class="item">=</span>
  <span class="item"><input type="number" onchange="cekJwb(this)" /></span>
  `;
    
  //console.log(i.join(''))
  game.innerHTML += `
    <div class="soal" nilai="${i.join('')}">
    <p class="number">${++nomor}</p>
      ${tmp}
      
    </div>
  `;
  })
  game.innerHTML +=`
      <button class="submit" onclick="return confirm('Apakah Anda yakin ?') ? submit() : ''">Selesai</button>
      `;
}

function play(){
  randomMath(setting);
  generateGame();
  benar = 0;
  salah = 0;
  pesan("Setiap jawaban dari soal yang dikerjakan tidak bisa diubah kembali karena jawaban setiap soal akan langsung diperiksa, mohon jawab dengan teliti. Tekan selesai, untuk mengakhiri permainan.");
}

function cekJwb(e){
  let test = e.parentNode.parentNode.getAttribute("nilai");
  let jawaban = parseInt(e.value);
  //console.log(test)
//  console.log(eval(test))
  //console.log(jawaban)
  if(eval(test) == jawaban){
    //alert("benar")
    e.type = "text"
    e.value = `${jawaban} Benar`;
    ++benar;
    e.style.background = "inherit";
    e.style.color = "#97BE5A";
    e.style.fontWeight = "bold";
    e.style.transform = "scale(1.2)";
  }
  else {
    //alert("salah")
    e.type = "text"
    e.value = `${jawaban} Salah`;
    ++salah;
    e.style.background = "inherit";
    e.style.color = "#ff0000";
    e.style.fontWeight = "bold";
    e.style.transform = "scale(1.2)";
  }
  e.setAttribute('disabled','')
}

function pesan(text){
  let isi = document.createElement("div");
  let msg = document.createElement("div");
  let ln = document.createElement("br");
  let ln2 = document.createElement("br");
  let ln3 = document.createElement("br");
  let close = document.createElement("button");
  close.textContent = "Tutup";
  isi.textContent = text;
  msg.setAttribute("class","pesan");
  close.setAttribute("class","esan");
  isi.setAttribute("class","isiPesan");
  isi.appendChild(ln)
  isi.appendChild(ln2)
  isi.appendChild(ln3)
  isi.appendChild(close)
  msg.appendChild(isi)
  
  document.body.appendChild(msg)
  
  close.onclick = ()=>{
    playMusic();
    document.body.removeChild(msg)
  }
  
}

function submit(){
  let game = document.getElementById("game")
  
  game.style.zIndex = "-1";
  game.innerHTML = ``;
  pesan(`Permainan berakhir,
  Total soal: ${cek.length},
  Jawaban benar : ${benar},
  Jawaban salah : ${salah},
  `)
  
}

pesan("Selamat Datang di Little Math!");
