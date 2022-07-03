const path = require('path');
const dotenv = require('dotenv');
const UsuarioDao = require('./UsuarioDao');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const Connection = require('../Connection');
const { hasUncaughtExceptionCaptureCallback } = require('process');

describe("Testing Usuario Crud in MongoDB", () => {
  const env = process.env;
  let db, UsuDao, Cat, id;
  beforeAll(async () => {
    jest.resetModules();
    process.env = {
      ...env,
      MONGODB_URI: "mongodb+srv://root:root@mycluster.st5juob.mongodb.net/?retryWrites=true&w=majority",
      MONGODB_DB: "sw202202",
      MONGODB_SETUP: 1,
    };
    db = await Connection.getDB();
    UsuDao = new UsuarioDao(db,'usuario');
    await UsuDao.init();
    return true;
  });
  afterAll(async()=>{
    process.env = env;
    return true;
  });
  test('Get All Records', async ()=>{
    const result = await UsuDao.getAll();
    console.log(result);
  });
  test('Insert One Record', async ()=>{
    const result = await UsuDao.insertOne({ email:'Test@gmail.com', nombre:'prueba', avatar: 'pruebaa', password:'contras', estado:'ACT'});
    console.log(result);
    id = result.insertedId;
    expect(result.acknowledged).toBe(true);
  });
  test('FindById Record', async ()=>{
    const record = await UsuDao.getById({codigo:id.toString()});
    console.log(record);
    expect(record._id).toStrictEqual(id);
  });
  test('Update One Record', async ()=>{
    const updateResult = await UsuDao.updateOne({codigo:id.toString(),  email:'Testqwqwq@gmail.com', nombre:'prqwwueba', avatar: 'pruebaaqwqw', password:'contrasqww', estado:'ACTivo'});
    console.log(updateResult);
    expect(updateResult.acknowledged).toBe(true);
  });
  test('Delete One Record', async () => {
    const deleteResult = await UsuDao.deleteOne({ codigo: id.toString() });
    console.log(deleteResult);
    expect(deleteResult.acknowledged).toBe(true);
  });
});
