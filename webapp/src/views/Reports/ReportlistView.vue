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
      AffiliationList: [
        {
          name: "บช.ตชด.",
          fullname: "บช.ตชด.",
        },
        {
          name: "บก.อก.",
          fullname: "บก.อก.บช.ตชด.",
        },
        {
          label: "บก.สนน.",
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
      jsonData: [],
      jsonFiled: [],
      dateData: new Date(),
      mountNumber: 0,
      yearNumber: 0,
      tableId: "",
      typeReport: "ตร.",
      monthYear: "",
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
      if (newValue !== null && newValue.label !== undefined) {
        this.Affiliation = newValue.value;
        this.getReportAffiliation(this.mountNumber, this.yearNumber, this.Affiliation);
      }
    },
    selectedMonth: function (newValue) {
      if (newValue !== null && newValue.label !== undefined) {
        let x = this.optionMonth.findIndex((el) => el.label == newValue.label);
        let y = this.dateData.getFullYear();
        this.mountNumber = x + 1;
        this.yearNumber = y;
        const result = this.dateData.toLocaleDateString("th-TH", {
          year: "numeric",
        });
        this.monthYear = newValue.label + " " + this.thaiNumber(result);
        this.getReport(this.mountNumber, this.yearNumber);
      }
    },
  },
  methods: {
    typeChange(e) {
      this.typeReport = e;
    },

    async getM() {
      let m = this.dataMonth[this.dateData.getMonth() - 1];
      let y = this.dateData.getFullYear();
      let x = this.optionMonth.findIndex((el) => el.label == m);
      this.mountNumber = x + 1;
      this.yearNumber = y;
      let mm = this.dateData.getMonth();
      this.selectedMonth = m;
      const today = new Date();
      const month = today.getMonth();
      today.setMonth(month - 1);
      const result = today.toLocaleDateString("th-TH", {
        year: "numeric",
      });
      this.monthYear = m + " " + this.thaiNumber(result);
      await this.getReport(this.mountNumber, this.yearNumber);
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

    typeUserchange(e, id) {
      this.reportType = e;
      this.tableId = id;
    },

    getReport(m, y) {
      try {
        axios
          .get("http://localhost:3897/report")
          .then((res) => {
            let data = [];
            let data2 = [];

            let data3 = res.data;
            let data4 = res.data;
            this.reportList = res.data;
            data = data3.filter(
              (el) => el.typeUser == "บช.ตชด." && el.monthly == m && el.years == y
            );
            data2 = data4.filter(
              (el) => el.typeUser == "ตร." && el.monthly == m && el.years == y
            );
            console.log(data);
            this.mapData(data, data2);
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

    getReportAffiliation(m, y, Affiliation) {
      try {
        axios
          .get("http://localhost:3897/report")
          .then((res) => {
            let data = [];
            let data2 = [];
            let arr = [];
            let arr2 = [];
            let data3 = res.data;
            let data4 = res.data;
            this.reportList = res.data;

            data = data3.filter(
              (el) => el.typeUser == "บช.ตชด." && el.monthly == m && el.years == y
            );
            data2 = data4.filter(
              (ele2) => ele2.typeUser == "ตร." && ele2.monthly == m && ele2.years == y
            );

            arr = data.filter((ele) => ele.typeAffiliation === Affiliation);
            arr2 = data2.filter((el2) => el2.typeAffiliation === Affiliation);

            this.mapData(arr, arr2);
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

    async mapData(data, data2) {
      let arr = [];
      let arr2 = [];
      arr = await data.map((el, i) => {
        return {
          ...el,
          numberNo: i + 1,
          lastnumber: el.lastnumber || 0,
          numberfirst: el.numberfirst || 0,
          central: el.central || 0,
          typeAffiliation: el.typeAffiliation || "-",
          typeContract: el.typeContract || "-",
          contractExpenses: el.contractExpenses || "-",
          buildingName: el.buildingName || "-",
          maintenance: el.maintenance || 0,
          insurance: el.insurance || 0,
          accumulated: el.insurance / el.installments,
          amountPaidSum: this.AmountPaidSum(data),
          waterbillSum: this.WaterbillSum(data),
          electricitybillSum: this.ElectricitybillSum(data),
          fullname: (el.rank || "") + " " + el?.firstName + " " + el?.lastName,
          unitWater: el.lastnumber - el.numberfirst || 0,
          costs: el.costs || 0,
          centralSum: this.CentralSum(data),
          costsSum: this.CostsSum(data),
          InsuranceSum: this.InsuranceSum(data),
          MaintenanceSum: this.MaintenanceSum(data),
          accumulatedSum: this.AccumulatedSum(data),
          waterbill: el.waterbill || 0,
          electricitybill: el.electricitybill || 0,
          Installmenttime: this.checkMonth(el.dateApproved, el.installments),
        };
      });

      arr2 = await data2.map((el2, i) => {
        return {
          ...el2,
          numberNo: i + 1,
          lastnumber: el2.lastnumber || 0,
          numberfirst: el2.numberfirst || 0,
          central: el2.central || 0,
          typeAffiliation: el2.typeAffiliation || "-",
          accumulated: el2.insurance / el2.installments,
          typeContract: el2.typeContract || "-",
          contractExpenses: el2.contractExpenses || "-",
          buildingName: el2.buildingName || "-",
          costs: el2.costs || 0,
          insurance: el.insurance || 0,
          amountPaidSum: this.AmountPaidSum(data2),
          waterbillSum: this.WaterbillSum(data2),
          electricitybillSum: this.ElectricitybillSum(data2),
          fullname: (el2.rank || "") + " " + el2?.firstName + " " + el2?.lastName,
          unitWater: el2.lastnumber - el2.numberfirst || 0,
          maintenance: el2.maintenance || 0,
          centralSum: this.CentralSum(data2),
          costsSum: this.CostsSum(data2),
          InsuranceSum: this.InsuranceSum(data2),
          MaintenanceSum: this.MaintenanceSum(data2),
          accumulatedSum: this.AccumulatedSum(data2),
          waterbill: el2.waterbill || 0,
          electricitybill: el2.electricitybill || 0,
          Installmenttime: this.checkMonth(el2.dateApproved, el2.installments),
        };
      });
      await this.mapdataSum(arr, arr2);
    },

    checkMonth(index, installments) {
      var d = new Date(index);
      var newDate = d.setMonth(d.getMonth() + parseInt(installments));
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

    checkTypeContract(index) {
      if (index.typeContract == "หักได้") return "/";
      else if (index.typeContract == "หักไม่ได้") return "/";
      else return "-";
    },

    async mapdataSum(data, data2) {
      let arr = [];
      let arr2 = [];
      arr = await data.map((el) => {
        return {
          ...el,
          typeContractYes: this.checkTypeContract(el),
          typeContractNo: this.checkTypeContract(el),
          sumCostwaterbill: this.countSumWaterbill(el),
          sumCostCentral: this.countSumcentral(el),
          sumCostCosts: this.countSumcosts(el),
          sumCostnsurance: this.countSumInsurance(el),
        };
      });
      arr2 = await data2.map((el2) => {
        return {
          ...el2,
          typeContractYes: this.checkTypeContract(el2),
          typeContractNo: this.checkTypeContract(el2),
          sumCostwaterbill: this.countSumWaterbill(el2),
          sumCostCentral: this.countSumcentral(el2),
          sumCostCosts: this.countSumcosts(el2),
          sumCostnsurance: this.countSumInsurance(el2),
        };
      });
      this.mapdataSumTable(arr, arr2);
    },

    async mapdataSumTable(data, data2) {
      let arr = [];
      let arr2 = [];
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
      this.mapDataComma(arr,arr2)
    },

   async mapDataComma(data, data2){
      let arr3 = [];
      let arr4 = [];
      arr3 = await data.map((el2) => {
        return {
          ...el2,
          SumCostSumInsurance: this.numberWithCommas(el2.SumCostSumInsurance)|| 0,
          SumCostSumCentral: this.numberWithCommas(el2.SumCostSumCentral)|| 0,
          SumCostSumwater: this.numberWithCommas(el2.SumCostSumwater)|| 0,
          SumCostSumCosts: this.numberWithCommas(el2.SumCostSumCosts)|| 0,
          sumCostwaterbill: this.numberWithCommas(el2.sumCostwaterbill)|| 0,
          sumCostCentral: this.numberWithCommas(el2.sumCostCentral)|| 0,
          sumCostCosts: this.numberWithCommas(el2.sumCostCosts)|| 0,
          sumCostnsurance: this.numberWithCommas(el2.sumCostnsurance)|| 0,
          central: this.numberWithCommas(el2.central) || 0,
          costs: this.numberWithCommas(el2.costs) || 0,
          amountPaidSum: this.numberWithCommas(el2.amountPaidSum)|| 0,
          waterbillSum: this.numberWithCommas(el2.waterbillSum)|| 0,
          electricitybillSum: this.numberWithCommas(el2.electricitybillSum)|| 0,
          maintenance: this.numberWithCommas(el2.maintenance) || 0,
          insurance: this.numberWithCommas(el2.insurance) || 0,
          centralSum: this.numberWithCommas(el2.centralSum)|| 0,
          costsSum: this.numberWithCommas(el2.costsSum)|| 0,
          InsuranceSum: this.numberWithCommas(el2.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el2.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el2.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(el2.waterbill )|| 0,
          electricitybill:  this.numberWithCommas(el2.electricitybill) || 0,
        };
      });
      arr4 = await data2.map((el3) => {
        return {
          ...el3,
          SumCostSumInsurance: this.numberWithCommas(el3.SumCostSumInsurance)|| 0,
          SumCostSumCentral: this.numberWithCommas(el3.SumCostSumCentral)|| 0,
          SumCostSumwater: this.numberWithCommas(el3.SumCostSumwater)|| 0,
          SumCostSumCosts: this.numberWithCommas(el3.SumCostSumCosts)|| 0,
          sumCostwaterbill: this.numberWithCommas(el3.sumCostwaterbill)|| 0,
          sumCostCentral: this.numberWithCommas(el3.sumCostCentral)|| 0,
          sumCostCosts: this.numberWithCommas(el3.sumCostCosts)|| 0,
          sumCostnsurance: this.numberWithCommas(el3.sumCostnsurance)|| 0,
          central: this.numberWithCommas(el3.central) || 0,
          costs: this.numberWithCommas(el3.costs) || 0,
          insurance: this.numberWithCommas(el2.insurance) || 0,
          amountPaidSum: this.numberWithCommas(el3.amountPaidSum)|| 0,
          waterbillSum: this.numberWithCommas(el3.waterbillSum)|| 0,
          electricitybillSum: this.numberWithCommas(el3.electricitybillSum)|| 0,
          maintenance: this.numberWithCommas(el3.maintenance) || 0,
          centralSum: this.numberWithCommas(el3.centralSum)|| 0,
          costsSum: this.numberWithCommas(el3.costsSum)|| 0,
          InsuranceSum: this.numberWithCommas(el3.InsuranceSum) || 0,
          MaintenanceSum: this.numberWithCommas(el3.MaintenanceSum) || 0,
          accumulatedSum: this.numberWithCommas(el3.accumulatedSum) || 0,
          waterbill: this.numberWithCommas(el3.waterbill )|| 0,
          electricitybill:  this.numberWithCommas(el3.electricitybill) || 0,
        };
      });
      this.reportlistCTD = arr3;
      this.reportlistTD = arr4;
    },
    // numberWithCommas

    ExportExcel(type, tableId, fn, dl) {
      var elt = document.getElementById(tableId);
      var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });

      return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(wb, fn || "ExportFile." + (type || "xlsx"));
    },

    countSumWaterbill(item) {
      return (
        parseInt(item.maintenance) +
          parseInt(item.waterbill) +
          parseInt(item.electricitybill) || 0
      );
    },

    countSumcentral(item) {
      return (
        parseInt(item.maintenance) + parseInt(item.waterbill) + parseInt(item.central) ||
        0
      );
    },

    countSumcosts(item) {
      return parseInt(item.central) + parseInt(item.costs) || 0;
    },

    countSumInsurance(item) {
      return parseInt(item.maintenance) + parseInt(item.insurance) || 0;
    },

    // insuranceCount(items) {
    //   return items.reduce((insuranceSum, ele) => {
    //     if (ele.insurance !== undefined) return amountPaidSum + parseInt(ele.insurance);
    //     else return insuranceSum;
    //   }, 0);
    // },

    // insuranceCount(items) {
    //   return items.reduce((insuranceSum, ele) => {
    //     if (ele.insurance !== undefined) return amountPaidSum + parseInt(ele.insurance);
    //     else return insuranceSum;
    //   }, 0);
    // },

    insuranceCount(items) {
      return items.reduce((insuranceSum, ele) => {
        if (ele.insurance !== undefined) return amountPaidSum + parseInt(ele.insurance);
        else return insuranceSum;
      }, 0);
    },

    AmountPaidSum(items) {
      return items.reduce((amountPaidSum, ele) => {
        if (ele.amountPaid !== undefined) return amountPaidSum + parseInt(ele.amountPaid);
        else return amountPaidSum;
      }, 0);
    },

    AccumulatedSum(items) {
      return items.reduce((accumulatedSum, ele) => {
        if (ele.insurance !== undefined && ele.installments !== undefined)
          return accumulatedSum + parseInt(ele.insurance) / parseInt(ele.installments);
        else return accumulatedSum;
      }, 0);
    },

    WaterbillSum(items) {
      return items.reduce((waterbillSum, ele) => {
        if (ele.waterbill !== undefined) return waterbillSum + parseInt(ele.waterbill);
        else return waterbillSum;
      }, 0);
    },
    ElectricitybillSum(items) {
      return items.reduce((electricitybillSum, ele) => {
        if (ele.electricitybill !== undefined)
          return electricitybillSum + parseInt(ele.electricitybill);
        else return electricitybillSum;
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

    CentralSum(items) {
      return items.reduce((centralSum, ele) => {
        if (ele.central !== undefined) return centralSum + parseInt(ele.central);
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
        if (ele.maintenance !== undefined)
          return MaintenanceSum + parseInt(ele.maintenance);
        else return MaintenanceSum;
      }, 0);
    },
    thaiNumber(num) {
      let convertNumber = this.numberWithCommas(num)
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},
    Previous() {
      window.history.back();
    },

    buildTableBodyinsurance(data, columns) {
      var body = [];
      let arr = [];
      console.log(data);
      var thaiNum = data.map((e) => {
        return {
          ...e,
          numberNo: this.thaiNumber(e.numberNo),
          MaintenanceSum: this.thaiNumber(e.MaintenanceSum),
          InsuranceSum: this.thaiNumber(e.InsuranceSum),
          SumCostSumInsurance: this.thaiNumber(e.SumCostSumInsurance),
          sumCostnsurance: this.thaiNumber(e.sumCostnsurance),
          maintenance: this.thaiNumber(e.maintenance),
          insurance: this.thaiNumber(e.insurance),
        };
      });
      console.log(thaiNum);
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          { text: thaiNum[0].MaintenanceSum, style: "header", alignment: "center" },
          { text: thaiNum[0].InsuranceSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumInsurance, style: "header", alignment: "center" },
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
        body.push(dataRow);
      });
      // this.jsonFiled = body,
      arr = body.concat(footer);
      return arr;
    },

    tableInsurance(data, columns) {
      return {
        table: {
          widths: [100, "*", 100, "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyinsurance(data, columns),
        },
      };
    },

    exportPdfinsurance() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;
      console.log(listData);
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
              text:
                "สรุปยอดหักค่าบํารุงสถานที่",
              style: "header",
              alignment: "center",
            },
            {
              text:
                "และค่าประกันทรัพย์สินเสียหายประจําเดือน",
              style: "header",
              alignment: "center",
            },
            { text: `(เฉพาะอาคารบ้านพัก ${this.typeReport} แยกตามสังกัด)`, style: "subheader", alignment: "center" },
            this.tableInsurance(listData, [
              "numberNo",
              "typeAffiliation",
              "maintenance",
              "insurance",
              "sumCostnsurance",
            ]),
          ],
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodywaterBill(data, columns) {
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
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          { text: thaiNum[0].MaintenanceSum, style: "header", alignment: "center" },
          { text: thaiNum[0].waterbillSum, style: "header", alignment: "center" },
          { text: thaiNum[0].electricitybillSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumwater, style: "header", alignment: "center" },
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
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tablewaterBill(data, columns) {
      return {
        table: {
          widths: [50, "*", "*", "*", "*", 100],
          headerRows: 2,
          body: this.buildTableBodywaterBill(data, columns),
        },
      };
    },

    exportPdfWaterBill() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;
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
            { text: "Dynamic parts", style: "header" },
            this.tablewaterBill(listData, [
              "numberNo",
              "typeAffiliation",
              "maintenance",
              "waterbill",
              "electricitybill",
              "sumCostwaterbill",
            ]),
          ],
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
          { text: thaiNum[0].MaintenanceSum, style: "header", alignment: "center" },
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

    tableCentral(data, columns) {
      return {
        table: {
          widths: [20, 50, "*", 30, 30, 30, 30, 30, 30, 30, 20, 20, 50],
          headerRows: 2,
          body: this.buildTableBodyCentral(data, columns),
        },
      };
    },

    exportPdfCentral() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;
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
            // {
            //   text:
            //     "บัญชีรายชื่อผู้พักอาศัยที่ไม่สามารถหักเงินเดือนเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง ตร",
            //   style: "header",
            //   alignment: "center",
            // },
            // { text: "ประจำเดือน เมษายน 2566", style: "subheader", alignment: "center" },
            this.tableCentral(listData, [
              "numberNo",
              "roomnumber",
              "fullname",
              "numberfirst",
              "lastnumber",
              "unitWater",
              "maintenance",
              "waterbill",
              "central",
              "sumCostCentral",
              "typeContractYes",
              "typeContractNo",
              "contractExpenses",
            ]),
          ],
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyCosts(data, columns) {
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
          maintenance: this.thaiNumber(e.maintenance),
          waterbill: this.thaiNumber(e.waterbill),
          electricitybill: this.thaiNumber(e.electricitybill),
          central: this.thaiNumber(e.central),
          sumCostCentral: this.thaiNumber(e.sumCostCentral),
          centralSum: this.thaiNumber(e.centralSum),
          SumCostSumCentral: this.thaiNumber(e.SumCostSumCentral),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 2, style: "header", alignment: "center" },
          "",
          { text: thaiNum[0].centralSum, style: "header", alignment: "center" },
          { text: thaiNum[0].costsSum, style: "header", alignment: "center" },
          { text: thaiNum[0].SumCostSumCosts, style: "header", alignment: "center" },
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
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableCosts(data, columns) {
      return {
        table: {
          widths: [30, "*", "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyCosts(data, columns),
        },
      };
    },

    exportPdfCosts() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;
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
            { text: "Dynamic parts", style: "header" },
            this.tableCosts(listData, [
              "numberNo",
              "typeAffiliation",
              "central",
              "costs",
              "sumCostCosts",
            ]),
          ],
          defaultStyle: {
            font: "THSarabunNew",
          },
        };
        pdfMake.createPdf(docDefinition).open();
      }
    },

    buildTableBodyAccumulated(data, columns) {
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
          roomnumber: this.thaiNumber(e.roomnumber),
          Installmenttime: this.thaiNumber(e.Installmenttime),
        };
      });
      var footer = [
        [
          { text: "รวมเงิน", colSpan: 4, style: "header", alignment: "center" },
          "",
          "",
          "",
          "",
          { text: thaiNum[0].MaintenanceSum, style: "header", alignment: "center" },
          { text: thaiNum[0].accumulatedSum, style: "header", alignment: "center" },
          { text: thaiNum[0].amountPaidSum, style: "header", alignment: "center" },
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
        body.push(dataRow);
      });
      arr = body.concat(footer);
      return arr;
    },

    tableAccumulated(data, columns) {
      return {
        table: {
          // widths: [30, "*", "*", "*", "*"],
          headerRows: 2,
          body: this.buildTableBodyAccumulated(data, columns),
        },
      };
    },

    exportPdfAccumulated() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;

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
            { text: "Dynamic parts", style: "header" },
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
        table: {
          widths: [20, 50, "*", 30, 30, 30, 30, 30, 30, 50, 50],
          headerRows: 2,
          body: this.buildTableBodyCostCentral(data, columns),
        },
      };
    },

    exportPdfCostCentral() {
      let listData = []
      if (this.typeReport == "ตร.") listData = this.reportListTD;
      else if (this.typeReport == "บช.ตชด.") listData = this.reportlistCTD;
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
            // {
            //   text:
            //     "บัญชีรายชื่อผู้พักอาศัยที่ไม่สามารถหักเงินเดือนเป็นค่าธรรมเนียมและค่าสาธารณูปโภคในอาคารบ้านพักส่วนกลาง ตร",
            //   style: "header",
            //   alignment: "center",
            // },
            // { text: "ประจำเดือน เมษายน 2566", style: "subheader", alignment: "center" },
            this.tableCostCentral(listData, [
              "numberNo",
              "buildingName",
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
          <!-- <a @click="exportPdfCostCentral">kkkkkkk</a> -->
          <div class="mb-3">
            <a
              style="display: flex; align-items: center; cursor: pointer"
              @click="Previous"
            >
              <span class="material-icons"> arrow_back_ios_new </span>
              <span>ย้อนกลับ</span>
            </a>
          </div>
          <h4>ระบบเรียกรายงาน ประจำเดือน {{ selectedMonth?.label || selectedMonth }}</h4>
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
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  บัญชียอดหักค่าไฟฟ่าส่วนกลาง และค่าบํารุงลิฟต์เพิ่มเติมประจําเดือน
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
                  บัญชีถอนค่าไฟฟ่าส่วนกลาง และค่าบํารุงลิฟต์เพิ่มเติมประจําเดือน
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
                  บัญชีสรุป ยอดเงิน แยกตามบ้านพัก ของ ตร. กับ บช.ตชด.
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
                  ตร.
                </button>
                <button
                  class="nav-link"
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
              </div>
            </div>
            <div class="col-lg-9">
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div>
                    <div>
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
                          <div class="mb-3 w-20">
                            <label>สังกัด</label>
                            <v-select
                              :options="masterData?.AffiliationList"
                              v-model="selectedAffiliation"
                            ></v-select>
                          </div>

                          <div>
                            <!-- <MaterialButton
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
                            </MaterialButton> -->
                            <MaterialButton
                              size="lg"
                              class="btn-icon"
                              @click="ExportExcel('xlsx', 'table1')"
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
                      <div class="text-center pt-4 table-responsive">
                        <table class="table table-bordered" id="table1">
                          <thead>
                            <tr>
                              <td colspan="6" style="border: 0">
                                รายละเอียดการหักเงิน ค่าบำรุงฯ ค่าประกันฯ
                                ผู้ได้สิทธิพักอาศัยบ้านพัก บช.ตชด.
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6" style="border: 0">
                                และค่าสาธารณูปโภค ผู้ได้สิทธิพักอาศัยบ้านพักส่วนกลาง ตร.
                                (อก.)
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6" style="border: 0">
                                ประจําเดือน {{ monthYear }}
                              </td>
                            </tr>
                          </thead>
                          <!-- reportlistCTD -->
                          <tbody v-for="(item, index) in reportlistCTD" :key="index">
                            <tr>
                              <th scope="row">{{ index + 1 }}</th>
                              <td>{{ item?.idcard || "-" }}</td>
                              <td>{{ item?.fullname || "-" }}</td>
                              <td>{{ item?.amountPaidSum || "-" }}</td>
                              <td>{{ item?.amountPaidSum || "-" }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show active"
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
                        <div class="mb-3 w-20">
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
                            <td colspan="6" style="border: 0">
                              การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง
                              และค่าบำรุงลิฟต์เพิ่มเติม
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ประจําเดือน {{ monthYear }}
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
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCostwaterbill || "-" }}</td>
                          </tr>
                          <tr v-if="reportlistTD?.length > 0">
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>{{ reportlistTD[0]?.MaintenanceSum }}</th>
                            <th>{{ reportlistTD[0]?.waterbillSum }}</th>
                            <th>{{ reportlistTD[0]?.electricitybillSum }}</th>
                            <th>{{ reportlistTD[0]?.SumCostSumwater }}</th>
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
                              ประจําเดือน {{ monthYear }} หน่วยงาน บช.ตชด.
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
                          <tr v-for="(item, index) in reportlistCTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.roomnumber }}</td>
                            <td>
                              {{ item?.rank }} {{ item?.firstName }}
                              {{ item?.lastName }}
                            </td>
                            <td>{{ item?.numberfirst || "-" }}</td>
                            <td>{{ item?.lastnumber || "-" }}</td>
                            <td>{{ item?.lastnumber - item?.numberfirst || "-" }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.sumCostCentral || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses }}</td>
                          </tr>
                          <tr v-if="reportlistCTD?.length > 0">
                            <th scope="row" colspan="6">รวมเงิน</th>
                            <th>{{ reportlistCTD[0]?.MaintenanceSum }}</th>
                            <th>{{ reportlistCTD[0]?.waterbillSum }}</th>
                            <th>{{ reportlistCTD[0]?.centralSum }}</th>
                            <th>{{ reportlistCTD[0]?.SumCostSumCentral }}</th>
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
                        <div class="mb-3 w-20">
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
                            <td colspan="6" style="border: 0">
                              การหักเงินเดือนเป็นค่าไฟฟ้าส่วนกลาง
                              และค่าบํารุงลิฟต์เพิ่มเติม
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ผู้ได้สิทธิพักอาศัยในอาคารบ้านพักส่วนกลาง ตร.
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ประจําเดือน {{ monthYear }}
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
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>{{ item?.central || "-" }}</td>
                            <td>{{ item?.costs || "-" }}</td>
                            <td>{{ item?.sumCostCosts || "-" }}</td>
                          </tr>
                          <tr v-if="reportlistTD?.length > 0">
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>{{ reportlistTD[0]?.centralSum }}</th>
                            <th>{{ reportlistTD[0]?.costsSum }}</th>
                            <th>{{ reportlistTD[0]?.SumCostSumCosts }}</th>
                          </tr>
                        </tbody>
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
                              ประจําเดือน {{ monthYear }} หน่วยงาน บช.ตชด.
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
                          <tr v-for="(item, index) in reportlistCTD" :key="index">
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
                            <td>{{ item?.sumCostCosts || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>
                          <tr v-if="reportlistCTD?.length > 0">
                            <th scope="row" colspan="5">รวมเงิน</th>
                            <th>{{ reportlistCTD[0]?.centralSum }}</th>
                            <th>{{ reportlistCTD[0]?.costsSum }}</th>
                            <th>{{ reportlistCTD[0]?.SumCostSumCosts }}</th>
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
                          <MaterialButton
                            v-if="reportType == 'ประกันทรัพย์สิน'"
                            size="lg"
                            class="btn-icon"
                            @click="ExportExcel('xlsx', 'table10')"
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
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered" id="table9">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ยอดเงินค่าบํารุงฯ, ค่าประกันฯ อาคารบ้านพักอิระ บช.ตชด.
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">เดือน {{ monthYear }}</td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าบํารุงฯ</th>
                            <th>ค่าประกันฯ</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistCTD" :key="index">
                            <td>{{ item?.typeAffiliation || "-" }}</td>
                            <td>{{ item?.MaintenanceSum || "-" }}</td>
                            <td>{{ item?.InsuranceSum || "-" }}</td>
                            <td>{{ item?.sumCostwaterbill || "-" }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered" id="table10">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              ยอดเงินค่าธรรมเนียม และค่าสาธารณูปโภค อาคารบ้านพัก
                              ตร.ส่วนกลาง
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">เดือน {{ monthYear }}</td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าธรรมเนียม</th>
                            <th>ค่าน้ําประปา</th>
                            <th>ค่าไฟฟ้า</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <td>{{ item?.buildingName || "-" }}</td>
                            <td>{{ item?.roomnumber }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.amountPaid || "-" }}</td>
                            <td>{{ item?.Installmenttime || "-" }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered" id="table10">
                        <thead>
                          <tr>
                            <td colspan="6" style="border: 0">
                              รายการหักเพิ่มเติม
                              ค่าไฟฟ้าส่วนกลาง/ค่าบํารุงลิฟต์อาคารบ้านพัก ตร.ส่วนกลาง
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6" style="border: 0">เดือน {{ monthYear }}</td>
                          </tr>
                          <tr>
                            <th>หน่วยงาน</th>
                            <th>ค่าไฟฟ้าส่วนกลาง</th>
                            <th>ค่าบํารุงลิฟต์</th>
                            <th>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <td>{{ item?.buildingName || "-" }}</td>
                            <td>{{ item?.centralSum }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.amountPaid || "-" }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center pt-4 table-responsive">
                      <table class="table table-bordered" id="table10">
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
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <td>{{ item?.buildingName || "-" }}</td>
                            <td>{{ item?.roomnumber }}</td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.Installmenttime || "-" }}</td>
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
                            @click="typeChange('ตร')"
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
                            @click="typeChange('บช.ตชด.')"
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
                                    @change="typeUserchange('บัญชีหน้างบ', 'table11')"
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
                                    @change="typeUserchange('ประกันทรัพย์สิน', 'table12')"
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
                                    @click="ExportExcel('xlsx', 'table11')"
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
                                    @click="ExportExcel('xlsx', 'table12')"
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
                              <table class="table table-bordered" id="table11">
                                <thead>
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
                                      (เฉพาะอาคารบ้านพัก ตร. แยกตามสังกัด)
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
                                  <tr v-for="(item, index) in reportlistTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item?.typeAffiliation || "-" }}</td>
                                    <td>{{ item?.maintenance || "-" }}</td>
                                    <td>{{ item?.insurance || "-" }}</td>
                                    <td>{{ item?.sumCostnsurance || "-" }}</td>
                                  </tr>
                                  <tr v-if="reportlistCTD.length > 0">
                                    <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                                    <th>{{ reportlistTD[0]?.MaintenanceSum }}</th>
                                    <th>{{ reportlistTD[0]?.InsuranceSum }}</th>
                                    <th>{{ reportlistTD[0]?.SumCostSumInsurance }}</th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div
                              v-if="reportType == 'ประกันทรัพย์สิน'"
                              class="text-center pt-4 table-responsive"
                            >
                              <table class="table table-bordered" id="table12">
                                <thead>
                                  <tr>
                                    <td colspan="7" style="border: 0">
                                      บัญชีรายชื่อผู้พักอาศัยในอาคารบ้านพักอิสระ ตร.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="7" style="border: 0">
                                      ที่หักเงินเดือนเป็นค่าบํารุงรักษาสถานที่และค่าประกันทรัพย์สินเสียหาย
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="7" style="border: 0">
                                      ประจําเดือน {{ monthYear }} หน่วยงาน ตร.
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
                                      {{ item?.accumulated || "-" }}
                                    </td>
                                    <td>{{ item?.amountPaid || "-" }}</td>
                                    <td>{{ item?.Installmenttime || "-" }}</td>
                                  </tr>

                                  <tr v-if="reportlistTD?.length > 0">
                                    <th scope="row" colspan="4">รวมเงิน</th>
                                    <th>{{ reportlistTD[0]?.MaintenanceSum }}</th>
                                    <th>{{ reportlistTD[0]?.accumulatedSum }}</th>
                                    <th colspan="2">
                                      {{ reportlistTD[0]?.amountPaidSum }}
                                    </th>
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
                                <div class="mb-3 w-20">
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
                                  <tr v-for="(item, index) in reportlistCTD" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item?.typeAffiliation || "-" }}</td>
                                    <td>{{ item?.maintenance || "-" }}</td>
                                    <td>{{ item?.insurance || "-" }}</td>
                                    <td>{{ item?.sumCostnsurance || "-" }}</td>
                                  </tr>
                                  <tr v-if="reportlistCTD.length > 0">
                                    <th scope="row" colspan="2">รวมยอดส่งหัก</th>
                                    <th>{{ reportlistCTD[0]?.MaintenanceSum }}</th>
                                    <th>{{ reportlistCTD[0]?.InsuranceSum }}</th>
                                    <th>{{ reportlistCTD[0]?.SumCostSumInsurance }}</th>
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
                                        ประจําเดือน {{ monthYear }} หน่วยงาน บช.ตชด.
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
                                    <tr
                                      v-for="(item, index) in reportlistCTD"
                                      :key="index"
                                    >
                                      <th scope="row">{{ index + 1 }}</th>
                                      <td>
                                        {{ item?.rank }} {{ item?.firstName }}
                                        {{ item?.lastName }}
                                      </td>
                                      <td>{{ item?.buildingName || "-" }}</td>
                                      <td>{{ item?.roomnumber || "-" }}</td>
                                      <td>{{ item?.maintenance || "-" }}</td>
                                      <td>
                                        {{ item?.accumulated || "-" }}
                                      </td>
                                      <td>{{ item?.amountPaid || "-" }}</td>
                                      <td>{{ item?.Installmenttime || "-" }}</td>
                                    </tr>

                                    <tr v-if="reportlistCTD.length > 0">
                                      <th scope="row" colspan="4">รวมเงิน</th>
                                      <th>{{ reportlistCTD[0].MaintenanceSum }}</th>
                                      <th>{{ reportlistCTD[0]?.accumulatedSum }}</th>
                                      <th>{{ reportlistCTD[0]?.amountPaidSum }}</th>
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
                            :options="masterData?.AffiliationListn"
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
                              ประจําเดือน {{ monthYear }}
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
                          <tr v-for="(item, index) in reportlistTD" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                              {{ item?.typeAffiliation || "-" }}
                            </td>
                            <td>{{ item?.maintenance || "-" }}</td>
                            <td>{{ item?.waterbill || "-" }}</td>
                            <td>{{ item?.electricitybill || "-" }}</td>
                            <td>{{ item?.sumCostwaterbill || "-" }}</td>
                          </tr>

                          <tr v-if="reportlistTD?.length > 0">
                            <th scope="row" colspan="2">รวมเงิน</th>
                            <th>{{ reportlistTD[0]?.MaintenanceSum }}</th>
                            <th>{{ reportlistTD[0]?.waterbillSum }}</th>
                            <th>{{ reportlistTD[0]?.electricitybillSum }}</th>
                            <th>{{ reportlistTD[0]?.SumCostSumwater }}</th>
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
                              ประจําเดือน {{ monthYear }} หน่วยงาน บช.ตชด.
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
                          <tr v-for="(item, index) in reportlistCTD" :key="index">
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
                            <td>{{ item?.sumCostCentral || "-" }}</td>
                            <td>
                              <span v-if="item?.typeContract == 'หักได้'">/</span>
                            </td>
                            <td>
                              <span v-if="item?.typeContract == 'หักไม่ได้'">/</span>
                            </td>
                            <td>{{ item?.contractExpenses || "-" }}</td>
                          </tr>

                          <tr v-if="reportlistCTD?.length > 0">
                            <th scope="row" colspan="6">รวมเงิน</th>
                            <th>{{ reportlistCTD[0]?.MaintenanceSum }}</th>
                            <th>{{ reportlistCTD[0]?.waterbillSum }}</th>
                            <th>{{ reportlistCTD[0]?.centralSum }}</th>
                            <th>{{ reportlistCTD[0]?.SumCostSumCentral }}</th>
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
