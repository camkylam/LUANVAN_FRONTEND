
<!--BOX Ở TRANG THỐNG KÊ-->
<template>
  <div class="row mx-2 justify-content-around">
    
    <div class="col-md-4 col-12 mb-3"  @click="emitClickEvent('partymember')"
      :class="{ 'box-active': activeBox === 'partymember' }">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'partymember' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                Số lượng Đảng viên
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800" style="font-size: 25px; text-align: center;">
                {{ partymember }}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-12 mb-3" @click="emitClickEvent('recommendation')">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'recommendation' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
              Đảng viên chưa có thư giới thiệu
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800" style="font-size: 25px; text-align: center;">
                {{ recommendation }}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 col-12 mb-3"  @click="emitClickEvent('recommendationstatus')">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'recommendationstatus' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <!-- <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                Đảng viên chưa được chấp nhận về nơi cư trú
              </div> -->
               <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                Đảng viên chưa được xác nhận thư giới thiệu
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800 mt-2" style="font-size: 25px; text-align: center;">
                {{ recommendationstatus }}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-12 mb-3"  @click="emitClickEvent('criterionEvaluation')">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'criterionEvaluation' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                TIÊU CHÍ ĐÁNH GIÁ NHẬN XÉT ĐẢNG VIÊN THEO NĂM
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-12 mb-3"  @click="emitClickEvent('commentYear')">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'commentYear' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                PHIẾU NHẬN XÉT CỦA ĐẢNG VIÊN THEO NĂM
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-12 mb-3"  @click="emitClickEvent('meet')">
      <div
      class="card border-left-primary shadow h-100 py-2"
        :class="{ 'card-active': activeBox === 'meet' }"
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="text-align: center; font-size: 17px;"
              >
                ĐẢNG VIÊN KHÔNG THAM GIA HỌP Ở CHI BỘ NƠI CƯ TRÚ THEO NĂM
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { onMounted, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Box",
  props: ["showchart", "partymember", "recommendation", "recommendationstatus", "criterionEvaluation", "commentYear","meet"],
  data() {
    return {
      activeBox: null,
    };
  },
  methods: {
    emitClickEvent(boxType) {
      console.log("Box clicked:", boxType);
      this.activeBox = boxType;
      this.$emit("boxClick", boxType);
    },
  },
  
});
</script>
<style>
.box-active {
  border: 1px bold #17a2b8;
}
.card {
  /* background-color: rgb(240, 235, 235); */
  background-color: var(--light);
  /* background-color: rgb(224, 219, 219); */
  border: 1px bold black;
}
.card-active {
  border: 2px solid #035718;
}
</style>
