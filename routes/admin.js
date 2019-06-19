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




router.get('/welcome', function (req, res, next) {
  res.redirect('/admin/welcome/drafts')
})

router.get('/welcome/drafts', function (req, res, next) {
  Promise.all([
    subCategoryModel.All(),
    draftModel.getAllForAdminWC(),
    statesModel.all(),
    tagModel.listForAdminWC()
  ]).then(([scrows, drrows, strows, tagrows]) => {
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
  ]).then(([scatrows, catrows]) => {
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
  ]).then(([scatrows, catrows, drrows]) => {
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
  ]).then(([tagrows, drrows]) => {
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
  ]).then(([sb, wr, ed, scate]) => {
    res.render("admin/welcome-admin-users", {
      layout: 'welcome-admin-layout',
      subs: sb,
      wri: wr,
      edi: ed,
      subCate: scate
    })
  })

})

router.post('/welcome/update-draft', function (req, res, next) {
  console.log(req.body);
  var idDraft = parseInt(req.body.Id);
  var subCategory = parseInt(req.body.SubCategory);
  var premium = parseInt(req.body.Premium);
  var state = parseInt(req.body.State);
  draftModel.updateByAdmin(idDraft, subCategory, state).then(id => {
    if (state > 3) {
      articleModel.updatePremium(idDraft, premium).then(id => {
        res.redirect("/admin/welcome/drafts");
      });
    } else {
      res.redirect("/admin/welcome/drafts");
    }
  });
})

router.post('/welcome/delete-draft', function (req, res, next) {
  var idDraft = parseInt(req.body.Id);
  Promise.all([
    drafts_tagsModel.deleteByDraft(idDraft),
    rejectdraftsModel.deleteByDraft(idDraft),
    articleModel.singleByDraft(idDraft)
  ]).then(([i1, i2, art]) => {
    if (art.length > 0) {
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

router.post('/welcome/update-cate', function (req, res, next) {
  var id = parseInt(req.body.Id);
  var name = req.body.Name;
  categoriesModel.updateName(id, name).then(id => {
    res.redirect("/admin/welcome/categories");
  });
})

router.post('/welcome/update-subcate', function (req, res, next) {
  var id = parseInt(req.body.Id);
  var cate = parseInt(req.body.Category);
  var name = req.body.Name;
  subCategoryModel.updateInfor(id, name, cate).then(id => {
    res.redirect("/admin/welcome/categories");
  });
})

router.post('/welcome/update-tag', function (req, res, next) {
  var id = parseInt(req.body.Id);
  var name = req.body.Name;
  tagModel.updateName(id, name).then(id => {
    res.redirect("/admin/welcome/tags");
  });
})

router.post('/welcome/update-subscriber', function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var Premium = parseInt(req.body.Premium);
  Promise.all([
    userModel.updateInfor(Id, Fullname, Email, Birthday, Avatar),
    userModel.updatePremiumByUser(Id, Premium)
  ]).then(([id1, id2]) => {
    res.redirect('/admin/welcome/users');
  })
})

router.post('/welcome/update-writer', function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var Alias = req.body.Alias;
  Promise.all([
    userModel.updateInfor(Id, Fullname, Email, Birthday, Avatar),
    userModel.updateAliasByUser(Id, Alias)
  ]).then(([id1, id2]) => {
    res.redirect('/admin/welcome/users');
  })
})

router.post('/welcome/update-editor', function (req, res, next) {
  var Id = parseInt(req.body.Id);
  var Fullname = req.body.Fullname;
  var Email = req.body.Email;
  var Birthday = req.body.Birthday;
  var Avatar = req.body.Avatar;
  var ManagedCate = parseInt(req.body.ManagedCate);
  Promise.all([
    userModel.updateInfor(Id, Fullname, Email, Birthday, Avatar),
    userModel.updateManagedCate(Id, ManagedCate)
  ]).then(([id1, id2]) => {
    res.redirect('/admin/welcome/users');
  })
})

router.post('/welcome/add-cate', function (req, res, next) {
  var name = req.body.Name;
  categoriesModel.add(name).then(rows => {
    res.redirect('/admin/welcome/categories');
  })
})

router.post('/welcome/add-subcate', function (req, res, next) {
  var name = req.body.Name;
  var Category = parseInt(req.body.Category);
  subCategoryModel.add(name, Category).then(rows => {
    res.redirect('/admin/welcome/categories');
  })
})

router.post('/welcome/add-tag', function (req, res, next) {
  var name = req.body.Name;
  tagModel.add(name).then(rows => {
    res.redirect('/admin/welcome/tags');
  })
})

module.exports = router;