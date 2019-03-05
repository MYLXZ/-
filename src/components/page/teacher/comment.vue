<template ref="chatContent">
    <div class="table" >
        <div class="container" >
            <el-form :model="form" ref="form" class="item-add-list">
              <el-form-item label="请选择班级">
                    <el-select v-model="form.lesson" filterable placeholder="请选择班级" @change="handelchange">
                      <el-option v-for="item in classes" :key="item.id" :label="item.className" :value="item.id"></el-option>
                    </el-select>  
              </el-form-item>
               <!--  <el-table  stripe style="width:100%" :data="nameData" v-if="tableshow">
                  <el-table-column prop="studentId" label="Id" v-if="idshow">
                  </el-table-column>                  
                  <el-table-column prop="name" label="Name">
                  </el-table-column>
                  <el-table-column label="Attendance">
                     <template scope="scope">
                        <el-input size="medium" v-model="scope.row.Attendance" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                    </template>
                  </el-table-column>
                  <el-table-column prop="participation" label="Class participation">
                      <template scope="scope">
                        <el-input size="small" v-model="scope.row.participation" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                      </template>                    
                  </el-table-column>                  
                  <el-table-column prop="Assignment" label="Assignment">
                      <template scope="scope">
                        <el-input size="small" v-model="scope.row.Assignment" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                      </template>                     
                  </el-table-column>
                </el-table> -->
               <!--  <dl>
                  <dt></dt>
                  <dd></dd>
                </dl> -->
                <!-- <dl v-for="item in nameData" style="width: 100%;margin-top: 10px;margin-bottom: 20px;" v-if="tableshow"> 
                  <dt style="width: 25%;float: left">{{item.name}}</dt>
                  <dd style="width: 20%; margin-left:2%;float: left">
                    <el-input v-model="item.attendance"></el-input>
                  </dd>  
                  
                  <dd style="width: 20%; margin-left:2%;float: left">
                    <el-input v-model="item.classParticipation"></el-input>
                  </dd> 
                  <dd style="width: 20%; margin-left:2%;float: left">
                    <el-input v-model="item.assignmentSubmission"></el-input>
                  </dd>                                                     
                    
                </dl> -->
                <el-form-item  v-if="tableshow" style="width: 100%;">
                  <div style="float: left;width: 30%;margin-left: 2%;text-align: justify;text-justify: newspaper;word-break: break-all;">Name</div>
                  <div style="float: left;width: 20%;margin-left: 2%;text-align: justify;text-justify: newspaper;word-break: break-all;">Attendance</div>
                  <div style="float: left;width: 20%;margin-left: 2%;text-align: justify;text-justify: newspaper;word-break: break-all;">Class</br>participation</div>
                  <div style="float: left;width: 20%;margin-left: 2%;text-align: justify;text-justify: newspaper;word-break: break-all;">Assignment</div>
              </el-form-item>                
               <el-form-item v-for="item in nameData" v-if="tableshow" style="width: 100%;">
                  <div style="float: left;width: 30%">{{item.name}}<br/>{{item.englishName}}</div>
                  <el-input v-model="item.attendance" style="width: 20%;margin-left: 2%;"></el-input>
                  <el-input v-model="item.classParticipation" style="width: 20%;margin-left: 2%;"></el-input>
                  <el-input v-model="item.assignmentSubmission" style="width: 20%;margin-left: 2%;"></el-input>
              </el-form-item>
            </el-form>
            <div class="exam_btn">
              <el-button type="primary" @click="submit">提交考勤</el-button>
            </div>            
        </div>
    </div>
</template>

