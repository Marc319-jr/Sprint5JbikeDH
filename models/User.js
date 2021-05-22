const fs = require('fs');
const User = {
    fileName: './data/usuarios.JSON',
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, {encoding: 'utf-8'}))
    },
    findAll: function()
    {
      return this.getData();
    },

    generateID: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id +1
        }
        return 1
    },

    create: function(userData){
      let allUsers = this.findAll(); //en este paso aramamos el array de usuarios
      let newUser = {
          id: this.generateID(),
          ...userData //Una manere de agregar todo userData sin escribir campo por campo
      }  
      allUsers.push(newUser);
      fs.writeFileSync(this.fileName , JSON.stringify(allUsers,null ,' '))
      return newUser;
    },
    findByField: function(field , text){
        let allusers = this.findAll();
        let userFound = allusers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}


module.exports = User;