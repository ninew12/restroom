<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import { notify } from "@kyvg/vue3-notification";

import * as jsPDF from "jspdf";
import * as Vue3Html2pdf from "vue3-html2pdf";

// import posts from "../posts.json";
import axios from "axios";

export default {
  components: {
    MaterialInput,
    MaterialButton,
    Breadcrumbs,
    MaterialCheckbox,
  },
  setup() {
    return {
      vueMkHeader,
      Vue3Html2pdf,
      jsPDF,
      // roomData,
    };
  },

  data() {
    return {
      typeRoom: [
        { label: "ทั้งหมด", value: "ทั้งหมด" },
        { label: "ช1", value: "ช1" },
        { label: "ช2", value: "ช2" },
        { label: "ช3", value: "ช3" },
      ],
      htmlToPdfOptions: {
        margin: 0.25,
        filename: "สถานะห้องพัก.pdf",
        image: { type: "jpeg", quality: 2 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a3", orientation: "landscape" },
      },

      listRoom: [],
      selectedtypeRoom: "ทั้งหมด",
      selectedColor: "",
      statusfree: false,
      statusreturn: false,
      statuseunavailable: false,
      statusewaiting: false,
      statusall: true,
      statusSpecial: false,
      selectedlistRoom: "เลือกตึก",
      committee: "",
      selectedStatus: "",
      roomData: [],
      buildingList: [],
      roomList: [],
      roomListOld: [],
      buidingId: "",
      typeStatusroom: "ทั้งหมด",
      typeRoomselect: [],
      buildingType: "",
      buildingName: "",
      dateNow: "",
      roomtype: "ทั้งหมด",
      searchByName: "",
    };
  },
  created() {
    // this.$route.query
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    try {
      axios.get(`http://localhost:3897/users/`).then();
    } catch (e) {
      console.error(e);
    }
    this.dateNow = new Intl.DateTimeFormat(["ban", "id"]).format(new Date());

    // this.getRooms();
    this.getBuildings();
  },
  watch: {
    selectedtypeRoom: function (newValue) {
      this.roomList = this.roomListOld;
      let filldata = [];
      let filldata2 = [];
      if (newValue !== null) {
        this.roomtype = newValue.label;
        if (newValue.value !== "ทั้งหมด") {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.typeRoom == newValue.value);
          });

          filldata2 = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = filldata2.sort((a, b) => b.floor - a.floor);
        } else {
          this.roomList = this.roomListOld.reverse();
        }
      }
    },

    selectedlistRoom: async function (newValue) {
      let arr = [];
      if (newValue !== null) {
        arr = this.buildingList.find((e) => e.buildingId == newValue.value);
        this.buidingId = arr.listRoom[0].buildingId;
        this.buildingName = newValue.label;
        this.buildById(this.buidingId);
        this.getBuildingsByid(this.buidingId);
      }
    },
    searchByName: async function (newValue) {
      let arr = [];
      let filldata = [];
      let filldata2 = [];
      this.roomList = this.roomListOld;
      if (newValue !== null && newValue != "") {
        let tt = this.roomList.sort((a, b) => a.floor - b.floor);
        filldata = tt.map((ele, i) => {
          return ele.data.filter((c) => c.firstName == newValue);
        });

        filldata2 = Object.keys(filldata).map((ele) => {
          return {
            floor: parseInt(ele) + 1,
            data: filldata[ele] || [],
          };
        });
        this.roomList = filldata2.sort((a, b) => b.floor - a.floor);
      } else {
        this.roomList = this.roomListOld.reverse();
      }
    },
  },

  methods: {
    gotodetail(id, index) {
      let action;
      if (index == "unavailable") action = "edit";
      if (index == "waiting") action = "add";
      if (index == "free") action = "add";
      if (index == "special") action = "special";
      if (index == "return") action = "return";
      this.$router.push({ path: `/room/detail/${id}`, query: { mode: action } });
    },

    async roomType() {
      this.dataBuilding["listRoom"] = [];
      let buildingList = [];
      let datalist = await axios.get(`http://localhost:3897/buildings/`);
      buildingList = await datalist.data.find(
        (el) => el.name == this.selectedlistRoom.value
      );
      if (newValue !== null) {
        if (newValue.value !== "ทั้งหมด") {
          datalist = buildingList["listRoom"].map((ele, i) => {
            ele.rooms = ele.rooms.filter((c) => c.typeRoom == newValue.value);
            return ele;
          });

          this.dataBuilding["listRoom"] = datalist;
        } else {
          this.roomData = this.oldData;
        }
      }
    },
    async getRooms() {
      try {
        await axios
          .get("http://localhost:3897/rooms")
          .then((res) => {
            this.roomData = res.data;
            this.oldData = this.roomData;
            this.buildById(this.buidingId);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
    async buildById(id) {
      try {
        axios.get(`http://localhost:3897/rooms/`).then((res) => {
          let broom = [];
          let datalist = [];
          let arr = [];
          let buidingRoom = res.data;
          broom = buidingRoom.filter((e) => e.buildingId == id);
          const groupByCategory = Object.groupBy(broom, (product) => {
            return product.floor;
          });
          arr = Object.keys(groupByCategory).map((ele) => {
            return {
              floor: parseInt(ele),
              data: groupByCategory[ele].sort((a, b) => a.index - b.index),
            };
          });
          //  console.log(arr.sort((a, b) => a.floor - b.floor));
          datalist = arr.sort((a, b) => b.floor - a.floor);
          this.roomList = datalist;
          this.roomListOld = arr;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async getBuildings() {
      let data = [];
      let arr = [];
      try {
        axios.get(`http://localhost:3897/buildings/`).then((res) => {
          let listData = [];
          arr = res.data;
          this.typeRoomselect = res.data;
          this.buildingList = arr.sort((a, b) => a.position - b.position);
          data = this.buildingList.map((e) => {
            // console.log(e);
            return {
              label: e.name,
              value: e.buildingId,
              position: e.position,
            };
          });

          this.listRoom = data.sort((a, b) => a.position - b.position);
          listData = this.listRoom.sort((a, b) => b.floor - a.floor);
          let roomValue = this.buildingList[0];
          this.buildingType = roomValue.buildingType;
          this.buildingName = roomValue.name;
          // this.onChangeEventRoom("ทั้งหมด")
          // this.selectedlistRoom = { label: roomValue.buil, value: roomValue.buil };
          this.buidingId = roomValue.listRoom[0].buildingId;
          this.committee = roomValue.listRoom[0].committee;
          this.dataBuilding = roomValue;
          this.getRooms();
        });
      } catch (e) {
        console.error(e);
      }
    },

    getBuildingsByid(id) {
      try {
        axios.get(`http://localhost:3897/buildings/${id}`).then((res) => {
          this.committee = res.data.committee;
        });
      } catch (e) {
        console.error(e);
      }
    },

    async EdituserForm() {
      let body = {
        committee: this.committee,
      };
      await axios
        .put(`http://localhost:3897/buildings/${this.buidingId}`, body, {
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
          setTimeout(() => {
            // this.getBuildings();
            this.getBuildingsByid(this.buidingId);
          }, 2000);
          // this.getBuildings();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeEventRoom(e) {
      this.typeStatusroom = e;
      let data = [];
      let mapdata = [];
      if (e !== "ทั้งหมด") {
        data = this.typeRoomselect.filter((el) => el.buildingType === e);
        mapdata = data.map((e) => {
          return {
            label: e.name,
            value: e.buildingId,
          };
        });
        this.listRoom = mapdata;
      } else {
        mapdata = this.typeRoomselect.map((e) => {
          return {
            label: e.name,
            value: e.buildingId,
          };
        });
        this.listRoom = mapdata;
      }
    },

    onChangeEvent(e, event) {
      this.roomList = this.roomListOld;
      let filldata = [];
      if (e == "free") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomStatus == "free");
          });
          let t = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else if (e == "unavailable") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomStatus == "unavailable");
          });
          let t = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else if (e == "waiting") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter(
              (c) => c.roomconditions == "ชำรุด" || c.roomconditions == "เสื่อมโทรม"
            );
          });
          let t = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else if (e == "return") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomStatus == "return");
          });
          let t = Object.keys(filldata).map((ele, i) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else if (e == "special") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor);
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomStatus == "special");
          });
          let t = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else {
        this.roomList = this.roomListOld.reverse();
      }
    },
    Previous() {
      window.history.back();
    },

    async printTer() {
      this.$refs.html2Pdf.generatePdf();
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
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 pt-6">
      <div class="page-header min-vh-45">
        <div class="container-fluid">
          <!-- d-flex justify-content-between -->
          <notifications class="pt-6" position="top center" width="400px" />
          <div>
            <Breadcrumbs
              :routes="[{ label: 'หน้าหลัก', route: '/home' }, { label: 'สถานะห้องพัก' }]"
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
          <h4>สถานะห้องพัก</h4>

          <div class="row pt-4 align-items-baseline">
            <div class="col-4">
              <div class="mb-3">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio225"
                    value="ทั้งหมด"
                    @click="onChangeEventRoom('ทั้งหมด')"
                    :checked="typeStatusroom == 'ทั้งหมด'"
                  />
                  <label class="form-check-label" for="Radio225">ทั้งหมด</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio235"
                    value="บช.ตชด."
                    @click="onChangeEventRoom('บช.ตชด.')"
                    :checked="typeStatusroom == 'บช.ตชด.'"
                  />
                  <label class="form-check-label" for="Radio235">บช.ตชด.</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio245"
                    value="ลือชา"
                    @change="onChangeEventRoom('ลือชา')"
                    :checked="typeStatusroom == 'ลือชา'"
                  />
                  <label class="form-check-label" for="Radio245">ลือชา</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio255"
                    value="บางเขน"
                    @change="onChangeEventRoom('บางเขน')"
                    :checked="typeStatusroom == 'บางเขน'"
                  />
                  <label class="form-check-label" for="Radio255">บางเขน</label>
                </div>
              </div>
              <div class="d-flex justify-content-start align-items-baseline">
                <label class="w-30">
                  <i class="material-icons opacity-6 me-2 text-md">home</i>
                  เลือกตึก</label
                >
                <v-select
                  class="w-100"
                  :options="listRoom"
                  v-model="selectedlistRoom"
                ></v-select>
              </div>
            </div>
            <div class="col-8">
              <div class="d-flex justify-content-end align-items-baseline">
                <div class="d-flex">
                  <MaterialButton
                    size="lg"
                    class="btn-icon"
                    style="margin-right: -30px"
                    @click="printTer()"
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
                </div>
              </div>
            </div>
          </div>
          <div>
            <vue3-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="true"
              :preview-modal="false"
              :manual-pagination="true"
              :pdf-quality="2"
              pdf-content-width="100%"
              :html-to-pdf-options="htmlToPdfOptions"
              ref="html2Pdf"
            >
              <template v-slot:pdf-content>
                <label
                  class="d-flex justify-content-end align-items-baseline"
                  style="margin-bottom: 5px"
                  >วันที่: {{ dateNow }}</label
                >
                <div class="text-center">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="pt-1">อาคารบ้านพัก : {{ typeStatusroom || "-" }}</h6>
                    <h6 class="pt-1" style="margin-left: 10px">
                      ตึก : {{ buildingName || "-" }}
                    </h6>
                    <h6>ประเภทห้อง : {{ roomtype || "-" }}</h6>
                    <h6 style="margin-left: 10px">
                      คณะกรรมการประจําตึก : {{ committee || "-" }}
                    </h6>
                  </div>
                  <div v-for="(item, index) in roomList" :key="index" id="printMe">
                    <div class="d-flex justify-content-start align-items-baseline">
                      <label style="color: #000">ชั้น {{ item?.floor }}</label>
                    </div>
                    <div class="flex-container-fluid">
                      <div v-for="(item2, index) in item.data" :key="index">
                        <div
                          class="card mb-2"
                          :class="{
                            'bg-red':
                              item2?.roomStatus == 'unavailable' &&
                              item2?.roomconditions !== 'ชำรุด' &&
                              item2?.roomconditions !== 'เสื่อมโทรม',
                            'bg-green':
                              item2?.roomStatus == 'free' &&
                              item2?.roomconditions !== 'ชำรุด' &&
                              item2?.roomconditions !== 'เสื่อมโทรม',
                            'bg-warning2':
                              item2?.roomconditions == 'ชำรุด' ||
                              item2?.roomconditions == 'เสื่อมโทรม',
                            'bg-return': item2?.roomStatus == 'return',
                            'bgg-red': item2?.roomStatus == 'special',
                          }"
                          :style="{ height: `140px` }"
                        >
                          <div class="card-body p-1">
                            <a
                              style="cursor: pointer"
                              @click="gotodetail(item2?.id, item2?.roomStatus)"
                            >
                              <p
                                class="card-title"
                                style="
                                  color: #000;
                                  border: 2px solid #f7f4f0 !important;
                                  border-radius: 10px;
                                  background: white;
                                "
                              >
                                <a style="font-size: medium"
                                  >{{ item2?.numberRoom }}
                                  <span
                                    v-if="
                                      item2?.typeRoom !== '' &&
                                      item2?.typeRoom !== undefined
                                    "
                                    >({{ item2?.typeRoom }})</span
                                  >
                                </a>
                              </p>
                              <p
                                v-if="
                                  item2?.roomStatus == 'free' &&
                                  item2?.roomconditions !== 'ชำรุด' &&
                                  item2?.roomconditions !== 'เสื่อมโทรม'
                                "
                                class="card-title bgg-green"
                                style="font-size: 18px"
                              >
                                {{ "ว่าง" }}
                              </p>
                              <p
                                v-if="
                                  item2?.roomStatus == 'unavailable' &&
                                  item2?.roomconditions !== 'ชำรุด' &&
                                  item2?.roomconditions !== 'เสื่อมโทรม'
                                "
                                class="card-title bgg-red"
                                style="font-size: 18px"
                              >
                                {{ "ไม่ว่าง" }}
                              </p>
                              <p
                                v-if="
                                  item2?.roomconditions == 'ชำรุด' ||
                                  item2?.roomconditions == 'เสื่อมโทรม'
                                "
                                class="card-title bgg-warning2"
                                style="font-size: 18px"
                              >
                                {{ item2?.roomconditions }}
                              </p>
                              <p
                                v-if="item2?.roomStatus == 'return'"
                                class="card-title bgg-return"
                                style="font-size: 18px"
                              >
                                {{ "ผ่อนผัน" }}
                              </p>
                              <p class="card-title" style="font-size: 14px">
                                {{ item2?.ranks }} {{ item2?.firstName }}
                                {{ item2?.laststName }}
                              </p>
                              <p>
                                <span
                                  v-if="item2?.roomStatus !== 'special'"
                                  style="text-align: right; font-size: small"
                                  >{{ item2?.affiliation }}</span
                                >
                                <span
                                  v-if="item2?.roomStatus == 'special'"
                                  style="
                                    font-size: 18px;
                                    display: flex;
                                    align-items: center;
                                    margin-left: 5px;
                                  "
                                  ><i
                                    class="material-icons me-2"
                                    style="cursor: pointer"
                                    aria-hidden="true"
                                    >star</i
                                  >{{ "กรณีพิเศษ" }}</span
                                >
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </vue3-html2pdf>
          </div>
          <div class="text-center pt-4">
            <div class="d-flex justify-content-between align-items-baseline pt-1">
              <div class="d-flex align-items-baseline">
                <label style="margin-right: 20px"> เลือกประเภทห้อง</label>
                <v-select
                  style="width: 200px"
                  :options="typeRoom"
                  v-model="selectedtypeRoom"
                ></v-select>
              </div>
              <div class="d-flex align-items-baseline">
                <label style="margin-right: 10px">ค้นหาชื่อ </label>
                <MaterialInput
                  style="width: 300px"
                  class="input-group-dynamic"
                  icon="search"
                  type="text"
                  placeholder="Search"
                  :value="searchByName"
                  @input="(event) => (searchByName = event.target.value)"
                />
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-baseline p-2">
              <div class="text-start">
                <p class="d-flex align-items-baseline p-2">
                  <a data-bs-toggle="modal" data-bs-target="#Edituser">
                    <span style="font-weight: bold; text-decoration: underline">
                      คณะกรรมการประจําตึก : {{ committee }}</span
                    >
                    <i
                      class="material-icons"
                      style="cursor: pointer; margin-left: 10px"
                      aria-hidden="true"
                      >edit</i
                    ></a
                  >
                </p>
                <h6 class="pt-1">{{ selectedlistRoom?.label }}</h6>
              </div>

              <div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio0"
                    value="ทั้งหมด"
                    @click="onChangeEvent('ทั้งหมด', $event)"
                    :checked="statusall"
                  />
                  <label class="form-check-label" for="Radio0">ทั้งหมด</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio1"
                    value="ว่าง"
                    @click="onChangeEvent('free', $event)"
                    :checked="statusfree"
                  />
                  <label class="form-check-label" for="Radio1" style="color: #4cbb17"
                    >ว่าง</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio2"
                    value="ไม่ว่าง"
                    @change="onChangeEvent('unavailable', $event)"
                    :checked="statuseunavailable"
                  />
                  <label class="form-check-label" for="Radio2" style="color: #d24c4a"
                    >ไม่ว่าง</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio3"
                    value="ชำรุด"
                    @change="onChangeEvent('waiting', $event)"
                    :checked="statusewaiting"
                  />
                  <label class="form-check-label" for="Radio3" style="color: #fb8c00"
                    >ชำรุด</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio47"
                    value="ผ่อนผัน"
                    @change="onChangeEvent('return', $event)"
                    :checked="statusreturn"
                  />
                  <label class="form-check-label" for="Radio47" style="color: #816613"
                    >ผ่อนผัน</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="Radio5"
                    value="กรณีพิเศษ"
                    @change="onChangeEvent('special', $event)"
                    :checked="statusSpecial"
                  />
                  <label class="form-check-label" for="Radio5" style="color: #d24c4a"
                    >กรณีพิเศษ</label
                  >
                </div>
              </div>
            </div>

            <div v-for="(item, index) in roomList" :key="index" id="printMe">
              <div class="card mb-2">
                <div class="card-body">
                  <p class="text-start">
                    <MaterialButton
                      variant="outline"
                      color="success"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      >ชั้น {{ item?.floor }}</MaterialButton
                    >
                  </p>
                  <div class="collapse show" id="collapseExample" aria-expanded="true">
                    <div class="flex-container-fluid">
                      <div v-for="(item2, index) in item.data" :key="index">
                        <div
                          class="card mb-2"
                          :class="{
                            'bg-red':
                              item2?.roomStatus == 'unavailable' &&
                              item2?.roomconditions !== 'ชำรุด' &&
                              item2?.roomconditions !== 'เสื่อมโทรม',
                            'bg-green':
                              item2?.roomStatus == 'free' &&
                              item2?.roomconditions !== 'ชำรุด' &&
                              item2?.roomconditions !== 'เสื่อมโทรม',
                            'bg-warning2':
                              item2?.roomconditions == 'ชำรุด' ||
                              item2?.roomconditions == 'เสื่อมโทรม',
                            'bg-return': item2?.roomStatus == 'return',
                            'bgg-red': item2?.roomStatus == 'special',
                          }"
                          :style="{ height: `150px` }"
                        >
                          <div class="card-body p-1">
                            <a
                              style="cursor: pointer"
                              @click="gotodetail(item2?.id, item2?.roomStatus)"
                            >
                              <p
                                class="card-title"
                                style="
                                  color: #000;
                                  border: 2px solid #f7f4f0 !important;
                                  border-radius: 10px;
                                  background: white;
                                "
                              >
                                <a style="font-size: medium"
                                  >{{ item2?.numberRoom }}
                                  <span
                                    v-if="
                                      item2?.typeRoom !== '' &&
                                      item2?.typeRoom !== undefined
                                    "
                                    >({{ item2?.typeRoom }})</span
                                  >
                                </a>
                              </p>
                              <p
                                v-if="
                                  item2?.roomStatus == 'free' &&
                                  item2?.roomconditions !== 'ชำรุด' &&
                                  item2?.roomconditions !== 'เสื่อมโทรม'
                                "
                                class="card-title bgg-green"
                                style="font-size: 18px"
                              >
                                {{ "ว่าง" }}
                              </p>
                              <p
                                v-if="
                                  item2?.roomStatus == 'unavailable' &&
                                  item2?.roomconditions !== 'ชำรุด' &&
                                  item2?.roomconditions !== 'เสื่อมโทรม'
                                "
                                class="card-title bgg-red"
                                style="font-size: 18px"
                              >
                                {{ "ไม่ว่าง" }}
                              </p>
                              <p
                                v-if="
                                  item2?.roomconditions == 'ชำรุด' ||
                                  item2?.roomconditions == 'เสื่อมโทรม'
                                "
                                class="card-title bgg-warning2"
                                style="font-size: 18px"
                              >
                                {{ item2?.roomconditions }}
                              </p>
                              <p
                                v-if="item2?.roomStatus == 'return'"
                                class="card-title bgg-return"
                                style="font-size: 18px"
                              >
                                {{ "ผ่อนผัน" }}
                              </p>
                              <p class="card-title" style="font-size: 14px">
                                {{ item2?.ranks }} {{ item2?.firstName }}
                                {{ item2?.laststName }}
                              </p>
                              <p>
                                <span
                                  v-if="item2?.roomStatus !== 'special'"
                                  style="text-align: right; font-size: small"
                                  >{{ item2?.affiliation }}</span
                                >
                                <span
                                  v-if="item2?.roomStatus == 'special'"
                                  style="
                                    font-size: 18px;
                                    display: flex;
                                    align-items: center;
                                    margin-left: 5px;
                                  "
                                  ><i
                                    class="material-icons me-2"
                                    style="cursor: pointer"
                                    aria-hidden="true"
                                    >star</i
                                  >{{ "กรณีพิเศษ" }}</span
                                >
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เลือกผู้พักอาศัยห้องพัก</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <v-select :options="options" v-model="selectedColor"></v-select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton variant="gradient" color="success">บันทึก</MaterialButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="Edituser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">แก้ไขชื่อคณะกรรมการ</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >ชื่อคณะกรรมการ</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="กรอกชื่อ"
                :value="committee"
                @input="(event) => (committee = event.target.value)"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <MaterialButton
              variant="gradient"
              color="success"
              @click="EdituserForm"
              html-type="submit"
              data-bs-dismiss="modal"
              >บันทึก</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.flex-container-fluid {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container-fluid > div {
  background-color: #f1f1f1;
  width: 150px;
  height: 150px;
  margin: 12px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}
.bg-green {
  background-color: #4cbb17 !important;
  color: #fff;
}
.bg-red {
  background-color: #d24c4a !important;
  color: #fff !important;
}
.bg-warning2 {
  background-color: #fb8c00 !important;
  color: #fff !important;
}
.bg-warning3 {
  background-color: #eada29 !important;
  color: #fff !important;
}
.bg-return {
  background-color: #816613 !important;
  color: #fff !important;
}
.bg-special {
  background-color: #edc7c7 !important;
  color: #fff !important;
}
.bgg-green {
  background-color: #4cbb17 !important;
  color: #fff !important;
}
.bgg-red {
  background-color: #d24c4a !important;
  color: #fff !important;
}
.bgg-warning2 {
  background-color: #fb8c00 !important;
  color: #fff !important;
}
.bgg-warning3 {
  background-color: #eada29 !important;
  color: #fff !important;
}
.bgg-return {
  background-color: #816613 !important;
  color: #fff !important;
}
.bgg-special {
  background-color: #cbc0c0 !important;
  color: #fff !important;
}
.text-red {
  color: #d24c4a !important;
}
ol.breadcrumb {
  padding: 1rem !important;
}
.vue-html2pdf .layout-container {
  left: -110vw !important;
}
</style>
