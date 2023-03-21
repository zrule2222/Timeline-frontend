<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">

          <p v-if="this.actionType == 'create'" class="modal-card-title">Add Record</p>
          <p v-else class="modal-card-title">Edit Record</p>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Record name</label>
            <div class="control">
              <input class="input" :class="badRecordName ? 'is-danger' : ''" v-model="recordName" type="text"
                placeholder="Name">
              <p v-show="badRecordName" class="help is-danger">Record Name is empty</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Record date</label>
            <datepicker :class="badRecordDate ? 'is-danger' : ''"  v-model="recordDate" placeholder="Record date" :config="{ dateFormat: 'Y-m-d', static: true }">
            </datepicker>
            <p v-show="badRecordDate" class="help is-danger">Record Date is empty</p>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <textarea :class="badRecordDescription ? 'is-danger' : ''" v-model="recordDescription" class="textarea"
              placeholder="Description area"></textarea>
            <p v-show="badRecordDescription" class="help is-danger">Description is empty</p>
          </div>
          <div class="field">
            <label class="label">Short Description</label>
            <textarea :class="badRecordShortDescription ? 'is-danger' : ''" v-model="recordShortDescription"
              class="textarea" placeholder="Short description area"></textarea>
            <p v-show="badRecordShortDescription" class="help is-danger">Short Description is empty</p>
          </div>
          <div class="field">
            <label class="label">Record type</label>
            <div class="control">
              <div class="select" :class="badRecordType ? 'is-danger' : ''">
                <select v-model="recordType">
                  <option value="" disabled selected>Select Type</option>
                  <option value="product">Product</option>
                  <option value="event">Event</option>
                </select>
                <p v-show="badRecordType" class="help is-danger">Record Type not selected</p>
              </div>
            </div>
          </div>
          <div v-if="actionType == 'edit'" class="field">
            <label class="label">Show record?</label>
            <input type="checkbox" v-model="isVisible">
          </div>
          <div class="field">
            <label class="label">Upload image</label>
            <input type="file" multiple accept="image/jpeg, image/png" @change="onFileChange($event)">
            <div v-if="images">
              <div v-for="(image, index) in images">
                <img v-if="actionType == 'create'" :src="image" />
                <img v-else :src="`${image}`" />
                <button @click="removeImage(index)">Remove image</button>
              </div>
            </div>
          </div>

        </section>

        <footer class="modal-card-foot">
          <button @click="doAction" class="button is-success">Save changes</button>
          <button @click.prevent="close()" class="button is-danger">Close</button>
        </footer>


      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import QRCode from 'qrcode'
