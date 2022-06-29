// transform_lonlat.js

import Map from 'ol/Map.js';
import { View } from 'ol';
import point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';

// 위경도를 openlayers에서 사용하는 값으로 변환
var pnt = new point([126,37]).transform('EPSG:4326', 'EPSG:3857'); 
// var pnt = new point([37.56050714479183, 126.99193024116613]).transform('WGS84', 'EPSG:3857'); 
var changePoints = pnt.getCoordinates(); // 1차원 배열 크기 2개의 값 [x, y]

var layer = new TileLayer({
  source: new OSM() // 지형정보가 존재하는 객체, Openlayers에서 제공하는 기본 레이어
});

var source = new VectorSource();

var vector = new VectorLayer({ // 벡터 레이어, 가장 기본적인 오픈레이어스의 화면구성 레이어 값
  source: source
});

var map = new Map({
  layers: [layer, vector], // 사용하는 레이어, 벡터 레이어를 추가해야 이벤트에 따른 원 그리기, 선 그리기 객체를 지도에 넣을 수 있다.
  target: 'map',
  view: new View({
    center: changePoints, // 중앙잡기
    zoom: 8 // 줌
  })
});






