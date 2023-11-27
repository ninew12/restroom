<script>
//image
import vueMkHeader from "@/assets/img/bg.jpg";
//material components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
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
      selectedColor: "",
      statusedit: false,
      mode: "",
      id: "",
      options: [
        { label: "มานพ", value: "มานพ" },
        { label: "วิชัย", value: "วิชัย" },
        { label: "ธนาพร", value: "ธนาพร" },
        { label: "มนตรี", value: "มนตรี" },
      ],
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
      selectedColor: "",
      firstName: "",
      lastName: "",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "",
      phone: "",
      old: "",
      birthday: "",
      installments: "",
      booknumber: "",
      typeroom: "",
      data: "",
      queueList: [],
      queuefilter: [],
      statusRoom: "",
      dateApproved: "",
      userList: [],
      selectedUser: "เลือกผู้พักอาศัย",
      typeUser: "บช.ตชด.",
      typeUserBytype: "",
      typeUserByrankr: "",
      typeAffiliation: "",
      typeRanks: "",
      queue: "",
      selectedDataObtion: "โสด",
      selectedRanks: "",
      selectedAffiliation: "",
      dateApp: new Date(),
      numberRoom: "",
      roomId: "",
      maintenanceFix: "",
      userByid: "",
      reportId: "",
      reportType: "",
      bookNumber: "",
      contract: "",
      vehicleNumber: "",
      numberPeople: "",
    };
  },
  created() {
    this.mode = this.$route.query.mode;
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getroomByid(this.id);
    }
    this.getAllinqueue();
    this.getMonths();
  },
  watch: {
    selectedUser: function (newValue) {
      if (newValue !== null) this.getAllusersByid(newValue.value);
    },
  },
  methods: {
    gotoAction() {
      this.$router.push({ path: `/room/update/${this.id}`, query: { mode: this.mode } });
    },
    getAllqueue() {
      try {
        axios
          .get(`http://localhost:3897/queue/inqueue`)
          .then((res) => {
            this.queueList = res.data;
            this.queuefilter = this.queueList.filter((e) => e.typeRoom === this.typeroom);

          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getAllinqueue() {
      try {
        axios
          .get(`http://localhost:3897/users`)
          .then((res) => {
            let arr = res.data;
            let arr2 = [];
            arr2 = arr.filter((e) => e.typeUser == "บช.ตชด." && e.queue !== "inroom");
            this.userList = arr2.map((ele) => {
              return {
                label: ele.rank + " " + ele.firstName + " " + ele.lastName,
                value: ele.id,
              };
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getAllusersByid(id) {
      this.userId = id;
      try {
        axios
          .get(`http://localhost:3897/users/${id}`)
          .then((res) => {
            this.getreportByid(id);
            let data = res.data;
            this.userByid = res.data;
            if (data.typeRanks == "ประทวน") this.maintenanceFix = "60";
            if (data.typeRanks == "สัญญาบัตร") this.maintenanceFix = "100";
              this.userId = id,
              this.firstName = data.firstName,
              this.lastName = data.lastName,
              this.affiliation = data.affiliation,
              this.rank = data.rank,
              this.idcard = data.idcard,
              this.phone = data.phone,
              this.rankNumber = data.rankNumber,
              this.status = data.status,
              this.typeAffiliation = data.typeAffiliation,
              this.typeRanks = data.typeRanks,
              this.typeRoom = data.typeRoom;
              this.typeUser = data.typeUser;
              this.contract = data.contract;
              this.bookNumber = data.bookNumber;
              this.vehicleNumber = data.vehicleNumber
              this.numberPeople = data.numberPeople
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getroomByid(id) {
      try {
        axios.get(`http://localhost:3897/rooms/${id}`).then((res) => {
          this.data = res.data;
          this.dateApproved = this.convertDateTolocal(this.data.dateApproved);
          this.typeroom = this.data.typeRoom;
          this.numberRoom = this.data.numberRoom;
          this.roomId = this.data.id;
          this.buildingName = this.data.name;
          this.Affiliation = this.data.affiliation;
          if (this.data.userId) {
            this.getAllusersByid(this.data.userId);
          }
          if (this.data.roomStatus == "return") this.statusRoom = "ผ่อนผัน";
          if (this.data.roomStatus == "special") this.statusRoom = "กรณีพิเศษ";
          if (this.data.roomStatus == "waiting") this.statusRoom = "ชำรุด";
          if (this.data.roomStatus == "unavailable") this.statusRoom = "ไม่ว่าง";
          if (this.data.roomStatus == "free") this.statusRoom = "ว่าง";
          this.data["maintenanceCost"] = this.countinsamaintenance(this.data);
          this.getAllqueue();
        });
      } catch (e) {
        console.error(e);
      }
    },

    async getreportByid(id) {
      try {
        await axios
          .get(`http://localhost:3897/reportId/${id}`)
          .then((res) => {
            if (res.data !== "") this.reportId = res.data.id;
            let data = res.data;
            if (data !== "" && data !== undefined) {
              this.reportType = "havedata";
            } else {
              this.reportType = "none";
            }
            this.reportId = res.data.id;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    convertDateTolocal(index) {
      if (index !== undefined && index !== "") {
        const date = new Date(index);
        var today = new Date();
        var dd = String(date.getDate()).padStart(2, "0");
        var mm = String(date.getMonth() + 1).padStart(2, "0");
        var yyyy = date.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        return today;
      } else {
        return "";
      }
    },

    getMonths() {
      const d = new Date();
      let m = this.optionMonth[d.getMonth()];
      let y = d.getFullYear();
      this.months = d.getMonth();
      this.years = y;
    },

    countinsamaintenance(e) {
      let a = e.insurance / e.installments; // จำนวนเงินต่องวด
      let c = e.insurance - e.amountPaid; // จำนวนเงินคงเหลือ
      let b = c / a; //จำนวนงวดคงเหลือ
      return b || 0;
    },

    async submitForm(index) {
      let body = {
        queue: "inroom",
        affiliation: this.Affiliation,
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.Maintenance,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        roomId: this.roomId,
        roomnumber: this.numberRoom,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
        dateApproved: this.dateApp.toISOString(),
      };
      await axios
        .post(`http://localhost:3897/history`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (this.reportType == "havedata") {
            this.editToreport();
          } else if (this.reportType == "none") {
            this.submitForm2();
          }

          this.submitForm3();
          this.submitFormUser();
          if (index == "spacia") {
            this.submitRoomScapia();
          } else if (index == "normal") {
            this.submitFormRoom();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async submitFormUser() {
      let typeA;
      this.typeAffiliation.label == "ลูกจ้าง"
        ? (typeA = "ลูกจ้าง")
        : this.typeAffiliation.label == "บช.ตชด."
        ? (typeA = "บช.ตชด.")
        : (typeA = this.selectedAffiliation.label);
      let body = {
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        dateApproved: this.dateApp.toISOString(),
        roomId: this.roomId,
        roomnumber: this.numberRoom,
        buildingName: this.buildingName,
        contract: this.contract,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
        no: "",
      };
      await axios.put(`http://localhost:3897/users/${this.userId}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async submitForm2() {
      let body = {
        userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        selectedAffiliation: this.affiliation,
        affiliation: this.affiliation,
        selectedRanks: this.rank,
        rankNumber: this.rankNumber,
        idcard: this.idcard,
        phone: this.phone,
        rank: this.rank,
        selectedDataObtion: this.status,
        typeAffiliation: this.typeAffiliation,
        typeRanks: this.typeRanks,
        typeUser: this.typeUser,
        queue: "inroom",
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        roomId: this.roomId,
        roomnumber: this.numberRoom,
        dateApproved: this.dateApp.toISOString(),
        buildingName: this.buildingName,
        monthly: this.months,
        years: this.years,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
      };

      await axios.post(`http://localhost:3897/report`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async editToreport() {
      let body = {
        userId: this.userId,
        queue: "inroom",
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        roomId: this.roomId,
        dateApproved: this.dateApp.toISOString(),
        monthly: this.months,
        years: this.years,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
      };

      await axios.put(`http://localhost:3897/report/${this.reportId}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async submitForm3() {
      let body = {
        userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        selectedAffiliation: this.affiliation,
        affiliation: this.affiliation,
        selectedRanks: this.rank,
        rankNumber: this.rankNumber,
        idcard: this.idcard,
        phone: this.phone,
        rank: this.rank,
        selectedDataObtion: this.status,
        typeAffiliation: this.typeAffiliation,
        typeRanks: this.typeRanks,
        typeUser: this.typeUser,
        queue: "inroom",
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        no: "",
      };
      await axios.put(`http://localhost:3897/queue/${this.userId}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },
    async submitFormRoom() {
      let body = {
        userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        selectedAffiliation: this.affiliation,
        affiliation: this.affiliation,
        selectedRanks: this.rank,
        rankNumber: this.rankNumber,
        idcard: this.idcard,
        phone: this.phone,
        ranks: this.rank,
        selectedDataObtion: this.status,
        typeAffiliation: this.typeAffiliation,
        typeRanks: this.typeRanks,
        typeUser: this.typeUser,
        typeRoom: this.typeRoom,
        queue: "inroom",
        roomStatus: "unavailable",
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        buildingName: this.buildingName,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
        dateApproved: this.dateApp.toISOString(),
      };
      await axios
        .put(`http://localhost:3897/rooms/${this.id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "เพิ่มข้อมูลสำเร็จ",
            type: "success",
          });
          this.getAllqueue();
          this.$router.push({ path: `/room` });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async submitRoomScapia() {
      let typeA;
      this.typeAffiliation.label == "ลูกจ้าง"
        ? (typeA = "ลูกจ้าง")
        : this.typeAffiliation.label == "บช.ตชด."
        ? (typeA = "บช.ตชด.")
        : (typeA = this.selectedAffiliation.label);
      let body = {
        userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        affiliation: this.affiliation,
        ranks: this.selectedRanks.label,
        rankNumber: this.selectedRanks.value,
        idcard: this.idcard,
        phone: this.phone,
        typeRoom: this.typeRoom,
        status: this.selectedDataObtion.value || "โสด",
        typeAffiliation: this.typeAffiliation.value,
        typeRanks: this.typeRanks.value,
        queue: "inroom",
        roomStatus: "special",
        contract: this.contract,
        checkintime: this.Checkintime,
        maintenance: this.maintenanceFix,
        insurance: this.insurance,
        installments: this.installments,
        amountPaid: this.amountPaid,
        buildingName: this.buildingName,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
        dateApproved: this.dateApp.toISOString(),
      };

      await axios
        .put(`http://localhost:3897/rooms/${this.id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "เพิ่มข้อมูลสำเร็จ",
            type: "success",
          });
          this.getAllqueue();
          this.$router.push({ path: `/room` });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateUser() {
      let body = {
        bookNumber: this.bookNumber,
        contract: this.contract,
        vehicleNumber: this.vehicleNumber,
        numberPeople: this.numberPeople,
        no: "",
      };
      axios
        .put(`http://localhost:3897/users/${this.userId}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "แก้ไขข้อมูลสำเร็จ",
            type: "success",
          });
          this.getAllusersByid(this.userId);
        })
        .catch((err) => {
          console.log(err);
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
        <notifications class="pt-6" position="top center" width="400px" />
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
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 pt-6">
      <div class="page-header min-vh-45">
        <div class="container">
          <div>
            <Breadcrumbs
              :routes="[
                { label: 'หน้าหลัก', route: '/home' },
                { label: 'สถานะห้องพัก', route: '/room' },
                { label: 'รายละเอียดห้องพัก' },
              ]"
            />
          </div>
          <!-- d-flex justify-content-between -->
          <div class="mb-3">
            <a
              style="display: flex; align-items: center; cursor: pointer"
              @click="Previous"
            >
              <span class="material-icons"> arrow_back_ios_new </span>
              <span>ย้อนกลับ</span>
            </a>
          </div>
          <div class="d-flex justify-content-between align-items-baseline">
            <h4>รายละเอียดห้องพัก {{ numberRoom }}</h4>
            <div>
              <MaterialButton
                v-if="this.mode == 'add'"
                style="margin-right: 20px"
                variant="gradient"
                color="danger"
                data-bs-toggle="modal"
                data-bs-target="#userBackdrop"
                >กรณีพิเศษ</MaterialButton
              >
              <MaterialButton
                style="margin-right: 20px"
                variant="gradient"
                color="success"
                @click="gotoAction()"
                >จัดการห้องพัก</MaterialButton
              >
              <MaterialButton
                v-if="this.mode == 'edit'"
                variant="gradient"
                color="success"
                data-bs-toggle="modal"
                data-bs-target="#updateUserSpaciaBackdrop"
                >แก้ไขรายละเอียกผู้พักอาศัย</MaterialButton
              >
            </div>
          </div>
          <div class="row pt-4">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-10">
                  <div class="card-body">
                    <div class="row" v-if="this.mode !== 'add'">
                      <h5 class="card-title">รายละเอียดผู้พักอาศัย</h5>
                      <div class="col-5">
                        <p class="card-text">
                          ชือ : {{ data?.rank }} {{ data?.firstName }}
                        </p>
                        <p class="card-text">สถานะห้อง : {{ statusRoom }}</p>
                        <p class="card-text">สังกัด : {{ Affiliation }}</p>
                        <p class="card-text">เลขบัตรประชาชน : {{ data?.idcard }}</p>
                        <p class="card-text">
                          วันที่ได้รับอนุมัติ : {{ contract || "-" }}
                        </p>
                        <p class="card-text">เลขลงรับหนังสือ : {{ bookNumber || "-" }}</p>
                      </div>
                      <div class="col-7">
                        <p class="card-text">นามสกุล : {{ data?.lastName }}</p>
                        <p class="card-text">เบอร์โทร : {{ data?.phone }}</p>
                        <p class="card-text">เงินค่าประกัน : {{ data?.insurance }}</p>
                        <p class="card-text">
                          งวดค่าประกัน : {{ data?.maintenanceCost }}
                        </p>
                        <p class="card-text">จำนวนคนเข้าพักอาศัย : {{ numberPeople }}</p>
                        <p class="card-text">เลขทะเบียนรถ : {{ vehicleNumber }}</p>
                      </div>
                    </div>
                    <div class="row" v-if="this.mode !== 'special'">
                      <div class="col-5">
                        <h5 class="card-title pt-2">รายละเอียดห้องพัก</h5>
                        <p class="card-text">ประเภทห้องพัก : {{ data?.typeRoom }}</p>
                        <!-- <p class="card-text">มิเตอร์น้ำ/ไฟ : 745/546</p> -->
                        <p class="card-text">สภาพห้อง : {{ data?.roomconditions }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row pt-4">
                <div class="card mb-3" v-if="mode == 'add'">
                  <div style="text-align: right">
                    <MaterialButton
                      style="width: 300px"
                      variant="gradient"
                      color="success"
                      data-bs-toggle="modal"
                      data-bs-target="#addSpaciaBackdrop"
                      >เพิ่มผู้พักอาศัยนอกคิวเข้าห้องพัก</MaterialButton
                    >
                  </div>

                  <div class="text-center pt-4 table-responsive">
                    <table class="table border border-2 border-success">
                      <thead class="border border-2 border-success border-bottom">
                        <tr>
                          <th scope="col">ลำดับ</th>
                          <th scope="col">ชื่อ-สกุล</th>
                          <th scope="col">สังกัด</th>
                          <th scope="col">ชื่ออาคาร</th>
                          <th scope="col">เลขบัตรประชาชน</th>
                          <th scope="col">เบอร์ติดต่อ</th>
                          <th scope="col">เลขลงรับหนังสือ</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in queuefilter" :key="index">
                          <th scope="row">{{ item.no }}</th>
                          <td>
                            {{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}
                          </td>
                          <td>{{ item?.Affiliation }}</td>
                          <td>{{ item?.buildingName }}</td>
                          <td>{{ item?.idcard }}</td>
                          <td>{{ item?.phone }}</td>
                          <td>{{ item?.bookNumber || "-" }}</td>
                          <td>
                            <MaterialButton
                              variant="gradient"
                              color="success"
                              data-bs-toggle="modal"
                              data-bs-target="#contractBackdrop"
                              @click="getAllusersByid(item?.id)"
                              >เพิ่มผู้พักอาศัยเข้าห้องพัก</MaterialButton
                            >
                          </td>
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
      class="modal fade"
      id="contractBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เพิ่มรายละเอียดสัญญา</h5>
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
                <label class="starRed">วันที่ได้รับอนุมัติ</label>
                <MaterialInput
                  name="contract"
                  :value="contract"
                  @input="(event) => (contract = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="วันที่ได้รับอนุมัติ"
                />
              </div>
              <div class="mb-3">
                <label class="starRed">เงินค่าประกัน</label>
                <MaterialInput
                  :value="insurance"
                  @input="(event) => (insurance = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="เงินค่าประกัน"
                />
              </div>
              <div class="mb-3">
                <label class="starRed">จำนวนเงินประกันที่ชำระแล้ว</label>
                <MaterialInput
                  :value="amountPaid"
                  @input="(event) => (amountPaid = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="จำนวนเงินค่าประกันที่ชำระแล้ว"
                />
              </div>
              <div class="mb-3">
                <label class="starRed">จำนวนงวดเงินประกัน</label>
                <MaterialInput
                  :value="installments"
                  @input="(event) => (installments = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="จำนวนงวดเงินค่าประกัน"
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
              @click="submitForm('normal')"
              html-type="submit"
              data-bs-dismiss="modal"
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="Returntheroom"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" style="max-width: 740px">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">คืนห้อง</h5>
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
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">มี</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">ไม่มี</label>
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
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">มี</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">ไม่มี</label>
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
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">มี</label>
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
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">ไม่มี</label>
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
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="addSpaciaBackdrop"
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
              เลือกผู้พักอาศัยเข้าห้องพัก
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label>ชื่อผู้พักอาศัย</label>
              <v-select :options="userList" v-model="selectedUser"></v-select>
            </div>
            <div class="mb-3">
              <MaterialInput
                name="numberPeople"
                :value="numberPeople"
                @input="(event) => (numberPeople = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="จำนวนคนที่เข้าพัก"
              />
            </div>
            <div class="mb-3">
              <MaterialInput
                name="vehicleNumber"
                :value="vehicleNumber"
                @input="(event) => (vehicleNumber = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="เลขทะเบียนรถ"
              />
            </div>
            <div class="mb-3">
              <label class="starRed">วันที่ได้รับอนุมัติ</label>
              <MaterialInput
                name="contract"
                :value="contract"
                @input="(event) => (contract = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="วันที่ได้รับอนุมัติ"
              />
            </div>
            <div class="mb-3">
              <label class="starRed">เงินค่าประกัน</label>
              <MaterialInput
                :value="insurance"
                @input="(event) => (insurance = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="เงินค่าประกัน"
              />
            </div>
            <div class="mb-3">
              <label class="starRed">จำนวนเงินประกันที่ชำระแล้ว</label>
              <MaterialInput
                :value="amountPaid"
                @input="(event) => (amountPaid = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="จำนวนเงินค่าประกันที่ชำระแล้ว"
              />
            </div>
            <div class="mb-3">
              <label class="starRed">จำนวนงวดเงินประกัน</label>
              <MaterialInput
                :value="installments"
                @input="(event) => (installments = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="จำนวนงวดเงินค่าประกัน"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton
              variant="gradient"
              color="success"
              @click="submitForm('normal')"
              data-bs-dismiss="modal"
              html-type="submit"
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

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
            <h5 class="modal-title" id="staticBackdropLabel">
              เพิ่มผู้พักอาศัยเข้าห้องพัก
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
                <label class="starRed">สังกัด</label>
                <v-select
                  :options="masterData?.typeAffiliation"
                  v-model="typeAffiliation"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeAffiliation?.label == 'บก.อก.'">
                <label>สังกัด {{ typeAffiliation?.label }}</label>
                <v-select
                  :options="masterData?.Affiliation"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeAffiliation?.label == 'บก.สนน.'">
                <label>สังกัด {{ typeAffiliation?.label }}</label>
                <v-select
                  :options="masterData?.Affiliation2"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div class="mb-1">
                <label class="starRed">ลำดับยศ</label>
                <v-select :options="masterData?.typeranks" v-model="typeRanks"></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks?.label == 'ลูกจ้าง'">
                <label> {{ typeRanks?.label }}</label>
                <v-select :options="masterData?.ranks" v-model="selectedRanks"></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks?.label == 'ประทวน'">
                <label> {{ typeRanks?.label }}</label>
                <v-select
                  :options="masterData?.ranks2"
                  v-model="selectedRanks"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks?.label == 'สัญญาบัตร'">
                <label> {{ typeRanks?.label }}</label>
                <v-select
                  :options="masterData?.ranks3"
                  v-model="selectedRanks"
                ></v-select>
              </div>
              <div class="mb-3 pt-1">
                <label class="starRed">ชื่อ</label>
                <MaterialInput
                  name="firstName"
                  :value="firstName"
                  @input="(event) => (firstName = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="ชื่อ"
                  isRequired
                />
              </div>
              <div class="mb-3">
                <label class="starRed">สกุล</label>
                <MaterialInput
                  :value="lastName"
                  @input="(event) => (lastName = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="สกุล"
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
              <div class="mb-3">
              <MaterialInput
                name="numberPeople"
                :value="numberPeople"
                @input="(event) => (numberPeople = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="จำนวนคนที่เข้าพัก"
              />
            </div>
            <div class="mb-3">
              <MaterialInput
                name="vehicleNumber"
                :value="vehicleNumber"
                @input="(event) => (vehicleNumber = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="เลขทะเบียนรถ"
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
              @click="submitForm('spacia')"
              html-type="submit"
              data-bs-dismiss="modal"
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="updateUserSpaciaBackdrop"
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
              แก้ไขรายละเอียกผู้พักอาศัย
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="starRed">วันที่ได้รับอนุมัติ</label>
              <MaterialInput
                name="contract"
                :value="contract"
                @input="(event) => (contract = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="วันที่ได้รับอนุมัติ"
              />
            </div>
            <div class="mb-3">
              <label style="margin-left: -5px">กรอกเลขลงรับหนังสือ</label>
              <textarea
                :value="bookNumber"
                @input="(event) => (bookNumber = event.target.value)"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="ตัวอย่าง : 11244"
              ></textarea>
            </div>
            <div class="mb-3">
              <MaterialInput
                name="numberPeople"
                :value="numberPeople"
                @input="(event) => (numberPeople = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="จำนวนคนที่เข้าพัก"
              />
            </div>
            <div class="mb-3">
              <MaterialInput
                name="vehicleNumber"
                :value="vehicleNumber"
                @input="(event) => (vehicleNumber = event.target.value)"
                class="input-group-static"
                type="text"
                placeholder="เลขทะเบียนรถ"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton
              variant="gradient"
              color="success"
              @click="updateUser()"
              data-bs-dismiss="modal"
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
</style>
