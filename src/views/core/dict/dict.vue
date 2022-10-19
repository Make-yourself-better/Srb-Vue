<template>
  <div>
    <el-button type="danger" size="mini" @click="bacthDelete">批量删除</el-button>
    <!-- ref="menuTree" 批量删除用的东西 -->
    <el-tree :data="dictList" :props="defaultProps" :expand-on-click-node="false" show-checkbox node-key="id"
      :default-expanded-keys="expandedKeys" ref="menuTree">

      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" v-if="node.level<=2" size="mini" @click="() => append(data)">
            添加
          </el-button>
          <el-button type="text" v-if="node.childNodes.length==0" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
          <el-button type="text" size="mini" @click="() => edit(node, data)">
            修改
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="dict.id?'修改':'添加'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="dict" label-width="80px">
        <el-form-item label="添加分类">
          <el-input v-model="dict.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveOrUpDate">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 文件上传 -->
    <el-card>
      <div slot="header">
        <el-button @click="showVisible = true" type="primary" size="mini" icon="el-icon-download">
          导入Excel
        </el-button>
        <el-button @click="exportData" type="primary" size="mini" icon="el-icon-upload2">
          导出Excel
        </el-button>
      </div>
      <div>
        <el-dialog title="数据字典导入" :visible.sync="showVisible" width="30%">
          <el-form>
            <el-form-item label="请选择Excel文件">
              <el-upload :auto-upload="true" :multiple="false" :limit="1" :on-exceed="fileUploadExceed"
                :on-success="fileUploadSuccess" :on-error="fileUploadError"
                :action="BASE_API + '/admin/core/dict/import'" name="file"
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'dict',
  data() {
    return {
      showVisible: false,
      dialogVisible: false,
      expandedKeys: [],
      dictList: [],
      dict: { name: '', parentId: "", id: '' },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址
    }
  },
  mounted() {
    this.getDictList()
  },
  methods: {
    //上传成功回调
    fileUploadSuccess(response) {
      if (response.code == 0) {
        this.$message.success('数据导入成功')
        this.dialogVisible = false

      } else {
        this.$message.error(response.message)
      }
    },

    // 上传多于一个文件时
    fileUploadExceed() {
      this.$message.warning('只能选取一个文件')
    },
    //上传失败回调
    fileUploadError(error) {
      this.$message.error('数据导入失败')
    },
    //Excel数据导出
    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dict/export'
    },




    async SaveOrUpDate() {
      let result = await this.$API.Dict.addOrUpdateDict(this.dict)
      if (result.code == 0) {
        this.$message({
          type: 'success',
          message: this.dict.id ? '修改品牌成功' : '添加品牌成功'
        });
        this.dialogVisible = false
        this.getDictList()
        //设置默认展开的菜单
        this.expandedKeys = [this.dict.parentId]
      }
    },
    //编辑
    edit(data, node) {
      console.log(data, node)
      this.dialogVisible = true
      this.dict.name = node.name
      this.dict.id = node.id
    },
    append(data) {
      console.log(data)
      this.dict = {}
      this.dialogVisible = true
      this.dict.parentId = data.id //获取父分类的id

    },
    //批量删除
    bacthDelete() {
      //获取所选中的所有节点
      let checkNodes = this.$refs.menuTree.getCheckedKeys()
      this.$confirm(`你确定删除${checkNodes}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let result = await this.$API.Dict.reqdelDict(checkNodes);
        if (result.code == 0) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getDictList();
          //设置默认展开的菜单

        }
      })
    },

    async remove(node, data) {
      console.log(data, node)
      var ids = [data.id]
      this.$confirm(`你确定删除${data.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        //当用户点击确定按钮的时候会出发
        //向服务器发请求
        let result = await this.$API.Dict.reqdelDict(ids);
        //如果删除成功
        if (result.code == 0) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getDictList();
          //设置默认展开的菜单
          this.expandedKeys = [node.parent.data.id]
        }
      })
    },

    async getDictList() {
      let result = await this.$API.Dict.reqDictList();
      if (result.code == 0) {
        this.dictList = result.data.list
      }
    },
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>