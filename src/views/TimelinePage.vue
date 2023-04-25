<template>
  <div id="__nuxt">
    <div id="__layout">
      <div class="flex flex-col min-h-screen">
        <RecordModalForTimeline v-if="openRecordModal" :recordId="recordId" @close="closeRecordInfoModal"
          :isActive="openRecordModal">
        </RecordModalForTimeline>
        <header class="fixed top-0 left-0 z-[48] w-full text-white duration-200 bg-primary-darken">
          <div class=" flex items-center justify-center relative w-full h-[52px] ">
            <div class="px-3">
              <a href="/" class="nuxt-link-active">
                <img src="https://teltonika-iot-group.com/cdn/companies/light/iot-light.svg" alt="logo" width="191"
                  height="27" class="w-full h-7 max-w-[140px] sm:max-w-full">
              </a>
            </div>
   
          </div>
        </header>
        <div class="bg-white h-screen">
          <div class="container max-w-5xl mb-1 md:ml-28 sm:ml-10">
            <div class=" flex  -mx-6 md:block md:mx-0">
              <div class="flex h-[545px] w-full flex-1 flex-col pb-10 -mx-5  md:mx-0 md:pr-8 last:pr-0 md:pb-0">
                <div data-v-961f3a84=""
                  class=" relative z-10 object-top mt-36  items-center w-full text-primary-text font-oswald font-semibold uppercase  md:text-[32px] sm:text-[20px]">
                  <div data-v-961f3a84="" name="div" class="w-full mb-6  flex items-center md:mb-2 font-bold ">
                    Teltonika Networks
                  </div>

                </div>
                <div class="flex flex-row">
                  <div
                    class="font-oswald z-10 leading-[98px]  relative md:text-3.5xl mb-4 w-auto md:w-auto md:mb-8 md:text-[96px] sm:text-[68px] font-bold text-primary-text ">
                    PRODUCTS
                    <br>
                    MUSEUM

                  </div>
                  <div class="slider" v-dragscroll.x >
                    <div v-for="(date, index) in dates" :key="date"
                      class="z-10 flex h-[20px] leading-[20px] justify-center items-center md:mt-[170px] sm:mt-[156px]">
                      <div @click="scrollToDate(date)" @mouseenter="changeDateColor = true, dateToHighlight = date"
                        @mouseleave="changeDateColor = false, dateToHighlight = 0"
                        :class="[changeDateColor && dateToHighlight == date ? ['underline', '!text-primary-text', 'decoration-primary-text'] : '']"
                        class="flex text-[16px] font-oswald font-bold cursor-pointer leading-5 z-10 text-primary-dates text-base mr-1  left-[37.92%] right-[6.25%] content-center">
                        {{ date }}</div>
                      <div v-if="index != dates.length - 1"
                        class="text-base  leading-5 font-bold font-oswald z-10 text-primary-black mr-2 ml-2 content-center left-[878px] right-[6.25%] w-[2px] h-[2px] mb-[27px] mr ">
                        .</div>
                    </div>
                  </div>

                </div>
                <section class="absolute bg-cover-image ml-[324px] w-[1057px] h-[545px] from-white md:ml-[270px] sm:ml-[100px] ">

                  <div class=" absolute box-border h-2/3 w-full z-1 bg-gradient-to-t inset-x-0 bottom-0">
                  </div>
                  <div class=" absolute box-border h-full w-2/4 z-1 bg-gradient-to-r">
                  </div>
                  <div class="absolute box-border h-full w-2/3 z-1 bg-gradient-to-l inset-y-0 right-0">
                  </div>

                </section>

              </div>
            </div>
          </div>
          <div v-if="visibleRecords.length > 0" class="flex flex-row space-x-1 md:ml-14 sm:ml-0">
            <div class="slider pt-5" v-dragscroll.x v-on:dragscrollstart="wasDraged">
              <div v-for="(record, index) in visibleRecords" :key="record.id">
                <div class="flex flex-row items-end" @click="wasOutsideBox">
                  <div class="mb-24 " >
                    <div v-if="index == 0"
                      class="text-primary-text text-[40px]  font-bold leading-[40px] font-oswald text-right md:ml-20 sm:ml-5 ">
                      {{ record.date }}
                      <img src="../assets/arrow.png" class="object-cover">
                    </div>
                    <div v-else-if="record.date == visibleRecords[index - 1].date" class="w-[16px] h-[2px]">
                      <img src="../assets/divide.png" class="object-cover md:min-w-full shrink-0">
                    </div>
                    <div v-else class="text-primary-text text-[40px] font-bold leading-[40px] font-oswald text-right ">
                      {{ record.date }}
                      <img src="../assets/arrow.png" class="object-cover">
                    </div>
                  </div>

                  <RecordDisplay  :id="`${record.id}`" @click.native="openRecordInfoModal(record.id)" class="mx-2" :year="record.date"
                    :name="record.name" :shortDecs="record.description_short" :recordId="record.id"></RecordDisplay>
                </div>
              </div>
            </div>


          </div>
          <div v-else class="container max-w-5xl mb-1 md:ml-28 sm:ml-0">
          <div class="font-oswald z-10 leading-[98px]  relative md:text-3.5xl mb-4 w-auto md:w-fill md:mb-8 md:text-[96px] sm:text-[68px] font-bold text-primary-text break-words">
