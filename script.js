const saves_n = document.getElementById("saves");
const naziv_Pripreme = document.getElementById("nazivPripreme");
const mailovi_TO = document.getElementById("mailoviTO");
const mailovi_CC = document.getElementById("mailoviCC");
const mailovi_BCC = document.getElementById("mailoviBCC");
const email_TO = document.getElementById("emailTO");
const email_CC = document.getElementById("emailCC");
const email_BCC = document.getElementById("emailBCC");
const subject_n = document.getElementById("subject");
const tekst_n = document.getElementById("tekst");
const mail_send = document.getElementById("mail");

let mailAdressTo = [];
let mailAdressCc = [];
let mailAdressBcc = [];

let mailSubject = [];
let mailTekst = [];

let clickName = "";
let clickID = "";

//postavke
function prikazivanjeTO() {
  mailAdressTo.forEach(prikazTO);
  mailovi_TO.innerHTML = `${mailAdressTo.map(prikazTO)}`;
}
function prikazivanjeCC() {
  mailAdressCc.forEach(prikazCC);
  mailovi_CC.innerHTML = `${mailAdressCc.map(prikazCC)}`;
}
function prikazivanjeBCC() {
  mailAdressBcc.forEach(prikazBCC);
  mailovi_BCC.innerHTML = `${mailAdressBcc.map(prikazBCC)}`;
}
function prikazivanjeSUBJECT() {
  subject_n.value = mailSubject;
}
function prikazivanjeTEKST() {
  tekst_n.value = mailTekst;
}
//prikaz postavke
prikazivanjeTO();
prikazivanjeCC();
prikazivanjeBCC();
prikazivanjeSUBJECT();
prikazivanjeTEKST();

subject_n.addEventListener("change", () => {
  x = subject_n.value;
  mailSubject = x;
});
tekst_n.addEventListener("change", () => {
  z = tekst_n.value;
  mailTekst = z;
});

function prikazTO(num, index) {
  return (
    num +
    `<span  class="brisac" id=${index} onclick="obrisiTO(this.id)"><i class="fa fa-close"></i></span>`
  );
}
function prikazCC(num, index) {
  return (
    num +
    `<span  class="brisac" id=${index} onclick="obrisiCC(this.id)"><i class="fa fa-close"></i></span>`
  );
}
function prikazBCC(num, index) {
  return (
    num +
    `<span  class="brisac" id=${index} onclick="obrisiBCC(this.id)"><i class="fa fa-close"></i></span>`
  );
}

//isprazni polja
function isprazniPolja() {
  naziv_Pripreme.value = "";
  mailovi_TO.innerHTML = "";
  mailovi_CC.innerHTML = "";
  mailovi_BCC.innerHTML = "";
  subject_n.value = "";
  tekst_n.value = "";
  email_TO.value = "";
  email_CC.value = "";
  email_BCC.value = "";
}

//LOCAL STORAGE

let snimljeno = [];

function ubacivanjeUStorage() {
  localStorage.setItem("s", JSON.stringify(snimljeno));
}

function izbacivanjeStorage() {
  localStorage.removeItem("s");
}

function prikazSnimljenog() {
  var x = JSON.parse(localStorage.getItem("s"));

  if (!x || x.length === 0) {
    saves_n.innerHTML = "<h2>You don't have any settings saved!</h2>";
    izbacivanjeStorage();
    mailAdressTo = [];
    mailAdressCc = [];
    mailAdressBcc = [];
  } else {
    snimljeno = x;
    uuu = snimljeno.map((num, index) => {
      return `<button class="${num}" id="${index}" onclick="selektuj(this.className,this.id)">${num}</button>`;
    });
    saves_n.innerHTML = uuu;
  }
}

function selektuj(clicked_className, clicked_id) {
  clickName = clicked_className;
  clickID = clicked_id;
  displayItem();
  naziv_Pripreme.value = clicked_className;
  email_TO.value = "";
  email_CC.value = "";
  email_BCC.value = "";
}

