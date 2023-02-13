const campName = document.querySelector("#name");
const campNum = document.querySelector("#number");
const campMouth = document.querySelector("#mouth");
const campYear = document.querySelector("#year");
const campCVC = document.querySelector("#cvc");
const form = document.querySelector("form");
const content = document.querySelector(".content");
const success = document.querySelector(".success");

// cartão
const cardInfo = document.querySelector(".card-info");
const num = document.querySelector(".card-num");
const cvc = document.querySelector(".card2");
const cardMonth = document.querySelector("#Cmonth");
const cardYear = document.querySelector("#Cyear");
// Button
const button = document.querySelector("#btnConfirm");

let confirm = [false, false, false, false];

//onkeypress="return event.charCode >= 48 && event.charCode <= 57"

const onylNumberInput = (evt) => {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  //var regex = /^[0-9.,]+$/;
  var regex = /^[0-9.]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};

campNum.addEventListener("keypress", onylNumberInput);
campMouth.addEventListener("keypress", onylNumberInput);
campYear.addEventListener("keypress", onylNumberInput);
campCVC.addEventListener("keypress", onylNumberInput);

const handleButton = (e) => {
  e.preventDefault();

  // Inserindo o nome do dono
  if (campName.value != "") {
    cardInfo.children[0].children[0].innerHTML = campName.value;
    campName.parentNode.children[2].style.visibility = "hidden";

    confirm[0] = true;
  } else {
    campName.parentNode.children[2].style.visibility = "visible";
    confirm[0] = false;
  }

  // Inserindo a data de expiração
  if (campMouth.value != "" && campYear.value != "") {
    console.log("Chegamos aqui");
    cardMonth.innerHTML = campMouth.value;
    cardYear.innerHTML = campYear.value;
    campMouth.parentNode.parentNode.children[2].style.visibility = "hidden";
    confirm[1] = true;
  } else {
    campMouth.parentNode.parentNode.children[2].style.visibility = "visible";
    confirm[1] = false;
  }

  // Inserindo o cvc
  if (campCVC.value != "") {
    cvc.children[0].innerHTML = campCVC.value;
    campCVC.parentNode.children[2].style.visibility = "hidden";
    confirm[2] = true;
  } else {
    campCVC.parentNode.children[2].style.visibility = "visible";
    confirm[2] = false;
  }

  // Inserindo o numero do cartão
  let arrayNum = campNum.value.split(" ");
  // Passando para number

  if (campNum.value.length != 19) {
    campNum.parentNode.children[2].style.visibility = "visible";
    confirm[3] = false;
  } else {
    campNum.parentNode.children[2].style.visibility = "hidden";

    for (let i = 0; i < 4; i++) {
      num.children[i].children[0].innerHTML = arrayNum[i];
      confirm[3] = true;
    }
  }

  if ((((confirm[0] == confirm[1]) == confirm[2]) == confirm[3]) && confirm[3] === true) {
    console.log("Chegamos aqui");
    // Fechar o formulário

    form.style.display = 'none'

    // Criar uma nova tela
    success.innerHTML = `
        <img src="images/icon-complete.svg" alt="Complete">
        <h2>Thank you!</h2>
        <p>We've added your card datails</p>
        <button id='btnContinue'>Continue</button>
    `;

    success.style.display = "flex"

    const btnContinue = document.querySelector("#btnContinue");
    btnContinue.addEventListener("click", () => {
      success.innerHTML = '';
      form.style.display = 'flex';

      // Limpando os campos
      campName.value = '';
      campNum.value = '';
      campMouth.value = '';
      campYear.value = '';
      campCVC.value = '';
      
    })
  }else {
    console.log("Não chegamos aqui");
  }
};

button.addEventListener("click", handleButton);

campNum.addEventListener("keyup", (e) => {
  let tam = e.target.value.length;

  switch (tam) {
    case 4:
    case 9:
    case 14:
      e.target.value += " ";

    default:
      break;
  }
});
