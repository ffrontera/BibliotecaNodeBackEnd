const user = {
    tableName: "users",
  fields: {
    id: {
      type: "int(11)",
      primaryKey: true,
      notnull: true,
    },
    nombre: {
      type: "varchar(60)",
      notNull: false,
    },
    apellido: {
      type: "varchar(60)",
      notNull: false,
    },
    tel: {
      type: "varchar(15)",
      notNull: false,
    },
    mail: {
      type: "varchar(80)",
      notNull: true,
      unique: true,
    },
    Pssword: {
      type: "varchar(45)",
      notNull: true,
    },
    rol: {
        type: 'enum',
        notNull: true
    }
  }
};

module.exports = user;