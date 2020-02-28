<template>
   <div class="wrapper-addResume">
    <div :class="['person-info',{'readyInfo':clonePerson}]">
      <div class="add" v-if="!clonePerson">
        <div class="avatar">
          <img :src=imgURL alt="">
          <div class="title">个人信息</div>
        </div>
        <div class="click" @click="onPersonInfoShow('personDialogVisible','personInfoForm')">
          <i class="iconfont-ats icon-jiahao1"></i>添加
        </div>
      </div>
      <div class="show" v-else>
        <div class="avatar">
          <img :src=imgURL alt="">
          <div class="getInfo">
            <div class="name">
              <span>{{clonePerson.name}}</span>
              <i style="color: rgb(0, 179, 138)" v-if="clonePerson.sex == 1" class="iconfont-ats icon-jianlixiangqing-nanhui"></i>
              <i style="color: rgb(216,67,78)" v-else class="iconfont-ats icon-jianlixiangqing-nv"></i>

            </div>
            <div class="school">
              湖南文理学院 / 本科 . 统招 / 应届毕业生 / {{clonePerson.city}} / 21岁
            </div>
            <div class="other">
              <span style="margin-right:10px">
                <i class="iconfont-ats icon-jianlixiangqing-dianhua"></i>
                {{clonePerson.phone}}</span>
              <span>
                <i style="font-size:12px" class="iconfont-ats icon-jianlixiangqing-youxiang"></i>
                {{clonePerson.email}}</span>
            </div>
          </div>
        </div>
        <div class="edit" @click="onEditPersonInfo('personDialogVisible','personInfoForm')">
          <i class="iconfont-ats icon-jianlixiangqing-bianji"></i>
          编辑
        </div>
      </div>
    </div>

    <template v-for="(item,index) in allTitle">
      <div :class="[item.className,{'active':item.cloneData}]" :key="index">
        <div class="add" v-if="!item.cloneData">
          <div class="avatar">
            <div class="pic"></div>
            <div class="title">{{item.title}}</div>

          </div>
          <div class="click" @click="onAddInfoShow($event,item)">
            <i class="iconfont-ats icon-jiahao1"></i>添加
          </div>
        </div>
        <div class="show" v-else>
          <div class="avatar">
            <div class="pic"></div>
            <div class="title">{{item.title}}</div>
            <div class="edit" @click="item.editData(item.dialog,item.form)">
              <i class="iconfont-ats icon-jianlixiangqing-bianji"></i>
              编辑
            </div>
          </div>
          <div class="education1" v-if="item.className == 'education'">
            <div class="left">
              <i class="iconfont-ats icon-qiyeshezhi"></i>
            </div>
            <div class="right">
              <div class="header">
                <div class="school">{{cloneEducation.school}}</div>
                <div class="time">{{cloneEducation.startTime[0]}} - {{cloneEducation.startTime[1]}}</div>
              </div>
              <div class="foot">
                {{cloneEducation.education}} / {{cloneEducation.major}}
              </div>
            </div>

          </div>
          <div class="internship1" v-if="item.className == 'internship-experience'"></div>
          <div class="project1" v-if="item.className == 'project-experience'"></div>
          <div class="major1" v-if="item.className == 'major-skill'"></div>
          <div class="evaluate1" v-if="item.className == 'person-evaluate'"></div>

        </div>
      </div>
    </template>

    <!-- 弹框模块 -->
    <el-dialog title="个人信息" :visible.sync="personDialogVisible" width="40%" center>
      <el-form ref="personInfoForm" :rules="personInfoRules" :model="personInfoForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="personInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="personInfoForm.sex" label="1">男</el-radio>
          <el-radio v-model="personInfoForm.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="personInfoForm.city"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="personInfoForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="personInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="当前身份" prop="status">
          <el-radio v-model="personInfoForm.status" label="1">学生</el-radio>
          <el-radio v-model="personInfoForm.status" label="0">非学生</el-radio>
        </el-form-item>
        <el-form-item class="el-item-button">
          <el-button type="primary" @click="onPersonSave('personInfoForm','personDialogVisible','clonePerson',sendPersonInfo)">保存</el-button>
          <el-button @click="personDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>




    <el-dialog title="教育经历" :visible.sync="educationDialogVisible" width="40%" center>
      <el-form ref="educationInfoForm" :rules="educationInfoRules" :model="educationInfoForm" label-width="80px">
        <el-form-item label="学校" prop="school">
          <el-input v-model="educationInfoForm.school"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="educationInfoForm.major"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="startTime">
          <el-date-picker size="large" v-model="educationInfoForm.startTime" type="daterange" range-separator="至" start-placeholder="入学日期" end-placeholder="毕业日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="educationInfoForm.education" placeholder="请选择">
            <el-option v-for="(item,index) in educationOption" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="el-item-button">
          <el-button type="primary" @click="onPersonSave('educationInfoForm','educationDialogVisible','cloneEducation',sendEducationInfo)">保存</el-button>
          <el-button @click="educationDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="实习经历" :visible.sync="internshipDialogVisible" width="30%" center>
      <span>实习经历</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="internshipDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="internshipDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="项目经历" :visible.sync="projectDialogVisible" width="30%" center>
      <span>项目经历</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="projectDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="专业技能" :visible.sync="majorDialogVisible" width="30%" center>
      <span>专业技能</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="majorDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="majorDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="个人评价" :visible.sync="evaluateDialogVisible" width="30%" center>
      <span>个人评价</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="evaluateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="evaluateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import resumeData from '../resumeData.js'
  import deepClone from '@/toolsFunc/deepClone.js'
  export default {
    name: "",
    components: {},
    props: {},
    data() {
      return {
        imgURL: '',
        personDialogVisible: false,
        educationDialogVisible: false,
        internshipDialogVisible: false,
        projectDialogVisible: false,
        majorDialogVisible: false,
        evaluateDialogVisible: false,

        ...resumeData,

        clonePerson: null,
        cloneEducation: null,
        cloneInternship: null,
        cloneProject: null,
        cloneMajor: null,
        cloneEvaluate: null,
        isPersonResumeEdit: false,
        isEducationEdit: false,

      }
    },
    computed: {
      allTitle() {
        return [{
          className: 'education',
          title: '教育经历',
          dialog: 'educationDialogVisible',
          form: 'educationInfoForm',
          cloneData: this.cloneEducation,
          editData: this.onEditEducation
        }, {
          className: 'internship-experience',
          title: '实习经历',
          dialog: 'internshipDialogVisible',
          cloneData: this.cloneInternship,
          // editData:this.editEducation
        }, {
          className: 'project-experience',
          title: '项目经历',
          dialog: 'projectDialogVisible',
          cloneData: this.cloneProject,
          // editData:this.editEducation
        }, {
          className: 'major-skill',
          title: '专业技能',
          dialog: 'majorDialogVisible',
          cloneData: this.cloneMajor,
          // editData:this.editEducation
        }, {
          className: 'person-evaluate',
          title: '个人评价',
          dialog: 'evaluateDialogVisible',
          cloneData: this.cloneEvaluate,
          // editData:this.editEducation
        }]
      }
    },
    watch: {},
    created() {
      this.imgURL = window.sessionStorage.getItem('avatar');
      let isAdd = this.$cookie.getCookie('isAdd');

      //如果之前提交过数据，则再次刷新页面时从数据库中拿数据。
      this.getPersonResume()

    },
    mounted() {},
    beforeDestroy() {},
    methods: {
      getPersonResume() { //从数据库中找到对应的简历数据
        this.$ajax({
          method: 'post',
          url: 'getResumeData',
          data: {
            operator: this.$cookie.getCookie('username')
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            console.log(res)
            this.clonePerson = JSON.parse(res.data.personinfo);
            this.cloneEducation = JSON.parse(res.data.educationinfo)
          }

        })
      },
      onEditPersonInfo(dialog) { //点击编辑按钮打开编辑弹窗
        this.isPersonResumeEdit = true;
        this[dialog] = true;
        this.personInfoForm = this.clonePerson;
      },
      onEditEducation(dialog) {
        this.isEducationEdit = true;
        this[dialog] = true;
        this.educationInfoForm = this.cloneEducation;
      },
      onAddInfoShow(e, item) { //点击添加按钮打开添加弹窗
        this[item.dialog] = true
      },
      onPersonInfoShow(dialog) { //点击个人信息添加按钮打开添加弹窗

        this[dialog] = true
      },
      onPersonSave(formName, dialog, cloneObj, callback) { //保存个人添加信息的数据

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this[cloneObj] = deepClone(this[formName]); //深度克隆，数据备份
            console.log(this[cloneObj])
            callback(this[formName], formName)
            this[dialog] = false
          } else {
            return false;
          }

        });
      },

      resetForm(formName) { //重置信息表单
        this.$refs[formName].resetFields();
      },
      sendPersonInfo(data, formName) { //把个人信息数据提交给服务器
        this.$ajax({
          method: 'post',
          url: this.isPersonResumeEdit ? 'editPersonData' : 'addPersonData', //判断是编辑数据还是新增数据
          data: {
            ...data,
            operator: this.$cookie.getCookie('username')
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1500
            });
            this.$cookie.setCookie('isAdd', true) //设置cookie表明当前用户提交过了数据
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1500
            });
          }
          this.resetForm(formName)

        })
      },
      sendEducationInfo(data, formName) {
        this.$ajax({
          method: 'post',
          url: this.isEducationEdit?'eidtEducationInfo':'addEducationInfo', //判断是编辑数据还是新增数据
          data: {
            ...data,
            operator: this.$cookie.getCookie('username')
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            console.log(res)
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1500
            });
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1500
            });
          }
          this.resetForm(formName)

        })
      }
    },
  }
