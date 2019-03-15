import fse from 'fs-extra';
import path from 'path';
import sq3 from 'sqlite3';
import logger from './logger';
import { docDir } from './settings';
// 将数据存至系统用户目录，防止用户误删程序
export const dbPath = path.join(docDir, 'data.sqlite3');
fse.ensureFileSync(dbPath);

const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  /**
   * 物品表 GOODS
   * name 品名
   * player1
   * setting1
   * player2
   * setting2
   * player3
   * setting3
   * remark
   * create_time 创建时间
   * update_time 修改时间
   */
  db.run(`CREATE TABLE GOODS(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    player1 VARCHAR(255) NOT NULL,
    setting1 VARCHAR(255) NOT NULL,
    player2 VARCHAR(255) NOT NULL,
    setting2 VARCHAR(255) NOT NULL,
    player3 VARCHAR(255) NOT NULL,
    setting3 VARCHAR(255) NOT NULL,
    remark VARCHAR(255) NOT NULL,
    create_time INTEGER NOT NULL,
    update_time INTEGER NOT NULL
    )`, err => {
    logger(err);
  });

  /**
   * 进出明细表 GOODS_DETAIL_LIST
   * goods_id 物品id
   * count 计数（+加 -减）
   * actual_buy_unit_price 实际进价
   * actual_sell_unit_price 实际售价
   * amount 实际金额
   * remark 备注
   * latest 是否某物品最新一条记录（不是最新操作无法删除）（1是 0不是）
   * create_time 创建时间
   * update_time 修改时间
   */
  db.run(`CREATE TABLE GOODS_DETAIL_LIST(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    goods_id INTEGER NOT NULL, 
    count DECIMAL(15,3) NOT NULL,
    actual_sell_unit_price DECIMAL(15,2) NOT NULL,
    actual_buy_unit_price DECIMAL(15,2) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    remark VARCHAR(255) NOT NULL,
    latest INTEGER NOT NULL,
    create_time INTEGER NOT NULL,
    update_time INTEGER NOT NULL,
    FOREIGN KEY (goods_id) REFERENCES GOODS(id)
    )`, err => {
    logger(err);
  });
});

export default db;
