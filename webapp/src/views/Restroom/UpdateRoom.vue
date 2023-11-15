<script>
import { onMounted } from "vue";

//image
import image from "@/assets/img/illustrations/illustration-signin.jpg";
import vueMkHeader from "@/assets/img/bg.jpg";
//material components
import MaterialInput from "@/components/MaterialInput.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";

import MaterialButton from "@/components/MaterialButton.vue";
// material-input
import setMaterialInput from "@/assets/js/material-input";

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
    };
  },

  data() {
    return {
      options: [
        { label: "มกราคม", value: "01" },
        { label: "กุมภาพันธ์", value: "02" },
        { label: "มีนาคม", value: "03" },
        { label: "เมษายน", value: "04" },
        { label: "พฤษภาคม", value: "05" },
        { label: "มิถุนายน", value: "06" },
        { label: "กรกฎาคม ", value: "07" },
        { label: "สิงหาคม", value: "08" },
        { label: "กันยายน", value: "09" },
        { label: "ตุลาคม", value: "10" },
        { label: "พฤศจิกายน", value: "11" },
        { label: "ธันวาคม", value: "12" },
      ],
      optionsRoomtype: [
        { label: "ช1", value: "ช1" },
        { label: "ช2", value: "ช2" },
        { label: "ช3", value: "ช3" },
      ],

      selectedBuilding: "อาคารแฟลต 1/11",
      selectedFloor: "ชั้น 1",
      selectedRoom: "ห้อง 101",
      selectedMonth: "ตุลาคม",
      firstName: "สมชาย",
      lastName: "0237",
      Affiliation: "0426 ", //สังกัด
      rank: "ปกติ", //ยศ
      idcard: "120",
      phone: "1200",
      old: "100",
      birthday: "200",
      Roomtype: "ช1",
      Roomconditions: "ปกติ",
      selectedRoomtype: "ช1",
      statusedit: false,
      mode: "",
      id: "",
      numberRoom: "",
      leniency: "",
      roomData: [],
      houseRegistration: "",
      payMonth: "",
      roomKey: "",
      houseRegistrationcause: "",
      payMonthcause: "",
      roomKeycause: "",
      payMonthcausetwo: "",
      deposit: "รอคืนเงินประกัน",
      roomId: "",
      dateApp: new Date(),
      historyOld: [],
      bankbookName: "",
      bankbookNumber: "",
    };
  },
  created() {
    let userold = localStorage.getItem("user");
    if (userold === null) this.$router.push({ path: `/login` });
    this.mode = this.$route.query.mode;
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getRooms(this.id);
    }
    // this.$route.query
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
    queuetypefilter(e) {
      if (e.target) this.Roomconditions = e.target.value;
    },
    roomKeyfilter(e) {
      if (e.target) this.roomKey = e.target.value;
    },
    houseRegistrationfilter(e) {
      if (e.target) this.houseRegistration = e.target.value;
    },
    payMonthfilter(e) {
      if (e.target) this.payMonth = e.target.value;
    },
    async getRooms(id) {
      try {
        await axios
          .get(`http://localhost:3897/rooms/${id}`)
          .then((res) => {
            this.roomData = res.data;
            this.numberRoom = this.roomData.numberRoom;
            this.roomId = this.roomData.id;
            this.userId = this.roomData.userId;
            this.selectedRoomtype = this.roomData.typeRoom;
            this.getHistoryRoom(this.roomData.id);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getHistoryRoom(id) {
      try {
        await axios
          .get(`http://localhost:3897/history/${id}`)
          .then((res) => {
            if (res.data.customerOld == "คืนห้องพักแล้ว") {
              this.historyOld = res.data;
              this.historyOld["dateApproved"] = this.convertDateTolocal(
                this.historyOld.dateApproved
              );
              this.historyOld["dateReturn"] = this.convertDateTolocal(
                this.historyOld.dateReturn
              );
            } else {
              this.historyOld = [];
            }
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
        const formatter = new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedDate = formatter.format(date);
        return formattedDate;
      } else {
        return "";
      }
    },

    submitForm() {
      let body = {
        numberRoom: this.numberRoom,
        typeRoom: this.selectedRoomtype.label,
        roomconditions: this.Roomconditions,
      };
      axios
        .put(`http://localhost:3897/rooms/${this.id}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "แก้ไข้รายละเอียดห้องพักสำเร็จ",
            type: "success",
          });
          this.getRooms(this.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitLeniency() {
      let body = {
        leniency: this.leniency,
      };
      axios
        .put(`http://localhost:3897/rooms/${this.id}`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "บันทึกการผ่อนผันสำเร็จ",
            type: "success",
          });
          this.getRooms(this.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    returnsubmitForm() {
      let body = {
        roomStatus: "free",
        firstName: " ",
        laststName: " ",
        ranks: " ",
        Affiliation: " ",
        queue: "none",
        roomKey: this.roomKey,
        houseRegistration: this.houseRegistration,
        payMonth: this.payMonth,
        houseRegistrationcause: this.houseRegistrationcause,
        payMonthcause: this.payMonthcause,
        payMonthcausetwo: this.payMonthcausetwo,
        roomKeycause: this.roomKeycause,
        deposit: "รอคืนเงินประกัน",
        dateReturn: this.dateApp.toISOString(),
        customerOld: "คืนห้องพักแล้ว",
        bankbookName: this.bankbookName,
        bankbookNumber: this.bankbookNumber,
      };
      axios
        .put(`http://localhost:3897/rooms/${this.id}`, body, {
          headers: {
            // remove headers
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          notify({
            title: "คืนห้องพักสำเร็จ",
            type: "success",
          });
          this.updatedataUser();
          this.getRooms(this.id);
          this.$router.push({ path: `/room/` });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updatedataUser() {
      let body = {
        queue: "none",
        deposit: this.deposit,
        roomKey: this.roomKey,
        houseRegistration: this.houseRegistration,
        payMonth: this.payMonth,
        houseRegistrationcause: this.houseRegistrationcause,
        payMonthcause: this.payMonthcause,
        payMonthcausetwo: this.payMonthcausetwo,
        roomId: this.roomId,
        dateReturn: this.dateApp.toISOString(),
        customerOld: "คืนห้องพักแล้ว",
        bankbookName: this.bankbookName,
        bankbookNumber: this.bankbookNumber,
      };
      axios.put(`http://localhost:3897/users/${this.userId}`, body, {
        headers: {
          // remove headers
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },

    updatedataHistory() {
      let body = {
        queue: "none",
        deposit: this.deposit,
        roomKey: this.roomKey,
        houseRegistration: this.houseRegistration,
        payMonth: this.payMonth,
        houseRegistrationcause: this.houseRegistrationcause,
        payMonthcause: this.payMonthcause,
        payMonthcausetwo: this.payMonthcausetwo,
        roomId: this.roomId,
        dateReturn: this.dateApp.toISOString(),
        customerOld: "คืนห้องพักแล้ว",
      };
      axios.put(`http://localhost:3897/users/${this.userId}`, body, {
        headers: {
          // remove headers
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
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
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 pt-6">
      <div class="page-header min-vh-45">
        <div class="container">
          <div>
            <Breadcrumbs
              :routes="[
                { label: 'หน้าหลัก', route: '/home' },
                { label: 'สถานะห้องพัก', route: '/room' },
                { label: 'จัดการห้องพัก' },
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
          <h4>จัดการห้องพัก</h4>
          <notifications class="pt-6" position="top center" width="400px" />
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
                  แก้ไขรายละเอียดห้องพัก
                </button>
                <button
                  class="nav-link"
                  id="v-pills-history-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-history"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-history"
                  aria-selected="false"
                >
                  ประวัติการเข้าพัก
                </button>
                <button
                  v-if="this.mode !== 'add'"
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  คืนห้องพัก
                </button>
                <button
                  v-if="this.mode !== 'add'"
                  class="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  ผ่อนผัน
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
                  <div class="p-4">
                    <div>
                      <h5>แก้ไขรายละเอียด ห้อง {{ numberRoom }}</h5>
                      <div class="mb-3">
                        <label class="starRed">เลขห้อง</label>
                        <MaterialInput
                          :value="numberRoom"
                          @input="(event) => (numberRoom = event.target.value)"
                          class="input-group-static"
                          type="text"
                          placeholder="เลขห้อง"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="starRed">ประเภทห้องพัก</label>
                        <v-select
                          :options="optionsRoomtype"
                          v-model="selectedRoomtype"
                        ></v-select>
                      </div>

                      <div class="mb-3">
                        <div class="form-check form-check-inline">
                          <label style="margin-right: 20px" class="starRed">สภาพห้อง</label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="ปกติ"
                            @change="queuetypefilter($event)"
                            :checked="Roomconditions == 'ปกติ'"
                          />
                          <label class="form-check-label" for="inlineRadio1">ปกติ</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="ชำรุด"
                            @change="queuetypefilter($event)"
                            :checked="Roomconditions == 'ชำรุด'"
                          />
                          <label class="form-check-label" for="inlineRadio2">ชำรุด</label>
                        </div>
                      </div>
                    </div>

                    <div class="text-center">
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
                <div
                  class="tab-pane fade show"
                  id="v-pills-history"
                  role="tabpanel"
                  aria-labelledby="v-pills-history-tab"
                >
                  <div class="p-4">
                    <div>
                      <h5>ประวัติการเข้าพัก</h5>
                      <div class="col-5">
                        <p class="card-text">
                          ชือ-สกุล : {{ historyOld?.rank }} {{ historyOld?.firstName }}
                          {{ historyOld?.lastName }}
                        </p>
                        <p class="card-text">
                          วันที่เข้าพัก : {{ historyOld?.dateApproved || "-" }}
                        </p>
                        <p class="card-text">
                          วันที่คืนห้องพัก : {{ historyOld?.dateReturn || "-" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <div>
                    <div>
                      <div
                        class="mb-3"
                        style="
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                        "
                      >
                        <div class="form-check form-check-inline">
                          <label style="margin-right: 20px" class="starRed">กุญแจห้อง</label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions4"
                            id="inlineRadio11"
                            value="มี"
                            @change="roomKeyfilter($event)"
                            :checked="roomKey == 'ไม่มี'"
                          />
                          <label class="form-check-label" for="inlineRadio11">มี</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions4"
                            id="inlineRadio12"
                            value="ไม่มี"
                            @change="roomKeyfilter($event)"
                            :checked="roomKey == 'ไม่มี'"
                          />
                          <label class="form-check-label" for="inlineRadio12"
                            >ไม่มี</label
                          >
                        </div>
                        <div style="width: 360px; margin-bottom: 10px">
                          <MaterialInput
                            name="roomKeycause"
                            :value="roomKeycause"
                            @input="(event) => (roomKeycause = event.target.value)"
                            class="input-group-static"
                            type="text"
                            placeholder="สาเหตุ"
                          />
                        </div>
                      </div>
                      <div
                        class="mb-3"
                        style="
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                        "
                      >
                        <div class="form-check form-check-inline">
                          <label style="margin-right: 20px" class="starRed">ทะเบียนบ้าน</label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions11"
                            id="inlineRadio27"
                            value="มี"
                            @change="houseRegistrationfilter($event)"
                            :checked="houseRegistration == 'มี'"
                          />
                          <label class="form-check-label" for="inlineRadio27">มี</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions11"
                            id="inlineRadio28"
                            value="ไม่มี"
                            @change="houseRegistrationfilter($event)"
                            :checked="houseRegistration == 'ไม่มี'"
                          />
                          <label class="form-check-label" for="inlineRadio28"
                            >ไม่มี</label
                          >
                        </div>
                        <div style="width: 360px; margin-bottom: 10px">
                          <MaterialInput
                            name="contract"
                            :value="houseRegistrationcause"
                            @input="
                              (event) => (houseRegistrationcause = event.target.value)
                            "
                            class="input-group-static"
                            type="text"
                            placeholder="สาเหตุ"
                          />
                        </div>
                      </div>
                      <div>
                        <label style="padding-left: 30px" class="starRed"
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
                            name="inlineRadioOptions2"
                            id="inlineRadio22"
                            value="มี"
                            @change="payMonthfilter($event)"
                            :checked="payMonth == 'มี'"
                          />
                          <label class="form-check-label" for="inlineRadio22">มี</label>
                        </div>
                        <div style="width: 250px; margin-bottom: 10px">
                          <MaterialInput
                            name="payMonthcause"
                            :value="payMonthcause"
                            @input="(event) => (payMonthcause = event.target.value)"
                            class="input-group-static"
                            type="text"
                            placeholder="สาเหตุ"
                          />
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions2"
                            id="inlineRadio23"
                            value="ไม่มี"
                            @change="payMonthfilter($event)"
                            :checked="payMonth == 'ไม่มี'"
                          />
                          <label class="form-check-label" for="inlineRadio23"
                            >ไม่มี</label
                          >
                        </div>
                        <div style="width: 250px; margin-bottom: 10px">
                          <MaterialInput
                            name="payMonthcausetwo"
                            :value="payMonthcausetwo"
                            @input="(event) => (payMonthcausetwo = event.target.value)"
                            class="input-group-static"
                            type="text"
                            placeholder="สาเหตุ"
                          />
                        </div>
                      </div>
                      <div
                        class="mb-3"
                        style="
                          margin-left: 40px;
                          display: flex;
                          justify-content: flex-start;
                          align-items: center;
                        "
                      >
                      <label class="starRed" style="margin-right: 20px">ข้อมูลธนาคาร</label>
                        <div
                          style="width: 250px; margin-bottom: 10px; margin-right: 20px"
                        >
                          <MaterialInput
                            name="bankbookName"
                            :value="bankbookName"
                            @input="(event) => (bankbookName = event.target.value)"
                            class="input-group-static"
                            type="text"
                            placeholder="ชื่อธนาคาร"
                          />
                        </div>
                        <div style="width: 250px; margin-bottom: 10px">
                          <MaterialInput
                            name="bankbookNumber"
                            :value="bankbookNumber"
                            @input="(event) => (bankbookNumber = event.target.value)"
                            class="input-group-static"
                            type="text"
                            placeholder="เลขบัญชีธนาคาร"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="pt-4 text-end">
                      <MaterialButton
                        variant="gradient"
                        color="success"
                        @click="returnsubmitForm"
                        html-type="submit"
                        >บันทึก</MaterialButton
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  <div>
                    <div class="mb-3">
                      <label style="margin-left: -5px">ผ่อนผันถึง</label>
                      <textarea
                        :value="leniency"
                        @input="(event) => (leniency = event.target.value)"
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
                        placeholder="ผ่อนผันถึง"
                      ></textarea>
                    </div>
                    <div class="pt-4 text-end">
                      <MaterialButton
                        variant="gradient"
                        color="success"
                        @click="submitLeniency"
                        html-type="submit"
                        >บันทึก</MaterialButton
                      >
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
                <label>ชื่อผู้พักอาศัย</label>
                <v-select :options="optionsUser" v-model="selectedColor"></v-select>
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
.vs__actions {
  cursor: pointer;
}
.h-noti {
  height: 250px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff !important;
  background-color: #4cbb17 !important;
}
</style>
