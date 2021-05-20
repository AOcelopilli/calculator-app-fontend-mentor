const d = document,
  $btns = d.querySelectorAll(".number"),
  $display = d.querySelector(".display"),
  $memory = d.querySelector(".memory"),
  $record = d.querySelector(".record");

let valueA = "",
  valueB = "",
  operation,
  changed = 0,
  A = 0,
  B = 0,
  result = 0;

d.addEventListener("click", (e) => {
  if (e.target.classList.contains("number") && changed == 0) {
    valueA += e.target.innerText;
    A = new Intl.NumberFormat().format(valueA);
    $display.innerText = A;
  } else if (e.target.classList.contains("number") && changed == 1) {
    valueB += e.target.innerText;
    B = new Intl.NumberFormat().format(valueB);
    console.log(B);
    $display.innerText = B;
  }

  if (e.target.classList.contains("dot") && changed == 0) {
    valueA += ".";
    A = new Intl.NumberFormat().format(valueA);
    $display.innerText = A;
  } else if (e.target.classList.contains("dot") && changed == 1) {
    valueB += ".";
    B = new Intl.NumberFormat().format(valueB);
    $display.innerText = B;
  }

  if (e.target.classList.contains("operation") && A != 0) {
    changed = 1;
    operation = e.target.innerText;

    $display.innerText = 0;
    $memory.innerText = A;
    $record.innerText = `${A} ${operation}`;
  }

  if (e.target.classList.contains("delete") && changed == 0) {
    valueA = 0;
    $display.innerText = 0;
  } else if (e.target.classList.contains("delete") && changed == 1) {
    valueB = 0;
    $display.innerText = 0;
  }

  if (e.target.classList.contains("reset")) {
    valueA = "";
    valueB = "";
    A = 0;
    B = 0;
    changed = 0;

    $display.innerText = "0";
    $memory.innerText = "";
    $record.innerText = "";
  }

  if (e.target.classList.contains("result") && A != 0 && B != 0) {
    switch (operation) {
      case "+":
        result = parseFloat(A) + parseFloat(B);
        $memory.innerText = "";
        $record.innerText = "";
        $display.innerText = result;
        break;
      case "-":
        result = parseFloat(A) - parseFloat(B);
        $memory.innerText = "";
        $record.innerText = "";
        $display.innerText = result;
        break;
      case "X":
        result = parseFloat(A) * parseFloat(B);
        $memory.innerText = "";
        $record.innerText = "";
        $display.innerText = result;
        break;
      case "/":
        result = parseFloat(A) / parseFloat(B);
        $memory.innerText = "";
        $record.innerText = "";
        $display.innerText = result;
        break;
    }
  }

  console.log("Letra A: ", A);
  console.log("Letra B: ", B);
});
