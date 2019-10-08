import { SuiviEleve } from './models/suiviEleve';
import { Ecoleclasseannee } from './models/ecoleclasseannee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuiviGeneral } from './models/suivigeneral';
const apiurl = 'http://localhost:8080/api/enseignant/';
const apiurl2= 'http://localhost:8080/api/utility/'
const apiurl3= 'http://localhost:8080/api/suivi/'
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
 
  eleves: [];
  classe ={
    id_classe: 0,
    libelle:'',
    code:''
  } ;
  ecole ={
    id_ecole:0,
    nom: '',
    adresse:'',
    ville: '',
    quartier:'',
    telephone:'',
    email:'',
    status:''
  };
  annee={
    id_annee:0,
    libelle:'',
    datedebut:'',
    datefin:''
  }
  enseignant={
    id_enseignant:0,
    nom:'',
    prenoms:'',
    telephone:'',
    email:'',
    status:'',
    matieres:[],
  }
  

  constructor(private http:HttpClient) {

   }

  getEcolebyEnseignant(){
    let api = apiurl+'ecoles';
    return this.http.get(api);
  }
  getClasses(idecole:number, idens:number, idannee:number){
    let api = apiurl+'classes/'+idecole+'/'+idannee ;
    return this.http.get(api);
  }
// recupere la liste des éléves par année par ecole et par classe
  getEleves(parameters: any){
    let api = apiurl+'eleves' ;
    return this.http.post(api,parameters);
  }
  // recuperer l'année
  getAnnee(idannee){
    let api = apiurl2+'annee/'+idannee ;
    return this.http.get(api);
  }
  //recuperer la classe
  getClasse(idclasse){
    let api = apiurl2+'classe/'+idclasse ;
    return this.http.get(api);
  }
  //recuperer l'ecole
  getEcole(idecole){
    let api = apiurl2+'ecole/'+idecole ;
    return this.http.get(api);
  }
  //recuperer enseignant
  getEnseignant(idenseignant){
    let api = apiurl2+'enseignant' ;
    return this.http.get(api);
  }
  // save suivi general
  saveSuiviGeneral(suiviGeneral:SuiviGeneral){
    let api = apiurl +'suivigeneral';
    return this.http.post(api,suiviGeneral);
  }
  // list des suivis general
  getlistSuiviGeneral(params:any){
    let api = apiurl + 'suivigenerals'
    return this.http.post(api,params);
  }
  //change suivi general status
  ChangeSuivistatus(idsuivi:number, status:number){
    let api = apiurl+ 'suivigeneral/'+idsuivi+'/'+status;
    return this.http.get(api);
  }
  //get eleve
  getEleve(id:string){
    let api=apiurl2+ 'eleve/'+id ;
    return this.http.get(api);
  }
  //save suivi eleve
  saveEleve(suiviEleve: SuiviEleve){
    let api =apiurl3 + 'eleve';
    return this.http.post(api,suiviEleve);
  }
  //list des suivis par élèves
  getListSuivis(ideleve:number,idenseignant:number, idannee:number){
    let api = apiurl3 + 'eleve/'+ideleve+'/'+idenseignant+'/'+idannee ;
    return this.http.get(api);
  }
  //envoyer les message
  sendmgs(message:any){
    let api = apiurl+'sendmsg';
    return this.http.post(api,message);
  }
  //get all message
  getAllMsg(){
    let api = apiurl+'getmsg';
    return this.http.get(api);
  }

}
