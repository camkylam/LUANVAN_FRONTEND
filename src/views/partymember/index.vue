<script>
import Mail from "../../components/box/mail.vue";
import mailService from "../../services/mail.service";
import Table from "../../components/table/table_partymember_all.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import Add from "./add.vue";
import Edit from "./edit.vue";
import View from "./view.vue";

import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import postionService from "../../services/position.service";
import partycellService from "../../services/partycell.service";
import partymemberService from "../../services/partymember.service";
import ctyService from "../../services/cty_province.service";
import districtsServices from "../../services/district.service";
import wardsServices from "../../services/ward.service";
import Swal from "sweetalert2";

import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import SelectCDU from "../../components/box/select_cdu.vue";
import { partymemberModel } from '../../assets/js/models'

export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    DeleteAll,
    Edit,
    View,
   
    Add,
    Mail,
   
    SelectCDU,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        partymemberModel,
      ],
      viewValue: partymemberModel,
      info: partymemberModel,
      entryValue: 30,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeEdit: false,
      editValue: {},
      cty: {},
      district: {},
      ward: {},
      position: {},
      partycell: {},
      selectAll: [{ checked: false }],
      showActiveEdit: false,
      showActiveAdd: false,
      showAdd: false,
      showFilt: false,
      showEdit: false,
      resetDataAdd: false,
    });

    const _idPartyMember = sessionStorage.getItem("partymemberId");
    data.showAdd = (_idPartyMember) ? false : true;
    data.showFilt = (_idPartyMember) ? false : true;
    data.showEdit = (_idPartyMember) ? false : true;

    const view = async (value) => {
      // FIND ONE PartyMember
      data.viewValue = await partymemberService.get(value);
      data.viewValue.birthday = formatDate(data.viewValue.birthday);
    };

    const add = () => {
      data.showActiveAdd = (_idPartyMember) ? false : true;
    };

    // search
    const toString = computed(() => searchData(data.choseSearch, data.items));
    const filter = computed(() => updateItems(data.items, toString, data.searchText))
    const filtered = computed(() => {
      const result = updateRows(data.searchText, data.items, filter)
      data.totalRow = result.totalRow
      return result.items
    })
    const totalPages = computed(() => setNumberOfPages(filtered.value.length, data.entryValue))
    const setPages = computed(() => setPagination(data, totalPages, filtered))

    // ENTRY
    const entryValuePartyCell = ref("");
    const entryNamePartyCell = ref("Chi bộ");
    const entryValuePosition = ref("");
    const entryNamePosition = ref("Chức vụ");
    const entryValueCty = ref("");
    const entryNameCty = ref("Tỉnh, thành phố");
    const entryValueDistrict = ref("");
    const entryNameDistrict = ref("Quận, huyện");
    const entryValueWard = ref("");
    const entryNameWard = ref("Xã, phường");

    //FRESH
    const refresh = async () => {
      if (_idPartyMember) {
        data.info = await http_getOne(partymemberService, _idPartyMember);

        let cellIds = []
        const roleName = sessionStorage.getItem('roleName')
        if (roleName == "bí thư chi bộ trường cnnt và tt") {
          cellIds.push(data.info.PartyCell._id) // Value 2
        }
        else if (roleName == "đảng ủy, chi ủy cơ sở trường cntt và tt") {
          cellIds = [
            "07b75908-48b0-4263-b3ae-9ed7eac664be", // Value 1
            "3ea8567e-fe68-4b49-8050-8b9ca9c2253a",
            "8e84339f-8533-4b28-8c23-832cbbaaeb96",
            "c5c5580f-fa96-4394-95c4-71a9b798355d",
            "44723cb0-5124-4f30-b4a6-14667a91a8f4",
            "070b0e1d-2c32-4dab-ada3-66dec7c487b1",
            "4d1a2515-1039-420e-a408-39606aa105ee",
            "d296cb19-b11c-463e-9989-7be19e729b06",
            "be9f8e33-43e5-4e20-a4cb-4d67b81819b3",
            "aa8471f4-4e53-457b-b234-f14957e79e6c"
          ]
        }

        data.items = await partymemberService.getAllByCell({ cellIds })
        for (let value of data.items) {
          value.checked = false;
        }
      }
      else {
        data.items = await http_getAll(partymemberService);
        for (let value of data.items) {
          value.checked = false;
        }

        data.position = await http_getAll(postionService);
        data.cty = await ctyService.getAll();

        if (entryValueCty.value != "") {
          data.district = await districtsServices.findAllDepOfACty(
            entryValueCty.value
          );
          data.district = data.district.map((value, index) => {
            return {
              ...value,
              value: value._id,
            };
          });
        } else {
          data.district = [];
        }
        if (entryValueDistrict.value != "") {
          data.ward = await wardsServices.findAllWardsOfADep(
            entryValueDistrict.value
          );
          data.ward = data.ward.map((value, index) => {
            return {
              ...value,
              value: value._id,
            };
          });
        } else {
          data.ward = [];
        }

        data.position = data.position.map((value, index) => {
          return {
            ...value,
            value: value._id,
          };
        });
        data.cty = data.cty.map((value, index) => {
          return {
            ...value,
            value: value._id,
          };
        });

        // ***
        entryNamePosition.value = "Chức vụ";
        entryValuePosition.value = "";
        entryNameCty.value = "Tỉnh, thành phố";
        entryValueCty.value = "";
        entryNameDistrict.value = "Quận, huyện";
        entryValueDistrict.value = "";
        entryNameWard.value = "Xã, phường";
        entryValueWard.value = "";

        //***thay đổi
        for (let value of data.items) {
          for (let array of arrayCheck.data) {
            if (array._id == value._id) {
              value.checked = true;
              break;
            }
            value.checked = false;
          }
        }
      }

      data.selectAll[0].checked = false;
    };
    const router = useRouter();

    // watch
    const activeMenu = ref(1);
    // methods
    const create = async () => {
      await refresh();
    };

    const edit = async (editValue) => {
      const result = await http_update(partymemberService, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa Đảng viên`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa Đảng viên`, `${result.msg}`);
      }
    };

    // ******LỌC ******
    //POSITION
    watch(entryValuePosition, async (newValue, oldValue) => {
      if (newValue == "") {
        data.currentPage = 1;
        await refresh();
        return;
      }
      data.currentPage = 1;

      data.items = await http_getAll(partymemberService);
      //1.lấy danh sách đảng viên chức vụ x
      if (entryValuePosition.value.length > 0) {
        data.items = data.items.filter((val) => {
          return val.Position._id == entryValuePosition.value;
        });
      }
      if (
        entryValueCty.value != "" &&
        entryValueDistrict.value != "" &&
        entryValueDistrict.value != "1" &&
        entryValueWard.value != "" &&
        entryValueWard.value != "1"
      ) {
        data.items = data.items.filter((value) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value &&
            value.Hamlet.Ward._id == entryValueWard.value
          );
        });
      }
      //2. chọn 1 Tỉnh, thành phố và 1 quận, huyện
      else if (
        entryValueCty.value != "" &&
        entryValueDistrict.value != "" &&
        entryValueDistrict.value != "1"
      ) {
        data.items = data.items.filter((value) => {
          return (
            value.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Ward.District._id == entryValueDistrict.value
          );
        });
      } else if (entryValueCty.value != "") {
        data.items = data.items.filter((val) => {
          return (
            val.Ward.District.Cty_Province._id == entryValueCty.value
          );
        });
      }
      //Thay đổi
      data.selectAll[0].checked = false;
      for (let value of data.items) {
        value.checked = false;
      }
      for (let value of data.items) {
        for (let array of arrayCheck.data) {
          if (array._id == value._id) {
            value.checked = true;
            break;
          }
          value.checked = false;
        }
      }
    });
    const updateEntryValuePosition = (value) => {
      entryValuePosition.value = value;
    };

    //  Cty
    watch(entryValueCty, async (newValue, oldValue) => {
      if (newValue == "") {
        data.currentPage = 1;
        await refresh();
        return;
      }
      data.currentPage = 1;
      entryValueDistrict.value = "1"; //id
      entryNameDistrict.value = "Quận, huyện"; //name
      entryValueWard.value = "1"; //id
      entryNameWard.value = "Xã, phường"; //name
      //Lấy tất cả đảng viên
      data.items = await http_getAll(partymemberService);
      //Lấy tất cả quận, huyện của 1 Tỉnh, thành phố

      data.district = await districtsServices.findAllDepOfACty(newValue);

      data.district = data.district.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });

      data.ward = [];

      data.ward = data.ward.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });

      //Lọc
      // 1. có chức vụ và Tỉnh, thành phố
      if (entryValueCty.value != "" && entryValuePosition.value != "") {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Position._id == entryValuePosition.value
          );
        });
      }
      //2.  chỉ có Tỉnh, thành phố
      else {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value
          );
        });
      }
      data.selectAll[0].checked = false;
      for (let value of data.items) {
        value.checked = false;
      }
      for (let value of data.items) {
        for (let array of arrayCheck.data) {
          if (array._id == value._id) {
            value.checked = true;
            break;
          }
          value.checked = false;
        }
      }
    });
    const updateEntryValueCty = (value) => {
      entryValueCty.value = value;
    };

    //DEP
    watch(entryValueDistrict, async (newValue, oldValue) => {
      if (newValue == "") {
        data.currentPage = 1;
        await refresh();
        return;
      } else if (newValue == "1") {
        return;
      }
      data.currentPage = 1;
      entryValueWard.value = "1"; //id
      entryNameWard.value = "Xã, phường"; //name

      //Lấy tất cả nhân vien
      data.items = await http_getAll(partymemberService);
      //Lấy tất cả xã, phường của 1 quận, huyện
      data.ward = await wardsServices.findAllWardsOfADep(newValue);
      data.ward = data.ward.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      //Lọc
      //1. có Tỉnh, thành phố, quận, huyện, chức vụ
      if (entryValuePosition.value != "") {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value &&
            value.Position._id == entryValuePosition.value
          );
        });
      }
      // 2. có Tỉnh, thành phố và quận, huyện
      else {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value
          );
        });
      }
      //Thay đổi
      for (let value of data.items) {
        value.checked = false;
      }
      for (let value of data.items) {
        for (let array of arrayCheck.data) {
          if (array._id == value._id) {
            value.checked = true;
            break;
          }
          value.checked = false;
        }
      }
    });
    const updateEntryValueDistrict = (value) => {
      entryValueDistrict.value = value;
    };

    //Ward
    watch(entryValueWard, async (newValue, oldValue) => {
      if (newValue == "") {
        data.currentPage = 1;
        await refresh();
        return;
      } else if (newValue == "1") {
        return;
      }
      data.currentPage = 1;
      data.items = await http_getAll(partymemberService);
      //filter
      //1.  position
      if (entryValuePosition.value != "") {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value &&
            value.Position._id == entryValuePosition.value &&
            value.Hamlet.Ward._id == entryValueWard.value
          );
        });
      }
      //2. cty,district, Ward
      else {
        data.items = data.items.filter((value, index) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value &&
            value.Hamlet.Ward._id == entryValueWard.value
          );
        });
      }
      //Thay đổi
      data.selectAll[0].checked = false;
      for (let value of data.items) {
        value.checked = false;
      }
      for (let value of data.items) {
        for (let array of arrayCheck.data) {
          if (array._id == value._id) {
            value.checked = true;
            break;
          }
          value.checked = false;
        }
      }
    });
    const updateEntryValueWard = (value) => {
      entryValueWard.value = value;
    };

    //SelectAll
    //***
    const arrayCheck = reactive({ data: [] });

    const handleSelectAll = (value) => {
      arrayCheck.data = [];
      if (value == false) {
        for (let value1 of data.items) {
          value1.checked = true;
          arrayCheck.data.push(value1);
        }
      } else {
        for (let value1 of data.items) {
          value1.checked = false;
          const index = arrayCheck.data.indexOf(value1._id);
          if (index !== -1) {
            arrayCheck.data.splice(index, 1);
          }
        }
      }
    };
    const handleSelectOne = (id, item) => {
      if (item.checked == false) {
        arrayCheck.data.push(item);
      } else {
        arrayCheck.data = arrayCheck.data.filter((value, index) => {
          return value._id != id;
        });
      }
      data.selectAll[0].checked = false;
    };

    // HANDLE DELETE
    const handleDelete = async (id, item) => {
      const isConfirmed = await alert_delete(
        "Xóa",
        `Bạn có chắc là xóa đảng viên <span style="color: blue;"> ${item.name} </span> không!!`
      );
      if (isConfirmed) {
        const rsPartyMember = await http_deleteOne(partymemberService, id);

        if (rsPartyMember.error) {
          alert_error("Lỗi ", rsPartyMember.msg);
        } else {
          refresh();
          alert_success("Thành công", "Xóa đảng viên thành công");
        }
      }
    };
    const deleteMany = async () => {
      try {
        //Mảng đảng viên sẽ xóa
        // const deleteArray = data.items.filter((value, index) => {
        //   return value.checked == true;
        // });
        if (arrayCheck.data.length == 0) {
          alert_warning("Bạn chưa chọn đảng viên", "");
          return;
        }
        let contentAlert = `
          <p>Bạn có muốn xoá tất cả đảng viên này không?</p>
          <p>Tổng số đảng viên sẽ xoá là:
            <span style="color: blue;">${arrayCheck.data.length}</span>
          </p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Tên đảng viên</th>
                <th>Chức vụ</th>
                <th>Xã, phường</th>
              </tr>
            </thead> 
            <tbody>`;
        for (let value of arrayCheck.data) {
          contentAlert += `<tr>
            <td>${value.name}</td>
            <td>${value.Position.name}</td>
            <td> ${value.Ward.name}</td>
          </tr>`;
        }
        contentAlert += `</tbody> </table>`;
        const isConfirmed = await alert_delete_wide(`Xoá nhiều đảng viên`, contentAlert);
        if (isConfirmed) {
          let checkDeleteAll = false;
          for (let valueDelete of arrayCheck.data) {
            const rsPartyMember = await http_deleteOne(partymemberService, valueDelete._id);
            if (rsPartyMember.error) {
              alert_error("Lỗi ", rsPartyMember.msg);
              checkDeleteAll = false;
            } else {
              checkDeleteAll = true;
            }
          }
          if (checkDeleteAll) {
            refresh();
            alert_success("Thành công", "Xóa đảng viên thành công");
            arrayCheck.data = [];
          }
        }
      } catch (error) {
        // console.log(error);
      }
    };

    // ***
    const updateCty = async (value) => {
      data.cty = await ctyService.getAll();
      data.cty = data.cty.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
    };
    const updateDistrict = async (value) => {
      if (entryValueCty.value != "") {
        data.district = await districtsServices.findAllDepOfACty(
          entryValueCty.value
        );
        data.district = data.district.map((value, index) => {
          return {
            ...value,
            value: value._id,
          };
        });
      }

      // data.district = value;
    };
    const updateWard = async (value) => {
      if (entryValueDistrict.value != "") {
        data.ward = await wardsServices.findAllWardsOfADep(
          entryValueDistrict.value
        );
        data.ward = data.ward.map((value, index) => {
          return {
            ...value,
            value: value._id,
          };
        });
      }
    };
    const updatePosition = async (value) => {
      data.position = await Position.getAll();
      data.position = data.position.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
    };

    const updatePartyCell = async (value) => {
      data.partycell = await partycellService.getAll();
      data.partycell = data.partycell.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
    };

    const mail = ref(false);
    const showMail = () => {
      const count = data.items.filter(
        (element) => element.checked === true
      ).length;

      if (count > 0) {
        mail.value = true;
      } else {
        mail.value = false;
        alert_warning("Bạn chưa chọn đảng viên", "");
      }
    };
    const sendEmail = async (value) => {
      const dataMail = reactive({ title: "", content: "", mail: "" });
      dataMail.title = value.title;
      dataMail.content = value.content;

      let timerInterval;
      Swal.fire({
        title: "Mail đang gửi",
        html: "Bạn vui lòng đợi <b></b> mili giây.",
        timer: arrayCheck.data.length * 2100,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });

      for (let i = 0; i < arrayCheck.data.length; i++) {
        if (arrayCheck.data[i].checked == true) {
          try {
            dataMail.mail = arrayCheck.data[i].email;
            await mailService.sendmail(dataMail);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
        await refresh();
      }
      alert_success("Mail đã được gửi", "");
    };

    onBeforeMount(async () => {
      await refresh();
    });

    return {
      data,
      setPages,
      activeMenu,
      create,
      edit,
      refresh,
      sendEmail,
      updateCty,
      updateDistrict,
      updateWard,
      updatePosition,
      updatePartyCell,
      mail,
      showMail,
      view,
      add,

      entryValuePartyCell,
      entryNamePartyCell,
      entryValuePosition,
      entryNamePosition,
      entryValueCty,
      entryNameCty,
      entryValueDistrict,
      entryNameDistrict,
      entryValueWard,
      entryNameWard,

      updateEntryValuePosition,
      updateEntryValueCty,
      updateEntryValueDistrict,
      updateEntryValueWard,

      handleDelete,
      deleteMany,
      handleSelectAll,
      handleSelectOne,
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2">
    <div v-if='!data.showFilt' class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">
        DANH SÁCH ĐẢNG VIÊN
      </span>
    </div>
    <div v-if='data.showFilt' class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6">Lọc Đảng viên</span>
      <div class="d-flex mx-3">
        <div class="form-group w-100 mr-2">
          <Select :title="`Chức vụ`" :entryValue="entryNamePosition" :options="data.position" @update:entryValue="(value, value1) =>
            (updateEntryValuePosition(value), (entryNamePosition = value1.name))"
            @refresh="(entryNamePosition = 'Chọn chức vụ'), updateEntryValuePosition(''), (data.currentPage = 1)"
            style="height: 35px" />
        </div>
        <div class="form-group w-100 mr-2">
          <Select :title="`Tỉnh, thành phố`" :entryValue="entryNameCty" :options="data.cty" @update:entryValue="(value, value1) =>
            (updateEntryValueCty(value), (entryNameCty = value1.name))
            " @refresh="(entryNameCty = 'Chọn Tỉnh, thành phố'), updateEntryValueCty(''), (data.currentPage = 1)"
            style="height: 35px" />
        </div>
        <!-- Quận, huyện -->
        <div class="form-group w-100 mr-2">
          <Select :title="`Quận, huyện`" :entryValue="entryNameDistrict" :options="data.district" @update:entryValue="(value, value1) =>
            (updateEntryValueDistrict(value), (entryNameDistrict = value1.name))"
            @refresh=" (entryNameDistrict = 'Chọn Quận, huyện'), updateEntryValueDistrict(''), (data.currentPage = 1)"
            style="height: 35px" />
        </div>
        <div class="form-group w-100">
          <Select :title="`Xã, phường`" :entryValue="entryNameWard" :options="data.ward" @update:entryValue="(value, value1) =>
            (updateEntryValueWard(value), (entryNameWard = value1.name))
            " @refresh="(entryNameWard = 'Chọn Xã, phường'), updateEntryValueWard(''), (data.currentPage = 1)"
            style="height: 35px" />
        </div>
      </div>
    </div>

    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <!-- <Select class="d-flex justify-content-start" :options="[
          { name: 5, value: 5 },
          { name: 10, value: 10 },
          { name: 20, value: 20 },
          { name: 30, value: 30 },
        ]" style="width: 125px" :title="`Số bản ghi`" @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue" @refresh="(data.entryValue = 'All'), (data.currentPage = 1)" /> -->

        <Search class="ml-3" style="width: 300px" @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText"
          @choseSearch="async (value) => ((data.choseSearch = value), (data.currentPage = 1))"
          @refresh="(data.entryValue = 'All'), (data.currentPage = 1)" :options="[
            {
              _id: 'name',
              name: 'Tìm kiếm theo tên',
            },
            {
              _id: 'email',
              name: 'Tìm kiếm theo email',
            },
            {
              _id: 'phone',
              name: 'Tìm kiếm theo số điện thoại',
            },
            {
              _id: 'partycell',
              name: 'Tìm kiếm theo chi bộ',
            },
          ]" />
      </div>
      <div class="d-flex align-items-start">
        <button type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-form-mail"
          @click="showMail">
          <span class="mx-2" style="color: white">Mail</span>
        </button>
        <Mail v-if="mail" @sendEmail="(value) => sendEmail(value)"></Mail>
        <button type="button" class="btn btn-danger mr-3" data-toggle="modal" data-target="#model-delete-all"
          @click="deleteMany()">
          <span id="delete-all" class="mx-2"><span class="size-16">Xoá</span></span>
        </button>
        <button v-if="data.showAdd" type="button" class="btn btn-primary" data-toggle="modal"
          data-target="#model-form-wizard" @click="(data.resetDataAdd = true), add()">
          <span id="add" class="mx-2">Thêm</span>
        </button>
        <Add v-if="data.showActiveAdd" :resetData="data.resetDataAdd" @create="(data.resetDataAdd = false), create()"
          @newPosition="(value) => { updatePosition(value) }" @newPartyCell="(value) => { updatePartyCell(value) }"
          @newCty="(value) => { updateCty(value) }" @newDep="(value) => updateDistrict(value)"
          @newWard="(value) => updateWard(value)" @refresh="async () => {
            await refresh();
            data.showActiveAdd = false;
          }" />
      </div>
    </div>
    <!-- Table -->
    <Table :showEdit="data.showEdit" :items="setPages" :fields="[
      'Tên',
      'Mã Đảng viên',
      'Email',
      'Giới tính',
      'Chức vụ',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" :selectAll="data.selectAll" :startRow="data.startRow" @selectAll="(value) => handleSelectAll(value)"
      @selectOne="(id, item) => handleSelectOne(id, item)" @delete="handleDelete" @edit="(value, value1) => (
        (data.editValue = value),
        (data.activeEdit = value1),
        (data.showActiveEdit = true)
      )" @view="(value) => { view(value) }" />

    <!-- Pagination -->
    <Pagination :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
      :endRow="data.endRow" :currentPage="data.currentPage" @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3" />

    <Edit v-if="data.showActiveEdit" :item="data.editValue" :class="[data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="data.activeEdit = false" :position="data.items.positionId" :partycell="data.items.partycellId"
      :ward="data.items.wardId" @edit="edit(data.editValue)" @refresh="async () => {
        await refresh();
        data.showActiveEdit = false;
      }" />

    <View :item="data.viewValue" />
  </div>
</template>

<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}

.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}

.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}

.active-menu {
  color: blue;
}

.none-active-menu {
  color: var(--dark);
}

.border-hr {
  border-top: 1px solid var(--gray);
}

#add,
#delete-all {
  font-size: 14px;
}

.form-control {
  background-color: inherit;
  border: 1px solid var(--gray);
}

@media screen and (max-width: 739px) {
  .select {
    width: 90px;
  }

  .search {
    width: 210px;
    margin-left: 2px !important;
    margin-right: 2px;
  }

  .border-box {
    width: 1000px;
    margin-right: 50px !important;
  }

  .menu {
    padding: 0;
  }
}

@media screen and (max-width: 992px) {
  .select {
    width: 90px;
  }

  .search {
    width: 210px;
    margin-left: 2px !important;
    margin-right: 2px;
  }

  .border-box {
    width: 100%;
    margin-left: 10px;
  }
}
</style>