THERE ARE NO RECORDS TO DISPLAY
          </div>
        </div>

        </div>
 
      </div>
    </div>
  </div>
</template>

<script>
import RecordInformationModal from '../components/RecordInformationModal.vue'
import RecordDisplay from '../components/RecordDisplay.vue'
import youtube from '../assets/youtube.svg'
import RecordModalForTimeline from '../components/RecordModalForTimeline.vue'
import { timeout } from 'q'


export default {
  name: 'timelinePage',
  data() {
    return {
      visibleRecords: [],
      showImages: false,
      recordId: 0,
      imagesURL: [],
      pageURL: window.location.href,
      showIfnoModal: false,
      dates: [],
      youtube,
      changeDateColor: false,
      dateToHighlight: 0,
      openRecordModal: false,
      dragged: false,


    }
  },
  components: {
    RecordInformationModal,
    RecordDisplay,
    youtube,
    RecordModalForTimeline,

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
        for (let index = 0; index < this.visibleRecords.length; index++) {
          this.dates.push(new Date(this.visibleRecords[index].date).getUTCFullYear())
          this.visibleRecords[index].date = new Date(this.visibleRecords[index].date).getUTCFullYear()

        }
        this.dates.sort()
        this.dates = [...new Set(this.dates)]
        this.sortRecordsByDate()

      }
      catch (error) {
        console.log(error)
      }
    },
    openRecordInfoModal(id) {
      if(this.dragged == false){
      this.recordId = id
      this.openRecordModal = true
      }
      else{
        setTimeout(() =>{this.dragged = false},10)
      }
    },
    closeRecordInfoModal() {
      this.openRecordModal = false
      this.recordId = 0

    },
    checkIfShowRecordOnLoad() {
      if (this.$route.params.id && this.$route.meta.showIfnoModal) {
        this.recordId = parseInt(this.$route.params.id)
        this.openRecordModal = this.$route.meta.showIfnoModal
        document.getElementById(`${this.recordId}`).scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: 'center'
        })
        //window.scrollTo(0,0);
      }
    },
    scrollToDate(date){
     let elements = []
     for (let index = 0; index < this.visibleRecords.length; index++) {
      if(this.visibleRecords[index].date == date){
         elements.push(this.visibleRecords[index])
      }
      
     }
     document.getElementById(`${elements[0].id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
     //window.scrollTo(0,0);
    },
    wasDraged(){
  this.dragged= true
  },
  wasOutsideBox(){
    setTimeout(() =>{this.dragged = false},10)
  },
    sortRecordsByDate() {
      this.visibleRecords.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
  },

  mounted() {

    this.getVisibleRecords()
    setTimeout(() => this.checkIfShowRecordOnLoad(), 300);
       //this.checkIfShowRecordOnLoad()
    
  

  }
}

</script>
<style>
.slider {
  display: flex;
  overflow-x: hidden;
}</style>