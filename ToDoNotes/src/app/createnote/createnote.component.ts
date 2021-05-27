import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})
export class CreatenoteComponent implements OnInit {
  noteData: any;
  id: Number;
  constructor(private formBuilder: FormBuilder, private router: Router, private actroute: ActivatedRoute) {

  }

  createForm!: FormGroup;
  recievedData = null;
  color=null;

  ngOnInit() {

    this.actroute.params.subscribe(data => {
      console.log('data', data);
      this.recievedData = data;
    })

    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });

    if (this.recievedData !== null) {
      this.createForm.patchValue({ title: this.recievedData['title'], description: this.recievedData['description'], category: this.recievedData['category'] })
    }

  }

  resetForm() {
    console.log("inside reset");
    this.createForm.reset();
    //this.validate();
  }

  saveData() {

    //console.log('name',this.createForm.controls.title.value);
    if (this.recievedData !== null) {
      this.id = this.recievedData['id'];
    }

    if(this.createForm.controls.category.value == 'Personal'){
      this.color = '#F4B41A'; //yellow
    }
    if(this.createForm.controls.category.value == 'Work'){
      this.color = '#143D59'; //blue
    }
    if(this.createForm.controls.category.value == 'Others'){
     this.color = '#6DD47E'; //green
    }


    this.noteData = {
      id: this.recievedData['id'],
      title: this.createForm.controls.title.value,
      description: this.createForm.controls.description.value,
      category: this.createForm.controls.category.value,
      createdDate: new Date().getTime(),
      color:this.color
    };

    //console.log('inside saveData', this.noteData, this.recievedData);

    localStorage.setItem(
      this.noteData.id,
      JSON.stringify(this.noteData)
    );

    this.createForm.reset();
  }

  redirectNotes() {
    this.router.navigateByUrl('/notes');
  }

  Resetvalidate() {
    // console.log(this.createForm.value);

    if (this.createForm.controls.title.value
      || this.createForm.controls.description.value
      || this.createForm.controls.category.value) {
      return false;
    }
    else {
      return true;
    }
  }

}
