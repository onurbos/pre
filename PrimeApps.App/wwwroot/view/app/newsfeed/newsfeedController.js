"use strict";angular.module("primeapps").controller("NewsfeedController",["$rootScope","$scope","NoteService","ngToast","$filter","$window","$modal",function(e,t,o,a,l,n,r){n.scrollTo(0,0),t.module={id:null};var i={module_id:null,record_id:null,limit:10,offset:0};t.refresh=function(){o.count(i).then(function(e){o.find(i).then(function(o){t.notes=o.data,t.loadingNotes=!1,t.allNotesLoaded=!1,t.currentPage=1,t.limit=10,a.create({content:l("translate")("Note.NoteRefresh"),className:"success"}),t.$parent.notesCount=e.data,e.data<=t.limit&&(t.hidePaging=!0)})})},t.addActivity=function(e,o){if("date"===o)t.calendarDate=moment(e);else if("month"===o)t.calendarDate=moment(e);else{var a=new Date,l=new Date(a.getFullYear(),a.getMonth(),a.getDate()+e,0,0,0);t.calendarDate=moment(l)}t.isNewsfeed=!0,t.currentLookupField={lookup_type:"activities"},t.formModal=t.formModal||r({scope:t,templateUrl:"view/app/module/moduleFormModal.html",animation:"",backdrop:"static",show:!1,tag:"createModal"}),t.formModal.$promise.then(t.formModal.show)}}]);