class NhanVien {
  constructor() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
    this.ketQuaXepLoai = "";
    this.luongTong = "";
  }

  // Tính tổng tiền lương
  tongLuong() {
    if (this.chucvu == "Giám đốc") {
      this.luongTong = this.luongCB * 3;
    } else if (this.chucvu == "Trưởng phòng") {
      this.luongTong = this.luongCB * 2;
    } else if (this.chucvu == "Nhân viên") {
      this.luongTong = this.luongCB * 1;
    }
    return this.luongTong * 1;
  }

  // Xếp loại nhân viên
  xepLoai() {
    if (this.gioLam < 160) {
      this.ketQuaXepLoai = "Trung bình";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      this.ketQuaXepLoai = "Khá";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      this.ketQuaXepLoai = "Giỏi";
    } else {
      this.ketQuaXepLoai = "Xuất sắc";
    }
    return this.ketQuaXepLoai;
  }
}
