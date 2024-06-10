let arrNhanVien = [];

// Lấy dữ liệu nhân viên
function getValue() {
  let arrField = document.querySelectorAll(
    "#formModal input,#formModal select"
  );
  let nhanVien = new NhanVien();
  let isValid = true;
  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    let parent = field.parentElement.parentElement;
    let errorField = parent.querySelector(".sp-thongbao");
    let check = checkEmptyValue(value, errorField);
    isValid &= check;
    if (check && id == "tknv") {
      isValid &= checkLengthValue(value, errorField, 4, 6);
    }
    if (check && id == "name") {
      isValid &= checkOnlyLetter(value, errorField);
    }
    if (check && id == "email") {
      isValid &= checkEmailValue(value, errorField);
    }
    if (check && id == "password") {
      isValid &= checkPasswordValue(value, errorField);
    }
    if (check && id == "luongCB") {
      isValid &= checkMinMaxValue(value, errorField, 1000000, 20000000);
    }
    if (check && id == "gioLam") {
      isValid &= checkMinMaxValue(value, errorField, 80, 200);
    }
  }
  if (isValid) {
    luongTong = nhanVien.tongLuong();
    ketQuaXepLoai = nhanVien.xepLoai();
    return nhanVien;
  }
}

// Hiển thị input lên giao diện
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let newArrNhanVien = new NhanVien();
    Object.assign(newArrNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu, ketQuaXepLoai, luongTong } =
      newArrNhanVien;
    content += `
    <tr>
    <td>${tknv}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${datepicker}</td>
    <td>${chucvu}</td>
    <td>${luongTong.toLocaleString("vi", {
      currency: "VND",
      style: "currency",
    })}</td>
    <td>${ketQuaXepLoai}</td>
    <td>
    <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
    <button onclick="getInfoNhanVien('${tknv}')" data-toggle="modal" data-target="#myModal" class="btn btn-warning">Sửa</button>
    </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

// lấy dữ liệu từ input và select
document.getElementById("formModal").onsubmit = function (event) {
  event.preventDefault();
  let nhanVien = getValue();
  if (!nhanVien) {
    return;
  }
  arrNhanVien.push(nhanVien);
  renderSaveReset();
};

// Render Save Reset
function renderSaveReset() {
  saveLocal();
  renderArrNhanVien();
  document.getElementById("formModal").reset();
}

// Lưu trữ dữ liệu xuống local storage
function saveLocal(key = "arrNhanVien", value = arrNhanVien) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu từ local storage
function getLocal(key = "arrNhanVien") {
  let arrGetLocal = localStorage.getItem(key);
  arrNhanVien = arrGetLocal ? JSON.parse(arrGetLocal) : [];
  renderArrNhanVien();
}

//Chạy hàm lấy dữ liệu
getLocal();

// Xóa dữ liệu nhân viên
function deleteNhanVien(accNV) {
  let index = arrNhanVien.findIndex((item) => item.tknv == accNV);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderArrNhanVien();
    saveLocal();
  }
}

// Lấy thông tin nhân viên
function getInfoNhanVien(accNV) {
  let nhanVien = arrNhanVien.find((item) => item.tknv == accNV);
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      "#formModal input,#formModal select"
    );
    for (let field of arrField) {
      field.value = nhanVien[field.id];
    }
    document.getElementById("tknv").readOnly = true;
  }
}

// Cập nhập thông tin nhân viên
function updateNhanVien() {
  let nhanVien = getValue();
  let index = arrNhanVien.findIndex((item) => item.tknv == nhanVien.tknv);
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
    document.getElementById("tknv").readOnly = false;
  }
}

// Chạy hàm update
document.getElementById("btnCapNhat").onclick = updateNhanVien;

// Chức năng tìm kiếm
function searchNhanVien() {
  let newKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );

  let arrNhanVienFilter = arrNhanVien.filter((item) => {
    let newTenNhanVien = removeVietnameseTones(
      item.ketQuaXepLoai.toLowerCase().trim()
    );

    return newTenNhanVien.includes(newKeyWord);
  });

  renderArrNhanVien(arrNhanVienFilter);
}

// Chạy hàm search
document.getElementById("searchName").oninput = searchNhanVien;

// Chạy hàm reset cho nút thêm (bấm nút sửa xong bấm nút thêm nó vẫn hiện thông tin)
document.getElementById("btnThem").onclick = function () {
  document.getElementById("tknv").readOnly = false;
  document.getElementById("formModal").reset();
};
