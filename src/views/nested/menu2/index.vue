<template>
  <div class="app-container">
<!--    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">-->
<!--      <el-form-item label="主考学校" prop="postCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.postCode"-->
<!--          placeholder="请输入主考学校"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="专业" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="请输入专业"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="毕业学分" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="请输入毕业学分"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="学历层次" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="请输入学历层次"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开考方式" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="请输入开考方式"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="专业审批" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="专业审批"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="证书停发" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="证书停发"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="专业停考" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="专业停考"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="停止招生" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="是否停止招生"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-row>
      <el-row >
        <el-col :span="4"  :xs="24" style="border-right: 2px solid rgb(245,245,245);">
          <div class="head-container">
            <el-scrollbar >
              <el-tree :data="data"  @node-click="handleNodeClick" />
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="20">
          <el-table  :data="schoolList">
            <el-table-column label="主考学校" align="center" prop="zy_yx" />
            <el-table-column label="专业" align="center" prop="zy_mc" />
            <el-table-column label="毕业学分" align="center" prop="zy_xf" />
            <el-table-column label="学历层次" align="center" prop="cc" />
            <el-table-column label="开考方式" align="center" prop="ks_fs" />
            <el-table-column label="专业审批" align="center" prop="zysp" />
            <el-table-column label="证书停发" align="center" prop="zstf" />
            <el-table-column label="专业停考" align="center" prop="zytk" />
            <el-table-column label="是否停止招生" align="center" prop="" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleDetail(scope.row)"
                >查看专业</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-row>

    <!-- 添加或修改岗位信息对话框 -->
<!--    :visible.sync="open"-->
    <el-dialog title="详情" :visible.sync="open" width="80%" append-to-body>
      <el-card>
        <div slot="header">
          <span><i class=""></i>专业信息</span>
        </div>
        <div class="el-table el-table--enable-row-hover el-table--medium">
          <table  style="width: 100%;table-layout:fixed;">
            <tbody>
            <tr>
              <td class="el-table__cell is-leaf"><div class="cell">专业名称</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" > {{ zhuanyeList.zyMessage.zy_mc }}</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">专业代码</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" >{{ zhuanyeList.zyMessage.zy_dm }}</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">层次</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" >{{ zhuanyeList.zyMessage.cc }}</div></td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf"><div class="cell">主考学校</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">{{ zhuanyeList.zyMessage.zy_yx }}</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">报考条件</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">{{ zhuanyeList.zyMessage.bktj }}</div></td>
            </tr>
            </tbody>
          </table>
        </div>
<!--        <el-row :gutter="10" style="margin-top: 20px">-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              plain-->
<!--              icon="el-icon-plus"-->
<!--              size="mini"-->
<!--              @click="handleAdd"-->
<!--            >导入</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="warning"-->
<!--              plain-->
<!--              icon="el-icon-download"-->
<!--              size="mini"-->
<!--              @click="handleExport"-->
<!--            >导出</el-button>-->
<!--          </el-col>-->

<!--        </el-row>-->
        <el-table  style="margin-top: 50px" :data="zhuanyeList.kcMessages" >
          <el-table-column label="课程类别" align="center" prop="kctype" />
          <el-table-column label="课程代码" align="center" prop="kc_dm" />
          <el-table-column label="课程名称" align="center" prop="kc_mc" />
          <el-table-column label="学分" align="center" prop="kc_xf" />
          <el-table-column label="考试方式" align="center"  >
            <el-table-column  label="面向社会" width="200" align="mxsh">
            </el-table-column>
            <el-table-column  label="体制改革" width="200" align="tzgg">
            </el-table-column>
            <el-table-column  label="衔接试点(二学历)" width="200" align="xjsd">
            </el-table-column>
          </el-table-column>
          <el-table-column label="旧计划课程代码" align="center" prop="jjhkc_dm" />
          <el-table-column label="旧计划课程名称" align="center" prop="jjhkc_mc" />
          <el-table-column label="备注" align="center" prop="bz" />
          <el-table-column label="教材版本" align="center" prop="cbs" />
        </el-table>
        <el-form  label-width="150px" >
          <el-form-item label="专业备注" prop="remark" >
<!--            <el-input autosize  type="textarea"   v-model="zhuanyeList.yxMessage.zy_bz" placeholder="请输入内容"/>-->
            <div  class="bomtextshow"> {{ zhuanyeList.yxMessage.zy_bz }}</div>
          </el-form-item>
          <el-row span:21>
            <el-col :span="11">
              <el-form-item label="体制改革主考院校" prop="approvalId">
