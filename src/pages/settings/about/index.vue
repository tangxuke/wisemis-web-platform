<template>
    <d2-container>
        <el-upload class="upload-demo" action="http://localhost:3000/upload/" name="myfile" :on-success="onSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </d2-container>
</template>
<script>
export default {
  methods: {
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    }
  }
};
</script>
