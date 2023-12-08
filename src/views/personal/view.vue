<script>
import { watch, ref, onMounted } from "vue";

export default {
  props: {
    item: {
      type: Object,
    },
  },
  components: {
  },
  setup(props, context) {
    const isActive = ref(false);

    const handleActiveCus = () => {
      isActive.value = !isActive.value;
    };
    const isActivePartyMember = ref(true);
    const handleActivePartyMember = () => {
      isActivePartyMember.value = !isActivePartyMember.value;
    };
    const isActiveWork = ref(false);
    const handleActiveWork = () => {
      isActiveWork.value = !isActiveWork.value;
    };

    return {
      isActive,
      handleActiveCus,
      isActivePartyMember,
      handleActivePartyMember,
      isActiveWork,
      handleActiveWork,
    };
  },
};
</script>

<template>
  <div class="modal" id="model-view">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Thông tin chi tiết Đảng viên
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#personal-info"
              style="margin-bottom: 0" @click="handleActivePartyMember()">
              Thông tin cá nhân
            </button>
            <div v-if="isActivePartyMember" id="personal-info" class="my-3 border-all">
              <div class="d-flex justify-content-around row mx-3 capitalize">
                <div class="mt-3 col-6">
                  <p>
                    <span class="font-weight-bold">Mã số Đảng viên: </span>
                    {{ item.code }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Họ tên: </span>
                    {{ item.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày sinh: </span>
                    {{ item.birthday }}
                  </p>
                  <p>
                    <span class="font-weight-bold">SĐT: </span>
                    {{ item.phone }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Giới tính: </span>
                    {{ item.gender }}
                  </p>
                </div>
                <div class="mt-3 col-6">
                  <p>
                    <span class="font-weight-bold">Địa chỉ: </span>
                    {{ item.address }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Email: </span>
                    {{ item.email }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày kết nạp Đảng: </span>
                    {{ item.dateJoin }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày vào Đảng chính thức: </span>
                    {{ item.dateOfficial }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <button data-toggle="collapse" class="py-2 h6 border-none" data-target="#customer-type"
              @click="handleActiveWork()">
              Nơi sinh hoạt
            </button>
            <div v-if="isActiveWork" id="customer-type" class="collapse border-all mt-2 mb-3">
              <div class="d-flex justify-content-around align-items-center capitalize" style="height: 100px">
                <div>
                  <p>
                    <span class="font-weight-bold">Chức vụ: </span>
                    {{ item.Position.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Chức vụ: </span>
                    {{ item.PartyCell.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Tỉnh, thành phố: </span>
                    {{ item.Hamlet.Ward.District.Cty_Province.name }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="font-weight-bold">Quận, huyện: </span>
                    {{ item.Hamlet.Ward.District.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Xã, phường: </span>
                    {{ item.Hamlet.Ward.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Khu vực, ấp: </span>
                    {{ item.Hamlet.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capitalize {
    text-transform: capitalize;
  }
.border-none {
  outline: none;
  border: none;
}

.border-all {
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 200%;
    margin-left: -50%;
  }
}
</style>
