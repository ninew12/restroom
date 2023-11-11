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
        { label: "มกราคม", value: "มกราคม" },
        { label: "กุมภาพันธ์", value: "กุมภาพันธ์" },
        { label: "มีนาคม", value: "มีนาคม" },
        { label: "เมษายน", value: "เมษายน" },
        { label: "พฤษภาคม", value: "พฤษภาคม" },
        { label: "มิถุนายน", value: "มิถุนายน" },
        { label: "กรกฎาคม", value: "กรกฎาคม" },
        { label: "สิงหาคม", value: "สิงหาคม" },
        { label: "กันยายน", value: "กันยายน" },
        { label: "ตุลาคม", value: "ตุลาคม" },
        { label: "พฤศจิกายน", value: "พฤศจิกายน" },
        { label: "ธันวาคม", value: "ธันวาคม" },
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
    };
  },
  created() {
    this.getExpenses();
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
    async getExpenses() {
      try {
        await axios
          .get("http://localhost:3001/expenses")
          .then((res) => {
            let data = [];
            this.expensesListOld = res.data;
            this.expensesList = res.data;
            data = this.expensesList.map(el => {
                return {
                    ...el,
                    sumCost : this.countSum(el)
                }
            })
            this.expensesList = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getRoomsByid(id) {
      this.id = id;
      try {
        await axios
          .get(`http://localhost:3001/users/${id}`)
          .then((res) => {
            this.userByid = res.data;
            this.rank = this.userByid.rank;
            (this.firstName = this.userByid.firstName),
              (this.lastName = this.userByid.firstName);
            (this.Insurancecost = this.userByid.insurancecost),
              (this.installmentsRooom = this.userByid.installmentsRooom),
              (this.Waterbill = this.userByid.Waterbill),
              (this.Electricitybill = this.userByid.Electricitybill),
              (this.Central = this.userByid.Central),
              (this.Costs = this.userByid.Costs),
              (this.typeContract = this.userByid.typeContract),
              (this.contractExpenses = this.userByid.contractExpenses),
              (this.sumCost = this.userByid.sumCost);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    countSum(e){
        return e.insurancecost - e.installmentsRooom || 0
    },

    async submitForm() {
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        insurancecost: this.Insurancecost,
        installmentsRooom: this.installmentsRooom,
        waterbill: this.Waterbill,
        electricitybill: this.Electricitybill,
        central: this.Central,
        costs: this.Costs,
        typeContract: this.typeContract,
        contractExpenses: this.contractExpenses,
        sumCost: this.sumCost,
      };
      await axios
        .put(`http://localhost:3001/users/${this.id}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "แก้ไขข้อมูลสำเร็จ",
            type: "success",
          });
          this.getExpenses();
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
              :routes="[{ label: 'หน้าหลัก', route: '/' }, { label: 'คืนเงินประกัน' }]"
            />
          </div>
          <h4>คืนเงินประกัน</h4>
          <notifications position="top center" width="400px" />
          <div class="d-flex justify-content-end align-items-baseline pt-1">
              <label  style="margin-right:20px;">
                เดือน</label
              >
              <v-select
                class="w-15"
                :options="optionMonth"
                v-model="selectedMonth"
              ></v-select>
            </div>

          <div class="text-center pt-4 table-responsive">
            <table class="table table-hover border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th></th>
                  <!-- <th scope="col">ลำดับ</th> -->
                  <th>ชื่อ-สกุล</th>
                  <!-- <th scope="col">อาคาร</th>
                  <th scope="col">ชั้น</th>
                  <th scope="col">เลขที่ห้อง</th> -->
                  <th scope="col">เลขก่อน</th>
                  <th scope="col">เลขหลัง</th>
                  <th scope="col">ยอดใช้</th>
                  <th scope="col">ค่าน้ำประปา</th>
                  <th scope="col">ค่าไฟฟ้า</th>
                  <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                  <th scope="col">ค่าบำรุงลิฟท์</th>
                  <th scope="col">หักได้</th>
                  <th scope="col">หักไม่ได้</th>
                  <th scope="col">สาเหตุที่หัก</th>
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
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop11"
                      @click="getRoomsByid(item?.id)"
                      >บันทึกคืนเงินประกัน</MaterialButton
                    >
                  </td>
                  <td>{{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}</td>
                  <!-- <td>{{ item?.building }}</td>
                  <td>{{ item?.floor }}</td>
                  <td>{{ item?.roomnumber }}</td> -->
                  <td>{{ item?.installmentsRooom }}</td>
                  <td>{{ item?.insurancecost }}</td>
                  <td>{{ item?.sumCost }}</td>
                  <td>{{ item?.waterbill }}</td>
                  <td>{{ item?.electricitybill }}</td>
                  <td>{{ item?.central }}</td>
                  <td>{{ item?.costs }}</td>

                  <td>
                    <span v-if="item?.typeContract == 'หักได้'">/</span>
                  </td>
                  <td><span v-if="item?.typeContract == 'หักไม่ได้'">/</span></td>
                  <td>{{ item?.contractExpenses }}</td>
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
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              บันทึกค่าใช้จ่ายบ้านพัก ตร.
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-1">
                <label style="font-size: large"
                  >{{ rank }} {{ firstName }} {{ lastName }}</label
                >
              </div>
              <!-- <div class="mb-3">
                <label>อาคาร</label>
                <v-select
                  :options="optionsBuilding"
                  v-model="selectedBuilding"
                ></v-select>
              </div>
              <div class="mb-3">
                <label>ชั้น</label>
                <v-select :options="optionsFloor" v-model="selectedFloor"></v-select>
              </div>
              <div class="mb-3">
                <label>เลขที่ห้อง</label>
                <v-select :options="optionsRoom" v-model="selectedRoom"></v-select>
              </div> -->
              <div class="mb-3">
                <MaterialInput
                  :value="Insurancecost"
                  @input="(event) => (Insurancecost = event.target.value)"
                  class="input-group-static"
                  label="เลขก่อน"
                  type="text"
                  placeholder="เลขก่อน"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="installmentsRooom"
                  @input="(event) => (installmentsRooom = event.target.value)"
                  class="input-group-static"
                  label="เลขหลัง"
                  type="text"
                  placeholder="เลขหลัง"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Waterbill"
                  @input="(event) => (Waterbill = event.target.value)"
                  class="input-group-static"
                  label="ค่าน้ำประปา"
                  type="text"
                  placeholder="ค่าน้ำประปา"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Electricitybill"
                  @input="(event) => (Electricitybill = event.target.value)"
                  class="input-group-static"
                  label="ค่าไฟฟ้า"
                  type="text"
                  placeholder="ค่าไฟฟ้า"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Central"
                  @input="(event) => (Central = event.target.value)"
                  class="input-group-static"
                  label="ค่าไฟฟ้าส่วนกลาง"
                  type="text"
                  placeholder="ค่าไฟฟ้าส่วนกลาง"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Costs"
                  @input="(event) => (Costs = event.target.value)"
                  class="input-group-static"
                  label="ค่าบำรุงลิฟท์"
                  type="text"
                  placeholder="ค่าบำรุงลิฟท์"
                />
              </div>

              <div
                class="mb-3"
                style="display: flex; justify-content: flex-start; align-items: center"
              >
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="หักได้"
                    @change="typeContractchange($event)"
                    :checked="typeContract == 'หักได้'"
                  />
                  <label class="form-check-label" for="inlineRadio1">หักได้</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="หักไม่ได้"
                    @change="typeContractchange($event)"
                    :checked="typeContract == 'หักไม่ได้'"
                  />
                  <label class="form-check-label" for="inlineRadio2">หักไม่ได้</label>
                </div>
              </div>
              <div style="margin-bottom: 10px">
                <MaterialInput
                  name="contractExpenses"
                  :value="contractExpenses"
                  @input="(event) => (contractExpenses = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="สาเหตุ"
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
