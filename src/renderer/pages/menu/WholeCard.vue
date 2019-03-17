<template>
    <div>
        <Form :label-width="90" inline @keydown.native.enter="getDataList('search')">
            <FormItem label="武将">
                <Input v-model="search.uniqueName" style="width: 203px" clearable></Input>
            </FormItem>
            <FormItem label="战法">
                <Input v-model="search.skill" style="width: 203px" clearable></Input>
            </FormItem>
            <FormItem label="稀有度">
                <Input v-model="search.quality" style="width: 203px" clearable></Input>
            </FormItem>
            <FormItem label="国家">
                <Input v-model="search.contory" style="width: 203px" clearable></Input>
            </FormItem>
            <FormItem label="Cost">
                <Input v-model="search.cost" style="width: 203px" clearable></Input>
            </FormItem>
            <FormItem label="兵种">
                <Input v-model="search.type" style="width: 203px" clearable></Input>
            </FormItem>
            <!-- <FormItem :label="item.label" v-for="(item,index) in searchInputNumberType" :key="index">
                <InputNumber v-model="search[item.min]" :min="0"
                             :max="search[item.max] ? search[item.max] :Infinity"></InputNumber>
                —
                <InputNumber v-model="search[item.max]" :min="search[item.min] ? search[item.min] :0"></InputNumber>
                <Button type="text" shape="circle" icon="close-round" size="small" title="清空该项输入"
                        @click="clearInputNumber(item.max,item.min)"></Button>
            </FormItem> -->
            <FormItem :label-width="10">
                <Button type="primary" icon="ios-search" @click="getDataList('search')" title="搜索"></Button>
                <!-- <Button style="margin-left:5px;" type="primary" icon="plus-round" @click="add" title="创建"></Button> -->
                <Button style="margin-left:5px;" type="primary" icon="ios-upload-outline" @click="downloadExcel"
                        title="导出" :loading="downloadExcelLoading"></Button>
            </FormItem>
        </Form>
        <Table border stripe :columns="dataList_table_column" :data="dataList" :loading="tableLoading"></Table>
        <Page :total="dataListTotalCount" :current="searchParams.pageIndex"
              :page-size="searchParams.pageSize" @on-change="getDataList" @on-page-size-change="getDataListOnPageChange"
              :page-size-opts="[10,20,30,40,50]" show-total
              show-sizer show-elevator transfer></Page>
    </div>
</template>
<script>
import util from '../../utils/util';
import download from '../../utils/download';
import axios from 'axios';

