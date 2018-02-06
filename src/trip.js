const API_URL = "https://travel-backend-js.herokuapp.com/api";

class Trip {
  constructor(data) {
    this.id = data["id"];
    this.name = data["name"];
    this.description = data["description"];
    this.city = data["city"];
    this.state = data["state"];
    this.country = data["country"];
    this.user_id = data["user_id"];
    this.start_date = data["start_date"];
    this.end_date = data["end_date"];
    this.work = data["work"];
    this.leisure = data["leisure"];
    this.beach = data["beach"];
    this.family = data["family"];
    this.friends = data["friends"];
    this.user_id = data["user_id"];
    // this.people_involved = data["people_involved"]
    // this.photos = data["photos"]
    // this.events = data["events"]
    Trip.all.push(this);
  }

  static newTripDb(data) {
    return fetch(`${API_URL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: data["name"],
        description: data["description"],
        user_id: data["user_id"],
        city: data["city"],
        state: data["state"],
        country: data["country"],
        start_date: data["start_date"],
        end_date: data["end_date"],
        leisure: data["leisure"],
        work: data["work"],
        beach: data["beach"],
        family: data["family"],
        friends: data["friends"]
      })
    })
      .then(resp => resp.json())
      .then(trip => new Trip(trip));
    // .then(trip => {let newTrip = new Trip(trip)
    // });
  }

  static update(data) {
    return fetch(`${API_URL}/trips/${data["id"]}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: data["name"],
        description: data["description"],
        user_id: data["user_id"],
        city: data["city"],
        state: data["state"],
        country: data["country"],
        start_date: data["start_date"],
        end_date: data["end_date"],
        leisure: data["leisure"],
        work: data["work"],
        beach: data["beach"],
        family: data["family"],
        friends: data["friends"]
      })
    });
  }

  static formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
  }

  addHTML() {
    return `
      <div id=${this.id} class="trip">
      <h3>${this.name}</h3>
      <p>Location: ${this.city}, ${this.state}, ${this.country}</p>
      <p>Dates: ${Trip.formatDate(this.start_date)} - ${Trip.formatDate(
      this.end_date
    )}</p>
      </div>
      `;
  }

  updateShow() {
    document.getElementById("trip-name").innerText = this.name;
    document.getElementById("trip-dates").innerText = `${Trip.formatDate(
      this.start_date
    )}-${Trip.formatDate(this.end_date)}`;
    document.getElementById("trip-location").innerText = `${this.city}, ${
      this.state
    }, ${this.country}`;
    document.getElementById("edit").dataset.id = this.id;
    document.getElementById(
      "trip-map"
    ).src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAv6zJzukQ3qrRUXJ1fGrHwd-6jq0hb-u0&q=${
      this.city
    }+${this.state}+${this.country}`;
    document.getElementById("trip-description").innerText = `Description: ${
      this.description
    }`;

    let tags = [];
    if (this.work) tags.push("work");
    if (this.leisure) tags.push("leisure");
    if (this.beach) tags.push("beach");
    if (this.friends) tags.push("friends");
    if (this.family) tags.push("family");
    let tagText = tags.join(" - ");
    document.getElementById(
      "trip-tags"
    ).innerHTML = `Tags: <strong>${tagText}</strong>`;
    // document.getElementById("people-involved").innerText = `People involved: ${this.people_involved}`
    // document.getElementById("events").innerText = `Highlighted events: ${this.events}`
  }
}

Trip.all = [];

Trip.getById = function(id) {
  return Trip.all.find(x => x.id === id);
};

Trip.getByUser = function(user_id) {
  return Trip.all.filter(x => x.user_id === user_id);
};

Trip.getByWork = function(user_id) {
  return Trip.getByUser(user_id).filter(x => x.work);
};

Trip.getByLeisure = function(user_id) {
  return Trip.getByUser(user_id).filter(x => x.leisure);
};

Trip.getByBeach = function(user_id) {
  return Trip.getByUser(user_id).filter(x => x.beach);
};

Trip.getByFamily = function(user_id) {
  return Trip.getByUser(user_id).filter(x => x.family);
};

Trip.getByFriends = function(user_id) {
  return Trip.getByUser(user_id).filter(x => x.friends);
};

// Trip.locationCount(user_id) {
//   let locations = Trip.all.map(x => x.city)
//   let locSet = new Set(locations)
//   let locArr = Array.from(locSet)
//   let locMap = new Map
//   locArr.forEach(x => locMap.set(x,0))
// };
