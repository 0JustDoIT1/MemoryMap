interface RegionList {
  title: string;
  value: string;
  code?: string;
  display: boolean;
  sub?: {
    [key: string]: RegionList;
  };
}

interface KoreaRegionList {
  [key: string]: RegionList;
}

export const KoreaRegionList: KoreaRegionList = {
  'KR-1': {
    title: '서울',
    value: '서울',
    display: true,
    sub: {
      'KR-1-1': {
        title: '강남구',
        value: '강남구',
        display: false,
      },
      'KR-1-2': {
        title: '강동구',
        value: '강동구',
        display: false,
      },
      'KR-1-3': {
        title: '강북구',
        value: '강북구',
        display: false,
      },
      'KR-1-4': {
        title: '강서구',
        value: '강서구',
        display: false,
      },
      'KR-1-5': {
        title: '관악구',
        value: '관악구',
        display: false,
      },
      'KR-1-6': {
        title: '광진구',
        value: '광진구',
        display: false,
      },
      'KR-1-7': {
        title: '구로구',
        value: '구로구',
        display: false,
      },
      'KR-1-8': {
        title: '금천구',
        value: '금천구',
        display: false,
      },
      'KR-1-9': {
        title: '노원구',
        value: '노원구',
        display: false,
      },
      'KR-1-10': {
        title: '도봉구',
        value: '도봉구',
        display: false,
      },
      'KR-1-11': {
        title: '동대문구',
        value: '동대문구',
        display: false,
      },
      'KR-1-12': {
        title: '동작구',
        value: '동작구',
        display: false,
      },
      'KR-1-13': {
        title: '마포구',
        value: '마포구',
        display: false,
      },
      'KR-1-14': {
        title: '서대문구',
        value: '서대문구',
        display: false,
      },
      'KR-1-15': {
        title: '서초구',
        value: '서초구',
        display: false,
      },
      'KR-1-16': {
        title: '성동구',
        value: '성동구',
        display: false,
      },
      'KR-1-17': {
        title: '성북구',
        value: '성북구',
        display: false,
      },
      'KR-1-18': {
        title: '송파구',
        value: '송파구',
        display: false,
      },
      'KR-1-19': {
        title: '양천구',
        value: '양천구',
        display: false,
      },
      'KR-1-20': {
        title: '영등포구',
        value: '영등포구',
        display: false,
      },
      'KR-1-21': {
        title: '용산구',
        value: '용산구',
        display: false,
      },
      'KR-1-22': {
        title: '은평구',
        value: '은평구',
        display: false,
      },
      'KR-1-23': {
        title: '종로구',
        value: '종로구',
        display: false,
      },
      'KR-1-24': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-1-25': {
        title: '중랑구',
        value: '중랑구',
        display: false,
      },
    },
  },
  'KR-2': {
    title: '경기',
    value: '경기도',
    display: true,
    sub: {
      'KR-2-1': {
        title: '수원',
        value: '수원시',
        display: true,
        sub: {
          'KR-2-1-1': {
            title: '장안구',
            value: '장안구',
            display: false,
          },
          'KR-2-1-2': {
            title: '권선구',
            value: '권선구',
            display: false,
          },
          'KR-2-1-3': {
            title: '팔달구',
            value: '팔달구',
            display: false,
          },
          'KR-2-1-4': {
            title: '영통구',
            value: '영통구',
            display: false,
          },
        },
      },
      'KR-2-2': {
        title: '성남',
        value: '성남시',
        display: true,
        sub: {
          'KR-2-2-1': {
            title: '수정구',
            value: '수정구',
            display: false,
          },
          'KR-2-2-2': {
            title: '중원구',
            value: '중원구',
            display: false,
          },
          'KR-2-2-3': {
            title: '분당구',
            value: '분당구',
            display: false,
          },
        },
      },
      'KR-2-3': {
        title: '의정부',
        value: '의정부시',
        display: true,
      },
      'KR-2-4': {
        title: '안양',
        value: '안양시',
        display: true,
        sub: {
          'KR-2-4-1': {
            title: '만안구',
            value: '만안구',
            display: false,
          },
          'KR-2-4-2': {
            title: '동안구',
            value: '동안구',
            display: false,
          },
        },
      },
      'KR-2-5': {
        title: '부천',
        value: '부천시',
        display: true,
      },
      'KR-2-6': {
        title: '광명',
        value: '광명시',
        display: true,
      },
      'KR-2-7': {
        title: '동두천',
        value: '동두천시',
        display: true,
      },
      'KR-2-8': {
        title: '평택',
        value: '평택시',
        display: true,
      },
      'KR-2-9': {
        title: '안산',
        value: '안산시',
        display: true,
        sub: {
          'KR-2-9-1': {
            title: '상록구',
            value: '상록구',
            display: false,
          },
          'KR-2-9-2': {
            title: '단원구',
            value: '단원구',
            display: false,
          },
        },
      },
      'KR-2-10': {
        title: '고양',
        value: '고양시',
        display: true,
        sub: {
          'KR-2-10-1': {
            title: '덕양구',
            value: '덕양구',
            display: false,
          },
          'KR-2-10-2': {
            title: '일산동구',
            value: '일산동구',
            display: false,
          },
          'KR-2-10-3': {
            title: '일산서구',
            value: '일산서구',
            display: false,
          },
        },
      },
      'KR-2-11': {
        title: '과천',
        value: '과천시',
        display: true,
      },
      'KR-2-12': {
        title: '구리',
        value: '구리시',
        display: true,
      },
      'KR-2-13': {
        title: '남양주',
        value: '남양주시',
        display: true,
      },
      'KR-2-14': {
        title: '오산',
        value: '오산시',
        display: true,
      },
      'KR-2-15': {
        title: '시흥',
        value: '시흥시',
        display: true,
      },
      'KR-2-16': {
        title: '군포',
        value: '군포시',
        display: true,
      },
      'KR-2-17': {
        title: '의왕',
        value: '의왕시',
        display: true,
      },
      'KR-2-18': {
        title: '하남',
        value: '하남시',
        display: true,
      },
      'KR-2-19': {
        title: '용인',
        value: '용인시',
        display: true,
        sub: {
          'KR-2-19-1': {
            title: '처인구',
            value: '처인구',
            display: false,
          },
          'KR-2-19-2': {
            title: '기흥구',
            value: '기흥구',
            display: false,
          },
          'KR-2-19-3': {
            title: '수지구',
            value: '수지구',
            display: false,
          },
        },
      },
      'KR-2-20': {
        title: '파주',
        value: '파주시',
        display: true,
      },
      'KR-2-21': {
        title: '이천',
        value: '이천시',
        display: true,
      },
      'KR-2-22': {
        title: '안성',
        value: '안성시',
        display: true,
      },
      'KR-2-23': {
        title: '김포',
        value: '김포시',
        display: true,
      },
      'KR-2-24': {
        title: '화성',
        value: '화성시',
        display: true,
      },
      'KR-2-25': {
        title: '광주',
        value: '광주시',
        display: true,
      },
      'KR-2-26': {
        title: '양주',
        value: '양주시',
        display: true,
      },
      'KR-2-27': {
        title: '포천',
        value: '포천시',
        display: true,
      },
      'KR-2-28': {
        title: '여주',
        value: '여주시',
        display: true,
      },
      'KR-2-29': {
        title: '연천',
        value: '연천군',
        display: true,
      },
      'KR-2-30': {
        title: '가평',
        value: '가평군',
        display: true,
      },
      'KR-2-31': {
        title: '양평',
        value: '양평군',
        display: true,
      },
    },
  },
  'KR-3': {
    title: '인천',
    value: '인천광역시',
    display: true,
    sub: {
      'KR-3-1': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-3-2': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-3-3': {
        title: '미추홀구',
        value: '미추홀구',
        display: false,
      },
      'KR-3-4': {
        title: '연수구',
        value: '연수구',
        display: false,
      },

      'KR-3-5': {
        title: '남동구',
        value: '남동구',
        display: false,
      },
      'KR-3-6': {
        title: '부평구',
        value: '부평구',
        display: false,
      },
      'KR-3-7': {
        title: '계양구',
        value: '계양구',
        display: false,
      },
      'KR-3-8': {
        title: '서구',
        value: '서구',
        display: false,
      },
      'KR-3-9': {
        title: '강화',
        value: '강화군',
        display: true,
      },
      'KR-3-10': {
        title: '옹진',
        value: '옹진군',
        display: true,
      },
    },
  },
  'KR-4': {
    title: '강원',
    value: '강원도',
    display: true,
    sub: {
      'KR-4-1': {
        title: '춘천',
        value: '춘천시',
        display: true,
      },
      'KR-4-2': {
        title: '원주',
        value: '원주시',
        display: true,
      },
      'KR-4-3': {
        title: '강릉',
        value: '강릉시',
        display: true,
      },
      'KR-4-4': {
        title: '동해',
        value: '동해시',
        display: true,
      },
      'KR-4-5': {
        title: '태백',
        value: '태백시',
        display: true,
      },
      'KR-4-6': {
        title: '속초',
        value: '속초시',
        display: true,
      },
      'KR-4-7': {
        title: '삼척',
        value: '삼척시',
        display: true,
      },
      'KR-4-8': {
        title: '홍천',
        value: '홍천군',
        display: true,
      },
      'KR-4-9': {
        title: '횡성',
        value: '횡성군',
        display: true,
      },
      'KR-4-10': {
        title: '영월',
        value: '영월군',
        display: true,
      },
      'KR-4-11': {
        title: '평창',
        value: '평창군',
        display: true,
      },
      'KR-4-12': {
        title: '정선',
        value: '정선군',
        display: true,
      },
      'KR-4-13': {
        title: '철원',
        value: '철원군',
        display: true,
      },
      'KR-4-14': {
        title: '화천',
        value: '화천군',
        display: true,
      },
      'KR-4-15': {
        title: '양구',
        value: '양구군',
        display: true,
      },
      'KR-4-16': {
        title: '인제',
        value: '인제군',
        display: true,
      },
      'KR-4-17': {
        title: '고성',
        value: '고성군',
        display: true,
      },
      'KR-4-18': {
        title: '양양',
        value: '양양군',
        display: true,
      },
    },
  },
  'KR-5': {
    title: '충북',
    value: '충청북도',
    display: true,
    sub: {
      'KR-5-1': {
        title: '청주',
        value: '청주시',
        display: true,
        sub: {
          'KR-5-1-1': {
            title: '상당구',
            value: '상당구',
            display: false,
          },
          'KR-5-1-2': {
            title: '흥덕구',
            value: '흥덕구',
            display: false,
          },
          'KR-5-1-3': {
            title: '서원구',
            value: '서원구',
            display: false,
          },
          'KR-5-1-4': {
            title: '청원구',
            value: '청원구',
            display: false,
          },
        },
      },
      'KR-5-2': {
        title: '충주',
        value: '충주시',
        display: true,
      },
      'KR-5-3': {
        title: '제천',
        value: '제천시',
        display: true,
      },
      'KR-5-4': {
        title: '보은',
        value: '보은군',
        display: true,
      },
      'KR-5-5': {
        title: '옥천',
        value: '옥천군',
        display: true,
      },
      'KR-5-6': {
        title: '영동',
        value: '영동군',
        display: true,
      },
      'KR-5-7': {
        title: '증평',
        value: '증평군',
        display: true,
      },
      'KR-5-8': {
        title: '진천',
        value: '진천군',
        display: true,
      },
      'KR-5-9': {
        title: '괴산',
        value: '괴산군',
        display: true,
      },
      'KR-5-10': {
        title: '음성',
        value: '음성군',
        display: true,
      },
      'KR-5-11': {
        title: '단양',
        value: '단양군',
        display: true,
      },
    },
  },
  'KR-6': {
    title: '충남',
    value: '충청남도',
    display: true,
    sub: {
      'KR-6-1': {
        title: '천안',
        value: '천안시',
        display: true,
        sub: {
          'KR-6-1-1': {
            title: '동남구',
            value: '동남구',
            display: false,
          },
          'KR-6-1-2': {
            title: '서북구',
            value: '서북구',
            display: false,
          },
        },
      },
      'KR-6-2': {
        title: '공주',
        value: '공주시',
        display: true,
      },
      'KR-6-3': {
        title: '보령',
        value: '보령시',
        display: true,
      },
      'KR-6-4': {
        title: '아산',
        value: '아산시',
        display: true,
      },
      'KR-6-5': {
        title: '서산',
        value: '서산시',
        display: true,
      },
      'KR-6-6': {
        title: '논산',
        value: '논산시',
        display: true,
      },
      'KR-6-7': {
        title: '계룡',
        value: '계룡시',
        display: true,
      },
      'KR-6-8': {
        title: '당진',
        value: '당진시',
        display: true,
      },
      'KR-6-9': {
        title: '금산',
        value: '금산군',
        display: true,
      },
      'KR-6-10': {
        title: '부여',
        value: '부여군',
        display: true,
      },
      'KR-6-11': {
        title: '서천',
        value: '서천군',
        display: true,
      },
      'KR-6-12': {
        title: '청양',
        value: '청양군',
        display: true,
      },
      'KR-6-13': {
        title: '홍성',
        value: '홍성군',
        display: true,
      },
      'KR-6-14': {
        title: '예산',
        value: '예산군',
        display: true,
      },
      'KR-6-15': {
        title: '태안',
        value: '태안군',
        display: true,
      },
    },
  },
  'KR-7': {
    title: '대전',
    value: '대전광역시',
    display: true,
    sub: {
      'KR-7-1': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-7-2': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-7-3': {
        title: '서구',
        value: '서구',
        display: false,
      },
      'KR-7-4': {
        title: '유성구',
        value: '유성구',
        display: false,
      },
      'KR-7-5': {
        title: '대덕',
        value: '대덕구',
        display: false,
      },
    },
  },
  'KR-8': {
    title: '세종',
    value: '세종특별자치시',
    display: true,
  },
  'KR-9': {
    title: '전북',
    value: '전라북도',
    display: true,
    sub: {
      'KR-9-1': {
        title: '전주',
        value: '전주시',
        display: true,
        sub: {
          'KR-9-1-1': {
            title: '완산구',
            value: '완산구',
            display: false,
          },
          'KR-9-1-2': {
            title: '덕진구',
            value: '덕진구',
            display: false,
          },
        },
      },
      'KR-9-2': {
        title: '군산',
        value: '군산시',
        display: true,
      },
      'KR-9-3': {
        title: '익산',
        value: '익산시',
        display: true,
      },
      'KR-9-4': {
        title: '정읍',
        value: '정읍시',
        display: true,
      },
      'KR-9-5': {
        title: '남원',
        value: '남원시',
        display: true,
      },
      'KR-9-6': {
        title: '김제',
        value: '김제시',
        display: true,
      },
      'KR-9-7': {
        title: '완주',
        value: '완주군',
        display: true,
      },
      'KR-9-8': {
        title: '진안',
        value: '진안군',
        display: true,
      },
      'KR-9-9': {
        title: '무주',
        value: '무주군',
        display: true,
      },
      'KR-9-10': {
        title: '장수',
        value: '장수군',
        display: true,
      },
      'KR-9-11': {
        title: '임실',
        value: '임실군',
        display: true,
      },
      'KR-9-12': {
        title: '순창',
        value: '순창군',
        display: true,
      },
      'KR-9-13': {
        title: '고창',
        value: '고창군',
        display: true,
      },
      'KR-9-14': {
        title: '부안',
        value: '부안군',
        display: true,
      },
    },
  },
  'KR-10': {
    title: '전남',
    value: '전라남도',
    display: true,
    sub: {
      'KR-10-1': {
        title: '목포',
        value: '목포시',
        display: true,
      },
      'KR-10-2': {
        title: '여수',
        value: '여수시',
        display: true,
      },
      'KR-10-3': {
        title: '순천',
        value: '순천시',
        display: true,
      },
      'KR-10-4': {
        title: '나주',
        value: '나주시',
        display: true,
      },
      'KR-10-5': {
        title: '광양',
        value: '광양시',
        display: true,
      },
      'KR-10-6': {
        title: '담양',
        value: '담양군',
        display: true,
      },
      'KR-10-7': {
        title: '곡성',
        value: '곡성군',
        display: true,
      },
      'KR-10-8': {
        title: '구례',
        value: '구례군',
        display: true,
      },
      'KR-10-9': {
        title: '고흥',
        value: '고흥군',
        display: true,
      },
      'KR-10-10': {
        title: '보성',
        value: '보성군',
        display: true,
      },
      'KR-10-11': {
        title: '화순',
        value: '화순군',
        display: true,
      },
      'KR-10-12': {
        title: '장흥',
        value: '장흥군',
        display: true,
      },
      'KR-10-13': {
        title: '강진',
        value: '강진군',
        display: true,
      },
      'KR-10-14': {
        title: '해남',
        value: '해남군',
        display: true,
      },
      'KR-10-15': {
        title: '영암',
        value: '영암군',
        display: true,
      },
      'KR-10-16': {
        title: '무안',
        value: '무안군',
        display: true,
      },
      'KR-10-17': {
        title: '함평',
        value: '함평군',
        display: true,
      },
      'KR-10-18': {
        title: '영광',
        value: '영광군',
        display: true,
      },
      'KR-10-19': {
        title: '장성',
        value: '장성군',
        display: true,
      },
      'KR-10-20': {
        title: '완도',
        value: '완도군',
        display: true,
      },
      'KR-10-21': {
        title: '진도',
        value: '진도군',
        display: true,
      },
      'KR-10-22': {
        title: '신안',
        value: '신안군',
        display: true,
      },
    },
  },
  'KR-11': {
    title: '광주',
    value: '광주광역시',
    display: true,
    sub: {
      'KR-11-1': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-11-2': {
        title: '서구',
        value: '서구',
        display: false,
      },
      'KR-11-3': {
        title: '남구',
        value: '남구',
        display: false,
      },
      'KR-11-4': {
        title: '북구',
        value: '북구',
        display: false,
      },
      'KR-11-5': {
        title: '광산구',
        value: '광산구',
        display: false,
      },
    },
  },
  'KR-12': {
    title: '경북',
    value: '경상북도',
    display: true,
    sub: {
      'KR-12-1': {
        title: '포항',
        value: '포항시',
        display: true,
        sub: {
          'KR-12-1-1': {
            title: '포항 남구',
            value: '포항시 남구',
            display: false,
          },
          'KR-12-1-2': {
            title: '포항 북구',
            value: '포항시 북구',
            display: false,
          },
        },
      },
      'KR-12-2': {
        title: '경주',
        value: '경주시',
        display: true,
      },
      'KR-12-3': {
        title: '김천',
        value: '김천시',
        display: true,
      },
      'KR-12-4': {
        title: '안동',
        value: '안동시',
        display: true,
      },
      'KR-12-5': {
        title: '구미',
        value: '구미시',
        display: true,
      },
      'KR-12-6': {
        title: '영주',
        value: '영주시',
        display: true,
      },
      'KR-12-7': {
        title: '영천',
        value: '영천시',
        display: true,
      },
      'KR-12-8': {
        title: '상주',
        value: '상주시',
        display: true,
      },
      'KR-12-9': {
        title: '문경',
        value: '문경시',
        display: true,
      },
      'KR-12-10': {
        title: '경산',
        value: '경산시',
        display: true,
      },
      'KR-12-11': {
        title: '군위',
        value: '군위군',
        display: true,
      },
      'KR-12-12': {
        title: '의성',
        value: '의성군',
        display: true,
      },
      'KR-12-13': {
        title: '청송',
        value: '청송군',
        display: true,
      },
      'KR-12-14': {
        title: '영양',
        value: '영양군',
        display: true,
      },
      'KR-12-15': {
        title: '영덕',
        value: '영덕군',
        display: true,
      },
      'KR-12-16': {
        title: '청도',
        value: '청도군',
        display: true,
      },
      'KR-12-17': {
        title: '고령',
        value: '고령군',
        display: true,
      },
      'KR-12-18': {
        title: '성주',
        value: '성주군',
        display: true,
      },
      'KR-12-19': {
        title: '칠곡',
        value: '칠곡군',
        display: true,
      },
      'KR-12-20': {
        title: '예천',
        value: '예천군',
        display: true,
      },
      'KR-12-21': {
        title: '봉화',
        value: '봉화군',
        display: true,
      },
      'KR-12-22': {
        title: '울진',
        value: '울진군',
        display: true,
      },
      'KR-12-23': {
        title: '울릉',
        value: '울릉군',
        display: true,
      },
    },
  },
  'KR-13': {
    title: '경남',
    value: '경상남도',
    display: true,
    sub: {
      'KR-13-1': {
        title: '창원',
        value: '창원시',
        display: true,
        sub: {
          'KR-13-1-1': {
            title: '의창구',
            value: '의창구',
            display: false,
          },
          'KR-13-1-2': {
            title: '성산구',
            value: '성산구',
            display: false,
          },
          'KR-13-1-3': {
            title: '마산합포구',
            value: '마산합포구',
            display: false,
          },
          'KR-13-1-4': {
            title: '마산회원구',
            value: '마산회원구',
            display: false,
          },
          'KR-13-1-5': {
            title: '진해구',
            value: '진해구',
            display: false,
          },
        },
      },
      'KR-13-2': {
        title: '진주',
        value: '진주시',
        display: true,
      },
      'KR-13-3': {
        title: '통영',
        value: '통영시',
        display: true,
      },
      'KR-13-4': {
        title: '사천',
        value: '사천시',
        display: true,
      },
      'KR-13-5': {
        title: '김해',
        value: '김해시',
        display: true,
      },
      'KR-13-6': {
        title: '밀양',
        value: '밀양시',
        display: true,
      },
      'KR-13-7': {
        title: '거제',
        value: '거제시',
        display: true,
      },
      'KR-13-8': {
        title: '양산',
        value: '양산시',
        display: true,
      },
      'KR-13-9': {
        title: '의령',
        value: '의령군',
        display: true,
      },
      'KR-13-10': {
        title: '함안',
        value: '함안군',
        display: true,
      },
      'KR-13-11': {
        title: '창녕',
        value: '창녕군',
        display: true,
      },
      'KR-13-12': {
        title: '고성',
        value: '고성군',
        display: true,
      },
      'KR-13-13': {
        title: '남해',
        value: '남해군',
        display: true,
      },
      'KR-13-14': {
        title: '하동',
        value: '하동군',
        display: true,
      },
      'KR-13-15': {
        title: '산청',
        value: '산청군',
        display: true,
      },
      'KR-13-16': {
        title: '함양',
        value: '함양군',
        display: true,
      },
      'KR-13-17': {
        title: '거창',
        value: '거창군',
        display: true,
      },
      'KR-13-18': {
        title: '합천',
        value: '합천군',
        display: true,
      },
    },
  },
  'KR-14': {
    title: '부산',
    value: '부산광역시',
    display: true,
    sub: {
      'KR-14-1': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-14-2': {
        title: '서구',
        value: '서구',
        display: false,
      },
      'KR-14-3': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-14-4': {
        title: '영도구',
        value: '영도구',
        display: false,
      },
      'KR-14-5': {
        title: '부산진구',
        value: '부산진구',
        display: false,
      },
      'KR-14-6': {
        title: '동래구',
        value: '동래구',
        display: false,
      },
      'KR-14-7': {
        title: '남구',
        value: '남구',
        display: false,
      },
      'KR-14-8': {
        title: '북구',
        value: '북구',
        display: false,
      },
      'KR-14-9': {
        title: '강서구',
        value: '강서구',
        display: false,
      },
      'KR-14-10': {
        title: '해운대구',
        value: '해운대구',
        display: false,
      },
      'KR-14-11': {
        title: '사하구',
        value: '사하구',
        display: false,
      },
      'KR-14-12': {
        title: '금정구',
        value: '금정구',
        display: false,
      },
      'KR-14-13': {
        title: '연제구',
        value: '연제구',
        display: false,
      },
      'KR-14-14': {
        title: '수영구',
        value: '수영구',
        display: false,
      },

      'KR-14-15': {
        title: '사상구',
        value: '사상구',
        display: false,
      },
      'KR-14-16': {
        title: '기장',
        value: '기장군',
        display: false,
      },
    },
  },
  'KR-15': {
    title: '대구',
    value: '대구광역시',
    display: true,
    sub: {
      'KR-15-1': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-15-2': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-15-3': {
        title: '서구',
        value: '서구',
        display: false,
      },
      'KR-15-4': {
        title: '남구',
        value: '남구',
        display: false,
      },
      'KR-15-5': {
        title: '북구',
        value: '북구',
        display: false,
      },
      'KR-15-6': {
        title: '수성구',
        value: '수성구',
        display: false,
      },
      'KR-15-7': {
        title: '달서구',
        value: '달서구',
        display: false,
      },
      'KR-15-8': {
        title: '달성',
        value: '달성군',
        display: false,
      },
    },
  },
  'KR-16': {
    title: '울산',
    value: '울산광역시',
    display: true,
    sub: {
      'KR-16-1': {
        title: '중구',
        value: '중구',
        display: false,
      },
      'KR-16-2': {
        title: '남구',
        value: '남구',
        display: false,
      },
      'KR-16-3': {
        title: '동구',
        value: '동구',
        display: false,
      },
      'KR-16-4': {
        title: '북구',
        value: '북구',
        display: false,
      },
      'KR-16-5': {
        title: '울주',
        value: '울주군',
        display: false,
      },
    },
  },
  'KR-17': {
    title: '제주도',
    value: '제주특별자치도',
    code: 'KR-17',
    display: true,
    sub: {
      'KR-17-1': {
        title: '서귀포',
        value: '서귀포시',
        code: 'KR-17-1',
        display: false,
      },
      'KR-17-2': {
        title: '제주',
        value: '제주시',
        code: 'KR-17-2',
        display: false,
      },
    },
  },
};
