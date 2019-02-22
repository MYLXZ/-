<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">立洋国际教育教师助手</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
            <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="type">
                    <el-select v-model="ruleForm.type" class="login-input" placeholder="选择角色" @change="typeChange">
                        <el-option key="0" label="学生" value="学生"></el-option>
                        <el-option key="1" label="教师" value="教师"></el-option>
                    </el-select>
                    <i class="el-input__icon el-icon-lx-group"></i>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input class="login-input" v-model="ruleForm.username" placeholder="用户名">
                        <i slot="prefix" class="el-input__icon el-icon-lx-people"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="login-input" type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <i slot="prefix" class="el-input__icon el-icon-lx-lock"></i>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>    -->         
        </div>
    </div>
</template>

<script>
  export default {
    data: function(){
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        }
      }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                localStorage.setItem('token','');
                this.$post('teachers/login',{loginId:this.ruleForm.username,passwd:this.ruleForm.password}).then((res) => {
                        if(res.code === 0){
                            localStorage.setItem('ms_name',res.data.loginId);
                            localStorage.setItem('teacherName',res.data.teacherName);
                            localStorage.setItem('token',res.data.token);
                            localStorage.setItem('classId',res.data.id);                            
                            if(res.data.type){
                                this.$router.push('/director');
                            }else{
                                 this.$router.push('/index');
                            }
                        }else{
                            this.$message.error(res.msg);
                        }
                      })
              } else {
                return false;
              }
            });
        },
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //         localStorage.setItem('token','');
        //         this.loading = true
        //         if(this.ruleForm.type === "主任"){
        //             this.$post('teachers/login',{loginId:this.ruleForm.username,passwd:this.ruleForm.password}).then((res) => {
        //                 if(res.code === 0){
        //                     // localStorage.setItem('userInfo',JSON.stringify(res.data));
        //                     // localStorage.setItem('token',res.data.token);
        //                     localStorage.setItem('ms_name',res.data.loginId);
        //                     localStorage.setItem('teacherName',res.data.teacherName);
        //                     localStorage.setItem('token',res.data.token);
        //                     localStorage.setItem('classId',res.data.id);                            
        //                     this.$router.push('/director');
        //                 }else{
        //                     this.$message.error(res.msg);
        //                 }
        //                 this.loading = false
        //               }).catch(() => {this.loading = false})
        //         }else{
        //             this.$post('teachers/login',{username:this.ruleForm.username,password:this.ruleForm.password}).then((res) => {
        //                 if(res.code === 0){
        //                     localStorage.setItem('userInfo',JSON.stringify(res.data));
        //                     console.log(res)
        //                     localStorage.setItem('ms_name',res.data.loginId);
        //                     localStorage.setItem('teacherName',res.data.teacherName);
        //                     localStorage.setItem('token',res.data.token);
        //                     localStorage.setItem('classId',res.data.id);                               
        //                             // this.$router.push('/leadershiptestb');
        //                             this.$router.push('/index');
        //                 }else{
        //                     this.$message.error(res.msg);
        //                 }
        //                 this.loading = false
        //               }).catch(() => {this.loading = false})
        //     }
        //   } else {
        //     return false;
        //   }
        //     });
        // },        
        typeChange(){
            this.ruleForm.username = ''
            this.ruleForm.password = ''
        }        
        }
  }
</script>
<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /*background-image: url(../../../assets/bg.png);*/
        background-image:url(../../../../static/img/back1.png);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.1);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>