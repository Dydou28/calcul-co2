"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[46],{1046:(C,r,l)=>{l.r(r),l.d(r,{CalculetteEntityModule:()=>A});var u=l(9808),c=l(6609),a=l(2108),t=l(5e3);let s=(()=>{class e{constructor(n){this.router=n}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-calculette-entity"]],decls:1,vars:0,template:function(n,i){1&n&&t._UZ(0,"router-outlet")},directives:[c.lC],styles:[""]}),e})();var p=l(520),d=l(2340);const m={headers:new p.WM({"Content-Type":"application/json"})};let E=(()=>{class e{constructor(n){this.http=n}getAllAgence(){const n=window.localStorage.getItem("userId");return this.http.get(d.N.AUTH_API+"user/"+n+"/calculetteEntity/",m)}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(p.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function y(e,o){if(1&e&&(t.TgZ(0,"option",15),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.Q6J("value",o.index),t.xp6(1),t.Oqu(n.label)}}function g(e,o){if(1&e&&(t.TgZ(0,"option",15),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.Q6J("value",o.index),t.xp6(1),t.Oqu(n.label)}}const h=[{path:"calculette-entity",component:s,canActivate:[a.a],children:[{path:"home-entity",canActivate:[a.a],component:(()=>{class e{constructor(n,i){this.router=n,this.calcES=i}ngOnInit(){this.calcES.getAllAgence().subscribe(n=>{this.agences=n.calculetteEntityModel,console.log(this.agences)},n=>{console.log(n)})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.F0),t.Y36(E))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home-entity"]],decls:48,vars:2,consts:[["role","main","id","content",1,"container","my-5"],[1,"row"],[1,"col-md-8"],["role","form","id","myForm","action","aff_AE.php","method","post"],["type","hidden","name","token","value","<?php echo $_SESSION['token']; ?>"],[1,"form-group"],[1,"col-sm-6"],["id","aAE","name","aAE",1,"form-select",2,"margin-right","15px"],["selected","","value","Choix de votre AE"],[3,"value",4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-primary"],["role","form","id","myForm","action","maj_AE.php","method","post",2,"margin-top","30px"],["id","mAE","name","mAE",1,"form-select",2,"margin-right","15px"],["role","form","id","myForm","action","add_AE.php","method","post",2,"margin-top","30px"],["type","text","name","add_AE","id","add_AE","placeholder"," Nouvelle AE",1,"form-control"],[3,"value"]],template:function(n,i){1&n&&(t.TgZ(0,"main",0)(1,"div",1)(2,"div",2)(3,"form",3),t._UZ(4,"input",4),t.TgZ(5,"div",5)(6,"h2"),t._uU(7,"Afficher les donn\xe9es de votre Entit\xe9"),t.qZA(),t.TgZ(8,"div",1)(9,"div",6)(10,"select",7)(11,"option",8),t._uU(12,"Choix de votre Entit\xe9"),t.qZA(),t.YNc(13,y,2,2,"option",9),t.qZA()(),t.TgZ(14,"div",6)(15,"label")(16,"button",10),t._uU(17,"acc\xe9der"),t.qZA()()()()()()()(),t.TgZ(18,"div",1)(19,"div",2)(20,"form",11),t._UZ(21,"input",4),t.TgZ(22,"div",5)(23,"h2"),t._uU(24,"Mettre \xe0 jour les donn\xe9es de votre Entit\xe9"),t.qZA(),t.TgZ(25,"div",1)(26,"div",6)(27,"select",12)(28,"option",8),t._uU(29,"Choix de votre Entit\xe9"),t.qZA(),t.YNc(30,g,2,2,"option",9),t.qZA()(),t.TgZ(31,"div",6)(32,"label")(33,"button",10),t._uU(34,"acc\xe9der"),t.qZA()()()()()()()(),t.TgZ(35,"div",1)(36,"div",2)(37,"form",13),t._UZ(38,"input",4),t.TgZ(39,"div",5)(40,"h2"),t._uU(41,"Ajouter votre Entit\xe9"),t.qZA(),t.TgZ(42,"div",1)(43,"div",6),t._UZ(44,"input",14),t.qZA(),t.TgZ(45,"div",6)(46,"button",10),t._uU(47,"Cr\xe9er"),t.qZA()()()()()()()()),2&n&&(t.xp6(13),t.Q6J("ngForOf",i.agences),t.xp6(17),t.Q6J("ngForOf",i.agences))},directives:[u.sg],styles:[""]}),e})()}]},{path:"",redirectTo:"calculette-entity/home-entity",pathMatch:"full",canActivate:[a.a]}];let f=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[c.Bz.forChild(h)],c.Bz]}),e})(),A=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,f]]}),e})()}}]);