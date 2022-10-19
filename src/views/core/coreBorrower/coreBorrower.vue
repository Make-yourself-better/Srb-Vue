<template>
  <div>
    <el-card>
      <div slot="header" v-show="scene==0">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="keyword" placeholder="姓名/手机/身份证"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getAuditList()">查询</el-button>
            <el-button type="danger" @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="scene==0">
        <el-table :data="records" style="width: 100%">
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="width">
          </el-table-column>
          <el-table-column prop="mobile" label="手机" width="width">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证" width="width">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="width">
          </el-table-column>
          <el-table-column label="是否结婚" width="width">
            <template slot-scope="{row,$index}">
              {{ row.marry ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="info" v-if="row.status==0" size="mini">未认证</el-tag>
              <el-tag type="warning" v-if="row.status==1" size="mini"> 认证中</el-tag>
              <el-tag type="sucess" v-if="row.status==2" size="mini">认证通过</el-tag>
              <el-tag type="danger" v-if="row.status==-1" size="mini">认证失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="audit(row)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :page-sizes="[5, 10, 20]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div>
        <Audit v-show="scene==1" @changeScene="changeScene" ref="audits"></Audit>
      </div>
    </el-card>
  </div>
</template>

<script>
import Audit from './audit.vue'

export default {
  components: { Audit },
  name: "coreBorrower",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      records: [],
      keyword: "",
      scene: 0
    };
  },
  mounted() {
    this.getAuditList();
  },
  methods: {
    handleSizeChange(limit) {
      this.limit = limit;
      this.getAuditList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getAuditList();
    },
    async getAuditList() {
      let result = await this.$API.coreBorrower.reqAuditList(this.page, this.limit, this.keyword);
      if (result.code == 0) {
        this.records = result.data.pageModel.records;
        this.total = result.data.pageModel.total;
      }
    },
    clear() {
      this.keyword = "";
      this.getAuditList();
    },
    audit(row) {
      console.log(row)
      this.scene = 1;
      this.$refs.audits.auditInfo(row)

    },
    changeScene(scene) {
      this.scene = scene
      this.getAuditList()
    }
  },

}
</script>

<style>

</style>