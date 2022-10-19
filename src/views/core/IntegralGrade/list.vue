<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog "> 添加
    </el-button>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="borrowAmount" label="借款额度" width="width">
      </el-table-column>
      <el-table-column prop="integralStart" label="积分区间开始" width="width">
      </el-table-column>
      <el-table-column prop="integralEnd" label="积分区间结束" width="width">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateIntegral(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-edit" size="mini" @click="deleteIntegral(row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 提示框 -->
    <el-dialog :title="IntegralGradefrom.id?'修改品牌':'添加品牌'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="IntegralGradefrom" label-width="80px">
        <el-form-item label="借款额度">
          <el-input v-model="IntegralGradefrom.borrowAmount"></el-input>
        </el-form-item>
        <el-form-item label="积分区间开始">
          <el-input v-model="IntegralGradefrom.integralStart"></el-input>
        </el-form-item>
        <el-form-item label="积分区间结束">
          <el-input v-model="IntegralGradefrom.integralEnd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'IntegralGrade',
  data() {
    return {
      dialogVisible: false,
      list: [],
      IntegralGradefrom: {
        borrowAmount: '',
        integralStart: '',
        integralEnd: ''
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    //添加
    showDialog() {
      this.dialogVisible = true
      //清空表单
      this.IntegralGradefrom = {}
    },
    //修改
    updateIntegral(row) {
      console.log(row)
      this.dialogVisible = true
      this.IntegralGradefrom = { ...row }

    },
    //修改或添加按钮
    async addOrUpdate() {
      let result = await this.$API.IntegralGrade.addOrUpdateIntegralGrade(this.IntegralGradefrom);
      if (result.code == 0) {
        this.$message({
          type: 'success',
          message: this.IntegralGradefrom.id ? '修改品牌成功' : '保存品牌成功'
        });
        this.getlist()
      }
      this.dialogVisible = false


    },
    //删除
    deleteIntegral(row) {
      this.$confirm(`你确定删除${row.id}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        //当用户点击确定按钮的时候会出发
        //向服务器发请求
        let result = await this.$API.IntegralGrade.delIntegralGrade(row.id);
        //如果删除成功
        if (result.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getlist();
        }
      })
    },
    //拆查询
    async getlist() {
      let result = await this.$API.IntegralGrade.reqIntegralGrade()
      this.list = result.data.getIntegralGradeList
    }

  }

}
</script>

<style>

</style>