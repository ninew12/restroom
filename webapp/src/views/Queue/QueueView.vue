<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import vueMkHeader from "@/assets/img/bg.jpg";
import userData from "@/assets/dataJson/users.json";
import axios from "axios";
// import Datepicker from "vue3-datepicker";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { notify } from "@kyvg/vue3-notification";
// const date = ref();
export default {
  components: {
    MaterialInput,
    MaterialButton,
    Breadcrumbs,
    Datepicker,
  },
  setup() {
    return {
      vueMkHeader,
      userData,
    };
  },

  data() {
    return {
      obtionBuil: [
        { label: "บช.ตชด.", value: "บช.ตชด." },
        { label: "ลือชา", value: "ลือชา" },
        { label: "บางเขน", value: "บางเขน" },
        { label: "อื่นๆ", value: "อื่นๆ" },
      ],
      selectedUser: "เลือกชื่อผู้พักอาศัย",
      firstName: "",
      lastName: "",
      Affiliation: "", //สังกัด
      rank: "", //ยศ
      idcard: "",
      phone: "",
      bookNumber: "",
      queueList: [],
      userList: [],
      userByid: {},
      searchName: "",
      typeUserByqueue: "ทั้งหมด",
      typeroomByqueue: "ช1",
      olddatatypeQueue: [],
      datatypeQueue: [],
      no: 0,
      userId: "",
      id: "",
      picked: new Date(),
      buildingName: "",
      buildingType: "",
      buildingType2: "",
      building: [],
      selectedBuildingName: "เลือกอาคาร2",
      seleteBuildingType: "เลือกอาคาร1",
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    this.getAllqueue();
    this.getAllbuildings();
    this.getAllNoqueue();
  },
  watch: {
    selectedUser: function (newValue) {
      if (newValue !== null) this.getAllusersByid(newValue.value);
    },
    selectedBuildingName: function (newValue) {
      console.log(newValue.value);
      if (newValue !== null) this.buildingType2 = newValue.value;
    },
    seleteBuildingType: function (newValue) {
      if (newValue !== null) this.buildingType = newValue.value;
    },
  },
  computed: {
    queueList() {
      return this.queueList.filter((item) => item.firstName.includes(this.searchName));
    },
  },
  methods: {
    changedLabel(event) {
      console.log(event);
      // this.selected = event;
    },

    queuetypefilter(e) {
      if (e.target) {this.typeroomByqueue = e.target.value;}
    },

    editTypeRoom(event) {
      this.typeroomByqueue = event.typeRoom;
      this.userId = event.id
    },

    queuefilter(e) {
      if (e.target) this.typeUserByqueue = e.target.value;
      else this.typeUserByqueue = e;
      this.datatypeQueue = this.olddatatypeQueue;
      if (this.typeUserByqueue !== "ทั้งหมด") {
        let dataqueue = this.datatypeQueue.filter(
          (e) => e.typeRoom == this.typeUserByqueue
        );
        this.queueList = dataqueue;
      } else if (this.typeUserByqueue == "ทั้งหมด") {
        this.queueList = this.datatypeQueue;
      }
    },
    getAllqueue() {
      try {
        axios
          .get(`http://localhost:3899/queue/inqueue`)
          .then((res) => {
            this.queueList = res.data;
            this.olddatatypeQueue = this.queueList;
            this.queueList.sort((a, b) => a.pickedBook - b.pickedBook);
            this.no = this.queueList.length + 1;
            this.queuefilter("ทั้งหมด");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getAllusersByid(id) {
      try {
        axios
          .get(`http://localhost:3899/users/${id}`)
          .then((res) => {
            let data = res.data;
            this.userByid = data;
            this.userId = this.userByid.userId
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    getAllNoqueue() {
      try {
        axios
          .get(`http://localhost:3899/queue/none`)
          .then((res) => {
            let arr = res.data;
            let arr2 = [];
            arr2 = arr.filter((e) => e.typeUser == "บช.ตชด." && e.queue !== "inroom");
            this.userList = arr2.map((ele) => {
              return {
                label: ele.rank + " " + ele.firstName + " " + ele.lastName,
                value: ele.userId,
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
    getAllbuildings() {
      try {
        axios
          .get(`http://localhost:3899/buildings/`)
          .then((res) => {
            this.building = res.data.map((ele) => {
              return {
                label: ele.name,
                value: ele.name,
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
    getAllusers() {
      try {
        axios
          .get("http://localhost:3899/users")
          .then((res) => {
            this.userList = res.data.map((ele) => {
              return {
                label: ele.rank + " " + ele.firstName + " " + ele.lastName,
                value: ele.userId,
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

    seleteUser(){
      this.selectedUser = "เลือกชื่อผู้พักอาศัย",
      this.seleteBuildingType = "เลือกอาคาร1",
      this.selectedBuildingName = "เลือกอาคาร2",
      this.bookNumber = "",
      this.picked = new Date(),
      this.typeroomByqueue = "ช1"
    },

    submitForm() {
      let body = {
        ...this.userByid,
        no: this.no,
        bookNumber: this.bookNumber,
        pickedBook: this.picked.toISOString(),
        typeRoom: this.typeroomByqueue,
        buildingType2: this.buildingType2,
        buildingType: this.buildingType,
        queue: "inqueue",
      };
      delete body.id;
      axios
        .put(`http://localhost:3899/queue/${this.userId}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "ทำรายการสำเร็จ",
            type: "success",
          });
          this.updateUser()
          setTimeout(() => {
            this.getAllqueue();
          }, 500);  
        })
        .catch((err) => {
          console.log(err);
        });
    },

    EditsubmitForm() {
      let body = {
        typeRoom: this.typeroomByqueue,
      };
      delete body.id;
      axios
        .put(`http://localhost:3899/queue/${this.userId}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "แก้ไขรายการสำเร็จ",
            type: "success",
          });
          setTimeout(() => {
            this.getAllqueue();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUser() {
      let body = {
        buildingName: this.buildingName,
        bookNumber: this.bookNumber,
      };
      delete body.id;
      axios
        .put(`http://localhost:3899/users/${this.userId}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.getAllqueue();
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
              :routes="[{ label: 'หน้าหลัก', route: '/home' }, { label: 'ระบบคิว' }]"
            />
          </div>
          <notifications class="pt-6" position="top center" width="400px" />

          <div class="mb-3">
            <a
              style="display: flex; align-items: center; cursor: pointer"
              @click="Previous"
            >
              <span class="material-icons"> arrow_back_ios_new </span>
              <span>ย้อนกลับ</span>
            </a>
          </div>
          <h4>ระบบคิว</h4>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="mb-3">
              <div class="form-check form-check-inline">
                <label style="margin-right: 20px">ประเภทห้องพัก</label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="ช1"
                  @change="queuefilter($event)"
                  :checked="typeUserByqueue == 'ช1'"
                />
                <label class="form-check-label" for="inlineRadio1">ช1</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="ช2"
                  @change="queuefilter($event)"
                  :checked="typeUserByqueue == 'ช2'"
                />
                <label class="form-check-label" for="inlineRadio2">ช2</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="ช3"
                  @change="queuefilter($event)"
                  :checked="typeUserByqueue == 'ช3'"
                />
                <label class="form-check-label" for="inlineRadio3">ช3</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="ทั้งหมด"
                  @change="queuefilter($event)"
                  :checked="typeUserByqueue == 'ทั้งหมด'"
                />
                <label class="form-check-label" for="inlineRadio4">ทั้งหมด</label>
              </div>
            </div>
            <div class="d-flex align-items-baseline">
              <label style="margin-right: 20px">ค้นหาชื่อ </label>
              <MaterialInput
                style="margin-right: 20px; width: 300px"
                class="input-group-dynamic"
                icon="search"
                type="text"
                placeholder="Search"
                :value="searchName"
                @input="(event) => (searchName = event.target.value)"
              />
              <MaterialButton
                variant="gradient"
                color="success"
                data-bs-toggle="modal"
                data-bs-target="#seleteUserBackdrop"
                @click="seleteUser"
                >เพิ่มผู้พักอาศัยลงคิว</MaterialButton
              >
            </div>
          </div>
          <div class="text-center pt-4 table-responsive">
            <table class="table border border-2 border-success">
              <thead class="border border-2 border-success border-bottom">
                <tr>
                  <th scope="col">ลำดับ</th>
                  <!-- <th scope="col">ยศ</th> -->
                  <th scope="col">ชื่อ-สกุล</th>
                  <th scope="col">สังกัด</th>
                  <th scope="col">อาคาร1</th>
                  <th scope="col">อาคาร2</th>
                  <th scope="col">สถานภาพ</th>
                  <th scope="col">เลขบัตรประชาชน</th>
                  <th scope="col">เบอร์ติดต่อ</th>
                  <th scope="col">เลขลงรับหนังสือ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in queueList" :key="index">
                  <th scope="row">{{ index+1 }}</th>
                  <td>{{ item?.rank }} {{ item?.firstName }} {{ item?.lastName }}</td>
                  <td>{{ item?.affiliation }}</td>
                  <td>{{ item?.buildingType }}</td>
                  <td>{{ item?.buildingType2 }}</td>
                  <td>{{ item?.status }}</td>
                  <td>{{ item?.idcard }}</td>
                  <td>{{ item?.phone }}</td>
                  <td>{{ item?.bookNumber }}</td>
                  <td>
                    <a
                      @click="editTypeRoom(item)"
                      data-bs-toggle="modal"
                      data-bs-target="#editTypeBackdrop"
                      ><i
                        class="material-icons me-2"
                        style="cursor: pointer"
                        aria-hidden="true"
                        >edit</i
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
    <div
      class="modal fade"
      id="seleteUserBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เพิ่มผู้พักอาศัยลงคิว</h5>
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
                <label class="starRed">ชื่อผู้พักอาศัย</label>
                <v-select :options="userList" v-model="selectedUser"></v-select>
              </div>
              <div class="mb-3">
                <label class="starRed">อาคาร1</label>
                <v-select :options="obtionBuil" v-model="seleteBuildingType"></v-select>
              </div>
              <div class="mb-3">
                <label class="starRed">อาคาร2</label>
                <v-select :options="obtionBuil" v-model="selectedBuildingName"></v-select>
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

              <div class="mb-4">
                <label style="margin-left: -5px">วันเวลาที่ลงรับหนังสือ</label>
                <Datepicker style="text-align: center" v-model="picked" />
              </div>
              <div class="mb-3">
                <label style="margin-right: 20px" class="starRed">ประเภทห้องพัก</label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio5"
                    value="ช1"
                    @change="queuetypefilter($event)"
                    checked
                  />
                  <label class="form-check-label" for="inlineRadio5">ช1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio6"
                    value="ช2"
                    @change="queuetypefilter($event)"
                  />
                  <label class="form-check-label" for="inlineRadio6">ช2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio7"
                    value="ช3"
                    @change="queuetypefilter($event)"
                  />
                  <label class="form-check-label" for="inlineRadio7">ช3</label>
                </div>
              </div>
              <div class="row g-0" v-if="selectedUser !== ''">
                <div class="col-md-12">
                  <div class="row">
                    <h5 class="card-title">รายละเอียด</h5>
                    <p class="card-text pt-1">
                      ชือ-สกุล : {{ userByid?.rank }} {{ userByid?.firstName }}
                      {{ userByid?.lastName }}
                    </p>
                    <p class="card-text">สังกัด : {{ userByid?.affiliation }}</p>
                    <p class="card-text">เลขบัตรประชาชน : {{ userByid?.idcard }}</p>
                    <p class="card-text">สถานภาพ : {{ userByid?.status }}</p>
                    <p class="card-text">เบอร์โทร : {{ userByid?.phone }}</p>
                  </div>
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
      id="editTypeBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">แก้ไขประเภทห้องพัก</h5>
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
                <label style="margin-right: 20px" class="starRed">ประเภทห้องพัก</label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions33"
                    id="inlineRadio32"
                    value="ช1"
                    @change="queuetypefilter($event)"
                    :checked="typeroomByqueue == 'ช1'"
                  />
                  <label class="form-check-label" for="inlineRadio32">ช1</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions55"
                    id="inlineRadio33"
                    value="ช2"
                    :checked="typeroomByqueue == 'ช2'"
                    @change="queuetypefilter($event)"
                  />
                  <label class="form-check-label" for="inlineRadio33">ช2</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions55"
                    id="inlineRadio34"
                    value="ช3"
                    :checked="typeroomByqueue == 'ช3'"
                    @change="queuetypefilter($event)"
                  />
                  <label class="form-check-label" for="inlineRadio34">ช3</label>
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
              @click="EditsubmitForm"
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
