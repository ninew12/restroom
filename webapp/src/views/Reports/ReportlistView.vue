<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";
import pdfMake from "pdfmake";
// import pdfFonts from '@/assets/vfs_fonts.js'

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
      dataMonth: [
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
      externalDataRetrievedFromServer: [
        { name: "Bartek", age: 34 },
        { name: "John", age: 27 },
        { name: "Elizabeth", age: 30 },
      ],
      selectedColor: "",
      firstName: "",
      lastName: "",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "",
      phone: "",
      selectedAffiliation: "เลือกสังกัด",
      selectedYear: "2023",
      selectedMonth: "พฤศจิกายน",
      expensesList: [],
      reportType: "บัญชีหน้างบ",
      reportlistCTD: [],
      reportListTD: [],
      dateData: new Date(),
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    // this.getAllusers();
    this.getExpenses();
    this.getReport();
    this.getM();
  },
  watch: {
    selectedColor: function (newValue) {
      // this.updateColor(newValue)
      console.log(newValue);
    },
    selectedAffiliation: function (newValue) {
      if (newValue !== null) this.Affiliation = newValue.value;
    },
  },
  methods: {
    changedLabel(event) {
      console.log(event);
      // this.selected = event;
    },

    getM() {
      let m = this.dataMonth[this.dateData.getMonth() - 1];
      this.selectedMonth = m;
    },

    async getExpenses() {
      try {
        await axios
          .get("http://localhost:3897/expenses")
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

    typeUserchange(e) {
      this.reportType = e;
    },

    async getReport() {
      try {
        await axios
          .get("http://localhost:3897/report")
          .then((res) => {
            let data = [];
            let data2 = [];
            let arr1 = [];
            let arr2 = [];
            let data3 = res.data;
            let data4 = res.data;
            this.reportList = res.data;
            data = data3.filter((el) => el.typeUser == "บช.ตชด.");
            data2 = data4.filter((el) => el.typeUser == "ตร.");
            // arr1 = data3.filter((el) => el.installmentsRooom !== undefined);
            // arr2 = data4.filter((el) => el.installmentsRooom !== undefined);
            this.reportlistCTD = data;
            this.reportlistTD = data2;
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
    Previous() {
      window.history.back();
    },

    buildTableBody(data, columns) {
      var body = [];

      body.push(columns);

      data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      // console.log(body);
      // body[0][0] = "รายการ";
      // body[0][1] = "ประกัน";

      return body;
    },

    table(data, columns) {
      return {
        table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns),
        },
      };
    },

    exportPdf() {
      // pdfMake.vfs = pdfFonts.pdfMake.vfs // 2. set vfs pdf font
      pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
          bold:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
          italics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
          bolditalics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
        },
        // Kanit Font
        // Kanit: { // 3. set Kanit font
        //   normal: 'Kanit-Regular.ttf',
        //   bold: 'Kanit-Medium.ttf',
        //   italics: 'Kanit-Italic.ttf',
        //   bolditalics: 'Kanit-MediumItalic.ttf'
        // }
      };
      const docDefinition = {
        content: [
          { text: "Dynamic parts", style: "header" },
          this.table(this.reportList, ["typeAffiliation", "maintenance"]),
        ],
        // content: [
        //   {
        //     layout: "lightHorizontalLines", // optional
        //     table: {
        //       // headers are automatically repeated if the table spans over multiple pages
        //       headerRows: 1,
        //       widths: ["*", "auto", 100, "*"],

        //       body: [
        //         ["First", "Second", "Third", "The last one"],
        //         ["Value 1", "Value 2", "Value 3", "Value 4"],
        //         [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
        //       ],
        //     },
        //   },
        // ],
        defaultStyle: {
          // 4. default style 'KANIT' font to test
          font: "Roboto",
        },
      };
      // pdfMake.createPdf(docDefinition).open({}, window);
      pdfMake.createPdf(docDefinition).open();
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
              :routes="[
                { label: 'หน้าหลัก', route: '/home' },
                { label: 'ระบบเรียกรายงาน' },
              ]"
            />
          </div>
          <!-- <a @click="exportPdf">test</a> -->
          <div class="mb-3">
            <a
              style="display: flex; align-items: center; cursor: pointer"
              @click="Previous"
            >
              <span class="material-icons"> arrow_back_ios_new </span>
              <span>ย้อนกลับ</span>
            </a>
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
                  บัญชีสรุปส่งการเงิน
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
                  data-bs-target="#v-pills2"
                  type="button"
                  role="tab"
                  aria-controls="v-pills2"
                  aria-selected="false"
                >
                  บัญชีถอนค่าไฟฟ่าส่วนกลาง และค่าบํารุงลิฟตเพิ่มเติมประจําเดือน
                </button>
                <button
                  class="nav-link"
                  id="v-pills3-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills3"
                  type="button"
                  role="tab"
                  aria-controls="v-pills3"
                  aria-selected="false"
                >
                  บัญชีสรุป ยอดเงิน แยกตามบ้านพัก ของ ตร กับ ตชด
                </button>
                <button
                  class="nav-link"
                  id="v-pills4-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills4"
                  type="button"
                  role="tab"
                  aria-controls="v-pills4"
                  aria-selected="false"
                >
                  บัญชีการหักเงินค่าบํารุงสถานที่ และค่าประกันทรัพย์สินเสียหาย
                </button>
                <button
                  class="nav-link"
                  id="v-pills5-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills5"
                  type="button"
                  role="tab"
                  aria-controls="v-pills5"
                  aria-selected="false"
                >
                  บัญชีรายชื่อผู้พักอาศัยที่ถอนเงินเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง
                  ตร
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
                    <div>
                      <div class="pt-4 text-start">
                        <!-- <h5>รวมค่าใช้จ่ายทั้งหมด : 950</h5> -->
                        <div class="mb-3">
                          <div class="form-check form-check-inline">
                            <label style="margin-right: 20px">ประเภท</label>
                            <input
                              class="form-check-input"
                              type="radio"
                              name="typeUser1"
                              id="typeUser1"
                              value="บัญชีหน้างบ"
                              :checked="reportType == 'บัญชีหน้างบ'"
                              @change="typeUserchange('บัญชีหน้างบ')"
                            />
                            <label class="form-check-label" for="typeUser1"
                              >บัญชีหน้างบ</label
                            >
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="typeUser2"
                              id="typeUser2"
                              value="ประกันทรัพย์สิน"
                              :checked="reportType == 'ประกันทรัพย์สิน'"
                              @change="typeUserchange('ประกันทรัพย์สิน')"
                            />
                            <label class="form-check-label" for="typeUser2">
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
                      <div class="text-center pt-4 table-responsive">
                        <table class="table table table-bordered">
                          <thead>
                            <tr>
                              <th rowspan="2">ลำดับ</th>
                              <th rowspan="2">รายการ</th>
                              <th colspan="3">จำนวนเงิน(บาท)</th>
                            </tr>
                            <tr>
                              <th>ค่าธรรมเนียม</th>
                              <th>ค่าน้ําประปา</th>
                              <th>ค่าไฟฟ้าฯ</th>
                              <th>รวม</th>
                            </tr>
                          </thead>
                          <!-- reportlistCTD -->
                          <tbody>
                            <tr v-for="(item, index) in reportlistTD" :key="index">
                              <th scope="row">{{ index + 1 }}</th>
                              <td>{{ item?.typeAffiliation || "-" }}</td>
                              <td>{{ item?.maintenance || "-" }}</td>
                              <td>{{ item?.waterbill || "-" }}</td>
                              <td>{{ item?.electricitybill || "-" }}</td>
                              <td>{{ item?.sumCost || "-" }}</td>
                            </tr>
                            <tr>
                              <th scope="row" colspan="2">รวมเงิน</th>
                              <th>900</th>
                              <th>200</th>
                              <th>1000</th>
                              <th>2100</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
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
                            name="typeUser5"
                            id="typeUser5"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ')"
                          />
                          <label class="form-check-label" for="typeUser5"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser6"
                            id="typeUser6"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน')"
                          />
                          <label class="form-check-label" for="typeUser6">
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
                    <div
                      v-if="reportType == 'บัญชีหน้างบ'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">รายการ</th>
                            <th colspan="3">จำนวนเงิน(บาท)</th>
                          </tr>
                          <tr>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่าน้ําประปา</th>
                            <th>ค่าไฟฟ้าฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>900</th>
                            <th>200</th>
                            <th>1000</th>
                            <th>2100</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลขที่ห้อง</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col">เลขก่อน</th>
                            <th scope="col">เลขหลัง</th>
                            <th scope="col">ยอดใช้</th>
                            <th scope="col">ค่าธรรมเนียม</th>
                            <th scope="col">ค่าน้ำ</th>
                            <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                            <th scope="col">รวม</th>
                            <th scope="col">หักได้</th>
                            <th scope="col">หักไม่ได้</th>
                            <th scope="col">สาเหตุที่หักไม่ได้</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.roomnumber }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.numberfirst || "-" }}</td>
                            <td>{{ item?.lastnumber || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="6">รวมเงิน</th>
                            <th>400</th>
                            <th>200</th>
                            <th>400</th>
                            <th>1000</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills2"
                  role="tabpanel"
                  aria-labelledby="v-pills2-tab"
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
                            name="typeUser9"
                            id="typeUser9"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ')"
                          />
                          <label class="form-check-label" for="typeUser9"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser10"
                            id="typeUser10"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน')"
                          />
                          <label class="form-check-label" for="typeUser10">
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
                    <div
                      v-if="reportType == 'บัญชีหน้างบ'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">รายการ</th>
                            <th colspan="3">จำนวนเงิน(บาท)</th>
                          </tr>
                          <tr>
                            <th>ค่าไฟฟ้าส่วนกลาง</th>
                            <th>ค่าบำรุงลิฟต์</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.costs || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>900</th>
                            <th>200</th>
                            <th>1100</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">บ้านพัก</th>
                            <th scope="col">เลขที่ห้อง</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col">หน่วย</th>
                            <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                            <th scope="col">ค่าบำรุงลิฟต์</th>
                            <th scope="col">รวม</th>
                            <th scope="col">หักได้</th>
                            <th scope="col">หักไม่ได้</th>
                            <th scope="col">สาเหตุที่หักไม่ได้</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.buildingName || "-" }}</td>
                            <td>{{ item?.roomnumber || "-" }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>
                              {{ item?.lastnumber - item?.numberfirst || "-" }}
                            </td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.costs || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="5">รวมเงิน</th>
                            <th>140</th>
                            <th>200</th>
                            <th>340</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
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
                            name="typeUser13"
                            id="typeUser13"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ')"
                          />
                          <label class="form-check-label" for="typeUser13"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser14"
                            id="typeUser14"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน')"
                          />
                          <label class="form-check-label" for="typeUser14">
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
                    <div
                      v-if="reportType == 'บัญชีหน้างบ'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">รายการ</th>
                            <th colspan="3">จำนวนเงิน(บาท)</th>
                          </tr>
                          <tr>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่าน้ําประปา</th>
                            <th>ค่าไฟฟ้าฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>900</th>
                            <th>200</th>
                            <th>1000</th>
                            <th>2100</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลขที่ห้อง</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col">เลขก่อน</th>
                            <th scope="col">เลขหลัง</th>
                            <th scope="col">ยอดใช้</th>
                            <th scope="col">ค่าธรรมเนียม</th>
                            <th scope="col">ค่าน้ำ</th>
                            <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                            <th scope="col">รวม</th>
                            <th scope="col">หักได้</th>
                            <th scope="col">หักไม่ได้</th>
                            <th scope="col">สาเหตุที่หักไม่ได้</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.roomnumber || "-" }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.numberfirst || "-" }}</td>
                            <td>{{ item?.lastnumber || "-" }}</td>
                            <td>
                              {{ item?.lastnumber - item?.numberfirst || "-" }}
                            </td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="6">รวมเงิน</th>
                            <th>400</th>
                            <th>200</th>
                            <th>400</th>
                            <th>1000</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills3"
                  role="tabpanel"
                  aria-labelledby="v-pills3-tab"
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
                            name="typeUser17"
                            id="typeUser17"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ')"
                          />
                          <label class="form-check-label" for="typeUser17"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser18"
                            id="typeUser18"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน')"
                          />
                          <label class="form-check-label" for="typeUser18">
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
                    <div
                      v-if="reportType == 'บัญชีหน้างบ'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">รายงาน</th>
                            <th colspan="3">จำนวนเงิน (บาท)</th>
                          </tr>
                          <tr>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่านำประปา</th>
                            <th>ค่าไฟฟ้าฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                            <th>1300</th>
                            <th>300</th>
                            <th>1000</th>
                            <th>2600</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">ชื่อ-สกุล</th>
                            <th rowspan="2">อาคาร</th>
                            <th rowspan="2">เลขที่ห้อง</th>
                            <th rowspan="2">การหักเงินค่าบำรุง</th>
                            <th colspan="3">การหักเงินค่าประกัน</th>
                          </tr>
                          <tr>
                            <th>ยอดหัก</th>
                            <th>ยอดหักสะสม</th>
                            <th>หมายเหตุ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.buildingName || "-" }}</td>
                            <td>{{ item?.roomnumber }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>
                              {{ item?.insurance / item?.installments || "-" }}
                            </td>
                            <td>{{ item?.amountPaid || "-" }}</td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>
                          <tr>
                            <th scope="row" colspan="4">รวมเงิน</th>
                            <th>200</th>
                            <th>-</th>
                            <th colspan="2">200</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills4"
                  role="tabpanel"
                  aria-labelledby="v-pills4-tab"
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
                                    name="typeUser31"
                                    id="typeUser31"
                                    value="บัญชีหน้างบ"
                                    :checked="reportType == 'บัญชีหน้างบ'"
                                    @change="typeUserchange('บัญชีหน้างบ')"
                                  />
                                  <label class="form-check-label" for="typeUser31"
                                    >บัญชีหน้างบ</label
                                  >
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="typeUser32"
                                    id="typeUser32"
                                    value="ประกันทรัพย์สิน"
                                    :checked="reportType == 'ประกันทรัพย์สิน'"
                                    @change="typeUserchange('ประกันทรัพย์สิน')"
                                  />
                                  <label class="form-check-label" for="typeUser32">
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
                            <div
                              v-if="reportType == 'บัญชีหน้างบ'"
                              class="text-center pt-4 table-responsive"
                            >
                              <table class="table table table-bordered">
                                <thead>
                                  <tr>
                                    <th rowspan="2">ลำดับ</th>
                                    <th rowspan="2">หน่วยงาน</th>
                                    <th colspan="3">จำนวนเงิน (บาท)</th>
                                  </tr>
                                  <tr>
                                    <th>ค่าบำรุง</th>
                                    <th>ค่าประกัน</th>
                                    <th>รวม</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in reportlistTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item?.typeAffiliation || "-" }}</td>
                                    <td>{{ item?.insurance || "-" }}</td>
                                    <td>{{ item?.waterbill || "-" }}</td>
                                    <td>{{ item?.sumCost || "-" }}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                                    <th>1300</th>
                                    <th>300</th>
                                    <th>1600</th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div
                              v-if="reportType == 'ประกันทรัพย์สิน'"
                              class="text-center pt-4 table-responsive"
                            >
                              <table class="table table table-bordered">
                                <thead>
                                  <tr>
                                    <th rowspan="2">ลำดับ</th>
                                    <th rowspan="2">ชื่อ-สกุล</th>
                                    <th rowspan="2">อาคาร</th>
                                    <th rowspan="2">เลขที่ห้อง</th>
                                    <th rowspan="2">การหักเงินค่าบำรุง</th>
                                    <th colspan="3">การหักเงินค่าประกัน</th>
                                  </tr>
                                  <tr>
                                    <th>ยอดหัก</th>
                                    <th>ยอดหักสะสม</th>
                                    <th>หมายเหตุ</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in reportlistTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                      {{ item?.rank }} {{ item?.firstName }}
                                      {{ item?.lastName }}
                                    </td>
                                    <td>{{ item?.buildingName || "-" }}</td>
                                    <td>{{ item?.roomnumber || "-" }}</td>
                                    <td>{{ item?.maintenance || "-" }}</td>
                                    <td>
                                      {{ item?.insurance / item?.installments || "-" }}
                                    </td>
                                    <td>{{ item?.amountPaid || "-" }}</td>
                                    <td>{{ item?.contractExpenses || "-" }}</td>
                                  </tr>

                                  <tr>
                                    <th scope="row" colspan="4">รวมเงิน</th>
                                    <th>200</th>
                                    <th>-</th>
                                    <th colspan="2">200</th>
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
                          <div>
                            <div class="pt-4 text-start">
                              <!-- <h5>รวมค่าใช้จ่ายทั้งหมด : 950</h5> -->
                              <div class="mb-3">
                                <div class="form-check form-check-inline">
                                  <label style="margin-right: 20px">ประเภท</label>
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="typeUser21"
                                    id="typeUser21"
                                    value="บัญชีหน้างบ"
                                    :checked="reportType == 'บัญชีหน้างบ'"
                                    @change="typeUserchange('บัญชีหน้างบ')"
                                  />
                                  <label class="form-check-label" for="typeUser21"
                                    >บัญชีหน้างบ</label
                                  >
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="typeUser22"
                                    id="typeUser22"
                                    value="ประกันทรัพย์สิน"
                                    :checked="reportType == 'ประกันทรัพย์สิน'"
                                    @change="typeUserchange('ประกันทรัพย์สิน')"
                                  />
                                  <label class="form-check-label" for="typeUser22">
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
                            <div
                              v-if="reportType == 'บัญชีหน้างบ'"
                              class="text-center pt-4 table-responsive"
                            >
                              <table class="table table table-bordered">
                                <thead>
                                  <tr>
                                    <th rowspan="2">ลำดับ</th>
                                    <th rowspan="2">หน่วยงาน</th>
                                    <th colspan="3">จำนวนเงิน (บาท)</th>
                                  </tr>
                                  <tr>
                                    <th>ค่าบำรุง</th>
                                    <th>ค่าประกัน</th>
                                    <th>รวม</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in reportlistCTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item?.typeAffiliation || "-" }}</td>
                                    <td>{{ item?.insurance || "-" }}</td>
                                    <td>{{ item?.waterbill || "-" }}</td>
                                    <td>{{ item?.sumCost || "-" }}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                                    <th>1300</th>
                                    <th>300</th>
                                    <th>1600</th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div
                              v-if="reportType == 'ประกันทรัพย์สิน'"
                              class="text-center pt-4 table-responsive"
                            >
                              <table class="table table table-bordered">
                                <thead>
                                  <tr>
                                    <th rowspan="2">ลำดับ</th>
                                    <th rowspan="2">ชื่อ-สกุล</th>
                                    <th rowspan="2">อาคาร</th>
                                    <th rowspan="2">เลขที่ห้อง</th>
                                    <th rowspan="2">การหักเงินค่าบำรุง</th>
                                    <th colspan="3">การหักเงินค่าประกัน</th>
                                  </tr>
                                  <tr>
                                    <th>ยอดหัก</th>
                                    <th>ยอดหักสะสม</th>
                                    <th>หมายเหตุ</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in reportlistCTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                      {{ item?.rank }} {{ item?.firstName }}
                                      {{ item?.lastName }}
                                    </td>
                                    <td>{{ item?.buildingName || "-" }}</td>
                                    <td>{{ item?.roomnumber || "-" }}</td>
                                    <td>{{ item?.maintenance || "-" }}</td>
                                    <td>
                                      {{ item?.insurance / item?.installments || "-" }}
                                    </td>
                                    <td>{{ item?.amountPaid || "-" }}</td>
                                    <td>{{ item?.contractExpenses || "-" }}</td>
                                  </tr>

                                  <tr>
                                    <th scope="row" colspan="4">รวมเงิน</th>
                                    <th>200</th>
                                    <th>-</th>
                                    <th colspan="2">200</th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="v-pills5"
                  role="tabpanel"
                  aria-labelledby="v-pills5-tab"
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
                            name="typeUser23"
                            id="typeUser23"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ')"
                          />
                          <label class="form-check-label" for="typeUser23"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser24"
                            id="typeUser24"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน')"
                          />
                          <label class="form-check-label" for="typeUser24">
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
                    <div
                      v-if="reportType == 'บัญชีหน้างบ'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">ลำดับ</th>
                            <th rowspan="2">รายการ</th>
                            <th colspan="3">จำนวนเงิน(บาท)</th>
                          </tr>
                          <tr>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่าน้ําประปา</th>
                            <th>ค่าไฟฟ้าฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                              {{ item?.typeAffiliation || "-" }}
                            </td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                          </tr>

                          <tr>
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>900</th>
                            <th>200</th>
                            <th>1000</th>
                            <th>2100</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลขที่ห้อง</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col">เลขก่อน</th>
                            <th scope="col">เลขหลัง</th>
                            <th scope="col">ยอดใช้</th>
                            <th scope="col">ค่าธรรมเนียม</th>
                            <th scope="col">ค่าน้ำ</th>
                            <th scope="col">ค่าไฟฟ้าส่วนกลาง</th>
                            <th scope="col">รวม</th>
                            <th scope="col">หักได้</th>
                            <th scope="col">หักไม่ได้</th>
                            <th scope="col">สาเหตุที่หักไม่ได้</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.roomnumber || "-" }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.numberfirst }}</td>
                            <td>{{ item?.lastnumber }}</td>
                            <td>
                              {{ item?.lastnumber - item?.numberfirst || "-" }}
                            </td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.sumCost || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>

                          <tr>
                            <th scope="row" colspan="6">รวมเงิน</th>
                            <th>400</th>
                            <th>200</th>
                            <th>400</th>
                            <th>1000</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
