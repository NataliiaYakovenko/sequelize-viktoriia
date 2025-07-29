// sync db by model
const { sequelize } = require("./models");

sequelize.sync({force:true})
.then(()=>'Sync OR')
.catch((err)=>console.log(err))
