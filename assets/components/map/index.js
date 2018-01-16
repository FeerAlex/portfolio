import './map.scss';
import template from './map.pug';

/* COMPONENTS */
import Contacts from '../../components/contacts';
import './map-marker.png';

let contacts = new Contacts();

export default class Map {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'map';
    this.elem.innerHTML = template(opt);

    this.containerContact = this.elem.querySelector('.map__contacts');
    this.containerContact.appendChild(contacts.elem);

    window.initMap = this.initMap;
  }

  initMap() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 56.137580, lng: 47.303716},
      zoom: 14,
      disableDefaultUI: true,
      styles: [
        {
          'featureType': 'administrative',
          'elementType': 'labels.text.fill',
          'stylers': [{'color': '#444444'}],
        },
        {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [{'color': '#f2f2f2'}],
        },
        {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'road',
          'elementType': 'all',
          'stylers': [{'saturation': -100},{'lightness': 45}],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'all',
          'stylers': [{'visibility': 'simplified'}],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#d6d6d6'}],
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.icon',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#e6e6e6'}],
        },
        {
          'featureType': 'transit',
          'elementType': 'all',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': [{'color': '#86a77a'},{'visibility': 'on'}],
        },
      ],
    });
    
    this.marker = new window.google.maps.Marker({
      position: {lat: 56.138432, lng: 47.272868},
      map: this.map,
      title: 'Чебоксары, ул. Калинина',
      icon: '../images/map-marker.png',
    });
  }
}