export default {
            personInfoForm: {
                name: '',
                sex: '1',
                city: '',
                phone: '',
                email: '',
                status: '1'
              },
            personInfoRules: {
                name: [
                  { required: true, message: '请输入名字', trigger: 'blur' },
                  { min: 2, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                city: [
                  { required: true, message: '请输入城市', trigger: 'blur' },
                ],
                phone: [
                  { required: true, message: '请输入电话', trigger: 'blur' },
                  { type: 'number', message: '年龄必须为数字值' },
                ],
                email: [
                {
                  required: true,
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change']
                }]
              },

              educationInfoForm: {
                school:'',
                major:'',
                startTime:'',
                endTime:'',
                education:''
              },
             educationInfoRules: {
                school: [
                  { required: true, message: '请输入学校', trigger: 'blur' },
                ],
                major: [
                  { required: true, message: '请输入专业', trigger: 'blur' },
                ],
                startTime: [
                  { required: true, message: '请输入入学时间', trigger: 'blur' },
                ],
                education: [
                {
                  required: true,
                  message: '请输入学历',
                  trigger: 'blur',
                }]
              },
              educationOption:[
                '大专',
                '本科',
                '硕士',
                '博士',
                '其他'
              ],

              



  
}