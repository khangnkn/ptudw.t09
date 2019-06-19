const express = require("express");
const router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var auth = require('../middlewares/auth-admin');

var subCategoryModel = require('../models/subcategory.model');
var draftModel = require('../models/draft.model');
var statesModel = require('../models/states.model');
var tagModel = require('../models/tag.model');
var userModel = require('../models/user.model');
var articleModel = require('../models/article.model');
var commentModel = require('../models/comment.model');
var drafts_tagsModel = require('../models/drafts-tags.model');
var rejectdraftsModel = require('../models/drafts-tags.model');
var categoriesModel = require('../models/category.model');

router.get("/", function (req, res) {
  res.redirect("/admin/login");
});

router.get('/login', function (req, res, next) {
  res.render("admin/login", {
    layout: false,
  })
})

router.post('/login', (req, res,next) => {
  passport.authenticate('admin', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('admin/login', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);
      return res.end('a');
    });
  })(req, res, next);
  
})

router.get('/welcome', function (req, res, next) {
  res.redirect('/admin/welcome/drafts')
  
})

router.get('/welcome/drafts', function (req, res, next) {
  Promise.all([
    subCategoryModel.All(),
    draftModel.getAllForAdminWC(),
    statesModel.all(),
    tagModel.listForAdminWC()
  ]).then(([scrows,drrows,strows,tagrows]) => {
    res.render("admin/welcome-admin-drafts", {
      layout: 'welcome-admin-layout',
      subCate: scrows,
      drafts: drrows,
      states: strows,
      tags: tagrows
    })
  })
  
})

router.get('/welcome/categories', function (req, res, next) {
  Promise.all([
    subCategoryModel.listForAdmin(),
    categoriesModel.listForAdmin()
  ]).then(([scatrows,catrows]) => {
    console.log(catrows);
    res.render("admin/welcome-admin-cate", {
      layout: 'welcome-admin-layout',
      subCate: scatrows,
      Cate: catrows,
      result: false
    })
  })
  
})

router.post('/welcome/categories', function (req, res, next) {
  var id = parseInt(req.body.Id);
  Promise.all([
    subCategoryModel.listForAdmin(),
    categoriesModel.listForAdmin(),
    draftModel.listBySub(id)
  ]).then(([scatrows,catrows,drrows]) => {
    console.log(catrows);
    res.render("admin/welcome-admin-cate", {
      layout: 'welcome-admin-layout',
      subCate: scatrows,
      Cate: catrows,
      Draft: drrows,
      result: true
    })
  })
  
})

router.get('/welcome/tags', function (req, res, next) {
  Promise.all([
    tagModel.listForAdminWC()
  ]).then(([tagrows]) => {
    res.render("admin/welcome-admin-tags", {
      layout: 'welcome-admin-layout',
      tags: tagrows,
      result: false
    })
  })
  
})

router.post('/welcome/tags', function (req, res, next) {
  var id = parseInt(req.body.Id);
  console.log(id);
  Promise.all([
    tagModel.listForAdminWC(),
    draftModel.listByTag(id)
  ]).then(([tagrows,drrows]) => {
    res.render("admin/welcome-admin-tags", {
      layout: 'welcome-admin-layout',
      tags: tagrows,
      Draft: drrows,
      result: true
    })
  })
  
})

router.get('/welcome/users', function (req, res, next) {
  Promise.all([
    userModel.getSubscriberForWelcome(),
    userModel.getWriterForWelcome(),
    userModel.getEditorForWelcome(),
    subCategoryModel.listForAdmin()
  ]).then(([sb,wr,ed,scate]) => {
    res.render("admin/welcome-admin-users", {
      layout: 'welcome-admin-layout',
      subs: sb,
      wri: wr,
      edi: ed,
      subCate: scate
    })
  })
  
})

