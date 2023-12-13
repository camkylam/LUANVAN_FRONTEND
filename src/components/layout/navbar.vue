<script>
import { ref, reactive} from "vue";
import { useRouter } from "vue-router";
import { formatDateTime} from "../../assets/js/common.js";
import { alert_delete} from "../../assets/js/common.alert";

export default {
  props: {},
  setup(props, ctx) {
    const data = reactive({
      partymemberName: sessionStorage.getItem("partymemberName"),
      role: sessionStorage.getItem("roleName"),
      selectedItem: {},
    });
    const updateMenuResponsive = () => {
      console.log("starting");
      ctx.emit("updateMenuResponsive", "true");
    };
    const selectRef = ref(null);
    const selectRef1 = ref(null);

    const getAvatarUrl = (name) => {
      if (name) {
        const words = name.split(" ");
        const lastWord = words[words.length - 1];
        const initials = lastWord.charAt(0).toUpperCase();
        const color = getAvatarColor(initials);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = 50;

        canvas.width = size;
        canvas.height = size;
        context.beginPath();
        context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.font = `${size / 2}px sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#FFFFFF";
        context.fillText(initials, size / 2, size / 2);
        return canvas.toDataURL();
      }
      return "";
    };

    const getAvatarColor = (initials) => {
      const colors = [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFC107",
        "#FF9800",
        "#FF5722",
      ];
      const index = initials.charCodeAt(0) % colors.length;
      return colors[index];
    };
    // In hoa ký tự đầu
    const capitalizeFirstLetter = (string) => {
      const words = string.split(" ");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join(" ");
    };
    const partymemberName = capitalizeFirstLetter(data.partymemberName ? data.partymemberName : "Admin");
    const roleName = capitalizeFirstLetter(data.role ? data.role : "Quản trị hệ thống");
    // logout
    const showDropdown = ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    const router = useRouter();

    const logout = async () => {
      const isConfirmed = await alert_delete(
        "Đăng xuất",
        "Bạn có chắc chắn muốn đăng xuất?"
      );
      if (isConfirmed == true) {
        sessionStorage.clear()
        document.body.style.visibility = "hidden";
        setTimeout(() => {
        sessionStorage.clear();
        window.location.reload();
        window.onload = () => {
        document.body.style.visibility = "visible";
      };
        }, 20);
        router.push({ name: "Login" });
      }
    };

    return {
      partymemberName,
      roleName,
      logout,
      toggleDropdown,
      showDropdown,
      getAvatarUrl,
      getAvatarColor,
      updateMenuResponsive,
      data,
      formatDateTime,
      selectRef,
      selectRef1,
    };
  },
};
</script>

<template>
  <nav class="d-flex align-items-center border-nav"
    style=" width: 200rem; height: 90px; margin-left: 0; margin-left: 0; padding-left: 15px; padding-right: 170px; padding-bottom: 15px;">
    <marquee width="80%" direction="left" scrollamount="10"><a class=" h5 my-auto d-none d-xl-block ml-3 title "
        style="color: #CD2626; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 30px;">HỆ THỐNG
        QUẢN LÝ ĐẢNG VIÊN SINH HOẠT NƠI CƯ TRÚ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</a></marquee>
    <a class="d-xl-none d-sm-block text-dark h5 my-auto ml-3"><span class="material-symbols-outlined cursor-pointer"
        @click="$emit('showMenu')">
        menu
      </span></a>
    <div class="d-flex align-content-center justify-content-between" ref="selectRef">
      <div class="d-flex align-content-center mr-3 my-1 cursor-pointer" @click="toggleDropdown" ref="selectRef1">
        <img class="rounded-circle cursor-pointer avatar "
          :src="getAvatarUrl(data.partymemberName ? data.partymemberName : 'Admin')" alt="Avatar" />
        <div class="d-xl-flex color-dark d-none flex-column align-items-center justify-content-center ml-2">
          <span class="size-14">{{ partymemberName }}</span>
          <span class="size-14">{{ roleName }}</span>
        </div>
      </div>
    </div>
  </nav>
  <div v-if="showDropdown" class="logout" style="margin-right:13rem; margin-top: 15px;">
    <span @click="logout" class="btnlogout">
      <i class="fas fa-sign-out-alt" style="font-size: 20px;"></i>
      <span class="logout-text">Đăng Xuất</span>
    </span>
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 25px;
}

.logout {
  position: absolute;
  top: 68px;
  right: 0;
  width: 200px;
  height: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: auto;
  margin-right: 14px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btnlogout {
  color: var(--dark);
  margin: auto;
  cursor: pointer;
  font-size: 16px;
}

.logout-text {
  margin-left: 10px;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 0, "opsz" 48;
}

h6 {
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding-top: 10px;
  color: black;
}


.color-dark {
  color: var(--dark);
}

.border-nav {
  border: 1px solid var(--gray);
  /* background-image: url("https://tophinhanhdep.com/wp-content/uploads/2021/10/Light-Blue-Plain-Wallpapers.jpg") */
  background-color: #ffe5b6;
}

.avatar {
  margin-left: 20px;
  width: 45px;
  height: 45px;
}

.cursor-pointer {
  cursor: pointer;
}

</style>