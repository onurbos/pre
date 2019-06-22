"use strict";angular.module("primeapps").directive("directory",["$rootScope","$state","$filter","ModuleService",function(e,i,r,o){return{restrict:"EA",scope:{id:"=",showBack:"="},templateUrl:cdnUrl+"view/app/directory/directory.html",controller:["$scope",function(t){if(t.loading=!0,t.showInfo=!0,t.module=r("filter")(e.modules,{name:"rehber"},!0)[0],!t.module)return ngToast.create({content:r("translate")("Common.NotFound"),className:"warning"}),void i.go("app.dashboard");var a={fields:["ad_soyad","cep_telefonu","is_telefonu","e_posta","lokasyon","sube","fotograf","departman","unvan","calisan_id","yoneticisi.rehber.ad_soyad","yoneticisi.rehber.unvan","yoneticisi.rehber.fotograf","yoneticisi.rehber.yoneticisi"],filters:[{field:"e_posta",operator:"is",value:e.user.email,no:1}],sort_field:"ad_soyad",sort_direction:"asc",limit:1,offset:0},n=r("filter")(t.module.fields,{name:"ozel_cep_telefonu"},!0)[0];n&&a.fields.push("ozel_cep_telefonu"),t.id&&(a.filters=[{field:"id",operator:"equals",value:t.id,no:1}],t.showInfo=!1),o.findRecords("rehber",a).then(function(e){if(t.record=e.data[0],t.record){if(t.record["yoneticisi.rehber.id"]){var i={filters:[{field:"yoneticisi",operator:"equals",value:t.record["yoneticisi.rehber.id"],no:1},{field:"id",operator:"not_equal",value:t.record.id,no:2}],sort_field:"ad_soyad",sort_direction:"asc",limit:50,offset:0};t.id||i.filters.push({field:"departman",operator:"is",value:t.record.departman,no:3}),o.findRecords("rehber",i).then(function(e){if(t.peers=e.data,t.record["yoneticisi.rehber.id"]){var i=function(e){var i={id:e["yoneticisi.rehber.id"],ad_soyad:e["yoneticisi.rehber.ad_soyad"],unvan:e["yoneticisi.rehber.unvan"],fotograf:e["yoneticisi.rehber.fotograf"],yoneticisi:e["yoneticisi.rehber.yoneticisi"]};return i};t.managerFirst=i(t.record)}})}var r={filters:[{field:"yoneticisi",operator:"equals",value:t.record.id,no:1}],sort_field:"ad_soyad",sort_direction:"asc",limit:50,offset:0};o.findRecords("rehber",r).then(function(e){t.directReports=e.data})}})["finally"](function(){t.loading=!1,t.$parent.showBack=!0}),t["goto"]=function(e){e?i.go("app.directory",{id:e}):t.id||i.go("app.moduleDetail",{type:"calisanlar",id:t.record.calisan_id})},t.getField=function(e){var i=r("filter")(t.module.fields,{name:e,deleted:"!true"})[0];return i},t.getFieldLabel=function(o){var a=r("filter")(t.module.fields,{name:o,deleted:"!true"})[0];return a?a["label_"+e.language]:(ngToast.create({content:r("translate")("Common.NotFound"),className:"warning"}),void i.go("app.dashboard"))}}]}}]);