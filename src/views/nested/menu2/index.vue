<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主考学校" prop="postCode">
        <el-input
          v-model="queryParams.postCode"
          placeholder="请输入主考学校"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入专业"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毕业学分" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入毕业学分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学历层次" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入学历层次"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开考方式" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入开考方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业审批" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="专业审批"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证书停发" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="证书停发"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业停考" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="专业停考"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="停止招生" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="是否停止招生"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-row >
        <el-col :span="4"  :xs="24" style="border-right: 2px solid rgb(245,245,245);">
          <div class="head-container">
            <el-scrollbar >
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="20">
          <!--          <el-row :gutter="10" class="mb8">-->
          <!--            <el-col :span="1.5">-->
          <!--              <el-button-->
          <!--                type="primary"-->
          <!--                plain-->
          <!--                icon="el-icon-plus"-->
          <!--                size="mini"-->
          <!--                @click="handleAdd"-->
          <!--                v-hasPermi="['system:post:add']"-->
          <!--              >新增</el-button>-->
          <!--            </el-col>-->
          <!--            <el-col :span="1.5">-->
          <!--              <el-button-->
          <!--                type="success"-->
          <!--                plain-->
          <!--                icon="el-icon-edit"-->
          <!--                size="mini"-->
          <!--                :disabled="single"-->
          <!--                @click="handleUpdate"-->
          <!--                v-hasPermi="['system:post:edit']"-->
          <!--              >修改</el-button>-->
          <!--            </el-col>-->
          <!--            <el-col :span="1.5">-->
          <!--              <el-button-->
          <!--                type="danger"-->
          <!--                plain-->
          <!--                icon="el-icon-delete"-->
          <!--                size="mini"-->
          <!--                :disabled="multiple"-->
          <!--                @click="handleDelete"-->
          <!--                v-hasPermi="['system:post:remove']"-->
          <!--              >删除</el-button>-->
          <!--            </el-col>-->
          <!--            <el-col :span="1.5">-->
          <!--              <el-button-->
          <!--                type="warning"-->
          <!--                plain-->
          <!--                icon="el-icon-download"-->
          <!--                size="mini"-->
          <!--                @click="handleExport"-->
          <!--                v-hasPermi="['system:post:export']"-->
          <!--              >导出</el-button>-->
          <!--            </el-col>-->
          <!--            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
          <!--          </el-row>-->
          <el-table  :data="postList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="主考学校" align="center" prop="2" />
            <el-table-column label="专业" align="center" prop="postName" />
            <el-table-column label="毕业学分" align="center" prop="postSort" />
            <el-table-column label="学历层次" align="center" prop="remark" />
            <el-table-column label="开考方式" align="center" prop="" />
            <el-table-column label="专业审批" align="center" prop="" />
            <el-table-column label="证书停发" align="center" prop="" />
            <el-table-column label="专业停考" align="center" prop="" />
            <el-table-column label="是否停止招生" align="center" prop="" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:post:edit']"
                >查看专业</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-row>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改岗位信息对话框 -->
    <el-dialog title="详情" :visible.sync="open" width="80%" append-to-body>
      <el-card>
        <div slot="header">
          <span><i class=""></i>专业信息</span>
        </div>
        <div class="el-table el-table--enable-row-hover el-table--medium">
          <table cellspacing="0" style="width: 100%;table-layout:fixed;">
            <tbody>
            <tr>
              <td class="el-table__cell is-leaf"><div class="cell">专业名称</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" >金融学 </div></td>
              <td class="el-table__cell is-leaf"><div class="cell">专业代码</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" >020301</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">层次</div></td>
              <td class="el-table__cell is-leaf"><div class="cell" >专升本</div></td>
            </tr>
            <tr>
              <td class="el-table__cell is-leaf"><div class="cell">主考学校</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">集美大学</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">报考条件</div></td>
              <td class="el-table__cell is-leaf"><div class="cell">无</div></td>
            </tr>
            </tbody>
          </table>
        </div>
        <el-row :gutter="10" style="margin-top: 20px">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['system:post:add']"
            >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:post:export']"
            >导出</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table  style="margin-top: 50px" @selection-change="handleSelectionChange">
          <el-table-column label="序号" align="center" prop="postId"  />
          <el-table-column label="课程类别" align="center" prop="postCode" />
          <el-table-column label="课程代码" align="center" prop="kc_dm" />
          <el-table-column label="课程名称" align="center" prop="postSort" />
          <el-table-column label="学分" align="center" prop="status" />
          <el-table-column label="考试方式" align="center" prop="remark" >
            <el-table-column  label="面向社会" width="200" align="center">
            </el-table-column>
            <el-table-column  label="体制改革" width="200" align="center">
            </el-table-column>
            <el-table-column  label="衔接试点(二学历)" width="200" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="旧计划课程代码" align="center" prop="remark" />
          <el-table-column label="旧计划课程名称" align="center" prop="remark" />
          <el-table-column label="备注" align="center" prop="remark" />
          <el-table-column label="教材版本" align="center" prop="remark" />
        </el-table>
        <el-form  label-width="150px" >
          <el-form-item label="专业备注" prop="remark" >
            <el-input autosize  type="textarea"   v-model="mock.one" placeholder="请输入内容"/>
          </el-form-item>
          <el-row span:21>
            <el-col :span="11">
              <el-form-item label="体制改革主考院校" prop="approvalId">
                <el-input autosize type="textarea"  v-model="mock.two" placeholder="请输入体制改革主考院校"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停招新生主考院校" prop="approvalId">
                <el-input autosize type="textarea"  v-model="mock.two" placeholder="请输入停招新生主考院校"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row span:21>
            <el-col :span="11">
              <el-form-item label="衔接试点主考学校" prop="approvalId">
                <el-input autosize type="textarea"   v-model="mock.three" placeholder="请输入衔接试点主考学校"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停招新生主考院校" prop="approvalId">
                <el-input autosize type="textarea"  v-model="mock.two" placeholder="请输入停招新生主考院校"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row span:21>
            <el-col :span="11">
              <el-form-item label="衔接二学历主考院校" prop="approvalId">
                <el-input autosize type="textarea"  v-model="mock.four" placeholder="请输入衔接二学历主考院校"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停招新生主考院校" prop="approvalId">
                <el-input autosize type="textarea"  v-model="mock.two" placeholder="请输入停招新生主考院校"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="开考专业备注" prop="approvalId">
            <el-input autosize type="textarea"   placeholder="请输入开考专业备注"/>
          </el-form-item>


        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      data: [
        {
          label: '主考学校',

          children: [
            {
              label: '集美大学',
            },
            {
              label: '华侨大学',
            },
            {
              label: '福建师范大学',
            },
            {
              label: '闽南师范大学',
            },
            {
              label: '中国传媒大学',
            },
            {
              label: '福州大学',
            },
            {
              label: '福建理工大学',
            },
            {
              label: '福建医科大学',
            },
          ],
        },
      ]

    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询岗位信息列表 */
    getList() {
      this.loading = true;
      // listPost(this.queryParams).then(response => {
      //   this.postList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        postId: null,
        postCode: null,
        postName: null,
        postSort: null,
        status: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.postId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加岗位信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const postId = row.postId || this.ids
      // getPost(postId).then(response => {
      //   this.form = response.data;
      //
      //   this.title = "修改岗位信息";
      // });
      this.open = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.postId != null) {
            updatePost(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPost(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
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
