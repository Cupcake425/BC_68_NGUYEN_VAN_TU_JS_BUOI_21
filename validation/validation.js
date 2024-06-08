// Kiểm tra dữ liệu rỗng
function checkEmptyValue(value, errorField) {
  // Thực hiện kiểm tra lỗi cho người dùng
  if (!value) {
    //Trường hợp bị lỗi
    errorField.style.display = "block";
    errorField.innerHTML = "Vui lòng ko bỏ trống chỗ này";
    return false;
  } else {
    // Trường hợp ko bị lỗi
    errorField.innerHTML = "";
    return true;
  }
}

// Kiểm tra min max
function checkMinMaxValue(value, errorField, min, max) {
  if (min <= value && value <= max) {
    // Trường hợp dữ liệu nằm trong số lượng từ quy định
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.style.display = "block";
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong khoảng từ ${min} đến ${max}`;
    return false;
  }
}

// Kiểm tra length
function checkLengthValue(value, errorField, min, max) {
  if (min <= value.length && value.length <= max) {
    // Trường hợp dữ liệu nằm trong số lượng từ quy định
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.style.display = "block";
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong khoảng từ ${min} đến ${max}`;
    return false;
  }
}

// Kiểm tra email
function checkEmailValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Sử dụng chuỗi regex để kiểm tra email
  let isValid = regexEmail.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.style.display = "block";
    errorField.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}

// Kiểm tra mật khẩu
function checkPasswordValue(value, errorField) {
  let regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  let isValid = regexPassword.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.style.display = "block";
    errorField.innerHTML =
      "Mật khẩu từ 6-10 ký tự, phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự in thường , 1 ký tự đặc biệt";
    return false;
  }
}

// Kiểm tra dữ liệu chỉ có chữ cái và space
function checkOnlyLetter(value, errorField) {
  let regexLetter = /^[a-zA-Z\s]*$/;
  let isValid = regexLetter.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.style.display = "block";
    errorField.innerHTML = "Tên chỉ được chứa chữ cái";
    return false;
  }
}
