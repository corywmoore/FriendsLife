webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/activities/activities.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">\n  Availability for NAME</h3>\n<div class=\"form-container\">\n  <h4>\n    Thank you for choosing Performing Arts.\n    <br>\n    <small>Change Selection</small>\n  </h4>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <h3>Which one is your favorite activity?</h3>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-4\">\n      <div class=\"card activity\" (click)=\"activityClicked($event, 1)\">\n        <div class=\"card-block\">\n          Title\n\n          <img src=\"\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-4\">\n      <div class=\"card activity\" (click)=\"activityClicked($event, 2)\">\n        <div class=\"card-block\">\n          Title\n          <img src=\"\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-4\">\n      <div class=\"card activity\" (click)=\"activityClicked($event, 3)\">\n        <div class=\"card-block\">\n          Title\n          <img src=\"\">\n        </div>\n      </div>\n    </div>\n  </div>\n  <hr>\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <h4>Please choose the skill level:</h4>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-4\">\n      <div class=\"card skills\" (click)=\"skillClicked($event, 'Beginner')\">\n        <div class=\"card-block\">\n          Beginner\n        </div>\n      </div>\n    </div>\n    <div class=\"col-4\">\n      <div class=\"card skills\" (click)=\"skillClicked($event, 'Intermediate')\">\n        <div class=\"card-block\">\n          Intermediate\n        </div>\n      </div>\n    </div>\n    <div class=\"col-4\">\n      <div class=\"card skills\" (click)=\"skillClicked($event, 'Advanced')\">\n        <div class=\"card-block\">\n          Advanced\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row mt-3\" *ngIf=\"warning\">\n    <div class=\"col-12\">\n      <div class=\"alert alert-warning\">\n        Please complete the page before moving forward.\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"btn btn-primary mt-5\" (click)=\"submitActivities()\">Next</div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"mt-2\" (click)=\"resetActivities()\">Reset</div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/activities/activities.component.scss":
/***/ (function(module, exports) {

module.exports = ".green-activity {\n  background-color: #7ED321;\n  color: #fff; }\n\n.yellow-activity {\n  background-color: #FFD100;\n  color: #fff; }\n\n.red-activity {\n  background-color: #EF0000;\n  color: #fff; }\n\n.card {\n  padding-top: 35px;\n  padding-bottom: 35px; }\n"

/***/ }),

/***/ "./src/app/activities/activities.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitiesComponent; });
/* unused harmony export ActivityModel */
/* unused harmony export ActivitySelectionModel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActivitiesComponent = /** @class */ (function () {
    function ActivitiesComponent(renderer, ref, router) {
        this.renderer = renderer;
        this.ref = ref;
        this.router = router;
        this.activitiesSelection = [];
        this.activities = [];
        this.currentRank = 1;
        this.colors = ['green-activity', 'yellow-activity', 'red-activity'];
        this.warning = false;
    }
    ActivitiesComponent.prototype.ngOnInit = function () {
    };
    ActivitiesComponent.prototype.submitActivities = function () {
        if (this.activitiesSelection.length < 3 || !this.currentSkill) {
            this.warning = true;
        }
        else {
            this.router.navigate(['selections']);
        }
    };
    ActivitiesComponent.prototype.resetActivities = function () {
        this.currentRank = 1;
        this.activitiesSelection = [];
        var els = document.getElementsByClassName('activity');
        for (var i = els.length - 1; i >= 0; i--) {
            for (var j = this.colors.length - 1; j >= 0; j--) {
                els[i].classList.remove(this.colors[j]);
            }
        }
        this.warning = false;
    };
    ActivitiesComponent.prototype.activityClicked = function ($event, id) {
        var index = __WEBPACK_IMPORTED_MODULE_1_lodash__["findIndex"](this.activitiesSelection, function (item) {
            return id === item.id;
        });
        var el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;
        if (index < 0) {
            var am = new ActivitySelectionModel();
            am.id = id;
            am.rank = this.currentRank;
            this.currentRank++;
            this.activitiesSelection.push(am);
            this.renderer.setElementClass(el, this.colors[am.rank - 1], true);
            this.warning = false;
        }
        this.warning = false;
    };
    ActivitiesComponent.prototype.skillClicked = function ($event, skill) {
        var els = document.getElementsByClassName('skills');
        for (var i = els.length - 1; i >= 0; i--) {
            for (var j = this.colors.length - 1; j >= 0; j--) {
                els[i].classList.remove(this.colors[0]);
            }
        }
        var el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;
        this.currentSkill = skill;
        this.renderer.setElementClass(el, this.colors[0], true);
        this.warning = false;
    };
    ActivitiesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-activities',
            template: __webpack_require__("./src/app/activities/activities.component.html"),
            styles: [__webpack_require__("./src/app/activities/activities.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], ActivitiesComponent);
    return ActivitiesComponent;
}());

var ActivityModel = /** @class */ (function () {
    function ActivityModel() {
    }
    return ActivityModel;
}());

var ActivitySelectionModel = /** @class */ (function () {
    function ActivitySelectionModel() {
    }
    return ActivitySelectionModel;
}());



/***/ }),

