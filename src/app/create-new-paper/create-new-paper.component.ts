import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-paper',
  templateUrl: './create-new-paper.component.html',
  styleUrls: ['./create-new-paper.component.css']
})
export class CreateNewPaperComponent implements OnInit {

  newQuesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.newQuesForm = this.formBuilder.group({
      subjectCode: ['', Validators.required],
      subjectName: ['', Validators.required],
      dateOfExam: ['', Validators.required],
      subjectDept: ['', Validators.required],
      subjectCredit: ['', Validators.required],
      subjectSem: ['', Validators.required],
      durationOfExam: ['', Validators.required],
      maxMarks: ['', Validators.required],
      examType: ['', Validators.required],
      questionsArr: this.formBuilder.array([])
    })
  }

  get questionsArrFroms() {
    return this.newQuesForm.get('questionsArr') as FormArray;
  }


  get subCode() {
    return this.newQuesForm.get('subjectCode');
  }
  get subname() {
    return this.newQuesForm.get('subjectName');
  }
  get dateOfExam() {
    return this.newQuesForm.get('dateOfExam');
  }
  get durationOfExam() {
    return this.newQuesForm.get('durationOfExam');
  }
  get maxMarks() {
    return this.newQuesForm.get('maxMarks');
  }

  addNewQuestion() {
    const newQues = this.formBuilder.group({
      qNumber: [''],
      question: [''],
      marks: [''],
      coMapping: [''],
      difficultyLevel: [''],
      mandatoryOrOptional: [''],
      quesType: ['']
    })

    this.questionsArrFroms.push(newQues);
  }

  onDeleteQues(i) {
    this.questionsArrFroms.removeAt(i);
  }

  onFormSubmit() {
    if (confirm(`Finished Adding all the Questions? Continue?`)) {
      this.dataService.saveQuesPaper(this.newQuesForm.value).then((value) => {
        if (value) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  onCancel() {
    if (confirm(`Are you sure you want to Cancel?`)) {
      this.router.navigate(['/']);
    }
  }
}
