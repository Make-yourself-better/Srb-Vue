<template>
  <div>
    <el-table :data="BorrowerInfo" style="width: 100%" border v-show="scene==0">
      <el-table-column label="序号" type="index" width="width">
      </el-table-column>
      <el-table-column prop="name" label="还款人姓名" width="width">
      </el-table-column>
      <el-table-column prop="mobile" label="手机" width="width">
      </el-table-column>
      <el-table-column prop="amount" label="借款金额" width="width">
      </el-table-column>
      <el-table-column prop="period" label="借款期限" width="width">
        <template slot-scope="{row,$index}">
          {{row.period}}个月
        </template>
      </el-table-column>
      <el-table-column prop="param.returnMethod" label="还款方式" width="width">
      </el-table-column>
      <el-table-column prop="param.moneyUse" label="资金用途" width="width">
      </el-table-column>
      <el-table-column prop="borrowYearRate" label="年化利率" width="width">
      </el-table-column>
      <el-table-column label="状态" width="width">
        <template slot-scope="{row,$index}">
          <el-tag type="danger" v-if="row.param.status=='审核中'">审核中</el-tag>
          <el-tag type="success" v-if="row.param.status=='审核通过'">审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" width="width">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="danger" size="mini" @click="approvalShow(row)">审批</el-button>
          <el-button type="success" size="mini" @click="showInfo(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="approvalInfo">
        <el-form-item label="是否通过">
          <el-radio-group v-model="approvalInfo.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标的名称">
          <el-input v-model="approvalInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起息日">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="approvalInfo.lendStartDate" style="width: 100%;"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
        </el-form-item>
        <el-form-item label="年化利率">
          <el-input v-model="approvalInfo.lendYearRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务费率">
          <el-input v-model="approvalInfo.serviceRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标的描述">
          <el-input v-model="approvalInfo.lendInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="approvalInfo.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <BorrowerDetail v-show="scene==1" ref="detail" @changeScene="changeScene"></BorrowerDetail>
  </div>
</template>

<script>

import BorrowerDetail from './borrowerDetail.vue'
export default {
  components: { BorrowerDetail },
  name: "borrowerInfo",
  data() {
    return {
      scene: 0,
      dialogFormVisible: false,
      BorrowerInfo: [],
      approvalInfo: {
        id: "",
        status: "",
        title: "",
        amount: ""

      }
    };
  },
  mounted() {
    this.BorrowerInfos();
  },
  methods: {
    async BorrowerInfos() {
      let result = await this.$API.borrowerInfo.reqBorrowerInfo();
      console.log(result);
      if (result.code == 0) {
        this.BorrowerInfo = result.data.borrowInfoList;
      }
    },
    approvalShow(row) {
      this.dialogFormVisible = true;
      this.approvalInfo.id = row.id;
    },
    async submit() {
      let result = await this.$API.borrowerInfo.reqApproval(this.approvalInfo);
      if (result.code == 0) {
        this.$message({ type: "success", message: "审批成功" });
      }
      this.dialogFormVisible = false;
      this.BorrowerInfos();
    },
    showInfo(row) {
      this.scene = 1
      this.$refs.detail.show(row)
    },
    changeScene(scene) {
      this.scene = scene
      this.BorrowerInfos();
    }
  },

}
</script>

<style>

</style>