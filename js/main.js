const d = document,
  $root = d.querySelector("html"),
  $btns = d.querySelectorAll(".number"),
  $display = d.querySelector(".display"),
  $memory = d.querySelector(".memory"),
  $record = d.querySelector(".record");

let operation,
  changed = 0,
  A = "",
  B = "",
  result = 0;

d.addEventListener("click", (e) => {
  if (e.target.classList.contains("number") && changed == 0) {
    A = getValue(e, A);
  } else if (e.target.classList.contains("number") && changed == 1) {
    B = getValue(e, B);
  }

  if (e.target.classList.contains("dot") && changed == 0) {
    A = addDot(A);
  } else if (e.target.classList.contains("dot") && changed == 1) {
    B = addDot(B);
  }

  if (e.target.classList.contains("operation") && A != 0) {
    changed = 1;
    operation = e.target.innerText;

    $display.innerText = 0;
    $memory.innerText = A;
    $record.innerText = `${A} ${operation}`;
  }

  if (e.target.classList.contains("delete") && changed == 0) {
    A = deleteBtn();
  } else if (e.target.classList.contains("delete") && changed == 1) {
    B = deleteBtn();
  }

  if (e.target.classList.contains("reset")) {
    reset();
  }

  if (e.target.classList.contains("result") && A != 0 && B != 0) {
    switch (operation) {
      case "+":
        result = parseFloat(A) + parseFloat(B);
        reset();
        $display.innerText = valueFormated = new Intl.NumberFormat().format(
          result
        );
        break;
      case "-":
        result = parseFloat(A) - parseFloat(B);
        reset();
        $display.innerText = valueFormated = new Intl.NumberFormat().format(
          result
        );
        break;
      case "X":
        result = parseFloat(A) * parseFloat(B);
        reset();
        $display.innerText = valueFormated = new Intl.NumberFormat().format(
          result
        );
        break;
      case "/":
        result = parseFloat(A) / parseFloat(B);
        reset();
        $display.innerText = valueFormated = new Intl.NumberFormat().format(
          result
        );
        break;
    }
  }

  /* console.log("Letra A: ", A);
  console.log("Letra B: ", B);
  console.log("Cambio: ", changed); */
});

d.addEventListener("change", (e) => {
  console.log(e.target.id);

  if (e.target.id == "theme2") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme3");
    $root.classList.add("theme2");
  } else if (e.target.id == "theme3") {
    $root.classList.remove("theme1");
    $root.classList.remove("theme2");
    $root.classList.add("theme3");
  } else if (e.target.id == "theme1") {
    $root.classList.remove("theme2");
    $root.classList.remove("theme3");
    $root.classList.add("theme1");
  }
});

const addDot = (number) => {
  number += ".";
  $display.innerText = number;
  return number;
};

const getValue = (number, value) => {
  value += number.target.innerText;

  $display.innerText = new Intl.NumberFormat().format(value);
  return value;
};

const reset = () => {
  A = "";
  B = "";
  changed = 0;

  $display.innerText = "0";
  $memory.innerText = "";
  $record.innerText = "";
};

const deleteBtn = (number) => {
  number = "";
  $display.innerText = 0;
  return number;
};
