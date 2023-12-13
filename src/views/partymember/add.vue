<script>
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import Select from "../../components/form/select.vue";
import Mail from "../../services/mail.service";
import PartyMember from "../../services/partymember.service";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Position from "../../services/position.service";
import PartyCell from "../../services/partycell.service";
import Role from "../../services/role.service";
import Account from "../../services/account.service";
import SelectOption from "../../components/box/select_cdu.vue";
import CtyServices from "../../services/cty_province.service";
import districtssServices from "../../services/district.service";
import wardsServices from "../../services/ward.service";
import hamletsServices from "../../services/hamlet.service";
import Swal from "sweetalert2";
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create } from "../../assets/js/common.http";
import mailService from "../../services/mail.service";

import ExcelJS from 'exceljs';
export default {
  components: {
    Select,
    SelectOption,
    Select_Advanced,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    watch(
      () => props.resetData,
      async (newValue, oldValue) => {
        await refresh_add();
      },
      { immediate: true }
      //có props
    );
    const data = reactive({
      stepList: [
        {
          _id: 1,
          name: "Thông tin",
        },
        {
          _id: 2,
          name: "Công việc, nơi sinh hoạt",
        },
        {
          _id: 3,
          name: "Tài khoản",
        },
      ],
      activeStep: 1,
      item: {
        name: "",
        birthday: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        code: "",
        dateJoin: "",
        dateOfficial: "",
        password: "",
        exemption: "false",
      },
      modelPos: "",
      modelPar: "",
      modelValue: "",
      modelDep: "",
      modelWard: "",
      modelHamlet: "",
      roles: [],
      modelRole: "",
    });

    const create = async () => {
      /**
       * * Validation input
       */
      const birthday = new Date(data.item.birthday);
      const dateJoin = new Date(data.item.dateJoin);
      const age = new Date().getFullYear() - birthday.getFullYear();
      const eighteenYearsAgo = new Date(birthday);
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() + 18);
      const dateOfficial = new Date(data.item.dateOfficial);
      const timeDifference = dateOfficial.getTime() - dateJoin.getTime();

      const email = data.item.email;
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(email)) {
        alert_error('Lỗi', 'Email không hợp lệ. Vui lòng nhập một địa chỉ email hợp lệ.');
        return;
      }
      const phoneNumber = data.item.phone;
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ.',
        });
        return;
      }
      // Tính số mili giây trong 1 năm
      const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
      // Kiểm tra xem ngày vào Đảng chính thức có lớn hơn ngày vào Đảng ít nhất 1 năm hay không
      if (timeDifference < oneYearInMilliseconds) {
        alert_error('Lỗi', 'Ngày vào Đảng chính thức phải sau ngày vào Đảng ít nhất 1 năm.');
        return;
      }
      if (dateJoin < eighteenYearsAgo) {
        alert_error('Lỗi', 'Ngày vào đảng của bạn lỗi! Bạn chưa đủ tuổi vào đảng');
        return;
      }

      /**
       * Retrive data to update, data của email
       */
      const dataMail = reactive({
        title: "Thông tin tài khoản hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường CNTT và TT",
        content: `<p><span style="text-transform: capitalize;">Trân</span> trọng gửi đến Anh/Chị <span style="text-transform: capitalize;">${data.item.name}</span></p>
                  <p><span style="text-transform: capitalize;">Dưới</span> đây là tài khoản để anh chị thực hiện đăng nhập vào hệ thống quản lý đảng viên sinh hoạt 
                    nơi cư trú của trường công nghệ thông tin và truyền thông. </p>
                    <p><span style="text-transform: capitalize;">Sau</span> khi đăng nhập vào hệ thống anh/chị thực hiện kiểm tra lại thông tin cá nhân và cập nhật lại nếu có sai sót </p>
                  <ul>
                    <li><strong>Tài khoản:</strong> ${data.item.code}</li>
                    <li><strong>Mật khẩu:</strong> ${data.item.password}</li>
                  </ul>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: data.item.email,
      });

      data.item.hamletId = selectedOptionHamlet.value;
      data.item.positionId = selectedOptionPosition.value;
      data.item.partycellId = selectedOptionPartyCell.value;
      data.item.checkUser = true;

      data.item.user_name = data.item.code;

      const account = await http_create(Account, data.item);

      if (account.user_name == true) {
        const result = await http_create(PartyMember, data.item);
        data.item.checkUser = false;

        if (!result.error) {
          data.item.PartyMemberId = result.document._id;
          const account = await http_create(Account, data.item);
          alert_success(
            `Thêm đảng viên`,
            `Đảng viên "${result.document.name}" đã được tạo thành công.`
          );
          await mailService.sendmail(dataMail);
          ctx.emit("create");

          data.item = {
            name: "",
            birthday: "",
            phone: "",
            email: "",
            address: "",
            gender: "",
            code: "",
            dateJoin: "",
            dateOfficial: "",
            exemption: "false",
          };
          data.modelValue = "";
          data.modelDep = "";
          data.modelWard = "";
          data.modelHamlet = "";
          data.modelPos = "";
          data.modelPar = "";
          data.modelRole = "";
          data.item.password = setAccount();
          await refresh();
        }
        else if (result.error) {
          alert_error(`Thêm đảng viên`, `${result.msg}`);
        }
      }
      else if (account.user_name == false) {
        alert_error(`Thêm đảng viên`, `${account.msg}`);
      }
    };

/********************************************************************** */

  // const createImportExcel = async () => {
  // console.log("aloooo")
  // const handleFileChange = (event) => {
  //   console.log("hiiii")
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const data = e.target.result;
  //       // Create a new ExcelJS workbook
  //       const workbook = new ExcelJS.Workbook();
  //       await workbook.xlsx.load(data);
  //       // Assuming the first sheet contains the data
  //       const worksheet = workbook.getWorksheet(1);
  //       // Get all cell values from the sheet
  //       const excelData = worksheet.getSheetValues();

  //       // Process the imported data as needed
  //       await handleImportedData(excelData);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const handleImportedData = async (excelData) => {
  //   // Use Promise.all to parallelize API calls
  //   await Promise.all(excelData.map(async (row) => {
  //     const importedDataItem = {
  //       code: row[0],
  //       name: row[1],
  //       birthday: row[2],
  //       address: row[3],
  //       phone: row[4],
  //       email: row[5],
  //       gender: row[6],
  //       dateJoin: row[7],
  //       dateOfficial: row[8],
  //       exemption: row[9],
  //       positionName: row[10],
  //       partycellName: row[11],
  //       ctyName: row[12],
  //       districtName: row[13],
  //       wardName: row[14],
  //       hamletName: row[15],
  //       roleName: row[16],
  //       // Add other properties as needed
  //     };
  //     importedDataItem.username = importedDataItem.code;
  //     // Automatic password generation
  //     importedDataItem.password = setAccount();

  //     // Run all API calls concurrently
  //     await createWithData(importedDataItem);
  //   }));
  // };

  // const createWithData = async (importedDataItem) => {
  //   // importedDataItem.positionId = await getIdByName('Position', importedDataItem.positionName);
  //   // importedDataItem.partycellId = await getIdByName('Partycell', importedDataItem.partycellName);
  //   // importedDataItem.hamletId = await getIdByName('Hamlet', importedDataItem.hamletName);
  //   // importedDataItem.ctyId = await getIdByName('Cty', importedDataItem.ctyName);
  //   // importedDataItem.wardId = await getIdByName('Ward', importedDataItem.wardName);
  //   // importedDataItem.districtId = await getIdByName('District', importedDataItem.districtName);
  //   // Your existing logic with the imported data
  //   const PositionName = importedDataItem.positionName
  //   const PartycellName = importedDataItem.partycellName
  //   const HamletName = importedDataItem.hamletName
  //   const CtyName = importedDataItem.ctyName
  //   const WardName = importedDataItem.wardName
  //   const DistrictName = importedDataItem.districtName
  //   const RoleName = importedDataItem.roleName

  //   importedDataItem.positionId = await Position.findIdByName({PositionName});
  //   importedDataItem.partycellId = await PartyCell.findIdByName({PartycellName});
  //   importedDataItem.ctyId = await CtyServices.findIdByName({CtyName});
  //   const idCty = importedDataItem.ctyId
  //   importedDataItem.districtId = await districtssServices.findIdByName({DistrictName, idCty})
  //   const idDis = importedDataItem.districtId
  //   importedDataItem.wardId = await wardsServices.findIdByName({WardName, idDis, idCty })
  //   const idWard = importedDataItem.wardId
  //   importedDataItem.hamletId = await hamletsServices.findIdByName({HamletName, idCty, idDis, idWard})
  //   importedDataItem.roleId = await Role.findIdByName({RoleName})


  //   const account = await http_create(Account, importedDataItem);

  //   if (account.user_name) {
  //     const result = await http_create(PartyMember, importedDataItem);

  //     if (!result.error) {
  //       // Your existing success logic
  //       alert_success(
  //         `Thêm đảng viên`,
  //         `Đảng viên "${result.document.name}" đã được tạo thành công.`
  //       );
  //       // Additional logic as needed
  //     } else {
  //       // Your existing error logic
  //       alert_error(`Thêm đảng viên`, `${result.msg}`);
  //     }
  //   } else {
  //     // Your existing error logic
  //     alert_error(`Thêm đảng viên`, `${account.msg}`);
  //   }
  // };


  // const setAccount = () => {
  //   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let password = "";

  //   for (let i = 0; i < 9; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     password += charset[randomIndex];
  //   }
  //   return password;
  // };

  // Your existing code...
  //};


    const setAccount = () => {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";

      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    };

    // ****REFRESH
    const refresh = async (name) => {
      switch (name) {
        case "position": {
          positions.position = await http_getAll(Position);
          break;
        }
        case "partycell": {
          partycells.partycell = await http_getAll(PartyCell);
          break;
        }
        case "cty": {
          ctys.cty = await http_getAll(CtyServices);
          break;
        }
        case "district": {
          districts.district = await http_getAll(districtssServices);
          break;
        }
        case "ward": {
          wards.ward = await http_getAll(wardsServices);
          break;
        }
        case "hamlet": {
          hamlets.hamlet = await http_getAll(hamletsServices);
          break;
        }
      }
    };

    //POSITION
    const positions = reactive({ position: [] });
    let selectedOptionPosition = ref("Chức vụ");
    watch(selectedOptionPosition, async (newValue, oldValue) => {
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: PositionName } = await Swal.fire({
            title: "Thêm mới chức vụ",
            input: "text",
            inputLabel: "Tên chức vụ",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên chức vụ không được bỏ trống";
              }
            },
          });

          if (PositionName) {
            const document = await Position.create({ name: PositionName });
            if (document.error) {
              alert_warning(`Đã tồn tại chức vụ `, `${PositionName}`);
              return false;
            }
            alert_success(`Đã thêm chức vụ`, `${PositionName}`);
            await refresh("position");
            data.modelPos = document.document.name;
            positions.position.push({ _id: "other", name: "khác" });
            ctx.emit("newPosition", positions.position);
            selectedOptionPosition.value = document.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionPosition.value = 0;
      }
    });

    //Partycell
    const partycells = reactive({ partycell: [] });
    let selectedOptionPartyCell = ref("Chi bộ");
    watch(selectedOptionPartyCell, async (newValue, oldValue) => {
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: PartyCellName } = await Swal.fire({
            title: "Thêm mới chi bộ",
            input: "text",
            inputLabel: "Tên chi bộ",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên chi bộ không được bỏ trống";
              }
            },
          });

          if (PartyCellName) {
            const document = await PartyCell.create({ name: PartyCellName });
            if (document.error) {
              alert_warning(`Đã tồn tại chi bộ `, `${PartyCellName}`);
              return false;
            }
            alert_success(`Đã thêm chi bộ`, `${PartyCellName}`);
            await refresh("partycell");
            data.modelPar = document.document.name;
            partycells.partycell.push({ _id: "other", name: "khác" });
            ctx.emit("newPartyCell", partycells.partycell);
            selectedOptionPartyCell.value = document.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionPartyCell.value = 0;
      }
    });

    //Cty
    const ctys = reactive({ cty: [] });
    let selectedOptionCty = ref("0");
    watch(selectedOptionCty, async (newValue, oldValue) => {
      districts.district = await districtssServices.findAllDepOfACty(newValue);
      wards.ward = [];
      districts.district.push({ _id: "other", name: "khác" });

      // Alert add cty
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: CtyName } = await Swal.fire({
            title: "Thêm mới tỉnh, thành phố",
            input: "text",
            inputLabel: "Tên tỉnh, thành phố",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên tỉnh, thành phố không được bỏ trống";
              }
            },
          });

          if (CtyName) {
            const document = await CtyServices.create({ name: CtyName });
            if (document.error) {
              alert_warning(`Đã tồn tại tỉnh, thành phố `, `${CtyName}`);
              return false;
            }
            alert_success(`Đã thêm tỉnh, thành phố`, `${CtyName}`);
            await refresh("cty");
            data.modelValue = document.document.name;
            selectedOptionCty.value = document.document._id;
            ctys.cty.push({ _id: "other", name: "khác" });
            ctx.emit("newCty", ctys.cty);
          }
          return true;
        };
        showSweetAlert();
        selectedOptionCty.value = 0;
      }
    });

    //DistrictS
    const districts = reactive({ district: [] });
    let selectedOptionDistrict = ref("Quận, huyện");
    watch(selectedOptionDistrict, async (newValue, oldValue) => {
      wards.ward = await wardsServices.findAllWardsOfADep(newValue);
      wards.ward.push({ _id: "other", name: "khác" });

      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm quận, huyện mới",
            html: `
      <select id="my-select" class="swal2-input form-control  ml-3 mx-2" style="width:92%"  >
        <option value="">Tỉnh, thành phố</option>
        ${ctys.cty
                .map(
                  (option) => `<option value="${option._id}" ${option._id == selectedOptionCty.value ? "selected" : ""}> ${option.name}</option>`
                )
                .join("")}
      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên quận, huyện">
    `,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const selectedOption = document.getElementById("my-select").value;
              const inputValue = document.getElementById("my-input").value;
              if (!selectedOption || !inputValue) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOption,
                inputValue,
              };
            },
          });

          if (formValues) {
            const document = await districtssServices.create({
              ctyProvinceId: formValues.selectedOption,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại quận, huyện `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm quận, huyện`, `${formValues.inputValue}`);
            data.modelDep = document.document.name;
            selectedOptionDistrict.value = document.document._id;
            await refresh("district");
            districts.district.push({ _id: "other", name: "khác" });
            ctx.emit("newDep", districts.district);
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionDistrict.value = 0;
      }
      districts.district = await districtssServices.findAllDepOfACty(selectedOptionCty.value);
      districts.district.push({ _id: "other", name: "khác" });
    });

    //Ward
    const wards = reactive({ ward: [], });
    let selectedOptionWard = ref("Xã, phường");
    watch(selectedOptionWard, async (newValue, oldValue) => {
      hamlets.hamlet = await hamletsServices.findAllHamletOfWard(newValue);
      hamlets.hamlet.push({ _id: "other", name: "khác" });

      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm xã, phường mới",
            html: `
      <select id="my-select-cty" class="swal2-input form-control  ml-3 mb-3 mx-2" style="width:92%">
        <option value="">Tỉnh, thành phố</option>
        ${ctys.cty
                .map(
                  (option) => `<option value="${option._id}" ${option._id == selectedOptionCty.value ? "selected" : ""} >${option.name}</option>`
                )
                .join("")
              }
      </select>
      <select id="my-select-dep" class="swal2-input form-control  ml-3  mx-2" style="width:92%" >
        <option value="">Quận, huyện</option>

      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên Xã, phường">
    `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const selectedOptionCty = document.getElementById("my-select-cty").value;
              const selectedOptionDep = document.getElementById("my-select-dep").value;

              const inputValue = document.getElementById("my-input").value;
              if (!selectedOptionCty || !inputValue || !selectedOptionDep) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOptionCty,
                selectedOptionDep,
                inputValue,
              };
            },
            didOpen: async () => {
              const cty = document.getElementById("my-select-cty");
              const dep = document.getElementById("my-select-dep");

              const ctyId = cty.value;
              districts.district = (await districtssServices.findAllDepOfACty(ctyId)) || [];

              dep.innerHTML = `
          <option value="">Quận, huyện</option>
          ${districts.district
                  .map(
                    (option) =>
                      `<option value="${option._id}" ${option._id == selectedOptionDistrict.value ? "selected" : ""}>${option.name}</option>`
                  )
                  .join("")}
        `;
              cty.addEventListener("change", async () => {
                const ctyId = cty.value;
                districts.district = (await districtssServices.findAllDepOfACty(ctyId)) || [];

                dep.innerHTML = `
                ${districts.district
                    .map(
                      (option) => `<option value="${option._id}">${option.name}</option>`
                    )
                    .join("")}
                    `;
              });
            },
          });

          if (formValues) {
            const document = await wardsServices.create({
              districtId: formValues.selectedOptionDep,
              name: formValues.inputValue,
            });

            if (document.error) {
              alert_warning(`Đã tồn tại `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm `, `${formValues.inputValue}`);

            await refresh_add();
            wards.ward.push({ _id: "other", name: "khác" });

            ctx.emit("newWard", wards.ward);
            selectedOptionWard.value = document.document._id;
            data.modelWard = document.document.name;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionWard.value = 0;
      }
      wards.ward = await wardsServices.findAllWardsOfADep(selectedOptionDistrict.value);
      wards.ward.push({ _id: "other", name: "khác" });
    });

    //Hamlet
    const hamlets = reactive({ hamlet: [], });
    let selectedOptionHamlet = ref("Khu vực, ấp");
    watch(selectedOptionHamlet, async (newValue, oldValue) => {
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm khu vực, ấp mới",
            html: `
      <select id="my-select-cty" class="swal2-input form-control ml-3 mb-3 mx-2" style="width:92%">
        <option value="">Tỉnh, thành phố</option>
        ${ctys.cty
                .map(
                  (option) => `<option value="${option._id}" ${option._id == selectedOptionCty.value ? "selected" : ""} >${option.name}</option>`
                )
                .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input form-control ml-3 mb-3 mx-2" style="width:92%" >
        <option value="">Quận, huyện</option>

      </select>
      <select id="my-select-ward" class="swal2-input form-control ml-3 mx-2" style="width:92%" >
        <option value="">Xã, phường</option>

      </select>
      <input id="my-input" class="swal2-input form-control m-3" style="width:92%" type="text" placeholder="Tên khu vực, ấp">
    `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const selectedOptionCty = document.getElementById("my-select-cty").value;
              const selectedOptionDep = document.getElementById("my-select-dep").value;
              const selectedOptionWard = document.getElementById("my-select-ward").value;
              const inputValue = document.getElementById("my-input").value;

              if (!selectedOptionCty || !selectedOptionDep || !selectedOptionWard || !inputValue) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOptionCty,
                selectedOptionDep,
                selectedOptionWard,
                inputValue,
              };
            },
            didOpen: async () => {
              const cty = document.getElementById("my-select-cty");
              const dep = document.getElementById("my-select-dep");
              const ward = document.getElementById("my-select-ward");

              const ctyId = cty.value;
              districts.district = (await districtssServices.findAllDepOfACty(ctyId)) || [];
              dep.innerHTML = `
          <option value="">Quận, huyện</option>
          ${districts.district
                  .map(
                    (option) =>
                      `<option value="${option._id}" ${option._id == selectedOptionDistrict.value ? "selected" : ""}>${option.name}</option>`
                  )
                  .join("")}`;

              const depId = dep.value
              wards.ward = (await wardsServices.findAllWardsOfADep(depId)) || []
              ward.innerHTML = `<option value="">Xã, phường</option>
              ${wards.ward
                  .map(
                    (option) => `<option value="${option._id}" ${option._id == selectedOptionWard.value ? "selected" : ""}>${option.name}</option>`
                  )
                  .join("")
                }`

              cty.addEventListener("change", async () => {
                const ctyId = cty.value;
                districts.district = (await districtssServices.findAllDepOfACty(ctyId)) || [];

                dep.innerHTML = `
                ${districts.district
                    .map(
                      (option) => `<option value="${option._id}">${option.name}</option>`
                    )
                    .join("")}`;

                ward.innerHTML = `<option value="">Xã, phường</option>`
              });

              dep.addEventListener("change", async () => {
                const depId = dep.value
                wards.ward = (await wardsServices.findAllWardsOfADep(depId)) || []

                ward.innerHTML = `
                ${wards.ward
                    .map(
                      (option) => `<option value="${option._id}">${option.name}</option>`
                    )
                    .join("")
                  }
                `
              })

            },
          });

          if (formValues) {
            const document = await hamletsServices.create({
              wardId: formValues.selectedOptionWard,
              name: formValues.inputValue,
            });

            if (document.error) {
              alert_warning(`Đã tồn tại `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm `, `${formValues.inputValue}`);

            await refresh_add();
            hamlets.hamlet.push({ _id: "other", name: "khác" });

            ctx.emit("newHamlet", hamlets.hamlet);
            selectedOptionHamlet.value = document.document._id;
            data.modelHamlet = document.document.name;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionHamlet.value = 0;
      }

      hamlets.hamlet = await hamletsServices.findAllHamletOfWard(selectedOptionWard.value);
      hamlets.hamlet.push({ _id: "other", name: "khác" });
    });

    // REFESH ADD
    const refresh_add = async () => {
      positions.position = await Position.getAll();
      positions.position.push({ _id: "other", name: "khác" });

      partycells.partycell = await PartyCell.getAll();
      partycells.partycell.push({ _id: "other", name: "khác" });

      ctys.cty = await CtyServices.getAll();
      ctys.cty.push({ _id: "other", name: "khác" });

      districts.district = await districtssServices.findAllDepOfACty(selectedOptionCty.value);
      districts.district.push({ _id: "other", name: "khác" });

      wards.ward = await wardsServices.findAllWardsOfADep(selectedOptionDistrict.value);
      wards.ward.push({ _id: "other", name: "khác" });

      hamlets.hamlet = await hamletsServices.findAllHamletOfWard(selectedOptionWard.value);
      hamlets.hamlet.push({ _id: "other", name: "khác" })
    };

    const onDeletePosition = async (value) => {
      const result = await alert_delete("Bạn muốn xóa chức vụ", value.name);
      if (result) {
        await Position.delete(value._id);

        alert_success("Bạn đã xóa chức vụ", value.name);
        await refresh_add();
        ctx.emit("newPosition", positions.position);
      }
    };

    const onDeletePartyCell = async (value) => {
      const result = await alert_delete("Bạn muốn xóa chi bộ", value.name);
      if (result) {
        await PartyCell.delete(value._id);
        alert_success("Bạn đã xóa chi bộ", value.name);
        await refresh_add();
        ctx.emit("newPartyCell", partycells.partycell);
      }
    };

    const onDeleteCty = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await CtyServices.delete(value._id);
        alert_success("Bạn đã xóa tỉnh, thành phố", value.name);
        await refresh_add();
        ctx.emit("newCty", ctys.cty);
      }
    };

    const onDeleteDep = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await districtssServices.deleteOne(value._id);
        alert_success("Bạn đã xóa", value.name);
        await refresh_add();
        ctx.emit("newDep", districts.district);
      }
    };

    const onDeleteWard = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await wardsServices.deleteOne(value._id);
        alert_success("Bạn đã xóa ", value.name);
        await refresh_add();
        ctx.emit("newWard", wards.ward);
      }
    };

    const onDeleteHamlet = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await hamletsServices.deleteOne(value._id);
        alert_success("Bạn đã xóa ", value.name);
        await refresh_add();
        ctx.emit("newHamlet", hamlets.hamlet);
      }
    };

    const closeModal = async () => {
      showModal.value = false;
      ctx.emit("refresh", false);
    };


    onMounted(async () => {
      await refresh_add();
      data.item.password = setAccount();
      data.roles = await http_getAll(Role);
    });
    return {
      data,
      create,
      //createImportExcel,
      // handleFileChange,
      positions,
      selectedOptionPosition,
      partycells,
      selectedOptionPartyCell,
      ctys,
      selectedOptionCty,
      districts,
      selectedOptionDistrict,
      wards,
      selectedOptionWard,
      hamlets,
      selectedOptionHamlet,
      refresh,
      refresh_add,
      onDeletePosition,
      onDeletePartyCell,
      onDeleteCty,
      onDeleteDep,
      onDeleteWard,
      onDeleteHamlet,
      closeModal,
    };

  },
methods: {
  // async createImportExcel() {
  //   // console.log("aloooo");
  //   const fileInput = document.getElementById('fileInput');
  //   await this.handleFileChange({ target: { files: [fileInput.files[0]] } });
  // },
  async createImportExcel() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    for (const file of files) {
        await this.readAndProcessFile(file);
    }
},


//   async handleFileChange(event) {
//   // console.log('Change event fired!');
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const data = e.target.result;
//       const arrayBuffer = ArrayBuffer.isView(data) ? data.buffer : data;
//       const workbook = new ExcelJS.Workbook();
//       await workbook.xlsx.load(arrayBuffer);
//       const worksheet = workbook.getWorksheet(1);
//       const excelData = this.getSheetValues(worksheet);
//       await this.handleImportedData(excelData);
//     };
//     reader.readAsArrayBuffer(file);
//   }
// },
async handleFileChange(event) {
    const files = event.target.files;

    for (const file of files) {
        await this.readAndProcessFile(file);
    }
},

async readAndProcessFile(file) {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
        const data = e.target.result;
        const arrayBuffer = ArrayBuffer.isView(data) ? data.buffer : data;
        const workbook = new ExcelJS.Workbook();
        
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.getWorksheet(1);
        const excelData = this.getSheetValues(worksheet);
        
        await this.handleImportedData(excelData);
    };

    reader.readAsArrayBuffer(file);
},
  arrayBufferToString(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const stringArray = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return stringArray;
  },

  getSheetValues(worksheet) {
    const values = [];
    worksheet.eachRow((row) => {
      values.push(row.values);
    });
    return values;
  },

  async handleImportedData(excelData) {
    if (!excelData || !excelData.length) {
      console.error('Không có dữ liệu hợp lệ từ file Excel.');
      return;
    }

    const dataToProcess = excelData.slice(1); // Bỏ qua dòng tiêu đề

    await Promise.all(dataToProcess.map(async (row) => {
      const importedDataItem = {
        code: row[1],
        name: row[2],
        birthday: row[3],
        address: row[4],
        phone: row[5],
        email: row[6],
        gender: row[7],
        dateJoin: row[8],
        dateOfficial: row[9],
        exemption: row[10],
        positionName: row[11],
        partycellName: row[12],
        ctyName: row[13],
        districtName: row[14],
        wardName: row[15],
        hamletName: row[16],
        roleName: row[17],
      };
      // console.log(importedDataItem.code)
      // console.log(importedDataItem.name)
      // console.log(importedDataItem.birthday)
      // console.log(importedDataItem.address)
      // console.log(importedDataItem.phone)
      // console.log(importedDataItem.email)
      // console.log(importedDataItem.dateJoin)
      // console.log(importedDataItem.dateOfficial)
      // console.log(importedDataItem.exemption)
      // console.log(importedDataItem.gender)

      //console.log(importedDataItem.name);
      console.log('Imported Data:', excelData);
      importedDataItem.username = importedDataItem.code;
      // console.log(importedDataItem.username)
      importedDataItem.password = this.setAccount();
      // console.log(importedDataItem.password)

      await this.createWithData(importedDataItem);
    }));
  },

  async createWithData(importedDataItem) {
    const PositionName = importedDataItem.positionName;
    // console.log(PositionName)
    const PartycellName = importedDataItem.partycellName;
    const HamletName = importedDataItem.hamletName;
    const CtyProvinceName = importedDataItem.ctyName;
    const WardName = importedDataItem.wardName;
    const DistrictName = importedDataItem.districtName;
    // console.log(DistrictName)
    const RoleName = importedDataItem.roleName;

    const positions = await Position.findIdByName({ PositionName });
    importedDataItem.positionId = positions.id
    // console.log(importedDataItem.positionId)

    const partycells = await PartyCell.findIdByName({ PartycellName });
    importedDataItem.partycellId = partycells.id
    // console.log(importedDataItem.partycellId)

    const hamlets = await hamletsServices.findIdByName({ HamletName, DistrictName, WardName, CtyProvinceName});
    importedDataItem.hamletId = hamlets.idHamlet
    // console.log(importedDataItem.hamletId)

    const roles = await Role.findIdByName({ RoleName });
    importedDataItem.roleId = roles.roleId
    // console.log(importedDataItem.roleId)

    
    const account = await http_create(Account, importedDataItem);
    // console.log(account)

    if (account.user_name) {
      const result = await http_create(PartyMember, importedDataItem);
      // console.log(result)

      if (!result.error) {
        alert_success(
          `Thêm đảng viên`,
          `Đảng viên "${result.document.name}" đã được tạo thành công.`
        );
      } else {
        alert_error(`Thêm đảng viên`, `${result.msg}`);
      }
    } else {
      alert_error(`Thêm đảng viên`, `${account.msg}`);
    }
  },

  setAccount() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  },
}
// methods: {
//   async createImportExcel() {
//     const fileInput = document.getElementById('fileInput');
//     const files = fileInput.files;

//     for (const file of files) {
//       await this.readAndProcessFile(file);
//     }
//   },

//   async readAndProcessFile(file) {
//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = e.target.result;
//       const arrayBuffer = ArrayBuffer.isView(data) ? data.buffer : data;
//       const workbook = new ExcelJS.Workbook();

//       await workbook.xlsx.load(arrayBuffer);
//       const worksheet = workbook.getWorksheet(1);
//       const excelData = this.getSheetValues(worksheet);

//       console.log('Read and Processed Data:', excelData);
//       await this.handleImportedData(excelData);
//     };

//     reader.readAsArrayBuffer(file);
//   },

//   arrayBufferToString(arrayBuffer) {
//     const uint8Array = new Uint8Array(arrayBuffer);
//     const stringArray = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
//     return stringArray;
//   },

//   getSheetValues(worksheet) {
//     const values = [];
//     worksheet.eachRow((row) => {
//       values.push(row.values);
//     });

//     console.log('Sheet Values:', values);
//     return values;
//   },

//   async handleImportedData(excelData) {
//     if (!excelData || !excelData.length) {
//       console.error('Không có dữ liệu hợp lệ từ file Excel.');
//       return;
//     }

//     const dataToProcess = excelData.slice(1); // Bỏ qua dòng tiêu đề

//     console.log('Data To Process:', dataToProcess);

//     await Promise.all(dataToProcess.map(async (row) => {
//       const importedDataItem = {
//         code: row[1],
//         name: row[2],
//         birthday: row[3],
//         address: row[4],
//         phone: row[5],
//         email: row[6],
//         gender: row[7],
//         dateJoin: row[8],
//         dateOfficial: row[9],
//         exemption: row[10],
//         positionName: row[11],
//         partycellName: row[12],
//         ctyName: row[13],
//         districtName: row[14],
//         wardName: row[15],
//         hamletName: row[16],
//         roleName: row[17],
//       };

//       console.log('Imported Data Item:', importedDataItem);

//       importedDataItem.username = importedDataItem.code;
//       importedDataItem.password = this.setAccount();

//       await this.createWithData(importedDataItem);
//     }));
//   },

//   async createWithData(importedDataItem) {
//     const PositionName = importedDataItem.positionName;
//     const PartycellName = importedDataItem.partycellName;
//     const HamletName = importedDataItem.hamletName;
//     const CtyProvinceName = importedDataItem.ctyName;
//     const WardName = importedDataItem.wardName;
//     const DistrictName = importedDataItem.districtName;
//     const RoleName = importedDataItem.roleName;

//     const positions = await Position.findIdByName({ PositionName });
//     importedDataItem.positionId = positions.id;

//     const partycells = await PartyCell.findIdByName({ PartycellName });
//     importedDataItem.partycellId = partycells.id;

//     const hamlets = await hamletsServices.findIdByName({ HamletName, DistrictName, WardName, CtyProvinceName});
//     importedDataItem.hamletId = hamlets.idHamlet;

//     const roles = await Role.findIdByName({ RoleName });
//     importedDataItem.roleId = roles.roleId;

//     const account = await http_create(Account, importedDataItem);

//     if (account.user_name) {
//       const result = await http_create(PartyMember, importedDataItem);

//       if (!result.error) {
//         alert_success(
//           `Thêm đảng viên`,
//           `Đảng viên "${result.document.name}" đã được tạo thành công.`
//         );
//       } else {
//         alert_error(`Thêm đảng viên`, `${result.msg}`);
//       }
//     } else {
//       alert_error(`Thêm đảng viên`, `${account.msg}`);
//     }
//   },

//   setAccount() {
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let password = "";
//     for (let i = 0; i < 9; i++) {
//       const randomIndex = Math.floor(Math.random() * charset.length);
//       password += charset[randomIndex];
//     }
//     return password;
//   },
// }


};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-form-wizard">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Thêm thông tin Đảng viên mới
          </h4>
          <button type="button" class="close" data-dismiss="modal" @click="(activeStep = 1), closeModal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="model-body">
          <p style="font-size: 20px; margin-left: 10px">Thêm Đảng viên mới bằng cách import file excel</p>
          <div class="d-flex" >
            <input type="file" accept=".xlsx" @change="handleFileChange" style="width:40%; margin-left: 25px; border: 2px;" class="btn btn-warning"/>&nbsp;
            <button @click="createImportExcel" >Thêm Đảng viên</button>
          </div>
          <hr>
          <p style="font-size: 20px; margin-left: 10px">Thêm Đảng viên mới bằng cách nhập vào ô input dưới đây</p>
          <div class="d-flex">
            <!-- steps -->
            <div class="d-flex flex-column" style="height: 100%">
              <div class="d-flex mt-3 mx-3" v-for="(value, index) in data.stepList" :key="index">
                <span @click="data.activeStep = index + 1" class="step-id px-3 py-2"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']">{{ value._id }}</span>
                <span class="d-flex align-items-center pl-3"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']">{{ value.name }}</span>
              </div>
            </div>
            <!-- form -->
            <div class="d-flex flex-grow-1 flex-column step-content px-3 my-3" style="width: 10000px">
              
              <!-- page 1 -->
              <form v-if="data.activeStep == 1" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="code">Mã số Đảng viên(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="code" name="code" v-model="data.item.code" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="name">Họ và tên(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="data.item.name" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="birthday">Ngày sinh(<span style="color: red">*</span>):</label>
                  <input type="date" class="form-control" id="birthday" name="birthday" v-model="data.item.birthday"
                    required />
                </div>

                <div class="form-group flex-grow-1">
                  <label for="address">Địa chỉ thường trú(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="address" name="address" v-model="data.item.address"
                    required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="phone">Số điện thoại(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="phone" name="phone" v-model="data.item.phone" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Email(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="data.item.email" required />

                </div>
                <div class="form-group flex-grow-1">
                  <label for="gender">Giới tính(<span style="color: red">*</span>):</label>
                  <!-- <input type="text" class="form-control" id="gender" name="gender" v-model="data.item.gender" required /> -->
                  <select class="form-control" id="gender" name="gender" v-model="data.item.gender" required>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
                <div class="form-group flex-grow-1">
                  <label for="dateJoin">Ngày vào Đảng(<span style="color: red">*</span>):</label>
                  <input type="date" class="form-control" id="dateJoin" name="dateJoin" v-model="data.item.dateJoin" />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="dateOfficial">Ngày vào Đảng chính thức</label>
                  <input type="date" class="form-control" id="dateOfficial" name="dateOfficial"
                    v-model="data.item.dateOfficial" />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="exemption">Miễn trừ(<span style="color: red">*</span>):</label>
                  <select class="form-control" id="exemption" name="exemption" v-model="data.item.exemption">
                    <option value="false" selected>Không được miễn sinh hoạt</option> <!-- Chọn "miễn trừ" là giá trị mặc định -->
                    <option value="true">Miễn sinh hoạt</option>
                  </select>
                </div>
              </form>
              <!-- page 2 -->
              <form v-if="data.activeStep == 2" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="">Chức vụ(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="positions.position" :modelValue="data.modelPos"
                      style="height: 40px" @searchSelect="async (value) => (
                        await refresh_add(),
                        (positions.position = positions.position.filter((value1, index) => {
                          return (value1.name.includes(value) || value.length == 0);
                        }))
                      )" @delete="(value) => onDeletePosition(value)"
                      @chose="(value, value1) => ((selectedOptionPosition = value), (data.modelPos = value1.name))" />
                  </div>
                </div>

                <div class="form-group flex-grow-1">
                  <label for="">Chi bộ(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="partycells.partycell" :modelValue="data.modelPar"
                      style="height: 40px" @searchSelect="async (value) => (
                        await refresh_add(),
                        (partycells.partycell = partycells.partycell.filter(
                          (value1, index) => {
                            return (value1.name.includes(value) || value.length == 0);
                          }
                        )))" @delete="(value) => onDeletePartyCell(value)"
                      @chose="(value, value1) => ((selectedOptionPartyCell = value), (data.modelPar = value1.name))" />
                  </div>
                </div>
                <p style="font-size: 20px; margin-left: 5px">Nhập vào địa chỉ sinh hoạt nơi cư trú</p>
                <div class="form-group flex-grow-1">
                  <label for="">Tỉnh, thành phố(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="ctys.cty" :modelValue="data.modelValue"
                      style="width: 100%; height: 40px" @searchSelect="async (value) => (
                        await refresh_add(),
                        (ctys.cty = ctys.cty.filter(
                          (value1, index) => {
                            return (value1.name.includes(value) || value.length == 0);
                          }
                        )))" @delete="(value) => onDeleteCty(value)"
                      @chose="(value, value1) => ((selectedOptionCty = value), (data.modelValue = value1.name))" />
                  </div>
                </div>

                <div class="form-group flex-grow-1">
                  <label for="">Quận, huyện(<span style="color: red">*</span>):</label>
                  <Select_Advanced required :options="districts.district" :modelValue="data.modelDep"
                    style="width: 100%; height: 40px" @searchSelect="async (value) => (
                      await refresh_add(),
                      (districts.district = districts.district.filter(
                        (value1, index) => {
                          return (value1.name.includes(value) || value.length == 0);
                        }
                      )))" @delete="(value) => onDeleteDep(value)"
                    @chose="(value, value1) => ((selectedOptionDistrict = value), (data.modelDep = value1.name))" />
                </div>

                <div class="form-group flex-grow-1">
                  <label for="">Xã, phường(<span style="color: red">*</span>):</label>
                  <Select_Advanced :options="wards.ward" :modelValue="data.modelWard" style="width: 100%; height: 40px"
                    @searchSelect="async (value) => (
                      await refresh_add(),
                      (wards.ward = wards.ward.filter((value1, index) => {
                        return (value1.name.includes(value) || value.length == 0);
                      })))" @delete="(value) => onDeleteWard(value)"
                    @chose="(value, value1) => ((selectedOptionWard = value), value, (data.modelWard = value1.name))" />
                </div>

                <div class="form-group flex-grow-1">
                  <label for="">Khu vực, ấp(<span style="color: red">*</span>):</label>
                  <Select_Advanced :options="hamlets.hamlet" :modelValue="data.modelHamlet"
                    style="width: 100%; height: 40px" @searchSelect="async (value) => (
                      await refresh_add(),
                      (hamlets.hamlet = hamlets.hamlet.filter((value1, index) => {
                        return (value1.name.includes(value) || value.length == 0);
                      })))" @delete="(value) => onDeleteHamlet(value)"
                    @chose="(value, value1) => ((selectedOptionHamlet = value), value, (data.modelHamlet = value1.name))" />
                </div>
              </form>

              <!-- page3 -->
              <form v-if="data.activeStep == 3" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="name">Tên tài khoản(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="data.item.code" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="birthday">Mật khẩu(<span style="color: red">*</span>):</label>
                  <input type="password" class="form-control" id="birthday" name="birthday" v-model="data.item.password"
                    required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="avatar">Vai trò(<span style="color: red">*</span>):</label>
                  <Select_Advanced required :options="data.roles" :modelValue="data.modelRole" style="height: 40px"
                    @searchSelect="async (value) => (
                      await refresh_add(),
                      (positions.position = positions.position.filter(
                        (value1, index) => { return (value1.name.includes(value) || value.length == 0) }
                      )))" @chose="(value, value1) => ((data.item.roleId = value), (data.modelRole = value1.name))" />
                </div>
                <b-button type="submit" class="btn btn-primary px-3 py-2" style="font-size: 14px" @click="create"
                  id="add">
                  <span>Thêm</span>
                </b-button>
              </form>
              <div class="d-flex justify-content-end mt-3">
                <span v-if="data.activeStep > 1 && data.activeStep <= data.stepList.length"
                  class="btn-prev d-flex align-items-center px-3 py-1 mr-3"
                  @click="data.activeStep = data.activeStep - 1">
                  <span class="material-symbols-outlined d-flex align-items-center">
                    navigate_before
                  </span>
                  Trang trước
                </span>
                <span v-if="data.activeStep >= 1 && data.activeStep < data.stepList.length"
                  class="btn-next d-flex align-items-center px-3 py-1" @click="data.activeStep = data.activeStep + 1">
                  Trang tiếp theo
                  <span class="material-symbols-outlined d-flex align-items-center">
                    navigate_next
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-id {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.step-content {
  border-left: 1px solid var(--gray);
}

input {
  width: 100%;
}

.active-step {
  color: blue;
}

.btn-next {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-next:hover {
  background-color: green;
  color: white;
}

.btn-prev {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-prev:hover {
  background-color: red;
  color: white;
}

@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 200%;
    margin-left: -50%;
  }
}
</style>
