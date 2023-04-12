<template>
  <div class="flex flex-row h-screen">
    <aside class=" is-narrow-mobile  border-r-2 p-0 w-fit h-full">
      <div class="h-full">
        <ul class=" flex flex-col menu-list h-full">
          <li class="flex justify-center mt-2 mb-2">
            <div class="w-fit">
              <span class="menu-label">{{userName}}</span>
            </div>
          </li>
          <li>
            <router-link to="/">
              <div class="w-fit flex flex-row h-full">
                <i class="fa fa-home mr-1"></i>
                <p>Timeline</p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/admin">
              <div class="w-fit flex flex-row">
                <i class="fa fa-table mr-1"></i>
                <p>Admin</p>
              </div>
            </router-link>
          </li>
          <li class="mt-auto">
            <router-link to="/login" event :disabled="true" @click.native="logout()">
              <div class="w-fit flex flex-row">
                <i class=" fa fa-sign-out mr-1"></i>
                <p>Logout</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <div class="w-full ml-2 mt-14">
      <button class="button mb-4" @click="createRecord">create record</button>
      <RecordCreationModal @close-after-action="closeModalAfterAction" @close="closeModal" v-if="ShowRecordCreation"
        :action-type="actionType" :is-active="ShowRecordCreation" :edit-index="editIndex"></RecordCreationModal>
      <Message v-if="showMessage" @close-action="closeMessage" :sucess="sucess" :is-active="showMessage"
        :type="messageType" :message="modalMessage"></Message>
      <DeleteModal @close-action="closeDeleteModal" @delete-record="deleteRecord" :is-active="showDeleteModal"
        v-if="showDeleteModal"></DeleteModal>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Short description</th>
            <th>Type</th>
            <th>Show?</th>
            <th>Actions</th>
            <th>QR code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.name }}</td>
            <td>{{ record.date }}</td>
            <td>{{ record.description_short }}</td>
            <td>{{ record.record_type }}</td>
            <td> <input type="checkbox" v-model="record.is_visible" @change="setShowStatus(record.id)"></td>
            <td>
              <p class="flex flex-row">
                <button class="button is-small" @click="updateRecord(record.id)">
                  <span class="icon is-small">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </span>
                </button>
                <button class="button is-small ml-2" @click="displayDeleteModal(record.id)">
                  <span class="icon is-small">
                    <i class="fa-solid fa-trash"></i>
                  </span>
                </button>
            <td>
              <button class="button is-small" @click="dowloadQrCode(record.id)">
                <span class="icon is-small">
                  <i class="fa-regular fa-circle-down"></i>
                </span>
              </button>
            </td>
            </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RecordCreationModal from '../components/RecordCreationModal.vue'
import Message from '../components/Message.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { onMounted } from 'vue';
export default {
  name: 'adminPage',
  data() {
    return {
      username: "",
      ShowRecordCreation: false,
      actionType: "",
      editIndex: 0,
      messageType: "",
      sucess: "",
      showMessage: false,
      records: null,
      QRcodes: [],
      visibleRecords: null,
      showDeleteModal: false,
      deleteIndex: 0,
      modalMessage: "",
      userName: ""

    };
  },
  props: {
    message: {
      type: String
    }
  },
  components: {
    RecordCreationModal,
    Message,
    DeleteModal,
  },
  methods: {
    async createRecord() {
      this.actionType = "create"
      this.ShowRecordCreation = true
    },
    closeModal() {
      this.ShowRecordCreation = false
    },
    closeModalAfterAction(data) {
      this.ShowRecordCreation = false;
      this.messageType = data.type
      this.sucess = data.sucess
      this.showMessage = true
    },
    closeMessage() {
      this.modalMessage = ''
      this.showMessage = false
      this.getRecords()
    },
    async getRecords() {
      this.records = await this.$records.getRecords()
    },
    async setShowStatus(id) {
      await this.$records.changeVisibility(id)
    },
    updateRecord(id) {
      this.actionType = "edit"
      this.editIndex = id
      this.ShowRecordCreation = true
    },
    displayDeleteModal(id) {
      this.showDeleteModal = true
      this.deleteIndex = id
    },
    async deleteRecord() {
      try {
        await this.$records.deleteProperties(this.deleteIndex)
        this.records = await this.$records.deleteRecord(this.deleteIndex)
        this.showDeleteModal = false
        this.showMessageWindow({ type: 'delete', sucess: 'sucess' })
      }
      catch (error) {
        this.showDeleteModal = false
        this.showMessageWindow({ type: 'delete', sucess: 'failure' })
      }

    },
    closeDeleteModal() {
      this.showDeleteModal = false
      this.deleteIndex = 0
    },
    showMessageWindow(data) {
      this.messageType = data.type
      this.sucess = data.sucess
      this.showMessage = true
    },
    //async setQrCodes() {
    // for (let index = 0; index < document.getElementsByTagName('img').length; index++) {
    //   this.QRcodes.push({ recordId: this.records[index].id, image: document.getElementsByTagName('img')[index].src })
    // }
    // console.log(this.QRcodes[0])
    //await this.$records.postQrCode(13, document.getElementsByTagName('img')[0].src)
    //},
    async dowloadQrCode(id) {
      try {
        var img = await this.$records.downloadQRCode(`${this.$baseUrlImage}/static/images/QRcodes/record${id}.png`, `record with id ${id}`)
      }
      catch (error) {
        this.modalMessage = "No QR code found"
        this.showMessage = true
      }
    },
    async getVisibleRecords() {
      this.visibleRecords = await this.$records.getAllVisibleRecords()
    },
    async logout(){
      await this.$records.logout()
    },

   async getUserData(){
    try{
      let response = await this.$records.getUserData()
      this.userName = response.data.username
    }
    catch(error){

    }
    }

  },
  async created() {
    await this.getRecords()
    this.getUserData()
  }

}
</script>