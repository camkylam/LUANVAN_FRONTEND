<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center vh-100" style="
        background-image: linear-gradient(rgba(0.5, 0.5, 0.5, 0.7), rgba(0.5, 0.5, 0.5, 0.7)),url(https://img4.thuthuatphanmem.vn/uploads/2020/07/05/nen-background-dang-dep_034747506.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;">
      <div class="d-flex">
        <div class="card shadow bg-bray" style="background: #216079; margin-top: 30px;">
          <div class="card-body p-5">
            <h5 class="card-title text-center mb-2">
              <img src="./assets/images/coDangtungbay.jpg" alt=""
                style="width: 250px; margin-top: -20px; margin-bottom: 20px;" />
            </h5>
            <h3 class="text-center mb-4" style="font-weight: bold; color: white; ">
              ĐĂNG NHẬP
            </h3>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="text" class="form-label" style="font-weight: bold; color: white; margin-bottom: 15px">
                  Tên Tài Khoản(<span style="color: red">*</span>):
                </label>
                <input v-model="user_name" type="text" class="form-control" id="user_name" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label" style="
                    font-weight: bold;
                    color: white;
                    margin-bottom: 15px;
                    margin-top: 10px;
                  ">
                  Mật Khẩu(<span style="color: red">*</span>):
                </label>
                <div class="input-group">
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                    required />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa" :class="{
                        'fa-eye': showPassword,
                        'fa-eye-slash': !showPassword,
                      }" @click="togglePasswordVisibility" style="cursor: pointer"></i>
                    </span>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100"
                style="font-weight: bold; margin-top: 30px; width: 50%;">
                Đăng Nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { alert_error, alert_success } from "./assets/js/common.alert";

export default {
  setup() {
    const showPassword = ref(false);
    const user_name = ref("");
    const password = ref("");
    const router = useRouter();
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    // Xử lý sự kiện đăng nhập
    const login = async () => {
      try {
        // Gửi yêu cầu POST tới backend để kiểm tra đăng nhập
        const response = await axios.post(
          "http://localhost:3000/api/accounts/login",
          {
            user_name: user_name.value,
            password: password.value,
          }
        );

        if (!response?.data?.error) {
          sessionStorage.setItem("token", response.data.token);
          const user = response.data.document.user_name
          sessionStorage.setItem("user", user);

          if (user == 'admin') {
            sessionStorage.setItem('roleName', 'admin')
          }
          else {
            sessionStorage.setItem("partymemberId", response.data.document.PartyMember._id);
            sessionStorage.setItem("partymemberName", response.data.document.PartyMember.name);
            sessionStorage.setItem("roleId", response.data.document.Role._id)
            sessionStorage.setItem("roleName", response.data.document.Role.name);
            sessionStorage.setItem("partycellId", response.data.document.PartyMember.PartyCell._id)
            sessionStorage.setItem("partycellName", response.data.document.PartyMember.PartyCell.name)
            sessionStorage.setItem("hamletId", response.data.document.PartyMember.Hamlet._id)

            let permissionList = response.data.document.Role.Permissions;
            permissionList = permissionList.map((value) => value.name);
            localStorage.setItem(
              "permissionList",
              JSON.stringify(permissionList)
            );
          }

          router.push({ name: "Index" })
          alert_success('Thành công', 'Đăng nhập thành công')
        }
        else {
          alert_error(`Login`, `${response.data.msg}`);
          router.push({ name: "Login" });
        }

      } catch (error) {
        console.log(error);
      }
    };

    const check = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        router.push({ name: "Index" });
      } else {
        router.push({ name: "Login" });
      }
    };
    check();
    return {
      user_name,
      password,
      login,
      togglePasswordVisibility,
      showPassword,
    };
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: #f8f9fa;
}

.card {
  border: 1px black;
  width: 550px;
  height: 580px;
}

.btn-primary {
  background-color: #022d5a;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0069d9;
}

.vh-100 {
  height: 100vh;
}

@media (max-width: 768px) {
  .card {
    width: 80%;
    height: auto;
    max-width: 500px;
  }
}

@media (max-width: 576px) {
  .card {
    width: 90%;
    height: auto;
    max-width: 400px;
    margin-left: 17px;
  }
}

@media (min-width: 577px) and (max-width: 768px) and (max-height: 1024px) {
  .card {
    width: 100%;
    height: auto;
    max-width: 600px;
    /* margin-left: ; */
    margin-right: auto;
  }
}
</style>
