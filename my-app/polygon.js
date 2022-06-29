// polygon.js

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {LineString, Point, Polygon} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {TileJSON, OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Icon, Stroke, Style} from 'ol/style.js';

// Vector Layer는 Vector Source를 통해 구성됨. Vector Source는 Feature들의 집합이기도 함.

// Point Feature, Line Feature, Polygon Feature 생성하기
var pointFeature = new Feature(new Point([0, 0]));

var lineFeature = new Feature(new LineString([[-1e7, 1e6], [-1e6, 3e6]]));

var polygonFeature = new Feature(
  new Polygon([[[-3e5, -1e5], [-3e5, 3e5], [-2e5, 4e5], [-3e5, -9e5], [-5e5, -5e5]]])
);

// 위 3개의 Feature로 구성된 Data Source는 아래처럼 생성됨.
var vectorsource = new VectorSource ({
  features: [pointFeature, lineFeature, polygonFeature]
});


// Data Source가 정의되었음으로 이제 시각화를 위한 Layer객체를 아래처럼 생성함.
var vectorlayer = new VectorLayer ({
  source: vectorsource,
  style: new Style({
    image: new Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.95,
      src: 'img/favorites_green.png'
    })),
    stroke: new Stroke({
      width:3,
      color:[255, 0, 0, 0.5]
    }),
    fill: new Fill({
      color:[0, 0, 255, 0.6]
    })
  })
});

// 레이어는 시각화를 위한 개념이 가장 중요함으로 시각화를 위한 스타일을 상세히 지정하고 있음을 알 수 있음.
// 이제 앞서 생성한 레이어를 구성하여 지도 객체를 생성하면 끝.
var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM (),
    }),
    vectorlayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 5,
    // maxZoom: 18,
    // constrainOnlyCenter: true
  })
});

// var map = new ol.layer.Tile({
//   source: new ol.source.XYZ({
//     url : "http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png"
//   })
// })