</script>

<style style="text/less"  lang="less">
  .wrapper-addResume {
    width: 100%;
    height: 100%;

    .person-info,
    .education,
    .internship-experience,
    .project-experience,
    .major-skill,
    .person-evaluate {
      height: 70px;
      border: 1px solid #b5b0b0;
      border-right: 0px;
      padding: 0 20px;
      margin-bottom: 20px;
      background: #fff;

      .add {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
          display: flex;
          align-items: center;

          .pic {
            width: 5px;
            height: 30px;
            background: rgb(0, 179, 138);
            margin-right: 10px;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
          }
        }

        .click {
          font-size: 14px;
          color: rgb(0, 179, 138);
          cursor: pointer
        }
      }


    }

    .education.active {
      background: rgb(250, 250, 250);
      height: fit-content;
      padding: 20px;

      .show {
        .avatar {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .pic {
            width: 5px;
            height: 30px;
            background: rgb(0, 179, 138);
            margin-right: 10px;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
          }

          .edit {
            position: absolute;
            right: 0px;
            font-size: 14px;
            color: rgb(0, 179, 138);
            cursor: pointer
          }
        }

        .education1 {
          display: flex;
          align-items: center;

          .left {
            i {
              font-size: 40px;
              color: aqua;
            }

            margin-right:10px;
          }

          .right {
            flex: 1;

            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;

              .school {
                font-size: 15px;
                font-weight: bold;
                color: rgb(51, 51, 51)
              }
            }
          }

        }
      }
    }

    .person-info {
      .add {
        .avatar {
          img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 50%;
            display: inline-block
          }
        }
      }
    }

    .person-info.readyInfo {
      height: 200px;
      background: rgb(250, 250, 250);

      .show {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
          height: 100%;
          display: flex;
          align-items: center;

          img {
            width: 100px;
            height: 100px;
            margin-right: 20px;
            border-radius: 50%;
            display: inline-block
          }

          .getInfo {
            .name {
              margin-bottom: 5px;

              span {
                font-size: 30px;
                font-weight: bold;
                margin-right: 10px;
              }

              i {
                font-size: 20px;

              }
            }

            .school {
              margin-bottom: 5px;
            }
          }
        }

        .edit {
          font-size: 16px;
          color: rgb(0, 179, 138);
          cursor: pointer;
        }

      }
    }


    .el-item-button .el-form-item__content {
      margin-left: 0px !important;
      text-align: center
    }

  }
</style>