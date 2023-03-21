<template>
  <div>
    timeline
    <RecordInformationModal @close="closeInfoModal()" v-if="showIfnoModal" :isActive="showIfnoModal"
      :recordIndex="recordId"></RecordInformationModal>
    <div v-for="record in visibleRecords">
      <div :id="`${record.id}`">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg">
      </div>
    </div>
  </div>
</template>

<script>
import RecordInformationModal from '../components/RecordInformationModal.vue'
export default {
  name: 'timelinePage',
  data() {
    return {
      visibleRecords: [],
      showImages: false,
      recordId: 0,
      imagesURL: [],
      pageURL: window.location.href,
      showIfnoModal: false

    }
  },
  components: {
    RecordInformationModal
  },
  //props: {
  //  actionType: { type: String, required: true },
  //  editIndex: { type: Number },
  //  isActive: { type: Boolean, default: false, required: true }
  //},
  methods: {
    async getVisibleRecords() {
      try {
        const response = await this.$records.getAllVisibleRecords()

        this.visibleRecords = response
      }
      catch (error) {
        console.log(error)
      }
    },
    async showRecordInfo(id) {
      this.recordId = id
      this.showIfnoModal = true
    },
    closeInfoModal() {
      this.showIfnoModal = false
      this.recordId = 0
    },
    checkIfShowRecordOnLoad() {
      if (this.$route.params.id && this.$route.meta.showIfnoModal) {
        this.recordId = parseInt(this.$route.params.id)
        this.showIfnoModal = this.$route.meta.showIfnoModal
      }
    },
  },
  created() {
    this.checkIfShowRecordOnLoad()
    this.getVisibleRecords()
  }
}

</script>