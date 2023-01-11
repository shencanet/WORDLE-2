const words = [
  "aboya",
  "abria",
  "acoja",
  "acres",
  "actas",
  "acuso",
  "afeas",
  "agudo",
  "alces",
  "algas",
  "almas",
  "animo",
  "apodo",
  "aseos",
  "autos",
"cajas",
  "caraculo",
  "balas",
  "bares",
  "basca",
  "batas",
  "bates",
  "bayas",
  "Baños",
  "bebes",
  "besos",
  "bodas",
  "bonos",
  "borre",
  "botas",
  "cabra",
  "campo",
  "canas",
  "cansa",
  "capas",
  "casan",
  "casas",
  "cavas",
  "cazan",
  "cazas",
  "cebos",
  "cejas",
  "cerdo",
  "China",
  "cimas",
  "citas",
  "coces",
  "cogen",
  "coral",
  "corro",
  "cosas",
  "culta",
  "curas",
  "curso",
  "dados",
  "dagas",
  "datos",
  "deben",
  "dices",
  "edita",
  "enojo",
  "erres",
  "euros",
  "falle",
  "falta",
  "filas",
  "fugas",
  "gafas",
  "Galia",
  "galos",
  "gases",
  "gatos",
  "goles",
  "genes",
  "grave",
  "grite",
  "gritó",
  "gruas",
  "gurus",
  "habas",
  "hacha",
  "hijos",
  "hojas",
  "ideas",
  "islas",
  "Japon",
  "joyas",
  "Julio",
  "kurda",
  "kunas",
  "Kenia",
  "lacra",
  "lados",
  "Lagos",
  "lamio",
  "lapas",
  "latas",
  "lazos",
  "legos",
  "lenta",
  "Libia",
  "liras",
  "locas",
  "luces",
  "loros",
  "lomos",
  "lusas",
  "marco",
  "monte",
  "natas",
  "notas",
  "nadas",
  "nudos",
  "nabos",
  "minas",
  "mozas",
  "moras",
  "nazca",
  "mesas",
  "mangó",
  "lusos",
  "odias",
  "osito",
  "ondas",
  "rapas",
  "otras",
  "pacto",
  "ratas",
  "orcas",
  "sacos",
  "ranas",
  "vasos",
  "rotos",
  "Rusia",
  "obras",
  "amagos",
  "playa",
  "tiros",
  "patos",
  "peros",
  "pujas",
  "ovulo",
  "palma",
  "setas",
  "ácido",
  "vados",
  "regia",
  "paris",
  "ollas",



];


let resultElement = document.querySelector(".result");

let mainContainer = document.querySelector(".main-container");
let rowId = 1;

//peticion API

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7b0da1adeemsh0be3fff6a70c538p13cb17jsn5b195099a61c',
		'X-RapidAPI-Host': 'word-of-the-day2.p.rapidapi.com'
	}
};

fetch('https://word-of-the-day2.p.rapidapi.com/word/today', options)
	.then(response => response.json())
  .finally(()=>{
    let loadingElement = document.querySelector('.loading')
    loadingElement.styles.display='none';
  })
	.then(response => { data = word})

      
/*let word = data[0] || "texto";
let word = "datas";*/

let word = getRandomWord();
let wordArray = word.toUpperCase().split("");
console.log(wordArray);
let actualRow = document.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow);
addfocus(actualRow);

function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll(".square");
  squares = [...squares]; //convierte nodelist en un arreglo

  let userInput = [];

  squares.forEach((element) => {
    element.addEventListener("input", (event) => {
      console.log(event.inputType)
      //logica borra letra no rompa array
      if(event.inputType !== 'deleteContentBackward'){
              //recoger datos user
      userInput.push(event.target.value.toUpperCase());
      console.log(userInput);
      //pasar siguiente letra
      if (event.target.nextElementSibling) {
        event.target.nextElementSibling.focus();
      } else {
        //CREAR ARREGLO COMPLETO 
        let squarefilled = document.querySelectorAll('.square')
        console.log(squarefilled)


        let rightIndex = compareArrays(wordArray, userInput);
        rightIndex.forEach((element) => {
          squares[element].classList.add("green")})
         //los Arrays son iguales ha Ganado
        if (rightIndex.length == wordArray.length) {
          showResult("Ganaste");

          return}
        //CREAR NUEVA FILA

        let actualRow = createRow();
        if(!actualRow){return}

        drawSquares(actualRow);
        listenInput(actualRow);
        addfocus(actualRow);

        //CAMBIAR ESTILOS LETRA CORRECT POSICION INCORRECTA
        let existIndexArray = existLetter(wordArray, userInput);
        existIndexArray.forEach((element) => {
          squares[element].classList.add("gold")})

      }//if

      }else{
        userInput.pop();
      }


    })
  })//squares
}//funcion

function compareArrays(array1, array2) {
  let equalsIndex = [];
  array1.forEach((element, index) => {
    if (element == array2[index]) {
      equalsIndex.push(index);
      console.log(`EN LA POSICION ${index} son iguales`);
    } else {
      console.log(`EN LA POSICION ${index} no son iguales`);
    }
  });
  return equalsIndex;
}

function existLetter(array1, array2) {
  let existIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      existIndexArray.push(index);
      //console.log(`existe letra ${index}`)
    }
  });
  return existIndexArray;
}

function createRow() {
  rowId++;
  if (rowId <= 5) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.setAttribute("id", rowId);
    mainContainer.appendChild(newRow);
    return newRow;
  } else {
    showResult(`La respuesta correcta era "${word.toUpperCase()}" `);
  }
}

function drawSquares(actualRow) {
  wordArray.forEach((item, index) => {
    if (index === 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
    } else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    }
  });
}

function addfocus(actualRow) {
  let focusElement = actualRow.querySelector(".focus");
  //console.log(focusElement)
  focusElement.focus();
}

function showResult(textMsg) {
  resultElement.innerHTML = `<p>${textMsg}</p>
          <button class="button">Reiniciar</button>`;
  let resetBtn = document.querySelector(".button");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}




function getRandomWord() {
  // 0 es el mínimo del rango que puede retornar, lo dejo por si luego alguien precisa de otro número que se pueda basar
  // words.length obtiene la longitud, le restamos 1 ya que superariamos el indice del array
  // Math.floor Devuelve el máximo entero menor o igual a un número. (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/floor)
  const randomNum = Math.floor(Math.random() * (words.length - 1)) + 0;
  return words[randomNum];
}

console.log(getRandomWord());
  
