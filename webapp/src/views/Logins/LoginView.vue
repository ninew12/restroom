<script>
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";

export default {
  components: {
    MaterialInput,
    MaterialButton,
  },
  setup() {
    return {};
  },

  data() {
    return {
      userName: "",
      password: "",
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
  },
  methods: {
    async submitForm() {
      let body = {
        userName: this.userName,
        password: this.password,
      };
      axios
        .post(`http://localhost:3897/login`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data == "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง") {
            notify({
              title: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
              type: "error",
            });
          } else {
            localStorage.setItem("user", JSON.stringify(body));
            this.$router.push({ path: `/home` });

            notify({
              title: "เข้าสู่ระบบสำเร็จ",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<template>
  <Header>
    <div class="page-header align-items-start min-vh-100 bg">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                    โปรแกรมทะเบียนบ้านพัก
                  </h4>
                </div>
              </div>
              <notifications position="top center" width="400px" />
              <div class="card-body">
                <!-- <form  class="text-start"> -->
                <label>ชื่อผู้ใช้งาน</label>
                <MaterialInput
                  id="email"
                  class="input-group-outline my-3"
                  type="text"
                  :value="userName"
                  @input="(event) => (userName = event.target.value)"
                />
                <label>รหัสผ่าน</label>
                <MaterialInput
                  id="password"
                  class="input-group-outline mb-3"
                  type="password"
                  :value="password"
                  @input="(event) => (password = event.target.value)"
                />
                <!-- <MaterialSwitch
                    class="d-flex align-items-center mb-3"
                    id="rememberMe"
                    labelClass="mb-0 ms-3"
                    checked
                    >Remember me</MaterialSwitch
                  > -->

                <div class="text-center">
                  <!-- fullWidth -->
                  <MaterialButton
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    fullWidth
                    html-type="submit"
                    @click="submitForm"
                    >เข้าสู่ระบบ</MaterialButton
                  >
                </div>
                <!-- </form> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
<style>
.bg {
  background-image: url("../../assets/img/bg.jpg");
}
</style>
