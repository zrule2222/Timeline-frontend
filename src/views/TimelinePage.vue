<template>
  <div id="__nuxt">
    <div id="__layout">
      <div class="flex flex-col min-h-screen">
        <RecordModalForTimeline v-if="openRecordModal" :recordId="recordId" @close="closeRecordInfoModal" :isActive="openRecordModal">
        </RecordModalForTimeline>
        menu here
        <div class="bg-white h-screen">
          <div class="container max-w-5xl mb-1">
            <div class=" flex  -mx-6 md:block md:mx-0">
              <div class="flex h-[545px] w-full flex-1 flex-col pb-10 -mx-5  md:mx-0 md:pr-8 last:pr-0 md:pb-0">
                <div data-v-961f3a84=""
                  class=" relative z-10 object-top mt-36  items-center w-full text-primary-text font-oswald font-semibold uppercase  text-[32px]">
                  <div data-v-961f3a84="" name="div" class="w-full mb-6  flex items-center md:mb-2 font-bold">
                    Teltonika Networks
                  </div>

                </div>
                <div class="flex flex-row">
                  <div
                    class="font-oswald z-10 leading-[98px]  relative md:text-3.5xl mb-4 w-auto md:w-auto md:mb-8 text-[96px] font-bold text-primary-text ">
                    PRODUCTS
                    <br>
                    MUSEUM

                  </div>
                  <div class="slider" v-dragscroll.x>
                    <div v-for="(date, index) in dates" :key="date"
                      class="z-10 flex h-[20px] leading-[20px] justify-center items-center mt-[170px]">
                      <div @mouseenter="changeDateColor = true, dateToHighlight = date"
                        @mouseleave="changeDateColor = false, dateToHighlight = 0"
                        :class="[changeDateColor && dateToHighlight == date ? ['underline', '!text-primary-text', 'decoration-primary-text'] : '']"
                        class="flex text-[16px] font-oswald font-bold  leading-5 z-10 text-primary-dates text-base mr-1  left-[37.92%] right-[6.25%] content-center">
                        {{ date }}</div>
                      <div v-if="index != dates.length - 1"
                        class="text-base  leading-5 font-bold font-oswald z-10 text-primary-black mr-2 ml-2 content-center left-[878px] right-[6.25%] w-[2px] h-[2px] mb-[27px] mr ">
                        .</div>
                    </div>
                  </div>

                </div>
                <section class="absolute bg-cover-image ml-[324px] w-[1057px] h-[545px] from-white ">

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
          <div class="flex flex-row space-x-0">
            <div class="slider pt-5" v-dragscroll.x>
              <div v-for="(record, index) in visibleRecords" :key="record.id">
                <div class="flex flex-row items-end">
                  <div class="mb-24 ">
                    <div v-if="index == 0"
                      class="text-primary-text text-[40px] font-bold leading-[40px] font-oswald text-right ml-20 ">
                      {{ record.date }}
                      <img src="../assets/arrow.png" class="object-cover">
                    </div>

                    <img v-else-if="record.date == visibleRecords[index - 1].date" src="../assets/divide.png"
                      class="object-cover md:min-w-full shrink-0">
                    <div v-else class="text-primary-text text-[40px] font-bold leading-[40px] font-oswald text-right ">
                      {{ record.date }}
                      <img src="../assets/arrow.png" class="object-cover">
                    </div>
                  </div>

                  <RecordDisplay @click.native="openRecordInfoModal(record.id)" class="mx-2" :year="record.date"
                    :name="record.name" :shortDecs="record.description_short" :recordId="record.id"></RecordDisplay>
                </div>
              </div>
            </div>


          </div>

        </div>
        <footer class="py-11 md:py-14 bg-primary-darken mt-auto">
          <div class="container">
            <div class="flex flex-wrap justify-between mb-5 font-oswald md:mb-14 md:mx-0">
              <div class="w-1/2 px-2 mb-5 text-left md:mb-10 sm:mr-8 sm:w-auto md:px-0 lg:max-w-[185px]">
                <div class="mb-2 text-lg font-semibold text-white normal-case md:mb-4 md:text-xl">
                  TELTONIKA IoT GROUP
                </div>
                <ul>
                  <li><a href="https://teltonika-gps.com/" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      Telematics</a></li>
                  <li><a href="https://teltonika-networks.com/" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      Networks</a></li>
                  <li><a href="https://teltonika-telemedic.com/" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      Telemedic</a></li>
                  <li><a href="https://teltonika-ems.com" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      EMS</a></li>
                  <li><a href="https://teltonika-energy.com" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      Energy</a></li>
                  <li><a href="https://teltonika-high-tech-hill.com" target="_blank"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Teltonika
                      High-Tech Hill</a></li>
                </ul>
              </div>
              <div class="w-1/2 px-2 mb-5 text-left md:mb-10 sm:mr-8 sm:w-auto md:px-0 lg:max-w-[185px]">
                <div class="mb-2 text-lg font-semibold text-white normal-case md:mb-4 md:text-xl">
                  NEWS
                </div>
                <ul>
                  <li><a href="/newsroom" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Newsroom</a>
                  </li>
                  <li><a href="/subscribe" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Newsletter</a>
                  </li>
                </ul>
              </div>
              <div class="w-1/2 px-2 mb-5 text-left md:mb-10 sm:mr-8 sm:w-auto md:px-0 lg:max-w-[185px]">
                <div class="mb-2 text-lg font-semibold text-white normal-case md:mb-4 md:text-xl">
                  ABOUT US
                </div>
                <ul>
                  <li><a href="/about-us/mission-vision-values" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Mission,
                      Vision &amp; Values</a></li>
                  <li><a href="/about-us/marketing-material" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Marketing
                      material</a></li>
                  <li><a href="/about-us/leadership" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Leadership</a>
                  </li>
                  <li><a href="/about-us/policies-certificates" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Policies
                      &amp; certificates</a></li>
                  <li><a href="/about-us/contacts" target="_self"
                      class="block py-2 font-sans text-sm text-white normal-case transition duration-200 cursor-pointer md:py-0 md:mb-3 md:text-base hover:text-gray-200">Contacts</a>
                  </li>
                </ul>
              </div>
              <div
                class="order-last w-full px-4 text-center md:px-0 md:mb-10 sm:w-auto sm:text-left flex flex-col justify-between">
                <div>
                  <div class="flex justify-between mb-5">
                    <div
                      class="relative mx-auto mr-4 font-semibold text-white md:mb-4 md:text-xl md:ml-0 md:mr-0 top-1 md:top-0 uppercase md:w-28">
                      newsletter
                    </div>
                    <div class="relative flex-1">
                      <form action="post" novalidate="novalidate"
                        class="flex items-baseline justify-center text-left sm:block w-full">
                        <div class="w-full"><input type="email" placeholder="Email Address" value=""
                            class="block w-full h-8 px-2 font-sans text-xs font-normal text-gray-300 placeholder-white bg-transparent border rounded-md outline-none sm:mb-3 hover:text-white sm:mr-0 border-white">
                          <!----></div> 
                          <button aria-label="Subscribe button" class="absolute z-10 text-white top-2 right-3 focus:outline-none hover:text-gray-200">
                           <img src="../assets/mail.svg">
                        </button>
                      </form> <!---->
                    </div>
                  </div>
                  <div class="flex justify-center mt-10 md:justify-between md:mt-0">
                    <div class="hidden mb-4 text-xl font-semibold text-white sm:block md:w-28">
                      CONNECT
                    </div>
                    <div class="flex justify-center mb-6 sm:justify-start"><a target="_blank"
                        href="https://www.linkedin.com/company/teltonika" rel="noreferrer" aria-label="linkedin"
                        class="mr-6 transition duration-200 opacity-100 sm:mr-0 sm:ml-6 hover:opacity-80"> 
                        <img src="../assets/linkedin.svg">
                      </a>
                      <a target="_blank" href="https://www.youtube.com/channel/UCTt_LNyu32CC7jLCiAYVwrw"
                        rel="noreferrer" aria-label="youtube"
                        class="mr-6 transition duration-200 opacity-100 sm:mr-0 sm:ml-6 hover:opacity-80">
                        <img src="../assets/youtube.svg">
                      </a>
                      <a target="_blank" href="https://www.facebook.com/TELTONIKAinternational/"
                        rel="noreferrer" aria-label="facebook"
                        class="mr-6 transition duration-200 opacity-100 sm:mr-0 sm:ml-6 hover:opacity-80">
                        <img src="../assets/fb.svg">
                      </a>
                      <a target="_blank" href="https://twitter.com/teltonika" rel="noreferrer"
                        aria-label="twitter"
                        class="mr-6 transition duration-200 opacity-100 sm:mr-0 sm:ml-6 hover:opacity-80">
                        <img src="../assets/twitter.svg">
                      </a>
                      <a target="_blank" href="https://www.instagram.com/teltonika_official/" rel="noreferrer"
                        aria-label="instagram"
                        class="mr-6 transition duration-200 opacity-100 sm:mr-0 sm:ml-6 hover:opacity-80">
                        <img src="../assets/instagram.svg">
                      </a>
                    </div>
                  </div>
                  <div class="flex justify-center text-white sm:justify-end">
                    <div class="group flex"><a href="/about-us/policies-certificates/privacy-policy"
                        class="block mb-3 text-white transition duration-200 hover:text-gray-300">PRIVACY</a> <span
                        class="px-2 group-last:hidden">|</span></div>
                    <div class="group flex"><a href="/about-us/policies-certificates/cookies-policy"
                        class="block mb-3 text-white transition duration-200 hover:text-gray-300">COOKIES</a> <span
                        class="px-2 group-last:hidden">|</span></div>
                    <div class="group flex"><a href="/about-us/policies-certificates"
                        class="block mb-3 text-white transition duration-200 hover:text-gray-300">ALL POLICIES</a> <span
                        class="px-2 group-last:hidden">|</span></div>
                  </div>
                </div>
                <div class="text-xs text-center text-white uppercase sm:text-right font-sans font-semibold">
                  COPYRIGHT
                  <span class="font-normal">© TELTONIKA, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import RecordInformationModal from '../components/RecordInformationModal.vue'
import RecordDisplay from '../components/RecordDisplay.vue'
import youtube from '../assets/youtube.svg'
import RecordModalForTimeline from '../components/RecordModalForTimeline.vue'


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
      openRecordModal: false


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
      this.recordId = id
      this.openRecordModal = true
    },
    closeRecordInfoModal() {
      this.openRecordModal = false
      this.recordId = 0

    },
    checkIfShowRecordOnLoad() {
      if (this.$route.params.id && this.$route.meta.showIfnoModal) {
        this.recordId = parseInt(this.$route.params.id)
        this.showIfnoModal = this.$route.meta.showIfnoModal
      }
    },
    sortRecordsByDate() {
      this.visibleRecords.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
  },
  created() {
    this.checkIfShowRecordOnLoad()
    this.getVisibleRecords()
  }
}

</script>
<style>.slider {
  display: flex;
  overflow-x: hidden;
}</style>