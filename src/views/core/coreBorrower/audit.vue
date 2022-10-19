<template>
  <div>
    <el-descriptions class="margin-top" title="用户信息" :column="3" border>
      <el-descriptions-item>
        <template slot="label">
          姓名
        </template>
        {{AuditorInformation.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          手机号
        </template>
        {{AuditorInformation.mobile}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          性别
        </template>
        {{AuditorInformation.sex}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          年龄
        </template>
        {{AuditorInformation.age}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          学历
        </template>
        {{AuditorInformation.education}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          行业
        </template>
        {{AuditorInformation.returnSource}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          联系人关系
        </template>
        {{AuditorInformation.contactsRelation}}

      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          联系人姓名
        </template>
        {{AuditorInformation.contactsName}}

      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          联系人电话
        </template>
        {{AuditorInformation.contactsMobile}}

      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          已婚
        </template>
        {{AuditorInformation.marry}}

      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          工资
        </template>
        {{AuditorInformation.income}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          身份证号
        </template>
        {{AuditorInformation.idCard}}
      </el-descriptions-item>
    </el-descriptions>

    <el-card>
      <el-table :data="imageList" style="width: 100%">
        <el-table-column label="借款人信息" width="width">
          <template slot-scope="{row,$index}">
            <el-image style="width: 100px; height: 100px" :src="row.imageUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="imageType" label="图片类型">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-form ref="form" :model="Approval" label-width="80px">

        <el-form-item label="基本积分">
          <el-input v-model="Approval.infoIntegral"></el-input>
        </el-form-item>

        <el-form-item label="是否通过">
          <el-radio-group v-model=" Approval.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证信息是否正确" size="mini">
          <el-radio-group v-model="Approval.isIdCardOk">
            <el-radio :label="true">通过</el-radio>
            <el-radio :label="false">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车辆信息是否正确">
          <el-radio-group v-model="Approval.isCarOk">
            <el-radio :label="true">通过</el-radio>
            <el-radio :label="false">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="房产信息是否正确">
          <el-radio-group v-model="Approval.isHouseOk">
            <el-radio :label="true">通过</el-radio>
            <el-radio :label="false">不通过</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item>
          <el-button type="warning" @click="cannel">返回</el-button>
          <el-button type="primary" @click="approval">确定</el-button>

        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "audit",
  data() {
    return {
      value2: true,
      AuditorInformation: {
        borrowerAttachVOList: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imageList: [],//收集图片的信息
      Approval: {
        status: '',
        borrowerId: '',
        isIdCardOk: '',
        isHouseOk: '',
        isCarOk: '',
        infoIntegral: ''
      }
    }
  },
  mounted() {
    this.auditInfo()
  },
  methods: {
    cannel() {
      //通知父组件回到场景0
      this.$emit('changeScene', 0)
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    async auditInfo(row) {
      console.log("来自子组件auditInfo的消息", row)
      let result = await this.$API.coreBorrower.reqAuditInfo(row.id);
      if (result.code == 0) {
        console.log(result.data.borrowerVO)
        this.AuditorInformation = result.data.borrowerVO
        this.imageList = result.data.borrowerVO.borrowerAttachVOList
        this.Approval.status = row.status
        this.Approval.borrowerId = row.id
      }
    },
    async approval() {
      console.log("来自子组件approval的消息", this.Approval.status)
      let result = await this.$API.coreBorrower.reqApproval(this.Approval);
      if (result.code == 0) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit('changeScene', 0)
        //清除数据
        Object.assign(this._data, this.$options.data());
      }
    }
  }

}
</script>
<style>

</style>