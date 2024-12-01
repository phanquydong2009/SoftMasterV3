import React from 'react';
import {

  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/TermsPolicyStyles';
const TermsPolicy = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../design/image/ic_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Điều khoản và điều kiện</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Điều kiện & Tham dự</Text>
        <Text style={styles.text}>
          Chấp nhận: Khi sử dụng ứng dụng, bạn đồng ý tuân thủ các điều khoản
          này. Nếu không đồng ý, vui lòng ngừng sử dụng.
        </Text>
        <Text style={styles.text}>
          Đăng ký: Một số tính năng yêu cầu đăng ký tài khoản với thông tin
          chính xác và bảo mật.
        </Text>
        <Text style={styles.text}>
          Quyền riêng tư: Thông tin cá nhân của bạn sẽ được xử lý theo Chính
          sách Bảo mật và không chia sẻ trái phép.
        </Text>
        <Text style={styles.text}>
          Sử dụng hợp pháp: Bạn chỉ được phép sử dụng ứng dụng cho mục đích hợp
          pháp, không vi phạm quyền của bên thứ ba.
        </Text>
        <Text style={styles.text}>
          Thay đổi: Chúng tôi có quyền thay đổi hoặc ngừng ứng dụng mà không cần
          thông báo trước.
        </Text>

        <Text style={styles.title}>Điều khoản & Sử dụng</Text>
        <Text style={styles.text}>
          Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ tất cả các điều khoản
          sau: Ứng dụng này cung cấp nội dung và dịch vụ cho mục đích cá nhân.
          Bạn không được sao chép, phân phối hoặc sử dụng trái phép bất kỳ nội
          dung nào. Ứng dụng không chịu trách nhiệm cho bất kỳ tổn thất nào phát
          sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng. Chúng tôi có
          quyền thay đổi hoặc cập nhật các điều khoản mà không cần thông báo
          trước. Người dùng có trách nhiệm kiểm tra điều khoản này thường xuyên.
        </Text>

        <Text style={styles.text}>
          ĐIỀU KHOẢN ĐƯỢC THÔNG QUA VÀ BAN HÀNH VÀO NGÀY 9/9/2024 BỞI TEAM SKY
          DREAM
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsPolicy;

