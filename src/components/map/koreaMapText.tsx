import React from 'react';
import {G, Text} from 'react-native-svg';
import {IAppShowRegionName} from 'src/types/app';
import {IKoreaMapDataObject} from 'src/types/koreaMap';

interface KoreaMapText {
  data: IKoreaMapDataObject;
  show: IAppShowRegionName;
}

const KoreaMapText = ({data, show}: KoreaMapText) => {
  return (
    <React.Fragment>
      {show === 'show' && (
        <G>
          <Text
            transform="matrix(1 0 0 1 394.8042 148.499)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            철원
          </Text>

          <Text
            transform="matrix(1 0 0 1 441.3252 163.6094)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            화천
          </Text>

          <Text
            transform="matrix(1 0 0 1 489.7334 157.8848)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            양구
          </Text>

          <Text
            transform="matrix(1 0 0 1 548.3799 123.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고성
          </Text>

          <Text
            transform="matrix(1 0 0 1 531.2451 180.4355)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            인제
          </Text>

          <Text
            transform="matrix(1 0 0 1 571.5947 157.8848)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            속초
          </Text>

          <Text
            transform="matrix(1 0 0 1 583.4053 191.5234)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            양양
          </Text>

          <Text
            transform="matrix(1 0 0 1 449.1045 212.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            춘천
          </Text>

          <Text
            transform="matrix(1 0 0 1 498.1748 241.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            홍천
          </Text>

          <Text
            transform="matrix(1 0 0 1 622.8799 246.3252)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            강릉
          </Text>

          <Text
            transform="matrix(1 0 0 1 560.8799 281.3105)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            평창
          </Text>

          <Text
            transform="matrix(1 0 0 1 505.3799 288.5625)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            횡성
          </Text>

          <Text
            transform="matrix(1 0 0 1 473.6299 326.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            원주
          </Text>

          <Text
            transform="matrix(1 0 0 1 563.3799 351.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영월
          </Text>

          <Text
            transform="matrix(1 0 0 1 603.3721 316)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            정선
          </Text>

          <Text
            transform="matrix(1 0 0 1 655.3408 289.5625)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            동해
          </Text>

          <Text
            transform="matrix(1 0 0 1 669.6299 333.9082)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            삼척
          </Text>

          <React.Fragment>
            <Text
              transform="matrix(1 0 0 1 761.5703 299.8691)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              울릉도
            </Text>
            <Text
              transform="matrix(1 0 0 1 811.2129 305.5381)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              독도
            </Text>
          </React.Fragment>

          <Text
            transform="matrix(1 0 0 1 644.3799 359.334)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            태백
          </Text>

          <Text
            transform="matrix(1 0 0 1 632.1299 403.3809)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            봉화
          </Text>

          <Text
            transform="matrix(1 0 0 1 697.3799 402.6572)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            울진
          </Text>

          <Text
            transform="matrix(1 0 0 1 670.8447 448.2852)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영양
          </Text>

          <Text
            transform="matrix(1 0 0 1 701.6299 490.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영덕
          </Text>

          <Text
            transform="matrix(1 0 0 1 661.6299 514.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            청송
          </Text>

          <Text
            transform="matrix(1 0 0 1 613.6299 471.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            안동
          </Text>

          <Text
            transform="matrix(1 0 0 1 578.4053 418.1914)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영주
          </Text>

          <Text
            transform="matrix(1 0 0 1 561.3799 456.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            예천
          </Text>

          <Text
            transform="matrix(1 0 0 1 516.8799 450.3965)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            문경
          </Text>

          <Text
            transform="matrix(1 0 0 1 503.498 505.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            상주
          </Text>

          <Text
            transform="matrix(1 0 0 1 583.4053 515.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            의성
          </Text>

          <Text
            transform="matrix(1 0 0 1 546.7197 545.791)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            구미
          </Text>

          <Text
            transform="matrix(1 0 0 1 503.7588 575)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            김천
          </Text>

          <Text
            transform="matrix(1 0 0 1 594.4893 555)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            군위
          </Text>

          <Text
            transform="matrix(1 0 0 1 688.6299 554)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            포항
          </Text>

          <Text
            transform="matrix(1 0 0 1 642.1299 582.5703)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영천
          </Text>

          <Text
            transform="matrix(1 0 0 1 690.8916 621.1055)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            경주
          </Text>

          <Text
            transform="matrix(1 0 0 1 622.3799 620.7285)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            경산
          </Text>

          <Text
            transform="matrix(1 0 0 1 587.6299 611.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            대구
          </Text>

          <Text
            transform="matrix(1 0 0 1 528.8799 607.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            성주
          </Text>

          <Text
            transform="matrix(1 0 0 1 535.1299 640.9082)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고령
          </Text>

          <Text
            transform="matrix(1 0 0 1 618.1299 653.8936)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            청도
          </Text>

          <Text
            transform="matrix(1 0 0 1 686.8916 672.9014)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            울산
          </Text>

          <Text
            transform="matrix(1 0 0 1 658.6299 706.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            양산
          </Text>

          <Text
            transform="matrix(1 0 0 1 661.3799 743.4902)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            부산
          </Text>

          <Text
            transform="matrix(1 0 0 1 627.8799 729.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            김해
          </Text>

          <Text
            transform="matrix(1 0 0 1 613.8799 687)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            밀양
          </Text>

          <Text
            transform="matrix(1 0 0 1 565.6299 676.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            창녕
          </Text>

          <Text
            transform="matrix(1 0 0 1 514.1299 674.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            합천
          </Text>

          <Text
            transform="matrix(1 0 0 1 534.3799 706.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            의령
          </Text>

          <Text
            transform="matrix(1 0 0 1 560.3799 726.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            함안
          </Text>

          <Text
            transform="matrix(1 0 0 1 587.6299 736.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            창원
          </Text>

          <Text
            transform="matrix(1 0 0 1 593.1299 810.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            거제
          </Text>

          <Text
            transform="matrix(1 0 0 1 542.6484 812.3086)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            통영
          </Text>

          <Text
            transform="matrix(1 0 0 1 538.3799 782.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고성
          </Text>

          <Text
            transform="matrix(1 0 0 1 507.3799 776.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            사천
          </Text>

          <Text
            transform="matrix(1 0 0 1 512.1299 743.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            진주
          </Text>

          <Text
            transform="matrix(1 0 0 1 474.8799 713.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            산청
          </Text>

          <Text
            transform="matrix(1 0 0 1 474.1299 638.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            거창
          </Text>

          <Text
            transform="matrix(1 0 0 1 447.1299 673.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            함양
          </Text>

          <Text
            transform="matrix(1 0 0 1 454.3799 751)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            하동
          </Text>

          <Text
            transform="matrix(1 0 0 1 434.3799 778.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            광양
          </Text>

          <Text
            transform="matrix(1 0 0 1 479.1299 824.5859)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            남해
          </Text>

          <Text
            transform="matrix(1 0 0 1 434.8799 825.1055)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            여수
          </Text>

          <Text
            transform="matrix(1 0 0 1 391.6299 786)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            순천
          </Text>

          <Text
            transform="matrix(1 0 0 1 410.3799 738.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            구례
          </Text>

          <Text
            transform="matrix(1 0 0 1 371.6299 738)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            곡성
          </Text>

          <Text
            transform="matrix(1 0 0 1 328.8799 783.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            화순
          </Text>

          <Text
            transform="matrix(1 0 0 1 352.6299 822)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            보성
          </Text>

          <Text
            transform="matrix(1 0 0 1 378.6299 862.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고흥
          </Text>

          <Text
            transform="matrix(1 0 0 1 313.8799 833)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            장흥
          </Text>

          <Text
            transform="matrix(1 0 0 1 291.2852 846.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            강진
          </Text>

          <Text
            transform="matrix(1 0 0 1 279.3799 913.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            완도
          </Text>

          <Text
            transform="matrix(1 0 0 1 254.3799 872.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            해남
          </Text>

          <Text
            transform="matrix(1 0 0 1 204.6299 890.373)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            진도
          </Text>

          <Text
            transform="matrix(1 0 0 1 269.8799 820.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영암
          </Text>

          <Text
            transform="matrix(1 0 0 1 237.5249 819.75)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            목포
          </Text>

          <Text
            transform="matrix(1 0 0 1 276.6299 782.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            나주
          </Text>

          <Text
            transform="matrix(1 0 0 1 302.333 754.6719)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            광주
          </Text>

          <Text
            transform="matrix(1 0 0 1 328.1299 727.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            담양
          </Text>

          <Text
            transform="matrix(1 0 0 1 253.4429 760.7832)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            함평
          </Text>

          <Text
            transform="matrix(1 0 0 1 198.6299 779.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            신안
          </Text>

          <Text
            transform="matrix(1 0 0 1 241.8799 732.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영광
          </Text>

          <Text
            transform="matrix(1 0 0 1 292.4355 719.168)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            장성
          </Text>

          <Text
            transform="matrix(1 0 0 1 266.3799 698.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고창
          </Text>

          <Text
            transform="matrix(1 0 0 1 313.6299 665.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            정읍
          </Text>

          <Text
            transform="matrix(1 0 0 1 273.8799 649.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            부안
          </Text>

          <Text
            transform="matrix(1 0 0 1 351.4663 700.7588)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            순창
          </Text>

          <Text
            transform="matrix(1 0 0 1 401.6299 703.8379)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            남원
          </Text>

          <Text
            transform="matrix(1 0 0 1 368.3799 667.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            임실
          </Text>

          <Text
            transform="matrix(1 0 0 1 419.1196 654.8936)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            장수
          </Text>

          <Text
            transform="matrix(1 0 0 1 399.3799 622.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            진안
          </Text>

          <Text
            transform="matrix(1 0 0 1 444.1299 600.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            무주
          </Text>

          <Text
            transform="matrix(1 0 0 1 459.6299 558)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            영동
          </Text>

          <Text
            transform="matrix(1 0 0 1 406.6299 565.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            금산
          </Text>

          <Text
            transform="matrix(1 0 0 1 367.1299 592)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            완주
          </Text>

          <Text
            transform="matrix(1 0 0 1 331.3799 584)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            익산
          </Text>

          <Text
            transform="matrix(1 0 0 1 288.1299 597.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            군산
          </Text>

          <Text
            transform="matrix(1 0 0 1 313.1299 623)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            김제
          </Text>

          <Text
            transform="matrix(1 0 0 1 348.8799 620.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            전주
          </Text>

          <Text
            transform="matrix(1 0 0 1 355.1299 549.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            논산
          </Text>

          <Text
            transform="matrix(1 0 0 1 393.1299 520.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            대전
          </Text>

          <Text
            transform="matrix(1 0 0 1 433.1299 525.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            옥천
          </Text>

          <Text
            transform="matrix(1 0 0 1 447.6299 490.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            보은
          </Text>

          <Text
            transform="matrix(1 0 0 1 407.3799 462.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            청주
          </Text>

          <Text
            transform="matrix(1 0 0 1 373.3799 484.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            세종
          </Text>

          <Text
            transform="matrix(1 0 0 1 337.6299 490)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            공주
          </Text>

          <Text
            transform="matrix(1 0 0 1 301.3799 496.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            청양
          </Text>

          <Text
            transform="matrix(1 0 0 1 309.8799 539.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            부여
          </Text>

          <Text
            transform="matrix(1 0 0 1 283.1299 564.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            서천
          </Text>

          <Text
            transform="matrix(1 0 0 1 269.1299 508)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            보령
          </Text>

          <Text
            transform="matrix(1 0 0 1 270.6299 473.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            홍성
          </Text>

          <Text
            transform="matrix(1 0 0 1 212.8799 434)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            태안
          </Text>

          <Text
            transform="matrix(1 0 0 1 247.1299 439)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            서산
          </Text>

          <Text
            transform="matrix(1 0 0 1 278.1299 408.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            당진
          </Text>

          <Text
            transform="matrix(1 0 0 1 299.6299 450.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            예산
          </Text>

          <Text
            transform="matrix(1 0 0 1 329.3799 429)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            아산
          </Text>

          <Text
            transform="matrix(1 0 0 1 365.293 429)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            천안
          </Text>

          <Text
            transform="matrix(1 0 0 1 401.1299 416)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            진천
          </Text>

          <Text
            transform="matrix(1 0 0 1 461.3799 435.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            괴산
          </Text>

          <Text
            transform="matrix(1 0 0 1 428.3042 429.5)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            증평
          </Text>

          <Text
            transform="matrix(1 0 0 1 425.8799 396)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            음성
          </Text>

          <Text
            transform="matrix(1 0 0 1 471.8799 386)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            충주
          </Text>

          <Text
            transform="matrix(1 0 0 1 513.6299 369.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            제천
          </Text>

          <Text
            transform="matrix(1 0 0 1 548.3799 392.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            단양
          </Text>

          <Text
            transform="matrix(1 0 0 1 432.1299 330.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            여주
          </Text>

          <Text
            transform="matrix(1 0 0 1 423.3799 291.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            양평
          </Text>

          <Text
            transform="matrix(1 0 0 1 402.3799 340.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            이천
          </Text>

          <Text
            transform="matrix(1 0 0 1 373.6299 384)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            안성
          </Text>

          <Text
            transform="matrix(1 0 0 1 329.8799 385.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            평택
          </Text>

          <Text
            transform="matrix(1 0 0 1 311.6299 353.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            화성
          </Text>

          <Text
            transform="matrix(1 0 0 1 344.0542 356.25)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            오산
          </Text>

          <Text
            transform="matrix(1 0 0 1 369.6299 347.25)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            용인
          </Text>

          <Text
            transform="matrix(1 0 0 1 381.1299 307.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            광주
          </Text>

          <Text
            transform="matrix(1 0 0 1 368.3042 288.3574)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            하남
          </Text>

          <Text
            transform="matrix(1 0 0 1 333.4229 335.4336)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            수원
          </Text>

          <Text
            transform="matrix(1 0 0 1 357.978 271.25)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            구리
          </Text>

          <Text
            transform="matrix(1 0 0 1 351.0542 310.2627)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            성남
          </Text>

          <Text
            transform="matrix(1 0 0 1 337.9844 303.7381)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            과천
          </Text>

          <Text
            transform="matrix(1 0 0 1 336.4175 316.2393)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            의왕
          </Text>

          <Text
            transform="matrix(1 0 0 1 323.4175 322.2393)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            군포
          </Text>

          <Text
            transform="matrix(1 0 0 1 324.9521 309.2627)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            안양
          </Text>

          <Text
            transform="matrix(1 0 0 1 315.228 300.876)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            광명
          </Text>

          <Text
            transform="matrix(1 0 0 1 303.778 288.3574)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            부천
          </Text>

          <Text
            transform="matrix(1 0 0 1 308.0283 325.8535)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            안산
          </Text>

          <Text
            transform="matrix(1 0 0 1 301.0542 312.9707)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            시흥
          </Text>

          <Text
            transform="matrix(1 0 0 1 281.8799 286.2627)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            인천
          </Text>

          <Text
            transform="matrix(1 0 0 1 330.4985 284.3105)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            서울
          </Text>

          <Text
            transform="matrix(1 0 0 1 367.0703 258.2871)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            남양주
          </Text>

          <Text
            transform="matrix(1 0 0 1 398.9624 231.208)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            가평
          </Text>

          <Text
            transform="matrix(1 0 0 1 372.8799 200)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            포천
          </Text>

          <Text
            transform="matrix(1 0 0 1 336.6299 176.75)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            연천
          </Text>

          <Text
            transform="matrix(1 0 0 1 333.3799 229)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            양주
          </Text>

          <Text
            transform="matrix(1 0 0 1 302.3799 222)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            파주
          </Text>

          <Text
            transform="matrix(1 0 0 1 305.3799 258.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            고양
          </Text>

          <Text
            transform="matrix(1 0 0 1 270.1299 255.5)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            김포
          </Text>

          <Text
            transform="matrix(1 0 0 1 247.3042 249.5)"
            fontFamily="GmarketSansMedium"
            fontSize="7"
            fill="#000000">
            강화
          </Text>

          <Text
            transform="matrix(1 0 0 1 222.2345 332.1292)"
            fontFamily="GmarketSansMedium"
            fontSize="10">
            옹진
          </Text>

          <Text
            transform="matrix(1 0 0 1 344.8066 244.8574)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            의정부
          </Text>

          <Text
            transform="matrix(1 0 0 1 347.5923 209.3574)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            동두천
          </Text>

          <Text
            transform="matrix(1 0 0 1 372.5664 532.0488)"
            fontFamily="GmarketSansMedium"
            fontSize="5"
            fill="#000000">
            계룡
          </Text>

          <Text
            transform="matrix(1 0 0 1 239.8799 794.2246)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            무안
          </Text>

          <Text
            transform="matrix(1 0 0 1 249.7368 1030.1787)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            제주도
          </Text>

          <Text
            transform="matrix(1 0 0 1 565.6299 583.1367)"
            fontFamily="GmarketSansMedium"
            fontSize="10"
            fill="#000000">
            칠곡
          </Text>
        </G>
      )}
      {show === 'condition' && (
        <G>
          {data['KR-4-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 394.8042 148.499)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              철원
            </Text>
          )}
          {data['KR-4-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 441.3252 163.6094)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              화천
            </Text>
          )}
          {data['KR-4-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 489.7334 157.8848)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              양구
            </Text>
          )}
          {data['KR-4-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 548.3799 123.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고성
            </Text>
          )}
          {data['KR-4-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 531.2451 180.4355)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              인제
            </Text>
          )}
          {data['KR-4-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 571.5947 157.8848)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              속초
            </Text>
          )}
          {data['KR-4-18'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 583.4053 191.5234)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              양양
            </Text>
          )}
          {data['KR-4-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 449.1045 212.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              춘천
            </Text>
          )}
          {data['KR-4-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 498.1748 241.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              홍천
            </Text>
          )}
          {data['KR-4-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 622.8799 246.3252)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              강릉
            </Text>
          )}
          {data['KR-4-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 560.8799 281.3105)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              평창
            </Text>
          )}
          {data['KR-4-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 505.3799 288.5625)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              횡성
            </Text>
          )}
          {data['KR-4-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 473.6299 326.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              원주
            </Text>
          )}
          {data['KR-4-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 563.3799 351.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영월
            </Text>
          )}
          {data['KR-4-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 603.3721 316)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              정선
            </Text>
          )}
          {data['KR-4-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 655.3408 289.5625)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              동해
            </Text>
          )}
          {data['KR-4-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 669.6299 333.9082)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              삼척
            </Text>
          )}
          {data['KR-12-23'].type === 'init' && (
            <React.Fragment>
              <Text
                transform="matrix(1 0 0 1 761.5703 299.8691)"
                fontFamily="GmarketSansMedium"
                fontSize="10"
                fill="#000000">
                울릉도
              </Text>
              <Text
                transform="matrix(1 0 0 1 811.2129 305.5381)"
                fontFamily="GmarketSansMedium"
                fontSize="10"
                fill="#000000">
                독도
              </Text>
            </React.Fragment>
          )}
          {data['KR-4-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 644.3799 359.334)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              태백
            </Text>
          )}
          {data['KR-12-21'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 632.1299 403.3809)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              봉화
            </Text>
          )}
          {data['KR-12-22'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 697.3799 402.6572)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              울진
            </Text>
          )}
          {data['KR-12-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 670.8447 448.2852)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영양
            </Text>
          )}
          {data['KR-12-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 701.6299 490.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영덕
            </Text>
          )}
          {data['KR-12-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 661.6299 514.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              청송
            </Text>
          )}
          {data['KR-12-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 613.6299 471.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              안동
            </Text>
          )}
          {data['KR-12-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 578.4053 418.1914)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영주
            </Text>
          )}
          {data['KR-12-20'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 561.3799 456.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              예천
            </Text>
          )}
          {data['KR-12-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 516.8799 450.3965)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              문경
            </Text>
          )}
          {data['KR-12-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 503.498 505.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              상주
            </Text>
          )}
          {data['KR-12-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 583.4053 515.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              의성
            </Text>
          )}
          {data['KR-12-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 546.7197 545.791)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              구미
            </Text>
          )}
          {data['KR-12-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 503.7588 575)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              김천
            </Text>
          )}
          {data['KR-12-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 594.4893 555)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              군위
            </Text>
          )}
          {data['KR-12-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 688.6299 554)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              포항
            </Text>
          )}
          {data['KR-12-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 642.1299 582.5703)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영천
            </Text>
          )}
          {data['KR-12-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 690.8916 621.1055)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              경주
            </Text>
          )}
          {data['KR-12-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 622.3799 620.7285)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              경산
            </Text>
          )}
          {data['KR-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 587.6299 611.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              대구
            </Text>
          )}
          {data['KR-12-18'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 528.8799 607.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              성주
            </Text>
          )}
          {data['KR-12-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 535.1299 640.9082)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고령
            </Text>
          )}
          {data['KR-12-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 618.1299 653.8936)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              청도
            </Text>
          )}
          {data['KR-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 686.8916 672.9014)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              울산
            </Text>
          )}
          {data['KR-13-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 658.6299 706.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              양산
            </Text>
          )}
          {data['KR-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 661.3799 743.4902)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              부산
            </Text>
          )}
          {data['KR-13-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 627.8799 729.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              김해
            </Text>
          )}
          {data['KR-13-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 613.8799 687)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              밀양
            </Text>
          )}
          {data['KR-13-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 565.6299 676.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              창녕
            </Text>
          )}
          {data['KR-13-18'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 514.1299 674.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              합천
            </Text>
          )}
          {data['KR-13-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 534.3799 706.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              의령
            </Text>
          )}
          {data['KR-13-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 560.3799 726.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              함안
            </Text>
          )}
          {data['KR-13-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 587.6299 736.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              창원
            </Text>
          )}
          {data['KR-13-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 593.1299 810.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              거제
            </Text>
          )}
          {data['KR-13-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 542.6484 812.3086)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              통영
            </Text>
          )}
          {data['KR-13-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 538.3799 782.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고성
            </Text>
          )}
          {data['KR-13-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 507.3799 776.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              사천
            </Text>
          )}
          {data['KR-13-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 512.1299 743.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              진주
            </Text>
          )}
          {data['KR-13-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 474.8799 713.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              산청
            </Text>
          )}
          {data['KR-13-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 474.1299 638.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              거창
            </Text>
          )}
          {data['KR-13-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 447.1299 673.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              함양
            </Text>
          )}
          {data['KR-13-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 454.3799 751)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              하동
            </Text>
          )}
          {data['KR-10-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 434.3799 778.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              광양
            </Text>
          )}
          {data['KR-13-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 479.1299 824.5859)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              남해
            </Text>
          )}
          {data['KR-10-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 434.8799 825.1055)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              여수
            </Text>
          )}
          {data['KR-10-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 391.6299 786)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              순천
            </Text>
          )}
          {data['KR-10-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 410.3799 738.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              구례
            </Text>
          )}
          {data['KR-10-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 371.6299 738)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              곡성
            </Text>
          )}
          {data['KR-10-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 328.8799 783.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              화순
            </Text>
          )}
          {data['KR-10-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 352.6299 822)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              보성
            </Text>
          )}
          {data['KR-10-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 378.6299 862.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고흥
            </Text>
          )}
          {data['KR-10-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 313.8799 833)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              장흥
            </Text>
          )}
          {data['KR-10-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 291.2852 846.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              강진
            </Text>
          )}
          {data['KR-10-20'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 279.3799 913.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              완도
            </Text>
          )}
          {data['KR-10-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 254.3799 872.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              해남
            </Text>
          )}
          {data['KR-10-21'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 204.6299 890.373)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              진도
            </Text>
          )}
          {data['KR-10-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 269.8799 820.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영암
            </Text>
          )}
          {data['KR-10-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 237.5249 819.75)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              목포
            </Text>
          )}
          {data['KR-10-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 276.6299 782.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              나주
            </Text>
          )}
          {data['KR-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 302.333 754.6719)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              광주
            </Text>
          )}
          {data['KR-10-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 328.1299 727.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              담양
            </Text>
          )}
          {data['KR-10-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 253.4429 760.7832)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              함평
            </Text>
          )}
          {data['KR-10-22'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 198.6299 779.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              신안
            </Text>
          )}
          {data['KR-10-18'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 241.8799 732.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영광
            </Text>
          )}
          {data['KR-10-19'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 292.4355 719.168)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              장성
            </Text>
          )}
          {data['KR-9-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 266.3799 698.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고창
            </Text>
          )}
          {data['KR-9-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 313.6299 665.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              정읍
            </Text>
          )}
          {data['KR-9-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 273.8799 649.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              부안
            </Text>
          )}
          {data['KR-9-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 351.4663 700.7588)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              순창
            </Text>
          )}
          {data['KR-9-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 401.6299 703.8379)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              남원
            </Text>
          )}
          {data['KR-9-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 368.3799 667.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              임실
            </Text>
          )}
          {data['KR-9-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 419.1196 654.8936)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              장수
            </Text>
          )}
          {data['KR-9-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 399.3799 622.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              진안
            </Text>
          )}
          {data['KR-9-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 444.1299 600.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              무주
            </Text>
          )}
          {data['KR-5-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 459.6299 558)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              영동
            </Text>
          )}
          {data['KR-6-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 406.6299 565.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              금산
            </Text>
          )}
          {data['KR-9-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 367.1299 592)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              완주
            </Text>
          )}
          {data['KR-9-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 331.3799 584)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              익산
            </Text>
          )}
          {data['KR-9-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 288.1299 597.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              군산
            </Text>
          )}
          {data['KR-9-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 313.1299 623)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              김제
            </Text>
          )}
          {data['KR-9-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 348.8799 620.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              전주
            </Text>
          )}
          {data['KR-6-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 355.1299 549.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              논산
            </Text>
          )}
          {data['KR-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 393.1299 520.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              대전
            </Text>
          )}
          {data['KR-5-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 433.1299 525.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              옥천
            </Text>
          )}
          {data['KR-5-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 447.6299 490.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              보은
            </Text>
          )}
          {data['KR-5-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 407.3799 462.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              청주
            </Text>
          )}
          {data['KR-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 373.3799 484.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              세종
            </Text>
          )}
          {data['KR-6-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 337.6299 490)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              공주
            </Text>
          )}
          {data['KR-6-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 301.3799 496.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              청양
            </Text>
          )}
          {data['KR-6-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 309.8799 539.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              부여
            </Text>
          )}
          {data['KR-6-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 283.1299 564.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              서천
            </Text>
          )}
          {data['KR-6-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 269.1299 508)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              보령
            </Text>
          )}
          {data['KR-6-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 270.6299 473.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              홍성
            </Text>
          )}
          {data['KR-6-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 212.8799 434)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              태안
            </Text>
          )}
          {data['KR-6-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 247.1299 439)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              서산
            </Text>
          )}
          {data['KR-6-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 278.1299 408.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              당진
            </Text>
          )}
          {data['KR-6-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 299.6299 450.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              예산
            </Text>
          )}
          {data['KR-6-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 329.3799 429)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              아산
            </Text>
          )}
          {data['KR-6-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 365.293 429)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              천안
            </Text>
          )}
          {data['KR-5-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 401.1299 416)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              진천
            </Text>
          )}
          {data['KR-5-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 461.3799 435.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              괴산
            </Text>
          )}
          {data['KR-5-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 428.3042 429.5)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              증평
            </Text>
          )}
          {data['KR-5-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 425.8799 396)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              음성
            </Text>
          )}
          {data['KR-5-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 471.8799 386)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              충주
            </Text>
          )}
          {data['KR-5-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 513.6299 369.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              제천
            </Text>
          )}
          {data['KR-5-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 548.3799 392.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              단양
            </Text>
          )}
          {data['KR-2-28'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 432.1299 330.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              여주
            </Text>
          )}
          {data['KR-2-31'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 423.3799 291.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              양평
            </Text>
          )}
          {data['KR-2-21'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 402.3799 340.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              이천
            </Text>
          )}
          {data['KR-2-22'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 373.6299 384)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              안성
            </Text>
          )}
          {data['KR-2-8'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 329.8799 385.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              평택
            </Text>
          )}
          {data['KR-2-24'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 311.6299 353.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              화성
            </Text>
          )}
          {data['KR-2-14'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 344.0542 356.25)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              오산
            </Text>
          )}
          {data['KR-2-19'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 369.6299 347.25)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              용인
            </Text>
          )}
          {data['KR-2-25'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 381.1299 307.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              광주
            </Text>
          )}
          {data['KR-2-18'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 368.3042 288.3574)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              하남
            </Text>
          )}
          {data['KR-2-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 333.4229 335.4336)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              수원
            </Text>
          )}
          {data['KR-2-12'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 357.978 271.25)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              구리
            </Text>
          )}
          {data['KR-2-2'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 351.0542 310.2627)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              성남
            </Text>
          )}
          {data['KR-2-11'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 337.9844 303.7381)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              과천
            </Text>
          )}
          {data['KR-2-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 336.4175 316.2393)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              의왕
            </Text>
          )}
          {data['KR-2-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 323.4175 322.2393)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              군포
            </Text>
          )}
          {data['KR-2-4'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 324.9521 309.2627)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              안양
            </Text>
          )}
          {data['KR-2-6'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 315.228 300.876)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              광명
            </Text>
          )}
          {data['KR-2-5'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 303.778 288.3574)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              부천
            </Text>
          )}
          {data['KR-2-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 308.0283 325.8535)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              안산
            </Text>
          )}
          {data['KR-2-15'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 301.0542 312.9707)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              시흥
            </Text>
          )}
          {data['KR-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 281.8799 286.2627)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              인천
            </Text>
          )}
          {data['KR-1'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 330.4985 284.3105)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              서울
            </Text>
          )}
          {data['KR-2-13'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 367.0703 258.2871)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              남양주
            </Text>
          )}
          {data['KR-2-30'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 398.9624 231.208)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              가평
            </Text>
          )}
          {data['KR-2-27'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 372.8799 200)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              포천
            </Text>
          )}
          {data['KR-2-29'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 336.6299 176.75)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              연천
            </Text>
          )}
          {data['KR-2-26'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 333.3799 229)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              양주
            </Text>
          )}
          {data['KR-2-20'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 302.3799 222)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              파주
            </Text>
          )}
          {data['KR-2-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 305.3799 258.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              고양
            </Text>
          )}
          {data['KR-2-23'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 270.1299 255.5)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              김포
            </Text>
          )}
          {data['KR-3-9'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 247.3042 249.5)"
              fontFamily="GmarketSansMedium"
              fontSize="7"
              fill="#000000">
              강화
            </Text>
          )}
          {data['KR-3-10'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 222.2345 332.1292)"
              fontFamily="GmarketSansMedium"
              fontSize="10">
              옹진
            </Text>
          )}
          {data['KR-2-3'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 344.8066 244.8574)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              의정부
            </Text>
          )}
          {data['KR-2-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 347.5923 209.3574)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              동두천
            </Text>
          )}
          {data['KR-6-7'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 372.5664 532.0488)"
              fontFamily="GmarketSansMedium"
              fontSize="5"
              fill="#000000">
              계룡
            </Text>
          )}
          {data['KR-10-16'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 239.8799 794.2246)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              무안
            </Text>
          )}
          {data['KR-17'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 249.7368 1030.1787)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              제주도
            </Text>
          )}
          {data['KR-12-19'].type === 'init' && (
            <Text
              transform="matrix(1 0 0 1 565.6299 583.1367)"
              fontFamily="GmarketSansMedium"
              fontSize="10"
              fill="#000000">
              칠곡
            </Text>
          )}
        </G>
      )}
    </React.Fragment>
  );
};

export default KoreaMapText;
