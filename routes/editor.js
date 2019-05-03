// Bien tap vien
var express = require("express");
var router = express.Router();

var badge = { draft: 0, publish: 0 };

/* GET users listing. */
router.get("/drafts", function(req, res) {
  var postData = [
    {
      writer: "Ngân Khánh",
      title: "The first post of all",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content:
        "<h2> Hãy quên hàng phím ảo đi, vuốt hết</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>"
    },
    {
      writer: "Nguyen Khang",
      title:
        "Nhiều người dùng Việt Nam đã có Facebook Dating, giống với Tinder",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content:
        "<h2>Something</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>"
    },
    {
      writer: "Nguyen Cong Hung",
      title: "The third post of all",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content:
        '<p>Không phải tính năng gặp gỡ bạn mới - Meet New Friends trước đó mà đây thật sự là 1 tính năng hẹn hò đúng nghĩa của Facebook - Facebook Dating. Và nó vừa chính thức có mặt ở Việt Nam sau đợt cập nhật mới nhất gồm 5 quốc gia: Brazil, Philipin, Việt Nam, Singapore, Malaysia. Tính năng này hiện có mặt ở 14 quốc gia mà thôi. Cách hoạt động của Facebook Dating giống với "quẹt" của những ứng dụng hẹn hò đang phổ biến trên thị trường thay vì chỉ tìm bạn cùng sở thích như Meet New Friends đã có. Sẽ có 2 tùy chọn bên dưới những Profile (hồ sơ) mà Facebook gợi ý là Interested/ thích hoặc Pass/ bỏ qua. Nếu bạn thích 1 người và người đó cũng bấm thích bạn thì "New Matches" - hai người lập tức kết nối và được tạo một cuộc trò chuyện với nhau. Còn nếu xui xẻo, bạn bấm thích một người nhưng họ không chọn bạn thì bạn cũng có thể chủ động nhắn tin cho họ sau khi đã bấm thích. Tất nhiên, trả lời lại hay không là quyền của họ.</p><p>Tuy nhiên, chỉ mới chính thức công bố có mặt ở Việt Nam tối qua theo giờ Việt Nam nên hiện tại, có lẽ mọi thứ vẫn chưa sẵn sàng. Rất nhiều người dùng VN đã được cập nhật tính năng dating nhưng vẫn chưa ai nhìn thấy gì trong mục Profile gợi ý để "quẹt" cả. Có lẽ, mọi thứ sẽ sớm xuất hiện thôi, anh em bình tĩnh và hãy yên tâm rằng "chuyện không của riêng ai". À, Facebook Dating còn có cả Secret Crush để bạn thả thính Crush của mình (chỉ áp dụng cho danh sách bạn bè với tối đa 9 người :)). Nhưng hiện vẫn chưa thấy. Nói chung là từ từ đợi, xem ai hết ế trước :)))</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Profile mà bạn tạo trong mục Dating, cuộc trò chuyện với những người bạn thích đều chỉ nằm trong mục Dating, hoàn toàn không chia sẻ lên nơi khác trên Facebook. Facebook sẽ gợi ý người phù hợp cho bạn dựa trên Profile bạn tạo, tiêu chí hện hò của bạn, những gì bạn làm/ bạn chia sẻ trên Facebook và cả bạn chung của bạn với người kia. Thậm chí, khi bạn tham gia một nhóm/ một sự kiện được tạo trên Facebook thì bạn cũng có thể xem gợi ý kết đôi có trong sự kiện/ nhóm. (hy vọng nhiều anh em group tinhte sẽ sớm ghép đôi với nhau).</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Để bắt đầu sử dụng, bạn chỉ cần tạo một hồ sơ bao gồm giới tính của bạn, giới tính mà bạn muốn kết nối, vị trí của bạn (Facebook sẽ tự định vị, bạn không tự cài được đâu), ảnh đại diện của bạn (tạo xong profile thì có thể thêm nhiều ảnh nữa cho phong phú), viết vài dòng tự giới thiệu về bản thân. Xong!</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Sau lần đầu tạo Profile, mỗi lần bạn vào tab Dating thì sẽ có 3 mục cơ bản: những profile được gợi ý, những người đã thích bạn, cuộc trò chuyện. Ngoài ra, bạn có thể tùy chỉnh Profile lại bất ức lúc nào trong cài đặt ở góc phải. Bạn có thể điều chỉnh khoảng cách "quét" (tối đa 60 mile (khoảng 97km), thêm thông tin về độ tuổi tìm kiếm, có sẵn sàng có con hay không, tôn giáo, chiều cao - cân nặng, block ai đó/ dừng Matches hoặc xóa Profile bất cứ khi nào bạn muốn hay đã tìm được nửa kia.</p>'
    }
  ];
  res.render("editor-drafts", {
    title: "Blog Posts",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> </script><link rel="stylesheet" href="/stylesheets/editor.css">',
    draft: badge.draft,
    publish: badge.publish,
    data: postData
  });
});

module.exports = router;
