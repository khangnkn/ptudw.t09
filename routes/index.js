var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var topdt = [
    {
      id: 1,
      image:
        "https://i.gadgets360cdn.com/products/large/1529877080_635_xiaomi_redmi_6_pro.jpg",
      title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
      author: "Nguyên Khang",
      date: "01/05/2019",
      category: "Programming",
      abstract:
        "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé."
    },
    {
      id: 2,
      image: "/images/articles/2/01.jpg",
      title:
        "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
      author: "Khánh Hacker",
      date: "30/04/2019",
      category: "Công nghệ",
      abstract:
        "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc"
    },
    {
      id: 3,
      image:
        "https://kenh14cdn.com/2019/5/4/photo-1-15569778026991546204914.jpg",
      title: 'YouTube đã "sát hại" Internet Explorer 6 như thế nào?',
      author: "Công Hưng",
      date: "04/05/2019",
      category: "Máy tính",
      abstract:
        "Thay vì bị chỉ trích, YouTube lại được tôn vinh như cứu tinh của web khi khuyến khích mọi người từ bỏ trình duyệt già cỗi này để chuyển sang các trình duyệt khác, tốt hơn, an toàn hơn."
    },
    {
      id: 4,
      image:
        "https://kenh14cdn.com/2019/5/3/photo-4-15568734466982032111122.jpg",
      title:
        "Trải nghiệm Google Assistant tiếng Việt: Thông minh, được việc, giọng êm nhưng đôi lúc đùa hơi nhạt",
      author: "Khanh Hacker",
      date: "07/05/2019",
      abstract:
        "Ở thời điểm hiện tại, Google Assistant là trợ lý ảo đầu tiên và duy nhất mà người Việt có thể sử dụng và được hưởng lợi."
    }
  ];
  res.render("general-index", {
    title: "TechHub",
    extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
    top: topdt,
    topr: [topdt[0], topdt[1]]
  });
  console.log(topdt);
});

module.exports = router;
