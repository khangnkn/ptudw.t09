var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var topdt = [
    {
      id: 1,
      image: "/images/articles/1/article-img1.png",
      title: "Canonical ra mắt Ubuntu 19.04!",
      author: "Nguyên Khang",
      date: "01/05/2019",
      category: "Programming",
      abstract:
        "Canonical ra mắt Ubuntu 19.04 với một số nâng cấp về hiệu năng nhưng liệu bạn có nên nâng cấp ngay?"
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
      image: "/images/articles/2/02.jpg",
      title:
        "AMD tiết lộ thêm về Zen 2, phối hợp 2 tiến trình 7 nm và 14 nm, Navi mới ra sẽ có giá dưới 699 USD",
      author: "Công Hưng",
      date: "04/05/2019",
      category: "Máy tính",
      abstract:
        "AMD sẽ ra mắt thế hệ Ryzen 3000 dùng kiến trúc Zen 2 tại Computex 2019 và ngay trước thềm triển lãm này, hãng đã vừa tiết lộ thêm thông tin về tiến trình, cụ thể là các CPU dùng kiến trúc Zen 2 và GPU kiến trúc Navi mới đều dùng tiến trình 7 nm của TSMC. Riêng dòng EPYC Rome dành cho máy chủ sẽ được bán vào quý 3 năm nay."
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
