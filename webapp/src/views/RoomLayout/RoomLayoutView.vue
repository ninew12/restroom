<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import masterData from "@/assets/dataJson/masterData.json";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
      Edifice: "",
      Building: "",
      Floors: "",
      selectedRoomtype: "ช๑",
      buildingList: [],
      searchName: "",
      FloorsList: [],
      roomList: [],
      building_Id: "",
      Area: "",
      typeStatusroom: "",
      buildingType: "บช.ตชด.",
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    // console.log(this.masterData);
    this.getBuildings();
  },
  watch: {
    selectedColor: function (newValue) {
      // this.updateColor(newValue)
      console.log(newValue);
    },
  },
  computed: {
    buildingList() {
      return this.buildingList.filter((item) => item.name.includes(this.searchName));
    },
  },
  methods: {
    changedFloors() {
      let array = [];
      this.building_Id = uuidv4();
      for (let index = 0; index < this.Floors; index++) {
        array.push({
          buildingId: this.building_Id,
          name: this.Building,
          floor: index + 1,
          committee: "",
          rooms: [
            {
              buildingId: this.building_Id,
              id: uuidv4(),
              name: this.building,
              floor: index + 1,
              index: 1,
              numberRoom: 1,
              ranks: "",
              firstName: "",
              laststName: "",
              Affiliation: "",
              typeRoom: "",
              roomconditions: "ปกติ",
              roomStatus: "free",
            },
          ],
          sumroom: 1,
        });
      }
      this.FloorsList = array.reverse();
    },
    addRoom(item) {
      item.rooms.push({
        buildingId: item.buildingId,
        id: uuidv4(),
        name: item.name,
        floor: item.floor,
        index: item.sumroom + 1,
        numberRoom: item.sumroom + 1,
        ranks: "",
        firstName: "",
        laststName: "",
        Affiliation: "",
        typeRoom: "",
        roomconditions: "ปกติ",
        roomStatus: "free",
      });
      item.sumroom = item.sumroom + 1;
    },

    onChangeEventRoom(e) {
      this.buildingType = e;
    },

    clearData(){
      this.FloorsList = []
      this.building_Id = "",
      this.buildingType = "",
      this.Building = "",
      this.Floors = ""
    },

    async submitForm() {
      let sum = 0;
      this.FloorsList.forEach((num) => {
        sum += num.sumroom;
      });
      let body = {
        buildingId: this.building_Id,
        buildingType: this.buildingType,
        buil: this.buildingType,
        name: this.Building,
        sumroom: sum,
        floor: this.Floors,
        roomnumber: "",
        type: "",
        listRoom: this.FloorsList,
      };
      await axios
        .post(`http://localhost:3897/buildings`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.submitRoom();
          this.getBuildings();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async submitRoom() {
      let floorsList = [];
      let floorsLoop = [];
      await this.FloorsList.forEach((e) => {
        e.rooms.forEach((ele) => {
          floorsList.push(ele);
        });
      });
      // let body = floorsList
      floorsLoop = floorsList;
      await floorsLoop.forEach((x) => {
        axios.post(`http://localhost:3897/rooms`, x, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
      });
      notify({
        title: "เพิ่มข้อมูลสำเร็จ",
        type: "success",
      });
    },

    // buildings
    getBuildings() {
      try {
        axios
          .get("http://localhost:3897/buildings")
          .then((res) => {
            this.buildingList = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getBuildingByid(id) {
      try {
        await axios
          .get(`http://localhost:3897/buildings/${id}`)
          .then((res) => {
            let data = res.data;
            this.building_Id = data.buildingId;
            this.buildingType = data.buildingType;
            this.Area = data.buil;
            this.Building = data.name;
            this.Floors = data.floor;
            this.roomList = data.listRoom;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
    Previous() {
      window.history.back();
    },
    deleteLayour(id) {
      this.builId = id;
    },

    submitDelete() {
      axios
        .delete(`http://localhost:3897/buildings/${this.builId}`)
        .then((res) => {
          this.getAlluser();
          notify({
            title: "ลบข้อมูลสำเร็จ",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAlluser() {
      try {
        axios
          .get("http://localhost:3897/buildings")
          .then((res) => {
            this.buildingList = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
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
        <notifications class="pt-6" position="top right" width="400px" />
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
              style="padding"
              :routes="[{ label: 'หน้าหลัก', route: '/home' }, { label: 'ผังห้องพัก' }]"
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
          <h4>ผังห้องพัก</h4>
          <div class="d-flex justify-content-end align-items-baseline">
            <label style="margin-right: 10px">ค้นหาชื่ออาคาร </label>
            <MaterialInput
              class="input-group-dynamic w-30"
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
              data-bs-target="#Addroomplan"
              @click="clearData"
              >สร้างผังห้อง</MaterialButton
            >
          </div>
          <div class="text-center pt-4 table-responsive">
            <table class="table table-hover border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th scope="col">ลำดับ</th>
                  <th scope="col">อาคารบ้านพัก</th>
                  <th scope="col">ชื่ออาคาร</th>
                  <th scope="col">ชั้น</th>
                  <th scope="col">จำนวนห้อง</th>
                  <th scope="col"></th>
                  <!-- <th scope="col">ประเภทห้องพัก</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in buildingList" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item?.buil }}</td>
                  <td>{{ item?.name }}</td>
                  <td>{{ item?.floor }}</td>
                  <td>{{ item?.sumroom }}</td>
                  <td>
                    <i
                      class="material-icons me-2"
                      style="cursor: pointer"
                      aria-hidden="true"
                      @click="getBuildingByid(item?.buildingId)"
                      data-bs-toggle="modal"
                      data-bs-target="#Viewroomplan"
                      >visibility</i
                    >
                  </td>
                  <td>
                    <a
                      @click="deleteLayour(item?.buildingId)"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteLayoutBackdrop"
                      ><i
                        class="material-icons me-2"
                        style="cursor: pointer"
                        aria-hidden="true"
                        >delete</i
                      ></a
                    >
                  </td>
                  <!-- <td>{{ item?.type }}</td> -->
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
      id="Addroomplan"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เพิ่มผังห้อง</h5>
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
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions10"
                    id="Radio43"
                    value="บช.ตชด."
                    :checked="buildingType == 'บช.ตชด.'"
                    @click="onChangeEventRoom('บช.ตชด.')"
                  />
                  <label class="form-check-label" for="Radio43">บช.ตชด.</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions10"
                    id="Radio44"
                    value="ลือชา"
                    :checked="buildingType == 'ลือชา'"
                    @change="onChangeEventRoom('ลือชา')"
                  />
                  <label class="form-check-label" for="Radio44">ลือชา</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions10"
                    id="Radio45"
                    value="บางเขน"
                    :checked="buildingType == 'บางเขน'"
                    @change="onChangeEventRoom('บางเขน')"
                  />
                  <label class="form-check-label" for="Radio45">บางเขน</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions10"
                    id="Radio42"
                    value="อื่นๆ"
                    :checked="buildingType == 'อื่นๆ'"
                    @click="onChangeEventRoom('อื่นๆ')"
                  />
                  <label class="form-check-label" for="Radio42">อื่นๆ</label>
                </div>
              </div>
              <div class="mb-3">
                <label class="starRed">ชื่ออาคาร</label>
                <MaterialInput
                  :value="Building"
                  @input="(event) => (Building = event.target.value)"
                  class="input-group-static"
                  type="text"
                  placeholder="ชื่ออาคาร"
                />
              </div>
              <div class="mb-3">
                <label class="starRed">จำนวนชั้น</label>
                <MaterialInput
                  :value="Floors"
                  @input="(event) => (Floors = event.target.value)"
                  class="input-group-static"
                  type="number"
                  placeholder="จำนวนชั้น"
                  @change="changedFloors()"
                />
                <div class="card pt-4" v-for="(item, index) in FloorsList" :key="index">
                  <ul
                    class="list-group list-group-flush"
                    style="border: 2px solid #2b572d"
                  >
                    <li class="list-group-item">
                      <span style="font-size: 16px; font-weight: bold"
                        >ชั้นที่ {{ item.floor }}</span
                      >
                      <div>
                        <label
                          style="font-size: 16px; font-weight: bold; margin-left: 20px"
                        >
                          จำนวนห้อง {{ item.sumroom }}
                        </label>
                      </div>
                      <div class="flex-container2">
                        <div v-for="(item2, index) in item?.rooms" :key="index">
                          ห้อง {{ item2.numberRoom }}
                        </div>
                        <div
                          style="
                            background: white;
                            color: #000;
                            border: 2px solid #4cbb17;
                            cursor: pointer;
                            text-decoration: underline;
                            font-size: 18px;
                          "
                        >
                          <a @click="addRoom(item)">เพิ่มห้อง</a>
                        </div>
                      </div>
                    </li>
                  </ul>
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

    <div
      class="modal fade"
      id="Viewroomplan"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">รายละเอียดผังห้อง</h5>
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
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio23"
                    value="บช.ตชด."
                    :checked="buildingType == 'บช.ตชด.'"
                    disabled
                  />
                  <label class="form-check-label" for="Radio23">บช.ตชด.</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio24"
                    value="ลือชา"
                    :checked="buildingType == 'ลือชา'"
                    disabled
                  />
                  <label class="form-check-label" for="Radio24">ลือชา</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio25"
                    value="บางเขน"
                    :checked="buildingType == 'บางเขน'"
                    disabled
                  />
                  <label class="form-check-label" for="Radio25">บางเขน</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="Radio22"
                    value="อื่นๆ"
                    :checked="buildingType == 'อื่นๆ'"
                    disabled
                  />
                  <label class="form-check-label" for="Radio22">อื่นๆ</label>
                </div>
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Area"
                  @input="(event) => (Area = event.target.value)"
                  class="input-group-static"
                  label="อาคารบ้านพัก"
                  type="text"
                  placeholder="อาคารบ้านพัก"
                  :isDisabled="true"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Building"
                  @input="(event) => (Building = event.target.value)"
                  class="input-group-static"
                  label="ชื่ออาคาร"
                  type="text"
                  placeholder="ชื่ออาคาร"
                  :isDisabled="true"
                />
              </div>
              <div class="mb-3">
                <MaterialInput
                  :value="Floors"
                  @input="(event) => (Floors = event.target.value)"
                  class="input-group-static"
                  label="จำนวนชั้น"
                  type="number"
                  placeholder="จำนวนชั้น"
                  :isDisabled="true"
                />
                <div class="card pt-4" v-for="(item, index) in roomList" :key="index">
                  <ul
                    class="list-group list-group-flush"
                    style="border: 2px solid #2b572d"
                  >
                    <li class="list-group-item">
                      <span style="font-size: 16px; font-weight: bold"
                        >ชั้นที่ {{ item.floor }}</span
                      >
                      <div>
                        <label
                          style="font-size: 16px; font-weight: bold; margin-left: 20px"
                        >
                          จำนวนห้อง {{ item.sumroom }}
                        </label>
                      </div>
                      <div class="flex-container2">
                        <div v-for="(item2, index) in item?.rooms" :key="index">
                          ห้อง {{ item2.numberRoom }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิดหน้าต่าง
            </button>
            <!-- <MaterialButton
              variant="gradient"
              color="success"
              @click="submitForm"
              html-type="submit"
              data-bs-dismiss="modal"
              >บันทึก</MaterialButton
            > -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteLayoutBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">ลบผังห้อง</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">คุณต้องการที่จะลบผังห้องใช่หรือไม่</div>
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
.flex-container2 {
  display: flex;
  flex-wrap: wrap;
}

.flex-container2 > div {
  background-color: #4cbb17;
  color: white;
  width: 98px;
  margin: 10px;
  height: 80px;
  text-align: center;
  font-size: 24px;
  line-height: 80px;
}
</style>
