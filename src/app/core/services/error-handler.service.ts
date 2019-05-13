import { Injectable } from '@angular/core';

import { MdcSnackbar } from '@angular-mdc/web';

import { ErrorModel } from '@app/core/models';

@Injectable()
export class ErrorHandlerService
{
    constructor(private snackbar: MdcSnackbar)
    {
    }

    showError(error: ErrorModel)
    {
        const message = error && error.message ? error.message : 'No error provided from API';

        this.snackbar.show(message);
    }

    showMessage(message: string)
    {
        message = message && message.length > 0 ? message : 'No message provided';

        this.snackbar.show(message);
    }
}
