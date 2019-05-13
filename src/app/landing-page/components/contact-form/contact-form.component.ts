import { Component } from '@angular/core';

@Component({
    selector: 'el-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent
{
    contactForm: any = {};

    public student_button_class = 'btn_student_selected';
    public school_button_class =  'btn_not_selected';

    constructor()
    {
    }

    send()
    {
    }

    onClickStudent(btn_statu : number)
    {
        btn_statu == 1 ? this.student_button_class = 'btn_student_selected' : this.student_button_class = 'btn_not_selected';
        this.student_button_class == 'btn_not_selected' ? this.school_button_class = 'btn_school_selected' : this.school_button_class = 'btn_not_selected';
    }
}
