<template>
<div>
    <button @click="createRecord">create record</button>
    <RecordCreationModal @close-after-action="closeModalAfterAction" @close="closeModal" v-if="ShowRecordCreation" :action-type="actionType" :is-active="ShowRecordCreation"></RecordCreationModal>
    <Message v-if="showMessage" @close-action="closeMessage" :sucess="sucess" :is-active="showMessage" :type="messageType"></Message>
    
</div>
</template>

<script>
import RecordCreationModal from '../components/RecordCreationModal.vue'
import Message from '../components/Message.vue'
export default {
    name: 'adminPage',
  data() {
    return {
      username: "",
      ShowRecordCreation: false,
      actionType:"",
      messageType:"",
      sucess:"",
      showMessage:false,

    };
  },
  props:{
 message:{
  type: String
 }
  },
  components:{
    RecordCreationModal,
    Message,
  },
  methods:{
    async createRecord(){
      this.actionType="create"
      this.ShowRecordCreation = true
    },
    closeModal(){
      this.ShowRecordCreation = false
    },
    closeModalAfterAction(data) {
      this.ShowRecordCreation = false;
      this.messageType = data.type
      this.sucess = data.sucess
      this.showMessage = true
    },
    closeMessage(){
      this.showMessage = false
    },
  },
  created(){

  }
}
</script>