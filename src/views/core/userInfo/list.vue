<template>
  <div>
    <el-card>
      <div>
        <el-form :inline="true" :model="searchObj" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="searchObj.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="searchObj.userType" placeholder="用户类型">
              <el-option label="投资人" value="1" />
              <el-option label="借款人" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-select v-model="searchObj.status" placeholder="用户状态">
              <el-option label="投资人" value="1"></el-option>
              <el-option label="借款人" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getpageList">查询</el-button>
            <el-button type="warning" @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div>
        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="userType" label="用户类型" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-if="row.userType==1" size="mini">
                投资人
              </el-tag>
              <el-tag type="warning" v-else size="mini">
                借款人
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="用户姓名" width="width">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="width">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="width">
          </el-table-column>
          <el-table-column prop="integral" label="用户积分" width="width">
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间" width="width">
          </el-table-column>
          <el-table-column prop="bindStatus" label="绑定状态" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-if="row.bindStatus==1" size="mini">已绑定</el-tag>
              <el-tag type="danger" size="mini" v-if="row.bindStatus==0">未绑定</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="用户状态" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-if="row.status==1" size="mini">正常</el-tag>
              <el-tag type="danger" size="mini" v-if="row.status==0">锁定</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button slot="reference" type="danger" size="mini" @click="locks(row)" v-if="row.status==0">解锁
              </el-button>
              <el-button slot="reference" type="primary" size="mini" @click="locks(row)" v-if="row.status==1">锁定
              </el-button>
              <el-button type="warning" size="mini" @click="LoginRecods(row)">日志</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-table :data="LoginUser" style="width: 100%">
            <el-table-column prop="ip" label="用户地址" width="width">
            </el-table-column>
            <el-table-column prop="id" label="用户ID" width="width">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="width">
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </el-card>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[1, 5, 10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'userInfo',
  data() {
    return {
      dialogVisible: false,
      page: 1,
      limit: 10,
      total: 0, // 数据库中的总记录数
      records: [],
      searchObj: {},
      LoginUser: []

    }
  },
  mounted() {
    this.getpageList()
  },
  methods: {
    handleSizeChange(limit) {
      this.limit = limit
      this.getpageList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getpageList()
    },

    async getpageList() {
      let result = await this.$API.userInfo.reqUserInfoList(this.page, this.limit, this.searchObj)
      if (result.code == 0) {
        console.log(result)
        this.total = result.data.page.total
        this.records = result.data.page.records
      }
    },
    clear() {
      this.searchObj = {}
      this.getpageList()
    },
    async locks(row) {
      console.log(row)
      if (row.status == 0) {
        let resut = await this.$API.userInfo.reqLock(row.id, 1)
        if (resut.code == 0) {
          this.$message({ type: "success", message: "锁定成功" });
        }
      } else {
        let resut = await this.$API.userInfo.reqLock(row.id, 0)
        if (resut.code == 0) {
          this.$message({ type: "success", message: "锁定成功" });
        }
      }
      this.getpageList()

    },
    async LoginRecods(row) {
      this.dialogVisible = true
      let result = await this.$API.userInfo.reqLoginRecods(row.id)
      if (result.code == 0) {
        this.LoginUser = result.data.list
      }
    },

  },

}
</script>

<style>

</style>