const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class bitacoraDao extends DaoObject{
  constructor(db = null){
    console.log('bitacora db: ', db);
    super(db);
  }
  setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS bitacora (id INTEGER PRIMARY KEY AUTOINCREMENT, type INCOME, description TEXT, amount decimal, category TEXT, date TEXT);';
      this.conn.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from bitacora;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from bitacora where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({type, description, amount, category}) {
    const date = new Date().toISOString();
    const sqlstr = 'INSERT INTO bitacora (type, description, amount, category, date) values ( ?, ?, ?, ?, ?);';
    const sqlParamArr = [type, description, amount, avatar, estado, category, date];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({type, description, amount, category}){
    const sqlstr= 'UPDATE bitacora set type = ?, description = ?, amount =?, category = ?, estado = ? where id = ?;';
    const sqlParamArr = [type, description, amount, category];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM bitacora where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}
