import fse from 'fs-extra';
import path from 'path';
import sq3 from 'sqlite3';
import logger from './logger';
import { docDir } from './settings';
// 将数据存至系统用户目录，防止用户误删程序
// export const dbPath = path.join(docDir, 'data.sqlite3');
// fse.ensureFileSync(dbPath);
// const sqlite3 = sq3.verbose();
// const db = new sqlite3.Database(dbPath);

// 存在本项目里
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
   * 我的阵容 MY_LINEUP_LIST
   */
  db.run(`CREATE TABLE MY_LINEUP_LIST(
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
   * 武将库 CHARACTER_LIST
   */
  db.run(`CREATE TABLE CHARACTERS(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    characterId INTEGER NOT NULL,
    uniqueName VARCHAR(255) NOT NULL,
    quality VARCHAR(255) NOT NULL,
    contory VARCHAR(255) NOT NULL,
    cost INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    methodId INTEGER NOT NULL,
    methodName VARCHAR(255) NOT NULL,
    methodDesc VARCHAR(255) NOT NULL,
    methodId1 INTEGER NOT NULL,
    methodName1 VARCHAR(255) NOT NULL,
    methodDesc1 VARCHAR(255) NOT NULL
    )`, err => {
    logger(err);
  });
  /**
   * 战法库 SKILL_LIST
   */
  // db.run(`CREATE TABLE SKILL_LIST(
  //   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  //   name VARCHAR(255) NOT NULL,
  //   desc VARCHAR(255) NOT NULL,
  //   )`, err => {
  //   logger(err);
  // });
});

export default db;
