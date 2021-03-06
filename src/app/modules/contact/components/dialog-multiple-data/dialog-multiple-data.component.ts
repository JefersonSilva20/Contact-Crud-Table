import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
import { Contact } from '../../../../shared/contact/contact';
import { ContactService } from '../../service/contact-service.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dialog-single-data',
  templateUrl: './dialog-multiple-data.component.html',
  styleUrls: ['./dialog-multiple-data.component.css']
})

export class DialogMultipleDataComponent {
  public readonly durationInSeconds: number;

  constructor(
    private dialogRef: MatDialogRef<ContactListComponent>,
    @Inject(MAT_DIALOG_DATA) public contacts: Contact[],
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.durationInSeconds = 2;
  }

  public onNoClick() {
    this.dialogRef.close();
  }

  public remove() {
    this.contactService.deleteAllSelected(this.contacts);
    this.dialogRef.close();
    this.openSnackBar();
  }

  openSnackBar() {
    const config: MatSnackBarConfig = {
      duration: this.durationInSeconds * 1000,
      data: {msg: 'Todos os contatos selecionados foram removidos.'}
    };
    this.snackBar.openFromComponent(SnackbarComponent,config);
  }

}
