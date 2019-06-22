"use strict";angular.module("primeapps").controller("UserGroupFormController",["$rootScope","$scope","$location","$state","$filter","ngToast","helper","UserGroupService",function(r,e,u,s,o,a,n,t){function p(){t.getAll().then(function(r){if(e.userGroups=r.data,l){e.userGroup=angular.copy(o("filter")(e.userGroups,{id:l},!0)[0]);var u=angular.copy(e.userGroup.users);e.userGroup.users=[];for(var s=0;s<u.length;s++){var a=u[s].user;e.userGroup.users.push(a)}}else e.userGroup=c?angular.copy(o("filter")(e.userGroups,{id:c},!0)[0]):{}})["finally"](function(){e.loading=!1})}function i(){if(e.userGroup.name){var r=!0,u=o("filter")(e.userGroups,{name:e.userGroup.name},!0)[0];u&&!e.userGroup.id?r=!1:u&&u.id!==e.userGroup.id&&(r=!1),r||e.userGroupForm.name.$setValidity("unique",!1)}}e.loading=!0;var l=parseInt(u.search().id),c=parseInt(u.search().clone);e.lookupUser=n.lookupUser,p(),e.setFormValid=function(){e.userGroupForm.users.$setValidity("minTags",!0)},e.submit=function(){if(i(),e.userGroupForm.$valid){e.saving=!0;var r=null,u=angular.copy(e.userGroup);u=t.prepare(u),r=!e.userGroup.id||c?t.create(u):t.update(u),r.then(function(){s.go("app.setup.usergroups"),a.create({content:o("translate")("Setup.UserGroups.SubmitSuccess"),className:"success"})})["finally"](function(){e.saving=!1})}}}]);