import { DashboardComponent } from './../dashboard/dashboard.component';
import { Ecoleclasseannee } from './../models/ecoleclasseannee';
import { EnseignantService } from './../enseignant.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
ecoles =[];
classes=[];

idens=0;
idannee=0;
idecole:number;
islogged=false;
//permet de ramener la liste des eleèves d'une classe 
parameters: Ecoleclasseannee = {
  idannee:this.idannee,
  idecole:this.idecole,
  idclasse:0
};
  constructor(private enseignantService:EnseignantService , private router:Router) { }

  ngOnInit() {
    let user = sessionStorage.getItem('username')
    
      if(user!=null){   
        this.islogged=true;
        this.idannee=  parseInt(sessionStorage.getItem('idannee'));
        this.idens=parseInt(sessionStorage.getItem('idens'));
      }
    this.getEcoles();
    this.getEnseignant();
    this.getAnnee();
    
  }
  // list des ecole d'un enseignant
  getEcoles(){
    this.enseignantService.getEcolebyEnseignant().subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        this.ecoles = data.datas;
        console.log(this.ecoles);
      }
    });
  }
  getClasse(ecole){
    this.classes=null;
    console.log(ecole.id_ecole);
    this.idecole=ecole.id_ecole;
    this.enseignantService.getClasses(this.idecole,this.idens,this.idannee).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        this.classes = data.datas;
      }
    });
    this.enseignantService.getEcole(this.idecole).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        let ecole = data.datas ;
        this.enseignantService.ecole= ecole;
      }
    });
  }
  getClasseEcole(classe){
    console.log(classe);
      this.parameters.idecole=this.idecole;
      this.parameters.idannee= this.idannee;
      this.parameters.idclasse=classe.id_classe;

      this.enseignantService.getEleves(this.parameters).subscribe((data:any)=>{
        console.log(data);
        if(data.code == 800){
           this.enseignantService.eleves= data.datas
           this.router.navigate(["suivis"])
        }
      });
      this.enseignantService.getClasse(classe.id_classe).subscribe((data:any)=>{
        console.log(data);
        if(data.code == 800){
          let classe = data.datas ;
          console.log(classe);
          this.enseignantService.classe= classe;
        }
      });
  }
  getEnseignant(){
    this.enseignantService.getEnseignant(this.idens).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        let enseignant = data.datas ;
        console.log('--------------- enseignant: ------'+ enseignant);
        this.enseignantService.enseignant= enseignant;
      }
    });
  }
  getAnnee(){
    this.enseignantService.getAnnee(this.idannee).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        let annee = data.datas ;
        console.log('--------------- annee: ------'+ annee);
        this.enseignantService.annee= annee;
      }
    });
  }

}
