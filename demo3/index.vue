<template>
    <div class="default-main ba-table-box">

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'edit', 'delete', 'comSearch', 'quickSearch', 'columnDisplay']"
            :quick-search-placeholder="t('quick Search Placeholder', { fields: t('link.link.quick Search Fields') })"
        />

        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />
        

        {{showlist}}
        <el-tabs type="border-card">
           <el-tab-pane :label="index" v-for="(item,index) in showlist" :key="inde">
            <template v-for="(ite,ind) in showlist[index]">
             <el-tooltip :content="ite" raw-content>
                <el-button>{{ite}}</el-button>
              </el-tooltip>
            </template>
           </el-tab-pane>
         </el-tabs>

    </div>

</template>

<script setup lang="ts">
import { ref, reactive, provide, onMounted } from 'vue'
import baTableClass from '/@/utils/baTable'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import createAxios from '/@/utils/axios'



const { t } = useI18n()
const tableRef = ref()
const optButtons = defaultOptButtons(['edit', 'delete'])
const baTable = new baTableClass(
    new baTableApi('/admin/link.Link/'),
    {
        pk: 'id',
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: t('link.link.id'), prop: 'id', align: 'center', width: 70, operator: 'RANGE', sortable: 'custom' },
            { label: t('link.link.link_type__type'), prop: 'linkType.type', align: 'center', operatorPlaceholder: t('Fuzzy query'), render: 'tags', operator: 'LIKE' },
            { label: t('link.link.name'), prop: 'name', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('link.link.title'), prop: 'title', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('link.link.url'), prop: 'url', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('link.link.update_time'), prop: 'update_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('link.link.create_time'), prop: 'create_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('operate'), align: 'center', width: 100, render: 'buttons', buttons: optButtons, operator: false },
        ],
        dblClickNotEditColumn: [undefined],
    },
    {
        defaultItems: { content: null },
    }
)



provide('baTable', baTable)
let showlist = reactive({})
onMounted(() => {
    baTable.table.ref = tableRef.value
    baTable.mount()
    baTable.getIndex()?.then(() => {
        baTable.initSort()
        baTable.dragSort()
    })
     createAxios({
         url: '/admin/link.Link/show',
         method: 'get',
     }).then(res=>{
      console.log(res,"//////my List")
      let data = JSON.parse(res.data.list)
      console.log(data)
      showlist = Object.assig(showlist,ndata)
     })
    
})

</script>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
import createAxios from '/@/utils/axios'

export default defineComponent({
    name: 'link/link',
})

let showlist = reactive([])
export function getMenuRules123() {
    return createAxios({
     url: '/admin/link.Link/show',
     method: 'get',
 }).then(res=>{
  console.log(res,"//////my List")
  let data = JSON.parse(res.data.list)
  console.log(data)
  showlist = data

 })
}

getMenuRules123().then((res) => {
    console.log(showlist)
})


</script> -->


<style scoped lang="scss">
.el-dropdown{padding-right: 20px;}
</style>