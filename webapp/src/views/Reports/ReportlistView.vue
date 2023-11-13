<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";

const listRoom = [
  { title: "ตึก 1" },
  { title: "ตึก 2" },
  { title: "ตึก 3" },
  { title: "ตึก 4" },
  { title: "ตึก 5" },
  { title: "ตึก 6" },
  { title: "ตึก 7" },
];

const NoRoom = [
  { title: "ชั้น 1" },
  { title: "ชั้น 2" },
  { title: "ชั้น 3" },
  { title: "ชั้น 4" },
  { title: "ชั้น 5" },
  { title: "ชั้น 6" },
  { title: "ชั้น 7" },
];

const userlist = [
  {
    dataIndex: "1",
    firstName: "สมชาย",
    lastName: "แสงทอง",
    Affiliation: "บก", //สังกัด
    rank: "ร้อยตรี", //ยศ
    old: "32",
    birthday: "04/03/2534",
    idcard: "134044411441122",
    phone: "0325647846",
  },
  {
    dataIndex: "2",
    firstName: "สมชัย",
    lastName: "แสงสุข",
    Affiliation: "กก", //สังกัด
    rank: "ร้อยตรี", //ยศ
    old: "32",
    birthday: "14/07/2534",
    idcard: "134044411441178",
    phone: "0325647845",
  },
];

