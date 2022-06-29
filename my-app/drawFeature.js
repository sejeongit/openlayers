import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Stroke, Style } from 'ol/style';


// 배경 지도
const raster = new TileLayer({
  source: new OSM(),
});

// 벡터 소스
const source = new VectorSource({
  wrapX: false // 같은 좌표에 한해 그리기 제한(같은 좌표 클릭 불가)
});

// 벡터 레이어(addInteraction()로 그려진 feature 결과물). 벡터 레이어는 벡터 소스를 통해 구성됨. 벡터 소스는 feature들의 집합이기도 함.
const vector = new VectorLayer({
  source: source,
  style: new Style({ // 그려진 feature의 스타일
    image: new Circle({
      radius:9,
      stroke: new Stroke({
        width: 1,
        color:[20, 50, 100]
        }),
      fill: new Fill({
       color:[0, 200, 0, 0.5],
      }),
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
    zoom: 4,
  }),
});

const typeSelect = document.getElementById('type');

// 클릭으로 feature 그리기
let draw; // grobal so we can remove it later
function addInteraction () {
  const value = typeSelect.value;
  if(value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value,
      style: new Style({ // 그릴 때의 스타일
        stroke: new Stroke({
          width: 3,
          color:[200, 20, 20]
        }),
        fill: new Fill({
          color:[0, 200, 0, 0.5]
        })
      })
    });
    map.addInteraction(draw);
  }
}

// 클릭한 곳 좌표 얻기
map.addEventListener('click', function(event){
  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if(feature){
    const coordinate = feature.getGeometry().getCoordinates();
    console.log(coordinate);
  }
})


// Handle change event.
typeSelect.onchange = function() { // type을 select하면
  map.removeInteraction(draw); // 그린 내용 지우고
  addInteraction(); // addInteraction() 함수를 직접 호출해 바로 도형을 그릴 수 있게 함.
};

document.getElementById('undo').addEventListener('click', function(){
  draw.removeLastPoint(); // 그린 마지막 내역 지우기
});

addInteraction(); // addInteraction() 함수를 직접 호출해 바로 도형을 그릴 수 있게 함.