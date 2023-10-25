<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="68px" size="small">
      <el-form-item label="专业代码" prop="zy_dm">
        <el-input
          v-model="queryParams.zy_dm"
          clearable
          placeholder="请输入专业代码"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业名称" prop="zy_mc">
        <el-input
          v-model="queryParams.zy_mc"
          clearable
          placeholder="请输入专业名称"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主考学校" prop="zy_yx">
        <el-input
          v-model="queryParams.zy_yx"
          clearable
          placeholder="请输入主考学校"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学历层次" prop="xlcc">
        <el-input
          v-model="queryParams.xlcc"
          clearable
          placeholder="请输入学历层次"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证书停发" prop="zstf">
        <el-input
          v-model="queryParams.zstf"
          clearable
          placeholder="证书停发状态"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业停考" prop="zytk">
        <el-input
          v-model="queryParams.zytk"
          clearable
          placeholder="专业停考状态"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="停止招生" prop="sftzzs">
        <el-input
          v-model="queryParams.sftzzs"
          clearable
          placeholder="是否停止招生"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开考状态" prop="kkzt">
        <el-input
          v-model="queryParams.kkzt"
          clearable
          placeholder="开考状态"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-row>
        <el-col :span="20">
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                icon="el-icon-plus"
                plain
                size="mini"
                type="primary"
                @click="handleAdd"
              >新增(开发中)
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                :disabled="single"
                icon="el-icon-edit"
                plain
                size="mini"
                type="success"
                @click="handleUpdate"
              >修改
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                :disabled="multiple"
                icon="el-icon-delete"
                plain
                size="mini"
                type="danger"
                @click="handleDelete"
              >删除
              </el-button>
            </el-col>
          </el-row>
          <el-table :data="zyList" @selection-change="handleSelectionChange"  style="width:95%;margin-left: 2.5%">
            <el-table-column align="center" type="selection" width="55"/>
            <el-table-column align="center" label="专业代码" prop="zy_dm"/>
            <el-table-column align="center" label="专业名称" prop="zy_mc"/>
            <el-table-column align="center" label="主考学校" prop="zy_yx"/>
            <el-table-column align="center" label="学历层次" prop="xlcc"/>
            <el-table-column align="center" label="证书停发" prop="zstf"/>
            <el-table-column align="center" label="专业停考" prop="zytk"/>
            <el-table-column align="center" label="是否停止招生" prop="sftzzs"/>
            <el-table-column align="center" label="开考状态" prop="kkzt"/>
            <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="250">
              <template #default="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleUpdate(scope.row)"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDetail(scope.row)"
                >详情
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog :title="title" :visible.sync="open" width="80%">
        <span>
          <div class="el-table el-table--enable-row-hover el-table--medium">
          <table style="width: 100%;table-layout:fixed;">
            <tbody>
            <tr>
              <td class="el-table__cell is-leaf">
                <div class="cell">专业名称</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zy_mc }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">专业代码</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zy_dm }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">学分要求</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zy_xf }}</div>
              </td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf">
                <div class="cell">主考学校</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zy_yx }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">学历层次</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.cc }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">专业类型</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zy_type }}</div>
              </td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf">
                <div class="cell">专业审批</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zysp }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">审批时间</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.spsj }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">开考方式</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.kkfs }}</div>
              </td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf">
                <div class="cell">委托开考</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.wtkk }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">委托单位</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.wtdw }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">报考条件</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.bktj }}</div>
              </td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf">
                <div class="cell">毕业证书停止颁发</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zstf }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">专业停考</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.zytk }}</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">停止接收新生</div>
              </td>
              <td class="el-table__cell is-leaf">
                <div class="cell">{{ form.zyxq.sftzzs }}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <el-table :data="form.zykcMessageList" style="margin-top: 50px" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55"/>
          <el-table-column align="center" label="当次开考" prop="dckk"/>
          <el-table-column align="center" label="序号" prop="xh"/>
          <el-table-column align="center" label="代码" prop="kc_dm"/>
          <el-table-column align="center" label="国考" prop="bz"/>
          <el-table-column align="center" label="课程名称" prop="kc_mc"/>
          <el-table-column align="center" label="学分" prop="kc_xf"/>
          <el-table-column align="center" label="课程类型" prop="kctype"/>
          <el-table-column align="center" label="课程属性" prop="kcsx"/>
          <el-table-column align="center" label="衔接属性" prop="xjsx"/>
          <el-table-column align="center" label="衔接课程分类" prop="xjkcfl"/>
          <el-table-column align="center" label="备注" prop="bz"/>
        </el-table>
        <el-table style="margin-top: 50px" @selection-change="handleSelectionChange">
          <el-table-column align="center" label="主考学校代码" prop="postId"/>
          <el-table-column align="center" label="主考学校名称" prop="postId"/>
        </el-table>
        </span>
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="">取 消</el-button>-->
<!--    <el-button type="primary" @click="">确 定</el-button>-->
<!--  </span>-->
    </el-dialog>
  </div>
</template>

<script>
import { deletezy, getzydetail, getzytable, updatezymes } from '@/api/plan'

