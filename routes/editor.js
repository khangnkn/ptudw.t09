// Bien tap vien
var express = require("express");
var router = express.Router();

var badge = { draft: 0, publish: 0 };
var a_content =
  "<h2> Hãy quên hàng phím ảo đi, vuốt hết</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>";

/* GET users listing. */
router.get("/drafts", function(req, res) {
  res.render("editor-drafts", {
    title: "Blog Posts",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> </script><link rel="stylesheet" href="/stylesheets/editor.css">',
    draft: badge.draft,
    publish: badge.publish,
    content: a_content,
  });
});

module.exports = router;
