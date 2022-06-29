// marker.js

// 1. openlayers 객체 받기
gisMap.openLayerMap()

// 2. 지도 로딩하기
// gisMap.init(targetId, lat, log)
// targetId : 지도를 그릴 대상, id 값이어야 함.
// lat : 위도, log : 경도
gisMap.init(map, 14248656.389982047, 4331624.063626864)

// 3. 지도에 마커 표시하기
// 반환되는 문자열은 해당 마커의 고유 아이디 값
// 옵션 샘플
var option = {
  font_size : 13, // 글씨 크기
  font_color : 'rgba(255, 202, 202, 0.36)', // 글씨 색상
  font_background_color : 'rgba(255, 202, 202, 0.36)', // 글씨 뒷배경 색상
  font_background_stroke : 'rgba(255, 202, 202, 0.36' // 테두리 굵기
}
// gisMap.addMark(lat, log, text, option)
// text : 표시할 문구
gisMap.addMark(14248656.389982047, 4331624.063626864, '가나다라', option)

// 4. 지도에 html태그 형태의 마커 표시
// 기본으로 클릭 이벤트 부여
// 일반 html 엘리먼트와 동일하므로 원하는 기능을 확장하여 사용
// 고유의 아이디는 생기지 않음.
gisMap.addHtmlMark(14248656.389982047, 4331624.063626864, '대한민국')

// 5. 원하는 지점으로 이동
// gisMap.moveCenter(lat, log, duration)
// duration : 이동 속도. 밀리세컨드 단위(1000 = 1초)
gisMap.moveCenter(0, 0, 1500)

// 6. 확장된 마커 제거
// 아이디는 마커를 생성한 뒤에 생기는 고유의 텍스트 값
// html로 마커를 만든 경우에는 아이디가 없다.
// html로 만든 마커는 제거되지 않는다.
gisMap.removeWithTd(_id)

// 7. 가장 마지막에 확장된 마커를 제거
gisMap.removePop()

// 8. 마커에 클릭 이벤트를 부여한 뒤 정보를 제공받는다.
gisMap.clickEventer(function (arg) {
  console.log(arg, arg.get('_id'))
})

// 9. 삭제 가능한 아이디 목록을 받음 : Array<string>
// html로 만든 마커는 포함되지 않음.
gisMap.getIdList()