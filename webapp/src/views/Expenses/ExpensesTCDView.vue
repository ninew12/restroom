<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";

export default {
  components: {
    MaterialInput,
    MaterialButton,
    Breadcrumbs,
  },
  setup() {
    return {
      vueMkHeader,
      masterData,
    };
  },

  data() {
    return {
      optionMonth: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      selectedBuilding: "อาคารแฟลต 1/11",
      selectedFloor: "ชั้น 1",
      selectedRoom: "ห้อง 101",
      selectedColor: "",
      firstName: "สมชัย",
      lastName: "แสงสุข",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "134044411441178",
      phone: "0325647845",
      selectedRanks: "ส.ต.ต.",
      selectedAffiliation: "ฝอ.2",
      birthday: "14/07/2534",
      typeContract: "หักได้",
      sumCost: 10000,
      expensesList: [],
      expensesListOld: [],
      searchName: "",
      selectedMonth: "พฤศจิกายน",
      installmentsRooom: "",
      Insurancecost: "",
      userByid: {},
      contractExpenses: "",
      id: "",
      months: "",
      openBtn: false,
      expensesListFix: [],
      loader: false,
      setTimes : 30000
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    this.getExpenses();
    this.getMonths();
  },
  watch: {
    selectedColor: function (newValue) {
      // this.updateColor(newValue)
      console.log(newValue);
    },
  },
  computed: {
    expensesList() {
      return this.expensesList.filter((item) =>
        item?.roomnumber.includes(this.searchName)
      );
    },
  },
  methods: {
    typeContractchange(e) {
      this.typeContract = e.target.value;
    },
    getMonths() {
      const d = new Date();
      let m
      if(this.optionMonth[d.getMonth()] == 'มกราคม'){
        m = "มกราคม"
      }else{
        m = this.optionMonth[d.getMonth() - 1];
      }
      let y = d.getFullYear();
      this.months = m;
      this.years = y;
    },

    async getExpenses() {
      try {
        await axios
          .get("http://localhost:3897/expenses")
          .then((res) => {
            let data = [];
            let arr = [];
            let arr2 = [];
            let data2 = [];
            this.expensesListOld = res.data;
            this.expensesList = res.data;

            data = this.expensesList.filter(
              (ele) =>
                ele.typeUser == "บช.ตชด." &&
                ele.queue == "inroom" &&
                ele.roomStatus !== "return"
            );
            data2 = data.map((el) => {
              return {
                ...el,
                sumCost: this.countSum(el),
                installmentsCost: this.countinstallments(el),
                amountPaidCost: this.countinsamountPaid(el),
                maintenanceCost: this.countinsamaintenance(el),
              };
            });

            data2.forEach((element) => {
              if (element.monthly) {
                const myString = element.monthly;
                if (myString !== undefined) {
                  const d = new Date();
                  let m = this.optionMonth[d.getMonth()];
                  if (m == myString) this.openBtn = true;
                }
              }
            });

            // this.expensesList = data2;
            this.expensesList = data2;
            if(this.expensesList.length > 200){this.setTimes = 60000}
            // console.log(this.expensesListFix);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    countSum(e) {
      try {
        return e.lastnumber - e.firstnumber || 0;
      } catch (error) {
        console.log("error:::");
        console.lgo(error);
      }
    },

    countinstallments(e) {
      try {
        // let a = ''
        if (parseInt(e.installments) !== 0) {
          let a = parseInt(e.insurance || 0) / parseInt(e.installments || 0); // จำนวนเงินต่องวด
          let c = parseInt(e.insurance || 0) - parseInt(e.amountPaid || 0); // จำนวนเงินคงเหลือ
          let b = c / a; //จำนวนงวดคงเหลือ
          let d = parseInt(e.installments || 0) - b;
          return a * d || 0;
        } else {
          return parseInt(e.insurance || 0);
        }
      } catch (error) {
        console.log(error);
      }
    },

    countinsamaintenance(e) {
      try {
        if (parseInt(e.installments) !== 0) {
          let a = parseInt(e.insurance || 0) / parseInt(e.installments || 0); // จำนวนเงินต่องวด
          let c = parseInt(e.insurance || 0) - parseInt(e.amountPaid || 0); // จำนวนเงินคงเหลือ
          let b = c / a; //จำนวนงวดคงเหลือ
          let d = parseInt(e.installments || 0) - b;
          return d || 0;
        }else{
          return parseInt(e.insurance || 0);
        }
      
      } catch (error) {
        console.log(error);
      }
    },

    countinsamountPaid(e) {
      return e.insurance - parseInt(e.amountPaid || 0) || 0;
    },



    async getRoomsByid(id) {
      this.id = id;
      try {
        await axios
          .get(`http://localhost:3897/users/${id}`)
          .then((res) => {
            this.userByid = res.data;
            this.rank = this.userByid.rank;
            (this.firstName = this.userByid.firstName),
              (this.lastName = this.userByid.firstName);
            (this.Insurancecost = this.userByid.insurancecost),
              (this.installmentsRooom = this.userByid.installmentsRooom),
              (this.firstnumber = this.userByid.firstnumber),
              (this.lastnumber = this.userByid.lastnumber),
              (this.Waterbill = this.userByid.Waterbill),
              (this.Electricitybill = this.userByid.Electricitybill),
              (this.Central = this.userByid.Central),
              (this.Costs = this.userByid.Costs),
              (this.typeContract = this.userByid.typeContract),
              (this.contractExpenses = this.userByid.contractExpenses),
              (this.sumCost = this.userByid.sumCost);
            this.rankNumber = this.userByid.rankNumber;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async genInsurance() {
      let arr = [];
      let data = [];
      let data2 = [];
      let dataList = [];
      let dataList2 = [];
      arr = this.expensesList;
      data = await arr.map((el) => {
        return {
          ...el,
          amountPaid: this.callInsurance(el),
        };
      });
      data2 = data;
      dataList = data.filter((el) => parseInt(el.amountPaidCost) !== 0);
      dataList2 = data2.filter((el) => parseInt(el.amountPaidCost) == 0);
      this.expensesList = dataList;
      this.loopSavereport(dataList2);
      this.loopData();
      this.lodingData();
    },

    lodingData() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
      }, this.setTimes);
    },

    async loopData() {
      await this.expensesList.forEach((element) => {
        this.submitForm(element);
      });
    },

    async loopSavereport(data) {
      await data.forEach((element) => {
        this.saveToreportNobill(element);
      });
    },

    callInsurance(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = parseInt(e.amountPaid || 0) + parseInt(a); // จำนวนจ่ายแล้ว
      return c;
    },

    async submitForm(index) {
      let id = index.id;
      let body = {
        amountPaid: index.amountPaid || 0,
        monthly: this.months,
        years: this.years,
      };
      await axios
        .put(`http://localhost:3897/users/${id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // notify({
          //   title: "คำนวณค่าใช้จ่ายสำเร็จ",
          //   type: "success",
          // });
          this.saveToreport(index);
          this.submitRoom(index);
          this.getExpenses();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async submitRoom(index) {
      let id = index.roomId;
      let body = {
        amountPaid: index.amountPaid || 0,
        monthly: this.months,
        years: this.years,
      };
      await axios.put(`http://localhost:3897/rooms/${id}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async saveToreport(index) {
      let id = index.id;
      let body = {
        amountPaid: parseInt(index.amountPaid) || 0,
        monthly: this.months,
        years: this.years,
        rankNumber: this.rankNumber,
      };
      await axios.put(`http://localhost:3897/reportUser/${id}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async saveToreportNobill(index) {
      let id = index.id;
      let body = {
        amountPaid: parseInt(index.amountPaid) || 0,
        monthly: this.months,
        years: this.years,
        rankNumber: this.rankNumber,
      };
      await axios.put(`http://localhost:3897/reportUser/${id}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    Previous() {
      window.history.back();
    },
  },
};
</script>
<template>
  <Header>
    <div
      class="page-header min-vh-80"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="text-center" style="margin-top: -80px">
          <img src="../../assets/img/logo.png" alt="title" loading="lazy" class="w-35" />
        </div>
        <div class="row pt-6">
          <div class="col-lg-12 text-center mx-auto position-relative">
            <h1 class="pt-3 mt-n5 me-2 head-text">
              โปรแกรมทะเบียนบ้านพัก
              <br />
              <span
                style="font-size: 24px; border-top: 4px solid #000; font-weight: normal"
                >งานสวัสดิการบ้านพัก ฝ่ายสนับสนุน1 กองบังคับการสนับสนุน</span
              >
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <section>
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
      <div class="page-header min-vh-45">
        <div class="container">
          <div>
            <Breadcrumbs
              :routes="[
                { label: 'หน้าหลัก', route: '/home' },
                { label: 'บันทึกค่าใช้จ่ายรายเดือน บช.ตชด.' },
              ]"
            />
          </div>
          <div class="mb-3">
            <a
              style="display: flex; align-items: center; cursor: pointer"
              @click="Previous"
            >
              <span class="material-icons"> arrow_back_ios_new </span>
              <span>ย้อนกลับ</span>
            </a>
          </div>

          <h4>บันทึกค่าใช้จ่ายรายเดือน บช.ตชด. &nbsp; ประจำเดือน {{ months }}</h4>
          <notifications class="pt-6" position="top center" width="400px" />
          <div class="d-flex justify-content-end align-items-baseline pt-1">
            <MaterialButton
              style="margin-bottom: 0px"
              variant="gradient"
              color="success"
              data-bs-toggle="modal"
              data-bs-target="#costBackdrop"
              :disabled="openBtn"
              >คำนวณค่าใช้จ่าย</MaterialButton
            >
            <!-- 
              data-bs-toggle="modal"
              data-bs-target="#costBackdrop"
              :disabled="openBtn" -->
          </div>

          <div class="text-center pt-4 table-responsive">
            <table class="table table-hover border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th>ชื่อ-สกุล</th>
                  <th scope="col">ค่าบำรุง</th>
                  <th scope="col">เงินค่าประกัน</th>
                  <th scope="col">จำนวนเงินประกันที่ชำระแล้ว</th>
                  <th scope="col">จำนวนงวดเงินประกัน</th>
                  <th scope="col">ยอดคงเหลือ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.expensesList" :key="index">
                  <td>{{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}</td>
                  <td>{{ item?.maintenance || "-" }}</td>
                  <td>{{ item?.insurance || "-" }}</td>
                  <td>{{ item?.installmentsCost || 0 }}</td>
                  <td>
                    <span v-if="item?.installments > 0">
                      {{ item?.maintenanceCost }}/{{ item?.installments }}
                    </span>
                    <span v-if="item?.installments == 0"> 0 </span>
                  </td>
                  <td>{{ item?.amountPaidCost || 0 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="loader">
            <div class="spanner show">
              <div class="loader"></div>
              <p>กำลังทำรายการ กรุณารอสักครู่</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="costBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">คำควณค่าใช้จ่าย</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">คุณต้องการที่จะคำนวนค่าใช้จ่ายใช่หรือไม่</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ยกเลิก
            </button>
            <MaterialButton
              variant="gradient"
              color="danger"
              @click="genInsurance"
              html-type="submit"
              data-bs-dismiss="modal"
              >ตกลง</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.bg-green {
  border: 2px solid #4cbb17 !important;
  color: #000;
}
.bg-red {
  border: 2px solid #d24c4a !important;
  color: #000;
}
.bg-warning {
  border: 2px solid #fb8c00 !important;
  color: #000;
}
.bg-return {
  border: 2px solid #ffca28 !important;
  color: #000;
}
.bg-special {
  border: 2px solid #edc7c7 !important;
  color: #000;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.breadcrumb-item a:hover {
  color: #4caf50 !important;
}

.spanner {
  position: absolute;
  top: 50%;
  left: 0;
  background: rgba(238, 242, 237, 0.5);
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  color: #4caf50;
  transform: translateY(-50%);
  z-index: 1000;
  visibility: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #4caf50;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.show {
  visibility: visible;
}

.spanner,
.overlay {
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.spanner.show,
.overlay.show {
  opacity: 1;
}
</style>
