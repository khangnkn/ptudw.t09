const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.redirect("/");
});

router.get("/article-1", function(req, res) {
  var a_data = {
    a_title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
    a_author: "Khang Nguyen",
    a_date: "20/04/2019",
    a_abstract:
      "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé.",
    a_content:
      "<h2> Hãy quên hàng phím ảo đi, vuốt hết</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>"
  };
  res.render("general-article-detail", {
    data: a_data,
    title: a_data.a_title,
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">'
  });
});

router.get("/article-2", function(req, res) {
  var a_data = {
    a_title:
      "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
    a_author: "Ngan Khanh",
    a_date: "03/05/2019",
    a_abstract:
      "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc",
    a_content:
      '<p>Đây là những thứ tưởng chừng như chỉ là mơ trong khoảng 1 năm trước, bởi cái ngày mà Google Assistant (hay nói rộng ra là bất kì trợ lý ảo nào) hỗ trợ cho tiếng Việt còn rất xa. Thế mà năm nay, vào những ngày đầu tháng 5, chúng ta đã có thể dùng tiếng Việt với Google Assistant và thậm chí điều khiển mọi món đồ smarthome trong nhà của mình bằng những câu lệnh thân thuộc như thế này.</p><p>Hiện tại chức năng điều khiển nhà thông minh của Google Assistant đã khá hoàn thiện, chỉ còn mỗi vụ báo "Thiết bị không phản hồi" nhưng thực chất lệnh vẫn được gửi đi và vẫn thực hiện thành công. Còn lại mình khá hài lòng với nó. Bạn có thể dùng Google Assistant để điều khiển các món đồ gia dụng trong gia đình mình như đèn, quạt, máy lạnh, TV, robot hút bụi... Nói chung là Google Assistant tiếng Anh làm được gì thì con này làm được gần đủ hết luôn, sướng lắm.</p><p>Và Google Assistant tiếng Việt chính là mảnh ghép còn thiếu của thị trường nhà thông minh tại Việt Nam. Như mình có chia sẻ trong bài trước, nhờ có Google Assistant mà các nhà sản xuất smarthome sẽ đến Việt Nam nhiều hơn, các công ty làm smarthome ở nước ta cũng sẽ tự tin hơn để tiếp tục sáng tạo và kinh doanh.</p><img src="/images/articles/2/01.jpg" alt="Den thong minh"><p>Việc có thể dùng được tiếng Việt với smarthome còn giúp gỡ bỏ rào cản lớn nhất hiện nay: điều khiển bằng giọng nói. Hiện tại hệ thống nhà thông minh của mình có khá nhiều đồ chơi và cũng rất tiện lợi nhưng ngặt cái phải ra lệnh bằng tiếng Anh nên ba mẹ mình không tận dụng được. Giờ thì ổn rồi, chỉ cần đợi các loa Google Home hỗ trợ tiếng Việt nữa là không cần cầm điện thoại luôn vẫn có thể ra lệnh điều khiển thoải mái.</p><p>Những thiết bị đã được hỗ trợ điều khiển và các lệnh bạn có thể dùng như sau:</p><ol> <li><strong>Bóng đèn: </strong>bật đèn <tên đèn>, tắt đèn <tên đèn>, cài độ sáng đèn <tên đèn> ở mức 50% (hoặc số nào đó mà bạn chọn, nhưng không phải bóng nào cũng hỗ trợ chỉnh độ sáng). Mình thử nghiệm với đèn Yeelight màu.</li><li><strong>Công tắc gắn tường: </strong>bật tắt, mình thử với ổ công tắc của JAVIS, một hãng Việt Nam</li><img src="/images/articles/2/02.jpg" alt="Den thong minh"><li><strong>Máy lạnh, quạt điều khiển bằng remote hồng ngoại: </strong>bật tắt, mình dùng cục Broadlink RM3 Mini để điều khiển mấy cái máy lạnh và quạt cũ ở nhà.</li><li><strong>TV: </strong>bật tắt được TV, mình cũng dùng cục Broadlink chứ TV nhà mình không có smart.</li><li><strong>Robot hút bụi: </strong>bật, tắt và kêu robot hút bụi chạy về lại dock sạc. Mình dùng con robot Xiaomi Gen 2.</li><li><strong>Có thể ra lệnh để chơi nhạc trên Spotify, </strong>nhưng chỉ chơi được trên điện thoại chứ chưa dùng loa thông minh để phát được.</li></ol><p>Nhà thông minh của mình có nhiêu đây, anh em có hàng gì điều khiển được từ Google Assistant thì chia sẻ thêm nhé. Bạn nào muốn mua mấy món đồ smarthome giống mình thì hãy xem bài Giới thiệu với anh em hệ thống smarthome dưới 8 triệu, điều khiển được đèn, quạt, máy lạnh, loa...</p><img src="/images/articles/2/03.jpg" alt="Den thong minh"><p>Một mẹo nhỏ dành cho bạn nào không điều khiển được thiết bị smarthome của mình bằng tiếng Việt: bạn hãy đặt tên cho thiết bị của mình bằng tiếng Anh, nhưng khi ra lệnh thì vẫn nói tiếng Việt bình thường.</p><p>Ví dụ: đặt tên thiết bị là Small room light, có nghĩa là đèn phòng nhỏ (nhà mình có 3 phòng, phòng nhỏ là phòng ngủ của mình). Khi ra lệnh, bạn chỉ cần "Hey Google, bật đèn phòng nhỏ" là xong. Google tự dịch từ chữ "small room" thành chữ "phòng nhỏ" luôn.</p>'
  };
  res.render("general-article-detail", {
    data: a_data,
    title: a_data.a_title
  });
});

module.exports = router;