<!--                <el-input autosize type="textarea"  v-model="zhuanyeList.yxMessage.tzgg_yx" placeholder="请输入体制改革主考院校"/>-->
                <div  class="bomtextshow"> {{ zhuanyeList.yxMessage.tzgg_yx }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停招新生主考院校" prop="approvalId">
<!--                <el-input autosize type="textarea"  v-model="zhuanyeList.yxMessage.tzxs_yx" />-->
                <div  class="bomtextshow"> {{ zhuanyeList.yxMessage.tzxs_yx }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row span:21>
            <el-col :span="11">
              <el-form-item label="衔接试点主考学校" prop="approvalId">
<!--                <el-input autosize type="textarea"   v-model="zhuanyeList.yxMessage.xjsd_yx" />-->
                <div  class="bomtextshow"> {{ zhuanyeList.yxMessage.xjsd_yx }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="衔接二学历主考院校" prop="approvalId">
<!--                <el-input autosize type="textarea"  v-model="zhuanyeList.yxMessage.xjexl_yx"/>-->
                <div  class="bomtextshow"> {{ zhuanyeList.yxMessage.xjexl_yx}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row span:21>
          </el-row>
          <el-form-item label="开考专业备注" prop="approvalId">
<!--            <el-input autosize type="textarea"   v-model="zhuanyeList.yxMessage.kkzy_bz" placeholder="请输入开考专业备注"/>-->
            <div  class="bomtextshow"> {{zhuanyeList.yxMessage.kkzy_bz}}</div>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getboard, getyxzy, getzyyxtype } from '@/api/plan'

export default {
  name: "Post",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 岗位信息表格数据
      postList: [{kc_dm:123}],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: null,
        postName: null,
        postSort: null,
        status: null,
      },
      schoolList:[],
      zhuanyeList: {
        "yxMessage": {
          "zy_yx": "西南交通大学",
          "zy_dm": "081801",
          "zy_bz": "1．本专业考试课程15门，总学分70学分。\n2. 选设A、选设B为选考组课程，选设A为铁路运输方向考生报考，选设B为城市轨道交通方向考生报考。\n3.本专业实践课程考核地点安排由福建开放大学负责。\n",
          "tzgg_yx": null,
          "xjsd_yx": null,
          "xjexl_yx": null,
          "kkzy_bz": null,
          "tzxs_yx": null
        },
        "zyMessage": {
          "zy_mc": "交通运输",
          "zy_dm": "081801",
          "cc": "专升本",
          "zy_yx": "西南交通大学",
          "bktj": null
        },
        "kcMessages": [
          {
            "kctype": "必设1",
            "kc_dm": "03708",
            "kc_xf": "2",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "国考",
            "cbs": "高等教育出版社"
          },
          {
            "kctype": "必设1",
            "kc_dm": "03709",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "国考",
            "cbs": "高等教育出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "07296",
            "kc_xf": "6",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "清华大学出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "13834",
            "kc_xf": "6",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "人民交通出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "13838",
            "kc_xf": "6",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "中国铁道出版社有限公司"
          },
          {
            "kctype": "必设2",
            "kc_dm": "13841",
            "kc_xf": "5",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "中南大学出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "13846",
            "kc_xf": "5",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "中国铁道出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "13847",
            "kc_xf": "6",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "西南交通大学出版社"
          },
          {
            "kctype": "必设2",
            "kc_dm": "14643",
            "kc_xf": "6",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "西南交通大学出版社"
          },
          {
            "kctype": "必设3",
            "kc_dm": "07999",
            "kc_xf": null,
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": null,
            "cbs": "#N/A"
          },
          {
            "kctype": "选设",
            "kc_dm": "12220",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设",
            "kc_dm": "13675",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设",
            "kc_dm": "13676",
            "kc_xf": "2",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设",
            "kc_dm": "14302",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设A",
            "kc_dm": "14300",
            "kc_xf": "3",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设A",
            "kc_dm": "14301",
            "kc_xf": "3",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设A",
            "kc_dm": "14303",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设B",
            "kc_dm": "12218",
            "kc_xf": "3",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设B",
            "kc_dm": "13370",
            "kc_xf": "3",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          },
          {
            "kctype": "选设B",
            "kc_dm": "13373",
            "kc_xf": "4",
            "mxsh": null,
            "tzgg": null,
            "xjsd": null,
            "jjhkc_dm": null,
            "jjhkc_mc": null,
            "bz": "省考",
            "cbs": "#N/A"
          }
        ]
      },
      mock: {
        one: "1.本专业考试课程14门，总学分70学分\n" +
          "2.课程“英语（专升本）”（7学分）可以用两门“笔试”课程学分顶替，要求达到7学分及以上。\n" +
          "3.课程“线性代数（经管类）”（4学分）可以用一门“笔试”课程学分顶替，要求达到4学分及以上。\n" +
          "4.课程“概率论与数据统计（经管类）”（5学分）可以用一门“笔试”课程学分顶替，要求达到5学分及以上\n",
        two: "1、福州大学\n" +
          "2、福建师范大学\n",
        three: "1。福州大学\n" +
          "2、闽南师范大学\n" +
          "3、闽江学院\n",
        four: "1、集美大学\n" +
          "2、华侨大学\n",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postCode: [
          { required: true, message: "岗位编码不能为空", trigger: "blur" }
        ],
        postName: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" }
        ],
        postSort: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "change" }
        ],
      },
      data: []
    };
  },
 async  created() {
    this.getList()
   await getyxzy("西南交通大学").then(res=>{
       this.schoolList=res.data.zyMessageList
     })
  },
  methods: {
    getList() {
      this.loading = true;
      getzyyxtype().then(res=>{
        console.log(res)
        this.data = res.data.map(item => {
          return { label: item };
        });
        console.log(this.data)
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    handleNodeClick (data){
      getyxzy(data.label).then(res=>{
        console.log(res)
        this.schoolList=res.data.zyMessageList
      })
    },
    // 表单重置
    reset() {
      this.form = {}
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.handleQuery();
    },
    handleDetail(row) {
      this.reset();
      console.log(row)
      getboard( row.zy_dm).then(res=>{
        console.log(res)
        this.zhuanyeList=res.data
        this.open = true;
      })
    },
    /** 提交按钮 */
    submitForm() {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.form.postId != null) {
      //       updatePost(this.form).then(response => {
      //         this.$modal.msgSuccess("修改成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     } else {
      //       addPost(this.form).then(response => {
      //         this.$modal.msgSuccess("新增成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     }
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const postIds = row.postId || this.ids;
      this.$modal.confirm('是否确认删除岗位信息编号为"' + postIds + '"的数据项？').then(function() {
        return delPost(postIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
.bomtextshow {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 1px 11px;
}
</style>