router.post('/welcome/update-draft',function (req, res, next) {
  console.log(req.body);
  var idDraft = parseInt(req.body.Id);
  var subCategory = parseInt(req.body.SubCategory);
  var premium = parseInt(req.body.Premium);
  var state = parseInt(req.body.State);
  draftModel.updateByAdmin(idDraft,subCategory,state).then(id => {
    if (state > 3) {
      articleModel.updatePremium(idDraft,premium).then(id => {
        res.redirect("/admin/welcome/drafts");
      });
    } else {
      res.redirect("/admin/welcome/drafts");
    }
  });
})

router.post('/welcome/delete-draft',function (req, res, next) {
  var idDraft = parseInt(req.body.Id);
  Promise.all([
    drafts_tagsModel.deleteByDraft(idDraft),
    rejectdraftsModel.deleteByDraft(idDraft),
    articleModel.singleByDraft(idDraft) 
  ]).then(([i1,i2,art])=>{
    if (art.length > 0){
      console.log(art[0].Id);
      commentModel.deleteByArticle(art[0].Id).then(cmt => {
        articleModel.deleteByDraft(idDraft).then(atc => {
          draftModel.deleteById(idDraft).then(iddr => {
            res.redirect('/admin/welcome/drafts');
          });
        })
      })
    } else {
      draftModel.deleteById(idDraft).then(id => {
        res.redirect('/admin/welcome/drafts');
      });
    }
  });
  
})

router.post('/welcome/update-cate',function (req, res, next) {
  var id = parseInt(req.body.Id);
  var name = req.body.Name;
  categoriesModel.updateName(id,name).then(id => {
      res.redirect("/admin/welcome/categories");
  });
})

router.post('/welcome/update-subcate',function (req, res, next) {
  var id = parseInt(req.body.Id);
  var cate = parseInt(req.body.Category);
  var name = req.body.Name;
  subCategoryModel.updateInfor(id,name,cate).then(id => {
      res.redirect("/admin/welcome/categories");
  });
})

router.post('/welcome/update-tag',function (req, res, next) {
  var id = parseInt(req.body.Id);
  var name = req.body.Name;
  tagModel.updateName(id,name).then(id => {
      res.redirect("/admin/welcome/tags");
  });
})

router.post('/welcome/update-subscriber',function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var Premium = parseInt(req.body.Premium);
  Promise.all([
    userModel.updateInfor(Id,Fullname,Email,Birthday,Avatar),
    userModel.updatePremiumByUser(Id,Premium)
  ]).then(([id1,id2])=> {
    res.redirect('/admin/welcome/users');
  })
})

router.post('/welcome/update-writer',function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var Alias = req.body.Alias;
  Promise.all([
    userModel.updateInfor(Id,Fullname,Email,Birthday,Avatar),
    userModel.updateAliasByUser(Id,Alias)
  ]).then(([id1,id2])=> {
    res.redirect('/admin/welcome/users');
  })
})

router.post('/welcome/update-editor',function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var ManagedCate = parseInt(req.body.ManagedCate);
  Promise.all([
    userModel.updateInfor(Id,Fullname,Email,Birthday,Avatar),
    userModel.updateManagedCate(Id,ManagedCate)
  ]).then(([id1,id2])=> {
    res.redirect('/admin/welcome/users');
  })
})

