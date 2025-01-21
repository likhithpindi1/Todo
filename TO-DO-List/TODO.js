let input_text = document.querySelector(".input_text");
let addBtn = document.querySelector(".btn");
let task = document.querySelector(".task");
let ul = document.createElement("ul");

let getCount = localStorage.getItem("count");
let uniqueNumber;
if (getCount === null) {
  uniqueNumber = 0;
} else {
  uniqueNumber = parseInt(JSON.parse(getCount)) + 1;
}
ul.classList.add("ul");
task.appendChild(ul);
let dataArray = [];

let arrayLength = dataArray.length;

function delete_list(listId, list) {
  let list_length = listId.length - 1;
  let lastNumber = parseInt(listId.slice(list_length));
  let findIndex = dataArray.findIndex(function (item) {
    if (item.uniqueNo === lastNumber) {
      return true;
    } else {
      return false;
    }
  });
  dataArray.splice(findIndex, 1);
  addToLocal();
  ul.removeChild(list);
}
function addToLocal() {
  let jsonData = JSON.stringify(dataArray);
  localStorage.setItem("itemData", jsonData);
  // let localData = localStorage.getItem("itemData");
}
let getData = localStorage.getItem("itemData");
let objData = JSON.parse(getData);
if (getData !== null) {
  dataArray = objData;
  // console.log(dataArray);
}

function addLineToText(labelId, checkedId, item) {
  // let checkIdElSel = "." + checkId;
  let checkedEl = document.getElementById(checkedId);
  let listEl = document.getElementById(labelId);
  listEl.classList.toggle("addLine");
  if (item.check === true) {
    item.check = false;
    checkedEl.checked = false;
    addToLocal();
  } else {
    item.check = true;

    checkedEl.checked = true;
    addToLocal();
  }
}

function createTodoList(item) {
  let listId = "list" + item.uniqueNo;
  let checkId = "checked" + item.uniqueNo;
  let labelId = "label" + item.uniqueNo;

  let list = document.createElement("li");
  list.classList.add("list");
  ul.appendChild(list);
  list.id = listId;

  let list_div = document.createElement("div");
  list.appendChild(list_div);
  list_div.classList.add("list_div");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = checkId;
  input.classList.add("input_wh");
  list_div.appendChild(input);

  let label = document.createElement("label");
  label.classList.add("list_color");
  label.textContent = item.text;
  label.setAttribute("for", checkId);
  label.style.padding = "20px";
  label.id = labelId;
  list_div.appendChild(label);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  list.appendChild(deleteBtn);
  deleteBtn.classList.add("delete_btn");

  deleteBtn.onclick = function () {
    delete_list(listId, list);
  };

  addToLocal(listId);
  input.onclick = function () {
    addLineToText(labelId, checkId, item);
  };
  if (item.check === true) {
    label.classList.add("addLine");
    input.checked = true;
  }
}

for (let item of dataArray) {
  createTodoList(item);
}

addBtn.addEventListener("click", function (e) {
  let inputValue = input_text.value;

  let obj = { text: inputValue, uniqueNo: uniqueNumber, check: false };
  localStorage.setItem("count", JSON.stringify(uniqueNumber));
  uniqueNumber = uniqueNumber + 1;

  dataArray.push(obj);
  if (inputValue === "") {
    alert("Please provide input");
  } else {
    input_text.value = "";
    createTodoList(obj);
  }
});
