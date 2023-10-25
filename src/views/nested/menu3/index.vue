<template>
  <div>
    <el-row :gutter="10" class="mb8" style="margin:10px ">
      <el-col :span="1.5">
        <el-button
          plain
          size="mini"
          type="primary"
          @click="clickupload"
        >上传国考安排时间
        </el-button>
        <input style="width: 0;height: 0" type="file"  @click="uploadgktime" ref="files"
               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
      </el-col>
      <el-col :span="1.5">
        <el-button
          plain
          size="mini"
          type="primary"
          @click="handlearrangement"
        >重新编排
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          icon="el-icon-download"
          plain
          size="mini"
          type="warning"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row  >
      <el-table v-fit-columns :data="arrangeData" height="85vh"  style="width:95%;margin-left: 2.5%"  :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
        <el-table-column  label="开考专业" width="300">
          <el-table-column label="专业代码名称" prop="zy_mc" width="150" >
            <template #default="scope">
              <div >
                {{ scope.row.zy_dm }}  {{ scope.row.zy_mc }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="面向社会开考主考学校" prop="zy_yx" width="150">
          </el-table-column>
        </el-table-column>
        <el-table-column  v-for="(hitem,index) in arrangeData[0].date" :key="index"  >
          <template #header>
            <span>{{ hitem.sj }} </span>
          </template>
          <el-table-column label="上   午  (9:00-11:30)" prop="morning" width="150">
            <template #default="morning">
              <div v-for="item in morning.row.date[index].morningList">
                {{item.kc_dm}} {{item.kc_mc}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="下   午  (14:30-17:00)" prop="afternoon" width="150">
            <template #default="afernoon">
              <div v-for="item in afernoon.row.date[index].afternoonList">
                {{item.kc_dm}} {{item.kc_mc}}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script >
import { getkstable, orderlist, uploadexcel } from '@/api/arrangement'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      arrangeData: []
    }
  },
  created:function(){
    this.getList()
  },
  mounted:function(){
   this.getList()
  },
  methods: {
    clickupload(){
      this.$refs.files.click()
  },
    uploadgktime(event){
      console.log()
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      var f = event.currentTarget.files[0]
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 自定义方法向父组件传递数据
          for(var i = 0;i<outdata.length;i++){
            console.log(outdata[i])
            uploadexcel(outdata[i]).then(res=>{
              console.log(res)
            })
            if(i==outdata.length-1){
              this.$message.success("上传成功");
            }
          }
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    },
    getList() {
      console.log("get")
      getkstable().then(response => {
        this.arrangeData=response.data
        console.log(this.arrangeData)
      });
    },
    handlearrangement() {
      this.$confirm("是否确认重新编排").then(function() {
        orderlist().then(response => {
        });
      }).then(() => {
        this.getList();
        this.$message.success("重编成功");
      })
    },
    handleExport() {
      this.$confirm('是否确认导出').then(function() {
        window.open("http://localhost:8081/FZUZK/excel")
        // getexcel().then(async (data) => {
        //   const isBlob = blobValidate(data);
        //   if (isBlob) {
        //     console.log('zheshiblob')
        //     const blob = new Blob([data], {type: 'application/vnd.ms-excel'});
        //     //console.log(blob)
        //     saveAs(blob,"编排结果")
        //   }
        //   else {
        //     const resText = await data.text();
        //     const rspObj = JSON.parse(resText);
        //     const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
        //     ElMessage.error(errMsg);
        //   }
        //   downloadLoadingInstance.close();
        // })
      }).then(() => {
        this.getList();
        this.$message.success("导出成功");
      })
    },
  }
}
</script >
<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height:10px;
  background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ccc;
}
::-webkit-scrollbar-track{
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}


</style>
