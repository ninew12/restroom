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
      let m = this.optionMonth[d.getMonth()];
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
            let data2 = [];
            this.expensesListOld = res.data;
            this.expensesList = res.data;
            data = this.expensesList.filter((ele) => ele.typeUser == "บช.ตชด.");
            arr = data.filter((ele) => ele.queue == "inroom");
            data2 = arr.map((el) => {
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

            this.expensesList = data2;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    countSum(e) {
      return e.lastnumber - e.numberfirst || 0;
    },

    countinstallments(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = e.insurance - parseInt(e.amountPaid || 0)  // จำนวนเงินคงเหลือ
      let b = c / a; //จำนวนงวดคงเหลือ
      let d = e.installments - b;
      return a * d || 0;
    },

    countinsamountPaid(e) {
      return e.insurance - parseInt(e.amountPaid || 0)  || 0;
    },

    countinsamaintenance(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = e.insurance - parseInt(e.amountPaid || 0) ; // จำนวนเงินคงเหลือ
      let b = c / a; //จำนวนงวดคงเหลือ
      return b || 0;
    },

    async getRoomsByid(id) {
      this.id = id;
      try {
        await axios
          .get(`http://localhost:3897/users/${id}`)
          .then((res) => {
              this.userByid = res.data;
              this.rank = this.userByid.rank;
              this.firstName = this.userByid.firstName,
              this.lastName = this.userByid.firstName;
              this.Insurancecost = this.userByid.insurancecost,
              this.installmentsRooom = this.userByid.installmentsRooom,
              this.numberfirst = this.userByid.numberfirst,
              this.lastnumber = this.userByid.lastnumber,
              this.Waterbill = this.userByid.Waterbill,
              this.Electricitybill = this.userByid.Electricitybill,
              this.Central = this.userByid.Central,
              this.Costs = this.userByid.Costs,
              this.typeContract = this.userByid.typeContract,
              this.contractExpenses = this.userByid.contractExpenses,
              this.sumCost = this.userByid.sumCost;
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
      arr = this.expensesList;
      data = await arr.map((el) => {
        return {
          ...el,
          amountPaid: this.callInsurance(el),
        };
      });
      this.expensesList = data;
      this.loopData();
    },

    async loopData() {
      // await this.expensesList.forEach((element) => {
      //   this.submitForm(element);
      // });
      for (let index = 0; index < 10 ; index++) {
        // this.submitForm(this.expensesLis[index]);
        let ele = this.expensesList[index]
        this.submitForm(ele)
      }
    },

    callInsurance(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = parseInt(e.amountPaid || 0) + parseInt(a); // จำนวนจ่ายแล้ว
      return c;
    },

    async submitForm(index) {
      let id = index.id;
      console.log(index);
      let body = {
        amountPaid: index.amountPaid || 0,
        monthly: this.months,
        years: this.years
      };
      console.log(body);
      await axios
        .put(`http://localhost:3897/users/${id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // notify({
          //   title: "แก้ไขข้อมูลสำเร็จ",
          //   type: "success",
          // });
          this.saveToreport(index);
          this.submitRoom(index)
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
        monthly:this.months,
        years:this.years
      };
      await axios
        .put(`http://localhost:3897/rooms/${id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
    },

    async saveToreport(index) {
      let id = index.id;
      let body = {
        amountPaid: index.amountPaid || 0,
        monthly :this.months,
        years: this.years
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
          <notifications class="pt-6 " position="top center" width="400px" />
          <div class="d-flex justify-content-end align-items-baseline pt-1">
            <MaterialButton
              style="margin-bottom: 0px"
              variant="gradient"
              color="success"
              data-bs-toggle="modal"
              data-bs-target="#costBackdrop"
              >คำนวณค่าใช้จ่าย</MaterialButton
            >
            <!-- :disabled="openBtn" -->
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
                  <td>{{ item?.installmentsCost || "-" }}</td>
                  <td>
                    <span v-if="item?.installments > 0">
                      {{ item?.maintenanceCost }}/{{ item?.installments }}
                    </span>
                    <span v-if="item?.installments == 0"> - </span>
                  </td>
                  <td>{{ item?.amountPaidCost || 0 }}</td>
                </tr>
              </tbody>
            </table>
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
</style>
