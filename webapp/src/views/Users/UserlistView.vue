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
      DataObtion: [
        { label: "โสด", value: "โสด" },
        { label: "สมรส", value: "สมรส" },
        { label: "อื่นๆ", value: "อื่นๆ" },
      ],
      selectedDataObtion: "โสด",
      selectedRanks: "",
      selectedAffiliation: "",
      selectedColor: "",
      firstName: "",
      lastName: "",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "",
      phone: "",
      birthday: "14/07/2534",
      typeAffiliation: "",
      selecttypeAffiliation: "",
      typeRanks: "",
      dataUser: [],
      olddata: [],
      datatypeUser: [],
      olddatatypeUser: [],
      modalShow: false,
      id: "",
      searchName: "",
      typeUser: "ตร.",
      typeUserBytype: "",
      typeUserAll: "",
      typeUserByrankr: "",
      queue: "",
      roomId: "",
      migratdata: [],
      loader : false,
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    this.getAlluser();
  },
  watch: {
    selectedColor: function (newValue) {
      console.log(newValue);
    },

    selectedRanks: function (newValue) {
      if(newValue.label !== undefined){
        this.rank = newValue.label
        this.rankNumber = newValue.value
      }
    },
    
    typeAffiliation: function (newValue) {
      if(newValue.label !== undefined){
         if(newValue.label == "ลูกจ้าง") {
          this.selecttypeAffiliation = "ลูกจ้าง"
         }else if(newValue.label == "บช.ตชด."){
          this.selecttypeAffiliation = "บช.ตชด."
         }else{
          this.selecttypeAffiliation = newValue.label
         }
      }
    },

    selectedAffiliation: function (newValue) {
      if(newValue.label !== undefined){
          this.Affiliation = newValue.label
      }
    },

  },
  computed: {
    dataUser() {
      return this.dataUser.filter((item) => item.firstName.includes(this.searchName));
    },
  },

  methods: {
    typeUserfilter(e) {
      if (e.target) this.typeUserBytype = e.target.value;
      else this.typeUserBytype = e;
      this.dataUser = this.olddata;
      if (this.typeUserBytype !== "") {
        if (this.typeUserAll == "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว") {
          let dataFind = this.dataUser.filter(
            (e) => e.queue === "inroom" && e.typeUser === this.typeUserBytype
          );
          this.datatypeUser = dataFind;
          this.olddatatypeUser = dataFind;
          this.dataUser = dataFind;
          if (this.typeUserByrankr !== "") this.rankrfilter(this.typeUserByrankr);
        } else {
          let dataFind = this.dataUser.filter((e) => e.typeUser === this.typeUserBytype);
          this.datatypeUser = dataFind;
          this.olddatatypeUser = dataFind;
          this.dataUser = dataFind;
          if (this.typeUserByrankr !== "") this.rankrfilter(this.typeUserByrankr);
        }
      } else {
        this.dataUser = this.olddata;
      }
    },

    rankrfilter(e) {
      if (e.target) this.typeUserByrankr = e.target.value;
      else this.typeUserByrankr = e;
      this.dataUser = this.olddata;
      let dataRank = []
      if((this.typeUserAll == "ทั้งหมด" || this.typeUserAll == "" ) && this.typeUserBytype !== "ทั้งหมด"){
        dataRank = this.dataUser.filter((e) => e.typeUser === this.typeUserBytype && e.typeRanks == this.typeUserByrankr);
      }else if(this.typeUserAll == "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
        this.typeUserBytype !== "ทั้งหมด") {
          dataRank = this.dataUser.filter((e) => e.queue === "inroom" && e.typeUser === this.typeUserBytype && e.typeRanks == this.typeUserByrankr);
      }
      else{
        dataRank = this.dataUser.filter((e) => e.typeRanks == this.typeUserByrankr);
      }
      
      this.datatypeUser = dataRank;
      this.olddatatypeUser = dataRank;
      this.dataUser = dataRank;
    },

    typeUserchange(e) {
      this.typeUser = e.target.value;
    },

    typeUserchangeFilter(e) {
      if (e.target) this.typeUserAll = e.target.value;
      else this.typeUserAll = e;
      this.dataUser = this.olddata;
      if (
        this.typeUserAll == "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
        this.typeUserBytype == "ทั้งหมด"
      ) {
        let dataFind = this.dataUser.filter((e) => e.queue === "inroom");
        this.datatypeUser = dataFind;
        this.olddatatypeUser = dataFind;
        this.dataUser = dataFind;
      } else if (
        this.typeUserAll == "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
        this.typeUserBytype !== "ทั้งหมด"
      ) {
        let dataFind = this.dataUser.filter(
          (e) => e.queue === "inroom" && e.typeUser == this.typeUserBytype
        );
        this.datatypeUser = dataFind;
        this.olddatatypeUser = dataFind;
        this.dataUser = dataFind;
      } else if (this.typeUserAll == "ทั้งหมด" && this.typeUserBytype !== "ทั้งหมด") {
        let dataFind = this.dataUser.filter((e) => e.typeUser == this.typeUserBytype);
        this.datatypeUser = dataFind;
        this.olddatatypeUser = dataFind;
        this.dataUser = dataFind;
      } else {
        this.dataUser = this.olddata;
      }
    },

    async editUser(id) {
      await axios
        .get(`http://localhost:3896/users/${id}`)
        .then((res) => {
          let data = res.data;
          this.id = id;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.selectedAffiliation = data.affiliation;
          this.selectedRanks = data.rank;
          this.idcard = data.idcard;
          this.phone = data.phone;
          this.selectedDataObtion = data.status;
          this.typeAffiliation = data.typeAffiliation;
          this.queue = data.queue;
          this.typeRanks = data.typeRanks;
          this.roomId = data.roomId;
          this.modalShow = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAlluser() {
      try {
        axios
          .get("http://localhost:3896/users")
          .then((res) => {
            let arr = res.data;
            let dataFind = [];

            if (
              this.typeUserAll !== "ทั้งหมด" &&
              this.typeUserAll !== "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserAll !== ""
            ) {
              dataFind = arr.filter((e) => e.typeUser === this.typeUserBytype);
            } else if (
              this.typeUserAll === "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserBytype !== "ทั้งหมด"
            ) {
              dataFind = arr.filter(
                (e) => e.queue === "inroom" && e.typeUser === this.typeUserBytype
              );
            } else if (
              this.typeUserAll === "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserBytype == "ทั้งหมด"
            ) {
              dataFind = arr.filter((e) => e.queue === "inroom");
            } else if (
              this.typeUserAll == "ทั้งหมด" &&
              this.typeUserBytype !== "ทั้งหมด"
            ) {
              dataFind = arr.filter((e) => e.typeUser === this.typeUserBytype);
            } else {
              dataFind = res.data;
              let typeR  =""
              this.typeUserBytype !== "" ? typeR = this.typeUserBytype : typeR = "ทั้งหมด"
              this.typeUserfilter(typeR);
            }
            this.dataUser = dataFind.reverse();;
            this.olddata = res.data;
            this.searchName = "";
            this.firstName = "";
            this.lastName = "";
            this.typeAffiliation = "";
            this.selectedRanks = "";
            this.idcard = "";
            this.phone = "";
            this.selectedDataObtion = "โสด";
            this.typeAffiliation = "";
            this.typeRanks = "";
            this.typeUser = "ตร.";
            if (this.typeUserByrankr !== "") this.rankrfilter(this.typeUserByrankr);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    // async  submitsync(){
    //     await this.migratdata.forEach((element) => {
    //       this.syncDataUser(element);
    //     });
    //   },

    //   syncDataUser(data){
    //     axios
    //       .put(`http://localhost:3896/users/${data.id}`, data, {
    //         headers: {
    //           // remove headers
    //           "Access-Control-Allow-Origin": "*",
    //           "Content-Type": "application/json",
    //         },
    //       })
    //   },

    async editForm() {
      let maintenance;
      if (this.typeRanks.value == "ประทวน" || this.typeRanks.value == "ลูกจ้าง" ) {maintenance = 60}
      else if (this.typeRanks.value == "สัญญาบัตร") {maintenance = 100}
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        affiliation: this.Affiliation,
        rank: this.rank,
        rankNumber: this.rankNumber,
        idcard: this.idcard,
        phone: this.phone,
        status: this.selectedDataObtion.value || "โสด",
        typeAffiliation: this.selecttypeAffiliation,
        typeRanks: this.typeRanks.value,
        queue: this.queue,
        maintenance: maintenance,
      };

      axios
        .put(`http://localhost:3896/users/${this.id}`, body, {
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
          if (this.roomId !== undefined) this.updateRoom();
          this.saveToreport()
          setTimeout(() => {
            this.getAlluser();
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async saveToreport() {
      let maintenance;
      if (this.typeRanks.value == "ประทวน" || this.typeRanks.value == "ลูกจ้าง" ) {maintenance = 60}
      else if (this.typeRanks.value == "สัญญาบัตร") {maintenance = 100}
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        affiliation: this.Affiliation,
        rank: this.rank,
        rankNumber: this.rankNumber,
        idcard: this.idcard,
        phone: this.phone,
        status: this.selectedDataObtion.value || "โสด",
        typeAffiliation: this.selecttypeAffiliation,
        typeRanks: this.typeRanks.value,
        queue: this.queue,
        maintenance: maintenance,
      };
      await axios.put(`http://localhost:3896/reportUser/${this.id}`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async updateRoom() {
      let maintenance;
      if (this.typeRanks.value == "ประทวน") {maintenance = 60}
      else if (this.typeRanks.value == "สัญญาบัตร") {maintenance = 100}
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        affiliation: this.Affiliation,
        rank: this.selectedRanks.label,
        rankNumber: this.selectedRanks.value,
        idcard: this.idcard,
        phone: this.phone,
        status: this.selectedDataObtion.value || "โสด",
        typeAffiliation: this.selecttypeAffiliation,
        typeRanks: this.typeRanks.value,
        queue: this.queue,
        maintenance: maintenance,
      };

      axios.put(`http://localhost:3896/rooms/${this.roomId}`, body, {
        headers: {
          // remove headers
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    async submitForm() {
      let maintenance;
      if (this.typeRanks.value == "ประทวน" || this.typeRanks.value == "ลูกจ้าง"  ) {maintenance = 60}
      else if (this.typeRanks.value == "สัญญาบัตร") {maintenance = 100}
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        affiliation: this.Affiliation,
        rank: this.selectedRanks.label,
        rankNumber: this.selectedRanks.value,
        idcard: this.idcard,
        phone: this.phone,
        queue: "none",
        status: this.selectedDataObtion.value || "โสด",
        typeAffiliation: this.selecttypeAffiliation,
        typeRanks: this.typeRanks.value,
        typeUser: this.typeUser,
        maintenance: maintenance,
      };
      axios
        .post(`http://localhost:3896/users`, body, {
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
          this.getAlluser();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteUser(id) {
      this.userId = id;
    },

    submitDelete() {
      axios
        .delete(`http://localhost:3896/users/${this.userId}`)
        .then((res) => {
          this.loader = true
          this.submitDeleteReport()
          setTimeout(() => {
            this.getAlluser2();
            this.loader = false
          }, 6000);

          notify({
            title: "ลบข้อมูลสำเร็จ",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },


    submitDeleteReport() {
      axios
        .delete(`http://localhost:3896/report/${this.userId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAlluser2() {
      try {
        axios
          .get("http://localhost:3896/users")
          .then((res) => {
            let arr = res.data;
            let dataFind = [];
            if (
              this.typeUserAll !== "ทั้งหมด" &&
              this.typeUserAll !== "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserAll !== ""
            ) {
              dataFind = arr.filter((e) => e.typeUser === this.typeUserBytype);
            } else if (
              this.typeUserAll === "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserBytype !== "ทั้งหมด"
            ) {
              dataFind = arr.filter(
                (e) => e.queue === "inroom" && e.typeUser === this.typeUserBytype
              );
            } else if (
              this.typeUserAll === "รายชื่อผู้พักอาศัยที่เข้าพักแล้ว" &&
              this.typeUserBytype == "ทั้งหมด"
            ) {
              dataFind = arr.filter((e) => e.queue === "inroom");
            } else if (
              this.typeUserAll == "ทั้งหมด" &&
              this.typeUserBytype !== "ทั้งหมด"
            ) {
              dataFind = arr.filter((e) => e.typeUser === this.typeUserBytype);
            } else {
              dataFind = res.data;
              let typeR  =""
              this.typeUserBytype !== "" ? typeR = this.typeUserBytype : typeR = "ทั้งหมด"
              this.typeUserfilter(typeR);
            }
            this.dataUser = dataFind.reverse();;
            this.olddata = res.data;
            if (this.typeUserByrankr !== "") this.rankrfilter(this.typeUserByrankr);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    clerData(){
          this.firstName = "";
            this.lastName = "";
            this.typeAffiliation = "";
            this.selectedRanks = "";
            this.idcard = "";
            this.phone = "";
            this.selectedDataObtion = "โสด";
            this.typeAffiliation = "";
            this.typeRanks = "";
            this.typeUser = "ตร.";
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
          <notifications class="pt-6" position="top center" width="400px" />
          <div>
            <Breadcrumbs
              :routes="[{ label: 'หน้าหลัก', route: '/home' }, { label: 'ทะเบียน' }]"
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
          <h4>ทะเบียน</h4>
          <div class="mb-1">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions123"
                id="inlineRadio33"
                value="ทั้งหมด"
                @change="typeUserchangeFilter($event)"
                checked
              />
              <label class="form-check-label" for="inlineRadio33">ทั้งหมด</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions123"
                id="inlineRadio37"
                value="รายชื่อผู้พักอาศัยที่เข้าพักแล้ว"
                @change="typeUserchangeFilter($event)"
              />
              <label class="form-check-label" for="inlineRadio37"
                >รายชื่อผู้พักอาศัยที่เข้าพักแล้ว</label
              >
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="mb-3">
              <div class="form-check form-check-inline">
                <label style="margin-right: 20px">ประเภท</label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="ตร."
                  @change="typeUserfilter($event)"
                />
                <label class="form-check-label" for="inlineRadio1">ตร.</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="บช.ตชด."
                  @change="typeUserfilter($event)"
                />
                <label class="form-check-label" for="inlineRadio2">บช.ตชด.</label>
              </div>
            </div>
            <div class="d-flex align-items-baseline">
              <label style="margin-right: 10px">ค้นหาชื่อ </label>
              <MaterialInput
                style="width: 300px"
                class="input-group-dynamic"
                icon="search"
                type="text"
                placeholder="Search"
                :value="searchName"
                @input="(event) => (searchName = event.target.value)"
              />
              <MaterialButton
                style="margin-left: 20px"
                variant="gradient"
                color="success"
                data-bs-toggle="modal"
                data-bs-target="#userBackdrop"
                @click="clerData( )"
                >เพิ่มสมาชิก</MaterialButton
              >
            </div>
          </div>
          <div>
            <div class="form-check form-check-inline">
              <label style="margin-right: 20px">ยศ</label>
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions1"
                id="inlineRadio3"
                value="ประทวน"
                @change="rankrfilter($event)"
              />
              <label class="form-check-label" for="inlineRadio3">ประทวน</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions1"
                id="inlineRadio4"
                value="สัญญาบัตร"
                @change="rankrfilter($event)"
              />
              <label class="form-check-label" for="inlineRadio4">สัญญาบัตร</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions1"
                id="inlineRadio5"
                value="ลูกจ้าง"
                @change="rankrfilter($event)"
              />
              <label class="form-check-label" for="inlineRadio5">ลูกจ้าง</label>
            </div>
          </div>
          <div v-if="loader">
            <div class="spanner show">
              <div class="loader"></div>
              <p>กำลังทำรายการ กรุณารอสักครู่</p>
            </div>
          </div>
          <div  v-if="!loader" class="text-center pt-4 table-responsive">
             <table class="table border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th scope="col">ลำดับ</th>
                  <th scope="col">ยศ</th>
                  <th scope="col">ชื่อ-สกุล</th>
                  <!-- <th scope="col"></th> -->
                  <th scope="col">สังกัด</th>
                  <th scope="col">สถานภาพ</th>
                  <!-- <th scope="col">เลขบัตรประชาชน</th> -->
                  <th
                    v-if="typeUserAll == 'รายชื่อผู้พักอาศัยที่เข้าพักแล้ว'"
                    scope="col"
                  >
                    อาคาร
                  </th>
                  <th
                    v-if="typeUserAll == 'รายชื่อผู้พักอาศัยที่เข้าพักแล้ว'"
                    scope="col"
                  >
                    เลขที่ห้อง
                  </th>
                  <th scope="col">เบอร์ติดต่อ</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataUser" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item?.rank || "-" }}</td>
                  <td>{{ item?.firstName }} {{ item?.lastName }}</td>
                  <td>{{ item?.affiliation || "-" }}</td>
                  <td>{{ item?.status || "-" }}</td>
                  <td v-if="typeUserAll == 'รายชื่อผู้พักอาศัยที่เข้าพักแล้ว'">
                    {{ item?.buildingName || "-" }}
                  </td>
                  <td v-if="typeUserAll == 'รายชื่อผู้พักอาศัยที่เข้าพักแล้ว'">
                    {{ item?.roomnumber || "-" }}
                  </td>
                  <td>{{ item?.phone || "-" }}</td>
                  <td>
                    <a
                      @click="editUser(item?.id)"
                      data-bs-toggle="modal"
                      data-bs-target="#EdituserBackdrop"
                      ><i
                        class="material-icons me-2"
                        style="cursor: pointer"
                        aria-hidden="true"
                        >edit</i
                      ></a
                    >
                  </td>
                  <td>
                    <a
                      @click="deleteUser(item?.id)"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteuserBackdrop"
                      ><i
                        class="material-icons me-2"
                        style="cursor: pointer"
                        aria-hidden="true"
                        >delete</i
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
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
                <div class="form-check form-check-inline">
                  <label style="margin-right: 20px" class="starRed">ประเภท</label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="typeUser"
                    id="inlinetypeUser1"
                    value="ตร."
                    @change="typeUserchange($event)"
                    :checked="typeUser == 'ตร.'"
                  />
                  <label class="form-check-label" for="inlinetypeUser1">ตร.</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="typeUser"
                    id="inlinetypeUser"
                    value="บช.ตชด."
                    @change="typeUserchange($event)"
                    :checked="typeUser == 'บช.ตชด.'"
                  />
                  <label class="form-check-label" for="inlinetypeUser">บช.ตชด.</label>
                </div>
              </div>
              <div class="mb-1">
                <label class="starRed">สังกัด</label>
                <v-select
                  :options="masterData?.typeAffiliation"
                  v-model="typeAffiliation"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeAffiliation.label == 'บก.อก.' || this.typeAffiliation == 'บก.อก.'">
                <label>สังกัด {{ typeAffiliation.label }}</label>
                <v-select
                  :options="masterData?.Affiliation"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeAffiliation.label == 'บก.สสน.' || this.typeAffiliation == 'บก.สสน.'">
                <label>สังกัด {{ typeAffiliation.label }}</label>
                <v-select
                  :options="masterData?.Affiliation2"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              
              <div class="mb-1">
                <label class="starRed">ลำดับยศ</label>
                <v-select :options="masterData?.typeranks" v-model="typeRanks"></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks.label == 'ลูกจ้าง'">
                <label> {{ typeRanks.label }}</label>
                <v-select :options="masterData?.ranks" v-model="selectedRanks"></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks.label == 'ประทวน'">
                <label> {{ typeRanks.label }}</label>
                <v-select
                  :options="masterData?.ranks2"
                  v-model="selectedRanks"
                ></v-select>
              </div>
              <div class="mb-3" v-if="typeRanks.label == 'สัญญาบัตร'">
                <label> {{ typeRanks.label }}</label>
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
                <label class="starRed">สถานภาพ</label>
                <v-select :options="DataObtion" v-model="selectedDataObtion"></v-select>
              </div>
              <div class="mb-3">
                <label class="starRed">เลขบัตรประชาชน</label>
                <MaterialInput
                  :value="idcard"
                  @input="(event) => (idcard = event.target.value)"
                  class="input-group-static"
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
              <div class="mb-1">
                <label class="starRed">สังกัด</label>
                <v-select
                  :options="masterData?.typeAffiliation"
                  v-model="typeAffiliation"
                ></v-select>
              </div>
              <div
                class="mb-3"
                v-if="
                  typeAffiliation.label == 'บก.อก.' || this.typeAffiliation == 'บก.อก.'
                "
              >
                <label>สังกัด {{ typeAffiliation.label }}</label>
                <v-select
                  :options="masterData?.Affiliation"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div
                class="mb-3"
                v-if="
                  typeAffiliation.label == 'บก.สสน.' || this.typeAffiliation == 'บก.สสน.'
                "
              >
                <label>สังกัด {{ typeAffiliation.label }}</label>
                <v-select
                  :options="masterData?.Affiliation2"
                  v-model="selectedAffiliation"
                ></v-select>
              </div>
              <div class="mb-1">
                <label class="starRed">ลำดับยศ</label>
                <v-select :options="masterData?.typeranks" v-model="typeRanks"></v-select>
              </div>
              <div
                class="mb-3"
                v-if="typeRanks.label == 'ลูกจ้าง' || this.typeRanks == 'ลูกจ้าง'"
              >
                <label> {{ typeRanks.label }}</label>
                <v-select :options="masterData?.ranks" v-model="selectedRanks"></v-select>
              </div>
              <div
                class="mb-3"
                v-if="typeRanks.label == 'ประทวน' || this.typeRanks == 'ประทวน'"
              >
                <label> {{ typeRanks.label }}</label>
                <v-select
                  :options="masterData?.ranks2"
                  v-model="selectedRanks"
                ></v-select>
              </div>
              <div
                class="mb-3"
                v-if="typeRanks.label == 'สัญญาบัตร' || this.typeRanks == 'สัญญาบัตร'"
              >
                <label> {{ typeRanks.label }}</label>
                <v-select
                  :options="masterData?.ranks3"
                  v-model="selectedRanks"
                ></v-select>
              </div>
              <div class="mb-3">
                <label class="starRed">ชื่อ</label>
                <MaterialInput
                  name="firstName"
                  :value="firstName"
                  @input="(event) => (firstName = event.target.value)"
                  class="input-group-static"
                  type="text"
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
                <label class="starRed">สถานภาพ</label>
                <v-select :options="DataObtion" v-model="selectedDataObtion"></v-select>
              </div>
              <div class="mb-3">
                <label class="starRed">เลขบัตรประชาชน</label>
                <MaterialInput
                  :value="idcard"
                  @input="(event) => (idcard = event.target.value)"
                  class="input-group-static"
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
              @click="editForm"
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
      id="deleteuserBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">ลบสมาชิก</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">คุณต้องการที่จะลบสมาชิกใช่หรือไม่</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ยกเลิก
            </button>
            <MaterialButton
              variant="gradient"
              color="danger"
              @click="submitDelete"
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
.vue-notification {
  margin: 0 10px 10px;
  padding: 20px;
  font-size: 16px;
  color: #ffffff;
  /* background: #44a4fc; */
  /* border-left: 5px solid #187fe7; */
}
.starRed::after {
  content: " *";
  color: red;
  font-weight: bold;
}
</style>