export default {
  components: {
    MaterialInput,
    MaterialButton,
    Breadcrumbs,
  },
  setup() {
    return {
      listRoom,
      NoRoom,
      userlist,
      vueMkHeader,
      masterData,
    };
  },

  data() {
    return {
      optionYear: [
        { label: "2023", value: "2023" },
        { label: "2022", value: "2022" },
        { label: "2021", value: "2021" },
        { label: "2020", value: "2020" },
      ],
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
      selectedColor: "",
      firstName: "",
      lastName: "",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "",
      phone: "",
      selectedAffiliation: "",
      selectedYear: "2023",
      selectedMonth: "พฤศจิกายน",
      expensesList: [],
    };
  },
  created() {
    // this.getAllusers();
    this.getExpenses();
  },
  watch: {
    selectedColor: function (newValue) {
      // this.updateColor(newValue)
      console.log(newValue);
    },
  },
  methods: {
    changedLabel(event) {
      console.log(event);
      // this.selected = event;
    },

    async getExpenses() {
      try {
        await axios
          .get("http://localhost:3001/expenses")
          .then((res) => {
            this.expensesList = res.data;
            // console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    thaiNumber(num) {
      var array = {
        1: "๑",
        2: "๒",
        3: "๓",
        4: "๔",
        5: "๕",
        6: "๖",
        7: "๗",
        8: "๘",
        9: "๙",
        0: "๐",
      };
      var str = num.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }
      return str;
    },

    // var thaiNum = thaiNumber(12345);
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
        <div class="container-fluid">
          <div>
            <Breadcrumbs
              :routes="[{ label: 'หน้าหลัก', route: '/' }, { label: 'ระบบเรียกรายงาน' }]"
            />
          </div>
          <h4>ระบบเรียกรายงาน ประจำเดือน พฤศจิกายน</h4>
          <div class="row pt-4 min-vh-45">
            <div class="col-lg-3">
              <div
                class="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  บัญชีรายชื่อผู้พักอาศัยที่ถอนเงินเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง
                  ตร
                </button>
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  บัญชียอดหักค่าไฟฟ่าส่วนกลาง และค่าบํารุงลิฟตเพิ่มเติมประจําเดือน
                </button>
                <button
                  class="nav-link"
                  id="v-pills2-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills2-tab"
                  type="button"
                  role="tab"
                  aria-controls="v-pills2-tab"
                  aria-selected="false"
                >
                  บัญชีถอนค่าไฟฟ่าส่วนกลาง และค่าบํารุงลิฟตเพิ่มเติมประจําเดือน
                </button>
                <button
                  class="nav-link"
                  id="v-pills3-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills3-tab"
                  type="button"
                  role="tab"
                  aria-controls="v-pills3-tab"
                  aria-selected="false"
                >
                  บัญชีสรุป ยอดเงิน แยกตามบ้านพัก ของ ตร กับ ตชด
                </button>
                <button
                  class="nav-link"
                  id="v-pills4-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills4-tab"
                  type="button"
                  role="tab"
                  aria-controls="v-pills4-tab"
                  aria-selected="false"
                >
                  บัญชีการหักเงินค่าบํารุงสถานที่ และค่าประกันทรัพย์สินเสียหาย
                </button>
                <button
                  class="nav-link"
                  id="v-pills5-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills5-tab"
                  type="button"
                  role="tab"
                  aria-controls="v-pills5-tab"
                  aria-selected="false"
                >
                  บัญชีสรุปส่งการเงิน
                </button>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div>
                    <div class="text-center pt-4 table-responsive">
                      <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <button
                            class="nav-link active"
                            style="color: #57b05b"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            ตร.
                          </button>
                          <button
                            class="nav-link"
                            style="color: #57b05b"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                          >
                            บช.ตชด.
                          </button>
                        </div>
                      </nav>
                      <div class="tab-content" id="nav-tabContent">
                        <div
                          class="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div>
                            <div class="pt-4 text-start">
                              <!-- <h5>รวมค่าใช้จ่ายทั้งหมด : 950</h5> -->
                              <div class="mb-3">
                                <div class="form-check form-check-inline">
                                  <label style="margin-right: 20px">ประเภท</label>
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="typeUser"
                                    id="inlinetypeUser1"
                                    value="ตร."
                                    @change="typeUserchange($event)"
                                    checked
                                  />
                                  <label class="form-check-label" for="inlinetypeUser1"
                                    >บัญชีหน้างบ</label
                                  >
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="typeUser"
                                    id="inlinetypeUser"
                                    value="บช.ตชด."
                                    @change="typeUserchange($event)"
                                  />
                                  <label class="form-check-label" for="inlinetypeUser">
                                    รายละเอียดการหักเงินค่าบํารุงสถานที่
                                    และค่าประกันทรัพย์สินเสียหายประจําเดือน</label
                                  >
                                </div>
                              </div>
                              <div class="d-flex justify-content-end align-items-center">
                                <div class="mb-3 w-20" style="margin-right: 5px">
                                  <label>เดือน</label>
                                  <v-select
                                    :options="optionMonth"
                                    v-model="selectedMonth"
                                  ></v-select>
                                </div>
                                <div class="mb-3 w-20">
                                  <label>สังกัด</label>
                                  <v-select
                                    :options="masterData?.Affiliation"
                                    v-model="selectedAffiliation"
                                  ></v-select>
                                </div>

                                <div>
                                  <MaterialButton
                                    size="lg"
                                    class="btn-icon"
                                    style="margin-right: -30px"
                                  >
                                    <div class="d-flex align-items-center">
                                      <span style="margin-right: 5px">บันทึก</span>
                                      <img
                                        src="../../assets/img/pdf.png"
                                        alt="title"
                                        loading="lazy"
                                        width="40"
                                      />
                                    </div>
                                  </MaterialButton>
                                  <MaterialButton size="lg" class="btn-icon">
                                    <div class="d-flex align-items-center">
                                      <span style="margin-right: 5px">บันทึก</span>
                                      <img
                                        src="../../assets/img/excel.png"
                                        alt="title"
                                        loading="lazy"
                                        width="40"
                                      />
                                    </div>
                                  </MaterialButton>
                                </div>
                              </div>
                            </div>

                            <div>
                          <!-- <p class="text-center mt-4" style="text-decoration: underline">
                          บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพักอิสระ บช.ตชด.
                        </p>
                        <p class="text-center" style="text-decoration: underline">
                          ที่หักเงินเดือนเป็นค่าบำรุงรักษาสถานที่
                          และค่าประกันทรัพย์สินเสียหาย
                        </p>
                        <p class="text-center" style="text-decoration: underline">
                          ประจำเดือน ตุลาคม พ.ศ. 2566 หน่วยงาน บช.ตชด.
                        </p> -->
                          <table class="table table table-bordered">
                            <thead>
                              <tr>
                                <th rowspan="2">ลำดับ</th>
                                <th scope="col">ยศ</th>
                                <th scope="col">ชื่อ</th>
                                <th scope="col">ชื่อสกุล</th>
                                <th scope="col">อาคาร</th>
                                <th scope="col">ห้อง</th>
                                <th scope="col">ค่าบำรุง</th>
                                <th scope="col">ยอดหัก</th>
                                <th scope="col">ยอดหักสะสม</th>
                                <th scope="col">หมายเหตุ</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="nav-profile"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          ...
                        </div>
                        <div
                          class="tab-pane fade"
                          id="nav-contact"
                          role="tabpanel"
                          aria-labelledby="nav-contact-tab"
                        >
                          ...
                        </div>
                      </div>
                      <!-- <table class="table table-hover border border-2 border-success">
                    <thead class="border border-2 border-success border-bottom">
                      <tr>
                        <th scope="col">ชื่อ-สกุล</th>
                        <th scope="col">สังกัด</th>
                        <th scope="col">เลขก่อน</th>
                        <th scope="col">เลขหลัง</th>
                        <th scope="col">ค่าบำรุง</th>
                        <th scope="col">ค่าน้ำประปา</th>
                        <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                        <th scope="col">รวม</th>
                        <th scope="col">หักได้</th>
                        <th scope="col">หักไม่ได้</th>
                        <th scope="col">สาเหตุหักไม่ได้</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in expensesList" :key="index">
                        <td>
                          {{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}
                        </td>

                        <td>{{ item?.affiliation }}</td>
                        <td>{{ item?.installments }}</td>
                        <td>{{ item?.insurancecost }}</td>
                        <td>{{ item?.sumCost }}</td>
                        <td>{{ item?.waterbill }}</td>
                        <td>{{ item?.central }}</td>
                        <td>{{ item?.costs }}</td>
                        <td>/</td>
                        <td>-</td>
                        <td>{{ item?.contract }}</td>
                      </tr>
                    </tbody>
                  </table> -->
                    </div>

                    <!-- <div>
                          <p class="text-center mt-4" style="text-decoration: underline">
                          บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพักอิสระ บช.ตชด.
                        </p>
                        <p class="text-center" style="text-decoration: underline">
                          ที่หักเงินเดือนเป็นค่าบำรุงรักษาสถานที่
                          และค่าประกันทรัพย์สินเสียหาย
                        </p>
                        <p class="text-center" style="text-decoration: underline">
                          ประจำเดือน ตุลาคม พ.ศ. 2566 หน่วยงาน บช.ตชด.
                        </p>
                          <table class="table table table-bordered">
                            <thead>
                              <tr>
                                <th rowspan="2">ลำดับ</th>
                                <th scope="col">ยศ</th>
                                <th scope="col">ชื่อ</th>
                                <th scope="col">ชื่อสกุล</th>
                                <th scope="col">อาคาร</th>
                                <th scope="col">ห้อง</th>
                                <th scope="col">ค่าบำรุง</th>
                                <th scope="col">ยอดหัก</th>
                                <th scope="col">ยอดหักสะสม</th>
                                <th scope="col">หมายเหตุ</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                              </tr>
                            </tbody>
                          </table>
                        </div> -->
                  </div>
                </div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills-messages-tab"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                ></div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills2-tab"
                  role="tabpanel"
                  aria-labelledby="v-pills2-tab"
                ></div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills3-tab"
                  role="tabpanel"
                  aria-labelledby="v-pills3-tab"
                ></div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills4-tab"
                  role="tabpanel"
                  aria-labelledby="v-pills4-tab"
                ></div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills5-tab"
                  role="tabpanel"
                  aria-labelledby="v-pills5-tab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="userBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เพิ่มสมาชิก</h5>
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
                  :value="birthday"
                  @input="(event) => (birthday = event.target.value)"
                  class="input-group-static"
                  label="วันเกิด"
                  type="text"
                  placeholder="วันเกิด"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Affiliation"
                  @input="(event) => (Affiliation = event.target.value)"
                  class="input-group-static"
                  label="สังกัด"
                  type="text"
                  placeholder="สังกัด"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="rank"
                  @input="(event) => (rank = event.target.value)"
                  class="input-group-static"
                  label="ยศ"
                  type="text"
                  placeholder="ยศ"
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
                  :value="birthday"
                  @input="(event) => (birthday = event.target.value)"
                  class="input-group-static"
                  label="วันเกิด"
                  type="text"
                  placeholder="วันเกิด"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Affiliation"
                  @input="(event) => (Affiliation = event.target.value)"
                  class="input-group-static"
                  label="สังกัด"
                  type="text"
                  placeholder="สังกัด"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="rank"
                  @input="(event) => (rank = event.target.value)"
                  class="input-group-static"
                  label="ยศ"
                  type="text"
                  placeholder="ยศ"
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
</style>
