<template>

  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="lendList" stripe>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="lendNo" label="标的编号" width="160" />
      <el-table-column prop="amount" label="标的金额" />
      <el-table-column prop="period" label="投资期数" />
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.lendYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="investAmount" label="已投金额" />
      <el-table-column prop="investNum" label="投资人数" />
      <el-table-column prop="publishDate" label="发布时间" width="150" />
      <el-table-column prop="lendStartDate" label="开始日期" />
      <el-table-column prop="lendEndDate" label="结束日期" />
      <el-table-column prop="map.returnMethod" label="还款方式" />
      <el-table-column prop="map.status" label="状态" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status == 1" type="warning" size="mini" @click="makeLoan(row)">
            放款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <h4>借款信息</h4>
    <table class="table table-striped table-condenseda table-bordered" width="100%">
      <tbody>
        <tr>
          <th width="15%">借款金额</th>
          <td width="35%">{{ borrowInfoDetail.borrowInfo.amount }}元</td>
          <th width="15%">借款期限</th>
          <td width="35%">{{ borrowInfoDetail.borrowInfo.period }}个月</td>
        </tr>
        <tr>
          <th>年化利率</th>
          <td>{{ borrowInfoDetail.borrowInfo.borrowYearRate * 100 }}%</td>
          <th>还款方式</th>
          <td>{{ borrowInfoDetail.borrowInfo.returnMethod }}</td>
        </tr>

        <tr>
          <th>资金用途</th>
          <td>{{ borrowInfoDetail.borrowInfo.moneyUse }}</td>
          <th>状态</th>
          <td>{{ borrowInfoDetail.borrowInfo.status }}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{{ borrowInfoDetail.borrowInfo.createTime }}</td>
          <th></th>
          <td></td>
        </tr>
      </tbody>
    </table>

    <h4>借款人信息</h4>
    <table class="table table-striped table-condenseda table-bordered" width="100%">
      <tbody>
        <tr>
          <th width="15%">借款人</th>
          <td width="35%">
            <b>{{ borrowInfoDetail.borrower.name }}</b>
          </td>
          <th width="15%">手机</th>
          <td width="35%">{{ borrowInfoDetail.borrower.mobile }}</td>
        </tr>
        <tr>
          <th>身份证</th>
          <td>{{ borrowInfoDetail.borrower.idCard }}</td>
          <th>性别</th>
          <td>{{ borrowInfoDetail.borrower.sex }}</td>
        </tr>
        <tr>
          <th>年龄</th>
          <td>{{ borrowInfoDetail.borrower.age }}</td>
          <th>是否结婚</th>
          <td>{{ borrowInfoDetail.borrower.marry }}</td>
        </tr>
        <tr>
          <th>学历</th>
          <td>{{ borrowInfoDetail.borrower.education }}</td>
          <th>行业</th>
          <td>{{ borrowInfoDetail.borrower.industry }}</td>
        </tr>
        <tr>
          <th>月收入</th>
          <td>{{ borrowInfoDetail.borrower.income }}</td>
          <th>还款来源</th>
          <td>{{ borrowInfoDetail.borrower.returnSource }}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{{ borrowInfoDetail.borrower.createTime }}</td>
          <th>状态</th>
          <td>{{ borrowInfoDetail.borrower.status }}</td>
        </tr>
      </tbody>
    </table>

    <el-row style="text-align:center;margin-top: 40px;">
      <el-button @click="back">
        返回
      </el-button>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      borrowInfoDetail: {},
      lendList: []
    }
  },
  mounted() {
    this.show()
    this.getLendList()
  },
  methods: {
    async show(row) {
      let result = await this.$API.borrowerInfo.reqGetBorrowerDetail(row.id);
      if (result.code == 0) {
        this.borrowInfoDetail = result.data.borrowInfoDetail
      }
    },
    async getLendList() {
      let result = await this.$API.borrowerInfo.reqGetLendList();
      if (result.code == 0) {
        this.lendList = result.data.list
      }
    },
    async makeLoan(row) {
      let result = await this.$API.borrowerInfo.reqmakeLoan(row.id);

    },
    back() {
      this.$emit('changeScene', 0)
      //清除数据
      Object.assign(this._data, this.$options.data());
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
  