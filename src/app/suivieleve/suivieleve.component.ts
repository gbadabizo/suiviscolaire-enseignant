import { SuiviEleve } from './../models/suiviEleve';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../enseignant.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-suivieleve',
  templateUrl: './suivieleve.component.html',
  styleUrls: ['./suivieleve.component.css']
})
export class SuivieleveComponent implements OnInit {
  
  public popoverTitle: string = 'Etes-vous sûr?';
  public popoverMessage: string = 'Voulez-vous continuer cette opération?';
  public confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  public cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  msg='';
  listMsg=[];
  message= {
    receiver:0,
    sender:0,
    contenu:'',
  }
  optionsList: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    disabled: true,
    showTicks: true,
    draggableRange: true
  };
  value: number = 4;
  options: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
        if (value <= 2) {
            return 'orange';
        }
        if (value == 3) {
            return '#15a0d3';
        }
        
        return 'green';
    }
  };
  value2: number = 3;
  options2: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
      if (value < 1) {
        return 'green';
    }
        if (value <= 1) {
            return 'orange';
        }
        if (value <= 2) {
          return 'red';
      }
        if (value <= 5) {
            return 'red';
        }
        
        return 'green';
    }
  };
  value3: number = 1;
  options3: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
      if (value < 1) {
        return 'green';
    }
        if (value <= 1) {
            return 'blue';
        }
        if (value <= 2) {
            return 'orange';
        }
       
        return 'red';
    }
  };
  value4: number = 2;
  options4: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
        if (value <= 1) {
            return 'blue';
        }
        if (value <= 2) {
            return 'orange';
        }
        if(value==3){
          return'#7fffd8';
        }
        if (value <= 4) {
            return 'green';
        }
        return 'green';
    }
  };
  formSuiviEleve = new FormGroup({
    assiduite: new FormControl(null, [
        Validators.required
    ]),
    datedebut: new FormControl(null, [
      Validators.required
  ]),
  datefin: new FormControl(null, [
    Validators.required
]),
    observation: new FormControl(),
    
    absence: new FormControl(null, [
      Validators.required
  ]),
    retard: new FormControl(null, [
      Validators.required
  ]),
    exo_maison: new FormControl(null, [
      Validators.required
  ]),
  idmatiere: new FormControl(null, [
    Validators.required
]),
});
  listeleve:[];
  public id:string ; // id de l'elève
  listsuivis:any;
  searchText:any;
  searchText2:any;
  eleve:any;
  ecole:any;
  classe:any;
  annee:any;
  enseignant:any;
  suiviEleve = {
    datedebut:'',
    datefin:'',
    assiduite:0,
    retard:0 ,
    exo_maison:0,
    absence:0,
    observation:'',
    idenseignant:0,
    idmatiere: 0,
    idannee:0,
    idclasse:0,
    ideleve:0
    }
  constructor(private enseignantService:EnseignantService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   // console.log(this.enseignantService.eleves);
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.listeleve= this.enseignantService.eleves;
    this.annee=this.enseignantService.annee;
    this.enseignant=this.enseignantService.enseignant;
    this.classe=this.enseignantService.classe;
    this.ecole=this.enseignantService.ecole;
    this.getEleve();
    //this.initiateSuiviEleve();
    this.getListSuivis();
    this.getAllMessage();
  }
  getEleve(){
    this.enseignantService.getEleve(this.id).subscribe((data:any)=>{
      console.log(data);
      if(data.code==800){
        this.eleve= data.datas;
      }
    })
  }
  SubmitSuiviEleve(){
    
    console.log(this.formSuiviEleve.value);
    let suiviEl = this.formSuiviEleve.value;
    console.log(suiviEl);
    console.log(this.suiviEleve);
    this.suiviEleve.datedebut= suiviEl.datedebut;
    this.suiviEleve.datefin = suiviEl.datefin;
    this.suiviEleve.assiduite= suiviEl.assiduite;
    this.suiviEleve.retard=suiviEl.retard;
    this.suiviEleve.absence=suiviEl.absence;
    this.suiviEleve.exo_maison=suiviEl.exo_maison;
    this.suiviEleve.observation=suiviEl.observation ;
    this.suiviEleve.idmatiere= <number>suiviEl.idmatiere;
    this.suiviEleve.idenseignant=this.enseignant.id_enseignant;
    this.suiviEleve.ideleve= this.eleve.id_eleve;
    this.suiviEleve.idclasse=this.classe.id_classe;
    this.suiviEleve.idannee=this.annee.id_annee;
    console.log(this.suiviEleve);
   this.enseignantService.saveEleve(this.suiviEleve).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 800){
        this.initiateSuiviEleve();
        this.getListSuivis();
      }
    });
    
  }
  initiateSuiviEleve(){
    this.suiviEleve = {
    datedebut:'',
    datefin:'',
    assiduite:0,
    retard:0 ,
    exo_maison:0,
    absence:0,
    observation:'',
    idenseignant:this.enseignant.id_enseignant,
    idmatiere: 0,
    idannee:this.annee.id_annee,
    idclasse:this.classe.id_classe,
    ideleve:this.eleve.id_eleve
    }
  }
  getListSuivis(){
    let idel:number =+this.id;
    this.enseignantService.getListSuivis(idel, this.enseignant.id_enseignant, this.annee.id_annee).subscribe((data:any)=>{
      if(data.code==800){
        console.log(data.datas);
        this.listsuivis= data.datas;
      }
    });
  }
  publier(suiviel){
   
 
}
supprimer(suiviel){
 
}
changeEleve(el){
  console.log(el);
  this.id=el.id_eleve;
  this.getEleve();
  this.listsuivis=null;
  this.initiateSuiviEleve();
  this.getListSuivis();
  console.log(this.listsuivis);
  
}
sendMessage(){
  this.message.contenu=this.msg;
  this.message.sender= this.enseignant.id_enseignant;
  this.message.receiver= parseInt(this.id);
  this.enseignantService.sendmgs(this.message).subscribe((data:any)=>{
     if(data.code==800){
      this.getAllMessage();
      this.msg='';
     }
    
  });

}
getAllMessage(){
 this.enseignantService.getAllMsg().subscribe((data:any)=>{
   if(data.code==800){
     this.listMsg=data.datas;
   }
 });
}
}