/***/ "./src/app/admin/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">System Admin</h3>\n<div class=\"row\">\n  <div class=\"col-sm-4\">\n    <div class=\"card\">\n      <div class=\"card-block pointer\" routerLink=\"/friends-life-management/users\">\n        <h3>\n          Users\n        </h3>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-sm-4\">\n    <div class=\"card\">\n      <div class=\"card-block pointer\" routerLink=\"/friends-life-management/categories\">\n        <h3>\n          Categories\n        </h3>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-sm-4\">\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <h3>\n          Activities\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-sm-4\">\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <h3>\n          Friends\n        </h3>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-sm-4\">\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <h3>\n          Export\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/admin/admin.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminComponent = /** @class */ (function () {
    function AdminComponent(router) {
        this.router = router;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin',
            template: __webpack_require__("./src/app/admin/admin/admin.component.html"),
            styles: [__webpack_require__("./src/app/admin/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/categories/categories.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">\n  Manage Categories\n  <span class=\"btn btn-primary float-right pointer\" (click)=\"addCategory()\">Add Category</span>\n</h3>\n\n<div *ngIf=\"!addCategoryView\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th scope=\"col\">Name</th>\n        <!--<th scope=\"col\">Description</th>-->\n        <th scope=\"col\">Active</th>\n      </tr>\n    </thead>\n    <tbody  *ngFor=\"let category of categories\">\n      <tr>\n        <td>{{category.name}}</td>\n        <!--<td>Cook some stuff</td>-->\n        <td *ngIf=\"!category.active\">\n          <h2 class=\"red\">X</h2>\n        </td>\n        <td *ngIf=\"category.active\">\n          <h2 class=\"green\">✓</h2>\n        </td>\n      </tr>\n      <!--<tr>-->\n        <!--<td>Art</td>-->\n        <!--<td>Paint some stuff</td>-->\n        <!--<td>-->\n          <!--<h2 class=\"red\">X</h2>-->\n        <!--</td>-->\n      <!--</tr>-->\n      <!--<tr>-->\n        <!--<td>Shop</td>-->\n        <!--<td>Build some stuff</td>-->\n        <!--<td>-->\n          <!--<h2 class=\"green\">✓</h2>-->\n        <!--</td>-->\n      <!--</tr>-->\n    </tbody>\n  </table>\n</div>\n<div *ngIf=\"addCategoryView\">\n  <div class=\"form-container\">\n    <form #homeForm='ngForm'>\n      <div>\n        <label class=\"txt-green\">Category Name</label>\n      </div>\n      <div class=\"center input-username\">\n        <input type=\"text\" placeholder=\"Category\" (ngModel)=\"name\" name=\"name\" class=\"txt\">\n      </div>\n\n      <div>\n        <label class=\"txt-green txt-password\">Description</label>\n      </div>\n      <div class=\"center\">\n        <input type=\"text\" placeholder=\"Description\" (ngModel)=\"description\" name=\"description\" class=\"txt\">\n      </div>\n      <div>\n        <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"cancelAddCategory()\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"submitAddCategory()\">Submit</button>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/categories/categories.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/categories/categories.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_admin_service__ = __webpack_require__("./src/app/services/admin/admin.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(adminService) {
        this.adminService = adminService;
        this.addCategoryView = false;
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.categories = this.adminService.getCategories();
    };
    CategoriesComponent.prototype.addCategory = function () {
        this.addCategoryView = true;
        console.log('add Cat');
    };
    CategoriesComponent.prototype.cancelAddCategory = function () {
        console.log('cancel cat');
        this.addCategoryView = false;
    };
    CategoriesComponent.prototype.submitAddCategory = function () {
        console.log('submit cat');
        this.addCategoryView = false;
    };
    CategoriesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-categories',
            template: __webpack_require__("./src/app/admin/categories/categories.component.html"),
            styles: [__webpack_require__("./src/app/admin/categories/categories.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_admin_admin_service__["a" /* AdminService */]])
    ], CategoriesComponent);
    return CategoriesComponent;
}());



/***/ }),