export default {
  name: 'RecordCreationModal',
  data() {
    return {
      Authors: [],
      recordName: "",
      recordDate: "",
      recordDescription: "",
      recordShortDescription: "",
      recordType: "",
      badContent: false,
      badAuthor: false,
      image: "",
      imagesToPost: [],
      images: [],
      badRecordName: false,
      badRecordDate: false,
      badRecordDescription: false,
      badRecordShortDescription: false,
      badRecordType: false,
      isVisible: false,
      generateQR: false,
      recordId: 0,
      QRuri: "",
      componentKey: 0,
      newImages: [],
      newImageToUpdate: [],
      imagesToRemove: [],
      imageNames: [],
    }
  },
  components: {
    Datepicker
  },
  props: {
    actionType: { type: String, required: true },
    editIndex: { type: Number },
    isActive: { type: Boolean, default: false, required: true }
  },
  methods: {
    closeAfterAction(type, sucess) {
      this.$emit('close-after-action', { type: type, sucess: sucess });
    },
    validateForm() {
      if (!this.recordName) {
        this.badRecordName = true
        return false
      }
      else {
        this.badRecordName = false
      }
      if (!this.recordDate) {
        this.badRecordDate = true
        return false
      }
      else {
        this.badRecordDate = false
      }
      if (!this.recordDescription) {
        this.badRecordDescription = true
        return false
      }
      else {
        this.badRecordDescription = false
      }
      if (!this.recordShortDescription) {
        this.badRecordShortDescription = true
        return false
      }
      else {
        this.badRecordShortDescription = false
      }
      if (!this.recordType) {
        this.badRecordType = true
        return false
      }
      else {
        this.badRecordType = false
      }
      return true
    },
    removeImage(index) {
      this.imagesToRemove.push(this.imageNames[index])
      this.images.splice(index, 1)
    },
    async doAction() {
      if (this.actionType == 'create') {
        if (!this.validateForm()) {
          return
        }
        let record = {
          name: this.recordName,
          date: this.recordDate,
          description: this.recordDescription,
          description_short: this.recordShortDescription,
          record_type: this.recordType,
          is_visible: false

        }
        try {
          const response = await this.$records.postRecord(record)
          if (response) {
            this.recordId = response.id

            await this.generateQrCode(this.recordId)

            await this.$records.postQrCode(this.recordId, this.QRuri)

          }


          if (this.imagesToPost.length > 0) {
            await this.$records.postImage(response.id, this.imagesToPost)
          }
          this.closeAfterAction('create', 'sucess')
        }
        catch (error) {
          console.log(error)
          this.closeAfterAction('create', 'failure')
        }
      }
      else {
        if (!this.validateForm()) {
          return
        }
        try {
          let record = {
            name: this.recordName,
            date: this.recordDate,
            description: this.recordDescription,
            description_short: this.recordShortDescription,
            record_type: this.recordType,
            is_visible: this.isVisible
          }
          await this.$records.updateRecord(this.editIndex, record)
          if (this.newImageToUpdate.length > 0) {
            await this.$records.postImage(this.editIndex, this.newImageToUpdate)
          }
          if (this.imagesToRemove.length > 0) {
            await this.$records.deleteImages(this.editIndex, this.imagesToRemove)
          }
          this.closeAfterAction('update', 'sucess')
        }
        catch (error) {
          console.log(error)
          this.closeAfterAction('update', 'failure')
        }
      }
    },
    closeAfterAction(type, sucess) {
      this.$emit('close-after-action', { type: type, sucess: sucess });
    },
    close() {
      this.$emit('close');
    },
    async onFileChange(event) {

      this.imagesToPost.push(event.target.files)
      this.newImageToUpdate.push(event.target.files)
      console.log(this.newImageToUpdate)
      let image = event.target.files
      //if (!files.length){
      // console.log("failed")
      // return;
      // }
      //await this.$records.postImage(file)
      this.createImage(image);
    },
    async createImage(file) {
      var vm = this;
      for (let index = 0; index < file.length; index++) {



        var reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          vm.images.push(imageUrl);
          vm.newImages.push(imageUrl)

        }
        reader.readAsDataURL(file[index]);
      }
    },
    async setInitialEditData() {
      try{
      if (this.actionType == 'edit') {
        const response = await this.$records.getRecord(this.editIndex)
        this.recordName = response.name
        this.recordDate = response.date
        this.recordDescription = response.description
        this.recordShortDescription = response.description_short
        this.recordType = response.record_type
        this.isVisible = response.is_visible
        const response2 = await this.$records.getRecordImages(this.editIndex)
        let nameArray = []
        for (let index = 0; index < response2.names.length; index++) {
          this.images.push(`http://127.0.0.1:5022/static/images/${this.editIndex}/${response2.names[index]}`)
          nameArray.push(response2.names[index])
        }
        this.imageNames = response2.names
      }
    }
    catch(error){
      
    }
    },
    async generateQrCode(id) {
      await QRCode.toDataURL(`http://localhost:8080/record/${id}/#${id}`)
        .then(url => {
          this.QRuri = url
        })
        .catch(err => {
          console.error(err)
        })
    }


  },
  created() {
    this.setInitialEditData()
  }

}

</script>