export default {
  data() {
    return {
      // loading
      downloadExcelLoading: false,
      modalBtnLoading: false,
      tableLoading: false,
      // ----常用
      search: {
        uniqueName: '',
        skill: '',
        quality: '',
        cost: '',
        contory: '',
        type: '',
        pageIndex: 1,
        pageSize: 10,
      },
      searchParams: {},
      dataList: [],
      dataListTotalCount: 0,
      dataList_table_column: [
        {
          title: '武将',
          key: 'uniqueName',
          align: 'center',
          minWidth: 200,
        },
        {
          title: '稀有度',
          key: 'quality',
          align: 'center',
          minWidth: 80,
        },
        {
          title: '国家',
          key: 'contory',
          align: 'center',
          minWidth: 50,
        },
        {
          title: 'Cost',
          key: 'cost',
          align: 'center',
          minWidth: 50,
        },
        {
          title: '兵种',
          key: 'type',
          align: 'center',
          minWidth: 50,
        },
        {
          title: '战法',
          key: 'methodName',
          align: 'center',
          minWidth: 100,
        },
        // {
        //   title: '战法介绍',
        //   key: 'methodDesc',
        //   align: 'center',
        //   minWidth: 200,
        // },
        {
          title: '可拆战法',
          key: 'methodName1',
          align: 'center',
          minWidth: 100,
        },
        // {
        //   title: '可拆战法介绍',
        //   key: 'methodDesc1',
        //   align: 'center',
        //   minWidth: 200,
        // },
      ],
      modalShow: false,
      modalParams: {
        name: '',
        player1: '',
        setting1: '',
        player2: '',
        setting2: '',
        player3: '',
        setting3: '',
        remark: '',
      },
      delModalShow: false,
      ruleValidate: {
        name: [
          { required: true, message: '请输入 品名' },
          { max: 100, message: '品名 长度 100 以内' },
        ],
        // standard_buy_unit_price: [
        //   { pattern: util.getRegexp('money'), message: '标准进价 只能为 小数位不超过2位的正整数' },
        // ],
        // standard_sell_unit_price: [
        //   { pattern: util.getRegexp('money'), message: '标准售价 只能为 小数位不超过2位的正整数' },
        // ],
        remark: [
          { max: 200, message: '备注 长度 200 以内' },
        ],
      },
      downloadExcelSQL: '',
    };
  },
  computed: {
    modalTitle() {
      return this.modalParams.id ? '修改' : '创建';
    },
  },
  methods: {
    // 清空该项输入
    clearInputNumber(max, min) {
      this.search[ max ] = null;
      this.search[ min ] = null;
    },
    // 搜索
    getDataList(method) {
      this.tableLoading = true;
      if (method === 'search') {
        this.searchParams = JSON.parse(JSON.stringify(this.search));
      }
      if (typeof method === 'number') {
        this.searchParams.pageIndex = method;
      }
      const searchParams = this.searchParams;
      const whereSQL = `WHERE uniqueName LIKE '%${searchParams.name}%' AND methodName LIKE '%${searchParams.skill}%' OR methodName1 LIKE '%${searchParams.skill}%' AND quality LIKE '%${searchParams.quality}%' AND contory LIKE '%${searchParams.contory}%' AND type LIKE '%${searchParams.type}%' AND cost LIKE '%${searchParams.cost}%' `;
      const pageSQL = `LIMIT ${searchParams.pageSize} OFFSET ${(searchParams.pageIndex - 1) * searchParams.pageSize} `;
      const orderSQL = 'ORDER BY id ASC ';
      // 导出sql
      this.downloadExcelSQL = 'SELECT * from CHARACTERS ' + whereSQL + orderSQL;
      const rowSQL = this.downloadExcelSQL + pageSQL;
      const countSQL = 'SELECT COUNT(id) AS totalCount from CHARACTERS ' + whereSQL;
      this.$logger(rowSQL);
      this.$db.all(rowSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          if (!res.length && searchParams.pageIndex !== 1) {
            // 该页没数据，又不是第一页，就往上一页翻
            this.getDataList(searchParams.pageIndex - 1);
          } else {
            this.dataList = res;
          }
        }
        this.tableLoading = false;
      });
      this.$logger(countSQL);
      this.$db.get(countSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.dataListTotalCount = res.totalCount;
        }
      });
    },
    // pageSize改变
    getDataListOnPageChange(pageSize) {
      this.search.pageSize = pageSize;
      this.getDataList('search');
    },
    // 新增
    add() {
      this.$refs.formVali.resetFields();
      this.modalParams = this.$options.data().modalParams;
      this.modalShow = true;
    },
    // 新增确认
    addConfirm() {
      this.$refs.formVali.validate(valid => {
        if (valid) {
          this.modalBtnLoading = true;
          const modalParams = this.modalParams;
          // 检测品名是否存在
          const SQL = `SELECT COUNT(id) AS totalCount from MY_LINEUP_LIST WHERE name = '${modalParams.name}'`;
          this.$db.get(SQL, (err, res) => {
            if (err) {
              this.$logger(err);
              this.$Notice.error({
                title: '搜索失败',
                desc: err,
              });
            } else {
              if (res.totalCount) {
                this.$Message.warning({
                  content: '品名已存在',
                });
                this.modalBtnLoading = false;
              } else {
                const SQL = `INSERT INTO MY_LINEUP_LIST (name,player1,setting1,player2,setting2,player3,setting3,remark,create_time,update_time)
          VALUES ('${modalParams.player1} ${modalParams.player2} ${modalParams.player3}','${modalParams.player1}','${modalParams.setting1}','${modalParams.player2}','${modalParams.setting2}','${modalParams.player3}','${modalParams.setting3}','${modalParams.remark}','${Date.now()}','')`;
                this.$logger(SQL);
                this.$db.run(SQL, err => {
                  if (err) {
                    this.$logger(err);
                    this.$Notice.error({
                      title: '新增失败',
                      desc: err,
                    });
                  } else {
                    this.modalShow = false;
                    this.$Message.success({
                      content: '新增成功',
                    });
                    this.getDataList(1);
                  }
                  this.modalBtnLoading = false;
                });
              }
            }
          });
        }
      });
    },
    // 编辑
    edit(row) {
      this.$refs.formVali.resetFields();
      this.modalParams = {
        id: row.id,
        name: row.name,
        player1: row.player1,
        setting1: row.setting1,
        player2: row.player2,
        setting2: row.setting2,
        player3: row.player3,
        setting3: row.setting3,
        remark: row.remark,
      };
      this.modalShow = true;
    },
    // 编辑确认
    editConfirm() {
      this.$refs.formVali.validate(valid => {
        if (valid) {
          this.modalBtnLoading = true;
          const modalParams = this.modalParams;
          // 检测品名是否存在
          const SQL = `SELECT id from MY_LINEUP_LIST WHERE name = '${modalParams.name}'`;
          this.$db.get(SQL, (err, res) => {
            if (err) {
              this.$logger(err);
              this.$Notice.error({
                title: '搜索失败',
                desc: err,
              });
            } else {
              if (res && res.id !== modalParams.id) {
                this.$Message.warning({
                  content: '品名已存在',
                });
                this.modalBtnLoading = false;
              } else {
                const SQL = `UPDATE MY_LINEUP_LIST SET
          name='${modalParams.player1} ${modalParams.player2} ${modalParams.player3}'
          ,player1='${modalParams.player1}'
          ,setting1='${modalParams.setting1}'
          ,player2='${modalParams.player2}'
          ,setting2='${modalParams.setting2}'
          ,player3='${modalParams.player3}'
          ,setting3='${modalParams.setting3}'
          ,remark='${modalParams.remark}'
          ,update_time='${Date.now()}'
          WHERE id = ${modalParams.id}`;
                this.$logger(SQL);
                this.$db.run(SQL, err => {
                  if (err) {
                    this.$logger(err);
                    this.$Notice.error({
                      title: '编辑失败',
                      desc: err,
                    });
                  } else {
                    this.modalShow = false;
                    this.$Message.success({
                      content: '编辑成功',
                    });
                    this.getDataList();
                  }
                  this.modalBtnLoading = false;
                });
              }
            }
          });
        }
      });
    },
    enterConfirm(id) {
      if (id) {
        this.editConfirm();
      } else {
        this.addConfirm();
      }
    },
    // 删除
    del(row) {
      this.modalParams = {
        id: row.id,
        name: row.name,
        input: '',
      };
      this.delModalShow = true;
    },
    //  删除确认
    delConfrim() {
      this.$db.serialize(() => {
        this.$db.run('BEGIN');
        // // 删除所有明细
        // const deleteDetailSQL = `DELETE FROM GOODS_DETAIL_LIST WHERE goods_id = ${this.modalParams.id}`;
        // this.$logger(deleteDetailSQL);
        // this.$db.run(deleteDetailSQL, err => {
        //   if (err) {
        //     this.$logger(err);
        //     this.$db.run('ROLLBACK');
        //     this.$Notice.error({
        //       title: '删除失败',
        //       desc: err,
        //     });
        //   }
        // });
        const deleteSQL = `DELETE FROM MY_LINEUP_LIST WHERE id = ${this.modalParams.id}`;
        this.$logger(deleteSQL);
        this.$db.run(deleteSQL, err => {
          if (err) {
            this.$logger(err);
            this.$db.run('ROLLBACK');
            this.$Notice.error({
              title: '删除失败',
              desc: err,
            });
          }
        });
        this.$db.run('COMMIT');
        this.delModalShow = false;
        this.$Message.success({
          content: '删除成功',
        });
        this.getDataList();
      });
    },
    // 导出表格
    downloadExcel() {
      this.downloadExcelLoading = true;
      this.$db.all(this.downloadExcelSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          const data = [
            [ '队伍', '前锋', '战法', '中军', '战法', '大营', '战法', '备注', '创建时间', '修改时间' ],
          ];
          for (const item of res) {
            data.push([ item.name, item.player1, item.setting1, item.player2, item.setting2, item.player3, item.setting3, item.remark, util.dateFilter(item.create_time), util.dateFilter(item.update_time) ]);
          }
          const name = '物品管理';
          download.excel(name, [
            {
              name,
              data,
            },
          ]).then(arg => {
            this.downloadExcelLoading = false;
            if (arg === 'completed') {
              this.$Message.success({
                content: '导出成功',
              });
            } else {
              this.$Message.warning({
                content: '导出取消',
              });
            }
          }).catch(err => {
            this.downloadExcelLoading = false;
            this.$Notice.error({
              title: '导出失败',
              desc: err,
            });
          });
        }
      });
    },
  },
  created() {
    this.getDataList('search');
  },
  mounted() {
    axios.get('../../../../static/json/player.json')
      .then(res => res.data)
      .then(res => {
        res.forEach(item => {
          const cid = item.id;
          const uniqueName = util.UnicodeToAscii(item.uniqueName);
          const quality = item.quality;
          const contory = util.UnicodeToAscii(item.contory);
          const cost = item.cost;
          const type = util.UnicodeToAscii(item.type);
          const mid = item.methodId;
          const methodName = util.UnicodeToAscii(item.methodName);
          const methodDesc = util.UnicodeToAscii(item.methodDesc);
          const mid1 = item.methodId1 ? item.methodId1 : '999999';
          const methodName1 = item.methodName1 ? util.UnicodeToAscii(item.methodName1) : '';
          const methodDesc1 = item.methodDesc1 ? util.UnicodeToAscii(item.methodDesc1) : '';

          const SQL1 = `SELECT COUNT(id) AS totalCount from CHARACTERS WHERE characterId = '${cid}'`;
          this.$db.get(SQL1, (err, res) => {
            if (err) {
              this.$logger(err);
              this.$Notice.error({
                title: '搜索失败',
                desc: err,
              });
            } else {
              if (!res.totalCount) {
                const SQL = `INSERT INTO CHARACTERS (characterId,uniqueName,quality,contory,cost,type,methodId,methodName,methodDesc,methodId1,methodName1,methodDesc1) VALUES ('${cid}','${uniqueName}','${quality}','${contory}','${cost}','${type}','${mid}','${methodName}','${methodDesc}','${mid1}','${methodName1}','${methodDesc1}')`;
                this.$logger(SQL);
                this.$db.run(SQL, err => {
                  if (err) {
                    this.$logger(err);
                    this.$Notice.error({
                      title: '新增失败',
                      desc: err,
                    });
                  }
                });
              }
            }
            this.getDataList(1);
          });
        });
      });
  },
};

</script>
<style lang="less">
</style>
