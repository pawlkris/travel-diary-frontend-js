class User {
  constructor(data){
    this.name = data.name
    this.id = data.id
    User.all.push(this)
  }
};

User.all = [];

User.getById = function(id){
  return User.all.find(x => x.id === id);
};