router.get("/categories",function (req, res) {
  var page = 1;
  var cate = {
    id: 1,
    name: "Công nghệ",
    total: 5,
  };

  var cateData = [{
      id: 2,
      name: "Điện thoại",
      total: 5,
    },
    {
      id: 3,
      name: "Laptop",
      total: 6,
    },
    {
      id: 4,
      name: "Xu hướng",
      total: 12,
    },
    {
      id: 5,
      name: "Lập trình",
      total: 12,
    },
  ];

  var postData = [{
      id: 2,
      image: "/images/articles/2/01.jpg",
      title: "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
      author: "Khánh Hacker",
      date: "30/04/2019",
      category: [{
          id: 1,
          name: "Công nghệ",
        },
        {
          id: 4,
          name: "Xu hướng",
        },
      ],
      abstract: "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc",
    },
    {
      id: 1,
      image: "https://i.gadgets360cdn.com/products/large/1529877080_635_xiaomi_redmi_6_pro.jpg",
      title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
      author: "Nguyên Khang",
      date: "01/05/2019",
      category: [{
          id: 5,
          name: "Lập trình",
        },
        {
          id: 2,
          name: "Điện thoại",
        },
      ],
      abstract: "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé.",
    },
  ];

  res.render("admin/admin-categories", {
    layout: "admin-layout",
    title: "Admin Dashboard",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
    currPage: page,
    currCate: cate,
    cateList: cateData,
    postList: postData,
  });
});

router.get("/tags",function (req, res) {
  var page = 1;
  var tag = {
    id: 1,
    name: "Sự kiện",
    total: 15,
  };
  var tagData = [{
      id: 2,
      name: "Độc",
      total: 5,
    },
    {
      id: 3,
      name: "Lạ",
      total: 6,
    },
    {
      id: 4,
      name: "Vấn đề",
      total: 12,
    },
    {
      id: 5,
      name: "Trải nghiệm",
      total: 12,
    },
  ];
  var postData = [{
      id: 2,
      image: "/images/articles/2/01.jpg",
      title: "Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt",
      author: "Khánh Hacker",
      date: "30/04/2019",
      tag: [{
          id: 5,
          name: "Trải ngiệm",
        },
        {
          id: 3,
          name: "Sự kiện",
        },
      ],
      abstract: "Bật đèn phòng ngủ nhỏ. Đặt độ sáng đèn phòng ngủ nhỏ ở mức 25%. Bật máy lạnh phòng ngủ nhỏ. Bật máy hút bụi. Gắn máy hút bụi vào đế sạc",
    },
    {
      id: 1,
      image: "https://i.gadgets360cdn.com/products/large/1529877080_635_xiaomi_redmi_6_pro.jpg",
      title: "5 tính năng hay nhất của MIUI 10 trên máy Xiaomi",
      author: "Nguyên Khang",
      date: "01/05/2019",
      tag: [{
          id: 1,
          name: "Sự kiện",
        },
        {
          id: 3,
          name: "Lạ",
        },
      ],
      abstract: "6 cái này là những tính năng mình hay sử dụng nhất, và nó giúp mình rất nhiều trong việc dùng con Redmi Note 7 (cũng như nhiều dòng smartphone Xiaomi khác) một cách hiệu quả. Mời anh em đang dùng Xiaomi tham khảo nhé.",
    },
  ];
  res.render("admin/admin-tags", {
    layout: "admin-layout",
    title: "Admin Dashboard",
    currPage: page,
    currTag: tag,
    tagList: tagData,
    postList: postData,
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css"><link rel="stylesheet" href="/stylesheets/category-tag-manager.css">',
  });
});

