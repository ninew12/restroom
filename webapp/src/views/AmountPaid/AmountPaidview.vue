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
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    this.getExpenses();
    this.getMonths();
    this.getRoomsByid();
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
            // "deposit": "รอคืนเงินประกัน"
            console.log(data);
            // this.installmentsCost = this.countinstallments(data[0])
            // let t2 = this.countinsamountPaid(data[0])
            // let t3 = this.countinsamaintenance(data[0])
            // console.log(t);
            // console.log(t2);
            // console.log(t3);
            this.expensesList = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getRoomsByid() {
      //   this.id = id;
      try {
        await axios
          .get(`http://localhost:3897/users/`)
          .then((res) => {
            console.log(res);
            // this.userByid = res.data;
            // this.rank = this.userByid.rank;
            // (this.firstName = this.userByid.firstName),
            //   (this.lastName = this.userByid.firstName);
            // (this.Insurancecost = this.userByid.insurancecost),
            //   (this.installmentsRooom = this.userByid.installmentsRooom),
            //   (this.Waterbill = this.userByid.Waterbill),
            //   (this.Electricitybill = this.userByid.Electricitybill),
            //   (this.Central = this.userByid.Central),
            //   (this.Costs = this.userByid.Costs),
            //   (this.typeContract = this.userByid.typeContract),
            //   (this.contractExpenses = this.userByid.contractExpenses),
            //   (this.sumCost = this.userByid.sumCost);
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
      let c = e.insurance - e.amountPaid; // จำนวนเงินคงเหลือ
      let b = c / a; //จำนวนงวดคงเหลือ
      let d = e.installments - b;
      return a * d || 0;
    },

    countinsamountPaid(e) {
      return e.insurance - e.amountPaid || 0;
    },

    countinsamaintenance(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = e.insurance - e.amountPaid; // จำนวนเงินคงเหลือ
      let b = c / a; //จำนวนงวดคงเหลือ
      return b || 0;
    },

    async summitdeposit(data) {
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
        deposit: "คืนเงินประกันแล้ว",
      };
      await axios
        .put(`http://localhost:3897/users/${data.id}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "ทำรายการสำเร็จ",
            type: "success",
          });
          this.updateRoom(data.roomId);
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
          <h4>คืนเงินประกัน &nbsp; ประจำเดือน {{ months }}</h4>
          <notifications position="top right" width="400px" />
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
                  <th scope="col">ชื่อ-สกุล</th>
                  <th scope="col">เงินประกันทั้งหมด</th>
                  <th scope="col">เงินประกันที่ชำระแล้ว</th>
                  <th scope="col">งวดเงินประกัน</th>
                  <th scope="col">ยอดเงินประกันคงเหลือ</th>
                  <th scope="col">ทะเบียนบ้าน</th>
                  <th scope="col">กุญแจห้อง</th>
                  <th scope="col">หลักฐานแสดงการชําระค่าไฟเดือนล่าสุด</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.expensesList" :key="index">
                  <!-- <th scope="row">{{ index + 1 }}</th> -->
                  <td>
                    <MaterialButton
                      style="margin-bottom: 0px"
                      variant="gradient"
                      color="success"
                      @click="summitdeposit(item)"
                      >บันทึกคืนเงินประกันครบจำนวน</MaterialButton
                    >
                  </td>
                  <td>{{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}</td>
                  <td>{{ item?.insurance || "-" }}</td>
                  <td>{{ item?.installmentsCost || "-" }}</td>
                  <td>
                    <span v-if="item?.installments > 0">
                      {{ item?.maintenanceCost }}/{{ item?.installments }}
                    </span>
                    <span v-if="item?.installments == 0"> - </span>
                  </td>
                  <td>{{ item?.amountPaidCost || "-" }}</td>
                  <td>{{ item?.roomKey }}</td>
                  <td>{{ item?.houseRegistration }}</td>
                  <td>{{ item?.payMonth }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop11"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">บันทึกคืนเงินประกัน</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div
                class="mb-3"
                style="display: flex; justify-content: space-between; align-items: center"
              >
                <div class="form-check form-check-inline">
                  <label style="margin-right: 20px">กุญแจห้อง</label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions4"
                    id="inlineRadio11"
                    value="มี"
                  />
                  <label class="form-check-label" for="inlineRadio11">มี</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions4"
                    id="inlineRadio12"
                    value="ไม่มี"
                  />
                  <label class="form-check-label" for="inlineRadio12">ไม่มี</label>
                </div>
                <div style="width: 360px; margin-bottom: 10px">
                  <MaterialInput
                    name="contract"
                    :value="contract"
                    @input="(event) => (contract = event.target.value)"
                    class="input-group-static"
                    type="text"
                    placeholder="สาเหตุ"
                  />
                </div>
              </div>
              <div
                class="mb-3"
                style="display: flex; justify-content: space-between; align-items: center"
              >
                <div class="form-check form-check-inline">
                  <label style="margin-right: 20px">ทะเบียนบ้าน</label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions11"
                    id="inlineRadio27"
                    value="มี"
                  />
                  <label class="form-check-label" for="inlineRadio27">มี</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions11"
                    id="inlineRadio28"
                    value="ไม่มี"
                  />
                  <label class="form-check-label" for="inlineRadio28">ไม่มี</label>
                </div>
                <div style="width: 360px; margin-bottom: 10px">
                  <MaterialInput
                    name="contract"
                    :value="contract"
                    @input="(event) => (contract = event.target.value)"
                    class="input-group-static"
                    type="text"
                    placeholder="สาเหตุ"
                  />
                </div>
              </div>
              <div>
                <label style="padding-left: 30px"
                  >หลักฐานแสดงการชําระค่าไฟเดือนล่าสุด</label
                >
              </div>
              <div
                class="mb-3"
                style="
                  margin-left: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio22"
                    value="มี"
                  />
                  <label class="form-check-label" for="inlineRadio22">มี</label>
                </div>
                <div style="width: 250px; margin-bottom: 10px">
                  <MaterialInput
                    name="contract"
                    :value="contract"
                    @input="(event) => (contract = event.target.value)"
                    class="input-group-static"
                    type="text"
                    placeholder="สาเหตุ"
                  />
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio23"
                    value="ไม่มี"
                  />
                  <label class="form-check-label" for="inlineRadio23">ไม่มี</label>
                </div>
                <div style="width: 250px; margin-bottom: 10px">
                  <MaterialInput
                    name="contract"
                    :value="contract"
                    @input="(event) => (contract = event.target.value)"
                    class="input-group-static"
                    type="text"
                    placeholder="สาเหตุ"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton
              variant="gradient"
              color="success"
              @click="submitForm"
              html-type="submit"
              data-bs-dismiss="modal"
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="EdituserBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">แก้ไขสมาชิก</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-3">
                <label>สังกัด</label>
                <v-select
                  :options="masterData?.Affiliation"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div class="mb-3">
                <label>ยศ</label>
                <v-select :options="masterData?.ranks" v-model="selectedRanks"></v-select>
              </div>
              <div class="mb-3">
                <MaterialInput
                  name="firstName"
                  :value="firstName"
                  @input="(event) => (firstName = event.target.value)"
                  class="input-group-static"
                  label="ชื่อ"
                  type="text"
                  placeholder="ชื่อ"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="lastName"
                  @input="(event) => (lastName = event.target.value)"
                  class="input-group-static"
                  label="สกุล"
                  type="text"
                  placeholder="สกุล"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="idcard"
                  @input="(event) => (idcard = event.target.value)"
                  class="input-group-static"
                  label="เลขบัตรประชาชน"
                  type="number"
                  placeholder="เลขบัตรประชาชน"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="phone"
                  @input="(event) => (phone = event.target.value)"
                  class="input-group-static"
                  label="เบอร์ติดต่อ"
                  type="number"
                  placeholder="เบอร์ติดต่อ"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton
              variant="gradient"
              color="success"
              @click="submitForm"
              html-type="submit"
              >บันทึก</MaterialButton
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
