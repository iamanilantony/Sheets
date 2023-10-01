// storage

const sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    sheetRow.push({
      bold: false,
      italic: false,
      underline: false,
      alignHorizontal: "center",
      alignVertical: "center",
      fontFamily: "Roboto",
      fontSize: "16px",
      fontColor: "black",
      bgColor: "black",
      value: "",
      formula: ""
    });
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties

const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const underline = document.querySelector(".underline");
const fontSize = document.querySelector(".font-size-prop");
const fontFamily = document.querySelector(".font-family-prop");
const fontColor = document.querySelector(".font-color");
const bgColor = document.querySelector(".BGcolor-prop");
const falignment = document.querySelectorAll(".f-alignment");
const fleftalign = falignment[0];
const fcenteralign = falignment[1];
const frightalign = falignment[2];
const valignment = document.querySelectorAll(".v-alignment");
const vtopalign = falignment[0];
const vbottomalign = falignment[1];
const vcenteralign = falignment[2];

const activeColorProp = "#d1d8e0";
const inactiveColorProp = "#ecf0f1";

//Two-Way Binding
bold.addEventListener("click", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener("click", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener("click", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener("change", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

bgColor.addEventListener("change", () => {
  const address = addressBar.value;
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.bgColor = bgColor.value;
  cell.style.backgroundColor = cellProp.bgColor;
  bgColor.value = cellProp.bgColor;
});

falignment.forEach(alignElem => {
  alignElem.addEventListener("click", e => {
    const address = addressBar.value;
    const [cell, cellProp] = getCellAndCellProp(address);
    const alignment = e.target.classList[0];
    cellProp.alignHorizontal = alignment;
    cell.style.textAlign = alignment;

    switch (alignment) {
      case "left":
        fleftalign.style.backgroundColor = activeColorProp;
        fcenteralign.style.backgroundColor = inactiveColorProp;
        frightalign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        fleftalign.style.backgroundColor = inactiveColorProp;
        fcenteralign.style.backgroundColor = activeColorProp;
        frightalign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        fleftalign.style.backgroundColor = inactiveColorProp;
        fcenteralign.style.backgroundColor = inactiveColorProp;
        frightalign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

valignment.forEach(alignElem => {
  alignElem.addEventListener("click", e => {
    const address = addressBar.value;
    const [cell, cellProp] = getCellAndCellProp(address);
    const alignment = e.target.classList[0];
    cellProp.alignVertical = alignment;
    cell.style.verticalAlign = alignment;
    console.log(alignment);

    switch (alignment) {
      case "left":
        vtopalign.style.backgroundColor = activeColorProp;
        vcenteralign.style.backgroundColor = inactiveColorProp;
        vbottomalign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        vtopalign.style.backgroundColor = inactiveColorProp;
        vcenteralign.style.backgroundColor = activeColorProp;
        vbottomalign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        vtopalign.style.backgroundColor = inactiveColorProp;
        vcenteralign.style.backgroundColor = inactiveColorProp;
        vbottomalign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

document.querySelectorAll(".cell").forEach(cell => {
  addListenerToAttachCellProperties(cell);
});

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", () => {
    const address = addressBar.value;
    const [rid, cid] = decodeRIDCIDFromAddress(address);
    const cellProp = sheetDB[rid][cid];

    // Apply cell Properties
    cell.style.fontWeight = cellProp.font ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;

    // Apply properties UI Props container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch (cellProp.alignment) { // UI change (2)
      case "left":
        vtopalign.style.backgroundColor = activeColorProp;
        vcenteralign.style.backgroundColor = inactiveColorProp;
        vbottomalign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        vtopalign.style.backgroundColor = inactiveColorProp;
        vcenteralign.style.backgroundColor = activeColorProp;
        vbottomalign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        vtopalign.style.backgroundColor = inactiveColorProp;
        vcenteralign.style.backgroundColor = inactiveColorProp;
        vbottomalign.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

//helper functions
function getCellAndCellProp(address) {
  const [rId, cId] = decodeRIDCIDFromAddress(address);
  const cell = document.querySelector(`.cell[rid="${rId}"][cid="${cId}"]`);
  const cellProp = sheetDB[rId][cId];
  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  const rId = Math.abs(Number(address.slice(1))) - 1;
  const cId = Number(address.charCodeAt(0)) - 65; // "A" -> 65
  return [rId, cId];
}