window.addEventListener("DOMContentLoaded", prikazSnimljenog());

function createItem() {
  if (naziv_Pripreme.value == "") {
    alert("Must enter name");
  } else {
    const nazivPripreme = naziv_Pripreme.value;

    const skladiste = {
      storage1: mailAdressTo,
      storage2: mailAdressCc,
      storage3: mailAdressBcc,
      storage4: mailSubject,
      storage5: mailTekst,
    };
    localStorage.setItem(nazivPripreme, JSON.stringify(skladiste));

    //push snimljeno ako vec ne postoji u array snimljeno sa tim imenom//
    if (snimljeno.indexOf(nazivPripreme) !== -1) {
    } else {
      snimljeno.push(nazivPripreme);
    }
    naziv_Pripreme.value = "";
    ubacivanjeUStorage();
    prikazSnimljenog();
  }
}

function deleteItem() {
  if (naziv_Pripreme.value == "") {
    alert("Must select email setting for deleting");
  } else {
    const i = clickName;
    const u = clickID;
    localStorage.removeItem(i);
    snimljeno.splice(u, 1);
    ubacivanjeUStorage();
    prikazSnimljenog();
    isprazniPolja();
  }
}

function displayItem() {
  const i = clickName;
  var x = JSON.parse(localStorage.getItem(i));

  mailAdressTo = x.storage1;
  prikazivanjeTO();

  mailAdressCc = x.storage2;
  prikazivanjeCC();

  mailAdressBcc = x.storage3;
  prikazivanjeBCC();

  mailSubject = x.storage4;
  prikazivanjeSUBJECT();

  mailTekst = x.storage5;
  prikazivanjeTEKST();
}

//brisanje mailova iz array i prikaz nakon brisanja
function obrisiTO(clicked_id) {
  const clickedId = clicked_id;
  mailAdressTo.splice(clickedId, 1);
  prikazivanjeTO();
}

function obrisiCC(clicked_id) {
  const clickedId = clicked_id;
  mailAdressCc.splice(clickedId, 1);
  prikazivanjeCC();
}

function obrisiBCC(clicked_id) {
  const clickedId = clicked_id;
  mailAdressBcc.splice(clickedId, 1);
  prikazivanjeBCC();
}

//dodavanje u array i prikaz nakon dodavanja
function dodajTO() {
  const x = email_TO.value;
  mailAdressTo.push(x);
  prikazivanjeTO();
}

function dodajCC() {
  const x = email_CC.value;
  mailAdressCc.push(x);
  prikazivanjeCC();
}

function dodajBCC() {
  const x = email_BCC.value;
  mailAdressBcc.push(x);
  prikazivanjeBCC();
}
//ovo je kod da bi se u textarea ubacivao line break jer jedino tako moze u mailito-na enter dodaje %0D%0A u tekst maila
tekst_n.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    tekst_n.value += "%0D%0A";
  }
});

//ubacivanje u <a id="mail"> href
function SendMail() {
  mail_send.addEventListener("click", () => {
    let subject = subject_n.value;
    let tekst = tekst_n.value;

    let to = "";
    mailAdressTo.forEach(myFunction1);
    let cc = "";
    mailAdressCc.forEach(myFunction2);
    let bcc = "";
    mailAdressBcc.forEach(myFunction3);

    function myFunction1(value, index) {
      to += value + ";";
    }
    function myFunction2(value, index) {
      cc += value + ";";
    }
    function myFunction3(value, index) {
      bcc += value + ";";
    }

    mail_send.href = `mailto:${to}?cc=${cc} &bcc=${bcc} &subject=${subject} &body=${tekst}`;
  });
}
SendMail();

//full screen on mobile
function hideAddressBar() {
  if (!window.location.hash) {
    if (document.height < window.outerHeight) {
      document.body.style.height = window.outerHeight + 50 + "px";
    }

    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 50);
  }
}

window.addEventListener("load", function () {
  if (!window.pageYOffset) {
    hideAddressBar();
  }
});
window.addEventListener("orientationchange", hideAddressBar);
