class Location {

  constructor(data){
    this.id = data.id
    this.name = data.name
    Location.all.push(this)
  };

  static getLastId() {
    debugger
    return Location.all.splice(-1)[0].id
  }

};

Location.all = []

Location.findById = function(id) {
  return Location.all.find(x => x.id === id);
};

Location.nameById = function(id) {
  return Location.findById(id).name;
};

Location.nameForUrl = function(id) {
  return Location.nameById(id).replace(/,/g, '').split(" ").join("+");
};

Location.addToDb = function(name) {
  return fetch(`http://localhost:3000/api/locations`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({'name': name})
  })
  .then(res => res.json())
  .then(item => new Location(item))
  };

Location.getIdOrCreateByName = function(name) {
  if (Location.all.find(x => x.name === name)) {
    return Location.all.find(x => x.name === name);
  } else{
    Location.addToDb(name);
    debugger
    return Location.getLastId();
  }

// Location.getLastId = function(){
//   return Location.all.splice(-1)[0].id
// };

};
