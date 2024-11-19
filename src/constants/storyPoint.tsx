import {sorting} from 'src/utils/sort';

interface StoryPointEmoji {
  [key: number]: {
    point: number;
    icon: string;
    color: string;
    text: string;
  };
}

export const storyPointEmoji: StoryPointEmoji = {
  5: {point: 5, icon: '😎', color: '#41C450', text: '최고'},
  4: {point: 4, icon: '😊', color: '#9ACD32', text: '좋음'},
  3: {point: 3, icon: '😐', color: '#41C4AE', text: '보통'},
  2: {point: 2, icon: '😔', color: '#FF7224', text: '나쁨'},
  1: {point: 1, icon: '😖', color: '#FF4343', text: '끔찍함'},
};

export const storyPointEmojiArray = Object.values(storyPointEmoji).sort(
  (a, b) => sorting(a, b, -1, 'point'),
);
