<template>
  <div class="pt-5 content">
    <div class="container">
      <b-input
        class="mb-3"
        placeholder="Search package"
        @change="getData"
        :disabled="isLoading"
        v-model="searchText"></b-input>
      <b-pagination
        v-if="rows"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="tableData"
      ></b-pagination>
      <b-table
        id="tableData"
        ref="tableData"
        :per-page="perPage"
        :current-page="currentPage"
        hover
        selectable
        select-mode="single"
        bordered
        responsive
        @row-selected="selectRow($event)"
        :items="tableData"></b-table>
      <b-modal
        v-model="isShownModal"
        centered
        scrollable
        @hide="closeModal"
        id="modal"
        :title="selectedPackage ? selectedPackage.package.name : null">
        <div v-if="selectedPackage">
          <p v-if="selectedPackage.package.description"><b>{{ selectedPackage.package.description }}</b></p>
          <p v-if="selectedPackage.package.author"><b>Author:</b> {{ selectedPackage.package.author.name }}</p>
          <p v-if="selectedPackage.package.version"><b>Version:</b> {{ selectedPackage.package.version }}</p>
          <p v-if="selectedPackage.package.publisher"><b>Publisher name:</b> {{
              selectedPackage.package.publisher.username
            }}</p>
          <p v-if="selectedPackage.package.publisher"><b>Publisher email:</b> {{
              selectedPackage.package.publisher.email
            }}</p>
        </div>
        <template #modal-footer>
          <b-button @click="isShownModal = false">Close</b-button>
        </template>
      </b-modal>
    </div>
    <div class="footer text-light d-flex align-items-center">
      <div class="container">
        <p>Developer: Baev Daniil</p>
        <p><a href="https://github.com/baevdantes93" target="_blank">https://github.com/baevdantes93</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class-decorator'
import { Package, PackageList, PackageTableRow } from '@/interfaces'
import { BTable } from 'bootstrap-vue'

@Component
export default class Home extends Vue {
  @State('packages') packages!: PackageList
  @Action('getPackages') getPackages!: (text: string) => Promise<PackageList>
  searchText = ''
  tableData: PackageTableRow[] = []
  currentPage = 1
  perPage = 10
  isShownModal = false
  isLoading = false
  selectedPackage: Package | null | undefined = null

  get rows () {
    return this.tableData.length
  }

  selectRow (rows: PackageTableRow[]) {
    if (rows.length) {
      this.selectedPackage = this.packages.objects.find(item => {
        return item.package.name === rows[0].name
      })
      this.isShownModal = true
    }
  }

  closeModal () {
    (this.$refs.tableData as BTable).clearSelected()
    this.selectedPackage = null
    this.isShownModal = false
  }

  getData () {
    this.isLoading = true;
    (this.$refs.tableData as BTable).clearSelected()
    this.selectedPackage = null
    this.currentPage = 1
    this.getPackages(this.searchText).then(res => {
      this.tableData = res.objects.map(_ => {
        return {
          name: _.package.name,
          author: _.package.author?.name,
          publisher: _.package.publisher.username,
          version: _.package.version
        }
      })
    }).finally(() => {
      this.isLoading = false
    })
  }
}
</script>

<style lang="scss">
.content {
  padding-bottom: 100px;
}
.footer {
  background: #000;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
