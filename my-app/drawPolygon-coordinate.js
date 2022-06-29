import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VactorLayer} from 'ol/layer';
import {Circle, Fill, Icon, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import { Point, Polygon } from 'ol/geom';
import { Feature } from 'ol';


// 배경 지도
const raster = new TileLayer({
  source: new OSM(),
});

// 좌표(수신)
const place = [-11000000, 4600000];

// Point Feature 생성
const point = new Feature(
  new Point(place)
);

// 벡터 소스 : feature들의 집합. vector layer는 vector source를 통해 구성됨.
const source = new VectorSource({
  wrapX: false, // 같은 좌표에 한해 그리기 제한(같은 좌표 클릭 불가) 
  features : [point] // point feature
});

// 벡터 레이어(addInteraction()으로 그려진 feature 결과물).
const vector = new VectorLayer({
  source: source,
  style: new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 1,
      src: 'img/radios.png'
    }),
    stroke: new Stroke({
      width: 1,
      color:[20, 50, 100]
    }),
    fill: new Fill({
      color:[0, 200, 0, 0.5]
    }),
  }),
});


// 지도 그리기
const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

// 클릭으로 feature 그리기
let draw;
function addInteraction() {
  draw = new Draw({
    source: source,
    type: "Polygon",
    style: new Style({
      stroke: new Stroke({
        width: 3,
        color:[200, 20, 20]
      }),
      fill: new Fill({
        color:[0, 200, 0, 0.5]
      })
    })
  });
  map.addInteraction(draw); // addInteraction() : 함수명이 아닌 모듈임
}

addInteraction();


// 클릭한 곳 좌표 얻기(발신)
map.addEventListener('click', function(event){
  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if(feature){
    const coordinate = feature.getGeometry().getCoordinates();
    console.log(coordinate);
  }
}); 