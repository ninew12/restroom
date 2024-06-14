<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";
import pdfMake from "pdfmake";
import * as XLSX from "xlsx/xlsx.mjs";
import pdfFonts from "@/assets/fonts/vfs_font_v2.js";
// import pdfFonts from 'vfs_fonts.js'

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
      optionYear: [
        { label: "2023", value: "2023" },
        { label: "2022", value: "2022" },
        { label: "2021", value: "2021" },
        { label: "2020", value: "2020" },
      ],
      optionMonth: [
        { label: "มกราคม", value: "1" },
        { label: "กุมภาพันธ์", value: "2" },
        { label: "มีนาคม", value: "3" },
        { label: "เมษายน", value: "4" },
        { label: "พฤษภาคม", value: "5" },
        { label: "มิถุนายน", value: "6" },
        { label: "กรกฎาคม", value: "7" },
        { label: "สิงหาคม", value: "8" },
        { label: "กันยายน", value: "9" },
        { label: "ตุลาคม", value: "10" },
        { label: "พฤศจิกายน", value: "11" },
        { label: "ธันวาคม", value: "12" },
      ],
      AffiliationListOld: [
        {
          label: "บช.ตชด.",
          value: "บช.ตชด.",
        },
        {
          label: "บก.อก.",
          value: "บก.อก.บช.ตชด.",
        },
        {
          label: "บก.สสน.",
          value: "บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝอ.1",
          value: "ฝอ.1 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.2",
          value: "ฝอ.2 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.3",
          value: "ฝอ.3 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.4",
          value: "ฝอ.4 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.5",
          value: "ฝอ.5 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.6",
          value: "ฝอ.6 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.7",
          value: "ฝอ.7 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.8",
          value: "ฝอ.8 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝสสน.1",
          value: "ฝสสน.1 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.2",
          value: "ฝสสน.2 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.3",
          value: "ฝสสน.3 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.4",
          value: "ฝสสน.4 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.5",
          value: "ฝสสน.5 บก.สสน.บช.ตชด.",
        },
        {
          label: "ลูกจ้าง",
          value: "ลูกจ้าง",
        },
      ],
      AffiliationListTR: [
        {
          label: "บช.ตชด.",
          value: "บช.ตชด.",
        },
        {
          label: "บก.อก.",
          value: "บก.อก.บช.ตชด.",
        },
        {
          label: "บก.สสน.",
          value: "บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝอ.1",
          value: "ฝอ.1 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.2",
          value: "ฝอ.2 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.3",
          value: "ฝอ.3 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.4",
          value: "ฝอ.4 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.5",
          value: "ฝอ.5 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.6",
          value: "ฝอ.6 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.7",
          value: "ฝอ.7 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.8",
          value: "ฝอ.8 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝสสน.1",
          value: "ฝสสน.1 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.2",
          value: "ฝสสน.2 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.3",
          value: "ฝสสน.3 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.4",
          value: "ฝสสน.4 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.5",
          value: "ฝสสน.5 บก.สสน.บช.ตชด.",
        },
        {
          label: "ลูกจ้าง",
          value: "ลูกจ้าง",
        },
      ],
      AffiliationListTD: [
        {
          label: "บช.ตชด.",
          value: "บช.ตชด.",
        },
        {
          label: "บก.อก.",
          value: "บก.อก.บช.ตชด.",
        },
        {
          label: "บก.สสน.",
          value: "บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝอ.1",
          value: "ฝอ.1 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.2",
          value: "ฝอ.2 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.3",
          value: "ฝอ.3 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.4",
          value: "ฝอ.4 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.5",
          value: "ฝอ.5 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.6",
          value: "ฝอ.6 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.7",
          value: "ฝอ.7 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.8",
          value: "ฝอ.8 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝสสน.1",
          value: "ฝสสน.1 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.2",
          value: "ฝสสน.2 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.3",
          value: "ฝสสน.3 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.4",
          value: "ฝสสน.4 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.5",
          value: "ฝสสน.5 บก.สสน.บช.ตชด.",
        },
        {
          label: "ลูกจ้าง",
          value: "ลูกจ้าง",
        },
      ],
      AffiliationListCTD: [
        {
          label: "บช.ตชด.",
          value: "บช.ตชด.",
        },
        {
          label: "บก.อก.",
          value: "บก.อก.บช.ตชด.",
        },
        {
          label: "บก.สสน.",
          value: "บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝอ.1",
          value: "ฝอ.1 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.2",
          value: "ฝอ.2 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.3",
          value: "ฝอ.3 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.4",
          value: "ฝอ.4 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.5",
          value: "ฝอ.5 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.6",
          value: "ฝอ.6 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.7",
          value: "ฝอ.7 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝอ.8",
          value: "ฝอ.8 บก.อก.บช.ตชด.",
        },
        {
          label: "ฝสสน.1",
          value: "ฝสสน.1 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.2",
          value: "ฝสสน.2 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.3",
          value: "ฝสสน.3 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.4",
          value: "ฝสสน.4 บก.สสน.บช.ตชด.",
        },
        {
          label: "ฝสสน.5",
          value: "ฝสสน.5 บก.สสน.บช.ตชด.",
        },
        {
          label: "ลูกจ้าง",
          value: "ลูกจ้าง",
        },
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
      selectedMonth: "",
      expensesList: [],
      reportType: "บัญชีหน้างบ",
      reportlistCTD: [],
      reportListTD: [],
      reportlistok: [],
      reportListssn: [],
      reportlistlj: [],
      reportlistokTD: [],
      reportListssnTD: [],
      reportlistljTD: [],
      jsonData: [],
      jsonFiled: [],
      dateData: new Date(),
      mountNumber: 0,
      yearNumber: 0,
      tableId: "",
      typeReport: "ตร.",
      monthYear: "",
      monthYearNow: "",
      monthYearNowtable: "",
      monthYearTable: "",
      monthYearTableTR: "",
      monthYearNowTR: "",
      mountTR: "",
      datalistCTD: [],
      datalistTD: [],
      sumreportlistAll: [],
      sumreportlistAll2: [],
      sumreportlistAll3: [],
      sumreportlistAll4: [],
      sumreportlistAll5: [],
      sumreportlistAll6: [],
      maintenanceAllcount: 0,
      insuranceAllcount: 0,
      sumAllcount: 0,
      costsAllcount: 0,
      CostCostsAllcount: 0,
      centralAllcount: 0,
      Costdatawaterbillcount: 0,
      electricitybillAllcount: 0,
      waterbillAllcount: 0,
      maintenancefeeAllcount: 0,
      maintenanceAllcountTD: 0,
      insuranceAllcountTD: 0,
      sumAllcountTD: 0,
      costsAllcountTD: 0,
      CostCostsAllcountTD: 0,
      centralAllcountTD: 0,
      CostdatawaterbillcountTD: 0,
      electricitybillAllcountTD: 0,
      waterbillAllcountTD: 0,
      maintenancefeeAllcountTD: 0,
      ranksAll: "",
      selectedranksAll: "เลือกยศ",
      dateNow: "",
      deductibleCTD: [],
      deductibleTD: [],
      submenus: "submenu1",
      AffiliationLable: "",
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    // this.getAllusers();
    this.getExpenses();
    this.getM();
    pdfMake.vfs = pdfFonts;
  },
  watch: {
    selectedColor: function (newValue) {
      // this.updateColor(newValue)
      console.log(newValue);
    },
    selectedAffiliation: function (newValue) {
      if (newValue !== null) {
        if (newValue?.label !== undefined) {
          if (newValue.label != "ทั้งหมด") {
            this.Affiliation = newValue.value;
            let x = this.AffiliationListOld.findIndex((el) => el.label == newValue.label);
            this.AffiliationLable = this.AffiliationListOld[x].value;
            this.getReportAffiliation(this.mountLable, this.yearNumber, this.Affiliation);
          } else {
            this.AffiliationLable = "";
            this.getReport(this.mountLable, this.yearNumber);
          }
        }
      }
    },
    selectedranksAll: function (newValue) {
      if (newValue !== null) {
        if (newValue?.label !== undefined) {
          if (newValue.label != "ทั้งหมด") {
            this.ranksAll = newValue.value;
            this.getReportRanksAll(this.mountLable, this.yearNumber, this.ranksAll);
          } else {
            this.getReport(this.mountLable, this.yearNumber);
          }
        }
      }
    },
    selectedMonth: function (newValue) {
      let result;
      let result2;
      let result3;
      if (newValue !== null) {
        if (newValue?.label !== undefined) {
          let x = this.optionMonth.findIndex((el) => el.label == newValue.label);
          let y = this.dateData.getFullYear();
          this.mountNumber = x + 1;
          this.yearNumber = y;
          this.mountLable = newValue.label;
          this.dateNow = newValue.label;
          if (this.optionMonth[x - 1] !== undefined) {
            let today = new Date();
            this.yearNow = y;
            this.yearNumber = y;
            this.mountCT = this.optionMonth[x - 1].label;
            result = today.toLocaleDateString("th-TH", {
              year: "numeric",
            });
            result2 = today.toLocaleDateString("th-TH", {
              year: "numeric",
            });
            result3 = today.toLocaleDateString("th-TH", {
              year: "numeric",
            });

            if (this.optionMonth[x - 2] !== undefined) {
              this.mountTR = this.optionMonth[x - 2].label;
              this.yearNumberTR = this.dateData.getFullYear();
            } else {
              let tday = new Date();
              let tday2 = new Date();
              let m = tday.getMonth();
              tday2.setMonth(m - 1);
              this.mountTR = "ธันวาคม";
              this.yearNumberTR = this.dateData.getFullYear() - 1;
              result2 = tday.toLocaleDateString("th-TH", {
                year: "numeric",
              });
              result3 = tday2.toLocaleDateString("th-TH", {
                year: "numeric",
              });
            }
          } else {
            let tday = new Date();
            let tday2 = new Date();
            let m = tday.getMonth();
            this.mountCT = "ธันวาคม";
            this.mountTR = "พฤศจิกายน";
            this.yearNow = y;
            this.yearNumber = this.dateData.getFullYear() - 1;
            this.yearNumberTR = this.dateData.getFullYear() - 1;
            result = tday.toLocaleDateString("th-TH", {
              year: "numeric",
            });
            tday2.setMonth(m - 1);
            result2 = tday2.toLocaleDateString("th-TH", {
              year: "numeric",
            });
            result3 = tday2.toLocaleDateString("th-TH", {
              year: "numeric",
            });
          }

          let m = newValue.label;
          this.monthYear = this.mountCT + " " + this.thaiNumber(result2, "year");
          this.monthYearNow = newValue.label + " " + this.thaiNumber(result, "year");
          this.monthYearNowTR = this.mountTR + " " + this.thaiNumber(result3, "year");
          this.monthYearTable = this.mountCT + " " + result2;
          this.monthYearTableTR = this.mountTR + " " + result3;
          this.monthYearNowtable = m + " " + result;
          this.getReport(m, this.yearNumber);
        }
      }
    },
  },
  methods: {
    typeChange(e) {
      this.typeReport = e;
    },

    seleteMenu(e) {
      this.submenus = e;
    },

    async getM() {
      const d = new Date();
      let m;
      let result;
      let result2;
      let result3;
      if (this.dataMonth[d.getMonth() - 1] == undefined) {
        m = "มกราคม";
      } else {
        m = this.dataMonth[d.getMonth()];
      }

      let y = this.dateData.getFullYear();
      let x = this.optionMonth.findIndex((el) => el.label == m);
      this.mountNumber = x + 1;
      this.yearNumber = y;
      this.yearNow = y;
      this.mountLable = m;
      this.selectedMonth = m;
      const today = new Date();
      const todaynew = new Date();
      const month = today.getMonth();
      today.setMonth(month - 1);
      this.dateNow = this.dataMonth[todaynew.getMonth()];
      if (this.optionMonth[x - 1] !== undefined) {
        let today = new Date();
        this.yearNow = y;
        this.yearNumber = y;
        this.mountCT = this.optionMonth[x - 1].label;
        result = today.toLocaleDateString("th-TH", {
          year: "numeric",
        });
        result2 = today.toLocaleDateString("th-TH", {
          year: "numeric",
        });
        result3 = today.toLocaleDateString("th-TH", {
          year: "numeric",
        });

        if (this.optionMonth[x - 2] !== undefined) {
          this.mountTR = this.optionMonth[x - 2].label;
          this.yearNumberTR = this.dateData.getFullYear();
        } else {
          let tday = new Date();
          let tday2 = new Date();
          let m = tday.getMonth();
          tday2.setMonth(m - 1);
          this.mountTR = "ธันวาคม";
          this.yearNumberTR = this.dateData.getFullYear() - 1;
          result2 = tday.toLocaleDateString("th-TH", {
            year: "numeric",
          });
          result3 = tday2.toLocaleDateString("th-TH", {
            year: "numeric",
          });
        }
      } else {
        let tday = new Date();
        let tday2 = new Date();
        let m = tday.getMonth();
        this.mountCT = "ธันวาคม";
        this.mountTR = "พฤศจิกายน";
        this.yearNow = y;
        this.yearNumber = this.dateData.getFullYear() - 1;
        this.yearNumberTR = this.dateData.getFullYear() - 1;
        result = tday.toLocaleDateString("th-TH", {
          year: "numeric",
        });
        tday2.setMonth(m - 1);
        result2 = tday2.toLocaleDateString("th-TH", {
          year: "numeric",
        });
        result3 = tday2.toLocaleDateString("th-TH", {
          year: "numeric",
        });
      }

      this.monthYear = this.mountCT + " " + this.thaiNumber(result2, "year");
      this.monthYearNow = this.dateNow + " " + this.thaiNumber(result, "year");
      this.monthYearNowTR = this.mountTR + " " + this.thaiNumber(result3, "year");
      this.monthYearTable = this.mountCT + " " + result2;
      this.monthYearTableTR = this.mountTR + " " + result3;
      this.monthYearNowtable = m + " " + result;
      await this.getReport(m, this.yearNumber);
    },

    async getExpenses() {
      try {
        await axios
          .get("http://localhost:3899/expenses")
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

    typeUserchange(e, id) {
      this.reportType = e;
      this.tableId = id;
    },

    async getReport(m, y) {
      this.reportlistok = [];
      this.reportListssn = [];
      this.reportlistlj = [];
      this.sumreportlistAll = [];
      this.sumreportlistAll2 = [];
      this.sumreportlistAll3 = [];
      try {
        axios
          .get("http://localhost:3899/report")
          .then((res) => {
            let data = [];
            let data2 = [];
            let data5 = [];
            let data6 = [];
            let data7 = [];
            let data8 = [];
            let data9 = [];
            let dataTR = [];
            let data13 = [];
            let data14 = [];
            let data15 = [];
            let data55 = [];
            let data66 = [];
            let data77 = [];
            let data3 = res.data;
            let data4 = res.data;
            let data44 = res.data;
            this.reportList = res.data;
            
            data55 = data44.filter(
              (el55) =>
                (el55.typeAffiliation == "บช.ตชด." || el55.typeAffiliation == "บก.อก.") &&
                (el55.monthly == this.dateNow || el55.monthly == this.mountCT) &&
                (el55.years == this.yearNow || el55.monthly ==  y)
            );
            data66 = data44.filter(
              (el66) =>
                el66.typeAffiliation == "บก.สสน." &&
                (el66.monthly == this.dateNow || el66.monthly == this.mountCT) &&
                (el66.years == this.yearNow || el66.monthly ==  y)
            );
            data77 = data44.filter(
              (el77) =>
                el77.typeAffiliation == "ลูกจ้าง" &&
                (el77.monthly == this.dateNow || el77.monthly == this.mountCT) &&
                (el77.years == this.yearNow || el77.monthly ==  y)
            );

            data5 = data3.filter(
              (el6) =>
                el6.typeUser == "บช.ตชด." &&
                (el6.typeAffiliation == "บช.ตชด." || el6.typeAffiliation == "บก.อก.") &&
                el6.monthly == this.dateNow &&
                el6.years == this.yearNow
            );
            data6 = data3.filter(
              (el5) =>
                el5.typeUser == "บช.ตชด." &&
                el5.typeAffiliation == "บก.สสน." &&
                el5.monthly == this.dateNow &&
                el5.years == this.yearNow
            );
            data7 = data3.filter(
              (el4) =>
                el4.typeUser == "บช.ตชด." &&
                el4.typeAffiliation == "ลูกจ้าง" &&
                el4.monthly == this.dateNow &&
                el4.years == this.yearNow
            );
      
            data13 = data4.filter(
              (el7) =>
                el7.typeUser == "ตร." &&
                (el7.typeAffiliation == "บช.ตชด." || el7.typeAffiliation == "บก.อก.") &&
                el7.monthly == this.mountCT &&
                el7.years == y
            );
            data14 = data4.filter(
              (el8) =>
                el8.typeUser == "ตร." &&
                el8.typeAffiliation == "บก.สสน." &&
                el8.monthly == this.mountCT &&
                el8.years == y
            );
            data15 = data4.filter(
              (el9) =>
                el9.typeUser == "ตร." &&
                el9.typeAffiliation == "ลูกจ้าง" &&
                el9.monthly == this.mountCT &&
                el9.years == y
            );
      
            data = data3.filter(
              (el) =>
                el.typeUser == "บช.ตชด." &&
                el.monthly == this.dateNow &&
                el.years == this.yearNow
            );
            data2 = data4.filter(
              (el2) =>
                el2.typeUser == "ตร." &&
                el2.typeContract == "หักได้" &&
                el2.monthly == this.mountCT &&
                el2.years == y
            );

            dataTR = data4.filter(
              (el2) =>
                el2.typeUser == "ตร." &&
                el2.typeContract == "หักได้" &&
                el2.monthly == this.mountTR &&
                el2.years == this.yearNumberTR
            );

            data8 = data4.filter(
              (el8) =>
                el8.typeUser == "ตร." &&
                el8.typeContract == "หักไม่ได้" &&
                el8.monthly == this.mountCT &&
                el8.years == y
            );

            data9 = data3.filter(
              (el9) =>
                el9.typeUser == "บช.ตชด." &&
                el9.monthly == this.mountCT &&
                el9.years == this.yearNow
            );
            this.mapData(data, data2, data8, data9, dataTR);
            this.mapData2(data5, data6, data7, data13, data14, data15, data55, data66, data77);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getReportAffiliation(m, y, Affiliation) {
      try {
        axios
          .get("http://localhost:3899/report")
          .then((res) => {
            let data = [];
            let data2 = [];
            let data8 = [];
            let data9 = [];
            let dataTR = [];
            let data3 = res.data;
            let data4 = res.data;

            data = data3.filter(
              (el) =>
                el.typeUser == "บช.ตชด." &&
                el.monthly == this.dateNow &&
                el.years == this.yearNow &&
                el.affiliation == Affiliation
            );
            data2 = data4.filter(
              (el2) =>
                el2.typeUser == "ตร." &&
                el2.typeContract == "หักได้" &&
                el2.monthly == this.mountCT &&
                el2.years == y &&
                el2.affiliation == Affiliation
            );

            data8 = data4.filter(
              (el8) =>
                el8.typeUser == "ตร." &&
                el8.typeContract == "หักไม่ได้" &&
                el8.monthly == this.mountCT &&
                el8.years == y &&
                el8.affiliation == Affiliation
            );

            dataTR = data4.filter(
              (el7) =>
                el7.typeUser == "ตร." &&
                el7.typeContract == "หักได้" &&
                el7.monthly == this.mountTR &&
                el7.years == this.yearNumberTR &&
                el7.affiliation == Affiliation
            );

            data9 = data3.filter(
              (el9) =>
                el9.typeUser == "บช.ตชด." &&
                el9.monthly == this.mountCT &&
                el9.years == this.yearNow &&
                el9.affiliation == Affiliation
            );

            this.mapData(data, data2, data8, data9, dataTR);
            // this.reportlistTD = data2;
            // console.log(this.reportlistCTD);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getReportRanksAll(m, y, ranksType) {
      try {
        axios
          .get("http://localhost:3899/report")
          .then((res) => {
            let data = [];
            let data2 = [];
            let data8 = [];
            let data9 = [];
            let dataTR = [];
            let data3 = res.data;
            let data4 = res.data;

            data = data3.filter(
              (el) =>
                el.typeUser == "บช.ตชด." &&
                el.monthly == this.dateNow &&
                el.years == this.yearNow &&
                el.rank == ranksType
            );
            data2 = data4.filter(
              (el2) =>
                el2.typeUser == "ตร." &&
                el2.typeContract == "หักได้" &&
                el2.monthly == this.mountCT &&
                el2.years == y &&
                el2.rank == ranksType
            );

            data8 = data4.filter(
              (el8) =>
                el8.typeUser == "ตร." &&
                el8.typeContract == "หักไม่ได้" &&
                el8.monthly == this.mountCT &&
                el8.years == y &&
                el8.rank == ranksType
            );

            dataTR = data4.filter(
              (el7) =>
                el7.typeUser == "ตร." &&
                el7.typeContract == "หักได้" &&
                el7.monthly == this.mountTR &&
                el7.years == this.yearNumberTR &&
                el7.rank == ranksType
            );

            data9 = data3.filter(
              (el9) =>
                el9.typeUser == "บช.ตชด." &&
                el9.monthly == this.mountCT &&
                el9.years == this.yearNow &&
                el9.rank == ranksType
            );

            this.mapData(data, data2, data8, data9, dataTR);
            // this.reportlistTD = data2;
            // console.log(this.reportlistCTD);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async filterAffiliation(listdata) {
      let listTD = [];
      listTD = listdata;
      let data,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10,
        data11,
        data12,
        data13,
        data14,
        data15,
        data16,
        data17 = [];
      data = listTD.filter((el) => el.affiliation == "บช.ตชด.");
      let sumCostdataInsuranceAll = this.SumCostSummaintenanceAll(data);
      let sumdataInsuranceAll = this.InsuranceSumAll(data);
      let sumdatamaintenancefeeSumAll = this.maintenancefeeCount(data);
      let sumdatawaterbillSumAll = this.WaterbillSum(data);
      let sumdataelectricitybillSumAll = this.ElectricitybillSum(data);
      let sumdataCostwaterbillSumAll = this.SumCostSumwater(data);
      let sumdatacentralSumAll = this.CentralSum(data);
      let sumdatacostsSumAll = this.CostsSum(data);
      let sumdataCostCostsSumAll = this.SumCostSumCentral(data);
      let sumdataCostCentralSumAll = this.CentralSumallCount(data);
      data2 = listTD.filter((el) => el.affiliation == "บก.อก.");
      let sumCostdata2InsuranceAll = this.SumCostSummaintenanceAll(data2);
      let sumdata2InsuranceAll = this.InsuranceSumAll(data2);
      let sumdata2maintenancefeeSumAll = this.maintenancefeeCount(data2);
      let sumdata2waterbillSumAll = this.WaterbillSum(data2);
      let sumdata2electricitybillSumAll = this.ElectricitybillSum(data2);
      let sumdata2CostwaterbillSumAll = this.SumCostSumwater(data2);
      let sumdata2centralSumAll = this.CentralSum(data2);
      let sumdata2costsSumAll = this.CostsSum(data2);
      let sumdata2CostCostsSumAll = this.SumCostSumCentral(data2);
      let sumdata2CostCentralSumAll = this.CentralSumallCount(data2);
      data3 = listTD.filter((el) => el.affiliation == "บก.สสน.");
      let sumCostdata3InsuranceAll = this.SumCostSummaintenanceAll(data3);
      let sumdata3InsuranceAll = this.InsuranceSumAll(data3);
      let sumdata3maintenancefeeSumAll = this.maintenancefeeCount(data3);
      let sumdata3waterbillSumAll = this.WaterbillSum(data3);
      let sumdata3electricitybillSumAll = this.ElectricitybillSum(data3);
      let sumdata3CostwaterbillSumAll = this.SumCostSumwater(data3);
      let sumdata3centralSumAll = this.CentralSum(data3);
      let sumdata3costsSumAll = this.CostsSum(data3);
      let sumdata3CostCostsSumAll = this.SumCostSumCentral(data3);
      let sumdata3CostCentralSumAll = this.CentralSumallCount(data3);
      data4 = listTD.filter((el) => el.affiliation == "ฝอ.1");
      let sumCostdata4InsuranceAll = this.SumCostSummaintenanceAll(data4);
      let sumdata4InsuranceAll = this.InsuranceSumAll(data4);
      let sumdata4maintenancefeeSumAll = this.maintenancefeeCount(data4);
      let sumdata4waterbillSumAll = this.WaterbillSum(data4);
      let sumdata4electricitybillSumAll = this.ElectricitybillSum(data4);
      let sumdata4CostwaterbillSumAll = this.SumCostSumwater(data4);
      let sumdata4centralSumAll = this.CentralSum(data4);
      let sumdata4costsSumAll = this.CostsSum(data4);
      let sumdata4CostCostsSumAll = this.SumCostSumCentral(data4);
      let sumdata4CostCentralSumAll = this.CentralSumallCount(data4);
      data5 = listTD.filter((el) => el.affiliation == "ฝอ.2");
      let sumCostdata5InsuranceAll = this.SumCostSummaintenanceAll(data5);
      let sumdata5InsuranceAll = this.InsuranceSumAll(data5);
      let sumdata5maintenancefeeSumAll = this.maintenancefeeCount(data5);
      let sumdata5waterbillSumAll = this.WaterbillSum(data5);
      let sumdata5electricitybillSumAll = this.ElectricitybillSum(data5);
      let sumdata5CostwaterbillSumAll = this.SumCostSumwater(data5);
      let sumdata5centralSumAll = this.CentralSum(data5);
      let sumdata5costsSumAll = this.CostsSum(data5);
      let sumdata5CostCostsSumAll = this.SumCostSumCentral(data5);
      let sumdata5CostCentralSumAll = this.CentralSumallCount(data5);
      data6 = listTD.filter((el) => el.affiliation == "ฝอ.3");
      let sumCostdata6InsuranceAll = this.SumCostSummaintenanceAll(data6);
      let sumdata6InsuranceAll = this.InsuranceSumAll(data6);
      let sumdata6maintenancefeeSumAll = this.maintenancefeeCount(data6);
      let sumdata6waterbillSumAll = this.WaterbillSum(data6);
      let sumdata6electricitybillSumAll = this.ElectricitybillSum(data6);
      let sumdata6CostwaterbillSumAll = this.SumCostSumwater(data6);
      let sumdata6centralSumAll = this.CentralSum(data6);
      let sumdata6costsSumAll = this.CostsSum(data6);
      let sumdata6CostCostsSumAll = this.SumCostSumCentral(data6);
      let sumdata6CostCentralSumAll = this.CentralSumallCount(data6);
      data7 = listTD.filter((el) => el.affiliation == "ฝอ.4");
      let sumCostdata7InsuranceAll = this.SumCostSummaintenanceAll(data7);
      let sumdata7InsuranceAll = this.InsuranceSumAll(data7);
      let sumdata7maintenancefeeSumAll = this.maintenancefeeCount(data7);
      let sumdata7waterbillSumAll = this.WaterbillSum(data7);
      let sumdata7electricitybillSumAll = this.ElectricitybillSum(data7);
      let sumdata7CostwaterbillSumAll = this.SumCostSumwater(data7);
      let sumdata7centralSumAll = this.CentralSum(data7);
      let sumdata7costsSumAll = this.CostsSum(data7);
      let sumdata7CostCostsSumAll = this.SumCostSumCentral(data7);
      let sumdata7CostCentralSumAll = this.CentralSumallCount(data7);
      data8 = listTD.filter((el) => el.affiliation == "ฝอ.5");
      let sumCostdata8InsuranceAll = this.SumCostSummaintenanceAll(data8);
      let sumdata8InsuranceAll = this.InsuranceSumAll(data8);
      let sumdata8maintenancefeeSumAll = this.maintenancefeeCount(data8);
      let sumdata8waterbillSumAll = this.WaterbillSum(data8);
      let sumdata8electricitybillSumAll = this.ElectricitybillSum(data8);
      let sumdata8CostwaterbillSumAll = this.SumCostSumwater(data8);
      let sumdata8centralSumAll = this.CentralSum(data8);
      let sumdata8costsSumAll = this.CostsSum(data8);
      let sumdata8CostCostsSumAll = this.SumCostSumCentral(data8);
      let sumdata8CostCentralSumAll = this.CentralSumallCount(data8);
      data9 = listTD.filter((el) => el.affiliation == "ฝอ.6");
      let sumCostdata9InsuranceAll = this.SumCostSummaintenanceAll(data9);
      let sumdata9InsuranceAll = this.InsuranceSumAll(data9);
      let sumdata9maintenancefeeSumAll = this.maintenancefeeCount(data9);
      let sumdata9waterbillSumAll = this.WaterbillSum(data9);
      let sumdata9electricitybillSumAll = this.ElectricitybillSum(data9);
      let sumdata9CostwaterbillSumAll = this.SumCostSumwater(data9);
      let sumdata9centralSumAll = this.CentralSum(data9);
      let sumdata9costsSumAll = this.CostsSum(data9);
      let sumdata9CostCostsSumAll = this.SumCostSumCentral(data9);
      let sumdata9CostCentralSumAll = this.CentralSumallCount(data9);
      data10 = listTD.filter((el) => el.affiliation == "ฝอ.7");
      let sumCostdata10InsuranceAll = this.SumCostSummaintenanceAll(data10);
      let sumdata10InsuranceAll = this.InsuranceSumAll(data10);
      let sumdata10maintenancefeeSumAll = this.maintenancefeeCount(data10);
      let sumdata10waterbillSumAll = this.WaterbillSum(data10);
      let sumdata10electricitybillSumAll = this.ElectricitybillSum(data10);
      let sumdata10CostwaterbillSumAll = this.SumCostSumwater(data10);
      let sumdata10centralSumAll = this.CentralSum(data10);
      let sumdata10costsSumAll = this.CostsSum(data10);
      let sumdata10CostCostsSumAll = this.SumCostSumCentral(data10);
      let sumdata10CostCentralSumAll = this.CentralSumallCount(data10);
      data11 = listTD.filter((el) => el.affiliation == "ฝอ.8");
      let sumCostdata11InsuranceAll = this.SumCostSummaintenanceAll(data11);
      let sumdata11InsuranceAll = this.InsuranceSumAll(data11);
      let sumdata11maintenancefeeSumAll = this.maintenancefeeCount(data11);
      let sumdata11waterbillSumAll = this.WaterbillSum(data11);
      let sumdata11electricitybillSumAll = this.ElectricitybillSum(data11);
      let sumdata11CostwaterbillSumAll = this.SumCostSumwater(data11);
      let sumdata11centralSumAll = this.CentralSum(data11);
      let sumdata11costsSumAll = this.CostsSum(data11);
      let sumdata11CostCostsSumAll = this.SumCostSumCentral(data11);
      let sumdata11CostCentralSumAll = this.CentralSumallCount(data11);
      data12 = listTD.filter((el) => el.affiliation == "ฝสสน.1");
      let sumCostdata12InsuranceAll = this.SumCostSummaintenanceAll(data12);
      let sumdata12InsuranceAll = this.InsuranceSumAll(data12);
      let sumdata12maintenancefeeSumAll = this.maintenancefeeCount(data12);
      let sumdata12waterbillSumAll = this.WaterbillSum(data12);
      let sumdata12electricitybillSumAll = this.ElectricitybillSum(data12);
      let sumdata12CostwaterbillSumAll = this.SumCostSumwater(data12);
      let sumdata12centralSumAll = this.CentralSum(data12);
      let sumdata12costsSumAll = this.CostsSum(data12);
      let sumdata12CostCostsSumAll = this.SumCostSumCentral(data12);
      let sumdata12CostCentralSumAll = this.CentralSumallCount(data12);
      data13 = listTD.filter((el) => el.affiliation == "ฝสสน.2");
      let sumCostdata13InsuranceAll = this.SumCostSummaintenanceAll(data13);
      let sumdata13InsuranceAll = this.InsuranceSumAll(data13);
      let sumdata13maintenancefeeSumAll = this.maintenancefeeCount(data13);
      let sumdata13waterbillSumAll = this.WaterbillSum(data13);
      let sumdata13lectricitybillSumAll = this.ElectricitybillSum(data13);
      let sumdata13CostwaterbillSumAll = this.SumCostSumwater(data13);
      let sumdata13centralSumAll = this.CentralSum(data13);
      let sumdata13costsSumAll = this.CostsSum(data13);
      let sumdata13CostCostsSumAll = this.SumCostSumCentral(data13);
      let sumdata13CostCentralSumAll = this.CentralSumallCount(data13);
      data14 = listTD.filter((el) => el.affiliation == "ฝสสน.3");
      let sumCostdata14InsuranceAll = this.SumCostSummaintenanceAll(data14);
      let sumdata14InsuranceAll = this.InsuranceSumAll(data14);
      let sumdata14maintenancefeeSumAll = this.maintenancefeeCount(data14);
      let sumdata14waterbillSumAll = this.WaterbillSum(data14);
      let sumdata14electricitybillSumAll = this.ElectricitybillSum(data14);
      let sumdata14CostwaterbillSumAll = this.SumCostSumwater(data14);
      let sumdata14centralSumAll = this.CentralSum(data14);
      let sumdata14costsSumAll = this.CostsSum(data14);
      let sumdata14CostCostsSumAll = this.SumCostSumCentral(data14);
      let sumdata14CostCentralSumAll = this.CentralSumallCount(data14);
      data15 = listTD.filter((el) => el.affiliation == "ฝสสน.4");
      let sumCostdata15InsuranceAll = this.SumCostSummaintenanceAll(data15);
      let sumdata15InsuranceAll = this.InsuranceSumAll(data15);
      let sumdata15maintenancefeeSumAll = this.maintenancefeeCount(data15);
      let sumdata15waterbillSumAll = this.WaterbillSum(data15);
      let sumdata15electricitybillSumAll = this.ElectricitybillSum(data15);
      let sumdata15CostwaterbillSumAll = this.SumCostSumwater(data15);
      let sumdata15centralSumAll = this.CentralSum(data15);
      let sumdata15costsSumAll = this.CostsSum(data15);
      let sumdata15CostCostsSumAll = this.SumCostSumCentral(data15);
      let sumdata15CostCentralSumAll = this.CentralSumallCount(data15);
      data16 = listTD.filter((el) => el.affiliation == "ฝสสน.5");
      let sumCostdata16InsuranceAll = this.SumCostSummaintenanceAll(data16);
      let sumdata16InsuranceAll = this.InsuranceSumAll(data16);
      let sumdata16maintenancefeeSumAll = this.maintenancefeeCount(data16);
      let sumdata16waterbillSumAll = this.WaterbillSum(data16);
      let sumdata16electricitybillSumAll = this.ElectricitybillSum(data16);
      let sumdata16CostwaterbillSumAll = this.SumCostSumwater(data16);
      let sumdata16centralSumAll = this.CentralSum(data16);
      let sumdata16costsSumAll = this.CostsSum(data16);
      let sumdata16CostCostsSumAll = this.SumCostSumCentral(data16);
      let sumdata16CostCentralSumAll = this.CentralSumallCount(data16);
      data17 = listTD.filter((el) => el.affiliation == "ลูกจ้าง");
      let sumCostdata17InsuranceAll = this.SumCostSummaintenanceAll(data17);
      let sumdata17InsuranceAll = this.InsuranceSumAll(data17);
      let sumdata17maintenancefeeSumAll = this.maintenancefeeCount(data17);
      let sumdata17waterbillSumAll = this.WaterbillSum(data17);
      let sumdata17electricitybillSumAll = this.ElectricitybillSum(data17);
      let sumdata17CostwaterbillSumAll = this.SumCostSumwater(data17);
      let sumdata17centralSumAll = this.CentralSum(data17);
      let sumdata17costsSumAll = this.CostsSum(data17);
      let sumdata17CostCostsSumAll = this.SumCostSumCentral(data17);
      let sumdata17CostCentralSumAll = this.CentralSumallCount(data17);
      await this.AffiliationListTD.map((el) => {
        if (el.label == "บช.ตชด.") {
          el["sumdataMaintenancefee"] = sumdatamaintenancefeeSumAll;
          el["sumdataInsurance"] = sumdataInsuranceAll;
          el["sumCostdataInsurance"] = sumCostdataInsuranceAll;
          el["sumdatawaterbill"] = sumdatawaterbillSumAll;
          el["sumdataelectricitybill"] = sumdataelectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdataCostwaterbillSumAll;
          el["sumdatacentral"] = sumdatacentralSumAll;
          el["sumdatacosts"] = sumdatacostsSumAll;
          el["sumCostdataCostCosts"] = sumdataCostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdataCostCentralSumAll;
        }
        if (el.label == "บก.อก.") {
          el["sumdataMaintenancefee"] = sumdata2maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata2InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata2InsuranceAll;
          el["sumdatawaterbill"] = sumdata2waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata2electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata2CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata2centralSumAll;
          el["sumdatacosts"] = sumdata2costsSumAll;
          el["sumCostdataCostCosts"] = sumdata2CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata2CostCentralSumAll;
        }
        if (el.label == "บก.สสน.") {
          el["sumdataMaintenancefee"] = sumdata3maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata3InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata3InsuranceAll;
          el["sumdatawaterbill"] = sumdata3waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata3electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata3CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata3centralSumAll;
          el["sumdatacosts"] = sumdata3costsSumAll;
          el["sumCostdataCostCosts"] = sumdata3CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata3CostCentralSumAll;
        }
        if (el.label == "ฝอ.1") {
          el["sumdataMaintenancefee"] = sumdata4maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata4InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata4InsuranceAll;
          el["sumdatawaterbill"] = sumdata4waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata4electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata4CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata4centralSumAll;
          el["sumdatacosts"] = sumdata4costsSumAll;
          el["sumCostdataCostCosts"] = sumdata4CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata4CostCentralSumAll;
        }
        if (el.label == "ฝอ.2") {
          el["sumdataMaintenancefee"] = sumdata5maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata5InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata5InsuranceAll;
          el["sumdatawaterbill"] = sumdata5waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata5electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata5CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata5centralSumAll;
          el["sumdatacosts"] = sumdata5costsSumAll;
          el["sumCostdataCostCosts"] = sumdata5CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata5CostCentralSumAll;
        }
        if (el.label == "ฝอ.3") {
          el["sumdataMaintenancefee"] = sumdata6maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata6InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata6InsuranceAll;
          el["sumdatawaterbill"] = sumdata6waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata6electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata6CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata6centralSumAll;
          el["sumdatacosts"] = sumdata6costsSumAll;
          el["sumCostdataCostCosts"] = sumdata6CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata6CostCentralSumAll;
        }
        if (el.label == "ฝอ.4") {
          el["sumdataMaintenancefee"] = sumdata7maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata7InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata7InsuranceAll;
          el["sumdatawaterbill"] = sumdata7waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata7electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata7CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata7centralSumAll;
          el["sumdatacosts"] = sumdata7costsSumAll;
          el["sumCostdataCostCosts"] = sumdata7CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata7CostCentralSumAll;
        }
        if (el.label == "ฝอ.5") {
          el["sumdataMaintenancefee"] = sumdata8maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata8InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata8InsuranceAll;
          el["sumdatawaterbill"] = sumdata8waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata8electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata8CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata8centralSumAll;
          el["sumdatacosts"] = sumdata8costsSumAll;
          el["sumCostdataCostCosts"] = sumdata8CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata8CostCentralSumAll;
        }
        if (el.label == "ฝอ.6") {
          el["sumdataMaintenancefee"] = sumdata9maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata9InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata9InsuranceAll;
          el["sumdatawaterbill"] = sumdata9waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata9electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata9CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata9centralSumAll;
          el["sumdatacosts"] = sumdata9costsSumAll;
          el["sumCostdataCostCosts"] = sumdata9CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata9CostCentralSumAll;
        }
        if (el.label == "ฝอ.7") {
          el["sumdataMaintenancefee"] = sumdata10maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata10InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata10InsuranceAll;
          el["sumdatawaterbill"] = sumdata10waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata10electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata10CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata10centralSumAll;
          el["sumdatacosts"] = sumdata10costsSumAll;
          el["sumCostdataCostCosts"] = sumdata10CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata10CostCentralSumAll;
        }
        if (el.label == "ฝอ.8") {
          el["sumdataMaintenancefee"] = sumdata11maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata11InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata11InsuranceAll;
          el["sumdatawaterbill"] = sumdata11waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata11electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata11CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata11centralSumAll;
          el["sumdatacosts"] = sumdata11costsSumAll;
          el["sumCostdataCostCosts"] = sumdata11CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata11CostCentralSumAll;
        }
        if (el.label == "ฝสสน.1") {
          el["sumdataMaintenancefee"] = sumdata12maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata12InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata12InsuranceAll;
          el["sumdatawaterbill"] = sumdata12waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata12electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata12CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata12centralSumAll;
          el["sumdatacosts"] = sumdata12costsSumAll;
          el["sumCostdataCostCosts"] = sumdata12CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata12CostCentralSumAll;
        }
        if (el.label == "ฝสสน.2") {
          el["sumdataMaintenancefee"] = sumdata13maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata13InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata13InsuranceAll;
          el["sumdatawaterbill"] = sumdata13waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata13lectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata13CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata13centralSumAll;
          el["sumdatacosts"] = sumdata13costsSumAll;
          el["sumCostdataCostCosts"] = sumdata13CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata13CostCentralSumAll;
        }
        if (el.label == "ฝสสน.3") {
          el["sumdataMaintenancefee"] = sumdata14maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata14InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata14InsuranceAll;
          el["sumdatawaterbill"] = sumdata14waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata14electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata14CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata14centralSumAll;
          el["sumdatacosts"] = sumdata14costsSumAll;
          el["sumCostdataCostCosts"] = sumdata14CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata14CostCentralSumAll;
        }
        if (el.label == "ฝสสน.4") {
          el["sumdataMaintenancefee"] = sumdata15maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata15InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata15InsuranceAll;
          el["sumdatawaterbill"] = sumdata15waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata15electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata15CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata15centralSumAll;
          el["sumdatacosts"] = sumdata15costsSumAll;
          el["sumCostdataCostCosts"] = sumdata15CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata15CostCentralSumAll;
        }
        if (el.label == "ฝสสน.5") {
          el["sumdataMaintenancefee"] = sumdata16maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata16InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata16InsuranceAll;
          el["sumdatawaterbill"] = sumdata16waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata16electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata16CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata16centralSumAll;
          el["sumdatacosts"] = sumdata16costsSumAll;
          el["sumCostdataCostCosts"] = sumdata16CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata16CostCentralSumAll;
        }
        if (el.label == "ลูกจ้าง") {
          el["sumdataMaintenancefee"] = sumdata17maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata17InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata17InsuranceAll;
          el["sumdatawaterbill"] = sumdata17waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata17electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata17CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata17centralSumAll;
          el["sumdatacosts"] = sumdata17costsSumAll;
          el["sumCostdataCostCosts"] = sumdata17CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata17CostCentralSumAll;
        }

        return el;
      });
      this.AffiliationListTD.map((e) => {
        e["countMaintenancefeeAll"] = this.countMaintenancefeeAll(this.AffiliationListTD);
        e["countInsuranceAll"] = this.countInsuranceAll(this.AffiliationListTD);
        e["countCostSumAll"] = this.countCostSumAll(this.AffiliationListTD);
        e["countwaterbilAll"] = this.countWaterbillAll(this.AffiliationListTD);
        e["countelectricitybillAll"] = this.countelectricitybillAll(
          this.AffiliationListTD
        );
        e["countCostwaterbillAll"] = this.countCostwaterbillSumAll(
          this.AffiliationListTD
        );
        e["countcentraAll"] = this.countcentralAll(this.AffiliationListTD);
        e["countcostsAll"] = this.countcostsAll(this.AffiliationListTD);
        e["countCostCostsSumAll"] = this.countCostCostsSumAll(this.AffiliationListTD);
        e["countdataCostCentralAllSum"] = this.countsumdataCostCentralAllSum(
          this.AffiliationListTD
        );
        return e;
      });
    },

    async filterAffiliationTR(listdata) {
      let listTD = [];
      listTD = listdata;
      let data,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10,
        data11,
        data12,
        data13,
        data14,
        data15,
        data16,
        data17 = [];
      data = listTD.filter((el) => el.affiliation == "บช.ตชด.");
      let sumCostdataInsuranceAll = this.SumCostSummaintenanceAll(data);
      let sumdataInsuranceAll = this.InsuranceSumAll(data);
      let sumdatamaintenancefeeSumAll = this.maintenancefeeCount(data);
      let sumdatawaterbillSumAll = this.WaterbillSum(data);
      let sumdataelectricitybillSumAll = this.ElectricitybillSum(data);
      let sumdataCostwaterbillSumAll = this.SumCostSumwater(data);
      let sumdatacentralSumAll = this.CentralSum(data);
      let sumdatacostsSumAll = this.CostsSum(data);
      let sumdataCostCostsSumAll = this.SumCostSumCentral(data);
      let sumdataCostCentralSumAll = this.CentralSumallCount(data);
      data2 = listTD.filter((el) => el.affiliation == "บก.อก.");
      let sumCostdata2InsuranceAll = this.SumCostSummaintenanceAll(data2);
      let sumdata2InsuranceAll = this.InsuranceSumAll(data2);
      let sumdata2maintenancefeeSumAll = this.maintenancefeeCount(data2);
      let sumdata2waterbillSumAll = this.WaterbillSum(data2);
      let sumdata2electricitybillSumAll = this.ElectricitybillSum(data2);
      let sumdata2CostwaterbillSumAll = this.SumCostSumwater(data2);
      let sumdata2centralSumAll = this.CentralSum(data2);
      let sumdata2costsSumAll = this.CostsSum(data2);
      let sumdata2CostCostsSumAll = this.SumCostSumCentral(data2);
      let sumdata2CostCentralSumAll = this.CentralSumallCount(data2);
      data3 = listTD.filter((el) => el.affiliation == "บก.สสน.");
      let sumCostdata3InsuranceAll = this.SumCostSummaintenanceAll(data3);
      let sumdata3InsuranceAll = this.InsuranceSumAll(data3);
      let sumdata3maintenancefeeSumAll = this.maintenancefeeCount(data3);
      let sumdata3waterbillSumAll = this.WaterbillSum(data3);
      let sumdata3electricitybillSumAll = this.ElectricitybillSum(data3);
      let sumdata3CostwaterbillSumAll = this.SumCostSumwater(data3);
      let sumdata3centralSumAll = this.CentralSum(data3);
      let sumdata3costsSumAll = this.CostsSum(data3);
      let sumdata3CostCostsSumAll = this.SumCostSumCentral(data3);
      let sumdata3CostCentralSumAll = this.CentralSumallCount(data3);
      data4 = listTD.filter((el) => el.affiliation == "ฝอ.1");
      let sumCostdata4InsuranceAll = this.SumCostSummaintenanceAll(data4);
      let sumdata4InsuranceAll = this.InsuranceSumAll(data4);
      let sumdata4maintenancefeeSumAll = this.maintenancefeeCount(data4);
      let sumdata4waterbillSumAll = this.WaterbillSum(data4);
      let sumdata4electricitybillSumAll = this.ElectricitybillSum(data4);
      let sumdata4CostwaterbillSumAll = this.SumCostSumwater(data4);
      let sumdata4centralSumAll = this.CentralSum(data4);
      let sumdata4costsSumAll = this.CostsSum(data4);
      let sumdata4CostCostsSumAll = this.SumCostSumCentral(data4);
      let sumdata4CostCentralSumAll = this.CentralSumallCount(data4);
      data5 = listTD.filter((el) => el.affiliation == "ฝอ.2");
      let sumCostdata5InsuranceAll = this.SumCostSummaintenanceAll(data5);
      let sumdata5InsuranceAll = this.InsuranceSumAll(data5);
      let sumdata5maintenancefeeSumAll = this.maintenancefeeCount(data5);
      let sumdata5waterbillSumAll = this.WaterbillSum(data5);
      let sumdata5electricitybillSumAll = this.ElectricitybillSum(data5);
      let sumdata5CostwaterbillSumAll = this.SumCostSumwater(data5);
      let sumdata5centralSumAll = this.CentralSum(data5);
      let sumdata5costsSumAll = this.CostsSum(data5);
      let sumdata5CostCostsSumAll = this.SumCostSumCentral(data5);
      let sumdata5CostCentralSumAll = this.CentralSumallCount(data5);
      data6 = listTD.filter((el) => el.affiliation == "ฝอ.3");
      let sumCostdata6InsuranceAll = this.SumCostSummaintenanceAll(data6);
      let sumdata6InsuranceAll = this.InsuranceSumAll(data6);
      let sumdata6maintenancefeeSumAll = this.maintenancefeeCount(data6);
      let sumdata6waterbillSumAll = this.WaterbillSum(data6);
      let sumdata6electricitybillSumAll = this.ElectricitybillSum(data6);
      let sumdata6CostwaterbillSumAll = this.SumCostSumwater(data6);
      let sumdata6centralSumAll = this.CentralSum(data6);
      let sumdata6costsSumAll = this.CostsSum(data6);
      let sumdata6CostCostsSumAll = this.SumCostSumCentral(data6);
      let sumdata6CostCentralSumAll = this.CentralSumallCount(data6);
      data7 = listTD.filter((el) => el.affiliation == "ฝอ.4");
      let sumCostdata7InsuranceAll = this.SumCostSummaintenanceAll(data7);
      let sumdata7InsuranceAll = this.InsuranceSumAll(data7);
      let sumdata7maintenancefeeSumAll = this.maintenancefeeCount(data7);
      let sumdata7waterbillSumAll = this.WaterbillSum(data7);
      let sumdata7electricitybillSumAll = this.ElectricitybillSum(data7);
      let sumdata7CostwaterbillSumAll = this.SumCostSumwater(data7);
      let sumdata7centralSumAll = this.CentralSum(data7);
      let sumdata7costsSumAll = this.CostsSum(data7);
      let sumdata7CostCostsSumAll = this.SumCostSumCentral(data7);
      let sumdata7CostCentralSumAll = this.CentralSumallCount(data7);
      data8 = listTD.filter((el) => el.affiliation == "ฝอ.5");
      let sumCostdata8InsuranceAll = this.SumCostSummaintenanceAll(data8);
      let sumdata8InsuranceAll = this.InsuranceSumAll(data8);
      let sumdata8maintenancefeeSumAll = this.maintenancefeeCount(data8);
      let sumdata8waterbillSumAll = this.WaterbillSum(data8);
      let sumdata8electricitybillSumAll = this.ElectricitybillSum(data8);
      let sumdata8CostwaterbillSumAll = this.SumCostSumwater(data8);
      let sumdata8centralSumAll = this.CentralSum(data8);
      let sumdata8costsSumAll = this.CostsSum(data8);
      let sumdata8CostCostsSumAll = this.SumCostSumCentral(data8);
      let sumdata8CostCentralSumAll = this.CentralSumallCount(data8);
      data9 = listTD.filter((el) => el.affiliation == "ฝอ.6");
      let sumCostdata9InsuranceAll = this.SumCostSummaintenanceAll(data9);
      let sumdata9InsuranceAll = this.InsuranceSumAll(data9);
      let sumdata9maintenancefeeSumAll = this.maintenancefeeCount(data9);
      let sumdata9waterbillSumAll = this.WaterbillSum(data9);
      let sumdata9electricitybillSumAll = this.ElectricitybillSum(data9);
      let sumdata9CostwaterbillSumAll = this.SumCostSumwater(data9);
      let sumdata9centralSumAll = this.CentralSum(data9);
      let sumdata9costsSumAll = this.CostsSum(data9);
      let sumdata9CostCostsSumAll = this.SumCostSumCentral(data9);
      let sumdata9CostCentralSumAll = this.CentralSumallCount(data9);
      data10 = listTD.filter((el) => el.affiliation == "ฝอ.7");
      let sumCostdata10InsuranceAll = this.SumCostSummaintenanceAll(data10);
      let sumdata10InsuranceAll = this.InsuranceSumAll(data10);
      let sumdata10maintenancefeeSumAll = this.maintenancefeeCount(data10);
      let sumdata10waterbillSumAll = this.WaterbillSum(data10);
      let sumdata10electricitybillSumAll = this.ElectricitybillSum(data10);
      let sumdata10CostwaterbillSumAll = this.SumCostSumwater(data10);
      let sumdata10centralSumAll = this.CentralSum(data10);
      let sumdata10costsSumAll = this.CostsSum(data10);
      let sumdata10CostCostsSumAll = this.SumCostSumCentral(data10);
      let sumdata10CostCentralSumAll = this.CentralSumallCount(data10);
      data11 = listTD.filter((el) => el.affiliation == "ฝอ.8");
      let sumCostdata11InsuranceAll = this.SumCostSummaintenanceAll(data11);
      let sumdata11InsuranceAll = this.InsuranceSumAll(data11);
      let sumdata11maintenancefeeSumAll = this.maintenancefeeCount(data11);
      let sumdata11waterbillSumAll = this.WaterbillSum(data11);
      let sumdata11electricitybillSumAll = this.ElectricitybillSum(data11);
      let sumdata11CostwaterbillSumAll = this.SumCostSumwater(data11);
      let sumdata11centralSumAll = this.CentralSum(data11);
      let sumdata11costsSumAll = this.CostsSum(data11);
      let sumdata11CostCostsSumAll = this.SumCostSumCentral(data11);
      let sumdata11CostCentralSumAll = this.CentralSumallCount(data11);
      data12 = listTD.filter((el) => el.affiliation == "ฝสสน.1");
      let sumCostdata12InsuranceAll = this.SumCostSummaintenanceAll(data12);
      let sumdata12InsuranceAll = this.InsuranceSumAll(data12);
      let sumdata12maintenancefeeSumAll = this.maintenancefeeCount(data12);
      let sumdata12waterbillSumAll = this.WaterbillSum(data12);
      let sumdata12electricitybillSumAll = this.ElectricitybillSum(data12);
      let sumdata12CostwaterbillSumAll = this.SumCostSumwater(data12);
      let sumdata12centralSumAll = this.CentralSum(data12);
      let sumdata12costsSumAll = this.CostsSum(data12);
      let sumdata12CostCostsSumAll = this.SumCostSumCentral(data12);
      let sumdata12CostCentralSumAll = this.CentralSumallCount(data12);
      data13 = listTD.filter((el) => el.affiliation == "ฝสสน.2");
      let sumCostdata13InsuranceAll = this.SumCostSummaintenanceAll(data13);
      let sumdata13InsuranceAll = this.InsuranceSumAll(data13);
      let sumdata13maintenancefeeSumAll = this.maintenancefeeCount(data13);
      let sumdata13waterbillSumAll = this.WaterbillSum(data13);
      let sumdata13lectricitybillSumAll = this.ElectricitybillSum(data13);
      let sumdata13CostwaterbillSumAll = this.SumCostSumwater(data13);
      let sumdata13centralSumAll = this.CentralSum(data13);
      let sumdata13costsSumAll = this.CostsSum(data13);
      let sumdata13CostCostsSumAll = this.SumCostSumCentral(data13);
      let sumdata13CostCentralSumAll = this.CentralSumallCount(data13);
      data14 = listTD.filter((el) => el.affiliation == "ฝสสน.3");
      let sumCostdata14InsuranceAll = this.SumCostSummaintenanceAll(data14);
      let sumdata14InsuranceAll = this.InsuranceSumAll(data14);
      let sumdata14maintenancefeeSumAll = this.maintenancefeeCount(data14);
      let sumdata14waterbillSumAll = this.WaterbillSum(data14);
      let sumdata14electricitybillSumAll = this.ElectricitybillSum(data14);
      let sumdata14CostwaterbillSumAll = this.SumCostSumwater(data14);
      let sumdata14centralSumAll = this.CentralSum(data14);
      let sumdata14costsSumAll = this.CostsSum(data14);
      let sumdata14CostCostsSumAll = this.SumCostSumCentral(data14);
      let sumdata14CostCentralSumAll = this.CentralSumallCount(data14);
      data15 = listTD.filter((el) => el.affiliation == "ฝสสน.4");
      let sumCostdata15InsuranceAll = this.SumCostSummaintenanceAll(data15);
      let sumdata15InsuranceAll = this.InsuranceSumAll(data15);
      let sumdata15maintenancefeeSumAll = this.maintenancefeeCount(data15);
      let sumdata15waterbillSumAll = this.WaterbillSum(data15);
      let sumdata15electricitybillSumAll = this.ElectricitybillSum(data15);
      let sumdata15CostwaterbillSumAll = this.SumCostSumwater(data15);
      let sumdata15centralSumAll = this.CentralSum(data15);
      let sumdata15costsSumAll = this.CostsSum(data15);
      let sumdata15CostCostsSumAll = this.SumCostSumCentral(data15);
      let sumdata15CostCentralSumAll = this.CentralSumallCount(data15);
      data16 = listTD.filter((el) => el.affiliation == "ฝสสน.5");
      let sumCostdata16InsuranceAll = this.SumCostSummaintenanceAll(data16);
      let sumdata16InsuranceAll = this.InsuranceSumAll(data16);
      let sumdata16maintenancefeeSumAll = this.maintenancefeeCount(data16);
      let sumdata16waterbillSumAll = this.WaterbillSum(data16);
      let sumdata16electricitybillSumAll = this.ElectricitybillSum(data16);
      let sumdata16CostwaterbillSumAll = this.SumCostSumwater(data16);
      let sumdata16centralSumAll = this.CentralSum(data16);
      let sumdata16costsSumAll = this.CostsSum(data16);
      let sumdata16CostCostsSumAll = this.SumCostSumCentral(data16);
      let sumdata16CostCentralSumAll = this.CentralSumallCount(data16);
      data17 = listTD.filter((el) => el.affiliation == "ลูกจ้าง");
      let sumCostdata17InsuranceAll = this.SumCostSummaintenanceAll(data17);
      let sumdata17InsuranceAll = this.InsuranceSumAll(data17);
      let sumdata17maintenancefeeSumAll = this.maintenancefeeCount(data17);
      let sumdata17waterbillSumAll = this.WaterbillSum(data17);
      let sumdata17electricitybillSumAll = this.ElectricitybillSum(data17);
      let sumdata17CostwaterbillSumAll = this.SumCostSumwater(data17);
      let sumdata17centralSumAll = this.CentralSum(data17);
      let sumdata17costsSumAll = this.CostsSum(data17);
      let sumdata17CostCostsSumAll = this.SumCostSumCentral(data17);
      let sumdata17CostCentralSumAll = this.CentralSumallCount(data17);
      await this.AffiliationListTR.map((el) => {
        if (el.label == "บช.ตชด.") {
          el["sumdataMaintenancefee"] = sumdatamaintenancefeeSumAll;
          el["sumdataInsurance"] = sumdataInsuranceAll;
          el["sumCostdataInsurance"] = sumCostdataInsuranceAll;
          el["sumdatawaterbill"] = sumdatawaterbillSumAll;
          el["sumdataelectricitybill"] = sumdataelectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdataCostwaterbillSumAll;
          el["sumdatacentral"] = sumdatacentralSumAll;
          el["sumdatacosts"] = sumdatacostsSumAll;
          el["sumCostdataCostCosts"] = sumdataCostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdataCostCentralSumAll;
        }
        if (el.label == "บก.อก.") {
          el["sumdataMaintenancefee"] = sumdata2maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata2InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata2InsuranceAll;
          el["sumdatawaterbill"] = sumdata2waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata2electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata2CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata2centralSumAll;
          el["sumdatacosts"] = sumdata2costsSumAll;
          el["sumCostdataCostCosts"] = sumdata2CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata2CostCentralSumAll;
        }
        if (el.label == "บก.สสน.") {
          el["sumdataMaintenancefee"] = sumdata3maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata3InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata3InsuranceAll;
          el["sumdatawaterbill"] = sumdata3waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata3electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata3CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata3centralSumAll;
          el["sumdatacosts"] = sumdata3costsSumAll;
          el["sumCostdataCostCosts"] = sumdata3CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata3CostCentralSumAll;
        }
        if (el.label == "ฝอ.1") {
          el["sumdataMaintenancefee"] = sumdata4maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata4InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata4InsuranceAll;
          el["sumdatawaterbill"] = sumdata4waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata4electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata4CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata4centralSumAll;
          el["sumdatacosts"] = sumdata4costsSumAll;
          el["sumCostdataCostCosts"] = sumdata4CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata4CostCentralSumAll;
        }
        if (el.label == "ฝอ.2") {
          el["sumdataMaintenancefee"] = sumdata5maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata5InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata5InsuranceAll;
          el["sumdatawaterbill"] = sumdata5waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata5electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata5CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata5centralSumAll;
          el["sumdatacosts"] = sumdata5costsSumAll;
          el["sumCostdataCostCosts"] = sumdata5CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata5CostCentralSumAll;
        }
        if (el.label == "ฝอ.3") {
          el["sumdataMaintenancefee"] = sumdata6maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata6InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata6InsuranceAll;
          el["sumdatawaterbill"] = sumdata6waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata6electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata6CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata6centralSumAll;
          el["sumdatacosts"] = sumdata6costsSumAll;
          el["sumCostdataCostCosts"] = sumdata6CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata6CostCentralSumAll;
        }
        if (el.label == "ฝอ.4") {
          el["sumdataMaintenancefee"] = sumdata7maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata7InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata7InsuranceAll;
          el["sumdatawaterbill"] = sumdata7waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata7electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata7CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata7centralSumAll;
          el["sumdatacosts"] = sumdata7costsSumAll;
          el["sumCostdataCostCosts"] = sumdata7CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata7CostCentralSumAll;
        }
        if (el.label == "ฝอ.5") {
          el["sumdataMaintenancefee"] = sumdata8maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata8InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata8InsuranceAll;
          el["sumdatawaterbill"] = sumdata8waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata8electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata8CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata8centralSumAll;
          el["sumdatacosts"] = sumdata8costsSumAll;
          el["sumCostdataCostCosts"] = sumdata8CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata8CostCentralSumAll;
        }
        if (el.label == "ฝอ.6") {
          el["sumdataMaintenancefee"] = sumdata9maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata9InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata9InsuranceAll;
          el["sumdatawaterbill"] = sumdata9waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata9electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata9CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata9centralSumAll;
          el["sumdatacosts"] = sumdata9costsSumAll;
          el["sumCostdataCostCosts"] = sumdata9CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata9CostCentralSumAll;
        }
        if (el.label == "ฝอ.7") {
          el["sumdataMaintenancefee"] = sumdata10maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata10InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata10InsuranceAll;
          el["sumdatawaterbill"] = sumdata10waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata10electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata10CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata10centralSumAll;
          el["sumdatacosts"] = sumdata10costsSumAll;
          el["sumCostdataCostCosts"] = sumdata10CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata10CostCentralSumAll;
        }
        if (el.label == "ฝอ.8") {
          el["sumdataMaintenancefee"] = sumdata11maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata11InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata11InsuranceAll;
          el["sumdatawaterbill"] = sumdata11waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata11electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata11CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata11centralSumAll;
          el["sumdatacosts"] = sumdata11costsSumAll;
          el["sumCostdataCostCosts"] = sumdata11CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata11CostCentralSumAll;
        }
        if (el.label == "ฝสสน.1") {
          el["sumdataMaintenancefee"] = sumdata12maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata12InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata12InsuranceAll;
          el["sumdatawaterbill"] = sumdata12waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata12electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata12CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata12centralSumAll;
          el["sumdatacosts"] = sumdata12costsSumAll;
          el["sumCostdataCostCosts"] = sumdata12CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata12CostCentralSumAll;
        }
        if (el.label == "ฝสสน.2") {
          el["sumdataMaintenancefee"] = sumdata13maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata13InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata13InsuranceAll;
          el["sumdatawaterbill"] = sumdata13waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata13lectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata13CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata13centralSumAll;
          el["sumdatacosts"] = sumdata13costsSumAll;
          el["sumCostdataCostCosts"] = sumdata13CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata13CostCentralSumAll;
        }
        if (el.label == "ฝสสน.3") {
          el["sumdataMaintenancefee"] = sumdata14maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata14InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata14InsuranceAll;
          el["sumdatawaterbill"] = sumdata14waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata14electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata14CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata14centralSumAll;
          el["sumdatacosts"] = sumdata14costsSumAll;
          el["sumCostdataCostCosts"] = sumdata14CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata14CostCentralSumAll;
        }
        if (el.label == "ฝสสน.4") {
          el["sumdataMaintenancefee"] = sumdata15maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata15InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata15InsuranceAll;
          el["sumdatawaterbill"] = sumdata15waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata15electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata15CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata15centralSumAll;
          el["sumdatacosts"] = sumdata15costsSumAll;
          el["sumCostdataCostCosts"] = sumdata15CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata15CostCentralSumAll;
        }
        if (el.label == "ฝสสน.5") {
          el["sumdataMaintenancefee"] = sumdata16maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata16InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata16InsuranceAll;
          el["sumdatawaterbill"] = sumdata16waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata16electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata16CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata16centralSumAll;
          el["sumdatacosts"] = sumdata16costsSumAll;
          el["sumCostdataCostCosts"] = sumdata16CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata16CostCentralSumAll;
        }
        if (el.label == "ลูกจ้าง") {
          el["sumdataMaintenancefee"] = sumdata17maintenancefeeSumAll;
          el["sumdataInsurance"] = sumdata17InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata17InsuranceAll;
          el["sumdatawaterbill"] = sumdata17waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata17electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata17CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata17centralSumAll;
          el["sumdatacosts"] = sumdata17costsSumAll;
          el["sumCostdataCostCosts"] = sumdata17CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata17CostCentralSumAll;
        }

        return el;
      });
      this.AffiliationListTR.map((e) => {
        e["countMaintenancefeeAll"] = this.countMaintenancefeeAll(this.AffiliationListTR);
        e["countInsuranceAll"] = this.countInsuranceAll(this.AffiliationListTR);
        e["countCostSumAll"] = this.countCostSumAll(this.AffiliationListTR);
        e["countwaterbilAll"] = this.countWaterbillAll(this.AffiliationListTR);
        e["countelectricitybillAll"] = this.countelectricitybillAll(
          this.AffiliationListTR
        );
        e["countCostwaterbillAll"] = this.countCostwaterbillSumAll(
          this.AffiliationListTR
        );
        e["countcentraAll"] = this.countcentralAll(this.AffiliationListTR);
        e["countcostsAll"] = this.countcostsAll(this.AffiliationListTR);
        e["countCostCostsSumAll"] = this.countCostCostsSumAll(this.AffiliationListTR);
        e["countdataCostCentralAllSum"] = this.countsumdataCostCentralAllSum(
          this.AffiliationListTR
        );
        return e;
      });
    },

    MaintenanceSumAll(items) {
      return items.reduce((MaintenanceSumAll, ele) => {
        let mapnum;
        if (ele.maintenance == "-" || ele.maintenance == undefined) mapnum = 0;
        else mapnum = ele.maintenance;
        if (mapnum !== undefined) return MaintenanceSumAll + parseInt(mapnum);
        else return MaintenanceSumAll;
      }, 0);
    },

    countCostSumList(items) {
      return items.reduce((countCostSumAll, ele) => {
        if (ele.sumcostMN !== undefined) return countCostSumAll + parseInt(ele.sumcostMN);
        else return countCostSumAll;
      }, 0);
    },

    InsuranceSumAll(items) {
      let mapnum1, mapnum2;
      return items.reduce((InsuranceSumAll, ele) => {
        if (ele.accumulated == "-" || ele.accumulated == undefined) mapnum2 = 0;
        else mapnum2 = ele.accumulated;
        if (ele.insurance == "-" || ele.insurance == undefined) mapnum1 = 0;
        else mapnum1 = ele.insurance;
        if (mapnum2 !== mapnum1) return InsuranceSumAll + parseInt(mapnum2);
        else return InsuranceSumAll;
      }, 0);
    },

    SumCostSumInsuranceAll(items) {
      let mapnum, mapnum2;
      return items.reduce((sumCostSumInsuranceAll, ele) => {
        if (ele.accumulated == "-" || ele.accumulated == undefined) mapnum = 0;
        else mapnum = ele.accumulated;
        if (ele.maintenance == "-" || ele.maintenance == undefined) mapnum2 = 0;
        else mapnum2 = ele.maintenance;
        if (ele.maintenance !== undefined) {
          return sumCostSumInsuranceAll + (parseInt(mapnum) + parseInt(mapnum2));
        } else {
          return sumCostSumInsuranceAll;
        }
      }, 0);
    },

    SumCostSummaintenanceAll(items) {
      return items.reduce((SumCostSummaintenanceAll, ele) => {
        if (ele.insurance !== undefined) {
          return (
            SumCostSummaintenanceAll +
            (parseInt(ele.insurance) + parseInt(ele.maintenancefree || 0))
          );
        } else {
          return sumCostSumInsuranceAll;
        }
      }, 0);
    },

    countMaintenanceAll(items) {
      let mapnum2;
      return items.reduce((sumCostSumInsuranceAll, ele) => {
        if (ele.sumdataMaintenance == "-" || ele.sumdataMaintenance == undefined)
          mapnum2 = 0;
        else mapnum2 = ele.sumdataMaintenance;
        if (mapnum2 !== undefined) return sumCostSumInsuranceAll + parseInt(mapnum2);
        else return sumCostSumInsuranceAll;
      }, 0);
    },

    countMaintenancefeeAll(items) {
      return items.reduce((sumCostSumMaintenancefeeAll, ele) => {
        if (ele.sumdataMaintenancefee !== undefined)
          return sumCostSumMaintenancefeeAll + parseInt(ele.sumdataMaintenancefee);
        else return sumCostSumMaintenancefeeAll;
      }, 0);
    },
    countInsuranceAll(items) {
      return items.reduce((countInsuranceAll, ele) => {
        if (ele.sumdataInsurance !== undefined)
          return countInsuranceAll + parseInt(ele.sumdataInsurance);
        else return countInsuranceAll;
      }, 0);
    },
    countCostSumAll(items) {
      return items.reduce((countCostSumAll, ele) => {
        if (ele.sumCostdataInsurance !== undefined)
          return countCostSumAll + parseInt(ele.sumCostdataInsurance);
        else return countCostSumAll;
      }, 0);
    },
    countWaterbillAll(items) {
      return items.reduce((countWaterbillAll, ele) => {
        if (ele.sumdatawaterbill !== undefined)
          return countWaterbillAll + parseInt(ele.sumdatawaterbill);
        else return countWaterbillAll;
      }, 0);
    },
    countelectricitybillAll(items) {
      return items.reduce((countelectricitybillAll, ele) => {
        if (ele.sumdataelectricitybill !== undefined)
          return countelectricitybillAll + parseInt(ele.sumdataelectricitybill);
        else return countelectricitybillAll;
      }, 0);
    },
    countCostwaterbillSumAll(items) {
      return items.reduce((countCostwaterbillSumAll, ele) => {
        if (ele.sumCostdatawaterbill !== undefined)
          return countCostwaterbillSumAll + parseInt(ele.sumCostdatawaterbill);
        else return countCostwaterbillSumAll;
      }, 0);
    },
    countcentralAll(items) {
      return items.reduce((countcentralAll, ele) => {
        if (ele.sumdatacentral !== undefined)
          return countcentralAll + parseInt(ele.sumdatacentral);
        else return countcentralAll;
      }, 0);
    },
    countcostsAll(items) {
      return items.reduce((countcostsAll, ele) => {
        if (ele.sumdatacosts !== undefined)
          return countcostsAll + parseInt(ele.sumdatacosts);
        else return countcostsAll;
      }, 0);
    },
    countCostCostsSumAll(items) {
      return items.reduce((countCostCostsSumAll, ele) => {
        if (ele.sumCostdataCostCosts !== undefined)
          return countCostCostsSumAll + parseInt(ele.sumCostdataCostCosts);
        else return countCostCostsSumAll;
      }, 0);
    },

    countsumdataCostCentralAllSum(items) {
      return items.reduce((dataCostCentralAllSum, ele) => {
        if (ele.sumdataCostCentralAllSum !== undefined)
          return dataCostCentralAllSum + parseInt(ele.sumdataCostCentralAllSum);
        else return dataCostCentralAllSum;
      }, 0);
    },

    async filterAffiliation2(listdata) {
      let listCTD,
        sumCTD = [];
      listCTD = listdata;
      // listCTD = listdata .filter(ee3 => ee3.amountPaid != ee3.insurance);
      let data,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10,
        data11,
        data12,
        data13,
        data14,
        data15,
        data16,
        data17 = [];
      data = listCTD.filter((el) => el.affiliation == "บช.ตชด.");
      let sumCostdataInsuranceAll = this.SumCostSumInsuranceAll(data);
      let sumdataInsuranceAll = this.InsuranceSumAll(data);
      let sumdataMaintenanceSumAll = this.MaintenanceSumAll(data);
      let sumdatawaterbillSumAll = this.WaterbillSum(data);
      let sumdataelectricitybillSumAll = this.ElectricitybillSum(data);
      let sumdataCostwaterbillSumAll = this.SumCostSumwater(data);
      let sumdatacentralSumAll = this.CentralSum(data);
      let sumdatacostsSumAll = this.CostsSum(data);
      let sumdataCostCostsSumAll = this.SumCostSumCentral(data);
      let sumdataCostCentralSumAll = this.CentralSumallCount(data);
      data2 = listCTD.filter((el) => el.affiliation == "บก.อก.");
      let sumCostdata2InsuranceAll = this.SumCostSumInsuranceAll(data2);
      let sumdata2InsuranceAll = this.InsuranceSumAll(data2);
      let sumdata2MaintenanceSumAll = this.MaintenanceSumAll(data2);
      let sumdata2waterbillSumAll = this.WaterbillSum(data2);
      let sumdata2electricitybillSumAll = this.ElectricitybillSum(data2);
      let sumdata2CostwaterbillSumAll = this.SumCostSumwater(data2);
      let sumdata2centralSumAll = this.CentralSum(data2);
      let sumdata2costsSumAll = this.CostsSum(data2);
      let sumdata2CostCostsSumAll = this.SumCostSumCentral(data2);
      let sumdata2CostCentralSumAll = this.CentralSumallCount(data2);
      data3 = listCTD.filter((el) => el.affiliation == "บก.สสน.");
      let sumCostdata3InsuranceAll = this.SumCostSumInsuranceAll(data3);
      let sumdata3InsuranceAll = this.InsuranceSumAll(data3);
      let sumdata3MaintenanceSumAll = this.MaintenanceSumAll(data3);
      let sumdata3waterbillSumAll = this.WaterbillSum(data3);
      let sumdata3electricitybillSumAll = this.ElectricitybillSum(data3);
      let sumdata3CostwaterbillSumAll = this.SumCostSumwater(data3);
      let sumdata3centralSumAll = this.CentralSum(data3);
      let sumdata3costsSumAll = this.CostsSum(data3);
      let sumdata3CostCostsSumAll = this.SumCostSumCentral(data3);
      let sumdata3CostCentralSumAll = this.CentralSumallCount(data3);
      data4 = listCTD.filter((el) => el.affiliation == "ฝอ.1");
      let sumCostdata4InsuranceAll = this.SumCostSumInsuranceAll(data4);
      let sumdata4InsuranceAll = this.InsuranceSumAll(data4);
      let sumdata4MaintenanceSumAll = this.MaintenanceSumAll(data4);
      let sumdata4waterbillSumAll = this.WaterbillSum(data4);
      let sumdata4electricitybillSumAll = this.ElectricitybillSum(data4);
      let sumdata4CostwaterbillSumAll = this.SumCostSumwater(data4);
      let sumdata4centralSumAll = this.CentralSum(data4);
      let sumdata4costsSumAll = this.CostsSum(data4);
      let sumdata4CostCostsSumAll = this.SumCostSumCentral(data4);
      let sumdata4CostCentralSumAll = this.CentralSumallCount(data4);
      data5 = listCTD.filter((el) => el.affiliation == "ฝอ.2");
      let sumCostdata5InsuranceAll = this.SumCostSumInsuranceAll(data5);
      let sumdata5InsuranceAll = this.InsuranceSumAll(data5);
      let sumdata5MaintenanceSumAll = this.MaintenanceSumAll(data5);
      let sumdata5waterbillSumAll = this.WaterbillSum(data5);
      let sumdata5electricitybillSumAll = this.ElectricitybillSum(data5);
      let sumdata5CostwaterbillSumAll = this.SumCostSumwater(data5);
      let sumdata5centralSumAll = this.CentralSum(data5);
      let sumdata5costsSumAll = this.CostsSum(data5);
      let sumdata5CostCostsSumAll = this.SumCostSumCentral(data5);
      let sumdata5CostCentralSumAll = this.CentralSumallCount(data5);
      data6 = listCTD.filter((el) => el.affiliation == "ฝอ.3");
      let sumCostdata6InsuranceAll = this.SumCostSumInsuranceAll(data6);
      let sumdata6InsuranceAll = this.InsuranceSumAll(data6);
      let sumdata6MaintenanceSumAll = this.MaintenanceSumAll(data6);
      let sumdata6waterbillSumAll = this.WaterbillSum(data6);
      let sumdata6electricitybillSumAll = this.ElectricitybillSum(data6);
      let sumdata6CostwaterbillSumAll = this.SumCostSumwater(data6);
      let sumdata6centralSumAll = this.CentralSum(data6);
      let sumdata6costsSumAll = this.CostsSum(data6);
      let sumdata6CostCostsSumAll = this.SumCostSumCentral(data6);
      let sumdata6CostCentralSumAll = this.CentralSumallCount(data6);
      data7 = listCTD.filter((el) => el.affiliation == "ฝอ.4");
      let sumCostdata7InsuranceAll = this.SumCostSumInsuranceAll(data7);
      let sumdata7InsuranceAll = this.InsuranceSumAll(data7);
      let sumdata7MaintenanceSumAll = this.MaintenanceSumAll(data7);
      let sumdata7waterbillSumAll = this.WaterbillSum(data7);
      let sumdata7electricitybillSumAll = this.ElectricitybillSum(data7);
      let sumdata7CostwaterbillSumAll = this.SumCostSumwater(data7);
      let sumdata7centralSumAll = this.CentralSum(data7);
      let sumdata7costsSumAll = this.CostsSum(data7);
      let sumdata7CostCostsSumAll = this.SumCostSumCentral(data7);
      let sumdata7CostCentralSumAll = this.CentralSumallCount(data7);
      data8 = listCTD.filter((el) => el.affiliation == "ฝอ.5");
      let sumCostdata8InsuranceAll = this.SumCostSumInsuranceAll(data8);
      let sumdata8InsuranceAll = this.InsuranceSumAll(data8);
      let sumdata8MaintenanceSumAll = this.MaintenanceSumAll(data8);
      let sumdata8waterbillSumAll = this.WaterbillSum(data8);
      let sumdata8electricitybillSumAll = this.ElectricitybillSum(data8);
      let sumdata8CostwaterbillSumAll = this.SumCostSumwater(data8);
      let sumdata8centralSumAll = this.CentralSum(data8);
      let sumdata8costsSumAll = this.CostsSum(data8);
      let sumdata8CostCostsSumAll = this.SumCostSumCentral(data8);
      let sumdata8CostCentralSumAll = this.CentralSumallCount(data8);
      data9 = listCTD.filter((el) => el.affiliation == "ฝอ.6");
      let sumCostdata9InsuranceAll = this.SumCostSumInsuranceAll(data9);
      let sumdata9InsuranceAll = this.InsuranceSumAll(data9);
      let sumdata9MaintenanceSumAll = this.MaintenanceSumAll(data9);
      let sumdata9waterbillSumAll = this.WaterbillSum(data9);
      let sumdata9electricitybillSumAll = this.ElectricitybillSum(data9);
      let sumdata9CostwaterbillSumAll = this.SumCostSumwater(data9);
      let sumdata9centralSumAll = this.CentralSum(data9);
      let sumdata9costsSumAll = this.CostsSum(data9);
      let sumdata9CostCostsSumAll = this.SumCostSumCentral(data9);
      let sumdata9CostCentralSumAll = this.CentralSumallCount(data9);
      data10 = listCTD.filter((el) => el.affiliation == "ฝอ.7");
      let sumCostdata10InsuranceAll = this.SumCostSumInsuranceAll(data10);
      let sumdata10InsuranceAll = this.InsuranceSumAll(data10);
      let sumdata10MaintenanceSumAll = this.MaintenanceSumAll(data10);
      let sumdata10waterbillSumAll = this.WaterbillSum(data10);
      let sumdata10electricitybillSumAll = this.ElectricitybillSum(data10);
      let sumdata10CostwaterbillSumAll = this.SumCostSumwater(data10);
      let sumdata10centralSumAll = this.CentralSum(data10);
      let sumdata10costsSumAll = this.CostsSum(data10);
      let sumdata10CostCostsSumAll = this.SumCostSumCentral(data10);
      let sumdata10CostCentralSumAll = this.CentralSumallCount(data10);
      data11 = listCTD.filter((el) => el.affiliation == "ฝอ.8");
      let sumCostdata11InsuranceAll = this.SumCostSumInsuranceAll(data11);
      let sumdata11InsuranceAll = this.InsuranceSumAll(data11);
      let sumdata11MaintenanceSumAll = this.MaintenanceSumAll(data11);
      let sumdata11waterbillSumAll = this.WaterbillSum(data11);
      let sumdata11electricitybillSumAll = this.ElectricitybillSum(data11);
      let sumdata11CostwaterbillSumAll = this.SumCostSumwater(data11);
      let sumdata11centralSumAll = this.CentralSum(data11);
      let sumdata11costsSumAll = this.CostsSum(data11);
      let sumdata11CostCostsSumAll = this.SumCostSumCentral(data11);
      let sumdata11CostCentralSumAll = this.CentralSumallCount(data11);
      data12 = listCTD.filter((el) => el.affiliation == "ฝสสน.1");
      let sumCostdata12InsuranceAll = this.SumCostSumInsuranceAll(data12);
      let sumdata12InsuranceAll = this.InsuranceSumAll(data12);
      let sumdata12MaintenanceSumAll = this.MaintenanceSumAll(data12);
      let sumdata12waterbillSumAll = this.WaterbillSum(data12);
      let sumdata12electricitybillSumAll = this.ElectricitybillSum(data12);
      let sumdata12CostwaterbillSumAll = this.SumCostSumwater(data12);
      let sumdata12centralSumAll = this.CentralSum(data12);
      let sumdata12costsSumAll = this.CostsSum(data12);
      let sumdata12CostCostsSumAll = this.SumCostSumCentral(data12);
      let sumdata12CostCentralSumAll = this.CentralSumallCount(data12);
      data13 = listCTD.filter((el) => el.affiliation == "ฝสสน.2");
      let sumCostdata13InsuranceAll = this.SumCostSumInsuranceAll(data13);
      let sumdata13InsuranceAll = this.InsuranceSumAll(data13);
      let sumdata13MaintenanceSumAll = this.MaintenanceSumAll(data13);
      let sumdata13waterbillSumAll = this.WaterbillSum(data13);
      let sumdata13lectricitybillSumAll = this.ElectricitybillSum(data13);
      let sumdata13CostwaterbillSumAll = this.SumCostSumwater(data13);
      let sumdata13centralSumAll = this.CentralSum(data13);
      let sumdata13costsSumAll = this.CostsSum(data13);
      let sumdata13CostCostsSumAll = this.SumCostSumCentral(data13);
      let sumdata13CostCentralSumAll = this.CentralSumallCount(data13);
      data14 = listCTD.filter((el) => el.affiliation == "ฝสสน.3");
      let sumCostdata14InsuranceAll = this.SumCostSumInsuranceAll(data14);
      let sumdata14InsuranceAll = this.InsuranceSumAll(data14);
      let sumdata14MaintenanceSumAll = this.MaintenanceSumAll(data14);
      let sumdata14waterbillSumAll = this.WaterbillSum(data14);
      let sumdata14electricitybillSumAll = this.ElectricitybillSum(data14);
      let sumdata14CostwaterbillSumAll = this.SumCostSumwater(data14);
      let sumdata14centralSumAll = this.CentralSum(data14);
      let sumdata14costsSumAll = this.CostsSum(data14);
      let sumdata14CostCostsSumAll = this.SumCostSumCentral(data14);
      let sumdata14CostCentralSumAll = this.CentralSumallCount(data14);
      data15 = listCTD.filter((el) => el.affiliation == "ฝสสน.4");
      let sumCostdata15InsuranceAll = this.SumCostSumInsuranceAll(data15);
      let sumdata15InsuranceAll = this.InsuranceSumAll(data15);
      let sumdata15MaintenanceSumAll = this.MaintenanceSumAll(data15);
      let sumdata15waterbillSumAll = this.WaterbillSum(data15);
      let sumdata15electricitybillSumAll = this.ElectricitybillSum(data15);
      let sumdata15CostwaterbillSumAll = this.SumCostSumwater(data15);
      let sumdata15centralSumAll = this.CentralSum(data15);
      let sumdata15costsSumAll = this.CostsSum(data15);
      let sumdata15CostCostsSumAll = this.SumCostSumCentral(data15);
      let sumdata15CostCentralSumAll = this.CentralSumallCount(data15);
      data16 = listCTD.filter((el) => el.affiliation == "ฝสสน.5");
      let sumCostdata16InsuranceAll = this.SumCostSumInsuranceAll(data16);
      let sumdata16InsuranceAll = this.InsuranceSumAll(data16);
      let sumdata16MaintenanceSumAll = this.MaintenanceSumAll(data16);
      let sumdata16waterbillSumAll = this.WaterbillSum(data16);
      let sumdata16electricitybillSumAll = this.ElectricitybillSum(data16);
      let sumdata16CostwaterbillSumAll = this.SumCostSumwater(data16);
      let sumdata16centralSumAll = this.CentralSum(data16);
      let sumdata16costsSumAll = this.CostsSum(data16);
      let sumdata16CostCostsSumAll = this.SumCostSumCentral(data16);
      let sumdata16CostCentralSumAll = this.CentralSumallCount(data16);
      data17 = listCTD.filter((el) => el.affiliation == "ลูกจ้าง");
      let sumCostdata17InsuranceAll = this.SumCostSumInsuranceAll(data17);
      let sumdata17InsuranceAll = this.InsuranceSumAll(data17);
      let sumdata17MaintenanceSumAll = this.MaintenanceSumAll(data17);
      let sumdata17waterbillSumAll = this.WaterbillSum(data17);
      let sumdata17electricitybillSumAll = this.ElectricitybillSum(data17);
      let sumdata17CostwaterbillSumAll = this.SumCostSumwater(data17);
      let sumdata17centralSumAll = this.CentralSum(data17);
      let sumdata17costsSumAll = this.CostsSum(data17);
      let sumdata17CostCostsSumAll = this.SumCostSumCentral(data17);
      let sumdata17CostCentralSumAll = this.CentralSumallCount(data17);
      sumCTD = await this.AffiliationListCTD.map((el) => {
        if (el.label == "บช.ตชด.") {
          el["sumdataMaintenance"] = sumdataMaintenanceSumAll;
          el["sumdataInsurance"] = sumdataInsuranceAll;
          el["sumCostdataInsurance"] = sumCostdataInsuranceAll;
          el["sumdatawaterbill"] = sumdatawaterbillSumAll;
          el["sumdataelectricitybill"] = sumdataelectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdataCostwaterbillSumAll;
          el["sumdatacentral"] = sumdatacentralSumAll;
          el["sumdatacosts"] = sumdatacostsSumAll;
          el["sumCostdataCostCosts"] = sumdataCostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdataCostCentralSumAll;
        }
        if (el.label == "บก.อก.") {
          el["sumdataMaintenance"] = sumdata2MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata2InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata2InsuranceAll;
          el["sumdatawaterbill"] = sumdata2waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata2electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata2CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata2centralSumAll;
          el["sumdatacosts"] = sumdata2costsSumAll;
          el["sumCostdataCostCosts"] = sumdata2CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata2CostCentralSumAll;
        }
        if (el.label == "บก.สสน.") {
          el["sumdataMaintenance"] = sumdata3MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata3InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata3InsuranceAll;
          el["sumdatawaterbill"] = sumdata3waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata3electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata3CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata3centralSumAll;
          el["sumdatacosts"] = sumdata3costsSumAll;
          el["sumCostdataCostCosts"] = sumdata3CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata3CostCentralSumAll;
        }
        if (el.label == "ฝอ.1") {
          el["sumdataMaintenance"] = sumdata4MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata4InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata4InsuranceAll;
          el["sumdatawaterbill"] = sumdata4waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata4electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata4CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata4centralSumAll;
          el["sumdatacosts"] = sumdata4costsSumAll;
          el["sumCostdataCostCosts"] = sumdata4CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata4CostCentralSumAll;
        }
        if (el.label == "ฝอ.2") {
          el["sumdataMaintenance"] = sumdata5MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata5InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata5InsuranceAll;
          el["sumdatawaterbill"] = sumdata5waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata5electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata5CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata5centralSumAll;
          el["sumdatacosts"] = sumdata5costsSumAll;
          el["sumCostdataCostCosts"] = sumdata5CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata5CostCentralSumAll;
        }
        if (el.label == "ฝอ.3") {
          el["sumdataMaintenance"] = sumdata6MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata6InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata6InsuranceAll;
          el["sumdatawaterbill"] = sumdata6waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata6electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata6CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata6centralSumAll;
          el["sumdatacosts"] = sumdata6costsSumAll;
          el["sumCostdataCostCosts"] = sumdata6CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata6CostCentralSumAll;
        }
        if (el.label == "ฝอ.4") {
          el["sumdataMaintenance"] = sumdata7MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata7InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata7InsuranceAll;
          el["sumdatawaterbill"] = sumdata7waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata7electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata7CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata7centralSumAll;
          el["sumdatacosts"] = sumdata7costsSumAll;
          el["sumCostdataCostCosts"] = sumdata7CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata7CostCentralSumAll;
        }
        if (el.label == "ฝอ.5") {
          el["sumdataMaintenance"] = sumdata8MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata8InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata8InsuranceAll;
          el["sumdatawaterbill"] = sumdata8waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata8electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata8CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata8centralSumAll;
          el["sumdatacosts"] = sumdata8costsSumAll;
          el["sumCostdataCostCosts"] = sumdata8CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata8CostCentralSumAll;
        }
        if (el.label == "ฝอ.6") {
          el["sumdataMaintenance"] = sumdata9MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata9InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata9InsuranceAll;
          el["sumdatawaterbill"] = sumdata9waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata9electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata9CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata9centralSumAll;
          el["sumdatacosts"] = sumdata9costsSumAll;
          el["sumCostdataCostCosts"] = sumdata9CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata9CostCentralSumAll;
        }
        if (el.label == "ฝอ.7") {
          el["sumdataMaintenance"] = sumdata10MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata10InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata10InsuranceAll;
          el["sumdatawaterbill"] = sumdata10waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata10electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata10CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata10centralSumAll;
          el["sumdatacosts"] = sumdata10costsSumAll;
          el["sumCostdataCostCosts"] = sumdata10CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata10CostCentralSumAll;
        }
        if (el.label == "ฝอ.8") {
          el["sumdataMaintenance"] = sumdata11MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata11InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata11InsuranceAll;
          el["sumdatawaterbill"] = sumdata11waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata11electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata11CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata11centralSumAll;
          el["sumdatacosts"] = sumdata11costsSumAll;
          el["sumCostdataCostCosts"] = sumdata11CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata11CostCentralSumAll;
        }
        if (el.label == "ฝสสน.1") {
          el["sumdataMaintenance"] = sumdata12MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata12InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata12InsuranceAll;
          el["sumdatawaterbill"] = sumdata12waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata12electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata12CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata12centralSumAll;
          el["sumdatacosts"] = sumdata12costsSumAll;
          el["sumCostdataCostCosts"] = sumdata12CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata12CostCentralSumAll;
        }
        if (el.label == "ฝสสน.2") {
          el["sumdataMaintenance"] = sumdata13MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata13InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata13InsuranceAll;
          el["sumdatawaterbill"] = sumdata13waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata13lectricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata13CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata13centralSumAll;
          el["sumdatacosts"] = sumdata13costsSumAll;
          el["sumCostdataCostCosts"] = sumdata13CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata13CostCentralSumAll;
        }
        if (el.label == "ฝสสน.3") {
          el["sumdataMaintenance"] = sumdata14MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata14InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata14InsuranceAll;
          el["sumdatawaterbill"] = sumdata14waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata14electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata14CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata14centralSumAll;
          el["sumdatacosts"] = sumdata14costsSumAll;
          el["sumCostdataCostCosts"] = sumdata14CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata14CostCentralSumAll;
        }

        if (el.label == "ฝสสน.4") {
          el["sumdataMaintenance"] = sumdata15MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata15InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata15InsuranceAll;
          el["sumdatawaterbill"] = sumdata15waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata15electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata15CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata15centralSumAll;
          el["sumdatacosts"] = sumdata15costsSumAll;
          el["sumCostdataCostCosts"] = sumdata15CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata15CostCentralSumAll;
        }
        if (el.label == "ฝสสน.5") {
          el["sumdataMaintenance"] = sumdata16MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata16InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata16InsuranceAll;
          el["sumdatawaterbill"] = sumdata16waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata16electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata16CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata16centralSumAll;
          el["sumdatacosts"] = sumdata16costsSumAll;
          el["sumCostdataCostCosts"] = sumdata16CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata16CostCentralSumAll;
        }
        if (el.label == "ลูกจ้าง") {
          el["sumdataMaintenance"] = sumdata17MaintenanceSumAll;
          el["sumdataInsurance"] = sumdata17InsuranceAll;
          el["sumCostdataInsurance"] = sumCostdata17InsuranceAll;
          el["sumdatawaterbill"] = sumdata17waterbillSumAll;
          el["sumdataelectricitybill"] = sumdata17electricitybillSumAll;
          el["sumCostdatawaterbill"] = sumdata17CostwaterbillSumAll;
          el["sumdatacentral"] = sumdata17centralSumAll;
          el["sumdatacosts"] = sumdata17costsSumAll;
          el["sumCostdataCostCosts"] = sumdata17CostCostsSumAll;
          el["sumdataCostCentralAllSum"] = sumdata17CostCentralSumAll;
        }

        return el;
      });
      await this.AffiliationListCTD.map((e) => {
        e["countMaintenanceAll"] = this.countMaintenanceAll(sumCTD);
        e["countInsuranceAll"] = this.countInsuranceAll(sumCTD);
        e["countCostSumAll"] = this.countCostSumAll(sumCTD);
        e["countwaterbilAll"] = this.countWaterbillAll(sumCTD);
        e["countelectricitybillAll"] = this.countelectricitybillAll(sumCTD);
        e["countCostwaterbillAll"] = this.countCostwaterbillSumAll(sumCTD);
        e["countcentraAll"] = this.countcentralAll(sumCTD);
        e["countcostsAll"] = this.countcostsAll(sumCTD);
        e["countCostCostsSumAll"] = this.countCostCostsSumAll(sumCTD);
        e["countdataCostCentralAllSum"] = this.countsumdataCostCentralAllSum(sumCTD);
        return e;
      });
    },

    async mapData(data, data2, data3, data4, dataTR) {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      arr = await data.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          lastnumber: el.lastnumber || 0,
          firstnumber: el.firstnumber || 0,
          central: el.central || 0,
          typeAffiliation: el.typeAffiliation || "-",
          typeContract: el.typeContract || "-",
          contractExpenses: el.contractExpenses || "-",
          buildingName: el.buildingName || "-",
          maintenance: el.maintenance || 0,
          insurance: el.insurance || 0,
          accumulated: this.countSumAccumulated(el),
          roomnumber: el.roomnumber,
          amountPaid: el.amountPaid || 0,
          maintenancefee: el.maintenancefee || 0,
          fullname: (el.rank || "") + " " + el?.firstName + " " + el?.lastName,
          unitWater: el.lastnumber - el.firstnumber || 0,
          costs: el.costs || 0,
          waterbill: el.waterbill || 0,
          electricitybill: el.electricitybill || 0,
          Installmenttime: el.installmentsTime,
          affiliationNo: el.affiliationNo
        };
      });

      arr2 = await data2.map((el2, i) => {
        return {
          ...el2,
          numberNo: i + 1,
          lastnumber: el2.lastnumber || 0,
          firstnumber: el2.firstnumber || 0,
          central: el2.central || 0,
          typeAffiliation: el2.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el2),
          typeContract: el2.typeContract || "-",
          contractExpenses: el2.contractExpenses || "-",
          buildingName: el2.buildingName || "-",
          costs: el2.costs || 0,
          insurance: el2.insurance || 0,
          maintenancefee: el2.maintenancefee || 0,
          roomnumber: el2.roomnumber,
          amountPaid: el2.amountPaid || 0,
          fullname: (el2.rank || "") + " " + el2?.firstName + " " + el2?.lastName,
          unitWater: el2.lastnumber - el2.firstnumber || 0,
          maintenance: el2.maintenance || 0,
          waterbill: el2.waterbill || 0,
          electricitybill: el2.electricitybill || 0,
          Installmenttime: el2.installmentsTime,
          affiliationNo: el2.affiliationNo
        };
      });

      arr3 = await data3.map((el3, i) => {
        return {
          ...el3,
          numberNo: i + 1,
          lastnumber: el3.lastnumber || 0,
          firstnumber: el3.firstnumber || 0,
          central: el3.central || 0,
          typeAffiliation: el3.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el3),
          typeContract: el3.typeContract || "-",
          contractExpenses: el3.contractExpenses || "-",
          buildingName: el3.buildingName || "-",
          costs: el3.costs || 0,
          insurance: el3.insurance || 0,
          maintenancefee: el3.maintenancefee || 0,
          roomnumber: el3.roomnumber,
          amountPaid: el3.amountPaid || 0,
          fullname: (el3.rank || "") + " " + el3?.firstName + " " + el3?.lastName,
          unitWater: el3.lastnumber - el3.firstnumber || 0,
          maintenance: el3.maintenance || 0,
          waterbill: el3.waterbill || 0,
          electricitybill: el3.electricitybill || 0,
          Installmenttime: el3.installmentsTime,
          affiliationNo: el3.affiliationNo
        };
      });

      arr4 = await data4.map((el4, i) => {
        return {
          ...el4,
          numberNo: i + 1,
          lastnumber: el4.lastnumber || 0,
          firstnumber: el4.firstnumber || 0,
          central: el4.central || 0,
          typeAffiliation: el4.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el4),
          typeContract: el4.typeContract || "-",
          contractExpenses: el4.contractExpenses || "-",
          buildingName: el4.buildingName || "-",
          costs: el4.costs || 0,
          insurance: el4.insurance || 0,
          maintenancefee: el4.maintenancefee || 0,
          roomnumber: el4.roomnumber,
          amountPaid: el4.amountPaid || 0,
          fullname: (el4.rank || "") + " " + el4?.firstName + " " + el4?.lastName,
          unitWater: el4.lastnumber - el4.firstnumber || 0,
          maintenance: el4.maintenance || 0,
          waterbill: el4.waterbill || 0,
          electricitybill: el4.electricitybill || 0,
          Installmenttime: el4.installmentsTime,
          affiliationNo: el4.affiliationNo
        };
      });

      arr5 = await dataTR.map((el5, i) => {
        return {
          ...el5,
          numberNo: i + 1,
          lastnumber: el5.lastnumber || 0,
          firstnumber: el5.firstnumber || 0,
          central: el5.central || 0,
          typeAffiliation: el5.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el5),
          typeContract: el5.typeContract || "-",
          contractExpenses: el5.contractExpenses || "-",
          buildingName: el5.buildingName || "-",
          costs: el5.costs || 0,
          insurance: el5.insurance || 0,
          maintenancefee: el5.maintenancefee || 0,
          roomnumber: el5.roomnumber,
          amountPaid: el5.amountPaid || 0,
          fullname: (el5.rank || "") + " " + el5?.firstName + " " + el5?.lastName,
          unitWater: el5.lastnumber - el5.firstnumber || 0,
          maintenance: el5.maintenance || 0,
          waterbill: el5.waterbill || 0,
          electricitybill: el5.electricitybill || 0,
          Installmenttime: el5.installmentsTime,
          affiliationNo: el5.affiliationNo
        };
      });

      let arr6 = arr.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
      let arr7 = arr4.filter((ee) => ee.accumulated != ee.amountPaid);

      await this.mapsumAll(arr6, arr2, arr3, arr7, arr5);
    },

    async mapData2(data, data2, data3, data4, data5, data6, data55, data66, data77) {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let arr55 = [];
      let arr66 = [];
      let arr77 = [];
      arr = await data.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          lastnumber: el.lastnumber || 0,
          firstnumber: el.firstnumber || 0,
          central: el.central || 0,
          typeAffiliation: el.typeAffiliation || "-",
          typeContract: el.typeContract || "-",
          contractExpenses: el.contractExpenses || "-",
          buildingName: el.buildingName || "-",
          maintenance: el.maintenance || 0,
          insurance: el.insurance || 0,
          accumulated: this.countSumAccumulated(el),
          roomnumber: el.roomnumber,
          amountPaid: el.amountPaid || 0,
          maintenancefee: el.maintenancefee || 0,
          fullname: (el.rank || "") + " " + el?.firstName + " " + el?.lastName,
          unitWater: el.lastnumber - el.firstnumber || 0,
          costs: el.costs || 0,
          waterbill: el.waterbill || 0,
          electricitybill: el.electricitybill || 0,
          Installmenttime: el.installmentsTime,
          affiliationNo: el.affiliationNo
        };
      });

      arr2 = await data2.map((el2, i) => {
        return {
          ...el2,
          numberNo: i + 1,
          lastnumber: el2.lastnumber || 0,
          firstnumber: el2.firstnumber || 0,
          central: el2.central || 0,
          typeAffiliation: el2.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el2),
          typeContract: el2.typeContract || "-",
          contractExpenses: el2.contractExpenses || "-",
          buildingName: el2.buildingName || "-",
          costs: el2.costs || 0,
          insurance: el2.insurance || 0,
          maintenancefee: el2.maintenancefee || 0,
          roomnumber: el2.roomnumber,
          amountPaid: el2.amountPaid || 0,
          fullname: (el2.rank || "") + " " + el2?.firstName + " " + el2?.lastName,
          unitWater: el2.lastnumber - el2.firstnumber || 0,
          maintenance: el2.maintenance || 0,
          waterbill: el2.waterbill || 0,
          electricitybill: el2.electricitybill || 0,
          Installmenttime: el2.installmentsTime,
          affiliationNo: el2.affiliationNo
        };
      });

      arr3 = await data3.map((el3, i) => {
        return {
          ...el3,
          numberNo: i + 1,
          lastnumber: el3.lastnumber || 0,
          firstnumber: el3.firstnumber || 0,
          central: el3.central || 0,
          typeAffiliation: el3.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el3),
          typeContract: el3.typeContract || "-",
          contractExpenses: el3.contractExpenses || "-",
          buildingName: el3.buildingName || "-",
          costs: el3.costs || 0,
          insurance: el3.insurance || 0,
          maintenancefee: el3.maintenancefee || 0,
          roomnumber: el3.roomnumber,
          amountPaid: el3.amountPaid || 0,
          fullname: (el3.rank || "") + " " + el3?.firstName + " " + el3?.lastName,
          unitWater: el3.lastnumber - el3.firstnumber || 0,
          maintenance: el3.maintenance || 0,
          waterbill: el3.waterbill || 0,
          electricitybill: el3.electricitybill || 0,
          Installmenttime: el3.installmentsTime,
          affiliationNo: el3.affiliationNo
        };
      });

      arr4 = await data4.map((el4, i) => {
        return {
          ...el4,
          numberNo: i + 1,
          lastnumber: el4.lastnumber || 0,
          firstnumber: el4.firstnumber || 0,
          central: el4.central || 0,
          typeAffiliation: el4.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el4),
          typeContract: el4.typeContract || "-",
          contractExpenses: el4.contractExpenses || "-",
          buildingName: el4.buildingName || "-",
          costs: el4.costs || 0,
          insurance: el4.insurance || 0,
          maintenancefee: el4.maintenancefee || 0,
          roomnumber: el4.roomnumber,
          amountPaid: el4.amountPaid || 0,
          fullname: (el4.rank || "") + " " + el4?.firstName + " " + el4?.lastName,
          unitWater: el4.lastnumber - el4.firstnumber || 0,
          maintenance: el4.maintenance || 0,
          waterbill: el4.waterbill || 0,
          electricitybill: el4.electricitybill || 0,
          Installmenttime: el4.installmentsTime,
          affiliationNo: el4.affiliationNo
        };
      });

      arr5 = await data5.map((el5, i) => {
        return {
          ...el5,
          numberNo: i + 1,
          lastnumber: el5.lastnumber || 0,
          firstnumber: el5.firstnumber || 0,
          central: el5.central || 0,
          typeAffiliation: el5.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el5),
          typeContract: el5.typeContract || "-",
          contractExpenses: el5.contractExpenses || "-",
          buildingName: el5.buildingName || "-",
          costs: el5.costs || 0,
          insurance: el5.insurance || 0,
          maintenancefee: el5.maintenancefee || 0,
          roomnumber: el5.roomnumber,
          amountPaid: el5.amountPaid || 0,
          fullname: (el5.rank || "") + " " + el5?.firstName + " " + el5?.lastName,
          unitWater: el5.lastnumber - el5.firstnumber || 0,
          maintenance: el5.maintenance || 0,
          waterbill: el5.waterbill || 0,
          electricitybill: el5.electricitybill || 0,
          Installmenttime: el5.installmentsTime,
          affiliationNo: el5.affiliationNo
        };
      });

      arr6 = await data6.map((el6, i) => {
        return {
          ...el6,
          numberNo: i + 1,
          lastnumber: el6.lastnumber || 0,
          firstnumber: el6.firstnumber || 0,
          central: el6.central || 0,
          typeAffiliation: el6.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(el6),
          typeContract: el6.typeContract || "-",
          contractExpenses: el6.contractExpenses || "-",
          buildingName: el6.buildingName || "-",
          costs: el6.costs || 0,
          insurance: el6.insurance || 0,
          maintenancefee: el6.maintenancefee || 0,
          roomnumber: el6.roomnumber,
          amountPaid: el6.amountPaid || 0,
          fullname: (el6.rank || "") + " " + el6?.firstName + " " + el6?.lastName,
          unitWater: el6.lastnumber - el6.firstnumber || 0,
          maintenance: el6.maintenance || 0,
          waterbill: el6.waterbill || 0,
          electricitybill: el6.electricitybill || 0,
          Installmenttime: el6.installmentsTime,
          affiliationNo: el6.affiliationNo
        };
      });
      arr55 = await data55.map((e55, i) => {
        return {
          ...e55,
          numberNo: i + 1,
          lastnumber: e55.lastnumber || 0,
          firstnumber: e55.firstnumber || 0,
          central: e55.central || 0,
          typeAffiliation: e55.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(e55),
          typeContract: e55.typeContract || "-",
          contractExpenses: e55.contractExpenses || "-",
          buildingName: e55.buildingName || "-",
          costs: e55.costs || 0,
          insurance: e55.insurance || 0,
          maintenancefee: e55.maintenancefee || 0,
          roomnumber: e55.roomnumber,
          amountPaid: e55.amountPaid || 0,
          fullname: (e55.rank || "") + " " + e55?.firstName + " " + e55?.lastName,
          unitWater: e55.lastnumber - e55.firstnumber || 0,
          maintenance: e55.maintenance || 0,
          waterbill: e55.waterbill || 0,
          electricitybill: e55.electricitybill || 0,
          Installmenttime: e55.installmentsTime,
          affiliationNo: e55.affiliationNo
        };
      });

      arr66 = await data66.map((e66, i) => {
        return {
          ...e66,
          numberNo: i + 1,
          lastnumber: e66.lastnumber || 0,
          firstnumber: e66.firstnumber || 0,
          central: e66.central || 0,
          typeAffiliation: e66.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(e66),
          typeContract: e66.typeContract || "-",
          contractExpenses: e66.contractExpenses || "-",
          buildingName: e66.buildingName || "-",
          costs: e66.costs || 0,
          insurance: e66.insurance || 0,
          maintenancefee: e66.maintenancefee || 0,
          roomnumber: e66.roomnumber,
          amountPaid: e66.amountPaid || 0,
          fullname: (e66.rank || "") + " " + e66?.firstName + " " + e66?.lastName,
          unitWater: e66.lastnumber - e66.firstnumber || 0,
          maintenance: e66.maintenance || 0,
          waterbill: e66.waterbill || 0,
          electricitybill: e66.electricitybill || 0,
          Installmenttime: e66.installmentsTime,
          affiliationNo: e66.affiliationNo
        };
      });

      arr77 = await data77.map((e77, i) => {
        return {
          ...e77,
          numberNo: i + 1,
          lastnumber: e77.lastnumber || 0,
          firstnumber: e77.firstnumber || 0,
          central: e77.central || 0,
          typeAffiliation: e77.typeAffiliation || "-",
          accumulated: this.countSumAccumulated(e77),
          typeContract: e77.typeContract || "-",
          contractExpenses: e77.contractExpenses || "-",
          buildingName: e77.buildingName || "-",
          costs: e77.costs || 0,
          insurance: e77.insurance || 0,
          maintenancefee: e77.maintenancefee || 0,
          roomnumber: e77.roomnumber,
          amountPaid: e77.amountPaid || 0,
          fullname: (e77.rank || "") + " " + e77?.firstName + " " + e77?.lastName,
          unitWater: e77.lastnumber - e77.firstnumber || 0,
          maintenance: e77.maintenance || 0,
          waterbill: e77.waterbill || 0,
          electricitybill: e77.electricitybill || 0,
          Installmenttime: e77.installmentsTime,
          affiliationNo: e77.affiliationNo
        };
      });
      arr.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
      arr2.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
      arr3.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });

      arr55.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
      arr66.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
      arr77.map((er) => {
        if (er.accumulated == er.amountPaid) {
          er.accumulated = "-";
        }
        return er;
      });
  
      this.reportlistok = arr55;
      this.reportListssn = arr66;
      this.reportlistlj = arr77;
      this.reportlistokTD = arr4;
      this.reportListssnTD = arr5;
      this.reportlistljTD = arr6;
      await this.mapSummerry(arr, arr2, arr3, arr4, arr5, arr6);
    },

    mapSummerry(arr11, arr22, arr33, arr4, arr5, arr6) {
      this.sumreportlistAll = arr11.map((x1) => {
        let arr1 = arr11;
        return {
          ...x1,
          type: "อำนวยการ",
          sumdataMaintenance: this.MaintenanceSumAll(arr1),
          sumdataMaintenancefree: this.maintenancefeeCount(arr1),
          sumdataInsurance: this.InsuranceSumAll(arr1),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr1),
          sumdatawaterbill: this.waterbillSummary(arr1),
          sumdataelectricitybill: this.ElectricitybillSum(arr1),
          sumCostdatawaterbill: this.WaterbillSumCount(arr1),
          sumdatacentral: this.CentralSum(arr1),
          sumdatacosts: this.CostsSum(arr1),
          sumCostdataCostCosts: this.centralSumCount(arr1),
        };
      });

      this.sumreportlistAll2 = arr22.map((x2) => {
        let arr2 = arr22;
        return {
          ...x2,
          type: "สนับสนุน",
          sumdataMaintenance: this.MaintenanceSumAll(arr2),
          sumdataInsurance: this.InsuranceSumAll(arr2),
          sumdataMaintenancefree: this.maintenancefeeCount(arr2),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr2),
          sumdatawaterbill: this.waterbillSummary(arr2),
          sumdataelectricitybill: this.ElectricitybillSum(arr2),
          sumCostdatawaterbill: this.WaterbillSumCount(arr2),
          sumdatacentral: this.CentralSum(arr2),
          sumdatacosts: this.CostsSum(arr2),
          sumCostdataCostCoasts: this.centralSumCount(arr2),
        };
      });
      this.sumreportlistAll3 = arr33.map((x3) => {
        let arr3 = arr33;
        return {
          ...x3,
          type: "ลูกจ้าง",
          sumdataMaintenance: this.MaintenanceSumAll(arr3),
          sumdataMaintenancefree: this.maintenancefeeCount(arr3),
          sumdataInsurance: this.InsuranceSumAll(arr3),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr3),
          sumdatawaterbill: this.waterbillSummary(arr3),
          sumdataelectricitybill: this.ElectricitybillSum(arr3),
          sumCostdatawaterbill: this.WaterbillSumCount(arr3),
          sumdatacentral: this.CentralSum(arr3),
          sumdatacosts: this.CostsSum(arr3),
          sumCostdataCostCosts: this.centralSumCount(arr3),
        };
      });

      this.maintenanceAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdataMaintenance || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdataMaintenance || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdataMaintenance || 0);
      this.maintenancefeeAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdataMaintenancefree || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdataMaintenancefree || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdataMaintenancefree || 0);
      this.insuranceAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdataInsurance || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdataInsurance || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdataInsurance || 0);
      this.sumAllcount =
        parseInt(this.sumreportlistAll[0]?.sumCostdataInsurance || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumCostdataInsurance || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumCostdataInsurance || 0);
      this.waterbillAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdatawaterbill || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdatawaterbill || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdatawaterbill || 0);
      this.electricitybillAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdataelectricitybill || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdataelectricitybill || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdataelectricitybill || 0);
      this.Costdatawaterbillcount =
        parseInt(this.sumreportlistAll[0]?.sumCostdatawaterbill || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumCostdatawaterbill || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumCostdatawaterbill || 0);
      this.centralAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdatacentral || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdatacentral || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdatacentral || 0);
      this.costsAllcount =
        parseInt(this.sumreportlistAll[0]?.sumdatacosts || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumdatacosts || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumdatacosts || 0);
      this.CostCostsAllcount =
        parseInt(this.sumreportlistAll[0]?.sumCostdataCostCosts || 0) +
        parseInt(this.sumreportlistAll2[0]?.sumCostdataCostCosts || 0) +
        parseInt(this.sumreportlistAll3[0]?.sumCostdataCostCosts || 0);

      this.sumreportlistAll4 = arr4.map((x4) => {
        return {
          ...x4,
          type: "อำนวยการ",
          sumdataMaintenance: this.MaintenanceSumAll(arr4),
          sumdataMaintenancefree: this.maintenancefeeCount(arr4),
          sumdataInsurance: this.InsuranceSumAll(arr4),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr4),
          sumdatawaterbill: this.waterbillSummary(arr4),
          sumdataelectricitybill: this.ElectricitybillSum(arr4),
          sumCostdatawaterbill: this.WaterbillSumCount(arr4),
          sumdatacentral: this.CentralSum(arr4),
          sumdatacosts: this.CostsSum(arr4),
          sumCostdataCostCosts: this.centralSumCount(arr4),
        };
      });

      this.sumreportlistAll5 = arr5.map((x5) => {
        return {
          ...x5,
          type: "สนับสนุน",
          sumdataMaintenance: this.MaintenanceSumAll(arr5),
          sumdataInsurance: this.InsuranceSumAll(arr5),
          sumdataMaintenancefree: this.maintenancefeeCount(arr5),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr5),
          sumdatawaterbill: this.waterbillSummary(arr5),
          sumdataelectricitybill: this.ElectricitybillSum(arr5),
          sumCostdatawaterbill: this.WaterbillSumCount(arr5),
          sumdatacentral: this.CentralSum(arr5),
          sumdatacosts: this.CostsSum(arr5),
          sumCostdataCostCosts: this.centralSumCount(arr5),
        };
      });
      this.sumreportlistAll6 = arr6.map((x6) => {
        return {
          ...x6,
          type: "ลูกจ้าง",
          sumdataMaintenance: this.MaintenanceSumAll(arr6),
          sumdataMaintenancefree: this.maintenancefeeCount(arr6),
          sumdataInsurance: this.InsuranceSumAll(arr6),
          sumCostdataInsurance: this.SumCostSumInsuranceAll(arr6),
          sumdatawaterbill: this.waterbillSummary(arr6),
          sumdataelectricitybill: this.ElectricitybillSum(arr6),
          sumCostdatawaterbill: this.WaterbillSumCount(arr6),
          sumdatacentral: this.CentralSum(arr6),
          sumdatacosts: this.CostsSum(arr6),
          sumCostdataCostCosts: this.centralSumCount(arr6),
        };
      });

      this.maintenanceAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdataMaintenance || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdataMaintenance || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdataMaintenance || 0);
      this.maintenancefeeAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdataMaintenancefree || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdataMaintenancefree || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdataMaintenancefree || 0);
      this.insuranceAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdataInsurance || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdataInsurance || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdataInsurance || 0);
      this.sumAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumCostdataInsurance || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumCostdataInsurance || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumCostdataInsurance || 0);
      this.waterbillAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdatawaterbill || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdatawaterbill || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdatawaterbill || 0);
      this.electricitybillAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdataelectricitybill || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdataelectricitybill || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdataelectricitybill || 0);
      this.CostdatawaterbillcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumCostdatawaterbill || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumCostdatawaterbill || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumCostdatawaterbill || 0);
      this.centralAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdatacentral || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdatacentral || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdatacentral || 0);
      this.costsAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumdatacosts || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumdatacosts || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumdatacosts || 0);
      this.CostCostsAllcountTD =
        parseInt(this.sumreportlistAll4[0]?.sumCostdataCostCosts || 0) +
        parseInt(this.sumreportlistAll5[0]?.sumCostdataCostCosts || 0) +
        parseInt(this.sumreportlistAll6[0]?.sumCostdataCostCosts || 0);
    },

    async mapsumAll(data, data2, data3, data4, dataTR) {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      arr = await data.map((el, i) => {
        return {
          ...el,
          waterbillSum: this.WaterbillSum(data),
          electricitybillSum: this.ElectricitybillSum(data),
          centralSum: this.CentralSum(data),
          costsSum: this.CostsSum(data),
          InsuranceSum: this.InsuranceSum(data),
          MaintenanceSum: this.MaintenanceSumAll(data),
          accumulatedSum: this.AccumulatedSumTwo(data),
          maintenancefeeSum: this.maintenancefeeCount(data),
        };
      });

      arr2 = await data2.map((el2, i) => {
        return {
          ...el2,
          accumulated: this.countSumAccumulated(el2),
          waterbillSum: this.WaterbillSum(data2),
          maintenancefeeSum: this.maintenancefeeCount(data2),
          electricitybillSum: this.ElectricitybillSum(data2),
          centralSum: this.CentralSum(data2),
          costsSum: this.CostsSum(data2),
          InsuranceSum: this.InsuranceSum(data2),
          MaintenanceSum: this.MaintenanceSum(data2),
          accumulatedSum: this.AccumulatedSum(data2),
        };
      });

      arr3 = await data3.map((el3, i) => {
        return {
          ...el3,
          waterbillSum: this.WaterbillSum(data3),
          maintenancefeeSum: this.maintenancefeeCount(data3),
          electricitybillSum: this.ElectricitybillSum(data3),
          centralSum: this.CentralSum(data3),
          costsSum: this.CostsSum(data3),
          InsuranceSum: this.InsuranceSum(data3),
          MaintenanceSum: this.MaintenanceSum(data3),
          accumulatedSum: this.AccumulatedSum(data3),
        };
      });

      arr4 = await data4.map((el4, i) => {
        return {
          ...el4,
          waterbillSum: this.WaterbillSum(data4),
          maintenancefeeSum: this.maintenancefeeCount(data4),
          electricitybillSum: this.ElectricitybillSum(data4),
          centralSum: this.CentralSum(data4),
          costsSum: this.CostsSum(data4),
          InsuranceSum: this.InsuranceSum(data4),
          MaintenanceSum: this.MaintenanceSum(data4),
          accumulatedSum: this.AccumulatedSum(data4),
        };
      });

      arr5 = await dataTR.map((el5, i) => {
        return {
          ...el5,
          accumulated: this.countSumAccumulated(el5),
          waterbillSum: this.WaterbillSum(dataTR),
          maintenancefeeSum: this.maintenancefeeCount(dataTR),
          electricitybillSum: this.ElectricitybillSum(dataTR),
          centralSum: this.CentralSum(dataTR),
          costsSum: this.CostsSum(dataTR),
          InsuranceSum: this.InsuranceSum(dataTR),
          MaintenanceSum: this.MaintenanceSum(dataTR),
          accumulatedSum: this.AccumulatedSum(dataTR),
        };
      });

      await this.mapdataSum(arr, arr2, arr3, arr4, arr5);
    },

    checkMonth(index, installments) {
      let td = installments || 0;
      var d = new Date(index);
      var newDate = d.setMonth(d.getMonth() + parseInt(td));
      var t = new Date(newDate).toISOString();
      return this.convertDateTolocal(index, t);
    },

    convertDateTolocal(index, t) {
      if (t !== undefined && t !== "") {
        const date = new Date(t);
        const datebefore = new Date(index);
        const result = date.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          // day: 'numeric',
        });
        const resultbefore = datebefore.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          // day: 'numeric',
        });
        return resultbefore + " - " + result;
      } else {
        return "";
      }
    },

    async mapdataSum(data, data2, data3, data4, data5) {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      arr = await data.map((el) => {
        return {
          ...el,
          amountPaidSum: this.countSumAccmulated(el),
          sumCostwaterbill: this.countSumWaterbill(el),
          sumCostCentral: this.countSumcentral(el),
          sumCostCosts: this.countSumcosts(el),
          sumCostnsurance: this.countSumInsurance(el),
        };
      });
      arr2 = await data2.map((el2) => {
        return {
          ...el2,
          // amountPaidSum: this.countSumAccmulated(el2),
          sumCostwaterbill: this.countSumWaterbill(el2),
          sumCostCentral: this.countSumcentral(el2),
          sumCostCosts: this.countSumcosts(el2),
          sumCostnsurance: this.countSumInsurance(el2),
        };
      });
      arr3 = await data3.map((el3) => {
        return {
          ...el3,
          // amountPaidSum: this.countSumAccmulated(el3),
          sumCostwaterbill: this.countSumWaterbill(el3),
          sumCostCentral: this.countSumcentral(el3),
          sumCostCosts: this.countSumcosts(el3),
          sumCostnsurance: this.countSumInsurance(el3),
        };
      });
      arr4 = await data4.map((el4) => {
        return {
          ...el4,
          // amountPaidSum: this.countSumAccmulated(el4),
          sumCostwaterbill: this.countSumWaterbill(el4),
          sumCostCentral: this.countSumcentral(el4),
          sumCostCosts: this.countSumcosts(el4),
          sumCostnsurance: this.countSumInsurance(el4),
        };
      });
      arr5 = await data5.map((el5) => {
        return {
          ...el5,
          amountPaidSum: this.countSumAccmulated(el5),
          sumCostwaterbill: this.countSumWaterbill(el5),
          sumCostCentral: this.countSumcentral(el5),
          sumCostCosts: this.countSumcosts(el5),
          sumCostnsurance: this.countSumInsurance(el5),
        };
      });
      this.mapdataSumTable(arr, arr2, arr3, arr4, arr5);
    },

    async mapdataSumTable(data, data2, data3, data4, data5) {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      this.datalistCTD = [];
      this.datalistTD = [];
      arr = await data.map((el) => {
        return {
          ...el,
          SumCostSumInsurance: this.SumCostSumInsurance(data),
          SumCostSumCentral: this.SumCostSumCentral(data),
          SumCostSumwater: this.SumCostSumwater(data),
          SumCostSumCosts: this.SumCostSumCosts(data),
        };
      });
      arr2 = await data2.map((el2) => {
        return {
          ...el2,
          SumCostSumInsurance: this.SumCostSumInsurance(data2),
          SumCostSumCentral: this.SumCostSumCentral(data2),
          SumCostSumwater: this.SumCostSumwater(data2),
          SumCostSumCosts: this.SumCostSumCosts(data2),
        };
      });

      arr3 = await data3.map((el3) => {
        return {
          ...el3,
          SumCostSumInsurance: this.SumCostSumInsurance(data3),
          SumCostSumCentral: this.SumCostSumCentral(data3),
          SumCostSumwater: this.SumCostSumwater(data3),
          SumCostSumCosts: this.SumCostSumCosts(data3),
        };
      });
      arr4 = await data4.map((el4) => {
        return {
          ...el4,
          SumCostSumInsurance: this.SumCostSumInsurance(data4),
          SumCostSumCentral: this.SumCostSumCentral(data4),
          SumCostSumwater: this.SumCostSumwater(data4),
          SumCostSumCosts: this.SumCostSumCosts(data4),
        };
      });
      arr5 = await data5.map((el5) => {
        return {
          ...el5,
          SumCostSumInsurance: this.SumCostSumInsurance(data5),
          SumCostSumCentral: this.SumCostSumCentral(data5),
          SumCostSumwater: this.SumCostSumwater(data5),
          SumCostSumCosts: this.SumCostSumCosts(data5),
        };
      });
      this.datalistCTD = arr;
      this.datalistTD = arr2;
      // .filter(ee3 => ee3.amountPaid != ee3.insurance)
      // let tt = arr.filter(ee3 => ee3.amountPaid != ee3.insurance)
      // let tt2 = arr2.filter(ee4 => ee4.amountPaid != ee4.insurance)
      // let tt3 = arr5.filter(ee5 => ee5.amountPaid != ee5.insurance)
      this.filterAffiliation(arr2);
      this.filterAffiliation2(arr);
      this.filterAffiliationTR(arr5);
      this.mapDataComma(arr, arr2, arr3, arr4, arr5);
    },

    async mapDataComma(data, data2, data3, data4, data5) {
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let arr7 = [];
      this.reportlistCTD = [];
      this.reportlistTD = [];
      this.reportlistTR = [];
      this.deductibleCTD = [];
      this.deductibleTD = [];
      arr3 = await data.map((el2) => {
        return {
          ...el2,
          SumCostSumInsurance: this.numberWithCommas(el2.SumCostSumInsurance) || 0,
          SumCostSumCentral: this.numberWithCommas(el2.SumCostSumCentral) || 0,
          SumCostSumwater: this.numberWithCommas(el2.SumCostSumwater) || 0,
          SumCostSumCosts: this.numberWithCommas(el2.SumCostSumCosts) || 0,
          sumCostwaterbill: this.numberWithCommas(el2.sumCostwaterbill) || 0,
          sumCostCentral: this.numberWithCommas(el2.sumCostCentral) || 0,
          sumCostCosts: this.numberWithCommas(el2.sumCostCosts) || 0,
          sumCostnsurance: this.numberWithCommas(el2.sumCostnsurance) || 0,
          central: this.numberWithCommas(el2.central) || 0,
          costs: this.numberWithCommas(el2.costs) || 0,
          amountPaidSum: this.numberWithCommas(el2.amountPaidSum) || 0,
          waterbillSum: this.numberWithCommas(el2.waterbillSum) || 0,
          electricitybillSum: this.numberWithCommas(el2.electricitybillSum) || 0,
          maintenance: this.numberWithCommas(el2.maintenance) || 0,
          insurance: this.numberWithCommas(el2.insurance) || 0,
          centralSum: this.numberWithCommas(el2.centralSum) || 0,
          costsSum: this.numberWithCommas(el2.costsSum) || 0,
          InsuranceSum: this.numberWithCommas(el2.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el2.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el2.accumulatedSum) || 0,
          maintenancefee: this.numberWithCommas(el2.maintenancefee) || 0,
          maintenancefeeSum: this.numberWithCommas(el2.maintenancefeeSum) || 0,
          waterbill: this.numberWithCommas(el2.waterbill) || 0,
          electricitybill: this.numberWithCommas(el2.electricitybill) || 0,
          contelectricitybillSum:
            parseInt(el2.electricitybillSum) + parseInt(el2.costsSum) || 0,
        };
      });
      arr4 = await data2.map((el3) => {
        return {
          ...el3,
          SumCostSumInsurance: this.numberWithCommas(el3.SumCostSumInsurance) || 0,
          SumCostSumCentral: this.numberWithCommas(el3.SumCostSumCentral) || 0,
          SumCostSumwater: this.numberWithCommas(el3.SumCostSumwater) || 0,
          SumCostSumCosts: this.numberWithCommas(el3.SumCostSumCosts) || 0,
          sumCostwaterbill: this.numberWithCommas(el3.sumCostwaterbill) || 0,
          sumCostCentral: this.numberWithCommas(el3.sumCostCentral) || 0,
          sumCostCosts: this.numberWithCommas(el3.sumCostCosts) || 0,
          sumCostnsurance: this.numberWithCommas(el3.sumCostnsurance) || 0,
          central: this.numberWithCommas(el3.central) || 0,
          costs: this.numberWithCommas(el3.costs) || 0,
          insurance: this.numberWithCommas(el3.insurance) || 0,
          waterbillSum: this.numberWithCommas(el3.waterbillSum) || 0,
          electricitybillSum: this.numberWithCommas(el3.electricitybillSum) || 0,
          maintenance: this.numberWithCommas(el3.maintenance) || 0,
          centralSum: this.numberWithCommas(el3.centralSum) || 0,
          costsSum: this.numberWithCommas(el3.costsSum) || 0,
          InsuranceSum: this.numberWithCommas(el3.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el3.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el3.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(el3.waterbill) || 0,
          maintenancefee: this.numberWithCommas(el3.maintenancefee) || 0,
          maintenancefeeSum: this.numberWithCommas(el3.maintenancefeeSum) || 0,
          electricitybill: this.numberWithCommas(el3.electricitybill) || 0,
          contelectricitybillSum:
            parseInt(el3.electricitybillSum) + parseInt(el3.costsSum) || 0,
        };
      });

      arr5 = await data3.map((ele) => {
        return {
          ...ele,
          SumCostSumInsurance: this.numberWithCommas(ele.SumCostSumInsurance) || 0,
          SumCostSumCentral: this.numberWithCommas(ele.SumCostSumCentral) || 0,
          SumCostSumwater: this.numberWithCommas(ele.SumCostSumwater) || 0,
          SumCostSumCosts: this.numberWithCommas(ele.SumCostSumCosts) || 0,
          sumCostwaterbill: this.numberWithCommas(ele.sumCostwaterbill) || 0,
          sumCostCentral: this.numberWithCommas(ele.sumCostCentral) || 0,
          sumCostCosts: this.numberWithCommas(ele.sumCostCosts) || 0,
          sumCostnsurance: this.numberWithCommas(ele.sumCostnsurance) || 0,
          central: this.numberWithCommas(ele.central) || 0,
          costs: this.numberWithCommas(ele.costs) || 0,
          insurance: this.numberWithCommas(ele.insurance) || 0,
          waterbillSum: this.numberWithCommas(ele.waterbillSum) || 0,
          electricitybillSum: this.numberWithCommas(ele.electricitybillSum) || 0,
          maintenance: this.numberWithCommas(ele.maintenance) || 0,
          centralSum: this.numberWithCommas(ele.centralSum) || 0,
          costsSum: this.numberWithCommas(ele.costsSum) || 0,
          InsuranceSum: this.numberWithCommas(ele.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(ele.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(ele.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(ele.waterbill) || 0,
          maintenancefee: this.numberWithCommas(ele.maintenancefee) || 0,
          maintenancefeeSum: this.numberWithCommas(ele.maintenancefeeSum) || 0,
          electricitybill: this.numberWithCommas(ele.electricitybill) || 0,
          contelectricitybillSum:
            parseInt(ele.electricitybillSum) + parseInt(ele.costsSum) || 0,
        };
      });

      arr6 = await data4.map((el4) => {
        return {
          ...el4,
          SumCostSumInsurance: this.numberWithCommas(el4.SumCostSumInsurance) || 0,
          SumCostSumCentral: this.numberWithCommas(el4.SumCostSumCentral) || 0,
          SumCostSumwater: this.numberWithCommas(el4.SumCostSumwater) || 0,
          SumCostSumCosts: this.numberWithCommas(el4.SumCostSumCosts) || 0,
          sumCostwaterbill: this.numberWithCommas(el4.sumCostwaterbill) || 0,
          sumCostCentral: this.numberWithCommas(el4.sumCostCentral) || 0,
          sumCostCosts: this.numberWithCommas(el4.sumCostCosts) || 0,
          sumCostnsurance: this.numberWithCommas(el4.sumCostnsurance) || 0,
          central: this.numberWithCommas(el4.central) || 0,
          costs: this.numberWithCommas(el4.costs) || 0,
          insurance: this.numberWithCommas(el4.insurance) || 0,
          waterbillSum: this.numberWithCommas(el4.waterbillSum) || 0,
          electricitybillSum: this.numberWithCommas(el4.electricitybillSum) || 0,
          maintenance: this.numberWithCommas(el4.maintenance) || 0,
          centralSum: this.numberWithCommas(el4.centralSum) || 0,
          costsSum: this.numberWithCommas(el4.costsSum) || 0,
          InsuranceSum: this.numberWithCommas(el4.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el4.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el4.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(el4.waterbill) || 0,
          maintenancefee: this.numberWithCommas(el4.maintenancefee) || 0,
          maintenancefeeSum: this.numberWithCommas(el4.maintenancefeeSum) || 0,
          electricitybill: this.numberWithCommas(el4.electricitybill) || 0,
          contelectricitybillSum:
            parseInt(el4.electricitybillSum) + parseInt(el4.costsSum) || 0,
        };
      });
      arr7 = await data5.map((el5) => {
        return {
          ...el5,
          SumCostSumInsurance: this.numberWithCommas(el5.SumCostSumInsurance) || 0,
          SumCostSumCentral: this.numberWithCommas(el5.SumCostSumCentral) || 0,
          SumCostSumwater: this.numberWithCommas(el5.SumCostSumwater) || 0,
          SumCostSumCosts: this.numberWithCommas(el5.SumCostSumCosts) || 0,
          sumCostwaterbill: this.numberWithCommas(el5.sumCostwaterbill) || 0,
          sumCostCentral: this.numberWithCommas(el5.sumCostCentral) || 0,
          sumCostCosts: this.numberWithCommas(el5.sumCostCosts) || 0,
          sumCostnsurance: this.numberWithCommas(el5.sumCostnsurance) || 0,
          central: this.numberWithCommas(el5.central) || 0,
          costs: this.numberWithCommas(el5.costs) || 0,
          insurance: this.numberWithCommas(el5.insurance) || 0,
          waterbillSum: this.numberWithCommas(el5.waterbillSum) || 0,
          electricitybillSum: this.numberWithCommas(el5.electricitybillSum) || 0,
          maintenance: this.numberWithCommas(el5.maintenance) || 0,
          centralSum: this.numberWithCommas(el5.centralSum) || 0,
          costsSum: this.numberWithCommas(el5.costsSum) || 0,
          InsuranceSum: this.numberWithCommas(el5.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el5.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el5.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(el5.waterbill) || 0,
          maintenancefee: this.numberWithCommas(el5.maintenancefee) || 0,
          maintenancefeeSum: this.numberWithCommas(el5.maintenancefeeSum) || 0,
          electricitybill: this.numberWithCommas(el5.electricitybill) || 0,
          contelectricitybillSum:
            parseInt(el5.electricitybillSum) + parseInt(el5.costsSum) || 0,
        };
      });
      this.mapTypeContact(arr3, arr4, arr5, arr6, arr7);
    },

    mapTypeContact(data, data2, data3, data4, data5) {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      arr1 = data.map((a) => {
        if (a.typeContract == "หักได้") {
          a["typeContractYes"] = "/";
          a["typeContractNo"] = "-";
        } else if (a.typeContract == "หักไม่ได้") {
          a["typeContractNo"] = "/";
          a["typeContractYes"] = "-";
        } else {
          a["typeContractYes"] = "-";
          a["typeContractNo"] = "-";
        }
        return a;
      });
      arr2 = data2.map((a2) => {
        if (a2.typeContract == "หักได้") {
          a2["typeContractYes"] = "/";
          a2["typeContractNo"] = "-";
        } else if (a2.typeContract == "หักไม่ได้") {
          a2["typeContractNo"] = "/";
          a2["typeContractYes"] = "-";
        } else {
          a2["typeContractYes"] = "-";
          a2["typeContractNo"] = "-";
        }
        return a2;
      });
      arr3 = data3.map((a3) => {
        if (a3.typeContract == "หักได้") {
          a3["typeContractYes"] = "/";
          a3["typeContractNo"] = "-";
        } else if (a3.typeContract == "หักไม่ได้") {
          a3["typeContractNo"] = "/";
          a3["typeContractYes"] = "-";
        } else {
          a3["typeContractYes"] = "-";
          a3["typeContractNo"] = "-";
        }
        return a3;
      });
      arr4 = data4.map((a4) => {
        if (a4.typeContract == "หักได้") {
          a4["typeContractYes"] = "/";
          a4["typeContractNo"] = "-";
        } else if (a4.typeContract == "หักไม่ได้") {
          a4["typeContractNo"] = "/";
          a4["typeContractYes"] = "-";
        } else {
          a4["typeContractYes"] = "-";
          a4["typeContractNo"] = "-";
        }
        return a4;
      });

      arr5 = data5.map((a5) => {
        if (a5.typeContract == "หักได้") {
          a5["typeContractYes"] = "/";
          a5["typeContractNo"] = "-";
        } else if (a5.typeContract == "หักไม่ได้") {
          a5["typeContractNo"] = "/";
          a5["typeContractYes"] = "-";
        } else {
          a5["typeContractYes"] = "-";
          a5["typeContractNo"] = "-";
        }
        return a5;
      });

      this.reportlistCTD = arr1.sort((a, b) => a.rankNumber - b.rankNumber);
      this.reportlistTD = arr2.sort((a, b) => a.rankNumber - b.rankNumber);
      this.reportlistTR = arr5.sort((a, b) => a.rankNumber - b.rankNumber);
      this.deductibleTD = arr3.sort((a, b) => a.rankNumber - b.rankNumber);
      this.deductibleCTD = arr4.sort((a, b) => a.rankNumber - b.rankNumber);
    },
    // numberWithCommas

    ExportExcel(type, tableId, fn, dl) {
      var elt = document.getElementById(tableId);
      var wb = XLSX.utils.table_to_book(elt, { sheet: "DRE" });
      return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(wb, fn || "ExportFile." + (type || "xlsx"));
    },

    async ExportData() {
      let arr = this.reportlistok.filter((e) => e.accumulated !== e.insurance);
      let arr2 = this.reportListssn.filter((e2) => e2.accumulated !== e2.insurance);
      let arr3 = this.reportlistlj.filter((e3) => e3.accumulated !== e3.insurance);

      arr.sort((a, b) => a.affiliationNo - b.affiliationNo);
      arr2.sort((a, b) => a.affiliationNo - b.affiliationNo);
      arr3.sort((a, b) => a.affiliationNo - b.affiliationNo);

      let arrA = arr.filter((e) => e.typeUser == 'บช.ตชด.');
      let arrA2 = arr.filter((e2) => e2.typeUser == 'ตร.');
      let arrB = arr2.filter((e) => e.typeUser == 'บช.ตชด.');
      let arrB2 = arr2.filter((e2) => e2.typeUser == 'ตร.');
      let arrC = arr3.filter((e) => e.typeUser == 'บช.ตชด.');
      let arrC2 = arr3.filter((e2) => e2.typeUser == 'ตร.');

      let A1 = arrA2.concat(arrA)
      let A2 = arrB2.concat(arrB)
      let A3 = arrC2.concat(arrC)
    
      var ws_data = [
        [
          "รายละเอียดการหักเงิน  ค่าบำรุงฯ ,ค่าประกันฯ , ผู้ได้สิทธิพักอาศัยบ้านพัก บช.ตชด.",
        ],
        ["และค่าสาธารณูปโภค  ผู้ได้สิทธิพักอาศัยบ้านพักส่วนกลาง ตร.  (อก.)"],
        [` ประจําเดือน ${this.monthYearNow} `],
      ];
      let aa,
        aa2,
        aa3,
        aa4,
        aa5 = [];
      let count = this.OGCount(A1);
      let sum1
      await A1.forEach((e, i) => {
        if(e.typeUser == 'บช.ตชด.'){
          sum1 = this.countSuminstallments(e)
        }else if(e.typeUser == 'ตร.'){
          sum1 = this.countSuminstallmentsTD(e)
        }
        ws_data.push([
          i + 1,
          e.idcard,
          e.firstName + " " + e.lastName,
          ,
          "41001",
          sum1,
        ]);
      });
      aa = [" ", " ", "รวม", " " , " " ,this.numberWithCommas(count)];
      aa2 = [" ", " ", "ตรวจแล้วถูกต้อง", " "];
      aa3 = ["ร.ต.อ.หญิง", " ", "", " "];
      aa4 = [" ", " ", "( พิมพลอย ตั้งสิริสงวน )", " "];
      aa5 = [" ", " ", "รอง สว.ฝสสน.๑ บก.สสน.บช.ตชด.", " "];
      ws_data.push(aa, aa2, aa3, aa4, aa5);
      var ws = XLSX.utils.aoa_to_sheet(ws_data);

      var ws_data2 = [
        [
          "รายละเอียดการหักเงิน  ค่าบำรุงฯ ,ค่าประกันฯ , ผู้ได้สิทธิพักอาศัยบ้านพัก บช.ตชด. ",
        ],
        ["และค่าสาธารณูปโภค  ผู้ได้สิทธิพักอาศัยบ้านพักส่วนกลาง ตร.  (สสน.)"],
        [` ประจําเดือน ${this.monthYearNow} `],
      ];
      let bb,
        bb2,
        bb3,
        bb4,
        bb5 = [];
      let count2 = this.OGCount(A2);
      let sum2
      await A2.forEach((el, i) => {
        if(el.typeUser == 'บช.ตชด.'){
          sum2 = this.countSuminstallments(el)
        }else if(el.typeUser == 'ตร.'){
          sum2 = this.countSuminstallmentsTD(el)
        }
        ws_data2.push([
          i + 1,
          el.idcard,
          el.firstName + " " + el.lastName,
          "41001",
          sum2,
        ]);
      });
      bb = [" ", " ", "รวม"," ", this.numberWithCommas(count2)];
      bb2 = [" ", " ", "ตรวจแล้วถูกต้อง", " "];
      bb3 = ["ร.ต.อ.หญิง", " ", "", " "];
      bb4 = [" ", " ", "( พิมพลอย ตั้งสิริสงวน )", " "];
      bb5 = [" ", " ", "รอง สว.ฝสสน.๑ บก.สสน.บช.ตชด.", " "];
      ws_data2.push(bb, bb2, bb3, bb4, bb5);
      var ws2 = XLSX.utils.aoa_to_sheet(ws_data2);

      var ws_data3 = [
        [
          "รายละเอียดการหักเงิน  ค่าบำรุงฯ ,ค่าประกันฯ , ผู้ได้สิทธิพักอาศัยบ้านพัก บช.ตชด. ",
        ],
        ["และค่าสาธารณูปโภค  ผู้ได้สิทธิพักอาศัยบ้านพักส่วนกลาง ตร.  (ลูกจ้าง)"],
        [` ประจําเดือน ${this.monthYearNow} `],
      ];
      let cc,
        cc2,
        cc3,
        cc4,
        cc5 = [];
      let count3 = this.OGCount(A3);
      let sum
      await A3.forEach((el2, i) => {
        if(el2.typeUser == 'บช.ตชด.'){
          sum = this.countSuminstallments(el2)
        }else if(el2.typeUser == 'ตร.'){
          sum = this.countSuminstallmentsTD(el2)
        }
        ws_data3.push([
          i + 1,
          el2.idcard,
          el2.firstName + " " + el2.lastName,
          ,
          "41001",
          sum
        ]);
      });
      cc = [" ", " ", "รวม.", " " , " ", this.numberWithCommas(count3)];
      cc2 = [" ", " ", "ตรวจแล้วถูกต้อง", " "];
      cc3 = ["ร.ต.อ.หญิง", " ", "", " "];
      cc4 = [" ", " ", "( พิมพลอย ตั้งสิริสงวน )", " "];
      cc5 = [" ", " ", "รอง สว.ฝสสน.๑ บก.สสน.บช.ตชด.", " "];
      ws_data3.push(cc, cc2, cc3, cc4, cc5);
      var ws3 = XLSX.utils.aoa_to_sheet(ws_data3);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "อก");
      XLSX.utils.book_append_sheet(wb, ws2, "สสน");
      XLSX.utils.book_append_sheet(wb, ws3, "ลูกจ้าง");
      XLSX.writeFile(wb, "report.xlsx");
    },

    countSumWaterbill(item) {
      return (
        parseInt(item.maintenancefee || 0) +
          parseInt(item.waterbill || 0) +
          parseInt(item.electricitybill || 0) || 0
      );
    },

    countSuminstallments(item) {
      let mapnum, mapnum2;
      if (item.accumulated == "-" || item.accumulated == undefined) mapnum = 0;
      else mapnum = item.accumulated;
      if (item.maintenance == "-" || item.maintenance == undefined) mapnum2 = 0;
      else mapnum2 = item.maintenance;
      let summery = parseInt(mapnum) + parseInt(mapnum2) || 0;
      return this.numberWithCommas(summery);
    },

    countSuminstallmentsTD(item) {
      let mapnum;
      mapnum = this.countAllbill(item)
      let summery = mapnum || 0;
      return this.numberWithCommas(summery);
    },

    countAllbill(item) {
      return (
        parseInt(item.maintenancefee) +
          parseInt(item.waterbill) +
          parseInt(item.costs)+
          parseInt(item.electricitybill)+
          parseInt(item.central) || 0
      );
    },

    countSumcentral(item) {
      return (
        parseInt(item.maintenancefee) +
          parseInt(item.waterbill) +
          parseInt(item.central) || 0
      );
    },

    countSumcosts(item) {
      return parseInt(item.central) + parseInt(item.costs) || 0;
    },

    WaterbillSum(items) {
      return items.reduce((waterbillSum, ele) => {
        if (ele.waterbill !== undefined)
          return waterbillSum + parseInt(ele.waterbill || 0);
        else return waterbillSum;
      }, 0);
    },

    WaterbillSumCount(items) {
      return items.reduce((WaterbillSumCount, ele) => {
        if (
          ele.maintenancefee !== undefined &&
          ele.waterbill !== undefined &&
          ele.electricitybill !== undefined
        )
          return (
            WaterbillSumCount +
            (parseInt(ele.maintenancefee) +
              parseInt(ele.electricitybill) +
              parseInt(ele.waterbill))
          );
        else return WaterbillSumCount;
      }, 0);
    },

    centralSumCount(items) {
      return items.reduce((centralSumCount, ele) => {
        if (ele.central !== undefined && ele.costs !== undefined)
          return centralSumCount + (parseInt(ele.central) + parseInt(ele.costs));
        else return centralSumCount;
      }, 0);
    },

    countSumInsurance(item) {
      return parseInt(item.maintenance || 0) + parseInt(item.insurance) || 0;
    },

    countSumAccmulated(item) {
      let ss = parseInt(item.MaintenanceSum || 0) + parseInt(item.accumulatedSum || 0);
      return ss;
    },

    OGCount(items) {
      let mapnum, mapnum2, mapnum3, mapnum4,mapnum5, mapnum6,mapnum7 ;
      return items.reduce((insuranceSum, ele) => {
        if (ele.accumulated == "-" || ele.accumulated == undefined) mapnum = 0;
        else mapnum = ele.accumulated;
        if (ele.maintenance == "-" || ele.maintenance == undefined) mapnum2 = 0;
        else mapnum2 = ele.maintenance;
        if (ele.maintenancefee == "-" || ele.maintenancefee == undefined) mapnum3 = 0;
        else mapnum3 = ele.maintenancefee;
        if (ele.waterbill == "-" || ele.waterbill == undefined) mapnum4 = 0;
        else mapnum4 = ele.waterbill;
        if (ele.costs == "-" || ele.costs == undefined) mapnum5 = 0;
        else mapnum5 = ele.costs;
        if (ele.electricitybill == "-" || ele.electricitybill == undefined) mapnum6 = 0;
        else mapnum6 = ele.electricitybill;
        if (ele.central == "-" || ele.central == undefined) mapnum7 = 0;
        else mapnum7 = ele.central;
        let c = parseInt(mapnum) + parseInt(mapnum2) + parseInt(mapnum3) + parseInt(mapnum4) + parseInt(mapnum5) + parseInt(mapnum6) + parseInt(mapnum7);
          return insuranceSum + c;
      }, 0);
    },
   
    // insuranceCount(items) {
    //   return items.reduce((insuranceSum, ele) => {
    //     if (ele.insurance !== undefined) return amountPaidSum + parseInt(ele.insurance);
    //     else return insuranceSum;
    //   }, 0);
    // },

    CentralSumallCount(items) {
      return items.reduce((CentralSumallCount, ele) => {
        if (ele.insurance !== undefined)
          return CentralSumallCount + (parseInt(ele.central) + parseInt(ele.costs));
        else return CentralSumallCount;
      }, 0);
    },

    maintenancefeeCount(items) {
      return items.reduce((maintenancefeeSum, ele) => {
        if (ele.maintenancefee !== undefined)
          return maintenancefeeSum + parseInt(ele.maintenancefee || 0);
        else return maintenancefeeSum;
      }, 0);
    },

    insuranceCount(items) {
      return items.reduce((insuranceSum, ele) => {
        if (ele.insurance !== undefined) return insuranceSum + parseInt(ele.insurance);
        else return insuranceSum;
      }, 0);
    },

    AmountPaidSums(items) {
      return items.reduce((amountPaidSum, ele) => {
        if (ele.amountPaid !== undefined) return amountPaidSum + parseInt(ele.amountPaid);
        else return amountPaidSum;
      }, 0);
    },

    countSumAccumulated(item) {
      if (parseInt(item.installments) != 0) {
        return parseInt(item.insurance) / parseInt(item.installments) || 0;
      } else {
        return parseInt(item.insurance) || 0;
      }
    },

    AccumulatedSum(items) {
      return items.reduce((accumulatedSum, ele) => {
        if (
          ele.insurance !== undefined &&
          ele.installments !== undefined &&
          ele.installments !== " " &&
          ele.installments !== ""
        ) {
          if (parseInt(ele.installments) !== 0) {
            return (
              accumulatedSum +
              (parseInt(ele.insurance) || 0) / (parseInt(ele.installments) || 0)
            );
          } else {
            return accumulatedSum + parseInt(ele.insurance || 0);
          }
        }
        return accumulatedSum;
      }, 0);
    },

    AccumulatedSumTwo(items) {
      return items.reduce((accumulatedSum, ele) => {
        let mapnum;
        if (ele.accumulated == "-") mapnum = 0;
        else mapnum = ele.accumulated;
        if (ele.accumulated !== undefined) {
          return accumulatedSum + (parseInt(mapnum) || 0);
        } else {
          return accumulatedSum || 0;
        }
      }, 0);
    },

    ElectricitybillSum(items) {
      return items.reduce((electricitybillSum, ele) => {
        if (ele.electricitybill !== undefined)
          return electricitybillSum + parseInt(ele.electricitybill);
        else return electricitybillSum;
      }, 0);
    },

    waterbillSummary(items) {
      return items.reduce((waterbillSummary, ele) => {
        if (ele.waterbill !== undefined)
          return waterbillSummary + parseInt(ele.waterbill);
        else return waterbillSummary;
      }, 0);
    },

    SumCostSumMaintenancefee(items) {
      return items.reduce((SumCostSumMaintenancefee, ele) => {
        if (ele.sumCostmaintenancefee !== undefined)
          return SumCostSumMaintenancefee + parseInt(ele.sumCostmaintenancefee);
        else return SumCostSumMaintenancefee;
      }, 0);
    },

    SumCostSumCosts(items) {
      return items.reduce((SumCostSumCosts, ele) => {
        if (ele.sumCostCosts !== undefined)
          return SumCostSumCosts + parseInt(ele.sumCostCosts);
        else return sumCostSum;
      }, 0);
    },
    SumCostSumwater(items) {
      return items.reduce((SumCostSumwater, ele) => {
        if (ele.sumCostwaterbill !== undefined)
          return SumCostSumwater + parseInt(ele.sumCostwaterbill);
        else return SumCostSumwater;
      }, 0);
    },

    SumCostSumCentral(items) {
      return items.reduce((SumCostSumCentral, ele) => {
        if (ele.sumCostCentral !== undefined)
          return SumCostSumCentral + parseInt(ele.sumCostCentral);
        else return SumCostSumCentral;
      }, 0);
    },

    SumCostSumInsurance(items) {
      return items.reduce((SumCostSumInsurance, ele) => {
        if (ele.sumCostnsurance !== undefined)
          return SumCostSumInsurance + parseInt(ele.sumCostnsurance);
        else return SumCostSumInsurance;
      }, 0);
    },

    waterCostSum(items) {
      return items.reduce((waterCostSum, ele) => {
        if (ele.central !== undefined)
          return waterCostSum + parseInt(ele.maintenancefeeAllcount);
        else return waterCostSum;
      }, 0);
    },

    CentralSum(items) {
      return items.reduce((centralSum, ele) => {
        if (ele.central !== undefined) return centralSum + parseInt(ele.central || 0);
        else return centralSum;
      }, 0);
    },
    CostsSum(items) {
      return items.reduce((costsSum, ele) => {
        if (ele.costs !== undefined) return costsSum + parseInt(ele.costs);
        else return costsSum;
      }, 0);
    },
    InsuranceSum(items) {
      return items.reduce((InsuranceSum, ele) => {
        if (ele.insurance !== undefined) return InsuranceSum + parseInt(ele.insurance);
        else return InsuranceSum;
      }, 0);
    },

    MaintenanceSum(items) {
      return items.reduce((MaintenanceSum, ele) => {
        let mapnum;
        if (ele.maintenance == "-") mapnum = 0;
        else mapnum = ele.maintenance;
        if (mapnum !== undefined) return MaintenanceSum + parseInt(mapnum);
        else return MaintenanceSum;
      }, 0);
    },

    thaiNumber(num, index) {
      let convertNumber;
      if (index !== "year") {
        convertNumber = this.numberWithCommas(num);
      } else {
        convertNumber = num;
      }
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
      var str = convertNumber.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }

      return str;
    },

    thaiNumberNew(num) {
      let convertNumber;
      convertNumber = num;
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
      var str = convertNumber.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }

      return str;
    },

    numberWithCommas(x) {
      // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    Previous() {
      window.history.back();
    },

    mapnumberZero(e) {
      if (e == 0) {
        return "-";
      } else {
        return e;
      }
    },

    async exportPdfsummary() {
      let sum =
        this.sumAllcount + this.CostdatawaterbillcountTD + this.CostCostsAllcountTD;
      pdfMake.fonts = {
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
        THSarabunNew: {
          normal: "THSarabunNew.ttf",
          bold: "THSarabunNew-Bold.ttf",
          italics: "THSarabunNew-Italic.ttf",
          bolditalics: "THSarabunNew-BoldItalic.ttf",
        },
      };

      const docDefinition = {
        content: [
          {
            text: "ยอดเงินค่าบํารุงฯ, ค่าประกันฯ อาคารบ้านพักอิสระ บช.ตชด.",
            style: "header",
            alignment: "center",
          },
          {
            text: `ประจําเดือน ${this.monthYearNow} `,
            style: "header",
            alignment: "center",
          },
          {
            style: "tableExample",
            table: {
              widths: [200, "*", "*", "*"],
              body: [
                [
                  { text: "หน่วยงาน", style: "header", alignment: "center" },
                  { text: "ค่าบํารุงฯ", style: "header", alignment: "center" },
                  { text: "ค่าประกันฯ", style: "header", alignment: "center" },
                  { text: "รวม", style: "header", alignment: "center" },
                ],
                [
                  { text: "อำนวยการ", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll[0]?.sumdataMaintenance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll[0]?.sumdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll[0]?.sumCostdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "สนับสนุน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll2[0]?.sumdataMaintenance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll2[0]?.sumdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll2[0]?.sumCostdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "ลูกจ้าง", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll3[0]?.sumdataMaintenance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll3[0]?.sumdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll3[0]?.sumCostdataInsurance || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "รวมเงิน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.maintenanceAllcount || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.insuranceAllcount || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.sumAllcount || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "", colSpan: 2, style: "subheader", alignment: "center" },
                  "",
                  {
                    text: "ยอดรวม",
                    style: "header",
                    alignment: "center",
                  },
                  {
                    text: this.thaiNumber(this.sumAllcount || 0),
                    style: "header",
                    alignment: "center",
                  },
                ],
              ],
            },
          },
          {
            text: "ยอดเงินค่าธรรมเนียม และค่าสาธารณูปโภค อาคารบ้านพัก ตร.ส่วนกลาง",
            style: "header",
            alignment: "center",
          },
          {
            text: `ประจําเดือน ${this.monthYear} `,
            style: "header",
            alignment: "center",
          },
          {
            style: "tableExample",
            table: {
              widths: [100, "*", "*", "*", "*"],
              body: [
                [
                  { text: "หน่วยงาน", style: "header", alignment: "center" },
                  { text: "ค่าธรรมเนียม", style: "header", alignment: "center" },
                  { text: "ค่าน้ำปะปา", style: "header", alignment: "center" },
                  { text: "ค่าไฟฟ้า", style: "header", alignment: "center" },
                  { text: "รวม", style: "header", alignment: "center" },
                ],
                [
                  { text: "อำนวยการ", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll4[0]?.sumdataMaintenancefree || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll4[0]?.sumdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll4[0]?.sumdataelectricitybill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll4[0]?.sumCostdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "สนับสนุน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll5[0]?.sumdataMaintenancefree || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll5[0]?.sumdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll5[0]?.sumdataelectricitybill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll5[0]?.sumCostdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "ลูกจ้าง", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll6[0]?.sumdataMaintenancefree || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll6[0]?.sumCostdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll6[0]?.sumdataelectricitybill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll6[0]?.sumCostdatawaterbill || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "รวมเงิน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.maintenancefeeAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.waterbillAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.electricitybillAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.CostdatawaterbillcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "", colSpan: 3, style: "subheader", alignment: "center" },
                  "",
                  "",
                  {
                    text: "ยอดรวม",
                    style: "header",
                    alignment: "center",
                  },
                  {
                    text: this.thaiNumber(this.CostdatawaterbillcountTD || 0),
                    style: "header",
                    alignment: "center",
                  },
                ],
              ],
            },
          },
          {
            text:
              "รายการหักเพิ่มเติม ค่าไฟฟ้าส่วนกลาง/ค่าบํารุงลิฟต์อาคารบ้านพัก ตร.ส่วนกลาง",
            style: "header",
            alignment: "center",
          },
          {
            text: `ประจําเดือน ${this.monthYear} `,
            style: "header",
            alignment: "center",
          },
          {
            style: "tableExample",
            table: {
              widths: [200, "*", "*", "*"],
              body: [
                [
                  { text: "หน่วยงาน", style: "header", alignment: "center" },
                  {
                    text: "ค่าบํารุงฯ",
                    style: "header",
                    alignment: "center",
                  },
                  {
                    text: "ค่าประกันฯ",
                    style: "header",
                    alignment: "center",
                  },
                  { text: "รวม", style: "header", alignment: "center" },
                ],
                [
                  { text: "อำนวยการ", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.sumreportlistAll4[0]?.sumdatacentral || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.sumreportlistAll4[0]?.sumdatacosts || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll4[0]?.sumCostdataCostCosts || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "สนับสนุน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.sumreportlistAll5[0]?.sumdatacentral || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.sumreportlistAll5[0]?.sumdatacosts || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll5[0]?.sumCostdataCostCosts || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "ลูกจ้าง", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.sumreportlistAll6[0]?.sumdatacentral || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.sumreportlistAll6[0]?.sumdatacosts || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(
                      this.sumreportlistAll6[0]?.sumCostdataCostCosts || 0
                    ),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "รวมเงิน", style: "header", alignment: "center" },
                  {
                    text: this.thaiNumber(this.centralAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.costsAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                  {
                    text: this.thaiNumber(this.CostCostsAllcountTD || 0),
                    style: "subheader",
                    alignment: "right",
                  },
                ],
                [
                  { text: "", colSpan: 2, style: "subheader", alignment: "center" },
                  "",
                  {
                    text: "ยอดรวม",
                    style: "header",
                    alignment: "center",
                  },
                  {
                    text: this.thaiNumber(this.CostCostsAllcountTD || 0),
                    style: "header",
                    alignment: "center",
                  },
                ],
              ],
            },
          },
          {
            text:
              "ตารางสรุป ยอดรวมค่าบํารุงฯ ค่าประกัน ฯ ค่าธรรมเนียม ค่าสารณูปโภค และค่าลิฟต์",
            style: "header",
            alignment: "center",
          },
          {
            text: `ประจําเดือน ${this.monthYear} `,
            style: "header",
            alignment: "center",
          },
          {
            style: "tableExample",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "บช.ตชด.", style: "header", alignment: "center" },
                  { text: "ตร.ส่วนกลาง", style: "header", alignment: "center" },
                  {
                    text: "ตร.ส่วนกลาง(เพิ่มเติม)",
                    style: "header",
                    alignment: "center",
                  },
                  { text: "รวมเป็นเงิน", style: "header", alignment: "center" },
                ],
                [
                  {
                    text: this.thaiNumber(this.sumAllcount),
                    style: "subheader",
                    alignment: "center",
                  },
                  {
                    text: this.thaiNumber(this.CostdatawaterbillcountTD),
                    style: "subheader",
                    alignment: "center",
                  },
                  {
                    text: this.thaiNumber(this.CostCostsAllcountTD),
                    style: "subheader",
                    alignment: "center",
                  },
                  { text: this.thaiNumber(sum), style: "subheader", alignment: "center" },
                ],
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 3],
          },
          subheader: {
            fontSize: 13,
            bold: false,
          },
          tableExample: {
            margin: [0, 5, 0, 5],
          },
        },

        defaultStyle: {
          font: "THSarabunNew",
        },
      };
      await pdfMake.createPdf(docDefinition).open();
    },

    buildTableBodyinsurance(data, columns) {
      var body = [];
      var body2 = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          value: e.value,
          sumdataMaintenance: this.thaiNumber(e.sumdataMaintenance),
          sumdataInsurance: this.thaiNumber(e.sumdataInsurance),
          sumCostdataInsurance: this.thaiNumber(e.sumCostdataInsurance),
          countMaintenanceAll: this.mapnumberZero(e.countMaintenanceAll),
          countInsuranceAll: this.mapnumberZero(e.countInsuranceAll),
          countCostSumAll: this.mapnumberZero(e.countCostSumAll),
        };
      });

      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          {
            text: this.thaiNumber(thaiNum[0].countMaintenanceAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countInsuranceAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countCostSumAll),
            style: "header",
            alignment: "right",
          },
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "หน่วยงาน", rowSpan: 2, style: "header", alignment: "center" },
          { text: "จำนวนเงิน", colSpan: 3, style: "header", alignment: "center" },
          "",
          "",
        ],
      ];

      var body3 = [
        [
          "",
          "",
          { text: "ค่าบำรุง", style: "header", alignment: "center" },
          { text: "ค่าประกัน", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
        ],
      ];

      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body2.push(dataRow);
      });
      // this.jsonFiled = body,
      let data2 = body2.map((ee, i) => {
        return [
          { text: ee[0], alignment: "center" },
          { text: ee[1], alignment: "center" },
          { text: ee[2], alignment: "right" },
          { text: ee[3], alignment: "right" },
          { text: ee[4], alignment: "right" },
        ];
      });
      // body.splice(1, 0, body2);
      data2.unshift(body3[0]);
      data2.unshift(body[0]);
      arr = data2.concat(footer);
      return arr;
    },

    tableInsurance(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [50, 200, "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyinsurance(data, columns),
        },
      };
    },

    exportPdfinsurance() {
      let listData = [];
      listData = this.AffiliationListCTD.map((el, i) => {
        return {
          ...el,
          value: this.thaiNumberNew(el.value),
          numberNo: i + 1,
          sumdataMaintenance: this.mapnumberZero(el.sumdataMaintenance),
          sumdataInsurance: this.mapnumberZero(el.sumdataInsurance),
          sumCostdataInsurance: this.mapnumberZero(el.sumCostdataInsurance),
        };
      });
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `บัญชีหน้างบ`,
              style: "header",
              alignment: "center",
            },
            {
              text: "สรุปยอดหักค่าบํารุงสถานที่",
              style: "header",
              alignment: "center",
            },
            {
              text: "และค่าประกันทรัพย์สินเสียหายประจําเดือน",
              style: "header",
              alignment: "center",
            },
            {
              text: `(เฉพาะอาคารบ้านพัก บช.ตชด. แยกตามสังกัด)`,
              style: "subheader",
              alignment: "center",
            },
            this.tableInsurance(listData, [
              "numberNo",
              "value",
              "sumdataMaintenance",
              "sumdataInsurance",
              "sumCostdataInsurance",
            ]),
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            subheader: {
              fontSize: 18,
              bold: false,
            },
            tableExample: {
              fontSize: 18,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodywaterBill(data, columns) {
      var body = [];
      let body2 = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          value: e.value,
          sumdataMaintenancefee: this.thaiNumber(e.sumdataMaintenancefee),
          sumdatawaterbill: this.thaiNumber(e.sumdatawaterbill),
          sumdataelectricitybill: this.thaiNumber(e.sumdataelectricitybill),
          sumCostdatawaterbill: this.thaiNumber(e.sumCostdatawaterbill),
          countMaintenancefeeAll: this.mapnumberZero(e.countMaintenancefeeAll),
          countwaterbilAll: this.mapnumberZero(e.countwaterbilAll),
          countelectricitybillAll: this.mapnumberZero(e.countelectricitybillAll),
          countCostwaterbillAll: this.mapnumberZero(e.countCostwaterbillAll),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          {
            text: this.thaiNumber(thaiNum[0].countMaintenancefeeAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countwaterbilAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countelectricitybillAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countCostwaterbillAll),
            style: "header",
            alignment: "right",
          },
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "รายการ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "จำนวนเงิน (บาท)", colSpan: 4, style: "header", alignment: "center" },
          "",
          "",
          "",
        ],
        [
          "",
          "",
          { text: "ค่าธรรมเนียม", style: "header", alignment: "center" },
          { text: "ค่าน้ำปะปา", style: "header", alignment: "center" },
          { text: "ค่าไฟฟ้า", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
        ],
      ];
      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body2.push(dataRow);
      });

      let data2 = body2.map((ee, i) => {
        return [
          { text: ee[0], alignment: "center" },
          { text: ee[1], alignment: "center" },
          { text: ee[2], alignment: "right" },
          { text: ee[3], alignment: "right" },
          { text: ee[4], alignment: "right" },
          { text: ee[5], alignment: "right" },
        ];
      });
      // body.splice(1, 0, body2);
      data2.unshift(body[1]);
      data2.unshift(body[0]);
      arr = data2.concat(footer);
      return arr;
    },

    tablewaterBill(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [30, 150, "*", "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodywaterBill(data, columns),
        },
      };
    },

    exportPdfWaterBill() {
      let listData = [];
      let listDataMap = [];
      let mss = "";
      let mss2 = "";
      if (this.submenus == "submenu3") {
        listDataMap = this.AffiliationListTR;
      } else {
        listDataMap = this.AffiliationListTD;
      }
      listData = listDataMap.map((e, i) => {
        return {
          ...e,
          numberNo: i + 1,
          value: this.thaiNumberNew(e.value),
          sumdataMaintenancefee: this.mapnumberZero(e.sumdataMaintenancefee),
          sumdatawaterbill: this.mapnumberZero(e.sumdatawaterbill),
          sumdataelectricitybill: this.mapnumberZero(e.sumdataelectricitybill),
          sumCostdatawaterbill: this.mapnumberZero(e.sumCostdatawaterbill),
        };
      });
      if (listData.length > 0) {
        if (this.submenus == "submenu3") {
          mss2 = this.monthYearNowTR;
        } else {
          mss2 = this.monthYear;
        }
        if (this.typeReport == "ตร.")
          mss = "การหักเงินเดือนเป็นค่าธรรมเนียม และค่าสาธารณูปโภค";
        else if (this.typeReport == "บช.ตชด.")
          mss = "การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบำรุงลิฟต์เพิ่มเติม";
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `บัญชีหน้างบ`,
              style: "header",
              alignment: "center",
            },
            {
              text: `${mss}`,
              style: "header",
              alignment: "center",
            },
            {
              text: " ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${mss2} `,
              style: "subheader",
              alignment: "center",
            },
            this.tablewaterBill(listData, [
              "numberNo",
              "value",
              "sumdataMaintenancefee",
              "sumdatawaterbill",
              "sumdataelectricitybill",
              "sumCostdatawaterbill",
            ]),
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            subheader: {
              fontSize: 18,
              bold: false,
            },
            tableExample: {
              fontSize: 18,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };

        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCentral(data, columns) {
      var body = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          maintenancefeeSum: this.thaiNumber(e.maintenancefeeSum),
          maintenancefee: this.thaiNumber(e.maintenancefee),
          roomnumber: this.thaiNumberNew(e.roomnumber) || "-",
          lastnumber: this.thaiNumberNew(e.lastnumber) || "-",
          firstnumber: this.thaiNumberNew(e.firstnumber) || "-",
          waterbillSum: this.thaiNumber(e.waterbillSum),
          electricitybillSum: this.thaiNumber(e.electricitybillSum),
          SumCostSumwater: this.thaiNumber(e.SumCostSumwater),
          sumCostwaterbill: this.thaiNumber(e.sumCostwaterbill),
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
          unitWater: this.thaiNumber(e.unitWater),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 6, style: "header", alignment: "center" },
          "",
          "",
          "",
          "",
          "",
          { text: thaiNum[0].maintenancefeeSum, style: "header", alignment: "center" },
          { text: thaiNum[0].waterbillSum, style: "header", alignment: "center" },
          { text: thaiNum[0].electricitybillSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumwater, style: "header", alignment: "center" },
          "",
          "",
          "",
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", style: "header", alignment: "center" },
          { text: "เลขที่ห้อง", style: "header", alignment: "center" },
          { text: "ชื่อ-สกุล", style: "header", alignment: "center" },
          { text: "เลขก่อน", style: "header", alignment: "center" },
          { text: "เลขหลัง", style: "header", alignment: "center" },
          { text: "ยอดใช้", style: "header", alignment: "center" },
          { text: "ค่าธรรมเนียม", style: "header", alignment: "center" },
          { text: "ค่าน้ำปะปา", style: "header", alignment: "center" },
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
          { text: "หักได้", style: "header", alignment: "center" },
          { text: "หักไม่ได้", style: "header", alignment: "center" },
          { text: "สาเหตุที่หักไม่ได้", style: "header", alignment: "center" },
        ],
      ];

      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableCentral(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [20, 20, "*", 27, 27, 25, 27, 25, 32, 20, 20, 20, 55],
          headerRows: 2,
          body: this.buildTableBodyCentral(data, columns),
        },
      };
    },

    exportPdfCentral() {
      let listData = [];
      let mss = "";
      listData = this.reportlistTR.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
        };
      });
      if (listData.length > 0) {
        mss = "การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบำรุงลิฟต์เพิ่มเติม";
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `${mss}`,
              style: "header",
              alignment: "center",
            },
            {
              text: " ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYearNowTR} `,
              style: "subheader",
              alignment: "center",
            },
            this.tableCentral(listData, [
              "numberNo",
              "roomnumber",
              "fullname",
              "firstnumber",
              "lastnumber",
              "unitWater",
              "maintenancefee",
              "waterbill",
              "electricitybill",
              "sumCostwaterbill",
              "typeContractYes",
              "typeContractNo",
              "contractExpenses",
            ]),
          ],
          styles: {
            header: {
              fontSize: 12,
              bold: true,
            },
            subheader: {
              fontSize: 12,
              bold: false,
            },
            tableExample: {
              fontSize: 12,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCentralTD(data, columns) {
      var body = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          maintenancefeeSum: this.thaiNumber(e.maintenancefeeSum),
          maintenancefee: this.thaiNumber(e.maintenancefee),
          roomnumber: this.thaiNumberNew(e.roomnumber) || "-",
          lastnumber: this.thaiNumberNew(e.lastnumber) || "-",
          firstnumber: this.thaiNumberNew(e.firstnumber) || "-",
          waterbillSum: this.thaiNumber(e.waterbillSum),
          electricitybillSum: this.thaiNumber(e.electricitybillSum),
          SumCostSumwater: this.thaiNumber(e.SumCostSumwater),
          sumCostwaterbill: this.thaiNumber(e.sumCostwaterbill),
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
          unitWater: this.thaiNumber(e.unitWater),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 6, style: "header", alignment: "center" },
          "",
          "",
          "",
          "",
          "",
          { text: thaiNum[0].maintenancefeeSum, style: "header", alignment: "center" },
          { text: thaiNum[0].waterbillSum, style: "header", alignment: "center" },
          { text: thaiNum[0].centralSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumCentral, style: "header", alignment: "center" },
          "",
          "",
          "",
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", style: "header", alignment: "center" },
          { text: "เลขที่ห้อง", style: "header", alignment: "center" },
          { text: "ชื่อ-สกุล", style: "header", alignment: "center" },
          { text: "เลขก่อน", style: "header", alignment: "center" },
          { text: "เลขหลัง", style: "header", alignment: "center" },
          { text: "ยอดใช้", style: "header", alignment: "center" },
          { text: "ค่าธรรมเนียม", style: "header", alignment: "center" },
          { text: "ค่าน้ำปะปา", style: "header", alignment: "center" },
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
          { text: "หักได้", style: "header", alignment: "center" },
          { text: "หักไม่ได้", style: "header", alignment: "center" },
          { text: "สาเหตุที่หักไม่ได้", style: "header", alignment: "center" },
        ],
      ];

      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableCentralTD(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [20, 20, "*", 27, 27, 25, 27, 25, 32, 20, 20, 20, 55],
          headerRows: 2,
          body: this.buildTableBodyCentralTD(data, columns),
        },
      };
    },

    exportPdfCentralTD() {
      let listData = [];
      let mss = "";
      let mss2 = "";
      let mss3 = "";
      this.AffiliationLable !== ""
        ? (mss3 = "หน่วยงาน" + " " + this.AffiliationLable)
        : (mss3 = "");
      if (this.reportType == "หักไม่ได้") {
        listData = this.deductibleTD;
      }else {
        listData = this.reportlistTD;
      }
      if (listData.length > 0) {
        if (this.reportType == "หักไม่ได้") {
          mss =
            "บัญชีรายชื่อผู้พักอาศัยที่ไม่สามารถหักเงินเดือนเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง ตร.";
          mss2 = "";
        } else {
          mss = "การหักเงินเดือนเป็นค่าธรรมเนียม และค่าสาธารณูปโภค";
          mss2 = "ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.";
        }
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `${mss}`,
              style: "header",
              alignment: "center",
            },
            {
              text: `${mss2}`,
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYear} ${mss3 || " "}`,
              style: "subheader",
              alignment: "center",
            },
            this.tableCentralTD(listData, [
              "numberNo",
              "roomnumber",
              "fullname",
              "firstnumber",
              "lastnumber",
              "unitWater",
              "maintenancefee",
              "waterbill",
              "electricitybill",
              "sumCostwaterbill",
              "typeContractYes",
              "typeContractNo",
              "contractExpenses",
            ]),
          ],
          styles: {
            header: {
              fontSize: 12,
              bold: true,
            },
            subheader: {
              fontSize: 12,
              bold: false,
            },
            tableExample: {
              fontSize: 12,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCosts(data, columns) {
      var body = [];
      var body2 = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          value: e.value,
          sumdatacentral: this.thaiNumber(e.sumdatacentral),
          sumdatacosts: this.thaiNumber(e.sumdatacosts),
          sumdataCostCentralAllSum: this.thaiNumber(e.sumdataCostCentralAllSum),
          countcentraAll: this.mapnumberZero(e.countcentraAll),
          countcostsAll: this.mapnumberZero(e.countcostsAll),
          countdataCostCentralAllSum: this.mapnumberZero(e.countdataCostCentralAllSum),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          {
            text: this.thaiNumber(thaiNum[0].countcentraAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countcostsAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countdataCostCentralAllSum),
            style: "header",
            alignment: "right",
          },
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "รายการ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "จำนวนเงิน (บาท)", colSpan: 3, style: "header", alignment: "center" },
          "",
          "",
        ],
        [
          "",
          "",
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "ค่าบำรุงลิฟต์", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
        ],
      ];
      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body2.push(dataRow);
      });
      let data2 = body2.map((ee, i) => {
        return [
          { text: ee[0], alignment: "center" },
          { text: ee[1], alignment: "center" },
          { text: ee[2], alignment: "right" },
          { text: ee[3], alignment: "right" },
          { text: ee[4], alignment: "right" },
        ];
      });
      // body.splice(1, 0, body2);
      data2.unshift(body[1]);
      data2.unshift(body[0]);
      arr = data2.concat(footer);
      return arr;
    },

    tableCosts(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [30, 200, "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyCosts(data, columns),
        },
      };
    },

    exportPdfCosts() {
      let listData = [];
      listData = this.AffiliationListTR.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          value: this.thaiNumberNew(el.value),
          sumdatacentral: this.mapnumberZero(el.sumdatacentral),
          sumdatacosts: this.mapnumberZero(el.sumdatacosts),
          sumdataCostCentralAllSum: this.mapnumberZero(el.sumdataCostCentralAllSum),
        };
      });
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `บัญชีหน้างบ`,
              style: "header",
              alignment: "center",
            },
            {
              text: `การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์เพิ่มเติม`,
              style: "header",
              alignment: "center",
            },
            {
              text: " ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYearTableTR} `,
              style: "subheader",
              alignment: "center",
            },
            this.tableCosts(listData, [
              "numberNo",
              "value",
              "sumdatacentral",
              "sumdatacosts",
              "sumdataCostCentralAllSum",
            ]),
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
            },
            subheader: {
              fontSize: 16,
              bold: false,
            },
            tableExample: {
              fontSize: 18,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCostselectricity(data, columns) {
      var body = [];
      var body2 = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          value: e.value,
          sumdatacentral: this.thaiNumber(e.sumdatacentral),
          sumdatacosts: this.thaiNumber(e.sumdatacosts),
          sumdataCostCentralAllSum: this.thaiNumber(e.sumdataCostCentralAllSum),
          countcentraAll: this.mapnumberZero(e.countcentraAll),
          countcostsAll: this.mapnumberZero(e.countcostsAll),
          countdataCostCentralAllSum: this.mapnumberZero(e.countdataCostCentralAllSum),
        };
      });

      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          {
            text: this.thaiNumber(thaiNum[0].countcentraAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countcostsAll),
            style: "header",
            alignment: "right",
          },
          {
            text: this.thaiNumber(thaiNum[0].countdataCostCentralAllSum),
            style: "header",
            alignment: "right",
          },
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "รายการ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "จำนวนเงิน (บาท)", colSpan: 3, style: "header", alignment: "center" },
          "",
          "",
        ],
        [
          "",
          "",
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "ค่าบำรุงลิฟต์", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
        ],
      ];
      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body2.push(dataRow);
      });
      let data2 = body2.map((ee, i) => {
        return [
          { text: ee[0], alignment: "center" },
          { text: ee[1], alignment: "center" },
          { text: ee[2], alignment: "right" },
          { text: ee[3], alignment: "right" },
          { text: ee[4], alignment: "right" },
        ];
      });
      // body.splice(1, 0, body2);
      data2.unshift(body[1]);
      data2.unshift(body[0]);
      arr = data2.concat(footer);
      return arr;
    },

    tableCostselectricity(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [30, 200, "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyCostselectricity(data, columns),
        },
      };
    },

    exportPdfCostselectricity() {
      let listData = [];
      listData = this.AffiliationListTD.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          value: this.thaiNumberNew(el.value),
          sumdatacentral: this.mapnumberZero(el.sumdatacentral),
          sumdatacosts: this.mapnumberZero(el.sumdatacosts),
          sumdataCostCentralAllSum: this.mapnumberZero(el.sumdataCostCentralAllSum),
        };
      });
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: `บัญชีหน้างบ`,
              style: "header",
              alignment: "center",
            },
            {
              text: `  การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์`,
              style: "header",
              alignment: "center",
            },
            {
              text: " ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYear} `,
              style: "subheader",
              alignment: "center",
            },
            this.tableCostselectricity(listData, [
              "numberNo",
              "value",
              "sumdatacentral",
              "sumdatacosts",
              "sumdataCostCentralAllSum",
            ]),
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
            },
            subheader: {
              fontSize: 16,
              bold: false,
            },
            tableExample: {
              fontSize: 18,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyAccumulated(data, columns) {
      var body = [];
      var body2 = [];
      let arr = [];

      var thaiNum = data.map((e) => {
        let tt;
        if (e.Installmenttime == undefined) tt = "-";
        else if (e.Installmenttime !== undefined) tt = e.Installmenttime;
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          waterbillSum: this.thaiNumber(e.waterbillSum),
          electricitybillSum: this.thaiNumber(e.electricitybillSum),
          SumCostSumwater: this.thaiNumber(e.SumCostSumwater),
          sumCostwaterbill: this.thaiNumber(e.sumCostwaterbill),
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
          amountPaidSum: this.thaiNumber(e.amountPaidSum),
          accumulatedSum: this.thaiNumber(e.accumulatedSum),
          accumulated: this.thaiNumber(e.accumulated),
          amountPaid: this.thaiNumber(e.amountPaid),
          roomnumber: this.thaiNumberNew(e.roomnumber),
          Installmenttime: tt,
          InsuranceSum: this.thaiNumber(e.InsuranceSum),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 4, style: "header", alignment: "center" },
          "",
          "",
          "",
          { text: thaiNum[0].MaintenanceSum, style: "header", alignment: "right" },
          { text: thaiNum[0].accumulatedSum, style: "header", alignment: "right" },
          {
            text: thaiNum[0].amountPaidSum,
            colSpan: 2,
            style: "header",
            alignment: "right",
          },
          "",
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", rowSpan: 2, style: "header", alignment: "center" },
          { text: "ชื่อ-สกุล", rowSpan: 2, style: "header", alignment: "center" },
          { text: "อาคาร", rowSpan: 2, style: "header", alignment: "center" },
          { text: "เลขที่ห้อง", rowSpan: 2, style: "header", alignment: "center" },
          {
            text: "การหักเงินค่าบำรุงฯ",
            rowSpan: 2,
            style: "header",
            alignment: "center",
          },
          {
            text: "การหักเงินค่าประกันฯ",
            colSpan: 3,
            style: "header",
            alignment: "center",
          },
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          { text: "ยอดหัก", style: "header", alignment: "center" },
          { text: "ยอดหักสะสม", style: "header", alignment: "center" },
          { text: "หมายเหตุ", style: "header", alignment: "center" },
        ],
      ];

      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body2.push(dataRow);
      });
      let data2 = body2.map((ee, i) => {
        return [
          { text: ee[0], alignment: "center" },
          { text: ee[1], alignment: "center" },
          { text: ee[2], alignment: "right" },
          { text: ee[3], alignment: "right" },
          { text: ee[4], alignment: "right" },
          { text: ee[5], alignment: "right" },
          { text: ee[6], alignment: "right" },
          { text: ee[7], alignment: "right" },
        ];
      });
      // body.splice(1, 0, body2);
      data2.unshift(body[1]);
      data2.unshift(body[0]);
      arr = data2.concat(footer);
      return arr;
    },

    tableAccumulated(data, columns) {
      return {
        style: "tableExample",
        table: {
          // widths: [30, "*", "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyAccumulated(data, columns),
        },
      };
    },

    exportPdfAccumulated() {
      let listData = [];
      let Affiliationmss = "";
      listData = this.reportlistCTD.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
        };
      });
      if (this.AffiliationLable !== "") {
        Affiliationmss = `หน่วยงาน ${this.AffiliationLable}`;
      } 
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };

        const docDefinition = {
          content: [
            {
              text: ` บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพักอิสระ บช.ตชด. `,
              style: "header",
              alignment: "center",
            },
            {
              text:
                " ที่หักเงินเดือนเป็นค่าบํารุงรักษาสถานที่และค่าประกันทรัพย์สินเสียหาย",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYearNowtable} ${Affiliationmss} `,
              style: "subheader",
              alignment: "center",
            },
            this.tableAccumulated(listData, [
              "numberNo",
              "fullname",
              "buildingName",
              "roomnumber",
              "maintenance",
              "accumulated",
              "amountPaid",
              "Installmenttime",
            ]),
          ],
          styles: {
            header: {
              fontSize: 12,
              bold: true,
            },
            subheader: {
              fontSize: 12,
              bold: false,
            },
            tableExample: {
              fontSize: 12,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCostCentral(data, columns) {
      var body = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          waterbillSum: this.thaiNumber(e.waterbillSum),
          roomnumber: this.thaiNumberNew(e.roomnumber) || "-",
          electricitybillSum: this.thaiNumber(e.electricitybillSum),
          SumCostSumwater: this.thaiNumber(e.SumCostSumwater),
          sumCostwaterbill: this.thaiNumber(e.sumCostwaterbill),
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
          unitWater: this.thaiNumber(e.unitWater),
          costsSum: this.thaiNumber(e.costsSum),
          central: this.thaiNumber(e.central),
          costs: this.thaiNumber(e.costs),
          sumCostCosts: this.thaiNumber(e.sumCostCosts),
          SumCostSumCosts: this.thaiNumber(e.SumCostSumCosts),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 5, style: "header", alignment: "center" },
          "",
          "",
          "",
          "",
          { text: thaiNum[0].centralSum, style: "header", alignment: "center" },
          { text: thaiNum[0].costsSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumCosts, style: "header", alignment: "center" },
          "",
          "",
          "",
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", style: "header", alignment: "center" },
          { text: "บ้านพัก", style: "header", alignment: "center" },
          { text: "เลขที่ห้อง", style: "header", alignment: "center" },
          { text: "ชื่อ-สกุล", style: "header", alignment: "center" },
          { text: "หน่วย", style: "header", alignment: "center" },
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "ค่าบำรุงลิฟต์", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
          { text: "หักได้", style: "header", alignment: "center" },
          { text: "หักไม่ได้", style: "header", alignment: "center" },
          { text: "สาเหตุที่หักไม่ได้", style: "header", alignment: "center" },
        ],
      ];
      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableCostCentral(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [27, 30, 38, "*", 35, 35, 45, 25, 27, 32, 63],
          headerRows: 2,
          body: this.buildTableBodyCostCentral(data, columns),
        },
      };
    },

    exportPdfCostCentral() {
      let listData = [];
      let mss3 = "";
      AffiliationLable !== ""
        ? (mss3 = "หน่วยงาน" + " " + this.AffiliationLable)
        : (mss3 = "");
      listData = this.reportlistTR.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
        };
      });
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: ` บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง `,
              style: "header",
              alignment: "center",
            },
            {
              text: " ถอนเงินค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์ (เพิ่มเติม)",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYearTableTR} ${mss3 || " "}`,
              style: "subheader",
              alignment: "center",
            },
            this.tableCostCentral(listData, [
              "numberNo",
              "buildingType",
              "roomnumber",
              "fullname",
              "unitWater",
              "central",
              "costs",
              "sumCostCosts",
              "typeContractYes",
              "typeContractNo",
              "contractExpenses",
            ]),
          ],
          styles: {
            header: {
              fontSize: 13,
              bold: true,
            },
            subheader: {
              fontSize: 12,
              bold: false,
            },
            tableExample: {
              fontSize: 12,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },
    buildTableBodyCostCentralTD(data, columns) {
      var body = [];
      let arr = [];
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          waterbillSum: this.thaiNumber(e.waterbillSum),
          electricitybillSum: this.thaiNumber(e.electricitybillSum),
          SumCostSumwater: this.thaiNumber(e.SumCostSumwater),
          sumCostwaterbill: this.thaiNumber(e.sumCostwaterbill),
          roomnumber: this.thaiNumberNew(e.roomnumber) || "-",
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
          sumCostCosts: this.thaiNumber(e.sumCostCosts),
          SumCostSumCosts: this.thaiNumber(e.SumCostSumCosts),
          subill: this.thaiNumber(e.subill),
          costs: this.thaiNumber(e.costs),
          costsSum: this.thaiNumber(e.costsSum),
          unitWater: this.thaiNumber(e.unitWater),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 5, style: "header", alignment: "center" },
          "",
          "",
          "",
          "",
          { text: thaiNum[0].centralSum, style: "header", alignment: "center" },
          { text: thaiNum[0].costsSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumCosts, style: "header", alignment: "center" },
          "",
          "",
          "",
        ],
      ];
      var body = [
        [
          { text: "ลำดับ", style: "header", alignment: "center" },
          { text: "บ้านพัก", style: "header", alignment: "center" },
          { text: "เลขที่ห้อง", style: "header", alignment: "center" },
          { text: "ชื่อ-สกุล", style: "header", alignment: "center" },
          { text: "หน่วย", style: "header", alignment: "center" },
          { text: "ค่าไฟฟ้าส่วนกลาง", style: "header", alignment: "center" },
          { text: "ค่าบำรุงลิฟต์", style: "header", alignment: "center" },
          { text: "รวม", style: "header", alignment: "center" },
          { text: "หักได้", style: "header", alignment: "center" },
          { text: "หักไม่ได้", style: "header", alignment: "center" },
          { text: "สาเหตุที่หักไม่ได้", style: "header", alignment: "center" },
        ],
      ];
      thaiNum.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableCostCentralTD(data, columns) {
      return {
        style: "tableExample",
        table: {
          widths: [27, 30, 38, "*", 35, 35, 45, 25, 27, 32, 63],
          headerRows: 2,
          body: this.buildTableBodyCostCentralTD(data, columns),
        },
      };
    },

    exportPdfCostCentralTD() {
      let listData = [];
      listData = this.reportlistTD.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          subill: parseInt(el.electricitybill) + parseInt(el.costs) || 0,
        };
      });
      if (listData.length > 0) {
        pdfMake.fonts = {
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
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        const docDefinition = {
          content: [
            {
              text: ` บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง `,
              style: "header",
              alignment: "center",
            },
            {
              text: " การหักค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์ ",
              style: "header",
              alignment: "center",
            },
            {
              text: ` ประจําเดือน ${this.monthYear}`,
              style: "subheader",
              alignment: "center",
            },
            this.tableCostCentralTD(listData, [
              "numberNo",
              "buildingType",
              "roomnumber",
              "fullname",
              "unitWater",
              "central",
              "costs",
              "sumCostCosts",
              "typeContractYes",
              "typeContractNo",
              "contractExpenses",
            ]),
          ],
          styles: {
            header: {
              fontSize: 13,
              bold: true,
            },
            subheader: {
              fontSize: 12,
              bold: false,
            },
            tableExample: {
              fontSize: 12,
              bold: false,
              margin: [0, 5, 0, 5],
            },
          },
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
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
        <div class="container-fluid">
          <div>
            <Breadcrumbs
              :routes="[
                { label: 'หน้าหลัก', route: '/home' },
                { label: 'ระบบเรียกรายงาน' },
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
          <div class="d-flex justify-content-between align-items-center">
            <h4>
              ระบบเรียกรายงาน ประจำเดือน {{ selectedMonth?.label || selectedMonth }}
            </h4>
            <div style="text-align: right">
              <MaterialButton
                style="width: 220px"
                variant="gradient"
                color="success"
                @click="ExportData"
                >ดาวน์โหลดบัญชีสรุปส่งการเงิน</MaterialButton
              >
            </div>
          </div>

          <div class="row pt-4 min-vh-45">
            <div class="col-lg-3">
              <nav class="menu">
                <ol>
                  <li class="menu-item">
                    <p>บ้านพัก บช.ตชด. (ส่วนกลาง)</p>
                    <ol class="sub-menu">
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu1' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu1')"
                          >บัญชียอดหักเงินค่าบํารุงสถานที่ และค่าประกันทรัพย์สินเสียหาย
                          ของ บช.ตชด.</a
                        >
                      </li>
                    </ol>
                  </li>
                  <li class="menu-item">
                    <p>บ้านพัก ตร.</p>
                    <ol class="sub-menu">
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu2' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu2')"
                          >บัญชียอดหักเงินค่าบํารุงสถานที่ และค่าประกันทรัพย์สินเสียหาย
                          ของ ตร.</a
                        >
                      </li>
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu3' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu3')"
                          >บัญชียอดถอนเงินค่าบํารุงสถานที่ และค่าประกันทรัพย์สินเสียหาย
                          ของ ตร.</a
                        >
                      </li>
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu4' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu4')"
                          >บัญชียอดหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง
                          และค่าบํารุงลิฟต์เพิ่มเติมประจำเดือน ของ ตร.</a
                        >
                      </li>
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu5' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu5')"
                          >บัญชียอดถอนเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง
                          และค่าบํารุงลิฟต์เพิ่มเติมประจำเดือน ของ ตร.</a
                        >
                      </li>
                    </ol>
                  </li>
                  <li class="menu-item">
                    <p>รายการสรุป</p>
                    <ol class="sub-menu">
                      <li class="menu-item">
                        <a
                          :class="submenus == 'submenu6' ? 'textActive' : ''"
                          href="javascript:void(0)"
                          @click="seleteMenu('submenu6')"
                          >บัญชีสรุป ยอดเงิน แยกตามบ้านพัก ของ ตร. กับ บช.ตชด.</a
                        >
                      </li>
                    </ol>
                  </li>
                </ol>
              </nav>
            </div>
            <div class="col-lg-9">
              <div>
                <div v-show="submenus == 'submenu4'">
                  <div>
                    <div class="pt-4 text-start">
                      <!-- <h5>รวมค่าใช้จ่ายทั้งหมด : 950</h5> -->
                      <div class="mb-3">
                        <div class="form-check form-check-inline">
                          <label style="margin-right: 20px">ประเภท</label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser99"
                            id="typeUser99"
                            value="บัญชีหน้างบ"
                            :checked="reportType == 'บัญชีหน้างบ'"
                            @change="typeUserchange('บัญชีหน้างบ', 'table55')"
                          />
                          <label class="form-check-label" for="typeUser99"
                            >บัญชีหน้างบ</label
                          >
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="typeUser66"
                            id="typeUser66"
                            value="ประกันทรัพย์สิน"
                            :checked="reportType == 'ประกันทรัพย์สิน'"
                            @change="typeUserchange('ประกันทรัพย์สิน', 'table66')"
                          />
                          <label class="form-check-label" for="typeUser66">
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
                        <div v-if="reportType == 'ประกันทรัพย์สิน'" class="mb-3 w-20">
                          <label>สังกัด</label>
                          <v-select
                            :options="masterData?.AffiliationList"
                            v-model="selectedAffiliation"
                          ></v-select>
                        </div>
                        <div>
                          <MaterialButton
                            v-if="reportType == 'บัญชีหน้างบ'"
                            size="lg"
                            class="btn-icon"
                            style="margin-right: -30px"
                            @click="exportPdfCostselectricity()"
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
                          <MaterialButton
                            v-if="reportType == 'ประกันทรัพย์สิน'"
                            size="lg"
                            class="btn-icon"
                            style="margin-right: -30px"
                            @click="exportPdfCostCentralTD()"
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
                          <MaterialButton
                            v-if="reportType == 'บัญชีหน้างบ'"
                            size="lg"
                            class="btn-icon"
                            @click="ExportExcel('xlsx', 'table55')"
                          >
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
                          <MaterialButton
                            v-if="reportType == 'ประกันทรัพย์สิน'"
                            size="lg"
                            class="btn-icon"
                            @click="ExportExcel('xlsx', 'table66')"
                          >
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
                      <table class="table table-bordered" id="table55">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">บัญชีหน้างบ</td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ประจําเดือน {{ monthYearTable }}
                            </td>
                          </tr>
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
                        <tr v-for="(item, index) in AffiliationListTD" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item?.value || "-" }}</td>
                          <!-- :data-v="item?.sumdatacentral"  -->
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdatacentral || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdatacosts || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdataCostCentralAllSum || "-") }}
                          </td>
                        </tr>
                        <tr v-if="AffiliationListTD?.length > 0">
                          <th scope="row" colspan="2">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countcentraAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(AffiliationListTD[0]?.countcostsAll || "-")
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countdataCostCentralAllSum || "-"
                              )
                            }}
                          </th>
                        </tr>
                      </table>
                    </div>
                    <div
                      v-if="reportType == 'ประกันทรัพย์สิน'"
                      class="text-center pt-4 table-responsive"
                    >
                      <table class="table table-bordered" id="table66">
                        <thead>
                          <tr>
                            <td colspan="9" style="border: 0">
                              บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง
                            </td>
                          </tr>
                          <tr>
                            <td colspan="9" style="border: 0">
                              ถอนเงินค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์
                            </td>
                          </tr>
                          <tr>
                            <td colspan="9" style="border: 0">
                              ประจําเดือน {{ monthYearTable }}
                            </td>
                          </tr>
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
                            <td>{{ item?.buildingType || "-" }}</td>
                            <td data-t="s">{{ item?.roomnumber || "-" }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>
                              {{ item?.affiliation || "-" }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(item?.electricitybill || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(item?.costs || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(item?.sumCostCosts || "-") }}
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>
                          <tr v-if="reportlistTD?.length > 0">
                            <th scope="row" colspan="5">รวมเงิน</th>
                            <th data-t="n" data-z="#,##">
                              {{ numberWithCommas(reportlistTD[0]?.electricitybillSum || "-") }}
                            </th>
                            <th data-t="n" data-z="#,##">
                              {{ numberWithCommas(reportlistTD[0]?.costsSum || "-") }}
                            </th>
                            <th data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(reportlistTD[0]?.SumCostSumCosts || "-")
                              }}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-show="submenus == 'submenu3'">
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
                          @change="typeUserchange('บัญชีหน้างบ', 'table3')"
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
                          @change="typeUserchange('ประกันทรัพย์สิน', 'table4')"
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
                      <div v-if="reportType == 'ประกันทรัพย์สิน'" class="mb-3 w-20">
                        <label>สังกัด</label>
                        <v-select
                          :options="masterData?.AffiliationList"
                          v-model="selectedAffiliation"
                        ></v-select>
                      </div>
                      <div>
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfWaterBill()"
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfCentral()"
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
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table3')"
                        >
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table4')"
                        >
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
                    <table class="table table-bordered" id="table3">
                      <thead>
                        <tr>
                          <td colspan="6" style="border: 0">บัญชีหน้างบ</td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง และค่าบำรุงลิฟต์เพิ่มเติม
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ประจําเดือน {{ monthYearTableTR }}
                          </td>
                        </tr>
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
                        <tr v-for="(item, index) in AffiliationListTR" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item?.value || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdataMaintenancefee || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdatawaterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdataelectricitybill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostdatawaterbill || "-") }}
                          </td>
                        </tr>
                        <tr v-if="AffiliationListTR?.length > 0">
                          <th scope="row" colspan="2">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTR[0]?.countMaintenancefeeAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTR[0]?.countwaterbilAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTR[0]?.countelectricitybillAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTR[0]?.countCostwaterbillAll || "-"
                              )
                            }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    v-if="reportType == 'ประกันทรัพย์สิน'"
                    class="text-center pt-4 table-responsive"
                  >
                    <table class="table table-bordered" id="table4">
                      <thead>
                        <tr>
                          <td colspan="9" style="border: 0">
                            บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            การหักค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์ (เพิ่มเติม)
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ประจําเดือน {{ monthYearTableTR }}
                            <span v-if="AffiliationLable !== ''">หน่วยงาน</span>
                            {{ AffiliationLable || " " }}
                          </td>
                        </tr>
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
                        <tr v-for="(item, index) in reportlistTR" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td data-t="s">{{ item?.roomnumber }}</td>
                          <td>
                            {{ item?.rank }} {{ item?.firstName }}
                            {{ item?.lastName }}
                          </td>
                          <td>{{ item?.firstnumber || 0 }}</td>
                          <td>{{ item?.lastnumber || 0 }}</td>
                          <td>
                            {{
                              parseInt(item?.lastnumber || 0) -
                                parseInt(item?.firstnumber || 0) || 0
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(parseInt(item?.maintenancefee || 0) || "-")
                            }}
                          </td>
                          
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.waterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.electricitybill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostwaterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            <span v-if="item?.typeContract == 'หักได้'">/</span>
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                          </td>
                          <td>{{ item?.contractExpenses }}</td>
                        </tr>
                        <tr v-if="reportlistTR?.length > 0">
                          <th scope="row" colspan="6">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTR[0]?.maintenancefeeSum || "-")
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(reportlistTR[0]?.waterbillSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(reportlistTR[0]?.electricitybillSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTR[0]?.SumCostSumwater || "-")
                            }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-show="submenus == 'submenu5'">
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
                          @change="typeUserchange('บัญชีหน้างบ', 'table5')"
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
                          @change="typeUserchange('ประกันทรัพย์สิน', 'table6')"
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
                      <div v-if="reportType == 'ประกันทรัพย์สิน'" class="mb-3 w-20">
                        <label>สังกัด</label>
                        <v-select
                          :options="masterData?.AffiliationList"
                          v-model="selectedAffiliation"
                        ></v-select>
                      </div>
                      <div>
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfCosts()"
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfCostCentral()"
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
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table5')"
                        >
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table6')"
                        >
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
                    <table class="table table-bordered" id="table5">
                      <thead>
                        <tr>
                          <td colspan="6" style="border: 0">บัญชีหน้างบ</td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ถอนเงินค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์เพิ่มเติม
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ประจําเดือน {{ monthYearTableTR }}
                          </td>
                        </tr>
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
                      <tr v-for="(item, index) in AffiliationListTR" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item?.value || "-" }}</td>
                        <td data-t="n" data-z="#,##">
                          {{ numberWithCommas(item?.sumdatacentral || "-") }}
                        </td>
                        <td data-t="n" data-z="#,##">
                          {{ numberWithCommas(item?.sumdatacosts || "-") }}
                        </td>
                        <td data-t="n" data-z="#,##">
                          {{ numberWithCommas(item?.sumdataCostCentralAllSum || "-") }}
                        </td>
                      </tr>
                      <tr v-if="AffiliationListTR?.length > 0">
                        <th scope="row" colspan="2">รวมเงิน</th>
                        <th data-t="n" data-z="#,##">
                          {{
                            numberWithCommas(AffiliationListTR[0]?.countcentraAll || "-")
                          }}
                        </th>
                        <th data-t="n" data-z="#,##">
                          {{
                            numberWithCommas(AffiliationListTR[0]?.countcostsAll || "-")
                          }}
                        </th>
                        <th data-t="n" data-z="#,##">
                          {{
                            numberWithCommas(
                              AffiliationListTR[0]?.countdataCostCentralAllSum || "-"
                            )
                          }}
                        </th>
                      </tr>
                    </table>
                  </div>
                  <div
                    v-if="reportType == 'ประกันทรัพย์สิน'"
                    class="text-center pt-4 table-responsive"
                  >
                    <table class="table table-bordered" id="table6">
                      <thead>
                        <tr>
                          <td colspan="9" style="border: 0">
                            บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ถอนเงินค่าไฟฟ้าส่วนกลาง และค่าบํารุงลิฟต์ (เพิ่มเติม)
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ประจําเดือน {{ monthYearTableTR }}
                            <span v-if="AffiliationLable !== ''">หน่วยงาน</span>
                            {{ AffiliationLable || " " }}
                          </td>
                        </tr>
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
                        <tr v-for="(item, index) in reportlistTR" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item?.buildingType || "-" }}</td>
                          <td data-t="s">{{ item?.roomnumber || "-" }}</td>
                          <td>
                            {{ item?.rank }} {{ item?.firstName }}
                            {{ item?.lastName }}
                          </td>
                          <td>
                            {{ item?.affiliation || "-" }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.central || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.costs || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostCosts || "-") }}
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักได้'">/</span>
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                          </td>
                          <td>{{ item?.contractExpenses || "-" }}</td>
                        </tr>
                        <tr v-if="reportlistTR?.length > 0">
                          <th scope="row" colspan="5">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(reportlistTR[0]?.centralSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(reportlistTR[0]?.costsSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTR[0]?.SumCostSumCosts || "-")
                            }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-show="submenus == 'submenu6'">
                  <div class="pt-4 text-start">
                    <!-- <h5>รวมค่าใช้จ่ายทั้งหมด : 950</h5> -->

                    <div class="d-flex justify-content-end align-items-center">
                      <div class="mb-3 w-20" style="margin-right: 5px">
                        <label>เดือน</label>
                        <v-select
                          :options="optionMonth"
                          v-model="selectedMonth"
                        ></v-select>
                      </div>
                      <div v-if="reportType == 'ประกันทรัพย์สิน'" class="mb-3 w-20">
                        <label>สังกัด</label>
                        <v-select
                          :options="masterData?.AffiliationList"
                          v-model="selectedAffiliation"
                        ></v-select>
                      </div>

                      <div>
                        <MaterialButton
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfsummary()"
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
                        <MaterialButton
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table9')"
                        >
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
                  <div id="table9">
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ยอดเงินค่าบํารุงฯ, ค่าประกันฯ อาคารบ้านพักอิสระ บช.ตชด.
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              เดือน {{ monthYearNowtable }}
                            </td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าบํารุงฯ</th>
                            <th>ค่าประกันฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{ "อำนวยการ" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll[0]?.sumdataMaintenance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll[0]?.sumdataInsurance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll[0]?.sumCostdataInsurance || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "สนับสนุน" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll2[0]?.sumdataMaintenance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll2[0]?.sumdataInsurance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll2[0]?.sumCostdataInsurance || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "ลูกจ้าง" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll3[0]?.sumdataMaintenance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll3[0]?.sumdataInsurance || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll3[0]?.sumCostdataInsurance || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "รวม" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(maintenanceAllcount || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(insuranceAllcount || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(sumAllcount || "-") }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ยอดเงินค่าธรรมเนียม และค่าสาธารณูปโภค อาคารบ้านพัก
                              ตร.ส่วนกลาง
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              เดือน {{ monthYearTable }}
                            </td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่าน้ําประปา</th>
                            <th>ค่าไฟฟ้า</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tr>
                          <td>{{ "อำนวยการ" || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll4[0]?.sumdataMaintenancefree || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll4[0]?.sumdatawaterbill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll4[0]?.sumdataelectricitybill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll4[0]?.sumCostdatawaterbill || "-"
                              )
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td>{{ "สนับสนุน" || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll5[0]?.sumdataMaintenancefree || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll5[0]?.sumdatawaterbill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll5[0]?.sumdataelectricitybill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll5[0]?.sumCostdatawaterbill || "-"
                              )
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td>{{ "ลูกจ้าง" || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll6[0]?.sumdataMaintenancefree || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll6[0]?.sumdatawaterbill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll6[0]?.sumdataelectricitybill || "-"
                              )
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                sumreportlistAll6[0]?.sumCostdatawaterbill || "-"
                              )
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td>{{ "รวม" || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(maintenancefeeAllcountTD || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(waterbillAllcountTD || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(electricitybillAllcountTD || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(CostdatawaterbillcountTD || "-") }}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              รายการหักเพิ่มเติม
                              ค่าไฟฟ้าส่วนกลาง/ค่าบํารุงลิฟต์อาคารบ้านพัก ตร.ส่วนกลาง
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              เดือน {{ monthYearTable }}
                            </td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าไฟฟ้าส่วนกลาง</th>
                            <th>ค่าบํารุงลิฟต์</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{ "อำนวยการ" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll4[0]?.sumdatacentral || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll4[0]?.sumdatacosts || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll4[0]?.sumCostdataCostCosts || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "สนับสนุน" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll5[0]?.sumdatacentral || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll5[0]?.sumdatacosts || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll5[0]?.sumCostdataCostCosts || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "ลูกจ้าง" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll6[0]?.sumdatacentral || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll6[0]?.sumdatacosts || "-"
                                )
                              }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumreportlistAll6[0]?.sumCostdataCostCosts || "-"
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>{{ "รวม" || "-" }}</td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(centralAllcountTD || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(costsAllcountTD || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(CostCostsAllcountTD || "-") }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ตารางสรุป ยอดรวมค่าบํารุงฯ ค่าประกัน ฯ ค่าธรรมเนียม
                              ค่าสารณูปโภค และค่าลิฟต์
                            </td>
                          </tr>
                          <tr>
                            <th>บช.ตชด.</th>
                            <th>ตร.ส่วนกลาง</th>
                            <th>ตร.ส่วนกลาง(เพิ่มเติม)</th>
                            <th>รวมเป็นเงิน</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(sumAllcount || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(CostdatawaterbillcountTD || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{ numberWithCommas(CostCostsAllcountTD || "-") }}
                            </td>
                            <td data-t="n" data-z="#,##">
                              {{
                                numberWithCommas(
                                  sumAllcount +
                                    CostdatawaterbillcountTD +
                                    CostCostsAllcountTD || "-"
                                )
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-show="submenus == 'submenu1'">
                  <div class="text-center pt-4 table-responsive">
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
                              @change="typeUserchange('บัญชีหน้างบ', 'table13')"
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
                              @change="typeUserchange('ประกันทรัพย์สิน', 'table14')"
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
                          <div v-if="reportType == 'ประกันทรัพย์สิน'" class="mb-3 w-20">
                            <label>สังกัด</label>
                            <v-select
                              :options="masterData?.AffiliationList"
                              v-model="selectedAffiliation"
                            ></v-select>
                          </div>
                          <div>
                            <MaterialButton
                              v-if="reportType == 'บัญชีหน้างบ'"
                              size="lg"
                              class="btn-icon"
                              style="margin-right: -30px"
                              @click="exportPdfinsurance()"
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
                            <MaterialButton
                              v-if="reportType == 'ประกันทรัพย์สิน'"
                              size="lg"
                              class="btn-icon"
                              style="margin-right: -30px"
                              @click="exportPdfAccumulated()"
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
                            <MaterialButton
                              v-if="reportType == 'บัญชีหน้างบ'"
                              size="lg"
                              class="btn-icon"
                              @click="ExportExcel('xlsx', 'table13')"
                            >
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
                            <MaterialButton
                              v-if="reportType == 'ประกันทรัพย์สิน'"
                              size="lg"
                              class="btn-icon"
                              @click="ExportExcel('xlsx', 'table14')"
                            >
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
                        <table class="table table-bordered" id="table13">
                          <thead>
                            <tr>
                              <td colspan="6" style="border: 0">บัญชีหน้างบ</td>
                            </tr>
                            <tr>
                              <td colspan="6" style="border: 0">
                                สรุปยอดหักค่าบํารุงสถานที่
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6" style="border: 0">
                                และค่าประกันทรัพย์สินเสียหายประจําเดือน
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6" style="border: 0">
                                (เฉพาะอาคารบ้านพัก บช.ตชด. แยกตามสังกัด)
                              </td>
                            </tr>
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
                            <tr v-for="(item, index) in AffiliationListCTD" :key="index">
                              <th scope="row">{{ index + 1 }}</th>
                              <td>{{ item?.value || "-" }}</td>
                              <td data-t="n" data-z="#,##">
                                {{ numberWithCommas(item?.sumdataMaintenance || "-") }}
                              </td>
                              <td data-t="n" data-z="#,##">
                                {{ numberWithCommas(item?.sumdataInsurance || "-") }}
                              </td>
                              <td data-t="n" data-z="#,##">
                                {{ numberWithCommas(item?.sumCostdataInsurance || "-") }}
                              </td>
                            </tr>
                            <tr v-if="AffiliationListCTD.length > 0">
                              <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                              <th data-t="n" data-z="#,##">
                                {{
                                  numberWithCommas(
                                    AffiliationListCTD[0]?.countMaintenanceAll || "-"
                                  )
                                }}
                              </th>
                              <th data-t="n" data-z="#,##">
                                {{
                                  numberWithCommas(
                                    AffiliationListCTD[0]?.countInsuranceAll || "-"
                                  )
                                }}
                              </th>
                              <th data-t="n" data-z="#,##">
                                {{
                                  numberWithCommas(
                                    AffiliationListCTD[0]?.countCostSumAll || "-"
                                  )
                                }}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        v-if="reportType == 'ประกันทรัพย์สิน'"
                        class="text-center pt-4 table-responsive"
                      >
                        <div>
                          <table class="table table-bordered" id="table14">
                            <thead>
                              <tr>
                                <td colspan="7" style="border: 0">
                                  บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพักอิสระ บช.ตชด.
                                </td>
                              </tr>
                              <tr>
                                <td colspan="7" style="border: 0">
                                  ที่หักเงินเดือนเป็นค่าบํารุงรักษาสถานที่และค่าประกันทรัพย์สินเสียหาย
                                </td>
                              </tr>
                              <tr>
                                <td colspan="7" style="border: 0">
                                  ประจําเดือน {{ monthYearNowtable }}
                                  <span v-if="AffiliationLable !== ''">หน่วยงาน</span>
                                  {{ AffiliationLable || " " }}
                                </td>
                              </tr>
                              <tr>
                                <th rowspan="2">ลำดับ</th>
                                <th rowspan="2">ชื่อ-สกุล</th>
                                <th rowspan="2">อาคาร</th>
                                <th rowspan="2">เลขที่ห้อง</th>
                                <th rowspan="2">การหักเงินค่าบำรุงฯ</th>
                                <th colspan="3">การหักเงินค่าประกันฯ</th>
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
                                <td data-t="s"> {{ item?.roomnumber || "-"}}</td>
                                <td data-t="n" data-z="#,##">
                                  {{ numberWithCommas(item?.maintenance || "-") }}
                                </td>
                                <td data-t="n" data-z="#,##">
                                  {{ numberWithCommas(item?.accumulated || "-") }}
                                </td>
                                <td data-t="n" data-z="#,##">
                                  {{ numberWithCommas(item?.amountPaid || "-") }}
                                </td>
                                <td data-t="n" data-z="#,##">
                                  {{ item?.Installmenttime || "-" }}
                                </td>
                              </tr>

                              <tr v-if="reportlistCTD.length > 0">
                                <th scope="row" colspan="4">รวมเงิน</th>
                                <th data-t="n" data-z="#,##">
                                  {{
                                    numberWithCommas(
                                      reportlistCTD[0]?.MaintenanceSum || "-"
                                    )
                                  }}
                                </th>
                                <th data-t="n" data-z="#,##">
                                  {{
                                    numberWithCommas(
                                      reportlistCTD[0]?.accumulatedSum || "-"
                                    )
                                  }}
                                </th>
                                <th colspan="2" data-t="n" data-z="#,##">
                                  {{
                                    numberWithCommas(
                                      reportlistCTD[0]?.amountPaidSum || "-"
                                    )
                                  }}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-show="submenus == 'submenu2'">
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
                          @change="typeUserchange('บัญชีหน้างบ', 'table15')"
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
                          @change="typeUserchange('ประกันทรัพย์สิน', 'table16')"
                        />
                        <label class="form-check-label" for="typeUser24">
                          รายละเอียดการหักเงินค่าบํารุงสถานที่
                          และค่าประกันทรัพย์สินเสียหายประจําเดือน</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="typeUser44"
                          id="typeUser44"
                          value="หักไม่ได้"
                          :checked="reportType == 'หักไม่ได้'"
                          @change="typeUserchange('หักไม่ได้', 'table44')"
                        />
                        <label class="form-check-label" for="typeUser44">
                          รายชื่อผู้พักอาศัยที่ไม่สามารถหักเงินเดือน</label
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
                      <div
                        v-if="
                          reportType == 'ประกันทรัพย์สิน' || reportType == 'หักไม่ได้'
                        "
                        class="mb-3 w-20"
                      >
                        <label>สังกัด</label>
                        <v-select
                          :options="masterData?.AffiliationList"
                          v-model="selectedAffiliation"
                        ></v-select>
                      </div>

                      <div>
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfWaterBill()"
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfCentralTD()"
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
                        <MaterialButton
                          v-if="reportType == 'หักไม่ได้'"
                          size="lg"
                          class="btn-icon"
                          style="margin-right: -30px"
                          @click="exportPdfCentralTD()"
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
                        <MaterialButton
                          v-if="reportType == 'บัญชีหน้างบ'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table15')"
                        >
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
                        <MaterialButton
                          v-if="reportType == 'ประกันทรัพย์สิน'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table16')"
                        >
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
                        <MaterialButton
                          v-if="reportType == 'หักไม่ได้'"
                          size="lg"
                          class="btn-icon"
                          @click="ExportExcel('xlsx', 'table44')"
                        >
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
                    <table class="table table-bordered" id="table15">
                      <thead>
                        <tr>
                          <td colspan="6" style="border: 0">บัญชีหน้างบ</td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            การหักเงินเดือนเป็นค่าธรรมเนียม และค่าสาธารณูปโภค
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border: 0">
                            ประจําเดือน {{ monthYearTable }}
                          </td>
                        </tr>
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
                        <tr v-for="(item, index) in AffiliationListTD" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item?.value || "-" }}</td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdataMaintenancefee || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdatawaterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumdataelectricitybill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostdatawaterbill || "-") }}
                          </td>
                        </tr>
                        <tr v-if="AffiliationListTD?.length > 0">
                          <th scope="row" colspan="2">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countMaintenancefeeAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countwaterbilAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countelectricitybillAll || "-"
                              )
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(
                                AffiliationListTD[0]?.countCostwaterbillAll || "-"
                              )
                            }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    v-if="reportType == 'ประกันทรัพย์สิน'"
                    class="text-center pt-4 table-responsive"
                  >
                    <table class="table table-bordered" id="table16">
                      <thead>
                        <tr>
                          <td colspan="9" style="border: 0">
                            บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพัก ตร.ส่วนกลาง
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ที่หักเงินเดือนเป็นค่าธรรมเนียม และค่าสาธารณูปโภค
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ประจําเดือน {{ monthYearTable }}
                            <span v-if="AffiliationLable !== ''">หน่วยงาน</span>
                            {{ AffiliationLable || " " }}
                          </td>
                        </tr>
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
                          <td data-t="s">{{ item?.roomnumber || "-" }}</td>
                          <td>
                            {{ item?.rank }} {{ item?.firstName }}
                            {{ item?.lastName }}
                          </td>
                          <td>{{ item?.firstnumber || "-" }}</td>
                          <td>{{ item?.lastnumber || "-" }}</td>
                          <td>
                            {{
                              parseInt(item?.lastnumber || 0) -
                                parseInt(item?.firstnumber || 0) || "-"
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ parseInt(item?.maintenancefee || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.waterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.electricitybill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostwaterbill || "-") }}
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักได้'">/</span>
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                          </td>
                          <td>{{ item?.contractExpenses || "-" }}</td>
                        </tr>

                        <tr v-if="reportlistTD?.length > 0">
                          <th scope="row" colspan="6">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTD[0]?.maintenancefeeSum || "-")
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(reportlistTD[0]?.waterbillSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTD[0]?.electricitybillSum || "-")
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(reportlistTD[0]?.SumCostSumwater || "-")
                            }}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    v-if="reportType == 'หักไม่ได้'"
                    class="text-center pt-4 table-responsive"
                  >
                    <table class="table table-bordered" id="table44">
                      <thead>
                        <tr>
                          <td colspan="9" style="border: 0">
                            บัญชีรายชื่อผู้พักอาศัยที่ไม่สามารถหักเงินเดือนเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง
                            ตร.
                          </td>
                        </tr>
                        <tr>
                          <td colspan="9" style="border: 0">
                            ประจําเดือน {{ monthYearTable }}
                          </td>
                        </tr>
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
                        <tr v-for="(item, index) in deductibleTD" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td data-t="s">{{ item?.roomnumber || "-" }}</td>
                          <td>
                            {{ item?.rank }} {{ item?.firstName }}
                            {{ item?.lastName }}
                          </td>
                          <td>{{ item?.firstnumber || "-" }}</td>
                          <td>{{ item?.lastnumber || "-" }}</td>
                          <td>
                            {{
                              parseInt(item?.lastnumber || 0) -
                                parseInt(item?.firstnumber || 0) || "-"
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(parseInt(item?.maintenancefee || 0) || "-")
                            }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.waterbill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.electricitybill || "-") }}
                          </td>
                          <td data-t="n" data-z="#,##">
                            {{ numberWithCommas(item?.sumCostwaterbill || "-") }}
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักได้'">/</span>
                          </td>
                          <td>
                            <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                          </td>
                          <td>{{ item?.contractExpenses || "-" }}</td>
                        </tr>

                        <tr v-if="deductibleTD?.length > 0">
                          <th scope="row" colspan="6">รวมเงิน</th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(deductibleTD[0]?.maintenancefeeSum || "-")
                            }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(deductibleTD[0]?.waterbillSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{ numberWithCommas(deductibleTD[0]?.electricitybillSum || "-") }}
                          </th>
                          <th data-t="n" data-z="#,##">
                            {{
                              numberWithCommas(deductibleTD[0]?.SumCostSumwater || "-")
                            }}
                          </th>
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

nav.menu {
  --duration: 0.5s;
  --easing: ease-in-out;
  position: relative;
  /* width: 220px; */
  margin: 20px;
}
.textActive {
  color: #4cbb17 !important;
}
nav.menu ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
nav.menu li {
  margin: -4px 0 0 0;
}
nav.menu a {
  display: block;
  text-decoration: none;
  background: #fff;
  transform-origin: 0 0;
  transition: transform var(--duration) var(--easing), color var(--duration) var(--easing);
  transition-delay: var(--delay-out);
  border-radius: 4px;
  padding: 1em 1.52em;
}
nav.menu a:hover {
  background: #efefef;
}
nav.menu .sub-menu a {
  font-size: 0.9em;
  color: #666666;
  border-left: 2em solid white;
  padding: 0.75em;
  background: linear-gradient(to right, #dddddd 2px, #ffffff 2px);
}
nav.menu .sub-menu a:hover {
  background: linear-gradient(to right, #dddddd 2px, #efefef 2px);
}
</style>
