for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.querySelector(`.cell[rid='${i}'][cid='${j}']`);
    cell.addEventListener("blur", () => {
      const address = addressBar.value;
      const [cell, cellProp] = getCellAndCellProp(address);
      const value = cell.innerText;
      if (value === cellProp.value) return;
      cellProp.value = value;
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}

formulaBar.addEventListener("keydown", async e => {
  const inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    const address = addressBar.value;
    const [cell, cellProp] = getCellAndCellProp(address);
    if (cellProp.formula === inputFormula) return;
    removeChildFromParent(cellProp.formula);
    const value = evaluateFormula(inputFormula);
    setCellUIAndCellProp(value, inputFormula, address);
    addChildToParent(inputFormula);
    updateChildrenCells(address);
  }
});

function updateChildrenCells(parentAddress) {
  const [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  parentCellProp.children.forEach(child => {
    const [childCell, childCellProp] = getCellAndCellProp(child);
    const Childformula = childCellProp.formula;
    const evaluatedValue = evaluateFormula(Childformula);
    setCellUIAndCellProp(evaluatedValue, Childformula, child);
    updateChildrenCells(child);
  });
}

function addChildToParent(formula) {
  const childAddress = addressBar.value;
  const encodedFormula = formula.split(" ");
  encodedFormula.forEach(element => {
    let asciiValue = element.charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      const [parentCell, parentCellProp] = getCellAndCellProp(element);
      parentCellProp.children.push(childAddress);
    }
  });
}

function removeChildFromParent(formula) {
  const childAddress = addressBar.value;
  const encodedFormula = formula.split(" ");
  encodedFormula.forEach(element => {
    let asciiValue = element.charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      const [parentCell, parentCellProp] = getCellAndCellProp(element);
      const index = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(index, 1);
    }
  });
}

function evaluateFormula(formula) {
  const encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    console.log(asciiValue);
    if (asciiValue >= 65 && asciiValue <= 90) {
      const [parentCell, parentCellProp] = getCellAndCellProp(
        encodedFormula[i]
      );
      encodedFormula[i] = parentCellProp.value;
    }
  }
  const decodedFormula = encodedFormula.join(" ");
  console.log(decodedFormula);
  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  const [cell, cellProp] = getCellAndCellProp(address);
  cell.innerText = evaluatedValue;
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