/***/ "./src/app/admin/friends/friends.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"form-container\">\n    <form #editFriendForm='ngForm'>\n        <div>\n            <input type=\"hidden\" name=\"id\" #id=\"ngModel\" [(ngModel)]=\"selectedFriend.id\">\n            <div>\n                <label class=\"txt-green add-text-height\">Friends:</label>\n            </div>\n            <div class=\"row input-div\">\n                <div class=\"form-group col-xs-4 d-flex flex-column\">\n                    <label class=\"txt-green txt-group\">Firstname</label>\n                    <input type=\"text\" placeholder=\"Firstname\" [(ngModel)]=\"selectedFriend.firstname\" name=\"firstname\" class=\"txt txt-input\">\n                </div>\n                <div class=\"form-group col-xs-4 d-flex flex-column\">\n                    <label class=\"txt-green txt-group\">Lastname</label>\n                    <input type=\"text\" placeholder=\"Lastname\" [(ngModel)]=\"selectedFriend.lastname\" name=\"lastname\" class=\"txt txt-input\">\n                </div>\n                <div class=\"form-group col-xs-4 d-flex flex-column\">\n                    <label class=\"txt-green txt-group\">Nickname</label>\n                    <input type=\"text\" placeholder=\"Nickname\" [(ngModel)]=\"selectedFriend.nickname\" name=\"nickname\" class=\"txt txt-input\">\n                </div>\n            </div>\n\n        </div>\n    </form>\n</div>\n\n<div class=\"container\">\n    <table class=\"table table-hover\">\n        <tr>\n            <th>Name</th>\n            <th>Nickname</th>\n        </tr>\n        <tr class=\"table-striped\" *ngFor=\"let friend of friends\" (click)=\"onFriendClick(friend)\">\n            <td>{{friend.firstname}} {{friend.lastname}}</td>\n            <td>{{friend.nickname}}</td>\n            <td>\n                <div class=\"col-md-4\">\n                    <button type=\"submit\" class=\"btn btn-primary\" (click)=\"friendEdit(editFriendForm)\">\n            <span class=\"fa fa-floppy-o\"></span><i class=\"fas fa-pencil-alt\"></i></button>\n                </div>\n            </td>\n            <td>\n                <div class=\"col-md-4\">\n                    <button type=\"button\" class=\"btn btn-danger\" (click)=\"friendDelete(editFriendForm)\">\n            <span class=\"fa fa-trash\"></span><i class=\"fa-trash\"></i></button>\n                </div>\n            </td>\n        </tr>\n    </table>\n</div>"

/***/ }),

/***/ "./src/app/admin/friends/friends.component.scss":
/***/ (function(module, exports) {

module.exports = ".input-div {\n  margin-left: 1px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.txt-group {\n  margin-right: 115px;\n  margin-bottom: 1px; }\n\n.txt-input {\n  border: 1px solid grey;\n  border-radius: 6px;\n  width: 150px;\n  height: 40px;\n  margin-right: 15px; }\n"

/***/ }),

/***/ "./src/app/admin/friends/friends.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_friend_model__ = __webpack_require__("./src/app/models/friend.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FriendsComponent = /** @class */ (function () {
    function FriendsComponent() {
        this.selectedFriend = new __WEBPACK_IMPORTED_MODULE_1__models_friend_model__["a" /* Friend */]();
        this.friends = [];
    }
    FriendsComponent.prototype.ngOnInit = function () {
        this.friends = [{ id: 1,
                firstname: 'fasfsd',
                lastname: 'fsdfdsdf',
                nickname: 'fsafsdfs' }];
    };
    FriendsComponent.prototype.onFriendClick = function (friend) {
        this.selectedFriend = friend;
    };
    FriendsComponent.prototype.friendEdit = function (editFriendForm) {
        this.friends.map(function (f) {
            if (f.id === editFriendForm.value.id)
                f = editFriendForm.value;
        });
        this.resetForm();
    };
    FriendsComponent.prototype.friendDelete = function (editFriendForm) {
        var tempArray = [];
        this.friends.map(function (f) {
            if (f.id != editFriendForm.value.id)
                tempArray.push(f);
        });
        this.friends = tempArray;
        this.resetForm();
    };
    FriendsComponent.prototype.resetForm = function () {
        this.selectedFriend = new __WEBPACK_IMPORTED_MODULE_1__models_friend_model__["a" /* Friend */]();
    };
    FriendsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-friends',
            template: __webpack_require__("./src/app/admin/friends/friends.component.html"),
            styles: [__webpack_require__("./src/app/admin/friends/friends.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FriendsComponent);
    return FriendsComponent;
}());



/***/ }),