export default {
  name: 'Post',
  data() {
    return {
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
      zyList: [],
      title: '',
      open: false,
      uopen: false,
      queryParams: {
        zy_yx: null,
        zy_mc: null,
        byxf: null,
        xlcc: null,
        zysp: null,
        zstf: null,
        zytk: null,
        sftzz: null,
        kkzt: null,
        zy_dm: null
      },
      form: {
        'zyxq': {
          'zy_mc': '汽车制造与试验技术',
          'zy_dm': '460701',
          'zy_xf': null,
          'zy_yx': '闽西职业技术学院',
          'cc': '专科',
          'zy_type': null,
          'zysp': null,
          'spsj': null,
          'kkfs': null,
          'wtkk': null,
          'wtdw': null,
          'bktj': null,
          'zstf': null,
          'zytk': null,
          'sftzzs': null
        },
        'zykcMessageList': [
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '00018',
            'bz': '国考',
            'kc_xf': '2',
            'kctype': '必设1',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '计算机应用基础'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '00019',
            'bz': '省考',
            'kc_xf': '2',
            'kctype': '必设1',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '计算机应用基础（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '03706',
            'bz': '国考',
            'kc_xf': '2',
            'kctype': '必设1',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '思想道德修养与法律基础'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05868',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设1',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '职业道德与礼仪'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05870',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车售后服务管理'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05871',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车营销技术'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05872',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车营销案例分析'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05873',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车保险与理赔'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05874',
            'bz': '省考',
            'kc_xf': '1',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车保险与理赔（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05875',
            'bz': '省考',
            'kc_xf': '6',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车发动机构造与维修'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05876',
            'bz': '省考',
            'kc_xf': '3',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车发动机构造与维修（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05877',
            'bz': '省考',
            'kc_xf': '6',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车底盘构造与维修'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05878',
            'bz': '省考',
            'kc_xf': '3',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车底盘构造与维修（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05879',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车电器设备与维修'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05880',
            'bz': '省考',
            'kc_xf': '2',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车电器设备与维修（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05881',
            'bz': '省考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车诊断与维修'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05882',
            'bz': '省考',
            'kc_xf': '2',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车诊断与维修（实践）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '12656',
            'bz': '国考',
            'kc_xf': '4',
            'kctype': '必设2',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '毛泽东思想和中国特设社会主义理论体系概论'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '13124',
            'bz': '国考',
            'kc_xf': '7',
            'kctype': '选设A',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '英语（专）'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '04024',
            'bz': '省考',
            'kc_xf': '5',
            'kctype': '选设B',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '应用写作概论'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '04729',
            'bz': '国考',
            'kc_xf': '4',
            'kctype': '选设B',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '大学语文'
          },
          {
            'dckk': null,
            'xh': null,
            'kc_dm': '05869',
            'bz': '省考',
            'kc_xf': '5',
            'kctype': '选设A',
            'kcsx': null,
            'xjsx': null,
            'xjkcfl': null,
            'kc_mc': '汽车应用英语'
          }
        ]
      },
      gkform: {},
      options: [
        {
          value: 1,
          label: '4月13日上午9:00-11:30'
        },
        {
          value: 2,
          label: '4月13日下午14:30-17:00'
        },
        {
          value: 3,
          label: '4月14日上午9:00-11:30'
        },
        {
          value: 4,
          label: '4月14日下午14:30-17:00'
        },
        {
          value: 5,
          label: '10月26日上午9:00-11:30'
        },
        {
          value: 6,
          label: '10月26日下午14:30-17:00'
        },
        {
          value: 7,
          label: '10月27日上午9:00-11:30'
        },
        {
          value: 8,
          label: '10月27日下午14:30-17:00'
        }
      ]

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getzytable(this.queryParams).then(response => {
        console.log(response)
        this.zyList = response.data
      })
    },
    cancel() {
      this.open = false
      this.uopen = false
      this.gopen = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {}
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        zy_yx: null,
        zy_mc: null,
        byxf: null,
        xlcc: null,
        zysp: null,
        zstf: null,
        zytk: null,
        sftzz: null,
        kkzt: null,
        zy_dm: null
      }
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.zy_dm)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.uopen = true
      this.title = '专业信息'
    },
    handleDetail(row) {
      this.reset()
      this.open = true
      getzydetail(row.zy_dm).then(response => {
        console.log(response.data, 'detail')
        this.form = response.data
        this.open = true
        this.title = '专业信息详情'
      })
    },
    handleUpdate(row) {
      this.reset()
      // let chuancan = this.queryParams
      // chuancan.zy_dm = row.zy_dm || this.ids[0]
      // getzymes(chuancan).then(response => {
      //   this.form = response.data.data;
      //   this.open = true;
      //   this.title = "专业修改";
      // });
      console.log(row)
      this.form = row
      console.log(this.form)
      this.open = true
      this.title = '专业修改'
    },
    /** 提交按钮 */
    submitForm() {
      updatezymes(this.form).then(response => {
        this.$modal.msgSuccess('修改成功')
        this.uopen = false
        this.gopen = false
        this.open = false
        this.getList()
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除专业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletezy(row.zy_dm).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleExport() {
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
