// polygon_practice.js

// 모듈 추가
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {LineString, Point, Polygon} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {TileJSON, OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Icon, Stroke, Style} from 'ol/style.js';

// 벡터 레이어는 벡터 소스를 통해 구성됨. 벡터 소스는 Feature들의 집합. Feature < Source < Layer
// Feature 요소 생성
var pointFeature = new Feature(new Point([14248656.389982047, 4331624.063626864]));

var lineFeature = new Feature(new LineString([[-1e7, 1e6], [-1e6, 3e6]]));

var polygonFeature = new Feature(
  new Polygon([[[-3e6, -1e6], [-3e6, 1e6], [-1e6, 1e6], [-1e6, -1e6], [-3e6, -1e6]]])
);

// 이 3개의 Feature로 구성된 소스 생성
var vectorsource = new VectorSource({
  features: [pointFeature, lineFeature, polygonFeature]
});

// 데이터 소스가 정의되었으므로 시각화를 위한 레이어 객체 생성
var vectorlayer = new VectorLayer ({
  source: vectorsource,
  style: new Style({
    image: new Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.95,
      src: './img/favorites_green.png'
    })), // pointFeature
    stroke: new Stroke({
      width:2,
      color: [255, 255, 0, 1]
    }), // linestring, polygon
    fill: new Fill ({
      color: [0, 255, 255, 0.6]
    }) // polygon
  })
});

var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorlayer
  ],
  view : new View({
    center:[14248656.389982047, 4331624.063626864],
    zoom: 5
  })
});