router.get("/drafts",function (req, res) {
  var postData = [{
      writer: "Ngân Khánh",
      title: "The first post of all",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content: "<h2> Hãy quên hàng phím ảo đi, vuốt hết</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>",
    },
    {
      writer: "Nguyen Khang",
      title: "Nhiều người dùng Việt Nam đã có Facebook Dating, giống với Tinder",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content: "<h2>Something</h2><p>Xiaomi tới giờ là hãng làm thao tác đa nhiệm bằng cảm ứng ngon nhất trong thế giới Android, gần ngang với iPhone. Bạn có thể ẩn hoàn toàn phím điều hướng trên màn hình, để dành đất cho việc hiển thị nội dung. Thay vào đó bạn sẽ:</p><ul><li>Vuốt trái, phải để back</li><li>Vuốt lên để về home</li><li>Vuốt lên và giữ để hiển thị giao diện đa nhiệm</li></ul><p>Những chức năng này nhìn vầy thôi chứ nó cực kì hữu ích và bạn sẽ nhận thấy rõ sự khác biệt do đây là các thao tác bạn làm cực kì thường xuyên, nhiều (chục) lần mỗi khi bạn cầm điện thoại lên.</p><p>Cách bật: Vào Cài đặt > Màn hình tràn cạnh > Cử chỉ màn hình tràn cạnh</p><h2>Cầm máy lên là bật màn hình</h2><p>Trên đa số những chiếc điện thoại Xiaomi đều có cảm biến vân tay, nhưng nó lại nằm sau lưng nên không phải ai cũng thích dùng (do phải với tay ra sau). Bạn cứ setup cảm biến vân tay đi, nhưng song song đó thì cài đặt thêm nhận diện gương mặt nữa. MIUII 10 có tính năng nhận diện rất tốt: đưa lên là bắt đầu quét ngay, khi bạn chưa kịp nhận ra thì máy đã unlock xong và sẵn sàng cho bạn sử dụng. Đôi khi hơi giật mình tí, nhưng vẫn tiết kiệm thời gian hơn và bạn bớt được thao tác so với cảm biến vân tay.</p><p>Cách bật: Cài đặt > Màn hình khóa & mật khẩu > Quản lý dữ liệu khuôn mặt</p><p>Lưu ý: trừ một số dòng điện thoại Mi cao cấp, ví dụ như Mi 8 Explorer Edition, thì các smartphone Mi chỉ nhận diện gương mặt bằng hình ảnh 2D, tức là kém an toàn hơn so với quét 3D hồng ngoại. Những tấm ảnh chụp giả mặt bạn hoàn toàn có thể đánh lừa điện thoại unlock nếu đủ tinh vi. Nếu bạn không ngại lắm về vụ này và ưu tiên sự tiện lợi thì hãy dùng chức năng nhận diện gương mặt.</p>",
    },
    {
      writer: "Nguyen Cong Hung",
      title: "The third post of all",
      link: "#",
      datetime: "Mar 9, 2019 11:11 AM",
      content: '<p>Không phải tính năng gặp gỡ bạn mới - Meet New Friends trước đó mà đây thật sự là 1 tính năng hẹn hò đúng nghĩa của Facebook - Facebook Dating. Và nó vừa chính thức có mặt ở Việt Nam sau đợt cập nhật mới nhất gồm 5 quốc gia: Brazil, Philipin, Việt Nam, Singapore, Malaysia. Tính năng này hiện có mặt ở 14 quốc gia mà thôi. Cách hoạt động của Facebook Dating giống với "quẹt" của những ứng dụng hẹn hò đang phổ biến trên thị trường thay vì chỉ tìm bạn cùng sở thích như Meet New Friends đã có. Sẽ có 2 tùy chọn bên dưới những Profile (hồ sơ) mà Facebook gợi ý là Interested/ thích hoặc Pass/ bỏ qua. Nếu bạn thích 1 người và người đó cũng bấm thích bạn thì "New Matches" - hai người lập tức kết nối và được tạo một cuộc trò chuyện với nhau. Còn nếu xui xẻo, bạn bấm thích một người nhưng họ không chọn bạn thì bạn cũng có thể chủ động nhắn tin cho họ sau khi đã bấm thích. Tất nhiên, trả lời lại hay không là quyền của họ.</p><p>Tuy nhiên, chỉ mới chính thức công bố có mặt ở Việt Nam tối qua theo giờ Việt Nam nên hiện tại, có lẽ mọi thứ vẫn chưa sẵn sàng. Rất nhiều người dùng VN đã được cập nhật tính năng dating nhưng vẫn chưa ai nhìn thấy gì trong mục Profile gợi ý để "quẹt" cả. Có lẽ, mọi thứ sẽ sớm xuất hiện thôi, anh em bình tĩnh và hãy yên tâm rằng "chuyện không của riêng ai". À, Facebook Dating còn có cả Secret Crush để bạn thả thính Crush của mình (chỉ áp dụng cho danh sách bạn bè với tối đa 9 người :)). Nhưng hiện vẫn chưa thấy. Nói chung là từ từ đợi, xem ai hết ế trước :)))</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Profile mà bạn tạo trong mục Dating, cuộc trò chuyện với những người bạn thích đều chỉ nằm trong mục Dating, hoàn toàn không chia sẻ lên nơi khác trên Facebook. Facebook sẽ gợi ý người phù hợp cho bạn dựa trên Profile bạn tạo, tiêu chí hện hò của bạn, những gì bạn làm/ bạn chia sẻ trên Facebook và cả bạn chung của bạn với người kia. Thậm chí, khi bạn tham gia một nhóm/ một sự kiện được tạo trên Facebook thì bạn cũng có thể xem gợi ý kết đôi có trong sự kiện/ nhóm. (hy vọng nhiều anh em group tinhte sẽ sớm ghép đôi với nhau).</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Để bắt đầu sử dụng, bạn chỉ cần tạo một hồ sơ bao gồm giới tính của bạn, giới tính mà bạn muốn kết nối, vị trí của bạn (Facebook sẽ tự định vị, bạn không tự cài được đâu), ảnh đại diện của bạn (tạo xong profile thì có thể thêm nhiều ảnh nữa cho phong phú), viết vài dòng tự giới thiệu về bản thân. Xong!</p> <img class="content-img" src="/images/ava_test.jpg" alt="no"><p>Sau lần đầu tạo Profile, mỗi lần bạn vào tab Dating thì sẽ có 3 mục cơ bản: những profile được gợi ý, những người đã thích bạn, cuộc trò chuyện. Ngoài ra, bạn có thể tùy chỉnh Profile lại bất ức lúc nào trong cài đặt ở góc phải. Bạn có thể điều chỉnh khoảng cách "quét" (tối đa 60 mile (khoảng 97km), thêm thông tin về độ tuổi tìm kiếm, có sẵn sàng có con hay không, tôn giáo, chiều cao - cân nặng, block ai đó/ dừng Matches hoặc xóa Profile bất cứ khi nào bạn muốn hay đã tìm được nửa kia.</p>',
    },
  ];
  res.render("admin/admin-drafts", {
    layout: "admin-layout",
    title: "Quản lý bài viết",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css"> <link rel="stylesheet" href="/stylesheets/editor.css">',
    data: postData,
  });
});

