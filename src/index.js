eventId = 0;
testTrip = {}

class App {

  static resetButtonColors() {
    Array.from(document.getElementsByClassName("trip")).forEach(x => x.style.backgroundColor = "#57BC90")
    Array.from(document.getElementsByClassName("nav-button")).forEach(x => x.style.backgroundColor = "#57BC90")
  };

  static hide(section) {
    section.style.display = "none";
  };

  static show(section) {
    section.style.display = "block";
  };

  static resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("end_date").value = "";
    document.getElementById("work").checked = false;
    document.getElementById("leisure").checked = false;
    document.getElementById("beach").checked = false;
    document.getElementById("family").checked = false;
    document.getElementById("friends").checked = false;

  };


};

document.addEventListener("DOMContentLoaded", function(event) {
  let user = 1;
  Adapter.getUsers();
  Adapter.getTrips(user);

  // click listeners elements that change what displays in main show area
  const tripList = document.getElementById("trip-list");
  const newBtn = document.getElementById("new-btn");
  const homeBtn = document.getElementById("home-btn");
  const editBtn = document.getElementById("edit");

  // display area options
  const tripDisplay = document.getElementById("trip-display");
  const formDisplay = document.getElementById("form-display");
  const homeDisplay = document.getElementById("home-display");

  const submitBtn = document.getElementById("submit");
  submitBtn.dataset.cmd = "";
  submitBtn.dataset.id = "";


  App.hide(formDisplay);
  App.hide(homeDisplay);
  App.hide(tripDisplay);
  App.resetButtonColors();

  tripList.addEventListener("click", function(event) {
    App.hide(formDisplay);
    App.hide(homeDisplay);
    App.show(tripDisplay);
    let eventId = parseInt(event.path.filter(x => x.className === "trip")[0].id);

    ///reset all trip cards to default color and change clicked to selected color
    App.resetButtonColors();
    document.getElementById(eventId).style.backgroundColor = "#0074D9";

    let showTrip = Trip.getById(eventId);
    showTrip.updateShow();
  });

  editBtn.addEventListener("click", function(event) {
    App.show(formDisplay);
    App.hide(homeDisplay);
    App.hide(tripDisplay);
    submitBtn.dataset.cmd = "PATCH";
    submitBtn.dataset.id = editBtn.dataset.id;


    let editTrip = Trip.getById(parseInt(editBtn.dataset.id));


    document.getElementById("name").value = editTrip.name;
    document.getElementById("description").value = editTrip.description;
    document.getElementById("city").value = editTrip.city;
    document.getElementById("state").value = editTrip.state;
    document.getElementById("country").value = editTrip.country;
    document.getElementById("start_date").value = editTrip.start_date;
    document.getElementById("end_date").value = editTrip.end_date;
    document.getElementById("work").checked = editTrip.work;
    document.getElementById("leisure").checked = editTrip.leisure;
    document.getElementById("beach").checked = editTrip.beach;
    document.getElementById("family").checked = editTrip.family;
    document.getElementById("friends").checked = editTrip.friends;



  });

  newBtn.addEventListener("click", function(event) {
    App.show(formDisplay);
    App.hide(homeDisplay);
    App.hide(tripDisplay);
    App.resetButtonColors();
    newBtn.style.backgroundColor = "#0074D9";
    App.resetForm();
    submitBtn.dataset.cmd = "POST"


  });

  submitBtn.addEventListener("click", function(event) {
    let data = {}
    data["id"] = submitBtn.dataset.id
    data["name"] = document.getElementById("name").value;
    data["description"] = document.getElementById("description").value;
    data["user_id"] = user;
    data["city"] = document.getElementById("city").value
    data["state"] = document.getElementById("state").value
    data["country"] = document.getElementById("country").value
    data["start_date"] = document.getElementById("start_date").value;
    data["end_date"] = document.getElementById("end_date").value;
    data["work"] = document.getElementById("work").checked;
    data["leisure"] = document.getElementById("leisure").checked;
    data["beach"] = document.getElementById("beach").checked;
    data["family"] = document.getElementById("family").checked;
    data["friends"] = document.getElementById("friends").checked;
    if (submitBtn.dataset.cmd === "POST") {
      Trip.newTripDb(data);
    } else {
      Trip.update(data);
    }

    //
    // App.hide(formDisplay);
    // App.hide(homeDisplay);
    // App.show(tripDisplay);
    //
    // debugger
    //
    // App.resetButtonColors();
    // document.getElementById(eventId).style.backgroundColor = "#0074D9";
    //
    // let showTrip = Trip.getById(eventId);
    // showTrip.updateShow();
    //
    // debugger

  });

  homeBtn.addEventListener("click", function(event) {
    App.hide(formDisplay);
    App.show(homeDisplay);
    App.hide(tripDisplay);
    App.resetButtonColors();
    homeBtn.style.backgroundColor = "#0074D9";

    document.getElementById("user-greeting").innerText = `Hello ${User.getById(user).name}!`;
    let userTotal = Trip.getByUser(user).length;
    document.getElementById("total-trips").innerText = `You've been on ${userTotal} trips.`;
    document.getElementById("work-trips").innerText = Trip.getByWork(user).length
    document.getElementById("leisure-trips").innerText = Trip.getByLeisure(user).length
    document.getElementById("beach-trips").innerText = Trip.getByBeach(user).length
    document.getElementById("family-trips").innerText = Trip.getByFamily(user).length
    document.getElementById("friends-trips").innerText = Trip.getByFriends(user).length

  });



});
