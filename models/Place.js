class Place {
  constructor(id, user, title, address, image, lat, lng) {
    this.id = id.toString();
    this.user = user;
    this.title = title;
    this.address = address;
    this.image = image;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Place;