var bagde = {
  users: 0,
  writers: 0,
  editors: 0,
  subscribers: 0,
};
router.get("/users",function (req, res) {
  var postData = [{
      fullname: "Ngân Khánh",
      username: "ngankhanh98",
      type: "Editor",
    },
    {
      fullname: "Nguyên Khang",
      username: "nkhang",
      type: "Subscriber",
    },
    {
      fullname: "Nguyễn Công Hưng",
      username: "ngconghung",
      type: "Writer",
    },
  ];
  res.render("admin/admin-users", {
    layout: "admin-layout",
    title: "Quản lý người dùng",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css">',
    users: bagde.users,
    writer: bagde.writers,
    editor: bagde.editors,
    subscribers: bagde.subscribers,
    data: postData,
  });
});

router.get("/users/edit/ngankhanh98",auth, function (req, res) {
  res.render("admin/admin-users-edit", {
    layout: "admin-layout",
    title: "Chỉnh sửa người dùng",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css">',
    fullname: "Ngân Khánh",
    username: "ngankhanh98",
    type: "Editor",
  });
});

router.get("/users/edit/nkhang", auth,function (req, res) {
  res.render("admin/admin-users-edit", {
    title: "Chỉnh sửa người dùng",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/admin.css">',
    fullname: "Nguyên Khang",
    username: "nkhang",
    type: "Subscriber",
  });
});

module.exports = router;