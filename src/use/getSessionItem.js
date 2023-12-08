const role = sessionStorage.getItem("roleName");
let permissionList = localStorage.getItem("permissionList");
console.log("permissionList", permissionList);
permissionList = JSON.parse(permissionList);
// console.log("permissionList", permissionList);
let user = sessionStorage.getItem("user");

//ĐẢNG VIÊN
const isDeletePartyMember = () => {
  return user == "admin" || permissionList?.includes("xóa đảng viên");
};
const isEditPartyMember = () => {
  return user == "admin" || permissionList?.includes("sửa thông tin đảng viên");
};
const isReadPartyMember = () => {
  return user == "admin" || permissionList?.includes("xem đảng viên");
};
const isCreatePartyMember = () => {
  return user == "admin" || permissionList?.includes("thêm thông tin đảng viên");
};

// Thống kê
const isReadDashboard = () => {
  return user == "admin" || permissionList?.includes("xem thống kê");
};

// Mail
const isMail = () => {
  return user == "admin" || permissionList?.includes("gửi mail");
};

// Tài khoản
const isReadAccount = () => {
  return user == "admin" || permissionList?.includes("xem tài khoản");
};

// Vai trò
const isReadRole = () => {
  return user == "admin" || permissionList?.includes("xem vai trò");
};
const isCreateRole = () => {
  return user == "admin" || permissionList?.includes("thêm vai trò");
};
const isDeleteRole = () => {
  return user == "admin" || permissionList?.includes("xóa vai trò");
};
const isSetRole = () => {
  return user == "admin" || permissionList?.includes("áp dụng vai trò");
};

// quyền
const isCreatePermission = () => {
  return user == "admin" || permissionList?.includes("thêm quyền");
};
const isDeletePermission = () => {
  return user == "admin" || permissionList?.includes("xóa quyền");
};
const isReadPermission = () => {
  return user == "admin" || permissionList?.includes("xem quyền");
};
const isSetPermission = () => {
  return user == "admin" || permissionList?.includes("áp dụng quyền");
};

//thư giới thiệu
const isCreateRecommendation = () => {
  // console.log(0, permissionList.includes("tạo thư giới thiệu"))
  return user == "admin" || permissionList?.includes("tạo thư giới thiệu")
};
const isComfirmRecommendation = () => {
  // console.log(1, permissionList.includes("xác nhận thư giới thiệu"))
  return user == "admin" || permissionList?.includes("xác nhận thư giới thiệu")
};
const isAcceptRecommendation = () => {
  // console.log(2, permissionList.includes("chấp nhận thư giới thiệu"))
  return user == "admin" || permissionList?.includes("chấp nhận thư giới thiệu")
}
//Phiếu xin ý kiến
const isComfirmOpinion = () => {
  return user == "admin" || permissionList?.includes("xác nhận phiếu xin ý kiến")
}
//Phiếu nhận xét
const comfirmComment = () => {
  return user == "admin" || permissionList?.includes("thêm phiếu nhận xét")
}
const signedComment = () => {
  return user == "admin" || permissionList?.includes("xác nhận phiếu nhận xét")
}


export {
  role,
  permissionList,
  isDeletePartyMember,
  isEditPartyMember,
  isReadPartyMember,
  isCreatePartyMember,
  // Thống kê
  isReadDashboard,
  // mail
  isMail,
  // Tài khoản
  isReadAccount,
  // vai trò
  isReadRole,
  isCreateRole,
  isDeleteRole,
  isSetRole,
  // quyền
  isCreatePermission,
  isDeletePermission,
  isReadPermission,
  isSetPermission,
  //thư giới thiệu
  isCreateRecommendation,
  isComfirmRecommendation,
  isAcceptRecommendation,
  //Phiếu xin ý kiến
  isComfirmOpinion,
  comfirmComment,
  signedComment
};