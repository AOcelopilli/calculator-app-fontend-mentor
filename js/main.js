const d = document,
  LS = window.localStorage,
  $root = d.querySelector("html"),
  $btns = d.querySelectorAll(".number"),
  $display = d.querySelector(".display"),
  $memory = d.querySelector(".memory"),
  $record = d.querySelector(".record");

let numberA = "",
  numberB = "",
  operation = "",
  result = null;

d.addEventListener("DOMContentLoaded", (e) => {
  /* themes */
  if (LS.getItem("theme") === "1") {
    $root.classList.remove("theme2");
    $root.classList.remove("theme3");
    $root.classList.add("theme1");
  } else if (LS.getItem("theme") === "2") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme3");
    $root.classList.add("theme2");
  } else if (LS.getItem("theme") === "3") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme2");
    $root.classList.add("theme3");
  }

  /* records */
  numberA = LS.getItem("numberA") || "";
  numberB = LS.getItem("numberB") || "";
  operation = LS.getItem("operation") || "";
  result = LS.getItem("result") || null;

  if (numberA && !operation && !numberB && !result) {
    numberA = LS.getItem("numberA");
    $display.innerText = numberA;
  } else if (numberA && operation && !numberB && !result) {
    $display.innerText = 0;
    $memory.innerText = numberA;
    $record.innerText = `${numberA} ${operation}`;
  } else if (numberA && operation && numberB && !result) {
    $display.innerText = numberB;
    $memory.innerText = numberA;
    $record.innerText = `${numberA} ${operation}`;
  } else if (!numberA && !operation && !numberB && result) {
    result = LS.getItem("result");
    $display.innerText = result;
  }
});

d.addEventListener("change", (e) => {
  if (e.target.id == "theme2") {
    LS.setItem("theme", "2");
  } else if (e.target.id == "theme3") {
    LS.setItem("theme", "3");
  } else if (e.target.id == "theme1") {
    LS.setItem("theme", "1");
  }

  if (LS.getItem("theme") === "1") {
    $root.classList.remove("theme2");
    $root.classList.remove("theme3");
    $root.classList.add("theme1");
  } else if (LS.getItem("theme") === "2") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme3");
    $root.classList.add("theme2");
  } else if (LS.getItem("theme") === "3") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme2");
    $root.classList.add("theme3");
  }
});

d.addEventListener("click", (e) => {
  if (e.target.classList.contains("number") && !operation) {
    numberA = formatNumber(e, numberA);
    LS.setItem("numberA", numberA);
    $display.innerText = numberA;
  } else if (e.target.classList.contains("number") && operation) {
    numberB = formatNumber(e, numberB);
    LS.setItem("numberB", numberB);
    $display.innerText = numberB;
  }

  if (e.target.classList.contains("dot") && !operation) {
    numberA = addDot(numberA);
  } else if (e.target.classList.contains("dot") && operation) {
    numberB = addDot(numberB);
  }

  if (e.target.classList.contains("operation") && !operation) {
    operation = e.target.innerText;

    $display.innerText = "0";
    $memory.innerText = numberA;
    $record.innerText = `${numberA} ${operation}`;

    LS.setItem("operation", operation);
  }

  if (e.target.classList.contains("reset")) {
    reset();
  }

  if (e.target.classList.contains("delete")) {
    if (!operation) {
      numberA = "";
      LS.setItem("numberA", "");
      $display.innerText = "0";
    } else {
      numberB = "";
      LS.setItem("numberB", "");
      $display.innerText = "0";
    }
  }

  if (
    e.target.classList.contains("result") &&
    numberA !== "" &&
    numberB !== ""
  ) {
    getResult(numberA, operation, numberB);
  }
});

const formatNumber = (key, number) => {
  let valueFormated;

  number += key.target.innerText;
  valueFormated = new Intl.NumberFormat().format(parseFloat(number));

  return valueFormated;
};

const addDot = (number) => {
  if (number.includes(".")) {
    return number;
  }

  number += ".";
  $display.innerText = number;
  /* valueFormated = new Intl.NumberFormat().format(parseFloat(number)); */
  return number;
};

const reset = () => {
  (numberA = ""), (numberB = ""), (operation = ""), (result = null);
  LS.setItem("numberA", ""),
    LS.setItem("numberB", ""),
    LS.setItem("operation", ""),
    LS.setItem("result", "");

  $display.innerText = "0";
  $memory.innerText = "";
  $record.innerText = "";
};

const getResult = (A, operation, B) => {
  switch (operation) {
    case "+":
      total = parseFloat(A) + parseFloat(B);
      break;
    case "-":
      total = parseFloat(A) - parseFloat(B);
      break;
    case "*":
      total = parseFloat(A) * parseFloat(B);
      break;
    case "/":
      total = parseFloat(A) / parseFloat(B);
      break;
  }

  reset();

  $display.innerText = total;
  LS.setItem("result", total);
};
