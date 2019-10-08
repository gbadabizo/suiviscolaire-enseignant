import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { EnseignantService } from '../enseignant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SuiviGeneral } from '../models/suivigeneral';

@Component({
  selector: 'app-applistsuivis',
  templateUrl: './applistsuivis.component.html',
  styleUrls: ['./applistsuivis.component.css']
})

export class ApplistsuivisComponent implements OnInit {
  @ViewChild('fileInput', null) fileInput: ElementRef;
  public popoverTitle: string = 'Etes-vous sûr?';
  public popoverMessage: string = 'Voulez-vous continuer cette opération?';
  public confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  public cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  loading: boolean = false;
  listeleve:[];
  listelevecopy:any;
  listsuivis:any;
  searchText:any;
  searchText2:any;
  ecole:any;
  classe:any;
  annee:any;
  enseignant:any;
  suiviGeneral:SuiviGeneral;
  issaved=false;
  formSuiviGeneral = new FormGroup({
    titre: new FormControl(null, [
        Validators.required
    ]),
    datedebut: new FormControl(null, [
      Validators.required
  ]),
  datefin: new FormControl(null, [
    Validators.required
]),
    message: new FormControl(),
    fileexo : new FormGroup({
      filename:  new FormControl(''),
      filetype: new FormControl(''),
      value:new FormControl('')
    }),
    datedevoir: new FormControl(),
    idtypesuivi: new FormControl(null, [
      Validators.required
  ]),
    matiere: new FormControl(null, [
      Validators.required
  ]),
  
});
  constructor(private enseignantService:EnseignantService,  private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    console.log(this.enseignantService.eleves);
    this.listelevecopy =this.enseignantService.eleves;
    this.listeleve= this.enseignantService.eleves;
    this.annee=this.enseignantService.annee;
    this.enseignant=this.enseignantService.enseignant;
    this.classe=this.enseignantService.classe;
    this.ecole=this.enseignantService.ecole;
   this.getListSuiviGeneral();
    this.initiateSuiviGeneral();
  }
  SubmitSuiviGeneral(){
    console.log(this.formSuiviGeneral.value);
    let suivig = this.formSuiviGeneral.value
    this.suiviGeneral.titre= suivig.titre;
    this.suiviGeneral.message= suivig.message;
    this.suiviGeneral.datedebut = suivig.datedebut;
    this.suiviGeneral.datefin= suivig.datefin;
    this.suiviGeneral.idmatiere=suivig.matiere ;
    this.suiviGeneral.datedevoir=suivig.datedevoir;
    this.suiviGeneral.idtypesuivi=suivig.idtypesuivi;
    console.log(this.suiviGeneral);
    this.enseignantService.saveSuiviGeneral(this.suiviGeneral).subscribe((data:any)=>{
      console.log(data);
      if(data.code==800){
        this.issaved=true;
        this.getListSuiviGeneral();
      }
    });
    this.initiateSuiviGeneral();
  }
  initiateSuiviGeneral(){
    this.suiviGeneral = {
      titre:'',
      message:'',
      datedebut:'',
      datefin:'',
      datedevoir:'',
      idecole:this.ecole.id_ecole,
      idclasse: this.classe.id_classe,
      idannee:this.annee.id_annee,
      idenseignant:this.enseignant.id_enseignant,
      idmatiere: 0,
      idtypesuivi:0,
    };
  }
  getListSuiviGeneral(){
    let params=
    { idecole: this.ecole.id_ecole,
      idclasse:this.classe.id_classe,
      idannee:this.annee.id_annee,
      idenseignant: this.enseignant.id_enseignant
    };
    this.enseignantService.getlistSuiviGeneral(params).subscribe((data:any)=>{
      if(data.code==800){
          this.listsuivis = data.datas;
          console.log(this.listsuivis);
      }
    });

  }
  publier(suivi){
      this.enseignantService.ChangeSuivistatus(suivi.id_suivi,2).subscribe((data:any)=>{
          if(data.code==800){
            this.getListSuiviGeneral();
          }
      });
   
  }
  supprimer(suivi){
   console.log(suivi);
    this.enseignantService.ChangeSuivistatus(suivi.id_suivi,0).subscribe((data:any)=>{
      if(data.code==800){
        this.getListSuiviGeneral();
      }
    });
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formSuiviGeneral.get('fileexo').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }
  clearFile() {
    this.formSuiviGeneral.get('fileexo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  
}
