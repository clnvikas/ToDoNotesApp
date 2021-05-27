import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  constructor(private router: Router,private _snackBar: MatSnackBar,) { }

  cardData = [];

  ngOnInit(): void {
    this.setData();
  }

  setData = () => {
    this.cardData = [];
    //console.log('length', localStorage.length);

    Object.keys(localStorage).forEach((id) => {
     
      this.cardData.push(JSON.parse(localStorage.getItem(id)));
     //console.log(localStorage.getItem(id));
    })
    
    this.cardData.sort((a, b) => {
      console.log('sort..',a,b);
      console.log(typeof(a.createdDate));
      
      console.log(b.createdDate - a.createdDate);
      
      return b.createdDate - a.createdDate;
      
    }); 
  };

  deleteNote = (id) => {
    localStorage.removeItem(id);
    this.ngOnInit();
    this._snackBar.open('Note Deleted Successfully!!','DONE!', {
      duration: 3000,
    });
  };

  // createNote(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '500px',
  //     // data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     //this.animal = result;
  //   });

  // }

  createNotes() {
    this.router.navigate(['/create',{
      id: Math.floor(Math.random()*1000),
      title: '',
      description: '',
      category: '',
      createdDate: new Date()
    }],{ skipLocationChange: true });
  }

  editNote(item){
    //console.log('in edit note',item);
    this.router.navigate(['/create',item],{ skipLocationChange: true });
  }

}
