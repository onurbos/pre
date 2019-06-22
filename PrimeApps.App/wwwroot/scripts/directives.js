"use strict";angular.module("primeapps").directive("focus",["$timeout",function(e){return function(t,n,a){t.$watch(a.focus,function(t){t&&e(function(){n[0].focus()},0,!1)})}}]).directive("blur",function(){return function(e,t,n){t.bind("blur",function(){e.$apply(n.blur)})}}).directive("customBackground",function(){return{restrict:"A",controller:["$scope","$element","$location","$localStorage",function(e,t,n,a){var l=function(){return n.path()},o=function(n){return t.removeClass("app auth self authingo"),n.indexOf("/app/")>-1?t.addClass("app"):n.indexOf("/auth/")>-1?(e.backgroundShow=!1,(n.indexOf("/auth/register")>-1||n.indexOf("/auth/verify")>-1)&&(e.backgroundShow=!0,e.language=a.read("NG_TRANSLATE_LANG_KEY")||"tr"),t.addClass("auth")):n.indexOf("/paymentform")>-1||n.indexOf("/join")>-1?t.addClass("self"):void 0};return o(n.path()),e.$watch(l,function(e,t){return e!==t?o(e):void 0})}]}}).directive("languageClass",function(){return{restrict:"A",controller:["$rootScope","$scope","$element",function(e,t,n){var a=function(){return e.language},l=function(e,t){return t&&n.removeClass(t),n.addClass(e)};return l(e.language),t.$watch(a,function(e,t){return e!==t?l(e,t):void 0})}]}}).directive("appClass",function(){return{restrict:"A",controller:["$rootScope","$scope","$element",function(e,t,n){var a=function(){return e.app},l=function(e,t){return t&&n.removeClass(t),n.addClass(e)};return l(e.app),t.$watch(a,function(e,t){return e!==t?l(e,t):void 0})}]}}).directive("confirmClick",["$popover","$timeout",function(e,t){return{restrict:"A",scope:{action:"&"},link:function(n,a,l){a.bind("click",function(){t(function(){var t=l.placement||"bottom",o=l.confirmMessage||"Are you sure?",r=l.confirmYes||"Yes",i=l.confirmNo||"No",s=e(a,{title:o,placement:t,trigger:"manual",autoClose:!0,contentTemplate:"view/common/confirm.html?v="+version});s.$promise.then(function(){s.$scope.yesText=r,s.$scope.noText=i,s.show()}),s.$scope.confirm=function(){s.$scope.confirming=!0,n.action()}},0)})}}}]).directive("customOnChange",function(){return{require:"ngModel",link:function(e,t,n,a){t.bind("change",function(){e.$apply(function(){t.length>0&&(a.$setViewValue(t[0].files[0].name),a.$render())})})}}}).directive("autoGrow",function(){return function(e,t,n){var a=function(){t.css("height","auto");var e=t[0].offsetHeight,n=t[0].scrollHeight;n>e&&t.css("height",n+"px")};e.$watch(n.ngModel,function(){a()}),t.bind("focus",function(){a()}),n.$set("ngTrim","false")}}).directive("resetField",["$compile","$timeout",function(e,t){return{require:"ngModel",scope:{},link:function(n,a,l,o){var r=/text|search|tel|url|email|password/i;if("INPUT"!==a[0].nodeName)throw new Error("resetField is limited to input elements");if(!r.test(l.type))throw new Error("Invalid input type for resetField: "+l.type);var i=e('<i ng-show="enabled" ng-mousedown="reset()" class="fa fa-times-circle"></i>')(n);a.after(i),n.reset=function(){o.$setViewValue(null),o.$render(),t(function(){a[0].focus()},0,!1)},a.bind("input",function(){n.enabled=!o.$isEmpty(a.val())}).bind("focus",function(){n.enabled=!o.$isEmpty(a.val()),n.$apply()}).bind("blur",function(){n.enabled=!1,n.$apply()})}}}]).directive("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,t,n,a){a.$validators.compareTo=function(t){return t==e.otherModelValue},e.$watch("otherModelValue",function(){a.$validate()})}}}).directive("ngThumb",["$window",function(e){var t={support:!(!e.FileReader||!e.CanvasRenderingContext2D),isFile:function(t){return angular.isObject(t)&&t instanceof e.File},isImage:function(e){var t="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return"|jpg|png|jpeg|bmp|gif|".indexOf(t)>-1}};return{restrict:"A",template:"<canvas/>",link:function(e,n,a){function l(e){var t=new Image;t.onload=o,t.src=e.target.result}function o(){var e=r.width||this.width/this.height*r.height,t=r.height||this.height/this.width*r.width;i.attr({width:e,height:t}),i[0].getContext("2d").drawImage(this,0,0,e,t)}if(t.support){var r=e.$eval(a.ngThumb);if(t.isFile(r.file)&&t.isImage(r.file)){var i=n.find("canvas"),s=new FileReader;s.onload=l,s.readAsDataURL(r.file)}}}}}]).directive("numeric",function(){return{require:"ngModel",scope:{min:"=minValue",max:"=maxValue",ngRequired:"=ngRequired"},link:function(e,t,n,a){a.$parsers.push(function(t){if(void 0===t||t.indexOf(" ").length>-1)return"";var n=t.replace(/[^0-9]/g,"");return n!=t&&(a.$setViewValue(n),a.$render()),a.$validators.min=function(t){return!e.ngRequired&&isNaN(t)?!0:"undefined"!=typeof e.min?t>=parseInt(e.min):!0},e.$watch("min",function(){a.$validate()}),a.$validators.max=function(t){return!e.ngRequired&&isNaN(t)?!0:"undefined"!=typeof e.max?t<=parseInt(e.max):!0},e.$watch("max",function(){a.$validate()}),n})}}}).directive("restrict",["$parse",function(e){return{restrict:"A",require:"ngModel",link:function(t,n,a){t.$watch(a.ngModel,function(n){n&&e(a.ngModel).assign(t,n.replace(new RegExp(a.restrict,"g"),""))})}}}]).directive("placeholder",["$timeout",function(e){var t=document.createElement("input");return"placeholder"in t?{}:{link:function(t,n,a){e(function(){n.val(a.placeholder),n.bind("focus",function(){n.val()==a.placeholder&&n.val("")}).bind("blur",function(){""==n.val()&&n.val(a.placeholder)})})}}}]).directive("ngEnter",function(){return function(e,t,n){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),t.preventDefault())})}}).directive("subTable",["$rootScope","ngTableParams","ngToast","blockUI","$filter","$cache","helper","exportFile","operations","ModuleService","components",function(e,t,n,a,l,o,r,i,s,u,c){return{restrict:"EA",scope:{relatedModule:"=",parentModule:"=",reload:"=",showFilter:"=",isSelectable:"@",disableSelectAll:"@",disableLinks:"@"},templateUrl:"view/common/subtable.html?v="+version,controller:["$scope",function(t){t.loading=!0,t.relatedModule.loading=!0,t.module=l("filter")(e.modules,{name:t.relatedModule.related_module},!0)[0],t.type=t.relatedModule.related_module,t.readonly=t.relatedModule.readonly||!1,t.parentType=t.relatedModule.relation_field,t.parentId=t.$parent.id,t.language=e.language,t.operations=s,t.hasPermission=r.hasPermission,t.lookupUser=r.lookupUser,t.relatedModuleInModal=t.$parent.selectedRelatedModule&&t.$parent.selectedRelatedModule.relatedModuleInModal?!0:!1,t.previousParentType=t.$parent.previousParentType,t.previousParentId=t.$parent.previousParentId,t.previousReturnTab=t.$parent.previousReturnTab,t.isAdmin=e.user.profile.has_admin_rights;var d=l("filter")(e.modules,{name:"sales_invoices"},!0);if(d.length<1)t.salesInvoiceModule=!1;else{if(t.salesInvoiceModule=!0,"flat"!=t.relatedModule.detail_view_type)var p=t.$parent.$parent.picklistsModule.transaction_type;else var p=t.$parent.$parent.picklistsModule.transaction_type;angular.forEach(p,function(e){"sales_invoice"===e.system_code&&(e.show=!1),"purchase_invoice"===e.system_code&&(e.show=!1)})}var m=[10,25,50,100],f=t.relatedModule.display_fields,g=t.parentType+(t.isSelectable?"":t.parentId);t.cacheKey=g+"_"+t.module.name,t.$parent["selectedRows"+t.type]=[];var h="many_to_many"===t.relatedModule.relation_type,v=[];if((void 0===t.isSelectable||null===t.isSelectable)&&(t.isSelectable=!1),!t.isSelectable){var b=t.parentType;if(h&&(b=t.parentModule!=t.module.name?t.parentModule+"_id":t.parentModule+"1_id"),v.push({field:b,operator:"equals",value:t.parentId,no:1}),"related_to"===t.parentType){var y=l("filter")(e.modules,{name:t.parentModule},!0)[0];t.parentType=t.parentModule,v.push({field:"related_module",operator:"is",value:y["label_"+e.user.tenant_language+"_singular"],no:1})}}t.isSelectable=!0,h&&(t.cacheKey=g+"_"+t.relatedModule.relation_field+"_"+t.relatedModule.related_module);var T=a.instances.get("tableBlockUISubTable"+t.cacheKey);u.setTable(t,T,m,10,angular.copy(v),g,t.type,t.isSelectable,t.disableLinks?null:t.parentId,t.disableLinks?null:t.parentType,f,t.relatedModule,t.parentModule,t.relatedModule.id,t.previousParentType,t.previousParentId,t.previousReturnTab,t.$parent),t.tableParams.disableSelectAll=t.disableSelectAll,t.isManyToManyModal=!0,t.refresh=function(e){o.remove(t.cacheKey),e&&(t.tableParams.filterList=v,t.tableParams.refreshing=!0),t.tableParams.reloading=!0,t.tableParams.reload()},t.$watch("reload",function(e){e&&t.refresh(!1)}),t.$watch("showFilter",function(e){e&&(t.tableParams.showFilter=!t.tableParams.showFilter)}),t["delete"]=function(e){u.getRecord(t.module.name,e).then(function(n){var a=u.processRecordSingle(n.data,t.$parent.$parent.module,t.$parent.$parent.picklistsModule);t.executeCode=!1,c.run("BeforeDelete","Script",t,a),t.executeCode||u.deleteRecord(t.module.name,e).then(function(){setTimeout(function(){u.getRecord(t.parentModule,t.parentId).then(function(e){var n=u.processRecordSingle(e.data,t.$parent.$parent.module,t.$parent.$parent.picklistsModule);u.formatRecordFieldValues(n,t.$parent.$parent.module,t.$parent.$parent.picklistsModule),t.$parent.$parent.$parent.record=n;var a=t.parentModule+"_"+t.parentModule;o.remove(a),t.tableParams.reload()})},1e3)})})},t.deleteRelation=function(e){var n={};n[t.parentModule+"_id"]=parseInt(t.parentId),n[t.relatedModule.related_module+"_id"]=e,u.deleteRelation(t.parentModule,t.relatedModule.related_module,n).then(function(){o.remove(t.cacheKey),t.tableParams.reload()})},t.multiselect=function(e,n){var a=[];return angular.forEach(t.tableParams.picklists[n.picklist_id],function(t){t.inactive||t.labelStr.toLowerCase().indexOf(e)>-1&&a.push(t)}),a},t.selectAllModal=function(e,n){t.$parent["selectedRows"+t.type]=[],t.isAllSelectedModal?t.isAllSelectedModal=!1:(t.isAllSelectedModal=!0,angular.forEach(n,function(e){e.fields.forEach(function(n){1==n.primary&&t.$parent["selectedRows"+t.type].push({id:e.id,displayName:n.valueFormatted})})}))},t.selectRow=function(e,n){e.target.checked?n.fields.forEach(function(e){1!=e.primary||e.isJoin||t.$parent["selectedRows"+t.type].push({id:n.id,displayName:e.valueFormatted})}):t.$parent["selectedRows"+t.type]=t.$parent["selectedRows"+t.type].filter(function(e){return e.id!=n.id}),t.isAllSelectedModal=!1},t.isRowSelected=function(e){return t.$parent["selectedRows"+t.type].filter(function(t){return t.id==e}).length>0},t.$parent.$parent.$parent.isManyToMany=h,t.deleteSelectedsSubTable=function(){if(!t.relatedModuleInModal){if(!t.$parent["selectedRows"+t.type]||!t.$parent["selectedRows"+t.type].length)return;var e=[];t.$parent["selectedRows"+t.type].filter(function(t){e.push(t.id)}),u.deleteRecordBulk(t.module.name,e).then(function(){o.remove(t.cacheKey),t.tableParams.reloading=!0,t.tableParams.reload(),t.$parent["selectedRows"+t.type]=[],t.isAllSelectedModal=!1;var n={};n.data=e.length})}},t["export"]=function(){if(!t.relatedModuleInModal){if(t.tableParams.total()<1)return;var a=!1;try{a=!!new Blob}catch(o){}if(!a)return void n.create({content:l("translate")("Module.ExportUnsupported"),className:"warning",timeout:8e3});if(t.tableParams.total()>3e3)return void n.create({content:l("translate")("Module.ExportWarning"),className:"warning",timeout:8e3});var r=t.module["label_"+e.language+"_plural"]+"-"+l("date")(new Date,"dd-MM-yyyy")+".xls";t.exporting=!0,u.getCSVData(t,t.type).then(function(e){n.create({content:l("translate")("Module.ExcelExportSuccess"),className:"success",timeout:5e3}),i.excel(e,r),t.exporting=!1})}}}]}}]).directive("numberCurrency",["$rootScope","$filter","$locale","helper",function(e,t,n,a){return{restrict:"A",require:"ngModel",scope:{minValue:"=",maxValue:"=",currencySymbol:"=",ngRequired:"=",places:"=",rounding:"="},link:function(l,o,r,i){function s(e){return RegExp("\\d|\\-|\\"+e,"g")}function u(e){return RegExp("\\-{0,1}((\\"+e+")|([0-9]{1,}\\"+e+"?))&?[0-9]{0,100}","g")}function c(e){e=String(e);var o=n.NUMBER_FORMATS.DECIMAL_SEP,r=null,i=t("currency")("-1",d(),l.places),c=i.indexOf("1"),p=i.substring(0,c);if(e=e.replace(p,"-"),RegExp("^-[\\s]*$","g").test(e)&&(e="-0"),s(o).test(e)){var g=e.match(s(o)).join("").match(u(o));if(g&&(g=g[0].replace(o,".")),!g)return null;switch(r=parseFloat(g),f){case"off":r=a.roundBy(Math.round,r,m);break;case"down":r=a.roundBy(Math.floor,r,m);break;case"up":r=a.roundBy(Math.ceil,r,m)}}return r}function d(){return l.currencySymbol?("false"===l.currencySymbol&&(l.currencySymbol=""),l.currencySymbol):e.currencySymbol?e.currencySymbol:n.NUMBER_FORMATS.CURRENCY_SYM}function p(){for(var e=i.$formatters,t=e.length,n=i.$$rawModelValue;t--;)n=e[t](n);i.$setViewValue(n),i.$render()}if("false"!==r.numberCurrency){var m="undefined"!=typeof l.places&&null!=l.places?l.places:2,f="undefined"!=typeof l.rounding&&null!=l.rounding?l.rounding:"none";i.$parsers.push(function(e){var t=c(e);return("."==t||"-."==t)&&(t=".0"),parseFloat(t)}),o.on("blur",function(){i.$commitViewValue(),p()}),i.$formatters.unshift(function(e){return t("currency")(e,d(),l.places)}),i.$validators.min=function(e){return!l.ngRequired&&isNaN(e)?!0:"undefined"!=typeof l.minValue?e>=parseFloat(l.minValue):!0},i.$validators.max=function(e){return!l.ngRequired&&isNaN(e)?!0:"undefined"!=typeof l.maxValue?e<=parseFloat(l.maxValue):!0},l.$watch("maxValue",function(){i.$validate()}),l.$watch("minValue",function(){i.$validate()}),l.$watch("currencySymbol",function(){i.$commitViewValue(),p()}),i.$validators.places=function(e){return e&&isNaN(e)?!1:!0}}}}}]).directive("numberDecimal",["$rootScope","$filter","$locale","helper",function(e,t,n,a){return{restrict:"A",require:"ngModel",scope:{min:"=minValue",max:"=maxValue",ngRequired:"=",places:"=",rounding:"="},link:function(e,l,o,r){function i(e){return RegExp("\\d|\\-|\\"+e,"g")}function s(e){return RegExp("\\-{0,1}((\\"+e+")|([0-9]{1,}\\"+e+"?))&?[0-9]{0,100}","g")}function u(l){l=String(l);var o=n.NUMBER_FORMATS.DECIMAL_SEP,r=null,u=t("number")("-1",e.places),c=u.indexOf("1"),m=u.substring(0,c);if(l=l.replace(m,"-"),RegExp("^-[\\s]*$","g").test(l)&&(l="-0"),i(o).test(l)){var f=l.match(i(o)).join("").match(s(o));if(f&&(f=f[0].replace(o,".")),!f)return null;switch(r=parseFloat(f),p){case"off":r=a.roundBy(Math.round,r,d);break;case"down":r=a.roundBy(Math.floor,r,d);break;case"up":r=a.roundBy(Math.ceil,r,d)}}return r}function c(){for(var e=r.$formatters,t=e.length,n=r.$$rawModelValue;t--;)n=e[t](n);r.$setViewValue(n),r.$render()}if("false"!==o.numberDecimal){var d="undefined"!=typeof e.places&&null!=e.places?e.places:2,p="undefined"!=typeof e.rounding&&null!=e.rounding?e.rounding:"none";r.$parsers.push(function(e){var t=u(e);return("."==t||"-."==t)&&(t=".0"),parseFloat(t)}),l.on("blur",function(){r.$commitViewValue(),c()}),r.$formatters.unshift(function(n){return t("number")(n,e.places)}),r.$validators.min=function(t){return!e.ngRequired&&isNaN(t)?!0:"undefined"!=typeof e.min?t>=parseFloat(e.min):!0},e.$watch("min",function(){r.$validate()}),r.$validators.max=function(t){return!e.ngRequired&&isNaN(t)?!0:"undefined"!=typeof e.max?t<=parseFloat(e.max):!0},e.$watch("max",function(){r.$validate()}),r.$validators.places=function(e){return e&&isNaN(e)?!1:!0}}}}}]).directive("tooltip",function(){return{restrict:"A",link:function(e,t){$(t).hover(function(){$(t).tooltip("show")},function(){$(t).tooltip("hide")})}}}).directive("editableCustomSelect",["$rootScope","editableDirectiveFactory",function(e,t){var n="Seçiniz -->";return"en"===e.language&&(n="Please select -->"),t({directiveName:"editableCustomSelect",inputTpl:'<select><option value="">'+n+"</option></select>"})}]).directive("customScripting",["$timeout","ngToast","ModuleService","$modal","$http","config","$filter","blockUI",function($timeout,ngToast,ModuleService,$modal,$http,config,$filter,blockUI){return{restrict:"A",link:function(scope,element,attrs){element.bind("click",function(){scope.toast=function(e,t,n,a){$timeout(function(){ngToast.create({content:e,className:t,timeout:n||5e3,dismissButton:a||!1,dismissOnClick:!a,dismissOnTimeout:!a})})};try{$timeout(function(){var customScript=attrs.customScripting;eval(customScript)})}catch(e){return scope.$parent.$parent.scriptRunning[scope.$parent.custombutton.id]=!1,null}})}}}]).directive("webHook",["$http","ngToast","$filter",function(e,t,n){return{restrict:"A",link:function(a,l,o){l.bind("click",function(){var l=angular.fromJson(o.webHook);if(l.template&&l.url){a.loading=!0;var r=l.template.split(","),i={},s=a.$parent.$parent.record;angular.forEach(r,function(e){var t=s[e];t&&(i[e]=t.length>0?t:t.labelStr)}),e.post(l.url,i).then(function(){t.create({content:n("translate")("Common.ProcessTriggerSuccess"),className:"success"})}).error(function(){t.create({content:n("translate")("Common.Error"),className:"danger"}),a.loading=!1})}})}}}]).directive("customModalFrame",[function(){return{restrict:"A",link:function(e,t,n){t.bind("click",function(){angular.fromJson(n.customModalFrame)})}}}]).directive("uiTinymceMulti",["$rootScope","uiTinymceConfig",function(e,t){t=t||{};var n=0;return{require:"ngModel",link:function(a,l,o,r){var i,s,u;o.id||o.$set("id","uiTinymce"+n++),s={setup:function(e){e.on("init",function(){r.$render()}),e.on("ExecCommand",function(){e.save(),r.$setViewValue(l.val()),a.$$phase||a.$apply()}),e.on("KeyUp",function(){e.save(),r.$setViewValue(l.val()),a.$$phase||a.$apply()})},style_formats:[{title:"tr"===e.language?"Yazı Boyutu":"Font Size",items:[{title:"tr"===e.language?"Çok Büyük":"Very Big",block:"h2",styles:{fontWeight:"normal"}},{title:"tr"===e.language?"Büyük":"Big",block:"h3",styles:{fontWeight:"normal"}},{title:("tr"===e.language,"Normal"),block:"h4",styles:{fontWeight:"normal"}},{title:"tr"===e.language?"Küçük":"Small",block:"h5",styles:{fontWeight:"normal"}},{title:"tr"===e.language?"Çok Küçük":"Very Small",block:"h6",styles:{fontWeight:"normal"}}]}],mode:"exact",elements:o.id,language:e.language,menubar:!1,statusbar:!1,plugins:"fullscreen paste",paste_as_text:!0,toolbar:"bold italic bullist numlist | styleselect | fullscreen",skin:"lightgray",theme:"modern",height:"200"},i=o.uiTinymce?a.$eval(o.uiTinymce):{},angular.extend(s,t,i),setTimeout(function(){tinymce.init(s)}),r.$render=function(){u||(u=tinymce.get(o.id)),u&&u.setContent(r.$viewValue||"")}}}}]).directive("location",["$rootScope","config","$filter","$timeout",function(e,t,n,a){return{restrict:"E",require:"^?ngModel",link:function(e,t,n,l){function o(e){u.latitude=e.coords.latitude,u.longitude=e.coords.longitude,u.zoom=10,i()}function r(){i()}function i(){var n=t[0];if(e.addres&&!e.location){var l=new google.maps.Geocoder;l.geocode({address:e.addres},function(e,t){a(function(){"OK"===t?(u.latitude=e[0].geometry.location.lat(),u.longitude=e[0].geometry.location.lng(),s(n)):s(n)})})}else s(n)}function s(t){if(e.location){var n=e.location.split(",");u.latitude=n[0],u.longitude=n[1],u.zoom=17}var a=new google.maps.LatLng(u.latitude,u.longitude),o={center:a,zoom:u.zoom},r=new google.maps.Map(t,o),i=new google.maps.Marker({draggable:!0,animation:google.maps.Animation.DROP,position:a});l.$setViewValue(u.latitude+","+u.longitude);var s=new google.maps.InfoWindow;r.addListener("mouseup",function(e){var t=e.latLng;l.$setViewValue(t.lat()+","+t.lng()),s.setContent(t.lat()+","+t.lng()),s.open(r,i)}),r.addListener("click",function(t){var n=t.latLng,n=t.latLng;e.ngModel=n.lat()+","+n.lng(),s.setContent(n.lat()+","+n.lng()),i.setPosition(n),s.open(r,i),l.$setViewValue(n.lat()+","+n.lng())}),i.setMap(r)}var u={latitude:39.93948807471046,longitude:32.85907745361328,zoom:5};navigator.geolocation.getCurrentPosition(o,r)}}}]).directive("trial",["$rootScope","$modal","$http","config","$filter","ngToast",function(e,t,n,a,l,o){return{restrict:"EA",templateUrl:"view/app/trial/trial-box.html?v="+version,controller:["$scope",function(r){var i=window.location.hostname;if(i.indexOf("ofisim.com")>-1||i.indexOf("localhost")>-1){r.promotion={fullName:e.user.full_name,phoneNumber:e.user.phone,email:e.user.email,useCount:"",sector:""};var s=new Date,u=new Date(e.user.created_at),c=(s-u)/1e3;c=Math.abs(Math.floor(c)),r.day=15-Math.floor(c/86400),r.isPaid=e.user.is_paid_customer,r.trailMessage=l("translate")("Trial.DaysRemainingForYourTrial",{remaining:r.day}),r.sector=[{label_tr:"Ağaç İşleri, Kağıt ve Kağıt Ürünleri",label_en:"Woodworking Industry",value:"Ağaç İşleri, Kağıt ve Kağıt Ürünleri"},{label_tr:"Banka, Finans",label_en:"Banking & Finance",value:"Banka, Finans"},{label_tr:"Bilişim Teknolojileri",label_en:"Information Technology",value:"Bilişim Teknolojileri"},{label_tr:"Çevre",label_en:"Environmental",value:"Çevre"},{label_tr:"Diğer",label_en:"Çevre",value:"Diğer"},{label_tr:"Eğitim",label_en:"Education",value:"Eğitim"},{label_tr:"Elektrik, Elektronik",label_en:"Electronics",value:"Elektrik, Elektronik"},{label_tr:"Enerji",label_en:"Energy",value:"Enerji"},{label_tr:"Gıda",label_en:"Food & Beverage",value:"Gıda"},{label_tr:"Hukuk Firmaları",label_en:"Law Firms",value:"Hukuk Firmaları"},{label_tr:"İnşaat",label_en:"Construction",value:"İnşaat"},{label_tr:"Kamu Kurumları",label_en:"Government",value:"Kamu Kurumları"},{label_tr:"Kar Amacı Gütmeyen Kurumlar",label_en:"Non Profit Organizations",value:"Kar Amacı Gütmeyen Kurumlar"},{label_tr:"Kimya, Petrol, Lastik ve Plastik",label_en:"Chemicals",value:"Enerji"},{label_tr:"Kültür, Sanat",label_en:"Çevre",value:"Kültür, Sanat"},{label_tr:"Madencilik",label_en:"Mining",value:"Madencilik"},{label_tr:"Medya, İletişim",label_en:"Media & Press",value:"Medya, İletişim"},{label_tr:"Otomotiv",label_en:"Automotive",value:"Otomotiv"},{label_tr:"Perakende",label_en:"Retail",value:"Perakende"},{label_tr:"Sağlık ve Sosyal Hizmetler",label_en:"Healthcare",value:"Sağlık ve Sosyal Hizmetler"},{label_tr:"Tarım, Avcılık, Balıkçılık",label_en:"Agriculture",value:"Tarım, Avcılık, Balıkçılık"},{label_tr:"Tekstil, Hazır Giyim, Deri",label_en:"Textile",value:"Tekstil, Hazır Giyim, Deri"},{label_tr:"Telekomünikasyon",label_en:"Telecommunication",value:"Telekomünikasyon"},{label_tr:"Ticaret (Satış ve Pazarlama)",label_en:"Sales & Marketing",value:"Ticaret (Satış ve Pazarlama)"},{label_tr:"Turizm, Konaklama",label_en:"Hospitality",value:"Turizm, Konaklama"},{label_tr:"Ulaştırma, Lojistik ve Haberleşme",label_en:"Transportation & Logistics",value:"Ulaştırma, Lojistik ve Haberleşme"},{label_tr:"Üretim",label_en:"Manufacturing",value:"Üretim"}],r.language=e.language,r.showPromotionModal=function(i){r.trailType=i,r.promotionModal=r.promotionModal||t({scope:r,templateUrl:"/view/app/trial/promotionFormModal.html",size:"modal-sm",controller:function(){r.sendEmail=function(t){if(t.$valid){var i={};i.Subject="promotion"==r.trailType?"Tanıtım İsteği":"Satın Alma Talebi",i.TemplateWithBody='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <title></title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <style type="text/css"> body, .maintable { height: 100% !important; width: 100% !important; margin: 0; padding: 0; } img, a img { border: 0; outline: none; text-decoration: none; } .imagefix { display: block; } p { margin-top: 0; margin-right: 0; margin-left: 0; padding: 0; } .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } img { -ms-interpolation-mode: bicubic; } body, table, td, p, a, li, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } </style> <style type="text/css"> @media only screen and (max-width: 600px) { .rtable { width: 100% !important; table-layout: fixed; } .rtable tr { height: auto !important; display: block; } .contenttd { max-width: 100% !important; display: block; } .contenttd:after { content: ""; display: table; clear: both; } .hiddentds { display: none; } .imgtable, .imgtable table { max-width: 100% !important; height: auto; float: none; margin: 0 auto; } .imgtable.btnset td { display: inline-block; } .imgtable img { width: 100%; height: auto; display: block; } table { float: none; table-layout: fixed; } } </style> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--></head><body style="overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#444545"> <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#444545"> <tr> <td style="FONT-SIZE: 0px; HEIGHT: 20px; LINE-HEIGHT: 0"></td> </tr> <tr> <td valign="top"> <table class="rtable" style="WIDTH: 600px; MARGIN: 0px auto" cellspacing="0" cellpadding="0" width="600" align="center" border="0"> <tr> <td class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent"> <table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left"> <tr class="hiddentds"> <td style="FONT-SIZE: 0px; HEIGHT: 0px; WIDTH: 367px; LINE-HEIGHT: 0; mso-line-height-rule: exactly"></td> <td style="FONT-SIZE: 0px; HEIGHT: 0px; WIDTH: 233px; LINE-HEIGHT: 0; mso-line-height-rule: exactly"></td> </tr> <tr style="HEIGHT: 10px"> <th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent"></th> <th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent"></th> </tr> </table> </td> </tr> <tr> <td class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff"> <table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left"> <tr class="hiddentds"> <td style="FONT-SIZE: 0px; HEIGHT: 0px; WIDTH: 600px; LINE-HEIGHT: 0; mso-line-height-rule: exactly"></td> </tr> <tr style="HEIGHT: 20px"> <th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; VERTICAL-ALIGN: bottom; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #1296f7"> <p style="FONT-SIZE: 36px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #fffeff; LINE-HEIGHT: 36px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="center"><br /> '+i.Subject+'</p> </th> </tr> </table> </td> </tr> <tr> <td class="contenttd" style="BORDER-TOP: #e73d11 5px solid; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff"> <table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left"> <tr class="hiddentds"> <td style="FONT-SIZE: 0px; HEIGHT: 0px; WIDTH: 600px; LINE-HEIGHT: 0; mso-line-height-rule: exactly" colspan="2"></td> </tr> <tr style="HEIGHT: 71px"> <th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 5px; TEXT-ALIGN: left; PADDING-TOP: 5px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent" colspan="2"> <div> <p style="FONT-SIZE: 18px; MARGIN-BOTTOM: 1em; FONT-FAMILY: geneve, arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #2d2d2d; TEXT-ALIGN: justify; PADDING-LEFT: 110px; LINE-HEIGHT: 29px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="justify"><strong><br />&#304;sim Soyisim</strong>:'+r.promotion.fullName+"<br /> <strong>Telefon Numaras&#305;</strong>:"+r.promotion.phoneNumber+"<br /> <strong>E-Posta</strong>: "+r.promotion.email+"<br /> <strong>Uygulamay&#305; Kullanacak Ki&#351;i Say&#305;s&#305;</strong>: "+r.promotion.useCount+"<br /> <strong>Sekt&ouml;r</strong> :"+r.promotion.sector.value+"<br /> <strong>M&uuml;&#351;teri Epostas&#305;</strong>: "+e.user.email+'</p> </div> </th> </tr> </table> </td> </tr> <tr> <td class="contenttd" style="BORDER-TOP: #e73d11 5px solid; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff"> <table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left"> <tr class="hiddentds"> <td style="FONT-SIZE: 0px; HEIGHT: 0px; WIDTH: 600px; LINE-HEIGHT: 0; mso-line-height-rule: exactly"></td> </tr> <tr style="HEIGHT: 20px"> <th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent"></th> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td style="FONT-SIZE: 0px; HEIGHT: 8px; LINE-HEIGHT: 0">&nbsp;</td> </tr> </table> <!-- Created with MailStyler 2.0.1.300 --></body></html>',i.ToAddresses=["info@ofisim.com"],n.post(a.apiUrl+"messaging/send_external_email",i).then(function(){o.create({content:l("translate")("Trial.RequestMessage"),className:"success",timeout:5e3}),r.promotionModal.hide()})}}},backdrop:"static",show:!1}),r.promotionModal.$promise.then(r.promotionModal.show)},r.day>=0&&r.day<=15&&e.user.id===e.user.tenant_id&&!r.isPaid&&!e.preview&&(e.trial=!0)}}]}}]).directive("helpPage",["$rootScope","$modal","$http","config","$filter","ngToast","HelpService","$sce","$cache","$localStorage",function(e,t,n,a,l,o,r,i,s,u){return{restrict:"EA",scope:{moduleId:"=",route:"="},controller:["$scope",function(n){if(e.isMobile())return!1;if(n.openHelpModal=function(){n.helpModal=n.helpModal||t({scope:n,templateUrl:"view/setup/help/helpPageModal.html",animation:"am-fade",backdrop:!0,show:!1,tag:"helpModal",container:"body"}),n.helpModal.$promise.then(n.helpModal.show)},n.selectedClose=!0,n.selectedCloseModalForRoute=2,n.selectedCloseModalForModule=!0,u.read("startPage")){if(n.startPage=JSON.parse(u.read("startPage")),u.read("routeShow")){n.selectedCloseStartPage=JSON.parse(u.read("routeShow"));var a=l("filter")(n.selectedCloseStartPage,{name:n.route})[0]}var o=l("filter")(n.startPage,{name:n.route})[0];a?n.selectedCloseModalForRoute=a.value:o&&(n.selectedCloseModalForRoute=o.value)}if(u.read("moduleShow")){n.selectedCloseModal=JSON.parse(u.read("moduleShow"));var c=l("filter")(n.selectedCloseModal,{name:n.moduleId})[0];c&&(n.selectedCloseModalForModule=c.value)}if(u.read("routeShow")){n.selectedCloseRoute=JSON.parse(u.read("routeShow"));var a=l("filter")(n.selectedCloseRoute,{name:n.route})[0];n.selectedCloseModalForRoute=a?a.value:2}n.openModal=function(){if(n.helpTemplatesModal&&"publish"===n.helpTemplatesModal.show_type&&(n.helpTemplate=i.trustAsHtml(n.helpTemplatesModal.template),u.read("ModalShow")&&(n.selectedClose=JSON.parse(u.read("ModalShow"))),n.selectedClose===!0)){if(n.moduleId&&n.selectedCloseModalForModule)if(n.openHelpModal(),u.read("moduleShow")){n.modalModules=JSON.parse(u.read("moduleShow")),n.modulShowArray={name:n.moduleId,value:!1};var t=l("filter")(n.modalModules,{name:n.modulShowArray.name})[0];t||(n.modalModules.push(n.modulShowArray),u.write("moduleShow",JSON.stringify(n.modalModules)))}else n.modalModules=[],n.modulShowArray={name:n.moduleId,value:!1},n.modalModules.push(n.modulShowArray),u.write("moduleShow",JSON.stringify(n.modalModules));
if(n.route&&1===n.selectedCloseModalForRoute&&u.read("startPage")){n.startPage=JSON.parse(u.read("startPage"));var a=l("filter")(n.startPage,{name:n.route})[0];if(a&&1===a.value){var o=[],r={name:e.currentPath,value:2};o.push(r),u.write("startPage",JSON.stringify(o))}}n.route&&2===n.selectedCloseModalForRoute&&(n.openHelpModal(),u.read("routeShow")?(n.routes=JSON.parse(u.read("routeShow")),n.routeShowArray={name:n.route,value:3},n.routes.push(n.routeShowArray),u.write("routeShow",JSON.stringify(n.routes))):(n.routes=[],n.routeShowArray={name:n.route,value:3},n.routes.push(n.routeShowArray),u.write("routeShow",JSON.stringify(n.routes))))}};var d="help-";n.moduleId&&(d+="-"+n.moduleId),n.route&&(n.route.replace("/","--"),d+=n.route),s.get(d)&&(n.helpTemplatesModal=s.get(d),n.selectedClose&&n.openModal()),n.helpTemplatesModal||r.getByType("modal",n.moduleId,n.route).then(function(e){e.data&&(n.helpTemplatesModal=e.data,s.put(d,e.data),n.selectedClose&&n.openModal())}),n.showModal=function(){(n.moduleId||n.route)&&u.write("ModalShow",!1)}}]}}]).directive("zxPasswordMeter",["$filter",function(e){return{scope:{value:"=",max:"@?"},templateUrl:"view/common/password-meter.html?v="+version,link:function(t){t.type="",t.max=t.max?t.max:4,t.firstRun=!0,t.$watch("value.password",function(e){(e||e.length>0||t.visible)&&(t.visible=!0)}),t.$watch("value.score",function(n){var a=n/t.max;0===a?(t.type="progress-bar-danger",t.text=e("translate")("Common.Awful"),t.width=25):.25>=a?(t.type="progress-bar-warning",t.text=e("translate")("Common.Weak"),t.width=40):.5>=a?(t.type="progress-bar-info",t.text=e("translate")("Common.Moderate"),t.width=50):.75>=a?(t.type="progress-bar-info",t.text=e("translate")("Common.Strong"),t.width=80):(t.type="progress-bar-success",t.text=e("translate")("Common.Perfect"),t.width=100)})}}}]).directive("inputStars",[function(){function e(e){return Number(e)===e&&e%1!==0}function t(t,n,a,l){function o(e,t){return e.pageX<t.getBoundingClientRect().left+t.offsetWidth/2}var r={get allowHalf(){return"string"==typeof a.allowHalf&&"false"!=a.allowHalf},get readonly(){return"false"!=a.readonly&&(a.readonly||""===a.readonly)},get fullIcon(){return a.iconFull||"fa-star"},get halfIcon(){return a.iconHalf||"fa-star-half-o"},get emptyIcon(){return a.iconEmpty||"fa-star-o"},get iconBase(){return a.iconBase||"fa fa-fw"},get iconHover(){return a.iconHover||"angular-input-stars-hover"}};t.items=new Array(+a.max),t.listClass=a.listClass||"angular-input-stars",l.$render=function(){t.lastValue=e(l.$viewValue)?Math.round(2*parseFloat(l.$viewValue))/2:parseFloat(l.$viewValue)||0},t.getClass=function(e){var n;if(e>=t.lastValue)n=r.iconBase+" "+r.emptyIcon;else{var a=e+.5;n=r.allowHalf&&a===t.lastValue?r.iconBase+" "+r.halfIcon+" active ":r.iconBase+" "+r.fullIcon+" active "}return r.readonly?n+" readonly":n},t.unpaintStars=function(e,n){t.paintStars(t.lastValue-1,n)},t.paintStars=function(e,t){if(!r.readonly){for(var a=n.find("li").find("i"),l=0;l<a.length;l++){var o,i,s=angular.element(a[l]);e>=l?(o=[r.emptyIcon,r.halfIcon],i=[r.iconHover,r.fullIcon,"active"]):(o=[r.fullIcon,r.iconHover,r.halfIcon,"active"],i=r.allowHalf&&e+.5===l?[r.halfIcon,"active"]:[r.emptyIcon]),s.removeClass(o.join(" ")),s.addClass(i.join(" "))}t||a.removeClass(r.iconHover)}},t.setValue=function(e,n){if(!r.readonly){var i,s=n.target;if(i=r.allowHalf&&o(n,s)?e+.5:e+1,i===t.lastValue&&(i=0),t.lastValue=i,l.$setViewValue(i),l.$render(),a.onStarClick)try{t.$parent.$eval(a.onStarClick,{$event:n})}catch(n){}}}}var n={restrict:"EA",replace:!0,template:'<ul ng-class="listClass"><li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true, $event)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index"><i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i></li></ul>',require:"ngModel",scope:{bindModel:"=ngModel"},link:t};return n}]);