/***/ "./src/app/admin/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"form-container\">\n  <form #addUserForm='ngForm'>\n    <div *ngIf=\"selectedUser.id == null\">\n      <input type=\"hidden\" name=\"id\" #id=\"ngModel\" [(ngModel)]=\"selectedUser.id\">\n      <div>\n        <label class=\"txt-green add-text-height\">Add a new User:</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"form-group offset-2 col-xs-4 d-flex flex-column\">\n          <label class=\"txt-green txt-group\">Username</label>\n          <input type=\"text\" placeholder=\"Username\" [(ngModel)]=\"selectedUser.username\" name=\"username\" class=\"txt txt-input\">\n        </div>\n        <div class=\"form-group col-xs-4 d-flex flex-column\">\n          <label class=\"txt-green txt-group\">Password</label>\n          <input type=\"text\" placeholder=\"Password\" [(ngModel)]=\"selectedUser.password\" name=\"password\" class=\"txt txt-input\">\n        </div>\n        <div class=\"add-user-button\">\n          <button type=\"button\" (click)=\"userAdd(addUserForm)\" class=\"btn btn-primary\">Add new user</button>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"selectedUser.id != null\">\n      <input type=\"hidden\" name=\"id\" #id=\"ngModel\" [(ngModel)]=\"selectedUser.id\">\n      <div>\n        <label class=\"txt-green add-text-height\">Edit User:</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"form-group offset-2 col-xs-4 d-flex flex-column\">\n          <label class=\"txt-green txt-group\">Username</label>\n          <input type=\"text\" placeholder=\"Username\" [(ngModel)]=\"selectedUser.username\" name=\"username\" class=\"txt txt-input\">\n        </div>\n        <div class=\"form-group col-xs-4 d-flex flex-column\">\n          <label class=\"txt-green txt-group\">Password</label>\n          <input type=\"text\" placeholder=\"Password\" [(ngModel)]=\"selectedUser.password\" name=\"password\" class=\"txt txt-input\">\n        </div>\n        <div class=\"col-md-4\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"userEdit(addUserForm)\" >\n            <span class=\"fa fa-floppy-o\"></span> Edit User</button>\n        </div>\n        <div class=\"col-md-4\">\n          <button type=\"button\" class=\"btn btn-danger\" (click) =\"userDelete(addUserForm)\">\n            <span class=\"fa fa-trash\"></span> Delete User</button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"container\">\n  <table class=\"table table-hover\">\n    <tr>\n      <th>User</th>\n    </tr>\n    <tr class=\"table-striped\" *ngFor=\"let user of users\" (click)=\"onUserClick(user)\">\n      <td>{{user.username}}</td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/users/users.component.scss":
/***/ (function(module, exports) {

module.exports = ".add-user-button {\n  margin-top: 30px; }\n"

/***/ }),