<script>
  export default {
    name: 'comment',
    data() {
      return {
        idshow:false,
        tableshow:false,
        form: {
          lesson:"",
        },
        selected:'',
        exam:[],
        classes:[],
        list:[],
        itemName:'',
        nameData: [{
          name: '',
          studentId:'',
          attendance:'E',
          classParticipation:'',
          assignmentSubmission:''

        }],
        answerdata:[],
        // datalist:{
        //   nameData:[
        //   {
        //     name: ''
        //   }],
        //   listData:[]
        // }
      }
    },
    created(){
      this.getSelectData();
      this.id = localStorage.getItem('classId');
    },
    computed: {
      
    },
    methods: {
        getSelectData(){
            this.classId = localStorage.getItem('classId')
            this.$get('teachers/'+ this.classId).then((res) => {
            if(res.code === 0){
                this.classes = res.data.classList;
            }else{
                this.$message.error('接口数据请求失败');
            }
          }).catch(() => {this.loading = false})            
        },
        handelchange(){
           this.getnameData()
         },
        // getlistData(){
        //     this.$get('teachers/'+this.id+'/classes/'+this.form.lesson+'/getclassperformance').then((res) => {
        //     if(res.code === 0){
        //       console.log(res);

        //       this.listData = res.data;
        //       // this.datalength = res.data.list.length;
        //       // if(res.data.list){
        //       //   for(var i=0,len = res.data.list.length ; i< len;i++){
        //       //     res.data.list[i].itemName = res.data.list[i].itemName.split("|")
        //       //   }
        //       //   this.list = JSON.parse(JSON.stringify(res.data.list))
        //       // }              
        //     }else{
        //         this.$message.error('接口数据请求失败');
        //     }
        //   }).catch(() => {this.loading = false})            
        // },
        getnameData(){
          this.$axios.all([
            this.$get('realclasses/'+this.form.lesson),
           this.$get('teachers/'+this.id+'/classes/'+this.form.lesson+'/getclassperformance')
          ]).then(([a,b])=>{
            if(a.code === 0 && b.code === 0){
              this.tableshow = true
              this.nameData = a.data.studentList;
              // console.log(a,b);
              this.answerdata = b.data;
              console.log(this.answerdata);
              if(a.data.studentList){
                for(var i=0,len = a.data.studentList.length ; i< len;i++){
                  if(b.data.length>0){
                    for (var k =0; k< a.data.studentList.length; k++) {
                      if(a.data.studentList[i].id == b.data[k].studentId){
                        a.data.studentList[i].attendance = b.data[k].attendance
                        a.data.studentList[i].classParticipation = b.data[k].classParticipation
                        a.data.studentList[i].assignmentSubmission = b.data[k].assignmentSubmission
                      }
                    }                    
                  }else{
                    a.data.studentList[i].attendance = "E"
                    a.data.studentList[i].classParticipation = ""
                    a.data.studentList[i].assignmentSubmission = ""                    
                  }
                 
                }
                this.list = JSON.parse(JSON.stringify(a.data.list))
              } 
              if(b.data.list){
                for(var i=0,len = b.data.list.length ; i< len;i++){
                  b.data.list[i].itemName = b.data.list[i].itemName.split("|")
                }
                this.list = JSON.parse(JSON.stringify(b.data.list))
              }                                                    
            }else{
              this.$message.error('数据请求失败');
              this.loading = false
            }
          }).catch((err) =>{
            this.loading = false
          })
          // this.$get('realclasses/'+this.form.lesson).then((res) => {
          //   if(res.code === 0){
          //     console.log(res)
          //     this.tableshow = true
          //     this.nameData = res.data.studentList;
          //     if(res.data.studentList){
          //       for(var i=0,len = res.data.studentList.length ; i< len;i++){
          //         res.data.studentList[i].attendance = "E"
          //         res.data.studentList[i].classParticipation = ""
          //         res.data.studentList[i].assignmentSubmission = ""
          //       }
          //       this.list = JSON.parse(JSON.stringify(res.data.list))
          //     }              
          //   }else{
          //       this.$message.error('接口数据请求失败');
          //   }
          // }).catch(() => {this.loading = false})            
        },
        submit(){
          this.loading = true
          this.exam = []  
          var item;
          // console.log(this.data);
          // if(this.answerdata.length<0){
          //   for(var i=0; i <this.nameData.length; i++ ){
          //     item={"studentId":this.nameData[i].id,"attendance":this.nameData[i].attendance,"classParticipation":this.nameData[i].classParticipation,"assignmentSubmission":this.nameData[i].assignmentSubmission}
          //       this.exam.push(item)
          //   }
          // }
          if(this.answerdata.length>0){
            for(var i=0; i <this.nameData.length; i++ ){
              item={"studentId":this.nameData[i].id,"attendance":this.nameData[i].attendance,"classParticipation":this.nameData[i].classParticipation,"assignmentSubmission":this.nameData[i].assignmentSubmission,"id":this.answerdata[i].id}
                this.exam.push(item)
            }
          }else{
            for(var i=0; i <this.nameData.length; i++ ){
              item={"studentId":this.nameData[i].id,"attendance":this.nameData[i].attendance,"classParticipation":this.nameData[i].classParticipation,"assignmentSubmission":this.nameData[i].assignmentSubmission}
                this.exam.push(item)
            }              
          }         

          // for(var i=0; i <this.nameData.length; i++ ){
          //   item={"studentId":this.nameData[i].id,"attendance":this.nameData[i].attendance,"classParticipation":this.nameData[i].classParticipation,"assignmentSubmission":this.nameData[i].assignmentSubmission}
          //     this.exam.push(item)
          // }
          // console.log(this.exam);
            this.$post("teachers/"+this.id+"/classes/"+this.form.lesson+"/classperformance",this.exam).then((res) => {
            if(res.code === 0){
              this.$message({message:res.msg,type: 'success'});
              this.$router.push('/index');
            }else{
              this.$message.error(res.msg);
            }
            })          
        },
        handleEdit(index, row) {
        },
    }
  }
</script>

<style scoped>
.handle-box { margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px; text-align: center;}
.el-icon-edit-outline{color:#ffc966; font-size:24px; margin-right:10px;}
.el-icon-info{color:#448eff; font-size:24px;}

</style>
<style>
.item-title{ height:42px; background:#f6f6f6; margin-bottom:20px;}
.item-title span{ font-size:14px; color:#666; height:22px; line-height:22px;display:block; margin:10px 0 0 20px; border-left:5px solid #ff7070; padding-left:10px;}
</style>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

