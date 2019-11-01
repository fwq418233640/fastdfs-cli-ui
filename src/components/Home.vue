<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link to='/' tag="div">登陆页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to='/home' tag="div">首页</router-link>
      </el-menu-item>
      <el-menu-item index="3" disabled>统计</el-menu-item>
      <el-menu-item index="4" disabled>日志分析</el-menu-item>
      <el-menu-item index="5" disabled>用户管理</el-menu-item>
      <el-menu-item index="6" disabled>系统信息</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="fileName" label="文件名称"></el-table-column>
      <el-table-column prop="fileSize" label="文件大小">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ Math.round(scope.row.fileSize/1024).toFixed(2) }} KB
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="visitsCount" label="访问次数"></el-table-column>
      <el-table-column prop="suffix" label="文件后缀"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="fileId" label="FileId" width="500"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="deletedClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <span style="text-align: center">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="tablePage.pageCurrent" :page-sizes="tablePage.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </span>
    <br/>
    <span style="text-align: center">
      <router-link to='/' tag="div">
        <el-link type="primary">返回登陆页</el-link>
      </router-link>
    </span>

    <el-dialog title="图片查看" :visible="dialogVisible"
               :before-close="closeDialog">
      <span>
        <div class="images">
          <img height="600" v-if="imagesVisible" style="width: 100%" :src="fileUrl" :alt="title">
          <video height="600" v-if="videoVisible" style="width:99.99%" :src="fileUrl" autoplay="autoplay"
                 controls="controls"></video>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {http} from '@/util/service';

  export default {
    name: "Home",
    data() {
      return {
        activeIndex: 2,
        tableData: [],
        dialogVisible: false,
        fileUrl: '',
        title: '',
        imagesVisible: false,
        videoVisible: false,
        total: 0,
        tablePage: {
          pageCurrent: 1,
          pageSize: [30],
        },
        imageClass: [
          "bmp", "jpg", "png",
          "tif", "gif", "pcx", "tga",
          "exif", "fpx", "svg",
          "psd", "cdr", "pcd",
          "dxf", "ufo", "eps",
          "ai", "raw", "WMF", "webp"
        ],
        videoClass: [
          "mp4", "avi", "asf", "webm", "ogg"
        ]
      }
    },
    mounted() {
      this.findByPage();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {

        if (this.imageClass.indexOf(row.suffix) >= 0) {
          return 'image-row';
        } else if (this.videoClass.indexOf(row.suffix) >= 0) {
          return 'video-row';
        }
        return 'file-row';
      },
      handleCurrentChange(val) {
        this.tablePage.pageCurrent = val;
        this.findByPage();
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      async deletedClick(row) {
        let url = "/api/deleted/v1";
        let parameter = {};
        parameter.fileId = row.fileId;
        let result = await http.post(url, parameter);
        let data = result.data;
        if (data.success) {
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
        this.findByPage();
      },
      handleClick(row) {
        this.fileUrl = process.env.BASE_API + "/api/download/v1?fileId=" + row.fileId;

        if (this.imageClass.indexOf(row.suffix) >= 0) {
          this.imagesVisible = true;
          this.videoVisible = false;
        } else if (this.videoClass.indexOf(row.suffix) >= 0) {
          this.videoVisible = true;
          this.imagesVisible = false;
        } else {
          // 非常用文件直接进行下载
          window.open(this.fileUrl);
          return
        }
        this.title = row.filename;
        this.dialogVisible = true;
      },
      async findByPage() {
        let url = '/file/find/page?page=' + this.tablePage.pageCurrent + '&size=' + this.tablePage.pageSize;
        let result = await http.get(url);
        let data = result.data;
        this.tableData = data.content;
        this.total = data.totalElements;
      }
    }
  }
</script>

<style>
  .el-table .image-row {
    /*background: oldlace;*/
  }

  .el-table .video-row {
    /*background: lightgoldenrodyellow;*/
  }

  .el-table .file-row {
    /*background: #FFF;*/
  }

  .images {
    border: #2B2B36 dashed 1px;
    width: auto;
  }
</style>
