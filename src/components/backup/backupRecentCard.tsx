// import React, {memo} from 'react';
// import {View} from 'react-native';
// import {Text, useTheme} from 'react-native-paper';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// interface IBackupRecentCard {
// }

// const BackupRecentCard = ({
//   userLabel,
//   date,
//   containerClassName,
//   testID,
//   iconName = 'cloud-check-outline',
// }: IBackupRecentCard) => {
//   const theme = useTheme();

//   return (
//     <View className={`w-full px-6 ${containerClassName ?? ''}`} testID={testID}>
//       <View className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//         {/* 헤더 */}
//         <View className="flex-row items-center">
//           <MaterialCommunityIcons
//             name={iconName}
//             size={18}
//             color={theme.colors.success}
//           />
//           <Text className="ml-2 text-xs text-gray-500">최근 백업</Text>
//         </View>

//         {/* 본문 */}
//         <View className="mt-2">
//           <Text className="text-base font-medium text-black text-center">
//             {userLabel}
//           </Text>
//           <Text className="mt-2 text-xs text-gray-600 text-center">
//             최근 백업 데이터는 <Text className="font-medium">{date}</Text> 입니다.
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default memo(BackupRecentCard);
