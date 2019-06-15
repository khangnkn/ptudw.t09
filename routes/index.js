var express = require("express");
var articles = require('../models/article.model');
var subcategories = require('../models/subcategory.model');
var tags = require('../models/tag.model');
var router = express.Router();
var path = require('path');
var moment = require('moment');
/* GET home page. */
router.get("/", function (req, res, next) {
  var now = new Date();
  var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
  console.log(date);
  // articles.GetTop4()
  //   .then(data => {
  //     subcategories.byCatId(data[0].Category)
  //       .then(Name => {
  //         console.log(Name);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  Promise.all([subcategories.topNSCateByView(10),]).then(scate => {
    Promise.all([
      articles.getTop4ArticlesOfWeek(date),
      articles.getTop10ArticlesMostViews(date),
      articles.getTop10ArticlesNewest(date),
      articles.getTop5ArticlesBySCategory(scate[0].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[1].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[2].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[3].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[4].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[5].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[6].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[7].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[8].IdSCate),
      articles.getTop5ArticlesBySCategory(scate[9].IdSCate)
    ]).then(([tw,mv,tn,sc0,sc1,sc2,sc3,sc4,sc5,sc6,sc7,sc8,sc9])=>{
      var top_SC = [tn,sc0,sc1,sc2,sc3,sc4,sc5,sc6,sc7,sc8,sc9];
      res.render("general/general-index", {
        title: "TechHub",
        extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
        topWeek: tw,
        mostView: mv,
        topNewest: tn,
        topSC: top_SC, 
        SC: scate,
        topr: [tw[0],tw[1]] 
      });
    }) .catch(err => {
          console.log(err);
    })
  }).catch(err => {
        console.log(err);
      })
  

  // var topdt = [{
  //     id: 1,
  //     image: "https://i.gadgets360cdn.com/products/large/1529877080_635_xiaomi_redmi_6_pro.jpg",
  //     title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
  //     author: "Nguyên Khang",
  //     date: "01/05/2019",
  //     category: "Programming",
  //     abstract: "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé."
  //   },
  //   {
  //     id: 2,
  //     image: "/images/articles/2/01.jpg",
  //     title: "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
  //     author: "Khánh Hacker",
  //     date: "30/04/2019",
  //     category: "Công nghệ",
  //     abstract: "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc"
  //   },
  //   {
  //     id: 3,
  //     image: "https://kenh14cdn.com/2019/5/4/photo-1-15569778026991546204914.jpg",
  //     title: 'YouTube đã "sát hại" Internet Explorer 6 như thế nào?',
  //     author: "Công Hưng",
  //     date: "04/05/2019",
  //     category: "Máy tính",
  //     abstract: "Thay vì bị chỉ trích, YouTube lại được tôn vinh như cứu tinh của web khi khuyến khích mọi người từ bỏ trình duyệt già cỗi này để chuyển sang các trình duyệt khác, tốt hơn, an toàn hơn."
  //   },
  //   {
  //     id: 4,
  //     image: "https://kenh14cdn.com/2019/5/3/photo-4-15568734466982032111122.jpg",
  //     title: "Trải nghiệm Google Assistant tiếng Việt: Thông minh, được việc, giọng êm nhưng đôi lúc đùa hơi nhạt",
  //     author: "Khanh Hacker",
  //     date: "07/05/2019",
  //     abstract: "Ở thời điểm hiện tại, Google Assistant là trợ lý ảo đầu tiên và duy nhất mà người Việt có thể sử dụng và được hưởng lợi."
  //   }
  // ];
  // res.render("general/general-index", {
  //   title: "TechHub",
  //   extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
  //   top: topdt,
  //   topr: [topdt[0], topdt[1]]
  // });
  // // console.log(topdt);
});

router.get("/search", function (req, res, next){
  var keyword = req.params.keyword;
  var currentPage = 1;
  var now = new Date();
  var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
  console.log(date);

  Promise.all([
    articles.getArticleTagByKeyword(keyword,date),
    subcategories.topNSCateByView(5),
    articles.getTopNViewed(date,5)
  ]).then(([rows,rows2,rows1]) => {
    res.render("general/general-search", {
      title: "Admin Dashboard",
      extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
      name: 'Kết quả',
      type: "Search",
      link: "categories",
      currPage: currentPage,
      count: rows.length,
      result: rows,
      mViewed: rows1,
      isTag: false,
      wtTable: rows2
    });
  }).catch(err => {
    console.log(err);
  })

  // var page = 1;
  // var cate = {
  //   id: 1,
  //   name: 'Công nghệ',
  //   total: 5
  // };

  // var cateData = [{
  //     id: 2,
  //     name: 'Điện thoại',
  //     total: 5
  //   },
  //   {
  //     id: 3,
  //     name: 'Laptop',
  //     total: 6
  //   },
  //   {
  //     id: 4,
  //     name: 'Xu hướng',
  //     total: 12
  //   },
  //   {
  //     id: 5,
  //     name: 'Lập trình',
  //     total: 12
  //   }
  // ];

  // var postData = [{
  //     id: 2,
  //     image: "/images/articles/2/01.jpg",
  //     title: "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
  //     author: "Khánh Hacker",
  //     date: "30/04/2019",
  //     category: [{
  //         id: 1,
  //         name: "Công nghệ"
  //       },
  //       {
  //         id: 4,
  //         name: 'Xu hướng'
  //       }
  //     ],
  //     abstract: "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc"
  //   },
  //   {
  //     id: 1,
  //     image: "https://i.gadgets360cdn.com/products/large/1529877080_635_xiaomi_redmi_6_pro.jpg",
  //     title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
  //     author: "Nguyên Khang",
  //     date: "01/05/2019",
  //     category: [{
  //         id: 5,
  //         name: "Lập trình"
  //       },
  //       {
  //         id: 2,
  //         name: 'Điện thoại'
  //       }
  //     ],
  //     abstract: "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé."
  //   }
  // ];

  // res.render("general/general-search", {
  //   title: "Admin Dashboard",
  //   extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
  //   currPage: page,
  //   currCate: cate,
  //   cateList: cateData,
  //   postList: postData
  // });
});

router.get("/categories", function (req, res, next){
  var subCate = req.params.id;
  var currentPage = 1;
  var now = new Date();
  var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
  console.log(date);

  Promise.all([
    articles.getArticleTagBySubCategory(subCate,date),
    subcategories.topNSCateByView(5),
    articles.getTopNViewedBySubCate(subCate,date,5)
  ]).then(([rows,rows2,rows1]) => {
    res.render("general/general-search", {
      title: "Admin Dashboard",
      extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
      name: rows[0].NameSubCate,
      type: "Category",
      currPage: currentPage,
      count: rows.length,
      result: rows,
      mViewed: rows1,
      isTag: false,
      wtTable: rows2
    });
  }).catch(err => {
    console.log(err);
  })
});

router.get("/tags", function (req, res, next){
  var tag = req.params.id;
  var currentPage = 1;
  var now = new Date();
  var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
  console.log(date);
  Promise.all([
    tags.singleByID(parseInt(tag)),
    articles.getArticleTagByTag(tag,date),
    tags.getTopNTagByView(5),
    articles.getTopNViewedByTag(tag,date,5)
  ]).then(([e,rows,rows2,rows1]) => {
    res.render("general/general-search", {
      title: "Admin Dashboard",
      extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
      name: e.Name,
      type: "Tag",
      currPage: currentPage,
      count: rows.length,
      result: rows,
      mViewed: rows1,
      isTag: true,
      wtTable: rows2
    });
  }).catch(err => {
    console.log(err);
  })
});

module.exports = router;