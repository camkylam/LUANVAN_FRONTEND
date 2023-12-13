const role = sessionStorage.getItem("roleName");
let permissionList = sessionStorage.getItem("permissionList");
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

const isMail = () => {
  return user == "admin" || permissionList?.includes("gửi mail");
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
  return user == "admin" || permissionList?.includes("thêm phiếu xin ý kiến")
}
const signedOpinion = () => {
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
  isDeletePartyMember,
  isEditPartyMember,
  isReadPartyMember,
  isCreatePartyMember,
  
  // mail
  isMail,
  
  //thư giới thiệu
  isCreateRecommendation,
  isComfirmRecommendation,
  isAcceptRecommendation,
  //Phiếu xin ý kiến
  isComfirmOpinion,
  signedOpinion,
  comfirmComment,
  signedComment
};