<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";
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
      dataSummit: [],
      listCheckbox: [],
      dateNow: new Date(),
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
    listCheckbox: function (newValue) {
      if (newValue !== null && newValue !== undefined) this.dataSummit = newValue;
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
    Previous() {
      window.history.back();
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
            this.expensesListOld = res.data;
            this.expensesList = res.data;
            arr = this.expensesList.filter((el) => el.deposit == "รอคืนเงินประกัน");
            data = arr.map((el) => {
              return {
                ...el,
                sumCost: this.countSum(el),
                installmentsCost: this.countinstallments(el),
                amountPaidCost: this.countinsamountPaid(el),
                maintenanceCost: this.countinsamaintenance(el),
              };
            });
            this.expensesList = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    countSum(e) {
      return parseInt(e.lastnumber) - parseInt(e.firstnumber) || 0;
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
          return b || 0;
        }else{
          return parseInt(e.insurance || 0);
        }
      
      } catch (error) {
        console.log(error);
      }
    },

    countinsamountPaid(e) {
      return e.insurance - e.amountPaid || 0;
    },

    async ExportData() {
      const result = this.dateNow.toLocaleDateString("th-TH", {
        year: "numeric",
      });
      var ws_data = [
        [` คืนเงินประกัน ประจําเดือน ${this.months} ${result}`],
        [],
        [
          "ยศ",
          "ชื่อ-สกุล",
          "สังกัดเดิม",
          "อาคาร",
          "ห้องเลขที่",
          "แบบ",
          "จำนวนเงิน",
          "เลขบัญชีธนาคาร",
          "ธนาคาร",
          "หมายเลขโทรศัพท์",
          "หมายเหตุ",
        ],
      ];
      await this.dataSummit.forEach((e, i) => {
        ws_data.push([
          e.rank,
          e.firstName + " " + e.lastName,
          e.typeAffiliation,
          e.buildingName,
          e.roomnumber,
          e.typeRoom,
          e.amountPaid,
          e.bankbookNumber,
          e.bankbookName,
          e.phone,
          e.payMonthcause,
        ]);
      });
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "คืนเงินประกัน");
      XLSX.writeFile(wb, "รายงานคืนเงินประกัน.xlsx");
    },

    async summitloopData() {
      this.ExportData();
      this.lodingData()
      if(this.dataSummit.length > 200){this.setTimes = 60000}
      await this.dataSummit.forEach((element) => {
        this.summitdeposit(element);
      });
    },

    lodingData() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
      }, this.setTimes);
    },

    async summitdeposit(element) {
      let body = {
        houseRegistration: " ",
        payMonth: " ",
        houseRegistrationcause: " ",
        payMonthcause: " ",
        payMonthcausetwo: " ",
        roomKeycause: " ",
        maintenance: " ",
        insurance: " ",
        installments: " ",
        roomnumber: "",
        roomKey: "",
        roomId: "",
        monthly: "",
        years: "",
        amountPaid: "",
        deposit: "คืนเงินประกันแล้ว",
      };
      await axios
        .put(`http://localhost:3897/users/${element.id}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.updateRoom(element.roomId);
          this.getExpenses();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateRoom(id) {
      let body = {
        houseRegistration: " ",
        payMonth: " ",
        houseRegistrationcause: " ",
        payMonthcause: " ",
        payMonthcausetwo: " ",
        roomKeycause: " ",
        maintenance: " ",
        insurance: " ",
        installments: " ",
        deposit: " ",
        monthly: "",
        years: "",
      };
      axios.put(`http://localhost:3897/rooms/${id}`, body, {
        headers: {
          // remove headers
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
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
                { label: 'คืนเงินประกัน' },
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
          <div class="d-flex justify-content-between align-items-baseline pt-1">
            <h4>คืนเงินประกัน &nbsp; ประจำเดือน {{ months }}</h4>
            <MaterialButton
              style="margin-bottom: 0px"
              variant="gradient"
              color="success"
              data-bs-toggle="modal"
              data-bs-target="#returnBackdrop"
              >บันทึกคืนเงินประกันครบจำนวน</MaterialButton
            >
          </div>

          <notifications class="pt-6" position="top center" width="400px" />
          <!-- <div class="d-flex justify-content-end align-items-baseline pt-1">
              <label  style="margin-right:20px;">
                เดือน</label
              >
              <v-select
                class="w-15"
                :options="optionMonth"
                v-model="selectedMonth"
              ></v-select>
            </div> -->

          <div class="text-center pt-4 table-responsive">
            <table class="table table-hover border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th></th>
                  <th scope="col">ยศ</th>
                  <th scope="col">ชื่อ-สกุล</th>
                  <th scope="col">สังกัดเดิม</th>
                  <th scope="col">อาคาร</th>
                  <th scope="col">ห้องเลขที่</th>
                  <th scope="col">แบบ</th>
                  <th scope="col">จำนวนเงิน</th>
                  <th scope="col">เลขบัญชีธนาคาร</th>
                  <th scope="col">ธนาคาร</th>
                  <th scope="col">หมายเลขโทรศัพท์</th>
                  <th scope="col">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.expensesList" :key="index">
                  <!-- <th scope="row">{{ index + 1 }}</th> -->
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        :id="item?.id"
                        :value="item"
                        :name="item?.id"
                        v-model="listCheckbox"
                      />
                      <span class="check-box-effect"></span>
                    </label>
                  </td>

                  <td>{{ item?.rank }}</td>
                  <td>{{ item?.firstName }} {{ item?.lastName }}</td>
                  <td>{{ item?.typeAffiliation || "-" }}</td>
                  <td>{{ item?.buildingName || "-" }}</td>
                  <td>{{ item?.roomnumber || "-" }}</td>
                  <td>{{ item?.typeRoom || "-" }}</td>
                  <td>{{ item?.amountPaid || "-" }}</td>
                  <td>{{ item?.bankbookNumber || "-" }}</td>
                  <td>{{ item?.bankbookName || "-" }}</td>
                  <td>{{ item?.phone || "-" }}</td>
                  <td>{{ item?.payMonthcause || "-" }}</td>
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
      id="returnBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">คืนเงินประกัน</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            คุณต้องการที่จะบันทึกคืนเงินประกับครบจำนวนใช่หรือไม่
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ยกเลิก
            </button>
            <MaterialButton
              variant="gradient"
              color="danger"
              html-type="submit"
              data-bs-dismiss="modal"
              @click="summitloopData"
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

<style scoped>
label .check-box-effect {
  display: inline-block;
  position: relative;
  background-color: transparent;
  width: 18px;
  height: 18px;
  border: 2px solid #dcdcdc;
  border-radius: 10%;
}

label .check-box-effect:before {
  content: "";
  width: 0px;
  height: 2px;
  border-radius: 2px;
  background: #626262;
  position: absolute;
  transform: rotate(45deg);
  top: 7px;
  left: 5px;
  transition: width 50ms ease 50ms;
  transform-origin: 0% 0%;
}

label .check-box-effect:after {
  content: "";
  width: 0;
  height: 2px;
  border-radius: 2px;
  background: #626262;
  position: absolute;
  transform: rotate(305deg);
  top: 10px;
  left: 6px;
  transition: width 50ms ease;
  transform-origin: 0% 0%;
}

label:hover .check-box-effect:before {
  width: 5px;
  transition: width 100ms ease;
}

label:hover .check-box-effect:after {
  width: 10px;
  transition: width 150ms ease 100ms;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .check-box-effect {
  background-color: #4caf50 !important;
  transform: scale(1.25);
}

input[type="checkbox"]:checked + .check-box-effect:after {
  width: 10px;
  background: #fff;
  transition: width 150ms ease 100ms;
}

input[type="checkbox"]:checked + .check-box-effect:before {
  width: 5px;
  background: #fff;
  transition: width 150ms ease 100ms;
}

input[type="checkbox"]:checked:hover + .check-box-effect {
  background-color: #dcdcdc;
  transform: scale(1.25);
}

input[type="checkbox"]:checked:hover + .check-box-effect:after {
  width: 10px;
  background: #fff;
  transition: width 150ms ease 100ms;
}

input[type="checkbox"]:checked:hover + .check-box-effect:before {
  width: 5px;
  background: #fff;
  transition: width 150ms ease 100ms;
}
</style>
