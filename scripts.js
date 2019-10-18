let database = [];

let count = 1;

function table_generator() {
  let text = '<table class="table table-bordered mt-4">';

  text += '<tr>';
  ['ID','Email','Password','Edit','Delete'].forEach((item) => {text += `<td>${item}</td>`;});
  text += '</tr>';

  database.forEach((element) => {
    text += '<tr>';
    [element['id'],element['Email'],element['Password']].forEach((item) => {text += `<td>${item}</td>`;});
    [['edit','primary'],['remove','danger']].forEach((item) => {
      text += `<td><button onclick="${item[0]}(${element['id']});" class="btn btn-${item[1]}">${item[0]}</button></td></td>`;
    });
    text += `</tr>`;
  });

  text += '</table>';

  if (database.length >= 1) {
    document.querySelectorAll('.output-container')[0].innerHTML = text;
  } else {
    document.querySelectorAll('.output-container')[0].innerHTML = "";
  }
}

function create() {
  event.preventDefault();
  let element = {
    id: count,
    Email: document.querySelectorAll('input')[0].value,
    Password: document.querySelectorAll('input')[1].value,
  };
  if (element.Email != "" && element.Password != "") {
    database.push(element);
    count++;
    document.querySelectorAll('input').forEach((input)=>{input.value = "";});
  } else {
    alert("please Fill Out Both Fields !");
  }
  table_generator();
}


function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function remove(id) {
  database.forEach((item)=> {
    if (item['id'] == id) {
      removeElement(database,item);
    }
  });
  table_generator();
}

function updateItem(id) {
  event.preventDefault();
  database.forEach((item) => {
    if (item['id'] == id) {
      let email = document.querySelectorAll('input')[0].value;
      let pass = document.querySelectorAll('input')[1].value;

      if (email != "" && pass != "") {
        database[database.indexOf(item)]['id'] = id;
        database[database.indexOf(item)]['Email'] = email;
        database[database.indexOf(item)]['Password'] = pass;
        document.querySelectorAll('#action-btn')[0].setAttribute('onclick',`create(${id});`);
        document.querySelectorAll('#action-btn')[0].innerText = "Create";
        document.querySelectorAll('input').forEach((input) => {
          input.value = "";
        });
      } else {
        alert("please Fill Out Both Fields !");
      }
    }
  });
  table_generator();
}

function edit(id) {
  database.forEach((item)=>{
    if (item['id'] == id) {
      let inp = document.querySelectorAll('input');
      inp[0].value = item['Email'];
      inp[1].value = item['Password'];
      document.querySelectorAll('#action-btn')[0].setAttribute('onclick',`updateItem(${id});`);
      document.querySelectorAll('#action-btn')[0].innerText = "Update";
    }
  });
}
