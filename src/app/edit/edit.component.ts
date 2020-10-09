import { DataService } from './../services/data.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  newQuesFormEdit: FormGroup;
  currentPaperToEdit: string;

  currentDataForEdit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentPaperToEdit = params.get('paperId');
    });


    this.newQuesFormEdit = new FormGroup({
      subjectCode: new FormControl('', Validators.required),
      subjectName: new FormControl('', Validators.required),
      dateOfExam: new FormControl('', Validators.required),
      subjectDept: new FormControl('', Validators.required),
      subjectCredit: new FormControl('', Validators.required),
      subjectSem: new FormControl('', Validators.required),
      durationOfExam: new FormControl('', Validators.required),
      maxMarks: new FormControl('', Validators.required),
      examType: new FormControl('', Validators.required),
      questionsArr: new FormArray([])
    });

    this.dataService.getOneQuesPaper(this.currentPaperToEdit).subscribe(data => {
      this.currentDataForEdit = data;

      this.newQuesFormEdit.patchValue({
        subjectCode: this.currentDataForEdit?.subjectCode,
        subjectName: this.currentDataForEdit?.subjectName,
        dateOfExam: this.currentDataForEdit?.dateOfExam,
        subjectDept: this.currentDataForEdit?.subjectDept,
        subjectCredit: this.currentDataForEdit?.subjectCredit,
        subjectSem: this.currentDataForEdit?.subjectSem,
        durationOfExam: this.currentDataForEdit?.durationOfExam,
        maxMarks: this.currentDataForEdit?.maxMarks,
        examType: this.currentDataForEdit?.examType
      })

      this.newQuesFormEdit.setControl('questionsArr', this.setFormArrayData(this.currentDataForEdit?.questionsArr))

    })

  }

  setFormArrayData(questions: any[]): FormArray {
    const formArray = new FormArray([]);
    questions.forEach(q => {
      formArray.push(this.formBuilder.group({
        qNumber: q.qNumber,
        question: q.question,
        marks: q.marks,
        coMapping: q.coMapping,
        difficultyLevel: q.difficultyLevel,
        quesType: q.quesType,
        mandatoryOrOptional: q.mandatoryOrOptional
      }))
    })

    return formArray
  }


  get questionsArrFroms() {
    return this.newQuesFormEdit.get('questionsArr') as FormArray;
  }


  get subCode() {
    return this.newQuesFormEdit.get('subjectCode');
  }
  get subname() {
    return this.newQuesFormEdit.get('subjectName');
  }
  get dateOfExam() {
    return this.newQuesFormEdit.get('dateOfExam');
  }
  get durationOfExam() {
    return this.newQuesFormEdit.get('durationOfExam');
  }
  get maxMarks() {
    return this.newQuesFormEdit.get('maxMarks');
  }

  addNewQuestion() {
    const newQues = new FormGroup({
      qNumber: new FormControl(''),
      question: new FormControl(''),
      marks: new FormControl(''),
      coMapping: new FormControl(''),
      difficultyLevel: new FormControl(''),
      quesType: new FormControl(''),
      mandatoryOrOptional: new FormControl('')
    })

    this.questionsArrFroms.push(newQues);
  }

  onEditFormSubmit() {
    if (confirm(`Are you Done with the changes?`)) {
      this.dataService.updateOneQuestion(this.currentPaperToEdit, this.newQuesFormEdit.value).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onDeleteQuesEdit(i) {
    this.questionsArrFroms.removeAt(i);
  }

  onDeleteQues() {
    if (confirm(`Are you sure you want delete ${this.currentDataForEdit.subjectName} Paper?`)) {
      this.dataService.deleteQuesPaper(this.currentPaperToEdit).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onCancel() {
    if (confirm(`Are you sure you want to Cancel?`)) {
      this.router.navigate(['/']);
    }
  }

}
