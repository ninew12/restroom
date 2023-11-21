<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import { notify } from "@kyvg/vue3-notification";
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

    // this.getRooms();
    this.getBuildings();
  },
  watch: {
    selectedtypeRoom: function (newValue) {
      this.roomList = this.roomListOld;
      let filldata = [];
      let filldata2 = [];
      if (newValue !== null) {
        if (newValue.value !== "ทั้งหมด") {
          filldata = this.roomList.map((ele, i) => {
            return ele.data.filter((c) => c.typeRoom == newValue.value);
          });
          let t = Object.keys(filldata).map((ele) => {
            return {
              floor: parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          // filldata2 = t.sort((a, b) => b.floor - a.floor);
          this.roomList = filldata2.sort((a, b) => b.floor - a.floor);
        } else {
          this.roomList = this.roomListOld;
        }
      }
    },

    selectedlistRoom: async function (newValue) {
      let arr = [];
      if (newValue !== null) {
        arr = this.buildingList.find((e) => e.buildingId == newValue.value);
        this.buidingId = arr.listRoom[0].buildingId;
        this.committee = arr.committee;
        this.buildById(this.buidingId);
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
          // let buidingRoomOld = buidingRoom;
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
          datalist =  arr.sort((a, b) => b.floor - a.floor);
          this.roomList = datalist
          this.roomListOld = arr
        });
      } catch (e) {
        console.error(e);
      }
    },
    async getBuildings() {
      try {
        axios.get(`http://localhost:3897/buildings/`).then((res) => {
          let listData = [];
          this.buildingList = res.data;
          this.typeRoomselect = res.data;
          this.listRoom = this.buildingList.map((e) => {
            // console.log(e);
            return {
              label: e.name,
              value: e.buildingId,
            };
          });
          listData = this.listRoom.sort((a, b) => b.floor - a.floor);
          let roomValue = this.buildingList[0];
          this.committee = roomValue.committee;
          // this.onChangeEventRoom("ทั้งหมด")
          // this.selectedlistRoom = { label: roomValue.buil, value: roomValue.buil };
          this.buidingId = roomValue.listRoom[0].buildingId;
          this.dataBuilding = roomValue;
          this.getRooms();
        });
      } catch (e) {
        console.error(e);
      }
    },

    async EdituserForm() {
      let body = {
        committee: this.committee,
      };
      axios
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
          this.getBuildings();
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
          let tt = this.roomList.sort((a, b) => a.floor - b.floor)
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
          let tt = this.roomList.sort((a, b) => a.floor - b.floor)
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
          let tt = this.roomList.sort((a, b) => a.floor - b.floor)
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomconditions == "ชำรุด");
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
          let tt = this.roomList.sort((a, b) => a.floor - b.floor)
          filldata = tt.map((ele, i) => {
            return ele.data.filter((c) => c.roomStatus == "return");
          });
          let t = Object.keys(filldata).map((ele,i) => {
            return {
              floor:  parseInt(ele) + 1,
              data: filldata[ele] || [],
            };
          });
          this.roomList = t.sort((a, b) => b.floor - a.floor);
        }
      } else if (e == "special") {
        if (event.target.checked) {
          let tt = this.roomList.sort((a, b) => a.floor - b.floor)
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
        this.roomList = this.roomListOld;
      }
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
                  <MaterialButton size="lg" class="btn-icon" style="margin-right: -30px">
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
                  <!-- <MaterialCheckbox id="terms6">
                    <a href="javascript:;" class="font-weight-bolder"> ตึกทั้งหมด</a>
                  </MaterialCheckbox> -->
                </div>
                <!-- <label style="margin-right: 10px; margin-left: 20px"
                  >ค้นหาชื่อหรือเลขห้อง
                </label>
                <MaterialInput
                  class="input-group-dynamic w-50"
                  icon="search"
                  type="text"
                  placeholder="Search"
                /> -->
              </div>
            </div>
          </div>

          <div class="text-center pt-4">
            <div class="d-flex justify-content-start align-items-baseline pt-1 w-35">
              <label class="w-30" style="margin-right: 5px; margin-left: -20px">
                เลือกประเภทห้อง</label
              >
              <v-select
                class="w-50"
                :options="typeRoom"
                v-model="selectedtypeRoom"
              ></v-select>
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

            <div v-for="(item, index) in roomList" :key="index">
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
                            'bg-red': item2?.roomStatus == 'unavailable',
                            'bg-green':
                              item2?.roomStatus == 'free' &&
                              item2?.roomconditions !== 'ชำรุด',
                            'bg-warning2': item2?.roomconditions == 'ชำรุด',
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
                                  >ห้อง {{ item2?.numberRoom }}</a
                                >
                              </p>
                              <p
                                v-if="
                                  item2?.roomStatus == 'free' &&
                                  item2?.roomconditions !== 'ชำรุด'
                                "
                                class="card-title bgg-green"
                                style="font-size: 16px"
                              >
                                {{ "ว่าง" }}
                              </p>
                              <p
                                v-if="item2?.roomStatus == 'unavailable'"
                                class="card-title bgg-red"
                                style="font-size: 16px"
                              >
                                {{ "ไม่ว่าง" }}
                              </p>
                              <p
                                v-if="item2?.roomconditions == 'ชำรุด'"
                                class="card-title bgg-warning2"
                                style="font-size: 16px"
                              >
                                {{ "ชำรุด" }}
                              </p>
                              <p
                                v-if="item2?.roomStatus == 'return'"
                                class="card-title bgg-return"
                                style="font-size: 16px"
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
                                  >{{ item2?.Affiliation }}</span
                                >
                                <span
                                  v-if="item2?.roomStatus == 'special'"
                                  style="
                                    font-size: 16px;
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
</style>
