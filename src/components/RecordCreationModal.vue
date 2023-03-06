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
                    <datepicker v-model="recordDate" placeholder="Record date" :config="{ dateFormat: 'Y-m-d', static: true }"></datepicker>
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
                    <textarea :class="badRecordShortDescription ? 'is-danger' : ''" v-model="recordShortDescription" class="textarea"
                                placeholder="Short description area"></textarea>
                            <p v-show="badRecordShortDescription" class="help is-danger">Short Description is empty</p>
                    </div>
                    <div class="field">
                        <label class="label">Record type</label>
                        <div class="control">
                            <div class="select" :class="badRecordType ? 'is-danger' : ''">
                                <select v-model="recordType" :disabled="this.actionType == 'edit' ? true : false">
                                    <option value="" disabled selected>Select Type</option>
                                    <option value="product">Product</option>
                                    <option value="event">Event</option>
                                </select>
                                <p v-show="badRecordType" class="help is-danger">Record Type not selected</p>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <input type="file"  multiple accept="image/jpeg, image/png" @change=onFileChange>
                        <div v-if="images">
                        <div v-for="(image, index) in images">
                        <img :src="image" />
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
export default {
    name: 'RecordCreationModal',
    data() {
        return {
            Authors: [],
            recordName: "",
            recordDate: "",
            recordDescription:"",
            recordShortDescription: "",
            recordType: "",
            badContent: false,
            badAuthor: false,
            images: [],
            badRecordName: false,
            badRecordDate:false,
            badRecordDescription:false,
            badRecordShortDescription:false,
            badRecordType: false,
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
        validateForm(){
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
        async doAction(){
            if (!this.validateForm()) {
        return
      }
             let record ={
                name: this.recordName,
                date: this.recordDate,
                description: this.recordDescription,
                description_short: this.shortDescription,
                record_type:this.recordType

             }
             try{
            await this.$records.postRecord(record)
            this.closeAfterAction('create', 'sucess')
             }
             catch(error){
                this.closeAfterAction('create', 'failure')
             }
        },
        closeAfterAction(type, sucess) {
      this.$emit('close-after-action', { type: type, sucess: sucess });
    },
        close() {
      this.$emit('close');
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files);
    },
    async createImage(files) {
      var vm = this;
      for (var index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = function(event) {
          const imageUrl = event.target.result;
          vm.images.push(imageUrl);
        }
        await this.$records.postImage(files)
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1)
    }

    }
    }

</script>