const API_URL = "https://travel-backend-js.herokuapp.com/api";

class Adapter {
  static getTrips(user) {
    fetch(`${API_URL}/users/${user}`)
      .then(res => res.json())
      .then(json => this.createAndDisplayTrips(json));
  }

  static createAndDisplayTrips(json) {
    json.trips.forEach(t => new Trip(t));
    let tripList = document.querySelector("#trip-list");

    // ///// USE FOR SORTING BY DATE
    // function compare(a,b) {
    //   if (a.start_date < b.start_date)
    //     return -1;
    //   if (a.start_date > b.start_date)
    //     return 1;
    //   return 0;
    // }

    Trip.all.forEach(t => (tripList.innerHTML += t.addHTML()));
  }

  static getUsers() {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(json => this.createUsers(json));
  }

  static createUsers(json) {
    json.forEach(t => new User(t));
  }
  //   let userList = document.querySelector('#dropdown-user')
  //   User.all.forEach(t => userList.innerHTML += `
  //     <h3>${t.name}</h3>
  //     <p>Dates: ${t.start_date} - ${t.end_date}</p>
  //     `)
  // }
}