/***/ "./src/app/admin/users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__("./src/app/models/user.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsersComponent = /** @class */ (function () {
    function UsersComponent() {
        this.selectedUser = new __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */]();
        this.users = [];
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.users = [{ id: 1,
                username: 'fasfsd',
                password: 'fsdfdsdf' }];
    };
    UsersComponent.prototype.userAdd = function (dataForm) {
        dataForm.value.id = new Date().getTime() * -1;
        this.users.push(dataForm.value);
        this.resetForm();
    };
    UsersComponent.prototype.onUserClick = function (user) {
        this.selectedUser = user;
    };
    UsersComponent.prototype.userEdit = function (addUserForm) {
        this.users.map(function (u) {
            if (u.id === addUserForm.value.id)
                u = addUserForm.value;
        });
        this.resetForm();
    };
    UsersComponent.prototype.userDelete = function (addUserForm) {
        var tempArray = [];
        this.users.map(function (u) {
            if (u.id != addUserForm.value.id)
                tempArray.push(u);
        });
        this.users = tempArray;
        this.resetForm();
    };
    UsersComponent.prototype.resetForm = function () {
        this.selectedUser = new __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */]();
    };
    UsersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-users',
            template: __webpack_require__("./src/app/admin/users/users.component.html"),
            styles: [__webpack_require__("./src/app/admin/users/users.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__friend_friend_component__ = __webpack_require__("./src/app/friend/friend.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin_admin_component__ = __webpack_require__("./src/app/admin/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__availability_availability_component__ = __webpack_require__("./src/app/availability/availability.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_users_users_component__ = __webpack_require__("./src/app/admin/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_categories_categories_component__ = __webpack_require__("./src/app/admin/categories/categories.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activities_activities_component__ = __webpack_require__("./src/app/activities/activities.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__selections_selections_component__ = __webpack_require__("./src/app/selections/selections.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_friends_friends_component__ = __webpack_require__("./src/app/admin/friends/friends.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
    { path: 'friend', component: __WEBPACK_IMPORTED_MODULE_3__friend_friend_component__["a" /* FriendComponent */] },
    { path: 'friends-life-management', component: __WEBPACK_IMPORTED_MODULE_4__admin_admin_admin_component__["a" /* AdminComponent */] },
    { path: 'availability', component: __WEBPACK_IMPORTED_MODULE_5__availability_availability_component__["a" /* AvailabilityComponent */] },
    { path: 'friends-life-management/categories', component: __WEBPACK_IMPORTED_MODULE_7__admin_categories_categories_component__["a" /* CategoriesComponent */] },
    { path: 'activities', component: __WEBPACK_IMPORTED_MODULE_8__activities_activities_component__["a" /* ActivitiesComponent */] },
    { path: 'friends-life-management/users', component: __WEBPACK_IMPORTED_MODULE_6__admin_users_users_component__["a" /* UsersComponent */] },
    { path: 'selections', component: __WEBPACK_IMPORTED_MODULE_9__selections_selections_component__["a" /* SelectionsComponent */] },
    { path: 'friends-life-management/friends', component: __WEBPACK_IMPORTED_MODULE_10__admin_friends_friends_component__["a" /* FriendsComponent */] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container-fluid\">\n  <nav class=\"navbar navbar-expand-lg navbar-light bg-light w-100\">\n    <div class=\"navbar-logo mx-auto\">\n      <img src=\"/assets/FLC_Logo.png\" width=\"140\" height=\"109\" alt=\"\">\n    </div>\n    <form class=\"form-inline float-right\">\n      <button class=\"btn btn-outline-secondary my-2 my-sm-0\" type=\"submit\">Logout</button>\n    </form>\n  </nav>\n</div>\n\n<div style=\"text-align:center\">\n  <router-outlet></router-outlet>\n</div>\n\n<footer class=\"footer bg-light\">\n  <p>Friends Life Community</p>\n</footer>\n\n\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ".navbar {\n  padding: 30px; }\n\n.container-fluid {\n  padding: 0; }\n\n.footer {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  color: #386387;\n  text-align: center; }\n\n.navbar-logo {\n  padding-left: 10%; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_admin_admin_component__ = __webpack_require__("./src/app/admin/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__friend_friend_component__ = __webpack_require__("./src/app/friend/friend.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__availability_availability_component__ = __webpack_require__("./src/app/availability/availability.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_categories_categories_component__ = __webpack_require__("./src/app/admin/categories/categories.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__admin_users_users_component__ = __webpack_require__("./src/app/admin/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__activities_activities_component__ = __webpack_require__("./src/app/activities/activities.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__selections_selections_component__ = __webpack_require__("./src/app/selections/selections.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__admin_friends_friends_component__ = __webpack_require__("./src/app/admin/friends/friends.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_admin_admin_service__ = __webpack_require__("./src/app/services/admin/admin.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__admin_admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__friend_friend_component__["a" /* FriendComponent */],
                __WEBPACK_IMPORTED_MODULE_9__availability_availability_component__["a" /* AvailabilityComponent */],
                __WEBPACK_IMPORTED_MODULE_10__admin_categories_categories_component__["a" /* CategoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_11__admin_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_12__activities_activities_component__["a" /* ActivitiesComponent */],
                __WEBPACK_IMPORTED_MODULE_13__selections_selections_component__["a" /* SelectionsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__admin_friends_friends_component__["a" /* FriendsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_16__services_admin_admin_service__["a" /* AdminService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/availability/availability.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">Availability for NAME</h3>\n<div class=\"form-container\">\n  <h4>Please select the availability days and times:</h4>\n</div>\n<div class=\"selection\">\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <h5>Monday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Tuesday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Wednesday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Thursday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Friday</h5>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'AM','Monday')\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'AM','Tuesday')\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'AM','Wednesday')\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'AM','Thursday')\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'AM','Friday')\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'PM','Monday')\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'PM','Tuesday')\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'PM','Wednesday')\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'PM','Thursday')\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\" (click)=\"dateTimeClicked($event, 'PM','Friday')\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"alert alert-warning\" *ngIf=\"warning\">\n  Please choose a day and time.\n</div>\n<div>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"validateAndRoute()\">Next</button>\n</div>\n\n"

/***/ }),

/***/ "./src/app/availability/availability.component.scss":
/***/ (function(module, exports) {

module.exports = ".selection {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n  .selection [class^=\"col-\"] {\n    padding-left: 3px;\n    padding-right: 3px; }\n  .selection .card {\n    padding-top: 35px;\n    padding-bottom: 35px;\n    margin-bottom: 6px;\n    cursor: pointer;\n    border-radius: 6px; }\n  .green-bg {\n  background-color: #7ED321;\n  color: white; }\n"

/***/ }),

/***/ "./src/app/availability/availability.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailabilityComponent; });
/* unused harmony export DateTimeSelection */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AvailabilityComponent = /** @class */ (function () {
    function AvailabilityComponent(renderer, router) {
        this.renderer = renderer;
        this.router = router;
        this.selection = [];
        this.warning = false;
    }
    AvailabilityComponent.prototype.ngOnInit = function () {
    };
    AvailabilityComponent.prototype.dateTimeClicked = function ($event, time, day) {
        var index = __WEBPACK_IMPORTED_MODULE_2_lodash__["findIndex"](this.selection, function (item) {
            return day === item.day && time === item.time;
        });
        var el = ($event.target.childElementCount > 0) ? $event.target : $event.target.parentElement;
        if (index < 0) {
            var dt = new DateTimeSelection();
            dt.day = day;
            dt.time = time;
            this.selection.push(dt);
            this.renderer.setElementClass(el, 'green-bg', true);
            this.warning = false;
        }
        else {
            this.selection.splice(index, 1);
            this.renderer.setElementClass(el, 'green-bg', false);
        }
        console.log(this.selection);
    };
    AvailabilityComponent.prototype.validateAndRoute = function () {
        if (this.selection.length < 1) {
            this.warning = true;
        }
        else {
            this.router.navigate(['activities']);
        }
    };
    AvailabilityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-availability',
            template: __webpack_require__("./src/app/availability/availability.component.html"),
            styles: [__webpack_require__("./src/app/availability/availability.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());

var DateTimeSelection = /** @class */ (function () {
    function DateTimeSelection() {
    }
    return DateTimeSelection;
}());



/***/ }),

/***/ "./src/app/friend/friend.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">\n    Welcome, {{ userName }}!\n</h3>\n<div class=\"form-container\">\n    <form #selectStudentForm='ngForm'>\n        <div>\n            <label class=\"txt-green txt-student\">Please select a student's name:</label>\n        </div>\n        <div class=\"center input-username\">\n            <select class=\"select-student\" id=\"student\" [(ngModel)]=\"student\" [ngModelOptions]=\"{standalone: true}\">\n        <option *ngFor=\"let student of students\" [ngValue]=\"student\">{{student.name}}</option>\n      </select>\n        </div>\n        <div>\n            <button type=\"button\" (click)=\"studentSelect(selectStudentForm)\" class=\"btn btn-primary\">Next</button>\n        </div>\n    </form>\n</div>\n\n<hr class=\"line\">\n\n<div class=\"form-container\">\n    <form #addStudentForm='ngForm'>\n        <div>\n            <label class=\"txt-green add-text-height\">Add a new student:</label>\n            <p class=\"txt-blue sub-student\">Please enter their full name</p>\n        </div>\n        <div class=\"row input-div\">\n            <div class=\"form-group col-xs-4 d-flex flex-column\">\n                <label class=\"txt-green txt-group\">First</label>\n                <input type=\"text\" placeholder=\"First\" (ngModel)=\"firstname\" name=\"firstname\" class=\"txt txt-input\">\n            </div>\n            <div class=\"form-group col-xs-4 d-flex flex-column\">\n                <label class=\"txt-green txt-group\">Last</label>\n                <input type=\"text\" placeholder=\"Last\" (ngModel)=\"lastname\" name=\"lastname\" class=\"txt txt-input\">\n            </div>\n            <div class=\"form-group col-xs-4 d-flex flex-column\">\n                <label class=\"txt-green txt-group\">First</label>\n                <input type=\"text\" placeholder=\"Nickname\" (ngModel)=\"nickname\" name=\"nickname\" class=\"txt txt-input\">\n            </div>\n\n        </div>\n        <div class=\"add-student-button\">\n            <button type=\"button\" (click)=\"studentAdd(addStudentForm)\" class=\"btn btn-primary\">Next</button>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/friend/friend.component.scss":
/***/ (function(module, exports) {

module.exports = ".center {\n  text-align: center; }\n\n.home-header {\n  margin-top: 50px;\n  margin-bottom: 25px; }\n\n.txt-blue {\n  color: #386387; }\n\n.txt-green {\n  color: #65A542; }\n\n.btn {\n  background-color: #043967;\n  border-color: #043967;\n  font-color: white;\n  width: 125px;\n  margin-bottom: 30px; }\n\n.select-student {\n  margin-bottom: 25px; }\n\n.line {\n  width: 700px; }\n\n.add-text-height {\n  font-size: 22px; }\n\n.sub-student {\n  font-size: 12px; }\n\n.txt-input {\n  border: 1px solid grey;\n  border-radius: 6px;\n  width: 150px;\n  height: 40px;\n  margin-right: 15px; }\n\n::-webkit-input-placeholder {\n  /* Chrome/Opera/Safari */\n  padding-left: 10px; }\n\n::-moz-placeholder {\n  /* Firefox 19+ */\n  padding-left: 10px; }\n\n:-ms-input-placeholder {\n  /* IE 10+ */\n  padding-left: 10px; }\n\n:-moz-placeholder {\n  /* Firefox 18- */\n  padding-left: 10px; }\n\n.add-student-button {\n  margin-top: 30px; }\n\n.txt-group {\n  margin-right: 115px;\n  margin-bottom: 1px; }\n\n.input-div {\n  margin-left: 1px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n"

/***/ }),

/***/ "./src/app/friend/friend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FriendComponent = /** @class */ (function () {
    function FriendComponent(router) {
        this.router = router;
        this.state = '';
        this.students = [];
    }
    FriendComponent.prototype.ngOnInit = function () {
    };
    FriendComponent.prototype.studentSelect = function (formData) {
        console.log("formData", formData.value);
        console.log("this", this);
        this.router.navigate(['availability']);
    };
    FriendComponent.prototype.studentAdd = function (formData) {
        console.log("formData", formData.value);
        console.log("this", this);
        this.router.navigate(['availability']);
    };
    FriendComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-friend',
            template: __webpack_require__("./src/app/friend/friend.component.html"),
            styles: [__webpack_require__("./src/app/friend/friend.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], FriendComponent);
    return FriendComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">\n  Welcome to Friend's Life class selection!\n</h3>\n<div class=\"form-container\">\n  <form #homeForm='ngForm'>\n    <div>\n      <label class=\"txt-green txt-username\">Username</label>\n    </div>\n    <div class=\"center input-username\">\n      <input type=\"text\" placeholder=\"Username\" (ngModel)=\"username\" name=\"username\" class=\"txt username\">\n    </div>\n\n    <div>\n      <label class=\"txt-green txt-password\">Password</label>\n    </div>\n    <div class=\"center input-password\">\n      <input type=\"text\" placeholder=\"Password\" (ngModel)=\"password\" name=\"password\" class=\"txt password\">\n    </div>\n    <div>\n      <button type=\"button\" (click)=\"next(homeForm)\" class=\"btn btn-primary\">Next</button>\n    </div>\n  </form>\n</div>\n\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ".txt-username {\n  margin-left: -200px;\n  margin-bottom: -10px; }\n\n.txt-password {\n  margin-left: -200px;\n  margin-bottom: -10px; }\n\n.input-username {\n  margin-bottom: 10px; }\n\n.input-password {\n  margin-bottom: 50px; }\n\n.username {\n  border: 1px solid grey;\n  border-radius: 6px;\n  width: 275px;\n  height: 40px; }\n\n.password {\n  border: 1px solid grey;\n  border-radius: 6px;\n  width: 275px;\n  height: 40px; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_admin_service__ = __webpack_require__("./src/app/services/admin/admin.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, adminService) {
        this.router = router;
        this.adminService = adminService;
        this.state = '';
        this.username = '';
        this.password = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.next = function (formData) {
        console.log("formData", formData.value);
        console.log("this", this);
        // debugger;
        this.adminService.logIn(formData.value.username, formData.value.password);
        // this.router.navigate(['friend']);
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_admin_admin_service__["a" /* AdminService */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/models/friend.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Friend; });
var Friend = /** @class */ (function () {
    function Friend() {
        this.firstname = '';
        this.lastname = '';
        this.nickname = '';
    }
    return Friend;
}());



/***/ }),

/***/ "./src/app/models/user.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
        this.username = '';
        this.password = '';
    }
    return User;
}());



/***/ }),

/***/ "./src/app/selections/selections.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"txt-blue home-header\">NAME's Program Preferences: </h3>\n<div class=\"form-container\">\n  <h4>Please select the availability days and times:</h4>\n</div>\n<div class=\"selection\">\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <h5>Monday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Tuesday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Wednesday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Thursday</h5>\n    </div>\n    <div class=\"col-2\">\n      <h5>Friday</h5>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <div class=\"card \">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card green-bg\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Morning</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-2 offset-1\">\n      <div class=\"card\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card green-bg\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n    <div class=\"col-2\">\n      <div class=\"card\">\n        <div class=\"card-block\">Afternoon</div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-8 offset-2 col-sm-12\">\n    <h4>Based on the availability of your schedule, here are your top selected categories and activities</h4>\n  </div>\n</div>\n\n<div class=\"container skills text-left\">\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"card m-3\">\n            <div class=\"card-block\">\n              <h3>\n                Title\n                <br>\n                <small>BEGINNER</small>\n              </h3>\n              <hr>\n              <ol type=\"1\">\n                <li class=\"bold\">Skill 1</li>\n                <li>Skill 2</li>\n                <li>Skill 3</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n      </div>  \n</div>\n"

/***/ }),

/***/ "./src/app/selections/selections.component.scss":
/***/ (function(module, exports) {

module.exports = ".selection {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n  .selection [class^=\"col-\"] {\n    padding-left: 3px;\n    padding-right: 3px; }\n  .selection .card {\n    padding-top: 35px;\n    padding-bottom: 35px;\n    margin-bottom: 6px;\n    cursor: pointer;\n    border-radius: 6px; }\n  .green-bg {\n  background-color: #7ED321;\n  color: white; }\n  .skills .card-block {\n  padding: 30px; }\n  .skills .card-block h3 {\n    color: #7ED321;\n    font-weight: 300; }\n  .skills .card-block h3 small {\n      color: #EF0000;\n      font-size: 14px;\n      font-weight: 300; }\n  .skills .card-block ol {\n    padding-left: 18px; }\n"

/***/ }),

/***/ "./src/app/selections/selections.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectionsComponent = /** @class */ (function () {
    function SelectionsComponent() {
    }
    SelectionsComponent.prototype.ngOnInit = function () {
    };
    SelectionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-selections',
            template: __webpack_require__("./src/app/selections/selections.component.html"),
            styles: [__webpack_require__("./src/app/selections/selections.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SelectionsComponent);
    return SelectionsComponent;
}());



/***/ }),

/***/ "./src/app/services/admin/admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Authorization', 'B37C60B6C25DC12E3809D89D85A75E92')
            .set('Content-Type', 'application/json');
        console.log("headers", headers);
        return headers;
    };
    AdminService.prototype.getCategories = function () {
        this.http.get('https://mighty-hollows-34327.herokuapp.com/fl/category', { headers: this.getHeaders() }).subscribe(function (data) {
            console.log(data);
        });
    };
    AdminService.prototype.logIn = function (userId, pw) {
        this.http.get("https://mighty-hollows-34327.herokuapp.com/login?loginId=" + userId + "&password=" + pw, {}).subscribe(function (data) {
            console.log(data);
        });
    };
    AdminService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map