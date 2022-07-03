const DaoObject = require('../../dao/sqlite/DaoObject');
module.exports = class Bitacora {
  bitacoraDao = null;


  constructor ( bitacoraDao = null) {
    if (!(bitacoraDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.bitacoraDao = bitacoraDao;
  }
  async init(){
    await this.bitacoraDao.init();
    this.bitacoraDao.setup();
  }
  async getVersion () {
    return {
      entity: 'bitacoras',
      version: '1.0.0',
      description: 'CRUD de bitacora'
    };
  }

  async addbitacora ({
    type,
    description,
    date,
    amount,
    category
  }) {
    const result =  await this.bitacoraDao.insertOne(
      {
        type,
    description,
    date,
    amount,
    category
      }
    );
    return {
        type,
        description,
        date,
        amount,
        category,
        id: result.lastID
    };
  };

  async getbitacora () {
    return this.bitacoraDao.getAll();
  }

  async getbitacoraById ({ codigo }) {
    return this.bitacoraDao.getById({codigo});
  }

  async updatebitacora ({ type,
    description,
    date,
    amount,
    category,
    codigo }) {
    const result = await this.bitacoraDao.updateOne({  
    type,
    description,
    date,
    amount,
    category,codigo });
    return {
      id: codigo,
      type,
    description,
    date,
    amount,
    category,
      modified: result.changes
    }
  }

  async deletebitacora({ codigo }) {
    const bitacoraToDelete = await this.bitacoraDao.getById({codigo});
    const result = await this.bitacoraDao.deleteOne({ codigo });
    return {
      ...bitacoraToDelete,
      deleted: result.changes
    };
  }
}